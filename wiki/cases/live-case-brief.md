---
type: case
title: "Live Case Brief — Design Engineer, Patient <> Pro Workflow"
created: 2026-06-22
updated: 2026-06-22
status: mature
confidence: high
scenario: "How might we leverage a design engineering approach to accelerate discovery and delivery for the AI pre-consultation history feature?"
answer_quality: solid
sources:
  - "[[raw/research/live-case-brief.pdf]]"
tags:
  - interview
  - case
  - design-engineering
---

# Live Case Brief — Design Engineer

## Role framing

**Design Engineer** — responsible for design infrastructure across patient-facing products and Doctolib Pro (the professional B2B software). Not a pure product designer. Not a pure engineer. The hybrid role that builds the systems that let other designers and engineers ship faster.

## The Problem Statement (exact)

> "How might we leverage a **design engineering approach** to accelerate our discovery and delivery processes for this feature?"

**The feature context:**
- Practitioners lose consultation time to admin: note-taking, prescriptions, administrative workflows
- Doctolib has introduced an AI assistant that inquires about patient history **through the patient app** in the **days leading up to an appointment**
- Goal: gather context for the practitioner before the consultation starts

**This feature already exists.** The exercise is about *how to build and evolve it better* — not whether to build it.

## What They're Assessing

1. Focus on what matters (don't boil the ocean)
2. Structure problem and solution
3. Communicate clear, justified choices
4. Consider technical, design, user, AND business tradeoffs
5. **Think as a design leader, not only as a designer**

## Deliverables Required

1. **Design direction** — sketches, diagrams, or words
2. **Design engineering solution** — enables execution at scale

## Solution Components They Want Answered

### Part 1: Design Solution
- What is the main idea?
- Key decisions/assumptions (technical, design, user constraints)?
- Larger design + business strategy (principles, scalability)?
- Value and impact for professionals AND patients?

### Part 2: Execution and Design Engineering
- Key assumptions/questions about **their design system**?
- What **design infrastructure** is required to make it scalable with AI? How to build it? Pitfalls?
- **First steps in next 2–4 weeks?**
- How to involve **different stakeholders**?

## Agenda

- 10 min: Read brief
- 40 min: Independent or collaborative work
- 15 min: Present solution
- 20 min: Q&A

## Tools Available

- Doctolib Pro sandbox (credentials in raw/)
- Your own tooling: pen/paper, Figma/FigJam, Miro, Claude
- AI explicitly permitted

## Key Insight for Framing

The question is NOT "design the AI pre-consultation feature."
The question is "design the **design engineering system** that lets this feature be discovered, iterated, and shipped at scale."

This means the answer lives at the intersection of:
- Component architecture (how AI conversation UX gets built as reusable primitives)
- Design system governance (how AI UI patterns get standardized and distributed)
- Prototyping infrastructure (how to accelerate discovery — AI-assisted, in-browser prototyping)
- Stakeholder workflow (how design engineers work with product designers, engineers, clinicians)
