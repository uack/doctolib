---
type: entity
title: "Stanislas Niox-Chateau — CEO & Co-founder"
created: 2026-06-22
updated: 2026-06-22
status: mature
confidence: high
entity_type: person
role: CEO & Co-founder
first_mentioned: "[[raw/research/gemini-deep-research]]"
sources:
  - "[[raw/research/gemini-deep-research]]"
tags:
  - stakeholder
  - leadership
---

# Stanislas Niox-Chateau

**Role**: CEO & Co-founder, Doctolib (since 2013)

## Personality and Operating Style

- Internal maxim: **"Par la porte, ou par la fenêtre"** (Through the door, or through the window) — relentless execution focus
- Culture he's built: fast-paced, highly ambitious, heavy pressure to hit targets
- Glassdoor signal: "heavy-handed top-down management style" — navigate by speaking the language of KPIs

## AI Philosophy (public statements, 2025–2026)

Direct quotes to know:
- **"Je revois le patient dans les yeux"** (I look the patient in the eyes again) — quoting practitioners on the Consultation Assistant
- **"The caregiver remains in control of everything. It is they, in the end, who validate the summary, the referral letter, the prescription."**
- AI goal: **free doctors from their screens** — admin reduction is the product KPI, not AI capability

## Strategic Positions

- **Sovereign AI**: Europe has the talent, clean energy, and ethics to build world-class clinical AI without US/Chinese platforms. Joint Inria lab (€20M) is the proof point.
- **Privacy**: Never sell patient data; never use for training without explicit consent; full traceability on transcription models
- **IPO**: Deliberately staying private to reinvest aggressively in R&D without quarterly earnings pressure. Confirmed operational profitability in 2025.

## Relevance for Interview

His public positions define the constraints you're designing within:
1. Physicians must stay in control → human-in-the-loop is non-negotiable in every AI UI
2. Trust is a product feature → provenance, transparency, and explicit consent are design requirements, not legal checkboxes
3. Admin reduction is the KPI → measure design success by "time saved per consultation," not feature completeness
4. European sovereign AI → Doctolib will not outsource AI to OpenAI/Google in the long run; design system must be model-agnostic

> [!key-insight] When presenting: phrase your principles in his language. "Physicians stay in control" maps to your human-in-the-loop design pattern. "Trust is a product feature" maps to your `ProviderBadge` and `ConsentGate` components.
