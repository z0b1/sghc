# Components

---

## Anatomy of a Component File

```tsx
// components/PostCard.tsx

import { type Post } from "@/types/Post"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils"

// 1. Props interface — always explicit
interface PostCardProps {
  post: Post
  className?: string
  featured?: boolean
}

// 2. Named export (not default) — easier to refactor, tree-shakeable
export function PostCard({ post, className, featured = false }: PostCardProps) {
  return (
    <article
      className={cn(
        "rounded-lg border border-border bg-surface p-6 transition-shadow hover:shadow-md",
        featured && "border-accent/50 shadow-glow",
        className
      )}
    >
      <header>
        <h2 className="text-lg font-semibold text-text-primary">{post.title}</h2>
        <time
          dateTime={post.createdAt.toISOString()}
          className="text-sm text-text-muted"
        >
          {formatDate(post.createdAt)}
        </time>
      </header>
      <p className="mt-3 text-sm text-text-secondary line-clamp-3">{post.excerpt}</p>
    </article>
  )
}
```

---

## Rules

- **Named exports only.** No `export default` for components.
- **One component per file** (small sub-components in the same file are fine — see `ARCHITECTURE.md`).
- **Always accept and forward `className`** on container elements of presentational components.
- **Props interfaces live in the same file.** Move to `types/` only if shared across 3+ components.
- **No prop drilling beyond 2 levels.** Lift state or use Zustand instead.

---

## Server vs Client Components

```tsx
// ✅ Server Component (no directive needed — default)
// Can be async, access db, read files
export async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) notFound()
  return <div>{user.name}</div>
}

// ✅ Client Component — mark at the top of the file
"use client"

import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

**Pattern — push interactivity to leaves:**

```tsx
// page.tsx (Server Component)
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id)
  return (
    <article>
      <PostContent post={post} />      {/* Server Component */}
      <LikeButton postId={post.id} /> {/* Client Component — only this needs "use client" */}
    </article>
  )
}
```

---

## Accessibility (A11y)

These are requirements, not suggestions.

### Interactive elements
- Every `<button>` has a visible label or `aria-label`.
- Never use `<div onClick>` — use `<button>` or `<a>`.
- Focus indicators must be visible. Do not `outline: none` without a replacement.

```tsx
// ❌
<div onClick={handleClose} className="cursor-pointer">×</div>

// ✅
<button onClick={handleClose} aria-label="Close dialog" className="...">
  <X aria-hidden="true" />
</button>
```

### Images
```tsx
// Decorative images
<Image src={bg} alt="" role="presentation" />

// Informative images
<Image src={avatar} alt={`${user.name}'s profile photo`} />
```

### Forms
Every form input must have an associated `<label>`.

```tsx
<div>
  <label htmlFor="email" className="text-sm font-medium text-text-primary">
    Email address
  </label>
  <input
    id="email"
    type="email"
    aria-describedby={error ? "email-error" : undefined}
    aria-invalid={!!error}
    className="..."
  />
  {error && (
    <p id="email-error" role="alert" className="text-sm text-error">
      {error.message}
    </p>
  )}
</div>
```

### Landmarks
Pages must have exactly one `<main>`, one `<header>`, and one `<footer>` at the root layout.
Use `<nav>` for navigation lists. Use `<section aria-labelledby>` for page sections.

### Keyboard navigation
- Tab order must follow visual order.
- Modal dialogs must trap focus while open (Radix UI handles this automatically).
- Skip-to-content link at the top of the page:

```tsx
// layout.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 ..."
>
  Skip to main content
</a>
```

---

## Forms with React Hook Form + Zod

```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginInput } from "@/lib/validations/auth"

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    await signIn("credentials", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
        {errors.email && <p role="alert">{errors.email.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  )
}
```

---

## Loading and Error States

Every async component should handle all states:

```tsx
// Async Server Component
export async function PostList() {
  const posts = await getPosts() // throws on failure → caught by error.tsx

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-text-muted">
        <p>No posts yet.</p>
      </div>
    )
  }

  return (
    <ul>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </ul>
  )
}
```

Provide `loading.tsx` and `error.tsx` at every route segment that has async data.

---

## shadcn/ui Usage

- Install components via CLI: `pnpm dlx shadcn@latest add button dialog`
- Do **not** hand-edit files in `components/ui/` — re-run the CLI to update.
- Extend shadcn components by wrapping, not modifying:

```tsx
// components/AppButton.tsx — extends shadcn Button
import { Button, type ButtonProps } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface AppButtonProps extends ButtonProps {
  loading?: boolean
}

export function AppButton({ loading, children, disabled, ...props }: AppButtonProps) {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </Button>
  )
}
```
