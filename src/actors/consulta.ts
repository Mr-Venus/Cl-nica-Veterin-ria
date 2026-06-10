
import { Animal } from "./animal";
import { Veterinario } from "./veterinario"; 
import { StatusConsulta } from "../enums/status";

export class Consulta {
    private static contadorId: number = 1;
    public id: number;

    public status: StatusConsulta;
    public diagnostico?: string;
    public receita?: string;

    constructor(
        public paciente: Animal,
        public veterinario: Veterinario,
        public data: string,
        public sintomas: string
    ){

        this.id = Consulta.contadorId;

        Consulta.contadorId++;
        this.status = StatusConsulta.AGENDADA;
    }

    public concluirConsulta(diagnostico: string, receita: string): void {
        this.diagnostico = diagnostico;
        this.receita = receita;
        this.status = StatusConsulta.CONCLUIDA;
    }
}

