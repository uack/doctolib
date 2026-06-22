---
type: source
title: "Doctolib B2C Patient App — Full UI Walkthrough"
created: 2026-06-22
updated: 2026-06-22
status: mature
confidence: high
source_type: scrape
url: https://www.doctolib.de
key_claims:
  - "Patient account: Name, insurance type, phone, email, 2FA, encrypted documents — no pre-consultation questionnaire visible"
  - "Appointment detail (patient view) shows metadata only: date, practitioner, reason, address — no AI-generated summary, no pre-consultation intake link"
  - "Documents section: patients upload and store medical documents (family doctor notes, ortho notes, vaccination certs). Encrypted documents feature is activated by default."
  - "Notes tab exists ('Only you have access to your notes') — private patient-side health notes, not shared with practitioners"
  - "Privacy settings page (My preferences) exposes 6 consent categories: Personalized services, Service improvements, Consultation audio, Map, Notifications, Cookie Management"
  - "Personalized services consent: activating grants Doctolib data controller status for health data — opt-in, currently activated for this account"
  - "Consultation audio consent (3-tier): (a) agree for self + dependents, (b) agree for self only, (c) decline — explicitly mentions 'artificial intelligence tools' and 'note-taking assistant'"
  - "Consultation audio data: processed without direct identification, used for research, service improvement, and AI training, deletable via My Preferences at any time"
  - "Account settings: Country (Germany), Language (English), 2FA activated, Encrypted documents activated"
  - "Security certifications in footer: BSI ISO 27001, ISO 27701, C5 Testat Typ 2, Zertifiziertes Hosting (TÜV), TÜV Nord video consultation, TÜV Saarland Datenschutz, B-Corp"
  - "Search results: 2059 GPs in Berlin — list shows name, specialty, address, insurance acceptance, available slot times"
  - "Practitioner profile: booking entry point showing availability calendar and appointment reasons — pre-booking questions triggered here, not days before"
  - "No patient-facing pre-consultation AI intake flow visible anywhere in the app — the feature described in the brief does not exist yet"
related:
  - "[[sources/sandbox-pro-doctolib]]"
  - "[[cases/case-answer-framework]]"
  - "[[concepts/regulatory-constraints]]"
sources:
  - "[[raw/articles/b2c-01-homepage.png]]"
  - "[[raw/articles/b2c-02-appointments.png]]"
  - "[[raw/articles/b2c-03-past-appointments.png]]"
  - "[[raw/articles/b2c-04-appointment-detail.png]]"
  - "[[raw/articles/b2c-05-messages.png]]"
  - "[[raw/articles/b2c-06-documents.png]]"
  - "[[raw/articles/b2c-07-notes.png]]"
  - "[[raw/articles/b2c-08-account.png]]"
  - "[[raw/articles/b2c-09-privacy-settings.png]]"
  - "[[raw/articles/b2c-10-privacy-personalized.png]]"
  - "[[raw/articles/b2c-11-consultation-audio-consent.png]]"
  - "[[raw/articles/b2c-12-search-results.png]]"
  - "[[raw/articles/b2c-13-practitioner-profile.png]]"
tags:
  - b2c
  - patient
  - product
  - ux
  - ai
  - consent
---

# Doctolib B2C Patient App — Full UI Walkthrough

**Environment**: `www.doctolib.de` — real production environment, logged in as Alex SIMON  
**IMPORTANT**: Real patient data. No appointments were booked during ingest.  
**Sections covered**: Homepage, Appointments, Past Appointments, Appointment Detail, Messages, Documents, Notes, Account Settings, Privacy Settings (all 6 consent types), Search Results, Practitioner Profile

---

## 1. Homepage (b2c-01)

Logged-in state shows:
- "Doctolib" logo in header
- Navigation: Help center | Messages | Appointments | Documents | Alex SIMON (account menu)
- Main content: "Hello Alex, book your next appointment" + search bar (specialty + location)
- Recent practitioners section: 4 cards (Dr. Salamé, Dr. Breitkreutz, Dr. Ramirez-Espinoza, Dr. Amara Trawally)
- No AI-generated content or pre-consultation prompts visible

---

## 2. Appointments (b2c-02)

- "No upcoming appointments" state
- Link: "View my past appointments"
- No AI pre-consultation intake prompts linked to upcoming appointments
- No notification of pending pre-consultation questionnaire

> [!key-insight] If the AI pre-consultation history feature existed, an upcoming appointment would show a "Complete your health history" CTA here. The absence confirms the feature is not yet live for patients.

---

## 3. Past Appointments (b2c-03)

10 appointments listed (2023–2026):
- Format: Date | Practitioner name | Specialty
- Examples: Dr. Salamé (general medicine, Jan 2026, Jan 2025), Dr. Breitkreutz (orthopedist, 2024, 2023), Dr. Ramirez Espinoza (dental), Dr. Amara Trawally (general, 2023)
- Each entry links to appointment detail
- No AI summary visible at list level

---

## 4. Appointment Detail — Dr. Salamé (b2c-04)

Sections visible:
- Appointment metadata: date (Jan 12), practitioner, specialty (general medicine), address
- No attached documents in this view
- No AI-generated pre-consultation summary
- No history questionnaire visible (neither completed nor pending)

> [!key-insight] The appointment detail page is the natural home for "Your pre-consultation history summary is ready" status indicator. Currently empty — the feature is not present.

---

## 5. Messages (b2c-05)

- Inbox style, currently empty ("No messages")
- Secure async channel from patient side
- Distinct from Connect (practitioner-to-practitioner)
- No AI-generated content

---

## 6. Documents (b2c-06)

Documents stored in patient account:
- Family doctor note (Dr. Trawally) — 2024
- Orthopedist note (Dr. Breitkreutz) — 2024
- Vaccination certificate
- Multiple "Other" category documents

Features:
- Upload document button
- Filter by type / practitioner
- Encrypted documents (DSGVO-compliant, activated by default per account settings)

> [!key-insight] The documents section is the persistence layer for patient health artifacts. AI pre-consultation summaries would NOT live here (they're ephemeral, pre-appointment). But the AI intake may reference documents stored here as context.

---

## 7. Notes (b2c-07)

- Dedicated "Notes" tab
- Currently empty
- Copy: "Only you have access to your notes"
- Private patient-side annotation — not shared with practitioners
- No AI assistance, no auto-population

> [!key-insight] This is a private space patients control entirely — relevant to the trust model for the AI intake feature. The patient-facing AI history intake should feel similarly private/controlled, not like data being extracted.

---

## 8. Account Settings (b2c-08) — `account/edit`

Sections:
- **Personal information**: My profile (Alex SIMON), My relatives
- **Login**: Phone (verified), Email (verified), Password
- **Payment and Billing**: Online payment settings, Payment methods
- **Settings**: Country (Germany), Language (English), 2FA (Activated), Encrypted documents (Activated)
- **Confidentiality**: My preferences → privacy-settings, Legal information, Delete my account

Header copy: "Your health. Your data. — The confidentiality of your personal information is an absolute priority for Doctolib."

> [!key-insight] Privacy is front-and-center in account management — positioned as a core product value, not a legal footnote. This sets the trust register for any AI feature.

---

## 9. Privacy Settings — My Preferences (b2c-09 through b2c-11) — `/privacy-settings`

### 6 Consent Categories

| Category | Purpose |
|---|---|
| Personalized services | Health data controller consent for Doctolib — enables appointment history, medical record storage, health recommendations |
| Service improvements | Aggregate usage data for product improvement |
| Consultation audio | Audio from AI note-taking assistant — used for AI training |
| Map | Google Maps geolocation (IP transfer to US) |
| Notifications | Push/email notification preferences |
| Cookie Management | Cookie consent per category |

### Personalized Services Consent (b2c-10)

Dialog title: "Activate personalized services"

What it enables:
- View past appointments and practitioners
- Save medical history (info + documents from practitioners)
- Get health recommendations

Consent language: "By activating personalized services, you give consent for Doctolib to act as **data controller** for your health data and that of your relatives, for current and upcoming services."

Current state: **Activated** (opt-in confirmed)

> [!key-insight] This is the master GDPR Art.9 consent gate. Without it, Doctolib cannot process health data as a controller — meaning the AI pre-consultation history feature **requires** this consent to be active. `ConsentGate` must check this status before surfacing the AI intake flow.

### Consultation Audio Consent (b2c-11)

Dialog title: "Activate consultation audio"

Heading: "Help us improve Doctolib with audio from consultations"

Full text: "We would like to use audio recordings of your consultations, captured when your practitioner uses Doctolib's note-taking assistant. These recordings may include your voice, your health data, and that of your dependents under 18. This data is processed without any of you being directly identifiable, and used for research, to improve our services and **artificial intelligence tools**, and for anonymization purposes. You can change your mind at any time in 'My Preferences'."

**3-tier consent options:**
1. "I agree to using my voice and health data, **and that of my dependents**, for service improvements."
2. "I agree to using only **my** voice and health data for service improvements."
3. "I do not agree to using my voice and health data, and that of my dependents, for service improvements."

Key details:
- Explicitly mentions "artificial intelligence tools" — direct link to Consultation Assistant
- Separately scopes self vs. dependents (minors under 18)
- Revocable at any time from My Preferences

> [!key-insight] The **3-tier consent model** (self + dependents / self only / decline) is the production pattern for AI audio data. The AI pre-consultation history feature will need a similar tiered consent — explicitly naming AI use, scoping to the patient's data only. This is the real-world template for the `ConsentGate` component design.

---

## 10. Search Results (b2c-12) — `/allgemeinmedizin/berlin`

2059 GP results in Berlin. Each card shows:
- Practice/practitioner name + type (Individual practice, Group practice, Private practice)
- Address
- Insurance accepted (Public + Private / Private only)
- Available appointment slots (dates + times inline)

Filters: Availability, Insurance type

> [!key-insight] Pre-booking questions are triggered AFTER clicking a practitioner's availability slot — not at search results stage. The AI intake would be a later touchpoint (days before appointment), not at this entry point.

---

## 11. Practitioner Profile (b2c-13)

Shows: Name, specialty, address, insurance, availability calendar, appointment reason selector

Booking flow entry point: patient selects reason → triggers pre-booking questions (the existing static checkbox library from the pro side). No AI intake flow visible here.

---

## Key Structural Findings for the Case

### What EXISTS on patient side today
1. **Appointment management** — booking history, upcoming appointments, appointment detail
2. **Document storage** — encrypted, patient-controlled, shareable with practitioners
3. **Private notes** — patient-only, never shared
4. **Consent management** — 6 categories, fine-grained, revocable, health data controller consent confirmed
5. **Consultation audio consent** — 3-tier AI-specific consent already in production (the `ConsentGate` pattern exists)

### What is MISSING / where the AI feature would fit
1. **No pre-consultation AI intake flow** — appointment detail page has no "Complete your health history" prompt; the feature is genuinely not live
2. **No AI-generated summary on appointment detail** — the natural home for "pre-consultation summary ready" status
3. **No 6th communication touchpoint** — no "days before" AI history request email/push visible

### Architecture insight for the `ConsentGate` component

The consultation audio consent dialog is the **production reference implementation** for `ConsentGate`:
- Explicit AI mention required ("artificial intelligence tools")
- Tiered scope (self vs. self + dependents)
- Linked to master health data controller consent (Personalized services must be active first)
- Revocable from account settings at any time
- Plain-language copy, not legal boilerplate

The AI pre-consultation history intake `ConsentGate` would follow the same pattern:
- Check: Personalized services = active
- Gate: "Allow Doctolib AI to review your appointment history and health context to prepare for your upcoming appointment with [Dr. X]?"
- Scope: self only (or self + dependents for pediatric appointments)
- Persistent in My Preferences under a new "Pre-consultation AI" category
