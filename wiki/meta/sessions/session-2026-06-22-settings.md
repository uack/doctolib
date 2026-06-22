---
type: meta
title: "Session — B2C Booking Flow + Pro Settings Deep Dive"
created: 2026-06-22
updated: 2026-06-22
status: complete
tags:
  - meta
  - session
---

# Session — B2C Booking Flow + Pro Settings 2026-06-22

## Decisions
- Booked + immediately cancelled a real appointment (Mr Lamprecht, Mon 3 Aug 12:00) to capture full checkout flow — no fee risk on >24h slots confirmed
- Question system confirmed as closed 3-type library (Age, New patient, Referral) — `IntakeQuestion` is net-new, not an extension
- Communication pipeline confirmed at exactly 5 channels — `AIMessage` = genuinely new 6th touchpoint

## Interview Prep State
- Wiki at 13 pages. All surfaces fully documented (Pro sandbox, B2C, Settings).
- Case framework solid. Component placements confirmed by production evidence.
- One open gap: DS technology stack (React lib name) not confirmed.

## Open Questions
- Doctolib DS React library name?

## Pages Touched
- wiki/sources/sandbox-b2c-doctolib.md (Section 12 added — full booking flow)
- wiki/sources/sandbox-pro-settings-config.md (created)
- wiki/hot.md (settings findings added, sources updated)
- wiki/index.md (settings source added)
- wiki/log.md (two ingest entries added)
