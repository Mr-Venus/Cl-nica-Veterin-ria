
export class Fila<T> {

    private elementos: T[] = [];

    public get tamanhoElemento(): number {
        return this.elementos.length;
    }

    public enqueue(item: T): void {
        this.elementos.push(item);
    }

    public dequeue(id: number ):void {
        const indice = this.elementos.findIndex((item: any) => item.id === id);

        if (indice === -1) {
            console.log(`\n Paciente com ID ${id} não foi encontrado na fila.`);
            return;
        }

        this.elementos.splice(indice, 1);
        console.log(`\n Remoção concluida!`);
    }

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

    public estaVazia(): boolean {
        return this.tamanhoElemento === 0;
    }

    public buscarPorId(id: number): T | undefined {
        return this.elementos.find((item: any) => item.id === id);
    }
}