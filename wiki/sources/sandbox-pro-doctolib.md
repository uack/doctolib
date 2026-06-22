---
type: source
title: "Doctolib Pro Sandbox — Full UI Walkthrough"
created: 2026-06-22
updated: 2026-06-22
status: mature
confidence: high
source_type: scrape
url: https://pro.doctolib.de/
key_claims:
  - "Pre-consultation questions are configured per reason-for-visit using a checkbox library of standardized questions (Age, New patient, Referral, Social security number, pregnancy, diabetes, hypertension, COVID symptoms)"
  - "Questions scope: text answers are submitted before booking, not before the appointment day — this is a booking gate, not an async AI intake"
  - "Consultation Assistant is a named section inside the consultation form, not a separate tool — 'START THE ASSISTANT' button + language selector + settings"
  - "Consultation Assistant panel (header button) shows two counters: 'Assistant in progress' and 'Summaries to validate'"
  - "Dictation feature ('Try dictation') is a premium upsell — 'Upgrade to unlock' gate, not included in base plan"
  - "Connect section enables practitioner-to-practitioner secure messaging + case sharing; Tele-expertise is 'Coming soon'"
  - "Template management: Pharmacy prescription, Mail, Consultation types — 'Available in consultation' toggle per template"
  - "Communication pipeline: Confirmation email, Week-before reminder, SMS/push notification, Day-before reminder, Opinion email — configurable per calendar"
  - "No dedicated AI settings page (404 at /configuration/ai and /configuration/consultation_assistant)"
  - "Medical data access configuration governs which patient bases each user can access — managed per-patient-base, not per-feature"
related:
  - "[[cases/case-answer-framework]]"
  - "[[concepts/regulatory-constraints]]"
  - "[[overview]]"
sources:
  - "[[raw/articles/sandbox-01.png]]"
  - "[[raw/articles/sandbox-02.png]]"
  - "[[raw/articles/sandbox-03.png]]"
  - "[[raw/articles/sandbox-04.png]]"
  - "[[raw/articles/sandbox-05.png]]"
  - "[[raw/articles/sandbox-06.png]]"
  - "[[raw/articles/sandbox-07.png]]"
  - "[[raw/articles/sandbox-08.png]]"
  - "[[raw/articles/sandbox-09.png]]"
  - "[[raw/articles/sandbox-10.png]]"
  - "[[raw/articles/sandbox-11.png]]"
  - "[[raw/articles/sandbox-12.png]]"
  - "[[raw/articles/sandbox-13.png]]"
  - "[[raw/articles/sandbox-14.png]]"
  - "[[raw/articles/sandbox-15.png]]"
  - "[[raw/articles/sandbox-16.png]]"
  - "[[raw/articles/sandbox-17.png]]"
  - "[[raw/articles/sandbox-18.png]]"
  - "[[raw/articles/sandbox-19.png]]"
  - "[[raw/articles/sandbox-20.png]]"
tags:
  - sandbox
  - product
  - ux
  - ai
---

# Doctolib Pro Sandbox — Full UI Walkthrough

**Environment**: `pro.doctolib.de` — staging/demo environment from interview brief  
**Sections covered**: Calendar, Tasks, Patient Messaging, Patient Management, Patient Record (EHR), Consultation, Settings, Connect, Emails, Templates

---

## 1. Navigation Structure

Top-level sections (main nav bar):
- **Calendar** — primary workspace
- **Tasks** — task management (1 task shown in demo)
- **Connect** — practitioner-to-practitioner messaging, case sharing
- **Patient Messaging** — patient-facing secure messages
- **Patient Management** — patient list, records, history
- **Emails** — practitioner email (requires verified identity)
- **Others** — additional features

Persistent header elements:
- Search for a patient (global)
- Video consultation button
- **Consultation Assistant** (expandable button with counter badge)
- **Try dictation** (premium upsell)
- Settings, Help & Contact

---

## 2. Calendar

**Week view** (sandbox-01): Standard weekly agenda grid. Appointments shown as colored blocks by reason-for-visit type. Right sidebar shows next appointments list.

**Day view** (sandbox-02): Hourly time slots. Shows appointment details inline. New appointment can be created by clicking empty slot.

---

## 3. Tasks (sandbox-03)

Dedicated task management screen. Tasks tied to patients or standalone. Shows task type, due date, assigned practitioner.

---

## 4. Patient Messaging (sandbox-04)

Secure asynchronous messaging channel between practice and patients. Inbox-style UI. Distinct from Connect (which is practitioner-to-practitioner).

---

## 5. Patient Management (sandbox-05, sandbox-06)

**Patient list**: Search + filter. Shows patient name, last appointment, upcoming appointment.

**"To be notified" tab** (sandbox-06): Patients waiting for a specific slot to open — waitlist management feature.

---

## 6. Patient Record (EHR) — ADAM Alicia

### Admin info tab (sandbox-07)
- Name, DOB, gender, contact details
- Social security number (French: "Numéro de Sécurité sociale")
- Referring doctor, insurance
- Tags/notes field

### History / Timeline tab (sandbox-08)
- Chronological list of all consultations
- Each entry: date, reason for visit, practitioner name
- Documents attached per consultation (prescriptions, letters)
- No visible AI-generated summary in history view

---

## 7. Consultation Screen (sandbox-09, sandbox-10)

> [!key-insight] This is the most critical screen for the case. The AI pre-consultation summary would surface HERE — in the Consultation Assistant panel on the left of the Medical observation form.

**Layout**: Two-column
- **Left panel**: Consultation Assistant section + language selector + "START THE ASSISTANT" button
- **Right area**: Medical observation form (free-text SOAP-style notes)

**Consultation Assistant section** (within consultation form):
- "START THE ASSISTANT" button (disabled in sandbox: "Microphone access denied")
- Language selector dropdown
- Settings link

**Consultation Assistant header button** (sandbox-10):
- Opens a floating dialog/panel
- Two counters: **"Assistant in progress"** (X) + **"Summaries to validate"** (X)
- Allows practitioner to manage ongoing and completed transcription sessions

> [!key-insight] The `SummaryCard` component would appear in the "Summaries to validate" section of this panel. The pre-consultation AI history summary would integrate here — NOT as a new screen but as an additional item in this existing validation queue.

---

## 8. Settings

### Settings Homepage (sandbox-11)
Quick-access shortcuts organized into:
- Healthcare facility management
- Appointment setup
- Patient management
- Communication

### Appointment Management > Instructions & Questions Overview (sandbox-12)
Matrix view: All pre-appointment instructions and questions, filterable by:
- Specialty
- Reason category
- Specific reason for visit

Shows which question sets are attached to which appointment types.

### Questions (sandbox-13) — `appointment_rule_sets?scope=qualification`

**The existing pre-booking question system.** 17 total question sets in the sandbox demo.

Example questions configured:
- "Has the patient already visited a healthcare professional from this entity?" (New patient gate)
- "What is the patient's age?" (Age gate)
- "Do you have a letter from a doctor telling you to book this appointment?" (Referral gate)
- "Renseignez votre numéro de Sécurité sociale..." (Social security number)
- "De quand date votre dernière consultation avec ce professionnel de santé?" (Last visit date)
- "Avez-vous des symptômes pouvant être attribués à la COVID-19...?" (COVID screening)
- "Êtes-vous enceinte?" / "Êtes-vous diabétique?" / "Souffrez-vous d'hypertension?" (Medical pre-screen for dental)
- "Quel est votre poids?" (Weight — dental)

**Question types observed**: Free text, yes/no, multiple select, date

> [!key-insight] This is the EXISTING infrastructure that the AI pre-consultation history feature builds on. Current questions are practitioner-configured pre-booking gates. The AI feature would extend this to include AI-generated follow-up questions based on the patient's answers and appointment context — the `IntakeQuestion` component would replace/augment this checkbox-library pattern with dynamic AI-suggested questions.

### Question Editor (sandbox-14) — `appointment_rule_sets/:id/edit`

**Structure**:
1. **Step 1**: Select context (reason for visit + specialty)
2. **Step 2**: Select questions from checkbox library (Age of patient, New patient, Referral)

**Advanced options**:
- Display questions for specific calendars only
- Share documents with the patient

> [!key-insight] Questions are currently selected from a fixed library — not free-form authored. The AI feature would need to introduce a new question authoring flow (or AI-suggested questions added to the library) rather than replacing this UI wholesale.

### Appointment Communication (sandbox-15) — `configuration/notifications`

Communication matrix per calendar:
| Column | Description |
|---|---|
| Confirmation email | Sent on booking |
| Week-before email reminder | 7 days prior |
| SMS or push notification | Configurable |
| Day-before email reminder | 24 hours prior |
| Opinion email | Post-consultation satisfaction |

Per-calendar toggles (Yes/No). The **AI pre-consultation intake invitation** would likely slot in as a new row here: "Pre-consultation AI history request" — sent X days before appointment, linking to patient intake flow.

### Medical Data Access Configuration (sandbox-19)

Per-patient-base access controls. Admin-only. Shows which patient bases each user can access. Separate from AI feature configuration.

### Template Management (sandbox-20) — `configuration/templates_management`

Templates available in consultation:
- **Pharmacy prescription** — prescription template
- **Mail** — letter template
- **Consultation** — consultation notes template

"Available in consultation" toggle per template. Filter by type (Pharmacy prescription, Mail, Consultation) and author.

> [!key-insight] The AI Consultation Assistant's output (summaries, referral letters) would eventually feed into this template system. A `SummaryCard` output could be converted to a Mail or Consultation template for the EHR commit step.

---

## 9. Connect (sandbox-16)

Practitioner-to-practitioner secure messaging. Sections:
- **Chats** — direct messages and cases (case = multi-practitioner thread around a patient)
- **Tele-expertise** — "Coming soon" (flagged)
- **Networks** — practitioner network/groups

Chat examples show: case sharing with patient name, multi-practitioner threads (e.g., "Knee problems" with 2 practitioners + patient).

---

## 10. Dictation Feature (sandbox-17) — Premium Upsell

Dialog: "Upgrade to unlock — Dictate your notes and save time"  
Copy: "Letters, observations, notes... Use your voice to write more quickly and simply."  
CTA: "DISCOVER THE SUBSCRIPTION"

> [!key-insight] Dictation is NOT included in the base plan. It is a premium tier feature. This confirms the Consultation Assistant (ambient transcription during consultation) and Dictation (voice-to-text for notes) are separate products with different pricing/access tiers.

---

## Key Structural Findings for the Case

### What EXISTS today (the foundation to build on)
1. **Pre-booking question system** — 17 question sets, checkbox library, per reason/specialty scoping
2. **Consultation Assistant** — embedded in consultation form, with transcription + validation queue
3. **Communication pipeline** — 5 touchpoints (confirmation, week-before, SMS, day-before, opinion)
4. **Template system** — reusable templates for prescriptions, letters, consultation notes
5. **Patient record + history** — full chronological EHR with attached documents

### What is MISSING / where the AI feature would fit
1. **AI-powered pre-consultation intake** — no async AI interview flow today; questions are static, practitioner-configured, answered at booking (not days before)
2. **Pre-consultation summary in practitioner view** — no summary card shown before consultation starts; the Consultation Assistant panel is the logical home
3. **Dynamic question generation** — current system is a fixed library; AI intake needs dynamic, context-aware question sequencing
4. **AI configuration page** — no `/configuration/ai` exists; AI settings would need to be added (under Appointment Management or a new top-level section)

### Architecture insight for the answer
The pre-consultation AI history feature is an **extension of two existing flows**:
- **Patient side**: extends the pre-booking question flow (currently answered at booking) → becomes async AI intake days before appointment
- **Pro side**: extends the Consultation Assistant panel (currently transcription-only) → adds a "Pre-consultation summary" item to the "Summaries to validate" queue

The `SummaryCard` component doesn't need a new screen — it plugs into the existing Summaries validation queue already present in the Consultation Assistant panel.
