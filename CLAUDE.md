# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build with watch mode for development
- `npm test` - Run unit tests with Karma
- `npm run lint` - Run ESLint

## Architecture Overview

This is an Angular 19+ application using **standalone components** exclusively (no NgModules).

### Key Technologies
- **Angular 19** with standalone components
- **Tailwind CSS** for styling
- **ESLint** for linting (via angular-eslint)
- **TypeScript 5.5**
- **RxJS 7.8** for reactive programming
- **date-fns** for date manipulation
- **wavesurfer.js** for audio visualization

### Project Structure
```
src/
├── app/
│   ├── domains/           # Feature-based organization
│   │   ├── info/         # Info pages (about, not-found)
│   │   ├── products/     # Product-related features
│   │   └── shared/       # Shared components, services, pipes
│   ├── app.component.ts  # Root component
│   ├── app.config.ts     # Application configuration
│   └── app.routes.ts     # Router configuration
├── assets/               # Static assets
└── environments/         # Environment configurations
```

### Routing Features
- **Component Input Binding**: Enabled via `withComponentInputBinding()`
- **Lazy Loading**: All routes use `loadComponent()` for lazy loading
- **Route Preloading**: `PreloadAllModules` strategy
- **Path Parameters**: Uses `:slug` parameters for category and product routes

### Key Patterns
- **Standalone Components**: All components are standalone (no modules)
- **Path Aliases**: Uses `@shared` and `@info` path aliases
- **Signal Inputs**: Recent migration from decorator inputs to signal inputs
- **Reactive Services**: Services use RxJS for state management

### Environment Configurations
- `environment.ts` - Default production
- `environment.development.ts` - Development with source maps
- `environment.staging.ts` - Staging environment

### Testing Setup
- **Karma** test runner with Jasmine
- **Test files**: Generated alongside components (though many skip tests)
- **Coverage**: karma-coverage configured

### Code Style
- **ESLint**: Angular-specific rules via angular-eslint
- **TypeScript**: Strict mode enabled
- **Standalone**: All components use `standalone: true`
- **Imports**: Prefer path aliases (`@shared/`, `@info/`)