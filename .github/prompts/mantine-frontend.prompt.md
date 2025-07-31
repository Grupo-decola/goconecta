# MantineFrontend.prompt.md

## Description
This prompt configures GitHub Copilot to generate React components using the Mantine framework (v7 or later) with TypeScript. It ensures components are styled with Mantine’s best practices, leverage pre-built UI components from ui.mantine.dev, and incorporate custom color schemes generated via the Mantine Colors Generator. The generated code should be modular, accessible, and follow Mantine’s conventions for theming, responsiveness, and TypeScript types.

## Instructions
When generating code for a React frontend project:
1. Use Mantine v7 or later as the primary UI framework.
2. Always include TypeScript with proper type annotations for props, state, and Mantine components.
3. Import components from `@mantine/core` and hooks from `@mantine/hooks`.
4. Use pre-built components from [ui.mantine.dev](https://ui.mantine.dev/) when applicable, adapting them to the project’s needs.
5. Apply custom color schemes generated from [Mantine Colors Generator](https://mantine.dev/colors-generator/) for theming. Default to a 10-shade color palette unless specified otherwise.
6. Ensure components are responsive using Mantine’s `styles`, `sx`, or `createStyles` for styling.
7. Include accessibility (a11y) attributes, such as `aria-label`, where relevant.
8. Use the `MantineProvider` to wrap components for consistent theming.
9. Follow modular file structure: one component per file, with a clear naming convention (e.g., `UserProfile.tsx`).
10. When generating forms, use `@mantine/form` for form management and validation.
11. Prefer functional components and hooks over class components.
12. Include comments explaining complex logic or Mantine-specific configurations.

## Context
- **Framework**: Mantine v7 or later.
- **Language**: TypeScript with React.
- **Theming**: Use a custom theme defined in `theme.ts` with colors generated from [Mantine Colors Generator](https://mantine.dev/colors-generator/).
- **Components**: Prioritize components from `@mantine/core` and adapt pre-built components from [ui.mantine.dev](https://ui.mantine.dev/).
- **Styling**: Use Mantine’s `sx`, `styles`, or `createStyles` for responsive and theme-aware styling.
- **Project Structure**: Components in `src/components/`, theme in `src/theme.ts`, and utilities in `src/utils/`.
- **Dependencies**: Ensure `@mantine/core`, `@mantine/hooks`, and `@mantine/form` are installed.

## Example
**Prompt**: "Create a user profile card with a name, email, and avatar, styled with Mantine."

**Expected Output**:
```tsx
// src/components/UserProfileCard.tsx
import { Card, Image, Text, Group, MantineProvider, useMantineTheme } from '@mantine/core';
import { IconMail } from '@tabler/icons-react';
import type { FC } from 'react';

interface UserProfileCardProps {
  name: string;
  email: string;
  avatarUrl: string;
}

const UserProfileCard: FC<UserProfileCardProps> = ({ name, email, avatarUrl }) => {
  const theme = useMantineTheme();

  return (
    <MantineProvider theme={theme}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Group position="apart" mb="xs">
          <Text weight={500} size="lg" aria-label="User name">
            {name}
          </Text>
        </Group>
        <Group>
          <Image src={avatarUrl} height={60} width={60} radius="xl" alt={`Avatar of ${name}`} />
          <Group>
            <IconMail size={20} stroke={1.5} color={theme.colors.primary[6]} />
            <Text size="sm" color="dimmed" aria-label="User email">
              {email}
            </Text>
          </Group>
        </Group>
      </Card>
    </MantineProvider>
  );
};

export default UserProfileCard;
```

**Theme Configuration** (to be referenced in `src/theme.ts`):
```tsx
// src/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    primary: [
      '#f0f7ff',
      '#e0edff',
      '#c4daff',
      '#a6c4ff',
      '#8ab0ff',
      '#6d9bff',
      '#5186ff', // Primary color
      '#386dff',
      '#2056ff',
      '#0039e6',
    ],
  },
  primaryColor: 'primary',
  fontFamily: 'Inter, sans-serif',
});
```

**Usage Example**:
```tsx
// src/App.tsx
import { MantineProvider } from '@mantine/core';
import UserProfileCard from './components/UserProfileCard';
import { theme } from './theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <UserProfileCard
        name="John Doe"
        email="john.doe@example.com"
        avatarUrl="https://example.com/avatar.jpg"
      />
    </MantineProvider>
  );
}

export default App;
```

## Notes
- Use the [Mantine Colors Generator](https://mantine.dev/colors-generator/) to create a 10-shade color palette for the `theme.ts` file.
- Refer to [ui.mantine.dev](https://ui.mantine.dev/) for pre-built components like `Navbar`, `Footer`, or `DataTable` to save time.
- If the prompt involves forms, integrate `@mantine/form` with validation rules (e.g., `useForm` hook).
- For complex layouts, use Mantine’s `Grid` or `Flex` components for responsiveness.
- Test generated code for accessibility using tools like `axe` or browser dev tools.

## References
- [Mantine Documentation](https://mantine.dev/)
- [Mantine UI Components](https://ui.mantine.dev/)
- [Mantine Colors Generator](https://mantine.dev/colors-generator/)
- [GitHub Copilot Customization in VS Code](https://code.visualstudio.com/docs/copilot/copilot-customization)