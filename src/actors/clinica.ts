// IMPORTS
import { Veterinario } from "./veterinario";
import { Tutor } from "./tutor";
import { Consulta } from "./consulta";
import { Fila } from "./fila";
import { Animal } from "./animal";
import { Cobranca } from "./cobranca";
/*
    Classe Clinica - "banco de dados do projeto", armazena as instancias de tutores, veterinarios, cobrancas e filas
*/
export class Clinica {

    public tutores: Tutor[] = [];
    public veterinarios: Veterinario[] = [];
    public listaCobrancas: Cobranca[] = [];
    public filaEspera: Fila<Consulta> = new Fila<Consulta>();
    // 
    private static instance: Clinica;

    private constructor(){}

    public static getInstance(): Clinica {
        if(!this.instance) {
            this.instance = new Clinica();
        }

        return this.instance;
    }
        // ==========================================
        //    Tutor
        // ==========================================
    public cadastrarTutor(tutor: Tutor):void {this.tutores.push(tutor);}
    public buscarAnimalDoTutor(cpf: number): Animal[] | undefined {
    //Procura o tutor pelo CPF
        const tutorEncontrado = this.tutores.find(tutor => tutor.cpf === cpf);
        // Se não achar o tutor, retorna undefined
        if (!tutorEncontrado) {
            return undefined;
        }
        // Retorna a LISTA INTEIRA de animais dele através do getter
        return tutorEncontrado.listarAnimais;
    }   

        // ==========================================
        //    Veterinário
        // ==========================================
    public cadastrarVeterinario(veterinario: Veterinario):void {this.veterinarios.push(veterinario);}

        // ==========================================
        //    Consulta
        // ==========================================
    public obterFila(): Fila<Consulta> {return this.filaEspera;}
} 