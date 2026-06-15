// IMPORTS
import { Animal } from "./animal";
import { Consulta } from "./consulta";

/*
    Classe Tutor - Apresenta lista de animais e consultas
*/
export class Tutor {
    private animais: Animal[] = [];
    private historicoConsultas: Consulta[] = [];

    constructor(
        public nome: string,
        public cpf: number,
        public telefone: number
    ) {}

    // Adiciona animal a lista
    public adicionarAnimal(animal: Animal): void {
        this.animais.push(animal);
    }

    // Adiciona consulta a lista
    public adicionarConsulta(consulta: Consulta): void {
        this.historicoConsultas.push(consulta);
    }

    // Retorna lista de animais 
    public get listarAnimais(): Animal[] {
        return this.animais;
    }

    // Retorna lista de consultas
    public get historico(): Consulta[] {
        return this.historicoConsultas;
    }

}