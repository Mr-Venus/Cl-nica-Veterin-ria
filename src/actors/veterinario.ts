// IMPORTS
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
            // por padrao atribui id e soma +1 no contador
            this.id = Veterinario.contadorId;

            Veterinario.contadorId++;

        }
    
    // Verifica a especialidade do Veterinario com a Especie do paciente
    public podeAtender(animal: Animal): boolean {
        return this.especialidades.includes(animal.especie);
    }
}
