import { Especialidades } from "../enums/especialidades";
import { Animal } from "./animal";

interface Consulta {
    data: string,
    diagnostico?: string
}

export class Tutor {
    private animais: Animal[] = [];
    private historicoConsultas: Consulta[] = [];

    constructor(
        public nome: string,
        public cpf: number,
        public telefone: string
    ) {}

    public adicionarAnimal(animal: Animal): void {
        this.animais.push(animal);
    }

    public adicionarConsulta(consulta: Consulta): void {
        this.historicoConsultas.push(consulta);
    }

    public listarAnimais(): void {
        console.log(`Animais de ${this.nome}:`);

        for (const animal of this.animais) {
            console.log(`
                Nome: ${animal.nome} | Espécie: ${animal.especie}
            `);
        }
    }

    public exibirHistorico(): void {
        console.log(`Histórico de consultas de ${this.nome}:`);

        for (const consulta of this.historicoConsultas) {
            console.log(`
                Data: ${consulta.data} | Diagnóstico: ${consulta.diagnostico ?? "Não informado"}
            `);
        }
    }
}