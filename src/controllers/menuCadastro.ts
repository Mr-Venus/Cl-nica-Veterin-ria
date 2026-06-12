
const readline = require("readline-sync");
import { Fila } from "../actors/fila";
import { Clinica } from "../actors/clinica";
import { Tutor } from "../actors/tutor";
import { Veterinario } from "../actors/veterinario";
import { Especialidades } from "../enums/especialidades";
import { Ave, Cachorro, Gato, Reptil} from "../actors/animal";
import { menuPrincipal } from "./menuPrincipal";

export function menuCadastro(){
    const fila = new(Fila);
    const clinica = Clinica.getInstance();
    
    console.clear();
    // MENU INTERATIVO
    console.log(`
    ┌────────────────────────────────────────────────────────┐
    │     PAINEL DE CADASTRO - CONSULTÓRIO CLÍNICO           │
    ├────────────────────────────────────────────────────────┤
    │                                                        │
    │  [ 1 ]     Cadastro Tutor                              │
    │  [ 2 ]     Cadastro Veterinario                        │
    │  [ 3 ]     Cadastro Animal                             │
    │                                                        │
    │  [ 0 ]      Voltar ao Menu Principal                   │
    │                                                        │
    └────────────────────────────────────────────────────────┘`);

    const opcao = readline.questionInt("- Opcao: ");

    switch(opcao) {

        case 1:
            console.clear();
            console.log(`
    ┌────────────────────────────────────────────────────────┐
    │          FORMULÁRIO - CADASTRO DE TUTOR                │
    ├────────────────────────────────────────────────────────┤
    │                                                        │
    │   Por favor, insira os dados do Tutor:                 │
    │                                                        │
    │   • Nome Completo:                                     │
    │   • CPF (apenas números):                              │
    │   • Número de Telefone:                                │
    │                                                        │
    └────────────────────────────────────────────────────────┘`);
            const tutorNome = readline.question("- Digite o nome: ");
            const tutorCpf = readline.questionInt("- Digite o CPF: ");
            const tutorNumero = readline.questionInt("- Digite o numero para contato: ");

            const novoTutor = new Tutor(tutorNome, tutorCpf, tutorNumero); 

            clinica.cadastrarTutor(novoTutor);
            menuCadastro();
            break;

        case 2:
            console.clear();
            console.log(`
    ┌────────────────────────────────────────────────────────┐
    │         FORMULÁRIO - CADASTRO DE VETERINÁRIO           │
    ├────────────────────────────────────────────────────────┤
    │                                                        │
    │   Por favor, insira os dados do Médico:                │
    │                                                        │
    │   • Nome Completo:                                     │
    │   • Registro CRMV:                                     │
    │   • Especialidade:                                     │
    │                                                        │
    └────────────────────────────────────────────────────────┘`);
            const veterinarioNome = readline.question("- Digite o nome: ");
            const veterinarioCrmv = readline.question("- Digite o CRMV: ");

            const quantidadeEspecialidades = readline.questionInt("- Quantas especialidades este veterinario possui? ");
            const listaEspecialidades = Object.values(Especialidades);
            const veterinarioEspecialidade: Especialidades[] = [];
            
            for (let i = 0; i < quantidadeEspecialidades; i++) {
                console.log(`
                ┌────────────────────────────────────────────────────────┐
                │         FORMULÁRIO - CADASTRO DE VETERINÁRIO           │
                ├────────────────────────────────────────────────────────┤
                │    Selecione a especialidade ${i + 1} de ${quantidadeEspecialidades}             │
                └────────────────────────────────────────────────────────┘`);

                listaEspecialidades.forEach((especialidade, index) => {
                    console.log(` [ ${index + 1} ]  ${especialidade}`);
                });

                const escolhaEspecialidade = readline.questionInt(`- Escolha o numero da ${i + 1}ª especialidade: `);
                const indiceReal = escolhaEspecialidade - 1;

                // Validação para garantir que o número digitado existe na lista
                if (indiceReal < 0 || indiceReal >= listaEspecialidades.length) {
                    console.log(" Opção inválida! Tente escolher esta novamente.");
                    i--; // Diminui o contador para forçar o sistema a repetir a MESMA escolha
                    continue;
                }

                const especialidadeSelecionada = listaEspecialidades[indiceReal]!;

                // Evita que o usuário escolha a mesma especialidade duas vezes
                if (veterinarioEspecialidade.includes(especialidadeSelecionada)) {
                    console.log(" Você já adicionou essa especialidade! Escolha uma diferente.");
                    i--; // Repete a escolha
                    continue;
                }

                // Guarda a especialidade aprovada na lista
                veterinarioEspecialidade.push(especialidadeSelecionada);
                console.log(` [${especialidadeSelecionada}] adicionada!`);
            }
            const novoVeterinario = new Veterinario(veterinarioNome, veterinarioCrmv, veterinarioEspecialidade); 
            // passar uma lista de especialidades para o veterinario
            console.log(`Novo veteriario cadastrado -> Nome: ${novoVeterinario.nome} - CRMV: ${novoVeterinario.crmv}.`)
            clinica.cadastrarVeterinario(novoVeterinario);
            menuCadastro();
            break;

        case 3: 
            // animal cadastro
            console.clear();
            console.log(`
    ┌────────────────────────────────────────────────────────┐
    │          FORMULÁRIO - CADASTRO DE ANIMAL               │
    └────────────────────────────────────────────────────────┘`);

            const cpfDono = readline.questionInt("- Digite o CPF do Tutor proprietario: ");
            // Buscamos o objeto Tutor dentro da clinica para poder usar o metodo 'adicionarAnimal'
            const tutorDono = clinica.tutores.find(tutor => tutor.cpf === cpfDono);

            if (!tutorDono) {
                console.log("\nErro: Tutor nao cadastrado! Cadastre o tutor primeiro antes de registrar o animal.");
                readline.question("\nPressione [Enter] para continuar...");
                return menuCadastro();
            }

            console.log(`\nTutor localizado: ${tutorDono.nome}`);
            const nomeAnimal = readline.question("- Nome do Animal: ");
            const racaAnimal = readline.question("- Raca: ");
            const pesoAnimal = readline.questionFloat("- Peso (kg): ");

            console.log(`
                \n--- Selecione a Especie ---
                [ 1 ] Canino
                [ 2 ] Felino 
                [ 3 ] Ave
                [ 4 ] Reptil
                `);
            const opcaoEspecie = readline.questionInt("- Opcao de especie: ");
            let novoAnimal;

            switch (opcaoEspecie) {
                case 1:
                    novoAnimal = new Cachorro(nomeAnimal, racaAnimal, pesoAnimal);
                    break;
                case 2:
                    novoAnimal = new Gato(nomeAnimal, racaAnimal, pesoAnimal);
                    break;
                case 3:
                    novoAnimal = new Ave(nomeAnimal, racaAnimal, pesoAnimal);
                    break;
                case 4:
                    novoAnimal = new Reptil(nomeAnimal, racaAnimal, pesoAnimal);
                    break;
                default:
                    console.log("\nOpcao de especie invalida! Cadastro cancelado.");
                    readline.question("\nPressione [Enter] para continuar...");
                    return menuCadastro();
            }

            // Vincula o animal ao tutor usando o metodo que voce ja criou na classe Tutor
            tutorDono.adicionarAnimal(novoAnimal);

            console.log(`\nAnimal ${novoAnimal.nome} cadastrado e vinculado ao tutor ${tutorDono.nome} com sucesso!`);
            readline.question("\nPressione [Enter] para retornar...");
            menuCadastro();
            break;
        
        case 0:

            menuPrincipal();
            break;
        default:
            console.clear;
            console.log("\n- Opção de cadastro inválida!");
            readline.question("\nPressione [Enter] para tentar novamente...");
            menuCadastro();
            break;
    }
    
}