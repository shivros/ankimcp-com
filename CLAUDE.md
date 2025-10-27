# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit application configured for deployment on Vercel. The project uses:

- **SvelteKit 2.16.0** with **Svelte 5.25.0**
- **TypeScript** with strict mode
- **TailwindCSS v4** for styling
- **Vitest** with Playwright for testing
- **Bun** as the package manager (bun.lock present)

## Essential Commands

```bash
# Development
npm run dev              # Start development server (default port 5173)
npm run dev -- --open    # Start and open in browser

# Build & Preview
npm run build           # Build for production
npm run preview         # Preview production build

# Testing
npm run test            # Run tests once
npm run test:unit       # Run tests in watch mode

# Code Quality
npm run check           # Type checking with svelte-check
npm run lint            # ESLint with Prettier
npm run format          # Format code with Prettier
```

## Project Structure

SvelteKit uses file-based routing. Key patterns:

- **Routes**: `src/routes/`
  - `+page.svelte` - Page component
  - `+page.ts` - Universal load function
  - `+page.server.ts` - Server-only load function & form actions
  - `+layout.svelte` - Layout wrapper
  - `+error.svelte` - Error page

- **Components**: Place reusable components in `src/lib/`
- **Server API**: Create `+server.ts` files for API routes
- **Static Assets**: Use `static/` directory (served at root)

## Important Conventions

1. **Imports**: Use `$lib` alias for `src/lib` imports
2. **State Management**: Use Svelte 5 runes (`$state`, `$derived`, etc.)
3. **Data Loading**: Prefer `+page.ts` load functions over client-side fetching
4. **Form Handling**: Use SvelteKit form actions in `+page.server.ts`
5. **Environment Variables**:
   - Public: `$env/static/public` or `$env/dynamic/public`
   - Private: `$env/static/private` or `$env/dynamic/private` (server-only)

## Testing Approach

Tests are configured for both server (Node) and client (browser via Playwright):

- Unit tests: `*.{test,spec}.{js,ts}`
- Component tests: `*.svelte.{test,spec}.{js,ts}`
- Use `describe.concurrent` for parallel test execution
- Browser tests use Playwright's Chromium

## Deployment

The project uses `@sveltejs/adapter-vercel` for deployment. Build output is optimized for Vercel's infrastructure.
