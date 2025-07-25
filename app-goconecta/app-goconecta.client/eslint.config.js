import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'semi': ['error', 'always'], // Require semicolons
      'semi-spacing': ['error', { before: false, after: true }], // Spacing around semicolons
      'no-extra-semi': 'error', // Disallow unnecessary semicolons
    },
  },
  { ignores: ['**/*.{mjs,cjs,d.ts,d.mts}', 'obj/**', 'node_modules/**', 'dist/**'] },
);