# PLANO DE REQUISITOS – Sistema Web para Agência de Viagens

## Objetivo do Projeto

Desenvolver um sistema web completo (frontend e backend) para gerenciar pacotes de viagem, reservas, clientes e pagamentos de forma eficiente, moderna e segura.

---

## 1. Requisitos Funcionais (RF)

### 1.1. Módulo de Usuários

- **RF01** – Cadastro e autenticação de clientes (nome, e-mail, senha, telefone, CPF/passaporte)
- **RF02** – Login seguro com recuperação de senha
- **RF03** – Área do cliente com histórico de reservas e pagamentos
- **RF04** – Login para administradores e atendentes (perfis com permissões distintas)

### 1.2. Módulo de Pacotes de Viagem

- **RF05** – Cadastro de pacotes (título, descrição, destino, duração, datas disponíveis, valor)
- **RF06** – Upload de imagens e vídeos para os pacotes
- **RF07** – Listagem e busca de pacotes por destino, data e valor
- **RF08** – Visualização detalhada do pacote

### 1.3. Módulo de Reservas

- **RF09** – Seleção de pacote e data para reserva
- **RF10** – Inclusão de dados dos viajantes
- **RF11** – Cálculo automático de valores (descontos, taxas, parcelamento)
- **RF12** – Geração de número de reserva e status (pendente, confirmada, cancelada)

### 1.4. Módulo de Pagamentos

- **RF13** – Integração com gateway de pagamento (ex: Stripe, PagSeguro ou Mercado Pago)
- **RF14** – Pagamento com cartão de crédito, débito ou boleto
- **RF15** – Geração de comprovante e notificação por e-mail

### 1.5. Módulo Administrativo

- **RF16** – Painel com métricas (vendas por destino, por período, por cliente)
- **RF17** – Gerenciamento de pacotes, reservas e usuários
- **RF18** – Exportação de dados em Excel/PDF
- **RF19** – Gestão de avaliações e comentários

---

## 2. Requisitos Não Funcionais (RNF)

### 2.1. Tecnologia e Arquitetura

- **RNF01** – Aplicação web responsiva (mobile-first)
- **RNF02** – Backend em .NET, Java (dependendo da trilha)
- **RNF03** – Frontend em Angular, ReactJS
- **RNF04** – Banco de dados relacional (SQL Server)

### 2.2. Performance e Escalabilidade

- **RNF05** – Tempo de carregamento de páginas < 3 segundos
- **RNF06** – Sistema preparado para múltiplos acessos simultâneos (pelo menos 500 usuários)

### 2.3. Segurança

- **RNF07** – Armazenamento de senhas com hash (bcrypt)
- **RNF08** – Proteção contra XSS, CSRF e SQL Injection
- **RNF09** – Comunicação HTTP/HTTPS obrigatória

### 2.4. Usabilidade e Acessibilidade

- **RNF10** – Navegação simples, intuitiva e acessível
- **RNF11** – Suporte a leitores de tela e navegação por teclado _(não-obrigatório)_

---

## 3. Integrações Externas

- **Google Maps API** – Exibição de localização dos destinos
- **SMTP ou serviço de e-mail** – Envio de confirmações _(não-obrigatório)_
- **Gateway de Pagamento** – Integração para transações _(simulado)_
- **API externa de câmbio** – Exibição de valores em outras moedas _(não-obrigatório)_

---

## 4. Requisitos de Dados

- **Entidades principais:**
  - Usuário (cliente, atendente, administrador)
  - Pacote de viagem
  - Reserva
  - Pagamento
  - Avaliação
- **Dados com versionamento e histórico** (edições de pacotes, cancelamentos, etc.)

---

## 5. Critérios de Aceitação

- Cliente pode criar conta, fazer login e reservar um pacote
- Pacotes são listados e buscáveis com filtros
- Pagamentos são processados e notificados
- Área administrativa funciona com controle de permissões
- Layout responsivo em dispositivos móveis
- Código-fonte versionado e documentado
- Testes unitários e testes de integração cobrindo funcionalidades principais

---

## 6. Entregáveis

1. Protótipo navegável (Figma ou similar)
2. Código-fonte do backend e frontend com documentação
3. Banco de dados populado com dados fictícios
4. Manual do usuário final _(não-obrigatório)_
5. Manual técnico para desenvolvedores _(não-obrigatório)_

---

## User Stories

Organizadas por épicos (funcionalidades principais), no formato ágil tradicional:

> Como **[tipo de usuário]**, eu quero **[ação]** para que **[benefício]**.

### Épico 1 – Cadastro e Autenticação de Usuários

**Perfil: Cliente**

- **US01:** Como cliente, quero criar minha conta com nome, e-mail e senha para acessar os pacotes e fazer reservas.
- **US02:** Como cliente, quero poder recuperar minha senha para acessar minha conta mesmo se esquecer a senha.
- **US03:** Como cliente, quero fazer login com segurança para acessar minha área exclusiva.

**Perfil: Administrador**

- **US04:** Como administrador, quero acessar o sistema com login próprio para gerenciar os pacotes e as reservas.
- **US05:** Como administrador, quero ter controle de acesso diferenciado por perfil (ex: atendente, gerente).

### Épico 2 – Pacotes de Viagem

**Perfil: Administrador**

- **US06:** Como administrador, quero cadastrar pacotes com título, destino, descrição, imagens, valor e datas para que os clientes possam visualizá-los.
- **US07:** Como administrador, quero editar ou excluir pacotes para manter as ofertas atualizadas.

**Perfil: Cliente**

- **US08:** Como cliente, quero visualizar uma lista de pacotes com filtros por destino, preço e datas para encontrar facilmente o que procuro.
- **US09:** Como cliente, quero ver os detalhes de um pacote para decidir se ele atende às minhas necessidades.

### Épico 3 – Reservas

- **US10:** Como cliente, quero escolher um pacote e uma data para fazer a reserva da minha viagem.
- **US11:** Como cliente, quero inserir os dados dos viajantes durante a reserva para que tudo esteja pronto para a viagem.
- **US12:** Como administrador, quero ver a lista de reservas com status para acompanhar a ocupação de pacotes.

### Épico 4 – Pagamentos

- **US13:** Como cliente, quero pagar minha reserva com cartão ou boleto para confirmar minha viagem.
- **US14:** Como cliente, quero receber um e-mail com o comprovante de pagamento para garantir que tudo deu certo.
- **US15:** Como administrador, quero ver o status do pagamento para confirmar a reserva do cliente.

### Épico 5 – Painel Administrativo

- **US16:** Como administrador, quero ver um painel com métricas de vendas por destino e data para entender o desempenho da agência.
- **US17:** Como administrador, quero exportar relatórios de pacotes e reservas para acompanhar os resultados.
- **US18:** Como atendente, quero visualizar dados de clientes e reservas para oferecer suporte quando necessário.

### Épico 6 – Avaliações e Comentários

- **US19:** Como cliente, quero avaliar os pacotes após a viagem para ajudar outros viajantes.
- **US20:** Como administrador, quero moderar os comentários para evitar conteúdo inadequado.

### Épico 7 – Usabilidade e Acessibilidade

- **US21:** Como cliente, quero usar o site no celular para acessar as informações de viagem de qualquer lugar.
- **US22:** Como cliente com deficiência visual, quero que o site seja acessível por leitores de tela para facilitar minha navegação.

---

## Critérios de Aceitação (ACs)

Os critérios seguem o formato "Dado que / Quando / Então", comum em metodologias ágeis.

### Épico 1 – Cadastro e Autenticação de Usuários

**US01: Criar conta como cliente**

- Dado que estou na tela de cadastro, quando preencho todos os campos obrigatórios corretamente e envio, então minha conta deve ser criada e eu devo receber um e-mail de confirmação.
- Dado que preencho dados inválidos, quando tento cadastrar, então o sistema deve exibir mensagens de erro indicando os campos com problema.

**US02: Recuperar senha**

- Dado que esqueci minha senha, quando informo meu e-mail, então devo receber um link para redefinir a senha.
- Dado que acesso o link, quando informo uma nova senha válida, então minha senha deve ser atualizada e posso fazer login com ela.

**US03: Login do cliente**

- Dado que possuo uma conta, quando informo e-mail e senha corretos, então devo ser autenticado e redirecionado para a minha área.
- Dado que informo dados inválidos, quando tento fazer login, então o sistema deve exibir uma mensagem de erro.

**US04: Login do administrador**

- Dado que sou um administrador, quando acesso a tela de login e uso credenciais válidas, então devo ser direcionado ao painel de administração.

**US05: Controle de perfis**

- Dado que sou administrador, quando crio ou edito usuários do sistema, então posso atribuir a eles perfis com permissões distintas (cliente, atendente, gestor).

### Épico 2 – Pacotes de Viagem

**US06: Cadastro de pacotes**

- Dado que estou na área administrativa, quando preencho todos os campos e salvo, então o novo pacote deve aparecer na listagem pública.

**US07: Editar/excluir pacotes**

- Dado que vejo a lista de pacotes, quando clico em editar ou excluir, então posso modificar os dados ou remover o pacote (com confirmação).

**US08: Listagem e filtros**

- Dado que estou na tela de pacotes, quando uso os filtros por destino, data ou preço, então a listagem deve ser atualizada com base nos critérios.

**US09: Visualização de detalhes**

- Dado que vejo um pacote, quando clico em "ver mais", então devo visualizar descrição completa, fotos, datas e valor.

### Épico 3 – Reservas

**US10: Escolher pacote e data**

- Dado que escolhi um pacote, quando seleciono uma data disponível, então posso iniciar o processo de reserva.

**US11: Inserir dados dos viajantes**

- Dado que estou reservando, quando insiro os dados dos viajantes e clico em continuar, então os dados devem ser validados e salvos na reserva.

**US12: Visualizar reservas no admin**

- Dado que sou administrador, quando acesso o menu de reservas, então devo ver a lista com status, datas e clientes associados.

### Épico 4 – Pagamentos

**US13: Efetuar pagamento**

- Dado que finalizei a reserva, quando escolho a forma de pagamento e confirmo, então o sistema deve processar a transação via gateway integrado.

**US14: Receber comprovante por e-mail**

- Dado que o pagamento foi confirmado, quando o sistema registrar a transação como bem-sucedida, então devo receber um e-mail com o comprovante e detalhes da reserva.

**US15: Ver status do pagamento**

- Dado que sou administrador, quando vejo uma reserva, então devo visualizar o status do pagamento (pendente, aprovado, recusado).

### Épico 5 – Painel Administrativo

**US16: Métricas no painel**

- Dado que estou no painel, quando o sistema carrega os dados, então devo ver gráficos ou números de vendas por período, destino e status.

**US17: Exportar relatórios**

- Dado que quero baixar dados, quando clico em "exportar", então devo receber o arquivo nos formatos disponíveis (Excel, PDF).

**US18: Suporte ao cliente**

- Dado que atendo um cliente, quando busco por CPF ou nome, então devo ver suas reservas e status para oferecer suporte.

### Épico 6 – Avaliações

**US19: Avaliar pacote**

- Dado que completei uma viagem, quando acesso minha reserva e clico em "avaliar", então devo poder dar uma nota e escrever um comentário.

**US20: Moderação de comentários**

- Dado que sou administrador, quando acesso os comentários, então posso aprovar, editar ou remover qualquer avaliação.

### Épico 7 – Usabilidade

**US21: Acesso via celular**

- Dado que acesso o site por celular, quando navego pelas páginas, então todos os conteúdos devem se adaptar corretamente à tela.

**US22: Acessibilidade**

- Dado que uso leitor de tela, quando navego pelo site, então devo conseguir acessar os menus, formulários e botões com feedback adequado.

---

## Priorização das User Stories para MVP

### Critérios de Priorização

- **MVP:** Essencial para operação mínima da agência (cadastro, pacotes, reservas, pagamentos).
- **Pós-MVP:** Funcionalidades que agregam valor, mas não são críticas no início.
- **Avançadas:** Recursos para escalar, melhorar experiência e eficiência interna.

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

- US13: Efetuar pagamento
- US14: Receber comprovante por e-mail
- US15: Ver status do pagamento (admin)

### Pós-MVP – Funcionalidades Intermediárias

**Épico 1**

- US02: Recuperar senha
- US05: Controle de perfis (atendentes, gerentes)

**Épico 2**

- US07: Editar/excluir pacotes

**Épico 3**

- US12: Visualizar reservas (admin)

**Épico 5 – Painel Admin**

- US16: Métricas básicas
- US18: Suporte ao cliente (busca por CPF/nome)

### Avançado – Funcionalidades de Escala/Experiência

**Épico 5**

- US17: Exportar relatórios

**Épico 6 – Avaliações**

- US19: Avaliar pacote
- US20: Moderação de comentários

**Épico 7 – Usabilidade**

- US21: Acesso via celular _(idealmente incluído no MVP se possível)_
- US22: Acessibilidade com leitor de tela

---

## Visão de Entrega por Sprints (Exemplo)

| Sprint   | Entregas                           |
| -------- | ---------------------------------- |
| Sprint 1 | US01, US03, US04, US06, US08, US09 |
| Sprint 2 | US10, US11, US13, US14, US15       |
| Sprint 3 | US02, US07, US12, US16             |
| Sprint 4 | US05, US18, US17, US19             |
| Sprint 5 | US20, US21, US22                   |
