// IMPORTS
const readline = require("readline-sync");
import { menuPrincipal } from "./menuPrincipal";
import { Clinica } from "../actors/clinica";

 // instancia do nosso "banco de dados"
const clinica = Clinica.getInstance();

/*
    Menu Financeiro - Controla o fluxo monetario do Sistema
*/
export function menuFinanceiro() {
     // MENU INTERATIVO - Painel Financeiro do Sistema
    console.clear();
    console.log(`
        --- CONTROLE FINANCEIRO DA CLINICA ---
        [ 1 ] Contas a receber (Em Aberto)
        [ 2 ] Contas recebidas (Pagas)
        [ 3 ] Resumo de caixa do dia
         
        [ 0 ] Voltar ao painel principal
        `);

    const escolha = readline.questionInt("\nDigite a opcao: ");

    switch (escolha) {
        case 1:
            console.clear();
            console.log("\n--- COBRANCAS EM ABERTO ---");
            
            // filtra apenas o que nao foi pago
            const contasEmAberto = clinica.listaCobrancas.filter(item => item.pago === false);

            // Garante que haja conta em aberto
            if (contasEmAberto.length === 0) {
                console.log("Nao existem dividas pendentes na lista.");
            } else {
                // Apresenta os dados da consulta a ser paga
                contasEmAberto.forEach((item, i) => {
                    console.log(`[ ${i + 1} ] ID: ${item.consulta.id} | Pet: ${item.consulta.paciente.nome} | Valor: R$ ${item.valor.toFixed(2)}`);
                });

                const querPagar = readline.question("\nDeseja dar baixa em algum pagamento? (s/n): ");
                if (querPagar.toLowerCase() === "s") {
                    const indiceCobranca = readline.questionInt("Digite o numero correspondente da lista: ") - 1;
                    
                    // Garante uma resposta coerente
                    if (indiceCobranca >= 0 && indiceCobranca < contasEmAberto.length) {
                        // altera o booleano de pago para true diretamente no objeto original
                        contasEmAberto[indiceCobranca]!.pago = true;
                        console.log("\nSucesso! O pagamento foi registrado.");
                    } else {
                        console.log("\nNumero incorreto.");
                    }
                }
            }
            readline.question("\nPressione Enter para continuar...");
            return menuFinanceiro();

        case 2:
            console.clear();
            console.log("\n--- DEPOSITOS E PAGAMENTOS RECEBIDOS ---");
            
            // filtra apenas o que ja foi pago
            const contasPagas = clinica.listaCobrancas.filter(item => item.pago === true);

            if (contasPagas.length === 0) {
                console.log("Nenhum pagamento entrou no caixa ainda.");
            } else {
                contasPagas.forEach(item => {
                    console.log(`- Consulta ID: ${item.consulta.id} | Pet atendido: ${item.consulta.paciente.nome} | Recebido: R$ ${item.valor.toFixed(2)}`);
                });
            }
            readline.question("\nPressione Enter para continuar...");
            return menuFinanceiro();

        case 3:
            console.clear();
            console.log("\n--- BALANCO GERAL DO DIA ---");

            let totalFaturado = 0;
            let totalRecebido = 0;
            let totalPendente = 0;

            // laço comum acumulando os valores de forma limpa e compreensivel
            for (const cobranca of clinica.listaCobrancas) {
                totalFaturado += cobranca.valor;
                if (cobranca.pago) {
                    totalRecebido += cobranca.valor;
                } else {
                    totalPendente += cobranca.valor;
                }
            }

            // Apresenta relatorio financeiro
            console.log(`
                Fichas de atendimento: ${clinica.listaCobrancas.length}
                Faturamento bruto:      R$ ${totalFaturado.toFixed(2)}
                Dinheiro em caixa:      R$ ${totalRecebido.toFixed(2)}
                Valores pendentes:       R$ ${totalPendente.toFixed(2)}`);

            readline.question("\nPressione Enter para sair...");
            return menuFinanceiro();

        case 0:
            return menuPrincipal();

        default:
            console.log("\nOpcao invalida.");
            readline.question("\nPressione Enter para tentar novamente...");
            return menuFinanceiro();
    }
}