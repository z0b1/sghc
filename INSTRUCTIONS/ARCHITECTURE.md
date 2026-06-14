# Architecture & Project Structure

---

## Directory Layout

```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Route group — auth pages (no layout shared)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (marketing)/            # Route group — public-facing pages
│   │   └── page.tsx            # Homepage
│   ├── dashboard/              # Protected app shell
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/                    # Route Handlers
│   │   └── [...]/route.ts
│   ├── layout.tsx              # Root layout
│   ├── not-found.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                     # shadcn-generated primitives (do not hand-edit)
│   ├── layout/                 # Shell components: Navbar, Sidebar, Footer
│   └── [feature]/              # Feature-scoped components
│
├── lib/
│   ├── auth.ts                 # next-auth config
│   ├── db.ts                   # Prisma client singleton
│   ├── validations/            # Zod schemas
│   └── utils.ts                # cn() and other shared utilities
│
├── hooks/                      # Custom React hooks (client-only)
├── server/                     # Server-only logic (never imported by client)
│   ├── actions/                # Next.js Server Actions
│   └── queries/                # Database query functions
├── types/                      # Shared TypeScript types and interfaces
└── config/                     # App-level constants (site metadata, nav links)
```

---

## Routing Conventions

- Use **route groups** `(name)` to share layouts without adding URL segments.
- Use **parallel routes** `@slot` only for intentional simultaneous views (e.g. modals alongside a page).
- Use **intercepting routes** `(.)` for modal-style navigation (e.g. image lightbox).
- Dynamic segments use `[param]` and catch-alls use `[...param]`.
- Page files are always `page.tsx`. Layouts are always `layout.tsx`.

---

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Pages / layouts | lowercase (Next.js convention) | `page.tsx` |
| Hooks | camelCase, `use` prefix | `useUser.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Zod schemas | camelCase, `Schema` suffix | `loginSchema.ts` |
| Types | PascalCase, in `types/` | `User.ts` |
| Server actions | camelCase, `action` suffix | `createPostAction.ts` |

---

## Component Co-location

Small, single-use sub-components **can** live in the same file as the parent.
If a sub-component is used by more than one parent, extract it to `components/`.

```tsx
// ✅ OK — single use, same file
function PostCard({ post }: { post: Post }) {
  return <article><PostMeta post={post} /></article>
}

function PostMeta({ post }: { post: Post }) {
  return <time>{formatDate(post.createdAt)}</time>
}
```

---

## Server vs Client Boundary

```
Server Component (default)
  └── can import Server Components, async functions, db queries
  └── CANNOT use useState, useEffect, event handlers, browser APIs

Client Component ("use client")
  └── can use hooks, events, browser APIs
  └── CANNOT directly call db or read secrets
```

Rules:
- Mark a component `"use client"` as low in the tree as possible.
- Pass server-fetched data down as props — do not fetch inside Client Components unless using TanStack Query.
- Keep Client Component files small. Extract the interactive part, keep the rest server-rendered.

---

## Data Flow

```
Route (page.tsx, Server Component)
  └── calls server/queries/*.ts  →  Prisma  →  DB
  └── passes data as props to components
      └── Client Component (if interactive) receives typed props
          └── mutations via Server Actions or API Route Handlers
```

Server Actions live in `server/actions/`. They are `async` functions marked `"use server"`.
They validate input with Zod before touching the database.

---

## API Route Conventions

```
app/api/
  posts/
    route.ts          # GET /api/posts, POST /api/posts
    [id]/
      route.ts        # GET /api/posts/:id, PATCH, DELETE
```

Every route handler must:
1. Validate the request body/params with Zod.
2. Check authentication via `getServerSession` or `auth()`.
3. Return typed `NextResponse.json()` with appropriate status codes.
4. Handle errors explicitly — never let unhandled exceptions leak stack traces.

---

## Environment Variables

```
.env.local           # Local secrets — never committed
.env.example         # Template with all keys, no values — committed
```

- `NEXT_PUBLIC_` prefix: safe to expose to the browser (e.g. `NEXT_PUBLIC_APP_URL`).
- Everything else (DB URL, API secrets, auth secrets): server-side only.
- Access via `process.env.VAR_NAME`. Type-check env vars at startup with a Zod schema in `lib/env.ts`.

```ts
// lib/env.ts
import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
```
