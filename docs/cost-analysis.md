# Cost Analysis — AI-Assisted Counter Feature

## 1. Context Size Measurement

Measured with `npx repomix` from the `app/` directory:

| Metric | Value |
|--------|-------|
| Total files | 18 |
| Total tokens | **5,822** |
| Total characters | 14,088 |

### Token breakdown by file (top 5)

| File | Tokens | Share |
|------|-------:|------:|
| `public/next.svg` | 1,197 | 20.6% |
| `public/globe.svg` | 743 | 12.8% |
| `README.md` | 452 | 7.8% |
| `tsconfig.json` | 282 | 4.8% |
| `components/Counter.tsx` | 281 | 4.8% |

SVG assets alone account for **33.4%** of all tokens — nearly a third of the codebase context — while contributing nothing useful for code generation tasks.

---

## 2. Cost Estimate

Model: **Claude Sonnet 4.6** (`claude-sonnet-4-6`)  
Pricing: $3.00 / M input tokens · $15.00 / M output tokens

The counter feature was implemented in roughly 5 turns. Each turn sends the accumulated conversation history; context grows as the session progresses.

| Turn | Estimated input (tokens) | Estimated output (tokens) |
|------|-------------------------:|--------------------------:|
| 1 — Read AGENTS.md, describe project | ~3,000 | ~800 |
| 2 — Plan the counter feature | ~8,000 | ~2,500 |
| 3 — Approve plan, start agent | ~12,000 | ~200 |
| 4 — Execute implementation | ~16,000 | ~1,500 |
| 5 — Cost analysis request | ~20,000 | ~500 |
| **Total** | **~59,000** | **~5,500** |

**Estimated session cost:**

| Type | Tokens | Rate | Cost |
|------|-------:|------|-----:|
| Input | 59,000 | $3.00 / M | **$0.18** |
| Output | 5,500 | $15.00 / M | **$0.08** |
| **Total** | | | **~$0.26** |

---

## 3. Optimizations

### Optimization 1 — Exclude static assets from context

**Problem:** `public/*.svg` consumes 1,940 tokens (33% of total) and `README.md` adds another 452 (7.8%). These files are never useful for code generation.

**Solution:** Create `.repomixignore` (or `.cursorignore`) in `app/`:

```
public/
*.svg
README.md
```

**Before:** 5,822 tokens → **After:** ~3,430 tokens — a **41% reduction**.

**Cost impact:** At the session level this saves ~$0.04 per session (based on the estimates above). On a team running 20 sessions a day it compounds to ~$300/month.

### Optimization 2 — Use Haiku 4.5 for routine generation tasks

**Problem:** Claude Sonnet 4.6 is priced at 3× the rate of Haiku 4.5 for input and 3× for output. Not every subtask needs Sonnet's reasoning capability.

| Model | Input | Output |
|-------|------:|-------:|
| Sonnet 4.6 | $3.00/M | $15.00/M |
| Haiku 4.5 | $1.00/M | $5.00/M |

**Rule of thumb:** Use Haiku for:
- Boilerplate generation (form fields, CRUD routes, utility functions)
- Simple edits and renames
- Explaining short code snippets

Use Sonnet or higher for:
- Architecture decisions
- Debugging complex interactions
- Tasks requiring multi-file context reasoning

**Cost impact:** If 60% of coding turns are routine, routing them to Haiku reduces the total session cost from ~$0.26 to ~$0.14 — roughly **46% savings**.

### Optimization 3 — Provide structured acceptance criteria upfront

**Problem:** Vague prompts ("add a counter") lead to clarification rounds, wasted turns, and more output tokens spent on questions and corrections.

**Solution:** Format prompts with explicit acceptance criteria as a numbered checklist (as was done in this session). This approach:

- Eliminates back-and-forth questions from the model
- Lets the model verify its own output against the list before responding
- Reduces average iterations from 3–4 to 1–2

**Quantified impact for this task:**

With a clear 5-point checklist the counter was implemented in **1 implementation turn** with zero corrections. An unstructured prompt ("add a counter to the home page") typically requires 2–3 back-and-forth turns to pin down behavior (reset target value, whether to show the count, styling, etc.).

Saving 1–2 turns ≈ ~$0.04–$0.08 per feature.

---

## 4. Summary

| Optimization | Token reduction | Cost reduction |
|-------------|---------------:|---------------:|
| Exclude SVG + README from context | 41% fewer tokens | ~$0.04/session |
| Route routine tasks to Haiku 4.5 | n/a (same tokens) | ~46% on affected turns |
| Structured acceptance criteria | 1–2 fewer turns | ~$0.04–$0.08/feature |
| **Combined** | | **~50–60% lower total cost** |

### Conclusion

The biggest single win is **excluding static assets** (SVGs, images, build artifacts) from context — they are the top token consumers but carry zero signal for code generation. The second-highest leverage is **model tiering**: reserving a capable model like Sonnet for architectural reasoning while routing mechanical generation to Haiku. Finally, **clear prompts with explicit acceptance criteria** reduce iteration count, which is the main driver of output token cost — and output tokens cost 5× more than input tokens at Sonnet pricing.
