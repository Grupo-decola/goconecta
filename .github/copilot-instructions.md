# Copilot Instructions

This project adheres to the **Conventional Commits** specification to ensure clear and consistent commit messages, facilitating automated changelog generation and semantic versioning. Below are the guidelines for structuring commit messages.

## Conventional Commits Standard

Commit messages should follow the format:

```
<type>(<scope>): <description>
```

### 1. **Types**
Use one of the following types to categorize the change:
- **feat**: A new feature or enhancement.
- **fix**: A bug fix.
- **docs**: Documentation-only changes.
- **style**: Changes that do not affect code meaning (e.g., formatting, white-space).
- **refactor**: Code refactoring without adding features or fixing bugs.
- **perf**: Performance improvements.
- **test**: Adding or updating tests.
- **build**: Changes to the build system or external dependencies.
- **ci**: Changes to CI configuration or scripts.
- **chore**: Miscellaneous changes that don’t fit other types (e.g., updating dependencies).
- **revert**: Reverts a previous commit.

### 2. **Scope**
Specify the scope of the change in parentheses (optional but recommended). The scope should be a noun describing the affected module, component, or area (e.g., `auth`, `ui`, `api`).

### 3. **Description**
Provide a concise description of the change:
- Use the imperative mood (e.g., "Add user authentication" instead of "Added user authentication").
- Keep it short and clear, ideally under 50 characters, but provide enough context.
- Avoid starting with a capital letter or ending with a period.

### 4. **Optional Fields**
- **Footer**: Include additional metadata like issue references or breaking change notes.
  - For breaking changes, include `BREAKING CHANGE: <description>` in the footer.
  - Example: `Closes #123` to reference an issue.

### Example Commit Messages
```
feat(auth): add JWT-based user authentication
fix(ui): resolve button alignment issue on mobile
docs(readme): update installation instructions
refactor(api): simplify error handling logic
chore(deps): update lodash to v4.17.21
feat(db): add migration for user roles
BREAKING CHANGE: remove deprecated API endpoints
```

## Guidelines for GitHub Copilot
When suggesting code or commit messages, GitHub Copilot should:
- Generate commit messages that adhere to the Conventional Commits format.
- Suggest appropriate `<type>` based on the code changes (e.g., `feat` for new features, `fix` for bug fixes).
- Include a relevant `<scope>` when applicable, based on the modified files or context.
- Keep descriptions concise, imperative, and lowercase.
- Detect potential breaking changes and include `BREAKING CHANGE` in the footer when necessary.
- Reference relevant issue numbers if provided in the context (e.g., `Closes #123`).

By following these conventions, we ensure a standardized and maintainable commit history.