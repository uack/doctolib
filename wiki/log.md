---
type: meta
title: "Wiki Log"
created: 2026-06-22
updated: 2026-06-22
status: active
tags:
  - meta
  - log
---

# Wiki Operation Log

Append-only chronological record. New entries at the TOP.

**Entry format**: `- **YYYY-MM-DD** | operation | pages_created: N | pages_updated: N | dead_links_delta: ±N | open_gaps: N | [summary]`

- **2026-06-22** | `ingest` | pages_created: 1 | pages_updated: 3 | dead_links_delta: 0 | open_gaps: 1 | Pro settings deep dive (11 screenshots: pro-settings-01 through pro-settings-11). Created: sources/sandbox-pro-settings-config.md. Key findings: question system = closed 3-type library (Age/New patient/Referral), multiple per rule set OK but types hardcoded; comms matrix = 5 channels only, no 6th; no /configuration/ai exists. `IntakeQuestion` and `AIMessage` confirmed as net-new infrastructure.
- **2026-06-22** | `ingest` | pages_created: 0 | pages_updated: 3 | dead_links_delta: 0 | open_gaps: 1 | Captured full B2C booking+cancel flow (b2c-14 through b2c-23). Key findings: checkout = 1 question only (new/returning patient), "Send documents" is appointment-scoped (upcoming only), pre-booking instructions dialog = practitioner-authored gate. No AI intake at any booking step confirmed.
- **2026-06-22** | `ingest` | pages_created: 1 | pages_updated: 3 | dead_links_delta: 0 | open_gaps: 1 | Ingested Doctolib B2C patient app (13 screenshots). Created: sources/sandbox-b2c-doctolib.md. Updated: hot.md (B2C findings section), index.md, log.md. Key findings: AI intake confirmed absent, 3-tier ConsentGate production reference (consultation audio consent), two-layer GDPR consent model documented.
- **2026-06-22** | `ingest` | pages_created: 1 | pages_updated: 3 | dead_links_delta: 0 | open_gaps: 1 | Ingested Doctolib Pro sandbox (20 screenshots). Created: sources/sandbox-pro-doctolib.md. Updated: hot.md (sandbox findings section), index.md, log.md. Key findings: SummaryCard placement confirmed (Summaries to validate queue), pre-booking question system documented, dictation = premium upsell.
- **2026-06-22** | `ingest` | pages_created: 4 | pages_updated: 3 | dead_links_delta: 0 | open_gaps: 2 | Ingested Gemini Deep Research. Created: overview.md (upgraded), regulatory-constraints.md, competitive-landscape.md, stanislas-niox-chateau.md. Updated: case-answer-framework.md (regulatory citations added), hot.md, index.md.
- **2026-06-22** | `case-build` | pages_created: 2 | pages_updated: 3 | dead_links_delta: 0 | open_gaps: 3 | Created case-answer-framework.md (full answer: design direction + engineering infrastructure) and live-case-brief.md (brief analysis). Updated hot.md, index.md, log.md.
- **2026-06-22** | `ingest` | pages_created: 1 | pages_updated: 1 | dead_links_delta: 0 | open_gaps: 1 | Ingested live-case-brief.pdf — filed to raw/research/ and wiki/cases/. Updated overview.md with company facts from training knowledge.
- **2026-06-22** | `baseline` | pages_created: 3 | pages_updated: 0 | dead_links_delta: 0 | open_gaps: 0 | Vault scaffolded. CLAUDE.md, index.md, log.md, hot.md created. Awaiting research phase.
