---
type: entity
title: "Regulatory Constraints — Healthcare AI in the EU"
created: 2026-06-22
updated: 2026-06-22
status: mature
confidence: high
entity_type: overview
sources:
  - "[[raw/research/gemini-deep-research]]"
tags:
  - regulation
  - gdpr
  - eu-ai-act
  - design-constraints
---

# Regulatory Constraints — Healthcare AI Design in the EU

## Why This Matters for the Interview

The brief asks for design infrastructure for an AI feature. Every design decision at Doctolib is constrained by overlapping EU regulatory frameworks. Demonstrating awareness of these constraints — without getting lost in them — is a differentiator.

## GDPR — Health Data as "Special Category"

- Health data = Article 9 GDPR = highest protection class
- Requires **explicit informed consent** before processing (not just T&Cs)
- **Data minimization**: only collect what's necessary — the intake question design must reflect this
- Patients have the right to **object to AI transcription** (e.g., during consultation)
- UI must clearly signal when a patient is talking to AI (not a human)
- French HDS (Health Data Hosting) certification = models must run locally or on certified regional infrastructure
- **Design implication**: consent gate is a first-class UI primitive, not a checkbox. The `ConsentGate` component isn't optional.

## EU AI Act — Medical AI = High-Risk

Medical AI systems aiding in diagnosis, triage, or clinical documentation = **High-Risk** classification. Three mandatory design requirements:

| Article | Requirement | Design implication |
|---|---|---|
| Art. 14 | Human oversight — users must monitor, understand, override AI at any time | "Accept" actions must never be the easy default. One-click accept without reading = compliance risk. |
| Art. 13 | Transparency — AI must explain logic or show confidence levels. No black box. | Provenance indicators on all AI-generated content. "Based on patient responses" labels. |
| Art. 12 | Audit logs — immutable trail of how AI reached a conclusion | Not a UI problem, but must exist in the system the UI writes to |

> [!key-insight] The EU AI Act directly mandates the `ProviderBadge` and `ConsentGate` components in the case framework. Cite this when asked why you're building them.

## EU AI Act + MDR Apply Simultaneously

Medical Device Regulation (MDR) applies **on top of** the AI Act for clinical documentation tools. Both must be satisfied — compliance with one doesn't exempt from the other.

## Automation Bias — The Real Design Risk

> Courts hold physicians liable for accepting "implausible AI outputs without verification."

**Automation bias** = humans over-trust machine-generated recommendations, especially under time pressure and cognitive fatigue.

Implication: the interface must strike a precise balance:
- **Remove administrative friction** (reduce clicks, auto-populate fields, surface AI summaries)
- **Inject productive friction** (require reading before confirming; don't make "Accept All" the obvious next tap)

> [!key-insight] When asked "how do you balance AI efficiency with clinical accuracy?" — the answer is productive friction + provenance, not just disclaimers. The EU AI Act mandates it.

## The "Shadow AI" Problem

Doctors already use ChatGPT and consumer AI tools for clinical notes — unapproved, GDPR-non-compliant. This proves:
1. The demand is real and urgent
2. The UX bar is ChatGPT-level frictionlessness
3. The safety bar is clinical-grade compliance

Doctolib wins by being **as frictionless as ChatGPT, but compliant**. The design system is the mechanism that makes this scalable.

## Summary: What This Means for the AI Interaction Layer

| Constraint | Component response |
|---|---|
| GDPR explicit consent | `ConsentGate` — inline, per-question-category, not just T&Cs |
| AI identity transparency | `ProviderBadge` — always visible on AI-generated content |
| Human oversight (EU AI Act Art.14) | No "Accept All" as primary CTA; review state required before commit |
| Transparency (EU AI Act Art.13) | `SummaryCard` shows patient's actual words, not AI assertions |
| Automation bias | Provenance rule: "patient reported..." never "patient has..." |
