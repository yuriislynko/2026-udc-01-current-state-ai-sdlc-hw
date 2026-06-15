# Workflow — Counter Feature (Plan → Agent)

## Feature

A client-side counter on the home page: displays a numeric value, an increment button (+1), and a reset button (→ 0). No page reload required.

## Acceptance Criteria

1. Display current value.
2. Increment button adds 1.
3. Reset button sets value to 0.
4. No page reload.
5. Feature is on the home page.

---

## Plan Mode

Used plan mode to design the implementation before writing any code. Key decisions made during planning:

**Server Component vs. Client Component split** — The Next.js App Router home page (`app/page.tsx`) is a Server Component by default. Replacing the whole page with a Client Component would break streaming and SEO. The plan isolated the interactive state into a dedicated `Counter.tsx` with the `'use client'` directive, keeping `page.tsx` as a Server Component. This is the standard App Router pattern.

**Directory placement** — `AGENTS.md` says `src/components`, but no `src/` directory exists in this project. The plan chose `app/components/` instead, which aligns with the App Router layout and co-locates components with the routes that use them.

**No new dependencies** — Tailwind CSS 4 utility classes cover all the styling needs; no icon libraries or animation packages were added.

The plan output was a two-file change spec with exact code, a file-action table, and a criterion-to-code mapping table.

---

## Agent Mode

After the plan was approved, switched to agent mode for execution:

1. Created `app/components/Counter.tsx` with `useState` hook for counter state, an increment handler (`setCount(c => c + 1)`), and a reset handler (`setCount(0)`).
2. Replaced the default boilerplate in `app/app/page.tsx` with a focused page that imports and renders `Counter`.
3. Ran `npm run build` to confirm no TypeScript or build errors.

**What went exactly as planned:** Both files matched the plan spec; the build passed on the first attempt in 2.0 s (TypeScript + Turbopack).

**What was adjusted:** Nothing. The clear acceptance criteria and pre-decided architecture eliminated the need for any mid-implementation corrections. Zero correction turns were needed.

---

## Takeaway

Writing acceptance criteria as a numbered checklist before entering plan mode produced a tight spec with no ambiguity. The model's plan addressed each criterion explicitly (criterion-to-code mapping table), which meant agent execution had a concrete target to verify against rather than guessing intent.
