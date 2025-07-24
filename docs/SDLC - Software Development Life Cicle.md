# SDLC - Software Development Life Cycle para Agência de Viagens com Foco em Pacotes Personalizados

## 1. Definição do Problema e Alinhamento com Stakeholders

**Objetivo:** Compreender profundamente o problema a ser resolvido e alinhar as expectativas e visão do produto com todos os stakeholders (agência de viagens, usuários finais, equipe de desenvolvimento).

### Problema a ser Resolvido

Agências de viagens enfrentam desafios na gestão manual de pacotes, reservas, clientes e pagamentos, resultando em ineficiências operacionais, perda de dados e dificuldade em oferecer serviços personalizados e modernos. O objetivo é automatizar e otimizar esses processos, permitindo também a personalização de pacotes para atender demandas específicas dos clientes.

### Visão do Produto

Desenvolver um sistema web completo (frontend e backend) que seja eficiente, moderno e seguro, capaz de gerenciar todas as operações de uma agência de viagens digital, com diferencial na capacidade de personalização de pacotes para uma experiência de cliente aprimorada.

### Stakeholders Chave

- Diretores da Agência de Viagens
- Gerentes de Vendas e Operações
- Atendentes de Viagem
- Clientes Finais
- Equipe de Desenvolvimento

### Resultados Esperados

- Entendimento claro do escopo inicial (MVP) e da visão de longo prazo do produto.
- Acordo sobre os objetivos de negócio e as métricas de sucesso.
- Definição das tecnologias base para o projeto (.NET, React, SQL Server).

---

## 2. Criação do PRD - Product Requirements Document

**Objetivo:** Consolidar todos os requisitos, funcionalidades e a visão do produto em um documento formal para guiar o desenvolvimento.

- **Documento Base:** "PLANO DE REQUISITOS – Sistema Web para Agência de Viagens" fornecido anteriormente.

### Conteúdo do PRD

- **Introdução:** Objetivo do projeto e visão geral do sistema.
- **Requisitos Funcionais (RFs):** Detalhamento dos módulos de Usuários, Pacotes de Viagem, Reservas, Pagamentos, Administrativo e o novo Módulo de Personalização de Pacotes.
  - RF01-RF19 (Módulos existentes)
  - RF20 – Solicitação de modificação de pacote existente.
  - RF21 – Criação de orçamento personalizado para solicitação de modificação de pacote.
  - RF22 – Gerenciamento de solicitações de personalização por parte do administrador/atendente.
- **Requisitos Não Funcionais (RNFs):** Performance, segurança, usabilidade, acessibilidade e tecnologias.
- **Integrações Externas:** Google Maps API, SMTP, Gateway de Pagamento, API de Câmbio, Serviço de Chat/Notificação.
- **Requisitos de Dados:** Entidades principais (Usuário, Pacote de viagem, Reserva, Pagamento, Avaliação) e novas (Solicitação de Personalização, Orçamento de Personalização).
- **Critérios de Aceitação:** Regras de negócio para validação das funcionalidades.
- **Entregáveis:** Protótipo navegável, código-fonte, banco de dados populado, manuais (opcional).
- **User Stories (épicos):** Detalhamento das necessidades do usuário na forma "Como [tipo de usuário], eu quero [ação] para que [benefício]".
  - Inclui US23, US24, US25, US26 para personalização.
- **Critérios de Aceitação (ACs) por User Story:** Formato "Dado que / Quando / Então".
  - ACs para US23, US24, US25, US26.
- **Priorização das User Stories:** MVP, Pós-MVP, Avançado.

---

## 3. Análise de Requisitos

**Objetivo:** Refinar, detalhar e validar os requisitos do PRD para garantir que sejam claros, consistentes, completos e testáveis.

### Atividades

- Workshops de Detalhamento com stakeholders e equipe de desenvolvimento.
- Criação de Fluxos de Usuário (ex: cadastro, reserva, personalização).
- Identificação de Regras de Negócio.
- Validação dos requisitos detalhados com stakeholders.
- Preparação para o Sprint Planning.

### Ferramentas

- Miro/Lucidchart para fluxos de usuário.
- Documentação colaborativa (Confluence, Google Docs).

---

## 4. Pesquisa de Tecnologias e Arquitetura Inicial

**Objetivo:** Validar as escolhas tecnológicas e definir a arquitetura de alto nível do sistema.

### Tecnologias Confirmadas

- **Backend:** C# .NET (Entity Framework Core)
- **Frontend:** React
- **Banco de Dados:** Microsoft SQL Server
- **Controle de Versão:** Git (GitHub/Azure DevOps)

### Arquitetura Proposta

- **Backend:** Arquitetura em Camadas (Apresentação/API, Aplicação, Domínio, Infraestrutura)
- **Frontend:** Componentes reutilizáveis, gerenciamento de estado global (Redux/Context API), serviços para APIs RESTful
- **Deployment:** Monolítico inicial, com possibilidade de microsserviços no futuro

---

## 5. Prova de Conceito (POC)

**Objetivo:** Validar a viabilidade técnica de componentes críticos e complexos.

### POCs Sugeridas

- Autenticação e Autorização (login/registro, hash de senha, permissões)
- Integração com Gateway de Pagamento (ex: Stripe/PagSeguro/Mercado Pago)
- Upload de Arquivos (imagens/vídeos de pacotes)

### Resultados Esperados

- Documentação dos aprendizados e desafios
- Decisões técnicas baseadas em evidências
- Redução de riscos

---

## 6. Modelagem e Design do Sistema com UML

**Objetivo:** Criar modelos detalhados do sistema para guiar o desenvolvimento.

### Modelos a Serem Criados

- Diagrama de Casos de Uso
- Diagrama de Classe (UML)
- Diagrama de Sequência
- Wireframes e Mockups (Figma)

### Ferramentas

- Visual Paradigm, Draw.io (diagramas UML)
- Figma (prototipagem frontend)

---

## 7. Configuração do Ambiente de Desenvolvimento

**Objetivo:** Configurar ferramentas e ambientes necessários para a equipe.

### Atividades

- Instalação de ferramentas (.NET SDK, Node.js, SQL Server, VS Code, Docker)
- Configuração de repositório Git (branches: main, develop, feature, hotfix)
- Configuração de banco de dados e ferramentas de migração (Entity Framework)
- CI/CD (Azure DevOps, GitHub Actions)
- Gerenciamento de projeto (Jira/Trello)

---

## 8. Desenvolvimento do Banco de Dados

**Objetivo:** Implementar o schema do banco de dados e populá-lo com dados iniciais.

### Atividades

- Criação das tabelas (USUARIO, PACOTE_VIAGEM, RESERVA, PAGAMENTO, AVALIACAO, SOLICITACAO_PERSONALIZACAO, ORCAMENTO_PERSONALIZACAO)
- Definição de índices e restrições
- Uso de Entity Framework Core Migrations
- População de dados fictícios

---

## 9. Desenvolvimento do Backend (MVP)

**Objetivo:** Desenvolver as funcionalidades do servidor para o MVP usando C# .NET e Entity Framework.

### Foco (Sprints 1, 2, 3)

- Módulo de Usuários: RF01–RF04 (Cadastro, Autenticação, Login)
- Módulo de Pacotes de Viagem: RF05–RF08 (Cadastro, listagem, busca, detalhes)
- Módulo de Reservas: RF09–RF10 (Seleção de pacote/data, dados dos viajantes)
- Módulo de Pagamentos: RF13–RF15 (Integração com gateway, tipos de pagamento, comprovante)
- Módulo Administrativo: RF16–RF17 (Métricas, gerenciamento CRUD)
- Personalização Inicial: RF20, RF22 (Solicitação e gerenciamento de personalização)

### Atividades

- Implementação dos modelos de domínio e DTOs
- Criação de repositórios e serviços
- Desenvolvimento das APIs RESTful
- Implementação das regras de negócio
- Integração com Entity Framework Core

---

## 10. Desenvolvimento do Frontend (MVP)

**Objetivo:** Desenvolver a interface do usuário para o MVP usando React.

### Foco (Sprints 1, 2, 3)

- Módulo de Usuários: Cadastro, Login, Área do Cliente
- Módulo de Pacotes de Viagem: Listagem, filtros, detalhes
- Módulo de Reservas: Seleção de pacote, formulário de viajantes
- Módulo de Pagamentos: Integração com gateway (simulado)
- Módulo Administrativo: Dashboard, gerenciamento de pacotes/reservas/usuários
- Personalização Inicial: Solicitação de personalização, listagem para admin/atendente
- Responsividade básica (mobile-first)

### Atividades

- Estrutura de componentes React
- Interfaces baseadas em wireframes/mockups
- Consumo das APIs RESTful
- Gerenciamento de estado
- Validações no cliente

---

## 11. Integração Backend e Frontend

**Objetivo:** Conectar backend e frontend para funcionamento integrado.

### Atividades

- Testes de integração entre APIs e frontend
- Correção de problemas de comunicação (JSON, CORS)
- Garantia de requisições HTTP/HTTPS corretas

---

## 12. Testes Unitários e de Integração

**Objetivo:** Garantir a qualidade do código em nível de unidade e módulo.

### Atividades

- Testes unitários (backend e frontend)
- Testes de integração (backend e interação frontend-backend)
- Execução contínua dos testes via CI/CD

---

## 13. Testes de Sistema

**Objetivo:** Validar se o sistema atende aos requisitos funcionais e não funcionais.

### Atividades

- Testes de funcionalidade (User Stories e RFs)
- Testes de regressão
- Testes de aceitação do usuário (UAT)

---

## 14. Testes de Usabilidade

**Objetivo:** Avaliar a facilidade de uso e experiência do usuário.

### Atividades

- Sessões de teste com usuários reais
- Coleta de feedback (entrevistas, questionários)
- Análise de heurísticas (ex: Nielsen's Heuristics)
- Foco em RNF10 (navegação simples, intuitiva e acessível)

---

## 15. Testes de Performance, Segurança e Carga

**Objetivo:** Garantir robustez, segurança e capacidade do sistema.

### Atividades

- Testes de performance (RNF05 < 3s)
- Testes de carga (mínimo 500 usuários, RNF06)
- Testes de segurança (XSS, CSRF, SQL Injection, RNF08)
- Verificação de hash de senhas (bcrypt, RNF07)
- Auditoria HTTP/HTTPS (RNF09)
- Testes de penetração

---

## 16. Correção de Bugs e Refinamento

**Objetivo:** Resolver bugs e refinar funcionalidades/interfaces.

### Atividades

- Priorização e correção de bugs
- Refinamento com base em feedback de usabilidade
- Re-testes após correções

---

## 17. Documentação Técnica e de Usuário

**Objetivo:** Criar documentação para desenvolvedores, administradores e usuários finais.

### Documentação Técnica

- Arquitetura do sistema
- Modelagem de dados (diagrama ER, dicionário de dados)
- APIs do backend (Swagger/OpenAPI)
- Componentes frontend
- Guia de configuração e deployment

### Documentação de Usuário

- Manual do usuário final (clientes)
- Manual do administrador/atendente

---

## 18. Implantação em Ambiente de Produção

**Objetivo:** Publicar o sistema para acesso dos usuários finais.

### Atividades

- Preparação do ambiente de produção
- Configuração de segurança e certificados SSL/TLS
- Deploy automatizado via CI/CD
- Monitoramento pós-implantação

---

## 19. Treinamento e Onboarding

**Objetivo:** Capacitar usuários internos (administradores e atendentes).

### Atividades

- Sessões de treinamento prático
- Distribuição de manuais
- Criação de FAQs e base de conhecimento

---

## 20. Suporte Inicial e Validação em Produção

**Objetivo:** Suporte imediato e monitoramento após implantação.

### Atividades

- Equipe de suporte de plantão
- Coleta de feedback dos usuários
- Verificação de logs e métricas
- Priorização de bugs/ajustes

---

## 21. Monitoramento e Manutenção Contínua

**Objetivo:** Garantir operação contínua, estável e segura, e planejar melhorias.

### Atividades

- Monitoramento (APM, logs)
- Manutenção corretiva, evolutiva e adaptativa
- Backups e planos de recuperação de desastres
- Reuniões regulares de revisão de produto
