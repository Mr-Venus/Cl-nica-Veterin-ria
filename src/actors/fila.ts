
export class Fila<T> {

    private elementos: T[] = [];

    public enqueue(item: T): void {
        // adiciona item no array
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
        if (this.elementos.length === 0) {
            console.log("\n A fila está vazia! Nenhum pet aguardando no momento.");
            return;
        }

        const proximo: any = this.elementos.shift();
        
        console.log(`\n
                ──────────────────────────────────────────────────
                    PRÓXIMO PACIENTE:    ${proximo?.nome}                   
                    Favor dirigir-se ao Consultório Veterinário.
                ──────────────────────────────────────────────────
                `);
    }

    public listar(): void {
        console.log("\n ────  FILA DE ESPERA ────────────────────────");
        
        if (this.elementos.length === 0) {
            console.log("\n  [ Ninguém aguardando na lista ]                 \n ");
        } else {
            this.elementos.forEach((item: any, index) => {
                console.log(`  ${index + 1}º Lugar -> ${item?.nome} `);
            });
        }
        
        console.log(" ────────────────────────────────────────────────────");
    }
}