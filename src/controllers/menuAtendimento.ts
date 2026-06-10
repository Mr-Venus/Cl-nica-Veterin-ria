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

    const opcao = readline.questionInt("- Opção: ");

    switch (opcao) {
        case 1: // AGENDAR CONSULTA
            console.clear();
            console.log(`
    ┌────────────────────────────────────────────────────────┐
    │             PAINEL DE AGENDAMENTO DE CONSULTA          │
    └────────────────────────────────────────────────────────┘`);

            // --- PASSO 1: BUSCAR E SELECIONAR O PACIENTE DO TUTOR ---
            const cpfTutor = readline.questionInt("- Digite o CPF do Tutor: ");
            const listaAnimais = clinica.buscarAnimalDoTutor(cpfTutor); 

            if (!listaAnimais || listaAnimais.length === 0) {
                console.log("\nErro: Nenhum animal localizado para este CPF de Tutor.");
                readline.question("\nPressione [Enter] para voltar...");
                return menuAtendimento(); // Usa o return para evitar acúmulo de contexto
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

            // --- PASSO 2: SELECIONAR O VETERINÁRIO ---
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
            const escolhaVet = readline.questionInt("- Selecione o número do Veterinário: ") - 1;

            if (escolhaVet < 0 || escolhaVet >= medicosDisponiveis.length) {
                console.log("\nErro: Opção de veterinário inválida!");
                readline.question("\nPressione [Enter] para continuar...");
                return menuAtendimento();
            }
            const vetEscolhido = medicosDisponiveis[escolhaVet]!;

            // --- PASSO 3: COLETAR DADOS DA CONSULTA (Requisito do seu Construtor) ---
            console.log("\n--- Informações Clínicas Iniciais ---");
            const dataAgendamento = readline.question("- Digite a data do agendamento (ex: 10/06/2026): ");
            const sintomasIniciais = readline.question("- Digite os sintomas relatados: ");

            // Criando a consulta baseada estritamente no seu construtor de consulta.ts
            const novaConsulta = new Consulta(pacienteEscolhido, vetEscolhido, dataAgendamento, sintomasIniciais);

            // Adiciona na fila oficial da clínica
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

        case 2: // REALIZAR ATENDIMENTO (CHAMAR PRÓXIMO)
            console.clear();
            console.log(`
    ┌────────────────────────────────────────────────────────┐
    │             PAINEL DE ATENDIMENTO MÉDICO               │
    └────────────────────────────────────────────────────────┘`);

            if (clinica.obterFila().estaVazia()) {
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

            console.log(`\n🩺 Atendendo agora: ${consultaEmAndamento.paciente.nome}`);
            const diagnostico = readline.question("- Digite o diagnóstico final: ");
            const receita = readline.question("- Digite a receita de medicamentos: ");

            consultaEmAndamento.concluirConsulta(diagnostico, receita);

            const fatura = new Cobranca(consultaEmAndamento);

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

        case 3: // VISUALIZAR FILA
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