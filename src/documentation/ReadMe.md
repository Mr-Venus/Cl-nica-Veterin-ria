# Sistema de Fila e Prontuário Veterinário

Sistema de gerenciamento clínico veterinário desenvolvido em **TypeScript** e executado via terminal. O projeto aplica conceitos sólidos de Programação Orientada a Objetos (POO), Estruturas de Dados (Fila FIFO), Tipos Genéricos e Herança Avançada (Classes Abstratas) para simular o fluxo real de atendimento de um hospital veterinário.

---

## Funcionalidades Principais

* **Cadastro Centralizado de Tutores e Pets:** Vinculação direta de múltiplos animais ao CPF de um tutor.
* **Geração Automática de ID:** Sistema interno inteligente que gera identificadores únicos sequenciais para os animais sem intervenção do usuário.
* **Fila de Atendimento Genérica ($Fila<T>$):** Implementação manual de uma estrutura de dados de fila (*First In, First Out*) totalmente reutilizável e independente de tipo.
* **Triagem Especializada por Espécie:** Suporte a regras de negócios específicas do mundo veterinário (como controle vacinal V10 para caninos e tratamento diferenciado para espécies sem vacina comercial).

---

## Arquitetura do Sistema e POO

O projeto foi estruturado seguindo as melhores práticas de POO para garantir manutenibilidade e escalabilidade:

### 1. Polimorfismo e Herança Avançada
A classe `Animal` foi definida como uma **Classe Abstrata (`abstract`)**, servindo como o molde de dados perfeito. Ela não pode ser instanciada diretamente, delegando a existência real para suas classes filhas especializadas:
* `Cachorro` (Especialidade: Canino)
* `Gato` (Especialidade: Felino)
* `Ave` (Especialidade: Ave)
* `Reptil` (Especialidade: Réptil)

### 2. Encapsulamento
Uso estratégico de modificadores de acesso (`public`, `private`, `static`) para proteger as regras de negócios do sistema, como o contador global de IDs que impede duplicidade de registros.

---

## Tecnologias Utilizadas

* **Node.js** (Ambiente de execução)
* **TypeScript** (Linguagem base e tipagem estática)
* **TS-Node** (Execução direta do TypeScript no terminal)

---
