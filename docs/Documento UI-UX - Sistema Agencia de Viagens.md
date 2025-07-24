# DOCUMENTO DE ESPECIFICAÇÃO UI/UX - SISTEMA WEB PARA AGÊNCIA DE VIAGENS

## 1. Visão Geral do Projeto

### 1.1. Objetivo

Desenvolver um sistema web completo para agência de viagens com foco em pacotes personalizados, oferecendo uma experiência moderna, intuitiva e responsiva para clientes, atendentes e administradores.

### 1.2. Contexto do Negócio

O sistema visa automatizar e otimizar processos manuais de agências de viagens, permitindo gestão eficiente de pacotes, reservas, clientes e pagamentos, com diferencial na personalização de pacotes para uma experiência de cliente aprimorada.

### 1.3. Tecnologias Base

- **Frontend:** React
- **Backend:** C# .NET com Entity Framework
- **Banco de Dados:** SQL Server
- **Design System:** Mobile-first, responsivo
- **Arquitetura:** Em camadas (Apresentação, Aplicação, Domínio, Infraestrutura)

### 1.4. Usuários-Alvo

- **Clientes:** Pessoas físicas interessadas em pacotes de viagem
- **Atendentes:** Funcionários da agência que auxiliam clientes
- **Administradores:** Gestores responsáveis pelo sistema e negócio

---

## 2. Identidade Visual e Sistema de Cores

### 2.1. Paleta Principal

```css
/* Cores Primárias */
--primary-dark: #182348; /* Azul Escuro - Headers, navegação, botões principais */
--primary-orange: #da7818; /* Laranja - CTAs, botões de ação, links */
--background-soft: #c09c7c; /* Laranja Apagado - Fundos suaves, cards, seções */

/* Cores Neutras */
--white: #ffffff; /* Backgrounds principais, textos em fundos escuros */
--gray-light: #f5f5f5; /* Backgrounds alternativos, separadores */
--gray-medium: #8a8a8a; /* Textos secundários, placeholders */
--gray-dark: #333333; /* Textos principais */

/* Cores de Status */
--success: #28a745; /* Confirmações, status positivos */
--error: #dc3545; /* Alertas, erros, cancelamentos */
--warning: #ffc107; /* Avisos, pendências */
--info: #17a2b8; /* Informações neutras */
```

### 2.2. Aplicação das Cores

- **Header/Navegação:** Background #182348, texto branco
- **CTAs Primários:** Background #DA7818, texto branco
- **CTAs Secundários:** Border #DA7818, texto #DA7818
- **Cards/Seções:** Background #C09C7C ou branco com borda sutil
- **Links:** Cor #DA7818 com hover underline
- **Status de Reservas:** Verde (Confirmada), Amarelo (Pendente), Vermelho (Cancelada)

---

## 3. Tipografia e Hierarquia

### 3.1. Família de Fontes

```css
/* Fonte Primária - Textos gerais */
font-family: "Inter", "Roboto", -apple-system, BlinkMacSystemFont, sans-serif;

/* Fonte Secundária - Títulos e destaques */
font-family: "Poppins", "Inter", sans-serif;
```

### 3.2. Escala Tipográfica

```css
/* Títulos */
--h1: 32px/40px; /* Títulos principais das páginas */
--h2: 28px/36px; /* Títulos de seções */
--h3: 24px/32px; /* Subtítulos */
--h4: 20px/28px; /* Títulos de cards/componentes */

/* Corpo do texto */
--body-large: 18px/26px; /* Textos importantes */
--body-regular: 16px/24px; /* Textos padrão */
--body-small: 14px/20px; /* Textos secundários */
--caption: 12px/16px; /* Labels, hints, metadata */

/* Pesos de fonte */
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

---

## 4. Sistema de Grid e Layout

### 4.1. Breakpoints Responsivos

```css
/* Mobile First */
--mobile: 320px - 768px;
--tablet: 768px - 1024px;
--desktop: 1024px - 1440px;
--large-desktop: 1440px+;
```

### 4.2. Container e Espaçamento

```css
/* Container */
--container-max-width: 1200px;
--container-padding: 16px; /* mobile */
--container-padding-tablet: 24px;
--container-padding-desktop: auto;

/* Grid System */
--grid-columns: 12;
--grid-gutter: 16px; /* mobile */
--grid-gutter-desktop: 24px;

/* Spacing Scale */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

---

## 5. Componentes Base do Design System

### 5.1. Botões

```css
/* Botão Primário */
.btn-primary {
  background: var(--primary-orange);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: #b8660f;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(218, 120, 24, 0.3);
}

/* Botão Secundário */
.btn-secondary {
  background: transparent;
  color: var(--primary-orange);
  border: 1px solid var(--primary-orange);
  border-radius: 6px;
  padding: 12px 24px;
}
.btn-secondary:hover {
  background: var(--primary-orange);
  color: white;
}

/* Botão Terciário */
.btn-tertiary {
  background: transparent;
  color: var(--primary-orange);
  border: none;
  text-decoration: underline;
}

/* Botão Destrutivo */
.btn-destructive {
  background: var(--error);
  color: white;
  border: none;
}

/* Estado Desabilitado */
.btn:disabled {
  background: #e6e6e6;
  color: #999999;
  cursor: not-allowed;
}
```

### 5.2. Cards

```css
.card {
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(24, 35, 72, 0.1);
  padding: 24px;
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(24, 35, 72, 0.15);
}

/* Card de Pacote */
.card-package {
  overflow: hidden;
  padding: 0;
}
.card-package__image {
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
}
.card-package__content {
  padding: 20px;
}
.card-package__price {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: rgba(24, 35, 72, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 600;
}
```

### 5.3. Formulários

```css
.form-group {
  margin-bottom: var(--space-md);
}

.form-label {
  display: block;
  margin-bottom: var(--space-sm);
  font-weight: 500;
  color: var(--gray-dark);
}
.form-label--required::after {
  content: " *";
  color: var(--error);
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.form-input:focus {
  outline: none;
  border-color: var(--primary-orange);
  box-shadow: 0 0 0 3px rgba(218, 120, 24, 0.1);
}
.form-input--error {
  border-color: var(--error);
}
.form-input--success {
  border-color: var(--success);
}

.form-error {
  color: var(--error);
  font-size: var(--body-small);
  margin-top: var(--space-xs);
}
```

### 5.4. Navegação

```css
.header {
  background: var(--primary-dark);
  color: white;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.nav-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
}

.nav-links {
  display: flex;
  gap: var(--space-lg);
}
.nav-link {
  color: white;
  text-decoration: none;
  transition: color 0.2s ease;
}
.nav-link:hover,
.nav-link--active {
  color: var(--primary-orange);
}

.dropdown {
  position: relative;
}
.dropdown__content {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
}
```

---

## 6. Especificações Detalhadas por Módulo

### 6.1. Módulo de Autenticação (US01, US03, US04)

#### 6.1.1. Tela de Login

```
Layout:
- Centrada na tela
- Card de 400px width (desktop), full-width com padding (mobile)
- Background: Gradient sutil de #C09C7C para #FFFFFF

Elementos:
- Logo: Centralizada no topo, 120px height
- Card: Background branco, shadow suave, border-radius 12px
- Campos: Email e senha, full-width, 48px height
- Botão Login: Primário, full-width, 48px height
- Links: "Esqueci minha senha" em #DA7818
- Checkbox: "Lembrar-me" opcional
- Link de cadastro: Para novos usuários

Validação:
- Mensagens de erro em #DC3545 abaixo dos campos
- Validação em tempo real
- Loading state no botão durante autenticação
```

#### 6.1.2. Tela de Cadastro

```
Layout: Mesmo padrão da tela de login

Campos Obrigatórios:
- Nome completo
- Email
- Senha (com indicador de força)
- Confirmação de senha
- Telefone (com máscara)
- CPF/Passaporte

Elementos Adicionais:
- Checkbox: Aceitar termos de uso e política de privacidade
- Progress indicator: Para etapas do cadastro se necessário
- Validação em tempo real para todos os campos
- Feedback visual para senhas seguras
```

#### 6.1.3. Recuperação de Senha

```
Fluxo:
1. Input de email
2. Mensagem de confirmação
3. Email com link seguro
4. Formulário de nova senha
5. Confirmação de alteração

Segurança:
- Token temporário com expiração
- Validação de força da nova senha
- Logout de todas as sessões ativas
```

### 6.2. Módulo de Pacotes (US06, US08, US09)

#### 6.2.1. Listagem de Pacotes

```
Header Section:
- Barra de busca centralizada (placeholder: "Para onde você quer viajar?")
- Filtros avançados em sidebar colapsível (mobile: modal)

Filtros Disponíveis:
- Destino (autocomplete)
- Faixa de preço (range slider)
- Duração (dropdown)
- Data de saída (date picker)
- Tipo de viagem (tags: aventura, família, lua de mel, etc.)

Grid de Pacotes:
- Desktop: 3 colunas
- Tablet: 2 colunas
- Mobile: 1 coluna
- Paginação ou scroll infinito

Card de Pacote:
- Imagem: 16:9 ratio, lazy loading
- Overlay com preço no canto inferior direito
- Badge de desconto se aplicável
- Título: H4, cor #333333, máximo 2 linhas
- Destino: Body small, cor #8A8A8A
- Duração: Badge com background #C09C7C
- Rating: Estrelas + número de avaliações
- Valor: H3, cor #DA7818, destaque
- Botão: "Ver detalhes" secundário
- Hover: Elevation effect
```

#### 6.2.2. Detalhes do Pacote

```
Hero Section:
- Slider de imagens/vídeos: 60vh height
- Controles de navegação
- Thumbnails abaixo
- Botão de fullscreen
- Breadcrumb de navegação

Layout Principal (Desktop):
- 2 colunas: 70% conteúdo, 30% sidebar reserva
- Mobile: Stack vertical

Conteúdo Detalhado:
- Título: H1, cor #182348
- Rating e avaliações: Estrelas + link para reviews
- Descrição: Texto rico formatado, parágrafos espaçados
- Seção "O que está incluído":
  - Lista com ícones check verde
  - Tooltip com detalhes
- Seção "O que NÃO está incluído":
  - Lista com ícones X vermelho
- Itinerário: Timeline vertical interativa
- Mapa: Integração Google Maps
- Galeria expandida: Grid com lightbox
- Política de cancelamento
- Avaliações de clientes

Sidebar de Reserva (Desktop):
- Card fixo com shadow
- Preço em destaque
- Desconto se aplicável
- Calendário inline de datas disponíveis
- Contador de pessoas (adultos/crianças)
- Valor total calculado dinamicamente
- Botão CTA primário "Reservar Agora"
- Link "Personalizar este pacote"
```

#### 6.2.3. Painel Admin - Gestão de Pacotes

```
Lista de Pacotes:
- Tabela responsiva com:
  - Thumbnail
  - Título
  - Destino
  - Valor
  - Status (Ativo/Inativo)
  - Datas disponíveis
  - Ações (Editar/Duplicar/Excluir)

Formulário de Cadastro/Edição:
- Wizard multi-step:
  1. Informações básicas
  2. Upload de imagens/vídeos
  3. Itinerário
  4. Preços e disponibilidade
  5. Review e publicação

Upload de Mídia:
- Drag & drop interface
- Preview de imagens
- Compressão automática
- Formatos aceitos: JPG, PNG, WebP, MP4
- Limite de tamanho por arquivo
```

### 6.3. Módulo de Reservas (US10, US11)

#### 6.3.1. Fluxo de Reserva - Multi-step

```
Progress Bar:
- 4 etapas claramente definidas:
  1. Seleção de datas e pessoas
  2. Dados dos viajantes
  3. Revisão e confirmação
  4. Pagamento

Resumo Lateral (Desktop):
- Card fixo com informações do pacote
- Valores detalhados
- Botão de voltar às etapas anteriores
```

#### 6.3.2. Etapa 1: Seleção de Datas e Pessoas

```
Calendário:
- Inline, responsivo
- Datas disponíveis destacadas em verde
- Datas indisponíveis em cinza
- Hover states informativos
- Indicação de preços por data (se variável)

Seleção de Pessoas:
- Counter buttons para adultos (18+)
- Counter buttons para crianças (2-17)
- Counter buttons para bebês (0-2)
- Validação: mínimo 1 adulto
- Cálculo automático de preços

Campos Especiais:
- Observações da reserva (textarea)
- Solicitações especiais (checkbox list)

Validação:
- Real-time feedback
- Highlighting de campos obrigatórios
- Botão "Continuar" habilitado apenas quando válido
```

#### 6.3.3. Etapa 2: Dados dos Viajantes

```
Layout por Viajante:
- Cards separados para cada pessoa
- Expansível/colapsível
- Numeração clara (Viajante 1, 2, etc.)

Campos por Viajante:
- Nome completo*
- Data de nascimento*
- CPF/Passaporte*
- Telefone*
- Email (opcional, exceto responsável)
- Necessidades especiais (textarea)

Recursos:
- Auto-save: Progresso salvo automaticamente
- Validação inline com feedback contextual
- Duplicar dados do responsável
- Importar de reservas anteriores (cliente logado)
```

#### 6.3.4. Etapa 3: Revisão e Confirmação

```
Resumo Completo:
- Detalhes do pacote escolhido
- Datas selecionadas
- Dados de todos os viajantes
- Breakdown de preços:
  - Valor base por pessoa
  - Taxas e impostos
  - Descontos aplicados
  - Valor total

Termos e Condições:
- Checkbox obrigatório
- Link para termos completos
- Política de cancelamento destacada

Ações:
- Botão "Voltar" para editar
- Botão "Finalizar Reserva" primário
```

### 6.4. Módulo de Pagamentos (US13, US14, US15)

#### 6.4.1. Tela de Pagamento

```
Layout:
- 2 colunas (desktop): Formulário + Resumo
- Mobile: Stack vertical

Métodos de Pagamento:
- Cards selecionáveis com ícones
- Cartão de crédito/débito (Stripe)
- PIX (se brasileiro)
- Boleto bancário
- Parcelamento (se disponível)

Formulário de Cartão:
- Campos com máscaras automáticas
- Validação em tempo real (Luhn algorithm)
- Ícones dos cartões aceitos
- Campo CVV com tooltip explicativo
- Checkbox "Salvar cartão" (usuários logados)

Segurança:
- Ícones de certificados SSL
- Selo de segurança PCI
- Criptografia destacada
- Política de privacidade

Estados:
- Loading durante processamento
- Success page com detalhes da reserva
- Error page com opções de retry
- Timeout com redirecionamento
```

#### 6.4.2. Confirmação de Pagamento

```
Página de Sucesso:
- Ícone de check verde grande
- Número da reserva destacado
- Detalhes da compra
- Próximos passos claramente definidos
- Botão "Baixar comprovante" (PDF)
- Botão "Enviar por email"
- Link para área do cliente

Email Automático:
- Template branded
- Comprovante em PDF anexo
- Instruções para a viagem
- Contatos de emergência
- Link para avaliação pós-viagem
```

### 6.5. Painel Administrativo (US16, US17, US18)

#### 6.5.1. Dashboard Principal

```
Sidebar de Navegação:
- Background: #182348
- Ícones + labels
- Estados active/hover em #DA7818
- Colapsível em telas menores
- Seções: Dashboard, Pacotes, Reservas, Clientes, Financeiro, Personalização, Configurações

Header:
- Breadcrumb navigation
- User menu (perfil, configurações, logout)
- Notificações com badge counter
- Busca global

Cards de Métricas:
- Grid responsivo (4 colunas desktop, 2 tablet, 1 mobile)
- Receita total do mês
- Número de reservas
- Taxa de conversão
- Clientes ativos
- Crescimento percentual com indicadores visuais

Gráficos:
- Vendas por período (line chart)
- Destinos mais populares (bar chart)
- Status de reservas (donut chart)
- Cores da paleta definida
- Tooltips interativos
- Responsivos
```

#### 6.5.2. Gestão de Reservas

```
Lista de Reservas:
- Tabela com sorting e filtros
- Colunas: Número, Cliente, Pacote, Data, Status, Valor, Ações
- Filtros: Por status, data, valor, destino
- Busca por nome do cliente ou número da reserva
- Paginação
- Export para Excel/PDF

Status Visual:
- Badges coloridos:
  - Pendente: Amarelo
  - Confirmada: Verde
  - Cancelada: Vermelho
  - Em andamento: Azul

Quick Actions:
- Confirmar reserva
- Cancelar com modal de confirmação
- Enviar comprovante
- Visualizar detalhes completos
- Contatar cliente
```

#### 6.5.3. Gestão de Clientes

```
Lista de Clientes:
- Informações: Nome, Email, Telefone, Última reserva, Total gasto
- Busca por CPF, nome ou email
- Filtros por status (ativo/inativo)
- Histórico de reservas por cliente

Perfil do Cliente:
- Modal ou página dedicada
- Informações pessoais
- Histórico completo de reservas
- Total gasto na agência
- Preferências de viagem
- Botões de ação (contatar, editar, bloquear)
```

### 6.6. Módulo de Personalização (US23, US24, US25, US26)

#### 6.6.1. Solicitação de Personalização (Cliente)

```
Ponto de Entrada:
- Botão "Personalizar" na página de detalhes do pacote
- Seção dedicada no menu do cliente logado

Wizard de Personalização:
- Progress indicator com 3 etapas:
  1. Seleção do pacote base
  2. Modificações desejadas
  3. Informações adicionais

Pacote Base:
- Card com dados do pacote original
- Possibilidade de trocar por outro pacote
- Comparação visual lado a lado

Tipos de Modificações:
- Adicionar/remover noites:
  - Date picker para novas datas
  - Seleção de hotéis adicionais
  - Cálculo de custos estimados

- Trocar acomodação:
  - Grid de hotéis disponíveis
  - Filtros por categoria, preço, localização
  - Fotos, avaliações e preços comparativos

- Incluir passeios/atividades:
  - Checkbox list com descrições
  - Imagens e duração de cada atividade
  - Preços individuais

- Alterar transporte:
  - Opções de classe de voo
  - Alternativas de translado
  - Upgrade de veículos

Campos Adicionais:
- Textarea para observações especiais
- Upload de arquivos (referências, inspirações)
- Preferências alimentares
- Necessidades especiais

Preview da Solicitação:
- Resumo das modificações solicitadas
- Comparação com pacote original
- Timeline estimada para resposta
- Botão "Enviar solicitação"
```

#### 6.6.2. Acompanhamento de Solicitação (Cliente)

```
Lista de Solicitações:
- Cards com status visual
- Data da solicitação
- Pacote base
- Status atual
- Ações disponíveis

Status Possíveis:
- Pendente análise (Amarelo)
- Em orçamento (Azul)
- Orçamento enviado (Verde)
- Aprovada (Verde escuro)
- Recusada (Vermelho)
- Concluída (Cinza)

Detalhes da Solicitação:
- Timeline de interações
- Modificações solicitadas
- Orçamento recebido (se disponível)
- Chat/comentários com atendente
- Ações: Aceitar/Recusar orçamento, Fazer nova solicitação
```

#### 6.6.3. Visualização de Orçamento (Cliente)

```
Card de Orçamento:
- Destaque visual
- Valor proposto em evidência
- Detalhamento dos custos
- Data de validade
- Condições especiais

Comparação:
- Lado a lado: Original vs Personalizado
- Destacar diferenças de preço
- Benefícios da personalização

Ações:
- Botão "Aceitar Orçamento" (primário)
- Botão "Recusar" (secundário)
- Link "Negociar" (abrir chat)
- Botão "Salvar para depois"

Processo de Aceitação:
- Confirmação modal
- Redirecionamento para reserva
- Dados pré-preenchidos
```

#### 6.6.4. Gerenciamento de Solicitações (Admin)

```
Dashboard de Personalização:
- Cards com métricas:
  - Solicitações pendentes
  - Orçamentos enviados
  - Taxa de conversão
  - Valor médio de personalizações

Lista de Solicitações:
- Tabela filterable e sortable
- Priorização por data, valor estimado
- Assignment para atendentes
- Bulk actions

Detalhes da Solicitação:
- Layout em 2 colunas:
  - Esquerda: Dados do cliente e solicitação
  - Direita: Ferramentas de orçamento

Dados do Cliente:
- Perfil completo
- Histórico de reservas
- Preferências conhecidas
- Score de relacionamento

Ferramentas de Orçamento:
- Calculadora de custos
- Templates de orçamento
- Integração com fornecedores
- Margem de lucro automática

Modal de Criação de Orçamento:
- Breakdown detalhado de custos
- Campo para observações
- Data de validade
- Preview do email que será enviado
- Botão "Enviar Orçamento"
```

---

## 7. Estados e Micro-interações

### 7.1. Loading States

```css
/* Skeleton Screens */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Spinners */
.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid var(--primary-orange);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

/* Progress Bars */
.progress-bar {
  background: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}
.progress-bar__fill {
  background: var(--primary-orange);
  height: 8px;
  transition: width 0.3s ease;
}
```

### 7.2. Estados Vazios

```
Ilustrações Friendly:
- Nenhum pacote encontrado: Ilustração de mapa com lupa
- Sem reservas: Ilustração de mala de viagem
- Lista vazia: Ilustração temática relacionada ao contexto

Mensagens:
- Tom amigável e encorajador
- Ações claras para resolver o estado vazio
- Sugestões de próximos passos

CTAs:
- Direcionamento para ação principal
- Links para ajuda ou contato
```

### 7.3. Feedback e Notificações

```css
/* Toast Notifications */
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  padding: 16px 20px;
  max-width: 400px;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

.toast--success {
  border-left: 4px solid var(--success);
}
.toast--error {
  border-left: 4px solid var(--error);
}
.toast--warning {
  border-left: 4px solid var(--warning);
}

/* Modal Confirmations */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
```

### 7.4. Hover States e Transições

```css
/* Transições Padrão */
.transition-base {
  transition: all 0.2s ease-out;
}

/* Hover Effects */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(24, 35, 72, 0.15);
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.image-hover:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Focus States para Acessibilidade */
.focus-visible {
  outline: 2px solid var(--primary-orange);
  outline-offset: 2px;
}
```

---

## 8. Responsividade e Adaptações Mobile

### 8.1. Comportamento Mobile-First

```css
/* Navigation Mobile */
.nav-mobile {
  position: fixed;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100vh;
  background: var(--primary-dark);
  transition: left 0.3s ease;
  z-index: 999;
}
.nav-mobile.open {
  left: 0;
}

/* Cards Stack Behavior */
@media (max-width: 768px) {
  .grid-responsive {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .two-column-desktop {
    flex-direction: column;
  }

  .sidebar-desktop {
    order: -1; /* Sidebar first on mobile */
    position: sticky;
    bottom: 0;
    background: white;
    padding: var(--space-md);
    border-top: 1px solid #e0e0e0;
  }
}

/* Touch-Friendly Interactions */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}

/* Swipe Gestures */
.swipeable {
  touch-action: pan-x;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
```

### 8.2. Otimizações Mobile

```
Forms:
- Labels floating para economizar espaço
- Teclados específicos (numeric, email, tel)
- Auto-zoom desabilitado em inputs
- Submit buttons sticky bottom

Tables:
- Scroll horizontal com indicators
- Card layout alternativo
- Collapse de colunas menos importantes

Images:
- Lazy loading nativo
- Responsive sizes
- WebP com fallback
- Compression automática
```

---

## 9. Acessibilidade (WCAG 2.1 AA)

### 9.1. Contraste e Legibilidade

```css
/* Ratios de Contraste Mínimos */
/* Texto normal: 4.5:1 */
/* Texto grande (18px+): 3:1 */
/* Elementos gráficos: 3:1 */

/* Verificações implementadas */
.text-primary {
  color: #333333;
} /* 12.6:1 contra branco */
.text-secondary {
  color: #8a8a8a;
} /* 4.6:1 contra branco */
.link-primary {
  color: #da7818;
} /* 4.8:1 contra branco */
```

### 9.2. Navegação por Teclado

```css
/* Focus Management */
.focus-trap {
  outline: none;
}
.focus-trap:focus-visible {
  outline: 2px solid var(--primary-orange);
  outline-offset: 2px;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-dark);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}
.skip-link:focus {
  top: 6px;
}
```

### 9.3. Screen Readers

```html
<!-- Landmarks -->
<main role="main" aria-label="Conteúdo principal">
  <nav role="navigation" aria-label="Menu principal">
    <aside role="complementary" aria-label="Filtros de busca">
      <!-- Labels Descritivos -->
      <button aria-label="Fechar modal de detalhes do pacote">
        <img
          src="destino.jpg"
          alt="Vista aérea da praia de Copacabana no Rio de Janeiro"
        />

        <!-- Status Announcements -->
        <div aria-live="polite" id="status-announcements"></div>
        <div aria-live="assertive" id="error-announcements"></div>

        <!-- Form Associations -->
        <label for="checkout-email">Email para confirmação</label>
        <input
          id="checkout-email"
          type="email"
          aria-describedby="email-help"
          required
        />
        <div id="email-help">Você receberá a confirmação neste email</div>
      </button>
    </aside>
  </nav>
</main>
```

### 9.4. Indicadores Visuais

```css
/* Não depender apenas de cor */
.status-confirmed::before {
  content: "✓ ";
  color: var(--success);
}
.status-pending::before {
  content: "⏳ ";
  color: var(--warning);
}
.status-cancelled::before {
  content: "✗ ";
  color: var(--error);
}

/* Motion Preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Performance e Otimização

### 10.1. Carregamento de Imagens

```javascript
// Lazy Loading Nativo
<img src="placeholder.jpg"
     data-src="destino-real.jpg"
     loading="lazy"
     alt="Descrição detalhada">

// Responsive Images
<picture>
  <source media="(min-width: 768px)" srcset="destino-large.webp">
  <source media="(min-width: 480px)" srcset="destino-medium.webp">
  <img src="destino-small.webp" alt="Descrição">
</picture>
```

### 10.2. Code Splitting

```javascript
// Lazy Loading de Rotas
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));

// Chunk Splitting por Funcionalidade
const PaymentModule = lazy(() => import("./modules/Payment"));
```

### 10.3. Otimização de Bundle

```
Estratégias:
- Tree shaking para remover código não utilizado
- Minificação e compressão gzip
- Critical CSS inline
- Preload de recursos críticos
- Service Worker para cache
- CDN para assets estáticos
```

---

## 11. Integrações e APIs Externas

### 11.1. Google Maps Integration

```javascript
// Customização do Mapa
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ color: "#C09C7C" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#182348" }],
  },
];

// Markers Customizados
const markerIcon = {
  url: "/assets/map-marker.svg",
  scaledSize: new google.maps.Size(40, 40),
  fillColor: "#DA7818",
};
```

### 11.2. Stripe Payment Integration

```css
/* Customização do Stripe Elements */
.StripeElement {
  box-sizing: border-box;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  box-shadow: none;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  border-color: var(--primary-orange);
  box-shadow: 0 0 0 3px rgba(218, 120, 24, 0.1);
}

.StripeElement--invalid {
  border-color: var(--error);
}
```

### 11.3. Email Templates

```html
<!-- Template de Confirmação -->
<table
  style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;"
>
  <tr>
    <td style="background: #182348; padding: 20px; text-align: center;">
      <img src="logo-branco.png" alt="Logo da Agência" style="height: 60px;" />
    </td>
  </tr>
  <tr>
    <td style="padding: 40px 20px; background: #FFFFFF;">
      <h1 style="color: #182348; margin-bottom: 20px;">Reserva Confirmada!</h1>
      <p style="color: #333333; font-size: 16px; line-height: 1.5;">
        Parabéns! Sua reserva foi confirmada com sucesso.
      </p>
      <!-- Detalhes da reserva -->
      <div
        style="background: #C09C7C; padding: 20px; border-radius: 8px; margin: 20px 0;"
      >
        <h2 style="color: #182348; margin-top: 0;">Detalhes da sua viagem</h2>
        <!-- Informações do pacote -->
      </div>
      <a
        href="{{link_comprovante}}"
        style="display: inline-block; background: #DA7818; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;"
      >
        Ver Comprovante Completo
      </a>
    </td>
  </tr>
  <tr>
    <td
      style="background: #F5F5F5; padding: 20px; text-align: center; color: #8A8A8A; font-size: 14px;"
    >
      <p>
        Este email foi enviado automaticamente. Para dúvidas, entre em contato
        conosco.
      </p>
    </td>
  </tr>
</table>
```

---

## 12. Fluxos de Usuário Detalhados

### 12.1. Jornada do Cliente - Compra de Pacote

```
1. Landing Page
   ↓ (Busca por destino ou Browse)
2. Lista de Pacotes Filtrada
   ↓ (Click em "Ver detalhes")
3. Página de Detalhes do Pacote
   ↓ (Click em "Reservar")
4. Login/Cadastro (se não logado)
   ↓
5. Seleção de Datas e Pessoas
   ↓ (Continuar)
6. Dados dos Viajantes
   ↓ (Continuar)
7. Revisão e Confirmação
   ↓ (Finalizar)
8. Pagamento
   ↓ (Processamento)
9. Confirmação e Comprovante
   ↓
10. Email de Confirmação
    ↓
11. Área do Cliente (acompanhamento)
```

### 12.2. Jornada de Personalização

```
1. Página de Detalhes do Pacote
   ↓ (Click em "Personalizar")
2. Wizard de Personalização
   - Seleção de modificações
   - Detalhes especiais
   ↓ (Enviar solicitação)
3. Confirmação de Envio
   ↓ (Aguardar resposta)
4. Notificação de Orçamento
   ↓ (Visualizar orçamento)
5. Página de Orçamento
   ↓ (Aceitar/Recusar/Negociar)
6a. Se aceitar: Fluxo de reserva normal
6b. Se recusar: Feedback e nova solicitação
6c. Se negociar: Chat com atendente
```

### 12.3. Jornada do Administrador

```
1. Login Admin
   ↓
2. Dashboard com Métricas
   ↓ (Navegação por módulos)
3a. Gestão de Pacotes
    - Criar/Editar/Listar
3b. Gestão de Reservas
    - Acompanhar/Confirmar/Cancelar
3c. Gestão de Clientes
    - Visualizar histórico/Contatar
3d. Personalização
    - Analisar solicitações/Criar orçamentos
3e. Relatórios
    - Gerar/Exportar dados
```

---

## 13. Especificações Técnicas para Implementação

### 13.1. Estrutura de Componentes React

```
src/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── Toast/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── Footer/
│   └── business/
│       ├── PackageCard/
│       ├── ReservationForm/
│       ├── PaymentForm/
│       └── CustomizationWizard/
├── pages/
│   ├── Home/
│   ├── PackageList/
│   ├── PackageDetails/
│   ├── Checkout/
│   ├── Dashboard/
│   └── Admin/
├── hooks/
├── services/
├── utils/
└── styles/
    ├── globals.css
    ├── components.css
    └── utilities.css
```

### 13.2. Sistema de Temas

```javascript
// theme.js
export const theme = {
  colors: {
    primary: {
      dark: "#182348",
      orange: "#DA7818",
      light: "#C09C7C",
    },
    neutral: {
      white: "#FFFFFF",
      gray100: "#F5F5F5",
      gray500: "#8A8A8A",
      gray900: "#333333",
    },
    status: {
      success: "#28A745",
      error: "#DC3545",
      warning: "#FFC107",
      info: "#17A2B8",
    },
  },
  typography: {
    fontFamily: {
      primary: "Inter, sans-serif",
      secondary: "Poppins, sans-serif",
    },
    fontSize: {
      h1: "32px",
      h2: "28px",
      h3: "24px",
      h4: "20px",
      bodyLarge: "18px",
      body: "16px",
      bodySmall: "14px",
      caption: "12px",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "48px",
    "3xl": "64px",
  },
  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1440px",
  },
};
```

### 13.3. API Integration Patterns

```javascript
// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors para autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 14. Métricas e Analytics

### 14.1. KPIs de UX a Monitorar

```
Conversão:
- Taxa de conversão por funil (visualização → reserva → pagamento)
- Abandono de carrinho por etapa
- Tempo para completar reserva
- Taxa de sucesso de pagamentos

Engajamento:
- Tempo na página de detalhes do pacote
- Scroll depth nas páginas de conteúdo
- Cliques em CTAs
- Uso de filtros de busca

Performance:
- Page load time
- Time to interactive
- Core Web Vitals (LCP, FID, CLS)
- Error rate por página

Personalização:
- Taxa de solicitações de personalização
- Conversão de orçamentos enviados
- Tempo de resposta médio da equipe
- Valor médio de personalizações
```

### 14.2. A/B Tests Recomendados

```
1. Variações de CTA:
   - "Reservar Agora" vs "Garantir Vaga"
   - Cores do botão primário
   - Posicionamento do botão

2. Layouts de Card de Pacote:
   - Posição do preço
   - Quantidade de informações
   - Tamanho das imagens

3. Fluxo de Checkout:
   - Single page vs multi-step
   - Campos obrigatórios vs opcionais
   - Métodos de pagamento oferecidos

4. Personalização:
   - Posicionamento do botão "Personalizar"
   - Texto explicativo sobre o serviço
   - Formulário simples vs wizard
```

---

## 15. Documentação e Handoff

### 15.1. Design Tokens

```json
{
  "color": {
    "primary": {
      "dark": { "value": "#182348" },
      "orange": { "value": "#DA7818" },
      "light": { "value": "#C09C7C" }
    }
  },
  "typography": {
    "heading": {
      "h1": {
        "fontSize": { "value": "32px" },
        "lineHeight": { "value": "40px" },
        "fontWeight": { "value": "600" }
      }
    }
  },
  "spacing": {
    "xs": { "value": "4px" },
    "sm": { "value": "8px" },
    "md": { "value": "16px" }
  }
}
```

### 15.2. Component Documentation

```javascript
/**
 * Button Component
 *
 * @param {string} variant - primary | secondary | tertiary | destructive
 * @param {string} size - small | medium | large
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state with spinner
 * @param {function} onClick - Click handler
 * @param {ReactNode} children - Button content
 *
 * @example
 * <Button variant="primary" size="large" onClick={handleClick}>
 *   Reservar Agora
 * </Button>
 */
const Button = ({ variant, size, disabled, loading, onClick, children }) => {
  // Implementation
};
```

### 15.3. Style Guide Final

```
Este documento serve como guia completo para implementação da UI/UX do sistema de agência de viagens. Todos os elementos visuais, interações e padrões definidos aqui devem ser seguidos para garantir consistência e qualidade da experiência do usuário.

Principais diretrizes:
1. Sempre priorizar a experiência mobile
2. Manter consistência visual em todos os módulos
3. Implementar feedback claro para todas as ações
4. Garantir acessibilidade em todos os componentes
5. Otimizar performance em cada implementação
6. Testar todos os fluxos críticos
7. Documentar alterações e evoluções
```

---

## Conclusão

Este documento de especificação UI/UX fornece todas as diretrizes necessárias para o desenvolvimento de um sistema web moderno, acessível e eficiente para agência de viagens. A implementação deve seguir as especificações detalhadas, mantendo foco na experiência do usuário e nos objetivos de negócio estabelecidos.

A paleta de cores definida (#182348, #DA7818, #C09C7C) deve ser consistentemente aplicada em todos os componentes, criando uma identidade visual forte e profissional que transmita confiança e modernidade aos usuários do sistema.
