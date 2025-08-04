# ✈️ GoConecta - Plataforma Web de Reservas de Viagens

**GoConecta** é uma aplicação web fullstack desenvolvida para facilitar a busca, reserva e gerenciamento de pacotes de viagens, oferecendo uma experiência moderna, intuitiva e responsiva para clientes e administradores.

🔧 Projeto final da trilha **DecolaTech 6 - Avanade 2025**, com foco em boas práticas de desenvolvimento, segurança, performance e usabilidade.

---

## ✨ Funcionalidades

### 👤 Cliente

- Cadastro e login com validação
- Autenticação via JWT
- Visualização e filtros de pacotes turísticos
- Detalhamento completo dos pacotes
- Realização de reservas
- Pagamento online
- Histórico de reservas
- Programa de fidelidade: **Passaporte GoConecta**
- Página de ajuda com IA básica para dúvidas

### 🔐 Administrador

- Gerenciamento de pacotes e usuários
- Relatórios de reservas
- Painel de controle

---

## 🎯 Objetivos do Projeto

- 🌍 Oferecer uma plataforma acessível para explorar pacotes turísticos
- 🔐 Autenticação segura com token JWT
- 📱 Interface responsiva e amigável (Mobile First)
- 🧱 Arquitetura bem estruturada e organizada

---

## 🚀 Tecnologias Utilizadas

### Backend (C# .NET)

- `ASP.NET Core 7.0`
- `Entity Framework Core` + `SQL Server`
- `JWT Authentication`
- `DTOs`, `LINQ` e `Padrão Repositório`

### Frontend (React)

- `React.js` com `Vite`
- `Mantine UI` para estilização
- `React Router DOM` para rotas
- `Axios` para consumo da API
- `Context API` para autenticação
- `Responsivo` e `Mobile First`

---

## 🗂️ Estrutura do Projeto

```

app-goconecta/
├── app-goconecta.server/ # 🔙 Backend (C#)
│ ├── Controllers/
│ ├── DTOs/
│ ├── Models/
│ ├── Data/
│ ├── Repositories/
│ ├── Migrations/
│ └── Program.cs
│
└── app-goconecta.client/ # 💻 Frontend (React)
└── src/
├── components/
├── pages/
├── services/
├── context/
├── assets/
└── App.jsx
```

---

## ▶️ Como Rodar o Projeto

### 📌 Pré-requisitos

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js](https://nodejs.org/) com `npm` ou `yarn`
- SQL Server ou LocalDB

---

### ⚙️ Backend

```bash
cd app-goconecta.server
dotnet restore
dotnet ef database update
dotnet run


cd app-goconecta.client
npm install
npm run dev


💻 Frontend

cd app-goconecta.client
npm install
npm run dev


Acesse a aplicação: http://localhost:5173
A API estará disponível em: https://localhost:xxxx (ver porta no console)


👥 Autores (ordem alfabética)
Naiara Santos de Oliveira

Pedro Ghiotti Martins

Rafael Decothé de Oliveira

Rosilene Farias Domingues

Samantha Ellen Gonçalves Araújo

Vitor Marques Rodrigues

William Lima da Silva

Projeto desenvolvido em equipe durante o programa Avanade DecolaTech 6– 2025
```
