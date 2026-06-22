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
2026-06-22 — Waiting Room Companion brief expanded. 7 gaps identified + filled. DESIGN.md created from live CSS. Wiki at 16 pages.

---

## Pipeline State

```
last_ingest:    2026-06-22 (helpcenter-patient-pathways — official docs, question types + blocking)
last_lint:      2026-06-22 (11 nominal dead links, all benign — wiki clean)
open_gaps:      1
pages_total:    14
```

---

## Doctolib Overview

- Founded 2013 Paris. ARR ~€422M. 70M+ patients, 350K+ practitioners. Operational profitability 2025.
- Markets: FR (dominant), DE, IT — UK via Medicus (May 2026, £100M, 25yr NHS clearance)
- AI: Consultation Assistant (Oct 2024, 1M+ consults, 50% time cut) → Phone Assistant (Dec 2025) → Inria lab
- Scheduling tool → AI-native clinical workflow OS. CEO Stanislas: "physician stays in control of everything."
- Design team 50+. Mandate: **"evolve DS to support agentic AI components"**

---

## AI Strategy Signals

- Pre-consultation AI history: patient app, days before appointment → context for practitioner
- Feature exists in some form — exercise is about building the engineering system to iterate/scale it
- Consultation Assistant: ambient scribe, audio deleted 48h, human validation before EHR commit
- Inria lab (€20M) = sovereign AI, model-agnostic DS is strategic imperative
- Nabla = best-in-class UX competitor (standalone); Doctolib wins on workflow integration

---

## Key Regulatory Facts

- GDPR Art.9: health data = special category → `ConsentGate` = compliance requirement, not UX choice
- EU AI Act High-Risk: Art.14 (human oversight), Art.13 (transparency), Art.12 (audit logs)
- Automation bias → design for productive friction. Provenance: "patient reported..." not "patient has..."

---

## Sources

- `[[raw/research/live-case-brief.pdf]]` — original interview brief
- `[[raw/research/gemini-deep-research]]` — strategic analysis (financials, AI, competition, regulation)
- `[[sources/sandbox-pro-doctolib]]` · `[[sources/sandbox-b2c-doctolib]]` · `[[sources/sandbox-pro-settings-config]]` — Pro/B2C/Settings scrapes
- `[[sources/helpcenter-patient-pathways]]` — Official help docs: 5 question types, referral constraint, hardcoded wording
- `[[overview]]` · `[[concepts/regulatory-constraints]]` · `[[concepts/competitive-landscape]]` · `[[stakeholders/stanislas-niox-chateau]]`

---

## Cases / Frameworks

**READ THIS**: `[[cases/case-answer-framework]]`

Opening: "This is a design system problem, not a feature design problem."
Two surfaces: patient intake (async) → pro summary (scannable, <10s)
6 components: `AIMessage`, `IntakeQuestion`, `ConsentGate`, `SummaryCard`, `StreamingText`, `ProviderBadge`
4-week plan: Discovery → Prototype → Integration → Governance
Big bet: "This infrastructure powers every AI touchpoint Doctolib will ever ship."

**BRIEF**: `[[cases/live-case-brief]]` — Design Engineer (builds infrastructure). 40min work, 15min present, 20min Q&A.

---

## Sandbox Key Findings

- **Pre-booking ≠ AI intake**: today's questions answered at booking time (static library). AI feature = async intake *days before* appointment.
- **`SummaryCard` placement confirmed**: "Summaries to validate" queue in Consultation Assistant panel — no new screen needed.
- **Dictation = premium upsell** ("Upgrade to unlock") — separate from Consultation Assistant.
- **No `/configuration/ai`** — AI settings don't exist yet; would need to be built.
- **Communication pipeline**: 5 touchpoints today. AI intake = new 6th between week-before and day-before.
- **Question editor = closed library** (5 types per docs: Age, New patient, Quarterly quota, Referral, Private-only). Question *wording* is hardcoded by Doctolib — practitioners cannot customize text. `IntakeQuestion` = net-new.
- **Communication matrix = 5 channels only** (Confirmation, Week before, SMS/push, Day before, Opinion). No 6th slot — AI intake is a genuinely new touchpoint.

---

## B2C Patient App Key Findings (NEW)

- **AI intake confirmed absent**: No pre-consultation prompt anywhere in booking funnel or appointment detail.
- **`ConsentGate` production reference**: "Consultation audio" = 3-tier model (self / self+dependents / decline), explicitly names "artificial intelligence tools", revocable any time.
- **Two-layer consent**: Personalized services (GDPR Art.9) → Consultation audio. AI intake needs same prerequisite check.
- **Booking checkout = 1 question only**: "Have you visited this practitioner before?" — full patient intake today is just that.
- **"Send documents"**: Appointment-scoped CTA (upcoming only). Separate from AI intake — document upload ≠ structured history questions.

---

## Active Threads

- **INTERVIEW**: Design Engineer live case — 90 min total, AI pre-consultation history feature
- ~~Pro sandbox~~ · ~~B2C patient app~~ · ~~Pro settings config~~ · ~~Gemini Deep Research~~ — all ingested 2026-06-22

> [!gap] DS technology stack not confirmed (React lib, token system).

## Navigation

- [[index]] — master catalog
- [[log]] — operation log
- [[overview]] — Doctolib executive summary
- [[cases/case-answer-framework]] — MAIN ANSWER (read this)
- [[cases/live-case-brief]] — brief analysis
- [[concepts/regulatory-constraints]] — EU AI Act + GDPR
- [[concepts/competitive-landscape]] — Nabla, EMIS/TPP, UK
- [[stakeholders/stanislas-niox-chateau]] — CEO profile
