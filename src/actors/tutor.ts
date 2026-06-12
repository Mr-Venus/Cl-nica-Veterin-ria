
import { Animal } from "./animal";
import { Consulta } from "./consulta";

export class Tutor {
    private animais: Animal[] = [];
    private historicoConsultas: Consulta[] = [];

    constructor(
        public nome: string,
        public cpf: number,
        public telefone: number
    ) {}

    public adicionarAnimal(animal: Animal): void {
        this.animais.push(animal);
    }

    public adicionarConsulta(consulta: Consulta): void {
        this.historicoConsultas.push(consulta);
    }

    public get listarAnimais(): Animal[] {
        return this.animais;
    }

    public get historico(): Consulta[] {
        return this.historicoConsultas;
    }

    // public exibirHistorico(): void {
    //     console.log(`Histórico de consultas de ${this.nome}:`);

    //     for (const consulta of this.historicoConsultas) {
    //         console.log(`
    //             Data: ${consulta.data} | Diagnóstico: ${consulta.diagnostico ?? "Não informado"}
    //         `);
    //     }
    // }
}