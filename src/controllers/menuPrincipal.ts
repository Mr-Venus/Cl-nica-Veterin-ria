import { menuAtendimento } from "./menuAtendimento";
import { menuCadastro } from "./menuCadastro";
import { menuFinanceiro } from "./menuFinanceiro";
import { menuProntuarios } from "./menuProntuarios";

const readline = require("readline-sync");

export function menuPrincipal(): void {
    
    console.clear();
    console.log(`
┌────────────────────────────────────────────────────────┐
│            SISTEMA DE GESTÃO VETERINÁRIA               │
└────────────────────────────────────────────────────────┘`);

    console.log(`
    ┌── PAINEL DE CONTROLE ────────────────────────────────┐
    │                                                      │
    │  [ 1 ]  Cadastrar                                    │
    │  [ 2 ]  Iniciar Atendimento Clínico                  │
    │  [ 3 ]  Listar Prontuários                           │
    │  [ 4 ]  Financeiro                                   │
    │  [ 0 ]  Sair do Sistema                              │
    │                                                      │
    └──────────────────────────────────────────────────────┘`);

    let opcao: number = readline.questionInt("\n Digite a opcao desejada no terminal para prosseguir:\n- ")

    console.log(opcao)

    switch(opcao) {
        // CADASTRO( ANIMAL, TUTOR, VETERINARIO)
        case 1:
            menuCadastro();
            break;
        
        // ATENDIMENTO
        case 2:
            menuAtendimento();
            break;

        // PRONTUÁRIOS
        case 3:
            menuProntuarios();
            break;
        // FINANCEIRO
        case 4:
            menuFinanceiro();
            break;

        // SAIDA
        case 0:
            console.clear();
            console.log(`
┌────────────────────────────────────────────────────────┐
│             SISTEMA ENCERRADO COM SUCESSO              │
├────────────────────────────────────────────────────────┤
│                                                        │
│   Obrigado por utilizar o nosso Sistema, agradecemos a │
│   sua preferencia!                                     │
│   Tenha um ótimo dia de trabalho!                      │
│                                                        │
└────────────────────────────────────────────────────────┘
            `);
            break;

        default:
            console.log("\n- Opção inválida!");
            readline.question("\nPressione [Enter] para tentar novamente...");
            menuPrincipal();
            break;

    }
}

menuPrincipal();