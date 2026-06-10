import { Consulta } from "./consulta";
import { Especialidades } from "../enums/especialidades";
export class Cobranca {
    public valor: number = 0;
    public pago: boolean = false;

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

    constructor(public consulta: Consulta){
        this.valor = this.calculaValor();
    }

    private calculaValor(): number {
        const especieDoPaciente = this.consulta.paciente.especie;

        return this.precoEspecie[especieDoPaciente];
    }
}