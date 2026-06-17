// IMPORTS
const readline = require("readline-sync");
import { menuPrincipal } from "./menuPrincipal";
import { Clinica } from "../actors/clinica";
import { Consulta } from "../actors/consulta";
import { Cobranca } from "../actors/cobranca";

 // instancia do nosso "banco de dados"
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
            const escolhaAnimal = readline.questionInt("- Selecione o numero do Animal: ") - 1;

            // Garante que a escolha represente os animais existentes
            if (escolhaAnimal < 0 || escolhaAnimal >= listaAnimais.length) {
                console.log("\nErro: Opcao de animal invalida!");
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
            console.log("\n--- Medicos Disponiveis ---");
            medicosDisponiveis.forEach((vet, index) => {
                console.log(` [ ${index + 1} ] Dr(a). ${vet.nome}`);
            });
            const escolhaVet = readline.questionInt("- Selecione o numero do Veterinario: ") - 1;

            // Garante uma escolha realista
            if (escolhaVet < 0 || escolhaVet >= medicosDisponiveis.length) {
                console.log("\nErro: Opcao de veterinario invalida!");
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
            const dataAgendamento = readline.question("- Digite a data do agendamento (ex: 10/06/2026): ").trim();
            const sintomasIniciais = readline.question("- Digite os sintomas relatados: ").trim();

            // Restrições
            let validaRestricao = false;
            // Enquanto o usuario não digitar uma opção coerente ou não digitar todas as restrições, mantem o loop 
            while(!validaRestricao) {
                console.clear();
                console.log(`
─────────────────────────────── Restricoes Medicas ───────────────────────────────
 [ 1 ] Adicionar restricao / alergia a lista de ${pacienteEscolhido.nome}.
 [ 2 ] Nao apresenta restricoes / Finalizar.
──────────────────────────────────────────────────────────────────────────────────
`);
                const temRestricao = readline.questionInt("- Opcao: ");

                switch(temRestricao){
                    case 1:
                        // Recebe a restrição do teclado e armazena seu valor na lista
                        const restricao = readline.question("- Restricao:").trim().toLowerCase();
                        if(restricao !== "") {
                            pacienteEscolhido.restricoes.push(restricao);
                            console.log(`- [ ${restricao} ] adicionada(o).`);
                        }
                        break;
                    case 2:
                        // termina o laço ja que não há restições
                        validaRestricao = true;
                        break;
                    default:
                        // Apresenta erro caso o número seja irreal
                        console.log("\n- Opcao invalida! Digite um numero valido.");
                        readline.question("\nPressione [Enter] para tentar novamente...");
                        break;
                }

            }

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

            // Busca o tutor agendado para notificar com o observer
            const tutorAgendado = clinica.tutores.find(tutor => tutor.listarAnimais.includes(consultaEmAndamento.paciente));
            if(tutorAgendado) {
                tutorAgendado.notificar(consultaEmAndamento.paciente);
            }

            // Coleta os dados finais da consuta com base nos sintomas e conclui consulta + o valor do atendimento 
            console.log(`\n Atendendo agora: ${consultaEmAndamento.paciente.nome}`);

            if(consultaEmAndamento.paciente.restricoes.length > 0) {
                console.log(`\n ALERTA!: O paciente apresenta restricoes.`);
                consultaEmAndamento.paciente.restricoes.forEach((rest, idx) => {
                    console.log(`[${idx + 1}] <-> ${rest.toUpperCase()}`);
                });
            }

            const diagnostico = readline.question("- Digite o diagnostico final: ").trim();

            // Inicia o processo de receita(verificacao e aplicacao)
            let receitaValida = false;
            let receita = "";
            while(!receitaValida) {
                receita = readline.question("- Digite a receita de medicamentos: ").trim().toLowerCase();
                // Compara se há restrições na receita
                const encontradaRestricao = consultaEmAndamento.paciente.restricoes.some(restr => receita.includes(restr));
                // Se houver, filtra essa restrição e guarda na variavel restricaoBloqueada
                if(encontradaRestricao){
                    const restricaoBloqueada = consultaEmAndamento.paciente.restricoes.filter(restr => {
                        return receita.includes(restr);
                    });
                // Apresenta a restrição bloqueada
                    console.log(`
        ┌────────────────────────────────────────────────────────┐
        │                  RECEITA INCOERENTE                    │
        └────────────────────────────────────────────────────────┘
        - A prescricao foi bloqueada por segurança. Por favor, reescreva com um medicamento seguro.
        -> Componente(s) bloqueado(s): `);
                    restricaoBloqueada.forEach(restr => {
                        console.log(`- [${restr.toUpperCase()}]`);
                    });
                } else {
                    // se não houver alergia, valida a receita e segue para a proxima etapa
                    receitaValida = true;
                }
            }

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