# AGENTS.md - Development Guide

## Project Overview

- **Project name**: diario_alimentar
- **Type**: Vue 3 + Vite + TypeScript mobile web app
- **Package manager**: npm
- **Node.js**: ^20.19.0 || >=22.12.0

## Build / Lint / Test Commands

### Development

```sh
npm run dev          # Start dev server with hot reload
```

### Build

```sh
npm run build        # Type-check, compile and minify for production
npm run build-only   # Just build without type-check
npm run preview      # Preview production build locally
```

### Type Checking

```sh
npm run type-check   # Run vue-tsc for TypeScript validation
```

### Linting & Formatting

```sh
npm run lint         # Run full lint (oxlint + eslint)
npm run lint:oxlint  # Run oxlint only (fixes issues)
npm run lint:eslint  # Run eslint only (fixes issues)
npm run format       # Format code with Prettier (src/ only)
```

### Testing (not yet configured)

Tests will use **Vitest**. To run a single test:

```sh
npx vitest run <test-file>           # Run single test file
npx vitest run --reporter=verbose   # Verbose output
npx vitest run src/components/      # Run all tests in a directory
```

To add new tests, create test files with `.test.ts` or `.spec.ts` extension in the same directory as the code being tested.

## Code Style Guidelines

### General

- Use **Vue 3 Composition API** with `<script setup lang="ts">`
- Use **TypeScript** for all files (`.ts` and `.vue`)
- Enable `noUncheckedIndexedAccess` (be careful with array/object access)

### Formatting (Prettier)

- **No semicolons** at end of statements
- **Single quotes** for strings
- **Print width**: 100 characters
- **Trailing commas** in multi-line objects/arrays

### Imports

- Use path aliases: `@/` maps to `src/`
- Example: `import MyComponent from '@/components/MyComponent.vue'`
- Group imports in this order: external libs → internal modules → relative
- Sort imports alphabetically within groups

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.vue`)
- **Variables/functions**: camelCase (e.g., `getUserData`, `isLoading`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)
- **Types/interfaces**: PascalCase (e.g., `UserConfig`)
- **Files**: kebab-case for non-Vue files (e.g., `generateMealPdf.ts`)

### TypeScript

- Prefer `interface` over `type` for public APIs
- Use explicit return types for functions where not obvious
- Enable strict null checks (avoid `!` assertions)
- Use `unknown` when type is truly unknown, `any` when necessary
- Avoid `any` - use `unknown` and narrow the type

### Vue Specific

- Use `defineProps`, `defineEmits`, `defineExpose` in `<script setup>`
- Use `v-model` with strongly typed props when possible
- Prefer `<script setup>` over Options API
- Keep templates clean, move complex logic to composables
- Use `computed` for derived state, `watch` for side effects
- Use ref for primitives, reactive for objects

### Error Handling

- Use try/catch with specific error types
- Provide meaningful error messages
- Handle async errors with proper catch blocks
- Consider custom error types for domain-specific errors
- Never expose internal errors to users without translation

### Security Best Practices

- Never log secrets, API keys, or credentials
- Never commit secrets to the repository
- Use environment variables for sensitive configuration
- Validate all user inputs before processing
- Sanitize data before rendering or passing to external APIs

### CSS / Styling

- Use scoped styles in Vue components
- Follow BEM-like naming if using CSS classes
- Prefer CSS variables for theming
- Use Prettier for CSS files (same rules as JS)
- Mobile-first approach for responsive design

## Project Structure

```
src/
├── main.ts          # App entry point
├── App.vue          # Root component
├── components/      # Vue components
├── composables/     # Vue composables (hooks)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── assets/          # Static assets
└── styles/          # Global styles
```

## Workflow Guidelines

### Before Writing Code

1. Understand the existing code patterns in the codebase
2. Check similar components/utils for conventions
3. Plan the changes before implementing

### After Writing Code

1. Run `npm run type-check` to verify types
2. Run `npm run lint` to fix any linting issues
3. Test the changes manually if possible
4. Ensure the build succeeds with `npm run build`

### Git Conventions (when applicable)

- Use clear, concise commit messages
- Keep commits focused on a single change
- Never commit secrets or sensitive data

## IDE Recommendations

- **VS Code** with **Vue (Official)** extension (disable Vetur)
- Enable **Prettier** as default formatter
- **Vue.js devtools** browser extension for debugging
- Enable "Custom Object Formatter" in browser DevTools

## Key Dependencies

- `vue`: ^3.5.30
- `vite`: ^7.3.1
- `typescript`: ~5.9.3
- `vue-tsc`: ^3.2.5
- `oxlint`: ~1.51.0
- `eslint`: ^10.0.3
- `prettier`: 3.8.1
- `jspdf`: ^4.2.1
