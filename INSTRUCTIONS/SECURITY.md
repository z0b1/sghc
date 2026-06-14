# Security

Security is structural, not an afterthought. These rules apply to every route, action, and component.

---

## Authentication

Use **next-auth v5 (Auth.js)**. Configuration lives in `lib/auth.ts`.

```ts
// lib/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session({ session, token }) {
      session.user.id = token.sub!
      session.user.role = token.role as string
      return session
    },
    jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
  },
})
```

**Getting the session:**

```ts
// Server Component or Route Handler
import { auth } from "@/lib/auth"

const session = await auth()
if (!session?.user) redirect("/login")
```

**Never** call `getSession()` on the client. Use `useSession()` from `next-auth/react` only for UI state (showing user name), never for access control.

---

## Authorization

Check authorization at **every** data access point — not just the route.

```ts
// server/queries/posts.ts
export async function getPost(id: string, userId: string): Promise<Post> {
  const post = await db.post.findUniqueOrThrow({ where: { id } })

  // Authorization check at the data layer
  if (post.authorId !== userId) {
    throw new Error("Forbidden")
  }

  return post
}
```

Use a middleware file to protect route groups:

```ts
// middleware.ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isAuthed = !!req.auth
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard")

  if (isProtected && !isAuthed) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
})

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
}
```

---

## Input Validation

**All input from the client is untrusted.** Validate with Zod before any database call.

```ts
// server/actions/createPost.ts
"use server"

import { auth } from "@/lib/auth"
import { createPostSchema } from "@/lib/validations/post"
import { db } from "@/lib/db"

export async function createPostAction(rawInput: unknown) {
  // 1. Auth check
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")

  // 2. Validate input (never trust the shape from the client)
  const input = createPostSchema.parse(rawInput)

  // 3. Write to DB
  return db.post.create({
    data: { ...input, authorId: session.user.id },
  })
}
```

Never use raw SQL string interpolation. Always use Prisma parameterized queries.

---

## API Route Security Checklist

Every `route.ts` handler must:

```ts
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { z } from "zod"

const bodySchema = z.object({ title: z.string().min(3) })

export async function POST(req: Request) {
  // ✅ 1. Check auth
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // ✅ 2. Parse and validate body
  const body = await req.json().catch(() => null)
  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  // ✅ 3. Business logic
  const result = await createPost(parsed.data, session.user.id)

  // ✅ 4. Never leak internal errors
  return NextResponse.json(result, { status: 201 })
}
```

---

## Environment Variables

- Secrets **never** go in `NEXT_PUBLIC_` vars.
- Validate all env vars at startup — see `ARCHITECTURE.md` for the `lib/env.ts` pattern.
- Rotate secrets immediately if exposed. Use `openssl rand -base64 32` to generate secrets.
- `.env.local` is in `.gitignore` by default. Confirm this before first commit.

Required secrets:
```
DATABASE_URL=
NEXTAUTH_SECRET=         # min 32 chars random
NEXTAUTH_URL=            # e.g. http://localhost:3000
```

---

## CSRF

Next.js Server Actions include built-in CSRF protection via the `Origin` header check.
Route Handlers do not — add CSRF validation manually for state-mutating endpoints if called from third-party clients.

---

## Content Security Policy

Add headers in `next.config.ts`:

```ts
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]

export default {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }]
  },
}
```

---

## XSS

- React escapes JSX output by default. Never use `dangerouslySetInnerHTML` with user-supplied content.
- If you must render user HTML, sanitize with `DOMPurify` first.

```ts
import DOMPurify from "isomorphic-dompurify"

const clean = DOMPurify.sanitize(userHtml)
return <div dangerouslySetInnerHTML={{ __html: clean }} />
```

---

## Rate Limiting

Use `@upstash/ratelimit` + Redis for API routes that accept unauthenticated traffic (login, signup, contact forms).

```ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
})

// In route handler
const { success } = await ratelimit.limit(ip)
if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 })
```

---

## Dependency Security

```bash
# Audit before shipping
pnpm audit

# Keep dependencies updated
pnpm update --interactive --latest
```

Pin major versions. Review changelogs before upgrading auth/db dependencies.
