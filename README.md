# ✈️ Sistema de Gestão de Pacotes de Viagem

Este projeto tem como objetivo facilitar a gestão de pacotes de viagem, reservas, pagamentos e solicitações de personalização. Abaixo estão os principais componentes da base de dados:

---

## 👤 USUARIO
Armazena os dados dos usuários do sistema.

| Campo            | Tipo     | Restrições                           |
|------------------|----------|--------------------------------------|
| Id               | int      | PK                                   |
| Nome             | string   |                                      |
| Email            | string   | UK                                   |
| SenhaHash        | string   |                                      |
| Telefone         | string   |                                      |
| CPFPassaporte    | string   |                                      |
| Perfil           | string   | Cliente, Atendente, Administrador    |

---

## 🌍 PACOTE_VIAGEM
Define os pacotes disponíveis para reserva.

| Campo                 | Tipo     | Restrições |
|-----------------------|----------|------------|
| Id                    | int      | PK         |
| Titulo                | string   |            |
| Descricao             | string   |            |
| Destino               | string   |            |
| DuracaoDias           | int      |            |
| DataDisponivelInicio  | date     |            |
| DataDisponivelFim     | date     |            |
| Valor                 | decimal  |            |
| ImagensURLs           | string   |            |
| VideosURLs            | string   |            |

---

## 🧾 RESERVA
Controla as reservas feitas pelos usuários.

| Campo         | Tipo     | Descrição                           |
|---------------|----------|-------------------------------------|
| Id            | int      | PK                                  |
| IdUsuario     | int      | FK para USUARIO                     |
| IdPacoteViagem| int      | FK para PACOTE_VIAGEM               |
| DataReserva   | date     |                                     |
| Status        | string   | Pendente, Confirmada, Cancelada     |
| NumeroReserva | string   |                                     |
| ValorTotal    | decimal  |                                     |

---

## 💳 PAGAMENTO
Registro dos pagamentos efetuados pelas reservas.

| Campo               | Tipo     | Descrição                             |
|---------------------|----------|---------------------------------------|
| Id                  | int      | PK                                    |
| IdReserva           | int      | FK para RESERVA                       |
| GatewayTransacaoId  | string   |                                        |
| MetodoPagamento     | string   |                                        |
| ValorPago           | decimal  |                                        |
| DataPagamento       | date     |                                        |
| StatusPagamento     | string   | Pendente, Aprovado, Recusado          |
| ComprovanteURL      | string   |                                        |

---

## ⭐ AVALIACAO
Feedback dos usuários sobre pacotes de viagem.

| Campo           | Tipo     | Descrição                  |
|------------------|----------|----------------------------|
| Id               | int      | PK                         |
| IdUsuario        | int      | FK para USUARIO            |
| IdPacoteViagem   | int      | FK para PACOTE_VIAGEM      |
| Nota             | int      | Avaliação de 1 a 5         |
| Comentario       | string   |                            |
| DataAvaliacao    | date     |                            |

---

## 🎯 SOLICITACAO_PERSONALIZACAO
Pedidos personalizados realizados pelos usuários.

| Campo                   | Tipo     | Descrição                                                               |
|--------------------------|----------|-------------------------------------------------------------------------|
| Id                       | int      | PK                                                                      |
| IdUsuario                | int      | FK para USUARIO                                                         |
| IdPacoteViagem           | int      | FK (Opcional, se a personalização for baseada em um pacote existente)  |
| DescricaoModificacoes    | string   |                                                                         |
| Status                   | string   | Pendente, Em Orçamento, Aprovada, Recusada, Concluída                  |
| DataSolicitacao          | date     |                                                                         |

---

## 💰 ORCAMENTO_PERSONALIZACAO
Propostas de orçamento para solicitações personalizadas.

| Campo                   | Tipo     | Descrição                            |
|--------------------------|----------|--------------------------------------|
| Id                       | int      | PK                                   |
| IdSolicitacaoPersonalizacao | int  | FK para SOLICITACAO_PERSONALIZACAO   |
| ValorProposto            | decimal  |                                      |
| DetalhesOrcamento        | string   |                                      |
| DataValidade             | date     |                                      |
| Status                   | string   | Enviado, Aceito, Recusado            |



---



