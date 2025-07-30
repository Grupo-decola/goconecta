# ASP.NET MVC com Bootstrap 5.3.7 - Diretrizes para Criação de Componentes

Este documento define as diretrizes para criar componentes em um projeto **ASP.NET MVC** com **.NET 8**, utilizando **Bootstrap 5.3.7** e **Bootstrap Icons 1.13.1**. As instruções garantem que os componentes sejam acessíveis, responsivos e sigam as práticas recomendadas do padrão MVC e do Bootstrap.

---

## Estrutura do Projeto

Siga o padrão MVC para manter a separação de preocupações:

- **Modelos:** Defina classes C# limpas com validação declarativa usando atributos do `System.ComponentModel.DataAnnotations`.
- **Controladores:** Implemente ações como métodos C# que processam solicitações e retornam views ou dados.
- **Exibições (Views):** Use Razor para renderizar HTML dinâmico com classes e componentes do Bootstrap.

### Exemplo de Estrutura de Arquivos

```
/Projeto
├── /Models
│   └── Person.cs
├── /Controllers
│   └── PeopleController.cs
├── /Views
│   ├── /People
│   │   ├── Index.cshtml
│   │   └── Details.cshtml
├── /wwwroot
│   ├── /css
│   │   └── site.css
│   ├── /js
│   │   └── site.js
│   └── /lib
│       ├── /bootstrap
│       └── /bootstrap-icons
├── /Properties
│   └── launchSettings.json
├── Program.cs
├── Startup.cs (ou equivalente em .NET 8)
└── .github
    └── copilot-instructions.md
```

---

## Diretrizes Gerais de Codificação

### Nomenclatura

- Use **PascalCase** para nomes de classes, interfaces e métodos públicos.
- Use **camelCase** para variáveis e parâmetros.
- Prefixe membros privados com `_` (ex: `_context`).
- Use **ALL_CAPS** para constantes.

### Validação

- Aplique atributos de validação (`[Required]`, `[MinLength]`, `[EmailAddress]`, etc.) nos modelos.
- Valide no lado do servidor e cliente usando as bibliotecas de validação do ASP.NET.

### Erro

- Use `try/catch` para operações assíncronas.
- Registre erros com informações contextuais usando logging do ASP.NET.

### Compatibilidade

- Use o doctype HTML5: `<!DOCTYPE html>`.
- Inclua a meta tag de viewport responsivo:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```

---

## Diretrizes do Bootstrap 5.3.7

### Inclusão do Bootstrap

Inclua o Bootstrap 5.3.7 via CDN ou gerenciador de pacotes:

#### CDN (em `_Layout.cshtml`):

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q" crossorigin="anonymous"></script>
```

#### NPM

```sh
npm install bootstrap@5.3.7
```

Em seguida, importe os arquivos compilados ou use Sass para personalização.

---

### Grid System

Use o sistema de grid do Bootstrap (`container`, `row`, `col-*`) para layouts responsivos.

Exemplo em Razor:

```html
<div class="container">
  <div class="row">
    <div class="col-md-6">
      <h2>Conteúdo</h2>
    </div>
    <div class="col-md-6">
      <p>Outro conteúdo</p>
    </div>
  </div>
</div>
```

---

### Utilitários

Aplique classes utilitárias do Bootstrap para espaçamento (`m-*`, `p-*`), tipografia (`text-*`), cores (`bg-*`, `text-*`) e outros.

Personalize via CSS variables:

```css
.custom-component {
  background-color: var(--bs-primary);
  color: var(--bs-white);
  padding: var(--bs-spacer);
}
```

---

### Componentes

Use componentes do Bootstrap (ex: navbar, card, modal, form) com atributos `data-bs-*` para interatividade.

Exemplo de formulário em Razor:

```csharp
@model Projeto.Models.Person

<div class="container mt-4">
  <form asp-action="Create" class="p-4 bg-light rounded-3 shadow-sm">
    <div class="mb-3">
      <label asp-for="Name" class="form-label"></label>
      <input asp-for="Name" class="form-control @Html.ValidationMessageFor(model => model.Name, "", new { @class = "invalid-feedback" })" />
    </div>
    <div class="mb-3">
      <label asp-for="Email" class="form-label"></label>
      <input asp-for="Email" class="form-control @Html.ValidationMessageFor(model => model.Email, "", new { @class = "invalid-feedback" })" />
    </div>
    <button type="submit" class="btn btn-primary">
      <i class="bi bi-save me-2"></i>Salvar
    </button>
  </form>
</div>
```

---

### Personalização com Sass

Importe apenas os componentes necessários para reduzir o tamanho do bundle:

```scss
// site.scss
$primary: #007bff;
$enable-shadows: true;

@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/root";
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/forms";
@import "bootstrap/scss/buttons";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/utilities/api";
```

Compile o Sass no `wwwroot/css/site.css` usando ferramentas como `sass` ou um pipeline de build.

---

## Diretrizes do Bootstrap Icons 1.13.1

### Inclusão

Inclua o Bootstrap Icons via CDN ou NPM:

#### CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
```

#### NPM

```sh
npm install bootstrap-icons
```

Configure `$bootstrap-icons-font-dir: "node_modules/bootstrap-icons/font/fonts";` no Sass.

---

### Uso

Use ícones como SVG embutido, sprite ou fonte de ícones:

#### SVG Embutido

```html
<svg class="bi bi-person-fill" width="16" height="16" fill="currentColor" aria-hidden="true">
  <use xlink:href="/lib/bootstrap-icons/bootstrap-icons.svg#person-fill"/>
</svg>
```

#### Fonte de Ícones

```html
<i class="bi bi-person-fill" style="font-size: 1.5rem; color: var(--bs-primary);"></i>
```

- Para ícones decorativos, adicione `aria-hidden="true"`.
- Para ícones semânticos (ex: em botões), use `aria-label`:

```html
<button class="btn btn-primary" aria-label="Salvar">
  <i class="bi bi-save" aria-hidden="true"></i>
</button>
```

---

## Diretrizes de Acessibilidade

### Atributos ARIA

Adicione `role` e `aria-*` onde necessário (ex: `role="img"` para ícones SVG, `aria-label` para controles interativos).

Exemplo:

```html
<button class="btn btn-danger" aria-label="Excluir item">
  <svg class="bi bi-trash" width="16" height="16" fill="currentColor" aria-hidden="true">
    <use xlink:href="/lib/bootstrap-icons/bootstrap-icons.svg#trash"/>
  </svg>
</button>
```

### Foco

Adicione `focusable="false"` em SVGs para evitar foco indesejado no Internet Explorer/Edge Legacy.

### Validação de Formulários

Use as classes `is-valid` e `is-invalid` do Bootstrap com mensagens de validação do ASP.NET:

```html
<input asp-for="Email" class="form-control @Html.ValidationMessageFor(model => model.Email, "", new { @class = "invalid-feedback" })" />
```

---

## Diretrizes do ASP.NET MVC

### Modelos

Defina modelos com validação declarativa:

```csharp
using System.ComponentModel.DataAnnotations;

namespace Projeto.Models
{
    public class Person
    {
        public int PersonId { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        [MinLength(2, ErrorMessage = "O nome deve ter pelo menos 2 caracteres")]
        public string Name { get; set; }

        [Phone(ErrorMessage = "Número de telefone inválido")]
        public string PhoneNumber { get; set; }

        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; }
    }
}
```

---

### Controladores

Implemente ações assíncronas com injeção de dependência:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projeto.Data;

namespace Projeto.Controllers
{
    public class PeopleController : Controller
    {
        private readonly AddressBookContext _context;

        public PeopleController(AddressBookContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            return View(await _context.People.ToListAsync());
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null) return NotFound();
            var person = await _context.People.FindAsync(id);
            if (person == null) return NotFound();
            return View(person);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Person person)
        {
            if (ModelState.IsValid)
            {
                _context.Add(person);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(person);
        }
    }
}
```

---

### Exibições (Razor)

Use a sintaxe Razor para renderizar HTML com Bootstrap:

```csharp
@model IEnumerable<Projeto.Models.Person>

@{
    ViewData["Title"] = "Lista de Pessoas";
}

<div class="container mt-4">
    <h1 class="mb-4">@ViewData["Title"]</h1>
    <a asp-action="Create" class="btn btn-primary mb-3">
        <i class="bi bi-plus-circle me-2"></i>Criar Novo
    </a>
    <div class="row">
        @foreach (var person in Model)
        {
            <div class="col-md-4 mb-3">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">@person.Name</h5>
                        <p class="card-text">@person.Email</p>
                        <a asp-action="Details" asp-route-id="@person.PersonId" class="btn btn-outline-primary">
                            <i class="bi bi-eye me-2"></i>Detalhes
                        </a>
                    </div>
                </div>
            </div>
        }
    </div>
</div>
```

---

## Configuração no Visual Studio Code

Para usar estas diretrizes com o GitHub Copilot:

1. Salve este arquivo em `.github/copilot-instructions.md`.
2. Habilite instruções:
    ```json
    {
      "github.copilot.chat.codeGeneration.useInstructionFiles": true
    }
    ```
3. Crie componentes:
    - Use prompts no Chat do VS Code, como: `/create-bootstrap-component componentName=PersonForm`.
    - Referencie este arquivo para garantir que o Copilot siga as diretrizes.

---

## Dicas Adicionais

- **Bancos de Dados:** Configure o `AddressBookContext` com suporte a bancos como SQL Server ou SQLite usando Entity Framework Core.
- **Build Pipeline:** Use ferramentas como `dotnet watch` ou `sass` para compilar Sass automaticamente.
- **Acessibilidade:** Teste a acessibilidade com ferramentas como Lighthouse ou leitores de tela.
- **Versionamento:** Mantenha este arquivo sob controle de versão para compartilhar com a equipe.
