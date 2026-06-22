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
2026-06-22 — B2C patient app fully ingested (13 screenshots, all major sections + consent flows). Wiki at 12 pages.

---

## Pipeline State

```
last_ingest:    2026-06-22 (sandbox-b2c-doctolib — 13 screenshots)
last_lint:      —
open_gaps:      1
pages_total:    12
```

---

## Doctolib Overview

- Founded 2013 Paris. Operational profitability confirmed 2025. ARR ~€422M. R&D €115–150M/year.
- 70M+ patients, 350K+ practitioners, 100M+ bookings/year. No-show rate ~2%.
- Markets: France (dominant), Germany, Italy — UK entry via Medicus acquisition (May 2026, £100M)
- **AI trajectory**: Consultation Assistant (Oct 2024, 1M+ consults, 50% doc time cut) → Telephone Assistant (Dec 2025, 200K+ calls, 6h/week saved) → Inria joint lab (sovereign AI)
- Strategic move: scheduling tool → AI-native clinical workflow OS for practitioners
- CEO: Stanislas Niox-Chateau. Maxim: "physician stays in control of everything."
- Design team: 50+ people. Mandate: **"evolve DS to support agentic AI components"**

---

## AI Strategy Signals

- Pre-consultation AI history: patient app, days before appointment → context for practitioner
- Feature already exists — the exercise is about building the engineering system to iterate/scale it
- Consultation Assistant: ambient scribe, audio deleted in 48h, human validation required before committing to EHR
- Sovereign AI play: Inria lab (€20M) building "general medical intelligence" — model-agnostic DS is strategic imperative
- Nabla Copilot = best-in-class UX competitor (standalone, no integration); Doctolib wins on workflow integration
- UK: Medicus bought 25 years of NHS regulatory clearance — regulatory moat = product moat

---

## Key Regulatory Facts (cite in interview)

- GDPR Art.9: health data = special category → `ConsentGate` is a compliance requirement, not a UX choice
- EU AI Act High-Risk: Art.14 (human oversight), Art.13 (transparency/provenance), Art.12 (audit logs)
- Automation bias: courts hold physicians liable for accepting AI outputs without verification → design for productive friction
- Provenance rule: "patient reported..." never "patient has..." (transparency + liability protection)

---

## Sources

- `[[raw/research/live-case-brief.pdf]]` — original interview brief
- `[[raw/research/gemini-deep-research]]` — full strategic analysis (financials, AI features, competition, regulation, role)
- `[[sources/sandbox-pro-doctolib]]` — full sandbox walkthrough (20 screenshots, all major sections)
- `[[sources/sandbox-b2c-doctolib]]` — full B2C patient app walkthrough (13 screenshots, consent flows)
- `[[overview]]` — Doctolib executive summary (high confidence)
- `[[concepts/regulatory-constraints]]` — EU AI Act, GDPR, automation bias
- `[[concepts/competitive-landscape]]` — Nabla, DocPlanner, EMIS/TPP, UK play
- `[[stakeholders/stanislas-niox-chateau]]` — CEO profile, quotes, philosophy

---

## Cases / Frameworks

**READ THIS**: `[[cases/case-answer-framework]]`

Opening frame: "This is a design system problem, not a feature design problem."
Two surfaces: patient intake (async, structured) → pro summary (scannable, <10s)
Core deliverable: AI Interaction Layer (DS Layers 3–4), 6 components:
`AIMessage`, `IntakeQuestion`, `ConsentGate`, `SummaryCard`, `StreamingText`, `ProviderBadge`
4-week plan: Discovery → Prototype → Integration → Governance
Big bet: "This infrastructure powers every AI touchpoint Doctolib will ever ship."

**BRIEF ANALYSIS**: `[[cases/live-case-brief]]`
Role: Design Engineer (builds infrastructure). 40 min work, 15 min present, 20 min Q&A.

---

## Sandbox Key Findings (NEW — read before interview)

- **Pre-booking questions ≠ pre-consultation AI intake**: today's questions are answered at booking time (static library). The AI feature extends this to async intake *days before* appointment.
- **`SummaryCard` placement confirmed**: Consultation Assistant panel already has a "Summaries to validate" queue. The pre-consultation summary plugs in HERE — no new screen needed.
- **Dictation is premium upsell** ("Upgrade to unlock") — separate from Consultation Assistant.
- **No `/configuration/ai` page exists** — AI settings would need to be built; currently no dedicated configuration surface.
- **Communication pipeline**: 5 existing touchpoints (confirmation, week-before, SMS, day-before, opinion). AI intake invitation = new 6th touchpoint inserted between week-before and day-before.
- **Question editor uses checkbox library** (fixed questions: Age, New patient, Referral). AI intake requires a dynamic question layer on top of this — `IntakeQuestion` component replaces/extends static checkbox model.
- **Connect = practitioner-to-practitioner** (not patient-facing). Tele-expertise coming soon.

---

## Active Threads

- **INTERVIEW**: Design Engineer live case — 90 min total, AI pre-consultation history feature
- ~~Doctolib Pro sandbox~~ — ingested 2026-06-22 (20 screenshots)
- ~~Gemini Deep Research~~ — ingested 2026-06-22

> [!gap] Design system technology stack not confirmed (React component library name, token system). Not exposed in sandbox settings.

---

## Navigation

- [[index]] — master catalog
- [[log]] — operation log
- [[overview]] — Doctolib executive summary
- [[cases/case-answer-framework]] — MAIN ANSWER (read this)
- [[cases/live-case-brief]] — brief analysis
- [[concepts/regulatory-constraints]] — EU AI Act + GDPR
- [[concepts/competitive-landscape]] — Nabla, EMIS/TPP, UK
- [[stakeholders/stanislas-niox-chateau]] — CEO profile
