---
type: meta
title: "Hot Cache"
created: 2026-06-22
updated: 2026-06-22
status: active
tags:
  - meta
  - hot-cache
---

# Hot Cache

## Last Updated
2026-06-22 — Brief filed. Case framework built. Role confirmed: Design Engineer (not product designer).

---

## Pipeline State

```
last_ingest:    2026-06-22 (live-case-brief.pdf)
last_lint:      —
open_gaps:      3
pages_total:    7
```

---

## Doctolib Overview

- Founded 2013 Paris. €5.8B valuation (2021). ~3,000 employees.
- 70M+ patients, 350K+ practitioners, 100M+ bookings/year
- Markets: France (dominant), Germany, Italy — UK entry via Medicus AI (May 2026)
- **AI trajectory**: Consultation Assistant (Oct 2024) → Telephone Assistant (Dec 2025) → UK expansion (May 2026)
- Strategic move: scheduling tool → AI-native clinical workflow partner
- CEO: Stanislas Niox-Chateau. AI is explicitly physician-augmentation, not replacement.

> [!gap] CPO identity not confirmed. Enrich with Gemini Deep Research when available.

---

## AI Strategy Signals

- Pre-consultation AI history feature already exists (patient app, days before appointment)
- AI gathers history from patient → context for practitioner before consultation starts
- Reduces admin burden during consultation (note-taking, prescription, history reconstruction)
- Design system likely lacks AI-native primitives (conversational UI, provenance indicators, consent gates)

> [!gap] No source on current Doctolib design system technology (Figma? Tokens? React component library?)

---

## Sources

- `[[raw/research/live-case-brief.pdf]]` — original interview brief PDF
- `wiki/overview.md` — Doctolib executive summary (medium confidence, training knowledge)

---

## Cases / Frameworks

**PRIMARY**: `[[cases/case-answer-framework]]` — complete answer framework (Part 1: Design + Part 2: Engineering)

Key angles:
- Reframe: "This is a design system problem, not a feature design problem"
- Two surfaces: patient intake (async, structured) + pro summary (scannable digest)
- Core deliverable: AI Interaction Layer (Layers 3–4 in the DS)
- Six components: `AIMessage`, `IntakeQuestion`, `ConsentGate`, `SummaryCard`, `StreamingText`, `ProviderBadge`
- 4-week plan: Discovery → Prototype → Integration → Governance

**BRIEF**: `[[cases/live-case-brief]]` — structured analysis of the actual brief

---

## Active Threads

- **ROLE**: Design Engineer (builds design infrastructure) — NOT AI Product Designer
- **INTERVIEW**: 90 min live case. 40 min work, 15 min present, 20 min Q&A
- **PENDING**: Gemini Deep Research results not yet received — paste when ready
- **PENDING**: Doctolib Pro sandbox not yet explored — credentials in `raw/`

> [!gap] Doctolib Pro sandbox not yet explored. Credentials available.

---

## Navigation

- [[index]] — master catalog
- [[log]] — operation log
- [[overview]] — Doctolib executive summary
- [[cases/live-case-brief]] — interview brief analysis
- [[cases/case-answer-framework]] — main answer framework (READ THIS)
