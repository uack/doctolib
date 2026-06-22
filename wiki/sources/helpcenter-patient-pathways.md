---
type: source
title: "Doctolib Help Center — Patient Pathways: Instructions, Questions & Blocking Rules"
created: 2026-06-22
updated: 2026-06-22
status: mature
confidence: high
source_type: article
author: Doctolib Support
url: https://doctolib.zendesk.com/hc/de/articles/360054002152
key_claims:
  - "Hinweise (Instructions) = content shown to patients before or after booking. Abfragen (Questions) = eligibility gates that can restrict or block booking."
  - "Official terminology distinction: Instructions inform, Questions qualify/block."
  - "5 blocking question types confirmed in official docs: Age, New patient, Quarterly quota, Referral required, Private-only (Selbstzahler)"
  - "Referral blocking: patient must select a referring practitioner from the Doctolib directory — cannot type free text. Non-directory practitioners cannot be added manually."
  - "New patient detection: system compares patient contact data + date of birth + history against the practice's patient database. Match = existing patient. Up to 10 min activation delay."
  - "Question scope: per appointment reason AND per calendar — same question can be configured differently for different reasons/calendars"
  - "Paid plans only: all Instructions, Questions, and blocking rules require a paid Doctolib subscription"
  - "Patient-facing question text is hardcoded by Doctolib: 'Haben Sie diesen Arzt/diese Gesundheitsfachkraft schon mal aufgesucht?' — practitioners cannot customize the question wording"
related:
  - "[[sources/sandbox-pro-settings-config]]"
  - "[[sources/sandbox-pro-doctolib]]"
  - "[[sources/sandbox-b2c-doctolib]]"
  - "[[cases/case-answer-framework]]"
sources:
  - "[[raw/articles/helpcenter-04-hinweise-abfragen.md]]"
  - "[[raw/articles/helpcenter-05-neupatient-blockieren.md]]"
tags:
  - pro
  - settings
  - questions
  - instructions
  - blocking
  - helpcenter
  - german
---

# Doctolib Help Center — Patient Pathways: Instructions, Questions & Blocking Rules

**Source**: Official Doctolib DE help center (Zendesk)  
**Applies to**: Paid plans only  
**Language**: German DE (translated below)

---

## Core Distinction: Hinweise vs. Abfragen

| Term | German | Function |
|---|---|---|
| Instructions | Hinweise | Display information to patients before/after booking. No patient action required beyond reading. |
| Questions | Abfragen | Gate the booking flow. Can restrict access to specific patient groups or block entirely. |

This is the **official Doctolib terminology**. The UI in Settings uses both terms. The key architectural split: instructions = passive content, questions = active eligibility logic.

---

## Official Blocking Question Types (from help docs)

The help center article explicitly names 5 blocking question types available to practitioners:

| Type | German name | What it does |
|---|---|---|
| Age | Alter des Patienten | Blocks patients within a practitioner-defined age range |
| New patient | Neupatient:in | Blocks new patients (only returning patients can book) |
| Quarterly quota | Quartalstermin | Limits how many appointments per quarter a patient can book for a given reason |
| Referral required | Überweisung | Blocks patients without a referral letter; referring practitioner must be selected from Doctolib directory |
| Private-only | Selbstzahler-Buchung sperren | Blocks publicly insured patients; only private insurance accepted for this appointment type |

> [!key-insight] The **quarterly quota** type is a 5th question type not visible in the add-question form UI from the settings screenshots — it may be available only via a different flow or newer UI. The 3 visible types in the UI (Age, New patient, Referral) are the most common; Quarterly quota and Private-only may be less prominent. Either way, **all types are hardcoded by Doctolib** — no custom question text possible.

---

## Referral Question — Important Constraint

When a patient books an appointment that requires a referral (Überweisung):
- They must select the referring practitioner from a **Doctolib directory dropdown**
- They **cannot type a practitioner name freely** — only listed practitioners are selectable
- If their referring doctor is not in the Doctolib directory, the patient is blocked

> [!key-insight] This is a critical product constraint: the referral question creates a **hard dependency on Doctolib's practitioner network**. Any practitioner outside the network (non-DE, private, retired) cannot be selected. This is an intentional network effect — it encourages referring practitioners to join Doctolib to remain selectable. Relevant to understanding Doctolib's platform dynamics.

---

## New Patient Detection — How It Works

The system matches booking patients against the practice's existing patient database using:
- Contact details (name, phone, email)
- Date of birth
- Appointment history (Verlauf)

If a match is found → patient classified as "existing" → allowed past the new-patient block.  
If no match → classified as "new" → blocked (if the rule is configured to block).

**Activation lag**: up to 10 minutes after configuring the question before it becomes active.

> [!key-insight] New patient detection is **probabilistic matching**, not identity-verified. It relies on the patient using the same contact data they registered with. Name/DOB mismatches (e.g., different email) could classify an existing patient as new. This is a known product limitation — relevant for understanding why the question UI shows "Have you visited this practitioner before?" as a self-reported checkbox rather than relying solely on the system match.

---

## Patient-Facing Question Wording is Hardcoded

The official help center verification step tells practitioners: go to your profile on doctolib.de and select an appointment to confirm the question displays as:

> **"Haben Sie diesen Arzt/diese Gesundheitsfachkraft schon mal aufgesucht?"**  
> *(Have you visited this doctor/health professional before?)*

This is **not configurable** by the practitioner. Doctolib controls the exact question text.

> [!key-insight] Practitioners cannot customize question wording — only choose which question types to activate and whether to block or not block based on the answer. This confirms that the current system has **zero practitioner-authored clinical question capability**. Every word the patient sees in the question flow is controlled by Doctolib's platform. This is exactly why `IntakeQuestion` needs to be a new DS component: it would introduce practitioner-authored content into a patient-facing question for the first time.

---

## Scope and Configuration

Questions are scoped per:
1. **Specialty / appointment reason** (Fachgebiet + Terminart)
2. **Calendar** (individual practitioner or shared)

The same question type can be active for one appointment reason and inactive for another, even within the same practice.

**Paid plans only**: All Instructions and Questions functionality requires a paid Doctolib subscription. Not available on free tier.

---

## Sidebar: AI-specific help center categories visible

The help center left nav also reveals the AI product structure:
- **KI-Telefonassistent** (AI Phone Assistant) — separate category
- **KI-Sprechstundenassistent** (AI Consultation Assistant) — separate category  
- **Diktierfunktion** (Dictation function) — separate category

These are 3 distinct AI product lines, each with their own help documentation section. Pre-consultation history AI would be a **4th category** if/when launched — not currently visible.

> [!key-insight] The help center IA mirrors the product IA. Three AI products = three help categories. Pre-consultation history = nothing. If it ships, it gets its own Zendesk section, its own onboarding flow, its own practitioner documentation. The DS component system needs to support all four AI touchpoints consistently — this is the "infrastructure powers every AI touchpoint" argument made concrete.
