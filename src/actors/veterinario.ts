
import { Especialidades } from "../enums/especialidades";
import { Animal } from "./animal";

export class Veterinario {
    constructor(
        public id: number,
        public nome: string, 
        public crmv: string, 
        public especialidades: Especialidades[]
        ) {}

    public podeAtender(animal: Animal): boolean {
        return this.especialidades.includes(animal.especie);
    }
}
