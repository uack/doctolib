---
type: source
title: "Doctolib Pro — Settings & Configuration Deep Dive"
created: 2026-06-22
updated: 2026-06-22
status: mature
confidence: high
source_type: scrape
url: https://pro.doctolib.de/configuration
key_claims:
  - "Question system is a CLOSED SET of exactly 3 types: Age verification, New patient check, Referral required — no custom or free-text questions possible"
  - "Multiple questions per rule set are supported (up to 6 seen in one rule set), but all drawn from the same 3-type fixed library"
  - "Instructions (pre/post-booking) are fully free-text practitioner-authored — the flexible content layer. Questions are the rigid data-collection layer."
  - "Communication pipeline has exactly 5 channels: Confirmation, Week before, SMS/push, Day before, Opinion — no 6th slot exists for AI intake"
  - "Appointment booking fields: 15 configurable demographic fields (civil status, insurance, contact info, NIR/FINESS) — none are open-ended clinical questions"
  - "Template system: 3 template types (Pharmacy prescription, Mail, Consultation) — used in consultation context, not booking flow"
  - "No /configuration/ai route exists — AI settings section is entirely absent from the current settings architecture"
  - "Advanced options for questions include: blocking logic (prevent booking if question answer is wrong), message to show when blocked"
  - "17 question rule sets exist in this sandbox account — proof that multiple configurations are possible, but all still draw from same 3 question types"
related:
  - "[[sources/sandbox-pro-doctolib]]"
  - "[[sources/sandbox-b2c-doctolib]]"
  - "[[cases/case-answer-framework]]"
sources:
  - "[[raw/articles/pro-settings-01-homepage.png]]"
  - "[[raw/articles/pro-settings-02-questions-list.png]]"
  - "[[raw/articles/pro-settings-02-questions-all-17.png]]"
  - "[[raw/articles/pro-settings-03-add-question-form.png]]"
  - "[[raw/articles/pro-settings-04-add-question-advanced.png]]"
  - "[[raw/articles/pro-settings-05-patient-pathways-overview.png]]"
  - "[[raw/articles/pro-settings-06-booking-fields.png]]"
  - "[[raw/articles/pro-settings-07-instructions-list.png]]"
  - "[[raw/articles/pro-settings-08-documents.png]]"
  - "[[raw/articles/pro-settings-09-appointment-communication.png]]"
  - "[[raw/articles/pro-settings-10-templates.png]]"
  - "[[raw/articles/pro-settings-11-logo-header-footer.png]]"
tags:
  - pro
  - settings
  - configuration
  - questions
  - design-system
  - intake
---

# Doctolib Pro — Settings & Configuration Deep Dive

**Environment**: `pro.doctolib.de` — sandbox account (CANDIDAT Agenda Test Pour)  
**Sections covered**: Settings homepage, Questions (full list + add form + advanced), Patient pathways overview, Appointment booking fields, Instructions list, Documents (pro), Appointment communication matrix, Template management, Logo/header/footer

---

## 1. Settings Homepage (pro-settings-01)

Top-level settings sections visible in sidebar:
- My practice
- Appointment management
- Patient messaging & communication
- **Customization & templates**
- Advanced settings

Sub-sections under "Appointment management" include: Appointment reasons, Patient pathways (questions + instructions), Appointment booking fields, Appointment communication.

> [!key-insight] No `/configuration/ai` section exists anywhere in this settings tree. AI-specific settings (AI intake configuration, consent management, model preferences) are entirely absent — they would need to be designed and built from scratch. This is a **confirmed gap** in the current information architecture.

---

## 2. Question System — Full Analysis (pro-settings-02 through pro-settings-04)

### The library is a closed set of exactly 3 types

When a practitioner adds a question to a rule set, the only available types are:

| Question type | What it asks | Answer format |
|---|---|---|
| Age verification | "Is the patient over X years old?" | Age threshold check |
| New patient check | "Is this patient new to the practice?" | Yes/No |
| Referral required | "Does the patient have a referral?" | Yes/No |

**No other question types exist.** The form UI shows exactly these 3 checkboxes and nothing else.

### 17 rule sets, all from the same 3-type library

The sandbox account has 17 configured question rule sets (pro-settings-02-questions-all-17). Each is scoped per:
- Calendar (which practitioner's calendar)
- Reason for visit (which appointment motive)

Some rule sets stack multiple questions — one dental example shows 6 questions in a single rule set. But all 6 are from the same fixed library (combinations of the 3 types, possibly repeated for different age thresholds or scoped differently).

### Advanced options (pro-settings-04)

Each question can be configured with:
- **Blocking logic**: "If the patient answers [X], prevent booking" (hard gate)
- **Blocking message**: Custom text shown to the patient when blocked
- **Scope**: apply to all appointment reasons or specific ones

> [!key-insight] The "Advanced options" blocking logic is architecturally equivalent to the pre-booking Instructions gate — both can stop the booking flow. But questions are data collection (radio/checkbox), while instructions are content acknowledgment (read and accept). The `IntakeQuestion` DS component proposed for AI intake is entirely outside this system — it would collect open-ended clinical history, not checkbox-style booking eligibility checks.

> [!key-insight] **Answer to user's original question**: Practitioners CAN configure multiple questions per rule set (up to at least 6 in one set), but the question *types* are hardcoded to 3. So the system is extensible in quantity but not in kind. This definitively confirms that `IntakeQuestion` must be net-new infrastructure — it cannot be built by extending the existing question library.

---

## 3. Patient Pathways Overview (pro-settings-05)

A combined view showing both Instructions and Questions configured for the practice.

Structure visible:
- Each row = one appointment reason + calendar combination
- Columns: Instructions (pre-booking / post-booking), Questions
- Some rows have both instructions AND questions; some have only one

This is the practitioner's unified configuration surface for patient-facing pre-appointment content.

> [!key-insight] The patient pathways overview reveals that **instructions and questions are orthogonal** — a practitioner can have pre-booking instructions without questions, questions without instructions, or both. AI intake would be a third lane in this same configuration surface: "AI history intake" toggle per appointment reason + calendar. This is where the practitioner-side configuration for the AI feature would logically live.

---

## 4. Appointment Booking Fields (pro-settings-06)

15 configurable demographic fields visible:
- Civil status (Mr/Ms/etc.)
- First name, Last name
- Date of birth
- Phone (mobile, home)
- Email
- Address (street, city, postcode, country)
- Insurance type (public/private)
- Mutual insurance / health fund
- NIR (social security number)
- FINESS code (French healthcare facility ID)

Each field can be set to: Required / Optional / Hidden

These are identity and billing fields — none are clinical or open-ended. They appear at booking checkout to collect patient demographic data the practitioner needs for billing and communication.

> [!key-insight] Booking fields = demographic + billing. They are not a clinical intake mechanism. AI pre-consultation history (symptoms, context, recent health events) has no home in this field set. `IntakeQuestion` would be a structurally distinct data type — async, AI-processed, conversation-style — not an extension of these form fields.

---

## 5. Instructions (pro-settings-07)

Instructions list shows practitioner-authored text blocks, each scoped per calendar + reason:
- Pre-booking: shown before slot selection (patient must acknowledge)
- Post-booking: shown after confirmation

Content is fully free-text — practitioners write whatever they want (address updates, cancellation policies, billing info, prep instructions for procedures, etc.).

Blocking logic: a pre-booking instruction can be set to require acknowledgment before proceeding — seen in the B2C booking flow as "I HAVE READ AND ACCEPT THE INSTRUCTION".

> [!key-insight] Instructions are the flexible, practitioner-owned content layer. They prove Doctolib already has a gating/acknowledgment pattern in the booking flow. The `ConsentGate` component for AI intake consent would follow the same gate pattern — but owned by Doctolib (not the practitioner) and linked to the privacy consent model.

---

## 6. Documents — Pro Side (pro-settings-08)

Practitioner-side document management settings. Allows:
- Configuring which document types practitioners can send/receive
- Document templates (linked to template management)
- Integration with the "Send documents" patient-facing flow

This is the pro-side counterpart to the B2C "Send documents" CTA visible on appointment confirmation pages.

---

## 7. Appointment Communication Matrix (pro-settings-09)

**The 5-channel pipeline — confirmed complete**

| Channel | Timing | Content type |
|---|---|---|
| Confirmation | Immediately after booking | Booking summary, calendar invite |
| Week before | ~7 days before appointment | Reminder, preparation info |
| SMS/push | ~24–48h before | Short reminder |
| Day before | 24h before | Final reminder |
| Opinion | After appointment | Satisfaction survey |

Each channel can be configured per appointment reason: on/off, content edits, timing.

**No 6th slot exists.** The matrix has exactly 5 columns. There is no "days before — AI intake" channel anywhere in this configuration surface.

> [!key-insight] This is the definitive confirmation that AI intake (sending the patient a pre-consultation history questionnaire "days before") would require building a **new 6th communication touchpoint**. It cannot be mapped onto any existing channel. The `AIMessage` component would deliver this new touchpoint — a new row/column in this matrix would be the practitioner-side configuration.

---

## 8. Template Management (pro-settings-10)

3 templates currently configured:

| Name | Type | Available in consultation |
|---|---|---|
| Ordonnance 1 | Pharmacy prescription | Yes |
| Test Nicolas | Mail | Yes |
| test | Consultation | Yes |

Template types: Pharmacy prescription, Mail, Consultation.

"Available in consultation" toggle = whether the template appears in the Consultation Assistant panel during a live appointment.

> [!key-insight] Templates are used *during* consultations (Consultation Assistant), not before them. They're for structured output (prescriptions, letters, notes) — not for patient-facing intake. AI pre-consultation history summaries (`SummaryCard`) would surface in the same consultation context but as input context, not as an output template.

---

## 9. Logo / Header / Footer (pro-settings-11)

Configuration of practice branding for documents. Location-scoped selector. Not relevant to AI intake or design system architecture.

---

## Summary: Architecture Constraints for the Case

### What is configurable today (pro side)
| System | Flexibility | Constraint |
|---|---|---|
| Pre-booking instructions | Fully free-text, blocking logic | Practitioner-owned, not AI-generated |
| Questions | Multiple per rule set | Fixed 3-type library — no custom types |
| Communication | 5 channels, content editable | No 6th channel slot exists |
| Booking fields | 15 demographic fields | Identity/billing only, not clinical |
| Templates | 3 types (Rx/Mail/Consult) | Used at consultation time, not before |

### What is absent (gaps the AI feature must fill)
1. **No AI intake question type** — `IntakeQuestion` must be net-new, cannot extend the 3-type library
2. **No 6th communication channel** — `AIMessage` delivery requires new touchpoint in the pipeline
3. **No AI settings section** — practitioner-side consent and configuration for AI intake doesn't exist yet
4. **No AI history question scoping** — the patient pathways overview (instructions + questions per calendar/reason) would need a third lane for AI intake
