---
type: case
title: "Case Answer Framework — Design Engineering for AI Pre-Consultation"
created: 2026-06-22
updated: 2026-06-22
status: solid
confidence: high
scenario: "Design engineering approach to accelerate discovery and delivery of AI pre-consultation history feature"
answer_quality: solid
related:
  - "[[live-case-brief]]"
  - "[[overview]]"
tags:
  - interview
  - case
  - design-engineering
  - ai
---

# Case Answer: Design Engineering for AI Pre-Consultation

## The Frame (say this first, 60 seconds)

"The feature exists. The question is how we build the design infrastructure that lets us discover, iterate, and ship it faster — and scale the same infrastructure to every AI interaction Doctolib will build after this one. I'm going to treat this as a **design system problem for AI-native UX**, not a feature design problem."

---

## Part 1: Design Solution

### Main Idea

Build a **conversational UI kit** — a set of composable, AI-aware design components — that lives in the Doctolib design system and powers the pre-consultation AI flow on the patient side, and the context summary view on the pro side.

The components aren't one-off. They become the reusable primitives for every AI interaction across both surfaces: pre-consultation intake, post-consultation follow-up, AI telephone summaries, future triage flows.

### The Two Surfaces

**Patient side (pre-consultation, days before appointment):**
```
AI message bubble → patient response (text/tap) → confirmation → completion state
```
Key UX decisions:
- Async, not real-time: patient responds when convenient (push notification triggers entry)
- Low cognitive load: structured questions with free text option, not open-ended chat
- Trust signal: clear Doctolib branding, explains why info is collected, who sees it
- Opt-out always visible: patient controls what they share

**Pro side (day of consultation, before patient enters):**
```
Appointment card → "Pre-consultation summary available" → structured digest view
```
Key UX decisions:
- Not a raw transcript — AI-structured summary (symptoms, recent history, medications flagged)
- Doctor can expand to see original patient answers
- One-click dismiss if irrelevant — doesn't block workflow
- Integrated into existing agenda view, not a new screen

### Key Design Assumptions

| Assumption | Why |
|---|---|
| Patient response rate will be <60% at launch | Async intake has friction; design for graceful no-data states on pro side |
| Doctors will skim, not read | Summary must be scannable in <10 seconds |
| GDPR means explicit consent per data type | Component must include consent micro-moment, not just T&C |
| AI answers will sometimes be wrong/hallucinated | Design must show provenance: "Patient said: ..." not "Patient has..." |
| Different specialties need different questions | Component system must support specialty-specific question templates |

### Design Principles

1. **Transparency over automation** — always show what AI did and what patient actually said
2. **Integration over interruption** — fits into existing flows, doesn't create new mandatory steps
3. **Graceful degradation** — feature works even when patient didn't respond
4. **Progressive trust** — start with low-stakes questions, earn the right to ask more

### Value and Impact

| Stakeholder | Impact |
|---|---|
| Practitioner | Less time reconstructing history at consultation start; faster consultation entry; better prepared |
| Patient | Feels heard before they walk in; reduces repeat-yourself frustration |
| Doctolib | Moves from scheduling tool → clinical workflow partner; stickiness increases; AI differentiation |

---

## Part 2: Execution and Design Engineering

### Design System Questions This Raises

1. **Does Doctolib's design system have conversational/chat primitives?** If not, we need to build them. If yes, do they handle AI-generated content differently from human content?
2. **How does the DS handle trust/provenance indicators?** AI content needs visual differentiation from clinician-authored content. *(The EU AI Act Art.13 requires it — not just a design preference.)*
3. **Does the DS have a consent micro-pattern?** GDPR Article 9 (health data = special category) means consent must be explicit and per-category. Can't be bespoke each time — it's a compliance primitive. *(See [[concepts/regulatory-constraints]].)*
4. **How are loading/streaming states handled?** AI responses stream — does the DS have skeleton states for dynamic content?
5. **Accessibility baseline for conversational UI?** Screen reader behavior for chat-style interfaces is non-trivial.
6. **Is the DS model-agnostic?** CEO position is sovereign AI / Inria joint lab. The component layer must decouple from any specific LLM vendor.

### Design Infrastructure Required

**The core investment: an AI Interaction Layer in the design system**

```
DS Layer 1 (exists): foundations — colors, type, spacing, icons
DS Layer 2 (exists): components — buttons, inputs, cards, modals
DS Layer 3 (build): AI primitives — message bubbles, intake flows, summary cards,
                    provenance indicators, consent gates, streaming states
DS Layer 4 (build): AI patterns — full composed patterns like "pre-consultation intake"
                    built from Layer 3 primitives
```

**What to build in Layer 3 (the actual work):**

| Component | Purpose | Key variants |
|---|---|---|
| `AIMessage` | Display AI-generated content | user-facing / pro-facing / with-provenance |
| `IntakeQuestion` | Structured question + response capture | free-text / multiple-choice / scale |
| `ConsentGate` | Inline consent before data collection | first-time / reminder / granular |
| `SummaryCard` | AI-structured digest for practitioner | collapsed / expanded / no-data state |
| `StreamingText` | Text that renders as AI generates it | loading / streaming / complete / error |
| `ProviderBadge` | "Generated by AI — based on patient responses" | inline / footnote |

**Pitfalls to avoid:**

- **Don't build a generic chat component** — healthcare AI UX is not WhatsApp. Structure beats open-ended.
- **Don't couple components to a specific AI model** — Doctolib is building sovereign AI (Inria lab). The component layer must be model-agnostic; swap any LLM without touching the UI.
- **Don't skip error states** — AI fails silently or confidently. Design explicit failure, low-confidence, and timeout states from day one.
- **Don't build in isolation** — if the patient-side team and pro-side team each build their own AI components, you get divergence. The design engineer's job is to be the convergence point.
- **Don't make "Accept All" the primary CTA** — EU AI Act Art.14 mandates human oversight. A frictionless accept on AI-generated clinical notes creates liability for the physician. Build productive friction: require active review, not passive confirmation.

### First Steps: 2–4 Weeks

**Week 1 — Discovery**
- Audit existing design system: what AI-adjacent components already exist?
- Interview 2–3 practitioners currently using the consultation assistant: what works, what's confusing?
- Map the full patient journey from push notification → intake completion → practitioner view
- Identify the 3 highest-friction moments in existing flow

**Week 2 — Prototype infrastructure**
- Build `AIMessage` and `IntakeQuestion` as Figma components with all variants
- Create a live coded prototype of the patient intake flow (not pixel-perfect — works in browser)
- Test with 3 patients (hallway test): can they complete intake in <3 minutes?

**Week 3 — Pro-side and integration**
- Build `SummaryCard` component, test with 2 practitioners in sandbox
- Define the token/variable structure for AI content styling (color, typography differentiation)
- Draft the AI Interaction Layer spec: what goes in DS, what stays in feature teams

**Week 4 — Alignment and handoff**
- Present component proposals to design system team
- Agree on governance: who owns AI primitives, how are they versioned
- Define the acceptance criteria for "this component is ready to ship"

### Stakeholder Involvement

| Stakeholder | When | How |
|---|---|---|
| Product designers (patient + pro teams) | Week 1 | Co-define component API — they're the primary consumers |
| Engineers (front-end) | Week 1 | Align on implementation constraints (React/web components, token system) |
| Clinical/medical team | Week 1 | Validate what data can be collected, GDPR constraints |
| Practitioners (2–3) | Week 2 | Usability test of pro-side summary view |
| Patients (3–5) | Week 2 | Usability test of intake flow |
| DS team / design ops | Week 3 | Component governance, integration into DS |
| Legal/compliance | Week 3 | Consent pattern review |

---

## How to Present This (15 min)

**Structure:**
1. Reframe the question (1 min) — "This is a design system problem, not a feature design problem"
2. The two surfaces (2 min) — patient intake + pro summary, key UX decisions
3. The infrastructure play (5 min) — AI Interaction Layer, the 6 components, the layer diagram
4. First 4 weeks (3 min) — concrete, time-boxed, stakeholder-sequenced
5. The bigger bet (2 min) — "This infrastructure doesn't just power pre-consultation. It's the foundation for every AI touchpoint Doctolib will build."
6. Open for Q&A (2 min buffer)

## Likely Q&A Questions

**"How do you handle patient privacy / GDPR?"**
→ Consent gate is a first-class component, not an afterthought. Explicit opt-in per question category. Data shown only to the booked practitioner, not stored in shareable records without additional consent.

**"What if the doctor ignores the summary?"**
→ Graceful degradation is designed in. The feature adds value if used, doesn't harm if ignored. Track adoption by specialty as a signal for which question templates resonate.

**"How do you balance AI-generated content with clinical accuracy?"**
→ Provenance rule: the UI always attributes to the patient ("patient reported..."), never asserts ("patient has..."). Doctor is always the clinical authority — AI is context, not diagnosis. This also maps directly to EU AI Act Art.13 (transparency) and automation bias mitigation — courts hold physicians liable for accepting implausible AI outputs without verification.

**"What metrics would you use to measure success?"**
→ Patient side: intake completion rate by specialty, time-to-complete. Pro side: summary view open rate, time-in-summary. Clinical: self-reported consultation satisfaction (NPS delta), admin time saved per consultation.

**"How do you get buy-in from the DS team?"**
→ Don't ask for permission — build a working prototype first, show the pattern working, then propose formalization. Fait accompli with quality evidence is faster than design review committees.
