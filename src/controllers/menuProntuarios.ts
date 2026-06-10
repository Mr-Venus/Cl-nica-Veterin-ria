
const readline = require("readline-sync");
import { Clinica } from "../actors/clinica";
import { menuPrincipal } from "./menuPrincipal";


export function menuProntuarios(): void {
    const clinica = Clinica.getInstance();
    console.clear();
    console.log("\n--- PRONTUARIO: TUTORES NO SISTEMA ---");

    const listaTutores = clinica.tutores;

    if (listaTutores.length === 0) {
        console.log("\nNenhum tutor cadastrado ainda.");
        readline.question("\nPressione Enter para voltar...");
        return menuPrincipal();
    }

    // mostra a listagem inicial de tutores
    listaTutores.forEach((tutores, idx) => {
        console.log(`[ ${idx + 1} ] ${tutores.nome} | CPF: ${tutores.cpf}`);
    });
    console.log("[ 0 ] Voltar ao menu principal");

    const indexEscolhido = readline.questionInt("\nEscolha o numero do tutor para ver detalhes: ") - 1;

    if (indexEscolhido === -1) {
        return menuPrincipal();
    }

    if (indexEscolhido < 0 || indexEscolhido >= listaTutores.length) {
        console.log("\nOpcao incorreta.");
        readline.question("\nPressione Enter para continuar...");
        return menuPrincipal();
    }

    const tutorSelecionado = listaTutores[indexEscolhido]!;

    console.clear();
    console.log("\n--- DADOS DO TUTOR ---");
    console.log(`Nome: ${tutorSelecionado.nome}`);
    console.log(`CPF: ${tutorSelecionado.cpf}`);
    console.log(`Telefone: ${tutorSelecionado.telefone}`);

    // listagem de pets do tutor selecionado
    console.log("\n--- ANIMAIS DO TUTOR ---");
    const pets = tutorSelecionado.listarAnimais;
    if (pets.length === 0) {
        console.log("Este tutor nao tem animais cadastrados.");
    } else {
        pets.forEach(pet => {
            console.log(`- ID: ${pet.id} | Pet: ${pet.nome} | Tipo: ${pet.especie} | Raca: ${pet.raca}`);
        });
    }

    // listagem de consultas limitada no maximo em 3 ocorrencias
    console.log("\n--- HISTORICO (MAXIMO 3 CONSULTAS) ---");
    const consultasTutor = tutorSelecionado.historico;

    if (consultasTutor.length === 0) {
        console.log("Nao existem consultas registradas para este tutor.");
    } else {
        // pega apenas do indice 0 ate antes do indice 3
        const resumoConsultas = consultasTutor.slice(0, 3);
        
        resumoConsultas.forEach((consulta, idx) => {
            console.log(`\n-> Registro ${idx + 1}:`);
            console.log(`Data: ${consulta.data} | Situacao: ${consulta.status}`);
            console.log(`Paciente: ${consulta.paciente.nome} | Medico: Dr(a). ${consulta.veterinario.nome}`);
            console.log(`Sintomas: ${consulta.sintomas}`);
            console.log(`Diagnostico: ${consulta.diagnostico ?? "Nao preenchido"}`);
            console.log(`Receita: ${consulta.receita ?? "Nao emitida"}`);
        });
        
        // aviso discreto caso existam mais itens ocultados pelo slice
        if (consultasTutor.length > 3) {
            console.log(`\n* Mais ${consultasTutor.length - 3} consultas estao salvas no banco de dados.`);
        }
    }

    readline.question("\nPressione Enter para fechar o prontuario...");
    menuPrincipal();
}