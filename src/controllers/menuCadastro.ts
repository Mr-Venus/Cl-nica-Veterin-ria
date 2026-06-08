
const readline = require("readline-sync");
import { Fila } from "../actors/fila";
import { Animal } from "../actors/animal";
import { Tutor } from "../actors/tutor";

export function menuCadastro(){
    const fila = new(Fila);
    
    console.clear();
    // MENU INTERATIVO
    console.log(`
    ┌────────────────────────────────────────────────────────┐
    │     PAINEL DE CADASTRO - CONSULTÓRIO CLÍNICO           │
    ├────────────────────────────────────────────────────────┤
    │                                                        │
    │  [ 1 ]     Cadastro Tutor                              │
    │  [ 2 ]     Cadastro Veterinario                        │
    │  [ 3 ]     Visualizar Fila de Espera Atual             │
    │  │                                                     │
    │  [ 0 ]      Voltar ao Menu Principal                   │
    │                                                        │
    └────────────────────────────────────────────────────────┘`);

    const opcao = readline.question("- Opção: ");

    switch(opcao) {

        case 1:
            
            break;

        case 2:

            break;

        case 3: 

            break;

        default:
            console.clear;
            console.log("\n- Opção de cadastro inválida!");
            readline.question("\nPressione [Enter] para tentar novamente...");
            menuCadastro();
            break;
    }
    
}