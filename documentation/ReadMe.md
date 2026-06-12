# - Clinica Veterinária

O sistema é uma plataforma de gerenciamento clínico veterinário desenvolvida em TypeScript para execução em ambiente de terminal. O projeto foi projetado com base em conceitos de Programação Orientada a Objetos (POO), estruturas de dados avançadas e tipagem estática, simulando o fluxo operacional, clínico e financeiro de um hospital veterinário.

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