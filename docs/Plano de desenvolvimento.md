PLANO DE DESENVOLVIMENTO – Sistema Web para Agência de Viagens com Foco em Pacotes Personalizados

## Objetivo do Projeto

Desenvolver um sistema web completo (frontend e backend) para gerenciar pacotes de viagem, reservas, clientes e pagamentos de forma eficiente, moderna e segura, com capacidade de personalização de pacotes.

---

## 1. Requisitos Funcionais (RF)

Além dos requisitos já definidos, adiciona-se:

### 1.6. Módulo de Personalização de Pacotes (Novo)

- **RF20** – Solicitação de modificação de pacote existente (adição de noites, troca de hotel, inclusão de passeios).
- **RF21** – Criação de orçamento personalizado para solicitação de modificação.
- **RF22** – Gerenciamento de solicitações de personalização pelo administrador/atendente.

---

## 2. Requisitos Não Funcionais (RNF)

Mantidos conforme documento de requisitos, com tecnologias especificadas:

### 2.1. Tecnologia e Arquitetura

- **RNF01** – Aplicação web responsiva (mobile-first)
- **RNF02** – Backend em C# .NET
- **RNF03** – Frontend em React
- **RNF04** – Banco de dados relacional (SQL Server)

### 2.2. Performance e Escalabilidade

- **RNF05** – Carregamento de páginas < 3 segundos
- **RNF06** – Suporte a pelo menos 500 usuários simultâneos

### 2.3. Segurança

- **RNF07** – Senhas com hash (bcrypt)
- **RNF08** – Proteção contra XSS, CSRF e SQL Injection
- **RNF09** – Comunicação HTTP/HTTPS obrigatória

### 2.4. Usabilidade e Acessibilidade

- **RNF10** – Navegação simples, intuitiva e acessível
- **RNF11** – Suporte a leitores de tela e navegação por teclado (não-obrigatório)

---

## 3. Integrações Externas

- **Google Maps API** – Exibição de localização dos destinos
- **SMTP/E-mail** – Envio de confirmações e notificações
- **Gateway de Pagamento** – Integração para transações (simulado, via Stripe)
- **API de câmbio** – Exibição de valores em outras moedas (não-obrigatório)
- **Serviço de Chat/Notificação (Novo)** – Integração com API de chat (ex: WhatsApp Business API)

---

## 4. Requisitos de Dados

Novas entidades:

- **Solicitação de Personalização:** Dados da solicitação, pacote de origem, modificações, status.
- **Orçamento de Personalização:** Detalhes do orçamento, valores, validade.
- **Versionamento e histórico:** Edições de pacotes, cancelamentos, etc.

### Diagrama de Entidade-Relacionamento (Mermaid)

```mermaid
erDiagram
    USUARIO ||--o{ RESERVA : "faz"
    USUARIO ||--o{ AVALIACAO : "escreve"
    PACOTE_VIAGEM ||--o{ RESERVA : "contem"
    PACOTE_VIAGEM ||--o{ AVALIACAO : "recebe"
    PACOTE_VIAGEM ||--o{ SOLICITACAO_PERSONALIZACAO : "referencia"
    RESERVA ||--o{ PAGAMENTO : "tem"
    SOLICITACAO_PERSONALIZACAO ||--o{ ORCAMENTO_PERSONALIZACAO : "gera"
    USUARIO {
        int Id PK
        string Nome
        string Email UK
        string SenhaHash
        string Telefone
        string CPFPassaporte
        string Perfil // Cliente, Atendente, Administrador
    }
    PACOTE_VIAGEM {
        int Id PK
        string Titulo
        string Descricao
        string Destino
        int DuracaoDias
        date DataDisponivelInicio
        date DataDisponivelFim
        decimal Valor
        string ImagensURLs
        string VideosURLs
    }
    RESERVA {
        int Id PK
        int IdUsuario FK
        int IdPacoteViagem FK
        date DataReserva
        string Status // Pendente, Confirmada, Cancelada
        string NumeroReserva
        decimal ValorTotal
    }
    PAGAMENTO {
        int Id PK
        int IdReserva FK
        string GatewayTransacaoId
        string MetodoPagamento // Stripe
        decimal ValorPago
        date DataPagamento
        string StatusPagamento // Pendente, Aprovado, Recusado
        string ComprovanteURL
    }
    AVALIACAO {
        int Id PK
        int IdUsuario FK
        int IdPacoteViagem FK
        int Nota
        string Comentario
        date DataAvaliacao
    }
    SOLICITACAO_PERSONALIZACAO {
        int Id PK
        int IdUsuario FK
        int IdPacoteViagem FK "Opcional, se a personalização for sobre um pacote existente"
        string DescricaoModificacoes
        string Status // Pendente, Em Orçamento, Aprovada, Recusada, Concluída
        date DataSolicitacao
    }
    ORCAMENTO_PERSONALIZACAO {
        int Id PK
        int IdSolicitacaoPersonalizacao FK
        decimal ValorProposto
        string DetalhesOrcamento
        date DataValidade
        string Status // Enviado, Aceito, Recusado
    }
```

---

## 5. Critérios de Aceitação

- Cliente pode solicitar personalização de pacote e receber orçamento.
- Administrador/atendente pode gerenciar e responder solicitações de personalização.

---

## 6. Entregáveis

- Protótipo navegável (Figma ou similar)
- Código-fonte backend e frontend com documentação
- Banco de dados com dados fictícios
- Manual do usuário final (não-obrigatório)
- Manual técnico para desenvolvedores (não-obrigatório)

---

## 7. User Stories Adicionais – Personalização de Pacotes

### Épico 8 – Personalização de Pacotes

**Perfil: Cliente**

- **US23:** Solicitar modificações em um pacote existente
- **US24:** Visualizar orçamento gerado para personalização

**Perfil: Atendente/Administrador**

- **US25:** Gerenciar solicitações de personalização dos clientes
- **US26:** Enviar orçamento ao cliente e gerenciar negociação

---

## 8. Critérios de Aceitação (ACs) – Novas User Stories

### US23: Solicitar modificações em pacote existente

- Registro da solicitação e notificação ao atendente
- Mensagens de erro para dados incompletos/invalidos

### US24: Visualizar orçamento de personalização

- Notificação e visualização dos detalhes do orçamento
- Atualização do status ao aceitar/recusar

### US25: Gerenciar solicitações de personalização

- Listagem de solicitações com status e detalhes
- Criação e associação de orçamento à solicitação

### US26: Enviar orçamento e gerenciar negociação

- Notificação ao cliente por e-mail/chat e atualização de status
- Fluxo de reserva ou arquivamento conforme aceitação/recusa

---

## 9. Priorização das User Stories – MVP e Expansão

Equipe de 7 membros, sprints de 2 semanas, entrega incremental.

### Critérios de Priorização

- **MVP:** Operação mínima (cadastro, pacotes, reservas, pagamentos)
- **Pós-MVP (Core):** Funcionalidades que refinam o sistema
- **Pós-MVP (Personalização):** Implementação inicial da personalização
- **Avançadas:** Escala, experiência, eficiência interna

### MVP – Produto Mínimo Viável

**Épico 1 – Cadastro e Autenticação**

- US01: Criar conta como cliente
- US03: Login do cliente
- US04: Login do administrador

**Épico 2 – Pacotes**

- US06: Cadastro de pacotes (admin)
- US08: Listagem e filtros
- US09: Visualização de detalhes

**Épico 3 – Reservas**

- US10: Escolher pacote e data
- US11: Inserir dados dos viajantes

**Épico 4 – Pagamentos**

- US13: Efetuar pagamento (via Stripe)
- US14: Receber comprovante por e-mail
- US15: Ver status do pagamento (admin)

**Épico 7 – Usabilidade**

- US21: Acesso via celular (responsividade básica)

### Pós-MVP – Funcionalidades Intermediárias (Core)

**Épico 1**

- US02: Recuperar senha
- US05: Controle de perfis

**Épico 2**

- US07: Editar/excluir pacotes

**Épico 3**

- US12: Visualizar reservas (admin)

**Épico 5 – Painel Admin**

- US16: Métricas básicas
- US18: Suporte ao cliente

### Pós-MVP – Personalização Inicial

**Épico 8**

- US23: Solicitar modificações em pacote existente
- US25: Gerenciar solicitações de personalização

### Avançado – Escala/Experiência

**Épico 5**

- US17: Exportar relatórios

**Épico 6 – Avaliações**

- US19: Avaliar pacote
- US20: Moderação de comentários

**Épico 7 – Usabilidade**

- US22: Acessibilidade com leitor de tela

**Épico 8 – Personalização Avançada**

- US24: Visualizar orçamento (Aceitar/Recusar)
- US26: Enviar orçamento e gerenciar negociação
- Implementação de construtor de pacotes (RF - Novo)

---

## 10. Visão de Entrega por Sprints (Exemplo para 7 Desenvolvedores)

Sprints de 2 semanas, equipe multifuncional.

| Sprint   | Duração   | Entregas (User Stories)                  | Foco Principal                                        |
| -------- | --------- | ---------------------------------------- | ----------------------------------------------------- |
| Sprint 1 | 2 semanas | US01, US03, US04, US06, US08, US09, US21 | Cadastro, Autenticação, Visualização de Pacotes       |
| Sprint 2 | 2 semanas | US10, US11, US13, US14, US15             | Reservas e Pagamentos                                 |
| Sprint 3 | 2 semanas | US02, US07, US12, US16, US23, US25       | Recuperação de Senha, Edição/Exclusão, Personalização |
| Sprint 4 | 2 semanas | US05, US18, US24, US26, US19             | Perfis, Suporte, Personalização Completa, Avaliações  |
| Sprint 5 | 2 semanas | US17, US20, US22 (se houver tempo)       | Relatórios, Moderação, Acessibilidade                 |

---

## 11. Protótipo e Design

Frontend (Figma):

Será desenvolvida uma prototipação de alta fidelidade das principais telas do sistema, focando na usabilidade e na experiência do usuário. Isso inclui:

- Telas de cadastro e login de clientes e administradores.
- Listagem e detalhes de pacotes.
- Fluxo de reserva (seleção de pacote, dados de viajantes).
- Fluxo de pagamento (via Stripe).
- Dashboard administrativo com métricas e gerenciamento.
- Telas de solicitação e visualização de personalização de pacotes.

O Figma permitirá a colaboração entre designers e desenvolvedores, garantindo a validação do fluxo e da interface antes do desenvolvimento.

Database (Mermaid):

O diagrama de entidade-relacionamento em Mermaid já foi apresentado na seção "Requisitos de Dados", detalhando a estrutura das tabelas e seus relacionamentos no Microsoft SQL Server, incluindo as novas entidades para personalização de pacotes.

---

## 12. Considerações de Desenvolvimento

### Backend (C# .NET com Entity Framework)

- Arquitetura em camadas (Apresentação, Aplicação, Domínio, Infraestrutura) para separação de responsabilidades e manutenção.
- Entity Framework Core para mapeamento objeto-relacional (ORM) e integração com SQL Server.
- APIs RESTful para comunicação com o frontend.
- Integração do método de pagamento via Stripe.
- Validação rigorosa de dados no backend.
- Testes unitários e de integração para garantir qualidade.

### Frontend (React)

- Componentes reutilizáveis para agilidade e consistência visual.
- Gerenciamento de estado (Redux, Context API).
- Consumo das APIs RESTful do backend.
- Integração com Stripe para pagamentos.
- Responsividade com CSS Flexbox/Grid ou frameworks CSS (Material-UI, Ant Design).
- Testes de componentes e integração.

### Gestão de Projeto

- Metodologias ágeis (Scrum), com reuniões diárias, planejamento, revisão e retrospectiva de sprint.
- Ferramentas de gerenciamento (Jira, Trello) para acompanhamento de tarefas.
- Controle de versão com Git/GitHub/Azure DevOps, branches para features e pull requests para revisão de código.
