import { Especialidades } from "../enums/especialidades";

export abstract class Animal {
    public static contadorId: number = 1;
    public id: number; 
    
    constructor(
        public nome: string,
        public raca: string,
        public peso: number,
        public especie: Especialidades,
        public vacinas: string[] = [],
        public restricoes: string[] = []
    ) {
        this.id = Animal.contadorId;

        Animal.contadorId++;
    }

}

  // ==========================================
  //    CLASSES FILHAS (EXTENDS)
  // ==========================================

  // --- CACHORRO ---
export class Cachorro extends Animal {
    constructor( nome: string, raca: string, peso: number) {
      super(nome, raca, peso, Especialidades.CANINO, [], []);
    }
}


// --- GATO ---
export class Gato extends Animal {
    constructor( nome: string, raca: string, peso: number) {
        super( nome, raca, peso, Especialidades.FELINO, [], []);
    }
}

// --- AVE ---
export class Ave extends Animal {
    constructor( nome: string, raca: string, peso: number) {
        super( nome, raca, peso, Especialidades.AVE, [], []);
    }
}

// --- REPTIL ---
export class Reptil extends Animal {
    constructor( nome: string, raca: string, peso: number) {
        super( nome, raca, peso, Especialidades.REPTIL, [], []);
    }
}
