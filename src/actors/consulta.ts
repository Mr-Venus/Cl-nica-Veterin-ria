
import { Animal } from "./animal";
import { Veterinario } from "./veterinario"; 
import { StatusConsulta } from "../enums/status";
import { Fila } from "./fila";

export class Consulta {
    
    constructor(
        public data: string,
        public diagnostico?: string
    ){}
}

