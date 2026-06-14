# Styling

---

## Approach

Primary: **Tailwind CSS v4 utility classes**
Secondary: **CSS Modules** for complex animations or selectors Tailwind can't express
Foundation: **CSS custom properties** in `globals.css` for all design tokens

Never use inline `style={}` for anything other than truly dynamic values (e.g. a width set from JS math).
Never use styled-components, emotion, or any CSS-in-JS.

---

## Design Tokens — `globals.css`

Define all tokens here. Tailwind v4 reads these via `@theme`.

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-background: #0f0f11;
  --color-surface: #18181b;
  --color-border: #27272a;
  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #52525b;

  --color-accent: #6366f1;          /* indigo-500 */
  --color-accent-hover: #4f46e5;    /* indigo-600 */
  --color-accent-subtle: #1e1b4b;   /* indigo-950 */

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Typography */
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* Spacing scale (8px base) */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-24: 6rem;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);
  --shadow-glow: 0 0 20px rgb(99 102 241 / 0.3);

  /* Transitions */
  --duration-fast: 100ms;
  --duration-base: 200ms;
  --duration-slow: 350ms;
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base resets */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  background-color: var(--color-background);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Tailwind Usage Rules

**Do** use Tailwind for:
- Spacing, sizing, flex/grid layout
- Colors referencing tokens (`bg-background`, `text-accent`)
- Typography utilities
- Responsive variants (`md:`, `lg:`)
- State variants (`hover:`, `focus:`, `disabled:`)

**Don't** use Tailwind for:
- Complex keyframe animations (use CSS Modules + `@keyframes`)
- Long chains of 10+ classes that obscure intent — extract a component

---

## `cn()` utility

Always use `cn()` for conditional class merging. Never string concatenate classes.

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

```tsx
// Usage
<button
  className={cn(
    "rounded-md px-4 py-2 text-sm font-medium transition-colors",
    variant === "primary" && "bg-accent text-white hover:bg-accent-hover",
    variant === "ghost" && "text-text-secondary hover:text-text-primary",
    disabled && "cursor-not-allowed opacity-50",
    className
  )}
>
```

---

## Component Variants with CVA

Use `class-variance-authority` for multi-variant components.

```ts
import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  // base
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-white hover:bg-accent-hover",
        secondary: "bg-surface text-text-primary border border-border hover:bg-border",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-surface",
        destructive: "bg-error/10 text-error hover:bg-error/20",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}
```

---

## Layout Primitives

Use these pattern classes consistently:

```css
/* Page container */
.container { max-width: 1280px; margin-inline: auto; padding-inline: 1.5rem; }

/* Section padding */
.section { padding-block: 5rem; }

/* Stack (vertical flex) */
.stack { display: flex; flex-direction: column; }

/* Cluster (horizontal flex wrap) */
.cluster { display: flex; flex-wrap: wrap; align-items: center; }
```

---

## Responsive Design

Mobile-first. Breakpoints (Tailwind defaults):

| Prefix | Min-width |
|--------|----------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

Design the mobile layout first, then add `md:` and `lg:` overrides.

---

## Animation

```css
/* In a CSS Module — for entrance animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fadeInUp {
  animation: fadeInUp var(--duration-slow) var(--ease-default) both;
}
```

Tailwind's `animate-` utilities are fine for simple cases (spin, pulse, bounce).
Use Framer Motion for complex, orchestrated, or gesture-driven animations.
