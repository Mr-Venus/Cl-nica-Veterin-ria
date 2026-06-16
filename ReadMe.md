# - Clinica Veterinaria - Sistema de Gerenciamento Clinico

O sistema e uma plataforma de gerenciamento clinico veterinario desenvolvida em TypeScript para execucao em ambiente de terminal (CLI). O projeto foi projetado com base em conceitos de Programacao Orientada a Objetos (POO), estruturas de dados avancadas e tipagem estatica, simulando o fluxo operacional, clinico e financeiro de um hospital veterinario.
---

## 1. Funcionalidades do Sistema

### 1.1 Painel de Cadastros 
* **Centralização de Tutores:** Registro de dados cadastrais contendo Nome, CPF e Telefone.
* **Gerenciamento Automático de Identificadores:** Incremento sequencial de IDs exclusivos para Animais e Veterinários, mitigando duplicidades no banco de dados em memória.
* **Vinculação por Agregação:** Associação de múltiplos animais ao perfil de um tutor por meio da indexação do CPF.
* **Especialização de Classes:** Instanciação polimórfica de animais de acordo com a taxonomia específica (Cachorro, Gato, Ave, Réptil).

### 1.2 Triagem e Atendimento Clínico 
* **Fila de Espera FIFO (First In, First Out):** Fluxo de atendimento sequencial rígido, garantindo que o primeiro paciente agendado seja o primeiro a ser atendido.
* **Validação de Aptidão Clínica:** Bloqueio automatizado de agendamentos caso o veterinário selecionado não possua a espécie do paciente listada em suas especialidades, exibindo as opções válidas em caso de inconsistência.
* **Registro Clínico:** Coleta de sintomas iniciais durante a triagem, seguidos pelo diagnóstico final e emissão de receita médica na conclusão do procedimento.
* **Alertas Visuais de Restricoes:** Exibicao em tempo real de contraindicacoes alergicas e restricoes medicas do paciente no momento da consulta, auxiliando o veterinario na prescrição segura de medicamentos.

### 1.3 Prontuário e Histórico Médico
* **Centralização de Prontuários:** Exibição estruturada de todos os animais vinculados a um tutor selecionado.
* **Histórico Compactado (Uso de slice):** Apresentação limitada aos 3 últimos atendimentos do paciente para fins de otimização de leitura do terminal, emitindo um alerta textual caso existam registros anteriores ocultos.

### 1.4 Módulo Financeiro e Cobrança 
* **Precificação Automatizada por Espécie:** Utilização de um mapa indexado (`Record<Especialidades, number>`) na classe Cobranca para atribuição do valor do atendimento conforme a especialidade exigida.
* **Fluxo de Caixa Operacional:** Interface para listagem de contas em aberto com suporte a quitação imediata, consulta de faturas pagas e emissão de balanço consolidado contendo faturamento bruto, valores liquidados e valores pendentes.

---

## 2. Arquitetura do Software e Conceitos de POO

A engenharia do sistema baseia-se em quatro pilares principais:

### 2.1 Encapsulamento e Métodos Assessores
Propriedades críticas e coleções de dados são declaradas com o modificador de acesso `private` para assegurar a integridade do estado interno das classes. O acesso controlado para leitura nas interfaces de usuário é disponibilizado por meio de Getters públicos:
* `Tutor.listarAnimais` e `Tutor.historico` retornam as referências dos vetores sem permitir a sobreescrita direta de seus ponteiros.
* `Fila.tamanho` expõe o comprimento do array interno para validações lógicas nos controladores, mantendo a coleção encapsulada.

### 2.2 Classes Abstratas e Polimorfismo
A classe `Animal` é definida como abstrata (`abstract`), servindo estritamente como modelo de dados e impedindo a instanciação direta (`new Animal()`). A existência real dos objetos é delegada às classes derivadas (`Cachorro`, `Gato`, `Ave`, `Reptil`), que herdam os atributos genéricos e repassam as constantes correspondentes do enum `Especialidades` ao construtor da classe base através do método `super()`.

### 2.3 Padrão de Projeto Singleton
A classe `Clinica` atua como o repositório central de persistência de dados em memória. Para garantir que os diferentes módulos de interface de usuário (`menuCadastro`, `menuAtendimento`, `menuFinanceiro`, `menuProntuarios`) operem sob o mesmo estado e compartilhem a mesma fila de espera, foi implementado o padrão Singleton:

```typescript
private static instance: Clinica;
private constructor() {} 

public static getInstance(): Clinica {
    if (!this.instance) {
        this.instance = new Clinica();
    }
    return this.instance;
}
```
### 2.4 Padrão Observer
Utilizado para o gerenciamento de eventos e notificacoes. A classe `Tutor` implementa a interface `Observer`. Quando a fila de espera e processada e o metodo `peek()` ou o fluxo de atendimento invoca o proximo paciente, o sistema aciona o metodo `notificar(animal: Animal)`, simulando o envio imediato de um alerta para o terminal com os dados do proprietario.

## 3. Instruções para instalação

### 3.1 Pré-requisito
* Node.js instalado(16 ou superior)

### 3.2 Passo a Passo Inicialização

1. Clone o repositorio para a sua maquina local.
2. Acesse o diretorio raiz do projeto atraves do terminal:
```Bash
cd NOME_DO_DIRETORIO
```
3. Instale as dependencias do projeto mapeadas no `package.json` (incluindo o `TypeScript` e a biblioteca `readline-sync`):
```Bash
npm install
```
4. Execute a aplicacao em ambiente de desenvolvimento utilizando o compilador em tempo de execucao:
```Bash
npm start
```
* **Observacao:** O terminal `PowerShell` pode apresentar restricoes de execucao de scripts em determinados ambientes Windows. Caso encontre falhas ou impedimentos de permissao no console padrao, clique na opcao de alternancia de terminal (`icone de seta ao lado do simbolo de adicao +`), selecione o console Command Prompt (CMD) e execute o comando de inicializacao normalmente por este ambiente de comandos.