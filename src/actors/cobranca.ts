// IMPORTS
import { Consulta } from "./consulta";
import { Especialidades } from "../enums/especialidades";
/*
    Classe Cobrança - Armazena tabela de preços por especie e atribui valor a consulta
*/
export class Cobranca {
    public valor: number = 0;
    public pago: boolean = false;

    // tabela de preco baseado na especie
    private readonly precoEspecie: Record<Especialidades, number> = {
        [Especialidades.FELINO]: 110.00,
        [Especialidades.CANINO]: 120.00,
        [Especialidades.AVE]: 140.00,
        [Especialidades.REPTIL]: 180.00,
        [Especialidades.CAPRINO]: 200.00,
        [Especialidades.OVINO]: 200.00,
        [Especialidades.SUINO]: 220.00,
        [Especialidades.BOVINO]: 300.00,
        [Especialidades.EQUINOS]: 350.00
    };

    // Ao chamar cobranca já se atribui valor
    constructor(public consulta: Consulta){
        this.valor = this.calculaValor();
    }

    // Recebe a especialidade do paciente e busca ela na lista de precos
    private calculaValor(): number {
        const especieDoPaciente = this.consulta.paciente.especie;

        return this.precoEspecie[especieDoPaciente];
    }
}