# TypeScript Conventions

TypeScript strict mode is non-negotiable. Every rule here is enforced by the compiler or ESLint.

---

## tsconfig baseline

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## Hard Rules

### No `any`
```ts
// ❌
function process(data: any) {}

// ✅
function process(data: unknown) {
  if (typeof data === "string") { ... }
}
```

### No non-null assertions without a comment
```ts
// ❌
const el = document.getElementById("root")!

// ✅ — only when you can guarantee it
const el = document.getElementById("root") // mounted in layout, always present
if (!el) throw new Error("Root element not found")
```

### No type assertions (`as`) except for narrowing
```ts
// ❌
const user = data as User

// ✅ — use a Zod parse or type guard instead
const user = userSchema.parse(data)
```

---

## Types vs Interfaces

Use `interface` for object shapes that may be extended.
Use `type` for unions, intersections, primitives, and utility types.

```ts
// Object shapes → interface
interface User {
  id: string
  email: string
  role: "admin" | "user"
}

// Unions / computed → type
type Status = "idle" | "loading" | "error" | "success"
type UserWithPosts = User & { posts: Post[] }
```

---

## Naming

| Thing | Convention |
|-------|-----------|
| Types / Interfaces | `PascalCase` |
| Enums | `PascalCase` (avoid — prefer `as const` objects) |
| Generic params | Single uppercase letter or descriptive: `T`, `TData`, `TError` |
| Discriminated union tag | `kind` or `type` field |

```ts
// Prefer const objects over enums
const Role = { Admin: "admin", User: "user" } as const
type Role = typeof Role[keyof typeof Role]
```

---

## Zod + TypeScript integration

Infer types from Zod schemas — do not duplicate type definitions.

```ts
import { z } from "zod"

export const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  body: z.string().min(10),
  published: z.boolean().default(false),
})

// Infer the type — never write it by hand
export type CreatePostInput = z.infer<typeof createPostSchema>
```

---

## React Component Types

```ts
// Props — always explicit interface
interface ButtonProps {
  label: string
  variant?: "primary" | "ghost" | "destructive"
  onClick?: () => void
  disabled?: boolean
}

// Component — return type inferred, no explicit JSX.Element needed
export function Button({ label, variant = "primary", onClick, disabled }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant }))}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
```

---

## Async / Promise patterns

```ts
// ✅ Explicit return types on async server functions
async function getUser(id: string): Promise<User | null> {
  return db.user.findUnique({ where: { id } })
}

// ✅ Error handling — never swallow errors silently
async function safeGetUser(id: string): Promise<{ data: User } | { error: string }> {
  try {
    const user = await db.user.findUniqueOrThrow({ where: { id } })
    return { data: user }
  } catch {
    return { error: "User not found" }
  }
}
```

---

## Utility types to use

```ts
// Pick what you need from a larger type
type PostPreview = Pick<Post, "id" | "title" | "createdAt">

// Omit sensitive fields
type PublicUser = Omit<User, "passwordHash" | "totpSecret">

// Make fields optional for partial updates
type UpdatePostInput = Partial<Pick<Post, "title" | "body" | "published">>

// Readonly data from server
type ServerPost = Readonly<Post>
```

---

## Path aliases

Always use `@/` instead of relative paths for anything outside the immediate folder.

```ts
// ❌
import { db } from "../../../lib/db"

// ✅
import { db } from "@/lib/db"
```
