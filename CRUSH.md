# Project Guidelines for restrict_me

## Build/Lint/Test Commands

*   **Build**: `bun run build` (or `tsc -b && vite build`)
*   **Lint**: `bun run lint` (or `eslint .`)
*   **Test**: No explicit test command configured. Consider adding a test framework like Vitest or Jest.
    *   To run a single test, the command will depend on the chosen test framework. (e.g., `vitest <path/to/test_file.test.ts>`)

## Code Style Guidelines

*   **Imports**: Follow ESLint rules for import order and structure. React hook rules are enforced.
*   **Formatting**: Adhere to ESLint's formatting rules.
*   **Types**: Use TypeScript for strong typing. Refer to `tsconfig.app.json` and `tsconfig.node.json` for specific TypeScript configurations.
*   **Naming Conventions**:
    *   **Components**: PascalCase (e.g., `MyComponent`)
    *   **Variables/Functions**: camelCase (e.g., `myVariable`, `myFunction`)
    *   **Constants**: UPPER_SNAKE_CASE (e.g., `MY_CONSTANT`)
*   **Error Handling**: Implement clear and concise error handling with meaningful error messages.
