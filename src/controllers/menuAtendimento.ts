const readline = require("readline-sync");
import { menuPrincipal } from "./menuPrincipal";
import { Clinica } from "../actors/clinica";
import { Consulta } from "../actors/consulta";
import { Cobranca } from "../actors/cobranca";

const clinica = Clinica.getInstance();

export function menuAtendimento() {
    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│     PAINEL DO VETERINÁRIO - CONSULTÓRIO CLÍNICO        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [ 1 ]     Agendar Consulta (Ir para Fila)             │
│  [ 2 ]     Realizar Atendimento (Chamar Próximo)       │
│  [ 3 ]     Visualizar Fila de Espera Atual             │
│                                                        │
│  [ 0 ]     Voltar ao Menu Principal                    │
│                                                        │
└────────────────────────────────────────────────────────┘`);

    const opcao = readline.questionInt("- Opcao: ");

    switch (opcao) {

        case 1: // AGENDAR CONSULTA
            console.clear();
            console.log(`
    ┌────────────────────────────────────────────────────────┐
    │             PAINEL DE AGENDAMENTO DE CONSULTA          │
    └────────────────────────────────────────────────────────┘`);

            const cpfTutor = readline.questionInt("- Digite o CPF do Tutor: ");
            const listaAnimais = clinica.buscarAnimalDoTutor(cpfTutor); 

            if (!listaAnimais || listaAnimais.length === 0) {
                console.log("\nErro: Nenhum animal localizado para este CPF de Tutor.");
                readline.question("\nPressione [Enter] para voltar...");
                return menuAtendimento();
            }

            console.log("\n--- Animais deste Tutor ---");
            listaAnimais.forEach((animal, index) => {
                console.log(` [ ${index + 1} ] ${animal.nome} (${animal.especie})`);
            });
            const escolhaAnimal = readline.questionInt("- Selecione o número do Animal: ") - 1;

            if (escolhaAnimal < 0 || escolhaAnimal >= listaAnimais.length) {
                console.log("\nErro: Opção de animal inválida!");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }
            const pacienteEscolhido = listaAnimais[escolhaAnimal]!;

            const medicosDisponiveis = clinica.veterinarios; 

            if (medicosDisponiveis.length === 0) {
                console.log("\nErro: Não há veterinários cadastrados no sistema.");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }

            console.log("\n--- Médicos Disponíveis ---");
            medicosDisponiveis.forEach((vet, index) => {
                console.log(` [ ${index + 1} ] Dr(a). ${vet.nome}`);
            });
            const escolhaVet = readline.questionInt("- Selecione o numero do Veterinário: ") - 1;

            if (escolhaVet < 0 || escolhaVet >= medicosDisponiveis.length) {
                console.log("\nErro: Opção de veterinário inválida!");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }
            const vetEscolhido = medicosDisponiveis[escolhaVet]!;
            const verificaEspecialidade = vetEscolhido.podeAtender(pacienteEscolhido);

            if(!verificaEspecialidade) {
                console.log(`\n O(A) Dr(a). ${vetEscolhido.nome} não atende a espécie ${pacienteEscolhido.especie}.\nEspecilides:\n`);
                vetEscolhido.especialidades.forEach(espec => {
                    console.log(`- ${espec}`);
                });
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }

            console.log("\n--- Informações Clínicas Iniciais ---");
            const dataAgendamento = readline.question("- Digite a data do agendamento (ex: 10/06/2026): ");
            const sintomasIniciais = readline.question("- Digite os sintomas relatados: ");

            const novaConsulta = new Consulta(pacienteEscolhido, vetEscolhido, dataAgendamento, sintomasIniciais);

            clinica.obterFila().enqueue(novaConsulta);

            console.log(`
┌────────────────────────────────────────────────────────┐
│    CONSULTA AGENDADA COM SUCESSO!                      │
├────────────────────────────────────────────────────────┤
  Paciente: ${pacienteEscolhido.nome}
  Médico: Dr(a). ${vetEscolhido.nome}
└────────────────────────────────────────────────────────┘`);
            readline.question("\nPressione [Enter] para voltar ao menu...");
            return menuAtendimento();

            // CASO 2 ATENDIMENTO DO PACIENTE
        case 2: 
        // REALIZAR ATENDIMENTO
            console.clear();
            console.log(`
    ┌────────────────────────────────────────────────────────┐
    │             PAINEL DE ATENDIMENTO MÉDICO               │
    └────────────────────────────────────────────────────────┘`);

            if (clinica.obterFila().estaVazia() || clinica.obterFila().tamanhoElemento === 0) {
                console.log("\nFila de espera vazia. Nenhum pet aguardando atendimento.");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }

            clinica.obterFila().peek();

            const idAtendimento = readline.questionInt("- Confirme o ID do paciente para iniciar o atendimento: ");
  
            const consultaEmAndamento = clinica.obterFila().buscarPorId(idAtendimento);

            if (!consultaEmAndamento) {
                console.log("\nErro: Consulta com este ID não localizada na fila.");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }


            console.log(`\n Atendendo agora: ${consultaEmAndamento.paciente.nome}`);
            const diagnostico = readline.question("- Digite o diagnóstico final: ");
            const receita = readline.question("- Digite a receita de medicamentos: ");

            consultaEmAndamento.concluirConsulta(diagnostico, receita);

            const fatura = new Cobranca(consultaEmAndamento);
            clinica.listaCobrancas.push(fatura);

            const tutorDono = clinica.tutores.find(tutor => tutor.listarAnimais.includes(consultaEmAndamento.paciente));
            if (tutorDono) {
                tutorDono.adicionarConsulta(consultaEmAndamento);
            }

            clinica.obterFila().dequeue(idAtendimento);

            console.log(`
┌────────────────────────────────────────────────────────┐
│    ATENDIMENTO CONCLUÍDO - FINANCEIRO                  │
├────────────────────────────────────────────────────────┤
│ Valor da Consulta: R$ ${fatura.valor.toFixed(2)}       │
│ Status da Fatura: [ AGUARDANDO PAGAMENTO ]             │
└────────────────────────────────────────────────────────┘`);

            readline.question("\nPressione [Enter] para continuar...");
            return menuAtendimento();

        // CASO 3 VISUALIZAR A FILA
        case 3:
            // VISUALIZAR FILA
            console.clear();
            clinica.obterFila().listar(); 
            readline.question("\nPressione [Enter] para continuar...");
            return menuAtendimento();

        case 0:
            console.log("\n- Retornando ao menu principal...");
            menuPrincipal();
            break;

        default:
            console.log("\n- Opção de atendimento inválida!");
            readline.question("\nPressione [Enter] para tentar novamente...");
            return menuAtendimento();
    }
}