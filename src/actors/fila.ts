
/*
    Classe Fila - Fila generica que recebe tipo variado de dado e manipula de acordo com a necessidade
*/
export class Fila<T> {

    private elementos: T[] = [];

    // Retorna o tamanho da lista de elementos
    public get tamanhoElemento(): number {
        return this.elementos.length;
    }

    // Insere elemento na lista
    public enqueue(item: T): void {
        this.elementos.push(item);
    }

    // Remove elemento da lista
    public dequeue(id: number ):void {
        const indice = this.elementos.findIndex((item: any) => item.id === id);

        if (indice === -1) {
            console.log(`\n Paciente com ID ${id} não foi encontrado na fila.`);
            return;
        }

        this.elementos.splice(indice, 1);
        console.log(`\n Remoção concluida!`);
    }

    // busca o proximo paciente
    public peek(): void {
        if (this.estaVazia() || !this.elementos[0]) {
            console.log("\n A fila está vazia! Nenhum pet aguardando no momento.");
            return;
        }

        const proximo: any = this.elementos[0];
        
        console.log(`\n
 ──────────────────────────────────────────────────
    PROXIMO PACIENTE: [${proximo.id}]   ${proximo.paciente.nome}                   
    Favor dirigir-se ao Consultório Veterinário.
 ──────────────────────────────────────────────────
                `);
        
    }

    // Lista todos os elementos da fila
    public listar(): void {
        console.log("\n ────  FILA DE ESPERA ────────────────────────");
        
        if (this.tamanhoElemento === 0) {
            console.log("\n  [ Ninguém aguardando na lista ]                 \n ");
        } else {
            this.elementos.forEach((item: any, index) => {
                console.log(`  ${index + 1}º Lugar -> ${item.paciente.nome} `);
            });
        }
        
        console.log(" ────────────────────────────────────────────────────");
    }

    // Verifica se ha elementos
    public estaVazia(): boolean {
        return this.tamanhoElemento === 0;
    }

    // busca elementos na lista por id e retorna se ha ou nao aquele id na lista
    public buscarPorId(id: number): T | undefined {
        return this.elementos.find((item: any) => item.id === id);
    }
}