
const readline = require("readline-sync");

export function menuPrincipal(): void {
    
    console.clear();
    console.log(`
    ┌────────────────────────────────────────────────────────┐
    │            SISTEMA DE GESTÃO VETERINÁRIA               │
    ├────────────────────────────────────────────────────────┤
    │ Ambiente de Testes: Ativo                              │
    └────────────────────────────────────────────────────────┘`);

    console.log(`
    ┌── PAINEL DE CONTROLE ────────────────────────────────┐
    │                                                      │
    │  [ 1 ]  Cadastrar                                    │
    │  [ 2 ]  Iniciar Atendimento Clínico                  │
    │  [ 3 ]  Listar Prontuários                           │
    │                                                      │
    │  [ 0 ]  Sair do Sistema                              │
    │                                                      │
    └──────────────────────────────────────────────────────┘`);

    let opcao: number = readline.questionInt("\n Digite a opcao desejada no terminal para prosseguir:\n- ")

    console.log(opcao)

    switch(opcao) {
        // CADASTRO( ANIMAL, TUTOR, VETERINARIO)
        case 1:
            break;
        
        // ATENDIMENTO
        case 2:
            break;

        // PRONTUÁRIOS
        case 3:
            break;

        // SAIDA
        case 5:
            break;

        default:
            console.log("\n- Opção inválida!");
            readline.question("\nPressione [Enter] para tentar novamente...");
            menuPrincipal();
            break;

    }
}

menuPrincipal();