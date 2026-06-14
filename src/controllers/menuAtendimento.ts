// IMPORTS
const readline = require("readline-sync");
import { menuPrincipal } from "./menuPrincipal";
import { Clinica } from "../actors/clinica";
import { Consulta } from "../actors/consulta";
import { Cobranca } from "../actors/cobranca";

const clinica = Clinica.getInstance();
/*
    Menu Atendimento - Controla o fluxo de consultas (agendamento, consulta e fila de espera)
*/
export function menuAtendimento() {
    console.clear();
    // MENU INTERATIVO - Painel de Consultas
    console.log(`
┌────────────────────────────────────────────────────────┐
│     PAINEL DO VETERINÁRIO - CONSULTÓRIO CLÍNICO        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [ 1 ]     Agendar Consulta                            │
│  [ 2 ]     Realizar Atendimento                        │
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
            // Agenda consulta com base no cpf do tutor
            const cpfTutor = readline.questionInt("- Digite o CPF do Tutor: ");
            const listaAnimais = clinica.buscarAnimalDoTutor(cpfTutor); 
            
            // Verifica se tutor possui animais
            if (!listaAnimais || listaAnimais.length === 0) {
                console.log("\nErro: Nenhum animal localizado para este CPF de Tutor.");
                readline.question("\nPressione [Enter] para voltar...");
                return menuAtendimento();
            }

            // Apresenta animais do tutor
            console.log("\n--- Animais deste Tutor ---");
            listaAnimais.forEach((animal, index) => {
                console.log(` [ ${index + 1} ] ${animal.nome} (${animal.especie})`);
            });
            const escolhaAnimal = readline.questionInt("- Selecione o número do Animal: ") - 1;

            // Garante que a escolha represente os animais existentes
            if (escolhaAnimal < 0 || escolhaAnimal >= listaAnimais.length) {
                console.log("\nErro: Opção de animal inválida!");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }
            // Declara o animal escolhido e busca os medicos disponiveis no sistema
            const pacienteEscolhido = listaAnimais[escolhaAnimal]!;
            const medicosDisponiveis = clinica.veterinarios; 

            // Antes de apresentar a lista de medicos verifica se ha medicos cadastrados
            if (medicosDisponiveis.length === 0) {
                console.log("\nErro: Nao ha veterinarios cadastrados no sistema.");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }

            // Lista de medicos
            console.log("\n--- Médicos Disponíveis ---");
            medicosDisponiveis.forEach((vet, index) => {
                console.log(` [ ${index + 1} ] Dr(a). ${vet.nome}`);
            });
            const escolhaVet = readline.questionInt("- Selecione o numero do Veterinário: ") - 1;

            // Garante uma escolha realista
            if (escolhaVet < 0 || escolhaVet >= medicosDisponiveis.length) {
                console.log("\nErro: Opção de veterinário invalida!");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }
            // Atribui o medico escolhido e coleta a especie do animal para verificar se o medico pode antender
            const vetEscolhido = medicosDisponiveis[escolhaVet]!;
            const verificaEspecialidade = vetEscolhido.podeAtender(pacienteEscolhido);
            
            // Verifica se há a correlacao de especie do animal e especialidade do veterinario
            if(!verificaEspecialidade) {
                console.log(`\n O(A) Dr(a). ${vetEscolhido.nome} nao atende a especie ${pacienteEscolhido.especie}.\nEspecilides:\n`);
                vetEscolhido.especialidades.forEach(espec => {
                    console.log(`- ${espec}`);
                });
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }

            // Coleta de triagem e instancia de uma consulta
            console.log("\n--- Informações Clinicas Iniciais ---");
            const dataAgendamento = readline.question("- Digite a data do agendamento (ex: 10/06/2026): ");
            const sintomasIniciais = readline.question("- Digite os sintomas relatados: ");
            const novaConsulta = new Consulta(pacienteEscolhido, vetEscolhido, dataAgendamento, sintomasIniciais);

            // Joga a consulta na fila
            clinica.obterFila().enqueue(novaConsulta);

            // Verifica se realmente o tutor esta vinculado ao paciente e, se estiver, atribui a consulta
            const tutorDono = clinica.tutores.find(tutor => tutor.listarAnimais.includes(pacienteEscolhido));
            if (tutorDono) {
                tutorDono.adicionarConsulta(novaConsulta);
                console.log(`
┌────────────────────────────────────────────────────────┐
│    CONSULTA AGENDADA COM SUCESSO!                      │
├────────────────────────────────────────────────────────┤
  Paciente: ${pacienteEscolhido.nome}
  Médico: Dr(a). ${vetEscolhido.nome}
└────────────────────────────────────────────────────────┘`);
            } else {
                console.log(`[ERROR] Nao foi possivel agendar. O animal ${pacienteEscolhido.nome} nao possui tutor vinculado.`);
            }
            
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
            // Verifica se ha consulta na lista
            if (clinica.obterFila().estaVazia() || clinica.obterFila().tamanhoElemento === 0) {
                console.log("\nFila de espera vazia. Nenhum pet aguardando atendimento.");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }

            clinica.obterFila().peek();
            // Confirma o paciente e o busca na fila
            const idAtendimento = readline.questionInt("- Confirme o ID do paciente para iniciar o atendimento: ");
            const consultaEmAndamento = clinica.obterFila().buscarPorId(idAtendimento);
            
            // Verifica se o id corresponde
            if (!consultaEmAndamento) {
                console.log("\nErro: Consulta com este ID não localizada na fila.");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }

            // Coleta os dados finais da consuta com base nos sintomas e conclui consulta + o valor do atendimento 
            console.log(`\n Atendendo agora: ${consultaEmAndamento.paciente.nome}`);
            const diagnostico = readline.question("- Digite o diagnóstico final: ");
            const receita = readline.question("- Digite a receita de medicamentos: ");

            consultaEmAndamento.concluirConsulta(diagnostico, receita);

            // Adiciona a fatura na lista de cobrancas com preco baseado na especie
            const fatura = new Cobranca(consultaEmAndamento);
            clinica.listaCobrancas.push(fatura);

            // retira a consulta da fila
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