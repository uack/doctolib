---
type: case
title: "Waiting Room Companion — Expansion & Gap Analysis"
created: 2026-06-22
updated: 2026-06-22
status: developing
confidence: high
scenario: "What's missing from the brief, and what angles strengthen the answer?"
answer_quality: solid
related:
  - "[[cases/case-answer-framework]]"
  - "[[cases/live-case-brief]]"
  - "[[sources/sandbox-pro-doctolib]]"
  - "[[sources/sandbox-b2c-doctolib]]"
  - "[[sources/helpcenter-patient-pathways]]"
  - "[[concepts/regulatory-constraints]]"
tags:
  - interview
  - case
  - waiting-room
  - ai
  - expansion
---

# Waiting Room Companion — Expansion & Gap Analysis

The brief is strong. These additions are grounded in wiki sources — they fill real gaps and sharpen the angles the interviewers will push on.

---

## What the Brief Gets Right

- Voice-first for 45–75 demographic: correct. Lower digital friction than typing. Matches the accessibility mandate.
- QR + SMS entry: no install = right call. Any other entry mechanic adds dropout.
- LLM scope locked to narrow role: essential. No open-ended AI improvisation in a medical context.
- Patient review before submit: EU AI Act Art.14 compliance baked in structurally.
- "Not a persistent health record": critical legal scoping. Gets GDPR Art.9 right.
- DS component reuse (IntakeQuestion, ConsentGate, SummaryCard): this is the correct frame — same infrastructure, different trigger.

---

## Gap 1 — The Tablet Mode Is Underdeveloped

The brief mentions "practice-provided tablet" in one line. This is actually a distinct product surface that deserves its own treatment.

**The two use cases are different:**

| | Patient's own phone | Practice tablet |
|---|---|---|
| Entry | QR / SMS | Pre-loaded URL, always-on kiosk mode |
| Session isolation | Patient's account context | Must be fully stateless between patients |
| Language selection | Patient's device locale | Must be selected fresh each session |
| Accessibility | Patient's own settings | Practice must configure font size, contrast |
| Privacy risk | Inherits patient's OS | Must auto-wipe after submit + timeout |
| Trust signal | Doctolib app they may recognise | Unfamiliar kiosk — needs stronger framing |

**DS implication**: A `KioskMode` variant is needed — triggered by a URL flag (`?mode=kiosk`). This variant:
- Disables back-navigation (can't return to previous patient's session)
- Enforces 90-second inactivity timeout → auto-wipe + return to welcome screen
- Shows larger tap targets (minimum 48px — WCAG 2.5.8 AAA)
- Has no persistent login state

This is a real DS contribution, not just a UX note. The brief misses it entirely.

---

## Gap 2 — The Practitioner Configuration Story Is Dismissed Too Quickly

The brief labels practitioner configuration "out of scope for MVP" and defers to Phase 2. This is correct for the patient-facing MVP — but the interviewers will push on it because the wiki reveals a critical constraint:

**From helpcenter-patient-pathways:** Patient-facing question wording is 100% hardcoded by Doctolib. Practitioners have never authored a single word that appears in a patient-facing question. The current system is a checkbox library — Age, New patient, Referral, Quota, Private-only. That's it.

**Implication for the answer:** The waiting-room app introduces something Doctolib has never shipped: practitioner-authored patient-facing clinical content. This is a governance break, not just a new feature. The interviewers will notice if this is hand-waved.

**How to address it in the answer:**
1. For MVP: use the default 5-question set (reason, duration, medications, recent changes, anything to add) — consistent with current platform behavior (Doctolib owns the words)
2. Phase 2 configuration UI should be built *inside the existing Question Editor* (sandbox-14: `appointment_rule_sets/:id/edit`), not as a new screen. The practitioner picks from an expanded question library — they still don't write free text. Doctolib still controls all clinical language.
3. Only Phase 3 (if validated): allow practitioners to add custom clinical questions with a Doctolib review/approval step. This maintains the platform's clinical governance without permanently blocking flexibility.

This maps to how Doctolib actually operates — platform controls the words, not practitioners — and it's a more defensible answer than "we'll figure it out in Phase 2."

---

## Gap 3 — The SummaryCard Delivery Moment Is Missing

The brief says the summary is "delivered to the practitioner's agenda view the moment the patient submits." That's accurate but vague. The wiki tells us exactly where this lands:

**From sandbox-pro-doctolib key insight:** The `SummaryCard` appears in the "Summaries to validate" counter inside the Consultation Assistant header button — the same queue used by the ambient AI scribe. No new screen needed.

**What the brief is missing:** The practitioner *notification* design. When a waiting-room intake submits:
- The "Summaries to validate" counter increments in the Consultation Assistant header button
- A subtle toast/alert should appear if the practitioner has the Pro app open ("New intake for [Patient Name] — ready to review")
- On mobile Pro app: push notification

**The design engineering angle:** This notification is a new variant of an existing pattern — the counter badge already exists. The DS contribution is a `SummaryCard.status = "waiting-room"` variant (distinct from "consultation" summaries) so the practitioner knows at a glance which queue this came from and can triage accordingly.

---

## Gap 4 — Failure Modes Are Underdeveloped

The brief has a success metrics table but no failure mode section. Interviewers will probe this.

**Key failure modes by layer:**

**Voice recognition failures (patient layer)**
- Heavy accent, mumbling, background noise in a busy waiting room
- Non-French/German/Italian speakers (relevant for immigrant patients, common in urban France)
- Design response: always offer text fallback on the same screen as the mic button, no mode switch required. If voice transcription confidence < threshold, show the transcription and ask "Is this what you said?" before advancing.

**Consent abandonment (trust layer)**
- Patient reads consent screen and stops. Most likely dropout point.
- Design response: make the skip-to-doctor path equally prominent as "Continue." "I'll tell my doctor in person" is a valid and complete user journey, not a failure. The pro side receives a note: "Patient preferred to share in person." This prevents the doctor being surprised by a missing intake.

**Network failure (technical layer)**  
- Waiting rooms often have poor connectivity. A patient who completes the intake offline should not lose their answers.
- Design response: answers stored in `localStorage` as draft. Submit attempted on reconnect. If still offline when called in, a "Share your draft" option lets the patient hand the phone to the receptionist to trigger submit on practice WiFi.

**Session timeout on shared tablet (kiosk layer)**  
- Previous patient's data must never leak to next patient.
- Design response: 90-second inactivity wipe (auto-reset to welcome screen). Any in-progress answers are discarded, not stored. Server confirms receipt before clearing client state — no silent data loss.

**Practitioner never opens the summary (adoption layer)**
- This is the most important failure mode strategically. If the SummaryCard open rate stays below 50%, the whole feature fails regardless of patient completion rate.
- Design response: Week-1 intervention is a push to practitioners showing aggregate "X patients completed intake before you called them in" — social proof + outcome data. The counter badge must be prominent enough to form a habit. Consider: on the appointment detail view, the patient's name row shows a small "📋" indicator if intake is complete — a passive ambient signal before the doctor even opens the consultation view.

---

## Gap 5 — The Relationship to Async Pre-Consultation Is a Stronger Story Than Written

The brief correctly identifies that this is separate from the async pre-consultation flow. But it undersells *why* the waiting-room variant is strategically interesting to Doctolib *first*.

**The real argument:**

The async pre-consultation flow (days before, via push notification) requires:
- Push notification infrastructure per market
- Patient app update with new intake UI
- Backend job to send questions N days before appointment
- Practitioner configuration of when/which questions to send
- Handling for patients who ignore the notification (dropout)

The waiting-room variant requires:
- A URL and a QR code
- A single-session web app
- A webhook to write to the Consultation Assistant queue

It can be built in 4 weeks. It validates the three core assumptions (patient completion rate, voice adoption, practitioner summary usage) without the async infrastructure investment.

**Frame for the interview:** The waiting-room app is the fastest path to *validating the design system components* before deploying them in the higher-stakes async context. If `IntakeQuestion` and `ConsentGate` fail in a controlled waiting-room context (5-15 minutes, patient is present, practitioner benefit is immediate), they'll definitely fail async (days before, patient is at home, benefit is abstract). Ship the simpler context first. Let the data decide if the harder context is worth building.

This is a design engineering argument, not just a product one — it's about de-risking the infrastructure investment before it's deployed at scale.

---

## Gap 6 — Multilingual Is Mentioned Once and Dropped

The brief lists "Language selector" as an optional step between consent and Q1. This is massively undersized.

**France context (from overview.md):** 70M+ patients, Paris urban practices. Large immigrant populations. Arabic, Portuguese, Turkish, Romanian are common first languages. A French-language-only intake has discriminatory implications and will not pass Doctolib's legal review.

**Design engineering contribution:**
- Language selector must be a first-class component on the consent screen, not a buried optional step
- TTS (text-to-speech) must support the same language set as the text UI — otherwise voice-first is undermined for non-French speakers
- LLM prompt must be language-aware: the practitioner's question set is configured in French/German, but the patient's conversation should run in their selected language. The summary delivered to the practitioner is always in the practitioner's language (auto-translated). Patient never sees the translation — they only see their language.
- DS token: `IntakeQuestion.locale` — the component accepts a locale prop, renders in that language, submits answer with locale tag so the LLM summary engine knows to translate.

**This is a strong DS answer** because it shows that "multilingual" is not just a copy problem — it requires a locale-aware component API from day one.

---

## Gap 7 — The "What This Is Not" List Has One Important Omission

The brief correctly lists what the feature is not. One missing item:

**Not a triage tool.** The LLM does not assess urgency, flag red flags, or prioritize patients in the waiting room queue. If a patient describes chest pain, the app does not respond with "that sounds serious" — it records the answer neutrally and moves on. Any urgency assessment is the practitioner's clinical responsibility.

This matters because: the interviewers may ask "what if a patient describes an emergency?" The answer must be crisp. The app has one escape: if the patient's answer contains a keyword pattern that clinical review has pre-approved as a potential emergency indicator (chest pain, difficulty breathing, loss of consciousness), the app surfaces a single non-alarming prompt: "If you feel unwell right now, please tell the receptionist." Then continues normally. No further clinical judgement. No LLM reassurance. No escalation path beyond that prompt.

This is both a UX decision and a legal one — EU AI Act High-Risk classification (Annex III) includes AI systems used in healthcare for triage. By staying strictly outside triage, the app avoids that classification and the associated conformity assessment burden.

---

## The Strengthened Framing for the Interview

If asked "why start here and not the async flow?", the answer is:

> "The waiting-room variant is a controlled experiment for the design system, not just a simpler product. Same components — IntakeQuestion, ConsentGate, SummaryCard — but in the lowest-risk context: patient is present, benefit is immediate, session is bounded. If the components fail here, we fix them before deploying them to 70 million patients via push notification. It's the fastest path to validated infrastructure."

If asked "what's the biggest risk?":

> "Practitioner adoption. Patients will complete the intake — the data shows intake completion rates above 65% are achievable with good UX. The failure mode is the doctor never opening the summary. The design engineering investment is as much about the practitioner counter badge and summary notification as it is about the patient-facing flow."

If asked "how does this relate to the DS work?":

> "Every component built for this app goes into Layer 3 of the design system — the AI Interaction Layer. They're not one-off feature components. The waiting room is deployment target one. Async pre-consultation is deployment target two. The AI Phone Assistant summary output is deployment target three. Same SummaryCard, same ConsentGate, same ProviderBadge. The waiting-room app justifies the infrastructure investment because it's a real product that ships, not a prototype that sits in Figma."
