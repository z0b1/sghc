# Tech Stack

This file defines the canonical, locked-in technology choices for this project.
Do not suggest alternatives unless a tool here is fundamentally unsuitable for the task.

---

## Core

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | **Next.js 15** (App Router) | Use App Router exclusively. No Pages Router. |
| Language | **TypeScript 5** (strict) | See `TYPESCRIPT.md` |
| Runtime | **Node.js 20 LTS** | — |
| Package manager | **pnpm** | Use `pnpm` for all install/run commands |

---

## Styling

| Tool | Role |
|------|------|
| **Tailwind CSS v4** | Utility-first styling — primary approach |
| **CSS Modules** | For complex, component-scoped styles that Tailwind can't cleanly express |
| **CSS custom properties** | Design tokens (colors, spacing, radius, type scale) — defined in `globals.css` |

Never use styled-components, emotion, or any CSS-in-JS library.

---

## UI Components

| Tool | Role |
|------|------|
| **shadcn/ui** | Headless, accessible base components |
| **Radix UI** (via shadcn) | Underlying primitive layer |
| **Lucide React** | Icons |

Install shadcn components with `pnpm dlx shadcn@latest add <component>`.
Do not install pre-styled component libraries (MUI, Chakra, Ant Design).

---

## Data & State

| Tool | Role |
|------|------|
| **TanStack Query v5** | Client-side async state (when needed) |
| **Zustand** | Minimal global UI state (modals, theme, session flags) |
| **React Hook Form** | Form state and submission |
| **Zod** | Schema validation — client and server |

No Redux. No Context for global state beyond theme/auth.

---

## Backend & API

| Tool | Role |
|------|------|
| **Next.js Route Handlers** | API endpoints (`app/api/`) |
| **Prisma** | ORM — PostgreSQL |
| **PostgreSQL** | Primary database |
| **next-auth v5 (Auth.js)** | Authentication |

---

## Dev Tooling

| Tool | Role |
|------|------|
| **ESLint** | Linting (next/core-web-vitals + typescript-eslint strict) |
| **Prettier** | Formatting (no config debates — use defaults + `"semi": false`) |
| **Husky + lint-staged** | Pre-commit hook: lint + type-check + format |
| **Vitest** | Unit and integration tests |
| **Playwright** | E2E tests |

---

## Deployment

| Tool | Role |
|------|------|
| **Vercel** | Hosting (first choice) |
| **Railway / Supabase** | Managed PostgreSQL |

---

## Package install reference

```bash
# Init
pnpm create next-app@latest --typescript --tailwind --eslint --app --src-dir

# UI
pnpm dlx shadcn@latest init
pnpm add lucide-react

# Forms & validation
pnpm add react-hook-form zod @hookform/resolvers

# Data fetching
pnpm add @tanstack/react-query
pnpm add zustand

# ORM
pnpm add prisma @prisma/client
pnpm dlx prisma init

# Auth
pnpm add next-auth@beta

# Dev
pnpm add -D vitest @vitejs/plugin-react playwright prettier husky lint-staged
```
