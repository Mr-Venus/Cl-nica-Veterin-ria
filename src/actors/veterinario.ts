
import { Especialidades } from "../enums/especialidades";
import { Animal } from "./animal";

export class Veterinario {
    public static contadorId: number = 1;
    public id: number; 

    constructor(
        public nome: string, 
        public crmv: string, 
        public especialidades: Especialidades[]
        ) {

            this.id = Veterinario.contadorId;

            Veterinario.contadorId++;

        }

    public podeAtender(animal: Animal): boolean {
        return this.especialidades.includes(animal.especie);
    }
}
