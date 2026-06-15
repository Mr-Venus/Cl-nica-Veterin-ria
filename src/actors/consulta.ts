// IMPORTS
import { Animal } from "./animal";
import { Veterinario } from "./veterinario"; 
import { StatusConsulta } from "../enums/status";

/*
    Classe Consulta - apresenta os dados do paciente e veterinario juntamente com os dados da consulta do paciente
*/
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
        // Atribui id e status de agendado por padrao para cada consulta gerada
        this.id = Consulta.contadorId;

        Consulta.contadorId++;
        this.status = StatusConsulta.AGENDADA;
    }

    // Finaliza consulta 
    public concluirConsulta(diagnostico: string, receita: string): void {
        this.diagnostico = diagnostico;
        this.receita = receita;
        this.status = StatusConsulta.CONCLUIDA;
    }
}

