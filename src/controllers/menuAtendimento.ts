
const readline = require("readline-sync");
import { menuPrincipal } from "./menuPrincipal";
import { Fila } from "../actors/fila";

const fila = new Fila();

export function menuAtendimento() {

    console.clear();
    // MENU INTERATIVO
    console.log(`
┌────────────────────────────────────────────────────────┐
│     PAINEL DO VETERINÁRIO - CONSULTÓRIO CLÍNICO        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  [ 1 ]     Agendar Consulta                            │
│  [ 2 ]     Chamar Próximo Paciente                     │
│  [ 3 ]     Visualizar Fila de Espera Atual             │
│  │                                                     │
│  [ 0 ]      Voltar ao Menu Principal                   │
│                                                        │
└────────────────────────────────────────────────────────┘`);

    // Captura a opção do teclado
    const opcao = readline.question("- Opção: ");

    switch (opcao) {
        case '1':
            console.clear();
            // agendamento...
            break;
            
        case '2':

            console.clear();
            fila.peek(); 
            readline.question("\nPressione [Enter] para continuar...");
            menuAtendimento();
            break;


        case '3':

            console.clear();
            fila.listar(); 
            readline.question("\nPressione [Enter] para continuar...");
            menuAtendimento();
            break;

        case '0':
            console.log("\n- Retornando ao menu principal...");
            menuPrincipal();
            break;

        default:
            console.log("\n- Opção de atendimento inválida!");
            readline.question("\nPressione [Enter] para tentar novamente...");
            menuAtendimento();
            break;
    }
}