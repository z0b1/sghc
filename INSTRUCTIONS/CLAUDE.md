# Claude Instructions — Modern Web Stack

This file is the entry point for Claude when working on this project.
Load the relevant modules below based on the task at hand.

---

## Instruction Modules

| File | Scope |
|------|-------|
| [`STACK.md`](./STACK.md) | Canonical tech stack, versions, and tooling decisions |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Project structure, file conventions, and routing patterns |
| [`TYPESCRIPT.md`](./TYPESCRIPT.md) | TypeScript rules, patterns, and strict-mode conventions |
| [`STYLING.md`](./STYLING.md) | CSS / Tailwind design system, tokens, and component styling |
| [`SECURITY.md`](./SECURITY.md) | Auth, input validation, API safety, and environment secrets |
| [`COMPONENTS.md`](./COMPONENTS.md) | Component authoring rules, composition patterns, accessibility |

---

## Quick Rules (always active)

- **TypeScript strict mode** everywhere. No `any`. No implicit types.
- **Server Components by default.** Add `"use client"` only when state, effects, or browser APIs are required.
- **Never expose secrets** in client bundles. All env vars that are secret live server-side only.
- **Accessible by default.** Every interactive element must be keyboard-navigable and screen-reader labelled.
- **No `useEffect` for data fetching.** Use Server Components, React Query, or SWR.
- **Inputs are always validated** — Zod on the server, never trust the client.
- Follow file and export conventions in `ARCHITECTURE.md` without exception.

---

## When starting a new feature

1. Read `ARCHITECTURE.md` to place files correctly.
2. Read `TYPESCRIPT.md` before writing any types or interfaces.
3. Read `COMPONENTS.md` before scaffolding any component.
4. Read `SECURITY.md` if the feature touches auth, forms, or API routes.
5. Read `STYLING.md` before writing any CSS or Tailwind classes.
