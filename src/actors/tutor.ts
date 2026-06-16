// IMPORTS
import { Animal } from "./animal";
import { Consulta } from "./consulta";
import { Observer } from "../interfaces/observer";

/*
    Classe Tutor - Apresenta lista de animais e consultas
*/
export class Tutor implements Observer {
    private animais: Animal[] = [];
    private historicoConsultas: Consulta[] = [];

    constructor(
        public nome: string,
        public cpf: number,
        public telefone: number
    ) {}

    // Adiciona animal a lista
    public adicionarAnimal(animal: Animal): void {
        this.animais.push(animal);
    }

    // Adiciona consulta a lista
    public adicionarConsulta(consulta: Consulta): void {
        this.historicoConsultas.push(consulta);
    }

    // Retorna lista de animais 
    public get listarAnimais(): Animal[] {
        return this.animais;
    }

    // Retorna lista de consultas
    public get historico(): Consulta[] {
        return this.historicoConsultas;
    }

    // Notifica o tutor quando o animal for chamado
    notificar(animal: Animal): void {
        console.log(`
\n
┌────────────────────────────────────────────────────────┐
     NOTIFICAÇÃO ENVIADA PARA: ${this.nome.toUpperCase()} | NUMERO: ${this.telefone} 
 ────────────────────────────────────────────────────────
  Ola, ${this.nome}! Seu pet ${animal.nome} foi chamado.         
  Por favor, dirija-se imediatamente ao Consultório.   
└────────────────────────────────────────────────────────┘`);
    }

}