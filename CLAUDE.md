# Doctolib Interview Prep — LLM Maintained Knowledge Base

**Purpose**: Rapid prep for Senior Staff AI Product Designer interview at Doctolib
**Owner**: Alex Simon
**Created**: 2026-06-22
**Interview type**: AI product strategy live case

---

## What This Is

An LLM-maintained wiki for interview preparation. Same pattern as the Project Goldfish vault at `/Users/alesimon/Obsidian` — Claude maintains the entire structure. You ingest sources and ask questions. The wiki is the product.

---

## Structure

```
Doctolib/
├── CLAUDE.md               # This file — source of truth for conventions
├── wiki/
│   ├── hot.md              # Live context cache — read this before the interview
│   ├── index.md            # Master catalog
│   ├── log.md              # Append-only operation log
│   ├── overview.md         # Doctolib executive summary
│   ├── sources/            # Ingested research (articles, press, reports, scrapes)
│   ├── concepts/           # Key AI product concepts relevant to Doctolib
│   ├── stakeholders/       # Key people (CEO, CPO, product leads)
│   ├── cases/              # Prepared interview case frameworks and scenario answers
│   └── meta/               # Sessions, lint reports
└── raw/
    ├── articles/           # Raw scraped/pasted sources (read-only after ingest)
    └── research/           # Exported notes, job descriptions, etc.
```

**Rule**: Every page in `wiki/` must trace back to a file in `raw/` or an external document. No invented content.

---

## Wiki Principle

**Only ingest, never invent.** Wiki pages are faithful extractions or structured summaries of real sources. Analysis and frameworks belong in `wiki/cases/`, clearly labelled as synthesis.

---

## How to Use

### Ingest a source
```
/wiki-ingest [file or pasted content]
```

### Ask a question
```
/wiki-query [question]
```

### Save a conversation insight
```
/save
```

### Health check
```
/wiki-lint
```

### Research a topic autonomously
```
/autoresearch [topic]
```

### Build a canvas
```
/canvas new [name]
```

---

## Frontmatter (Every Page)

```yaml
---
type: <source|entity|comparison|question|overview|meta|case|redirect>
title: "Human-Readable Title"
created: YYYY-MM-DD
updated: YYYY-MM-DD
status: <seed|developing|mature|evergreen>
confidence: <high|medium|low>
related:
  - "[[Other Page]]"
sources:
  - "[[raw/articles/filename.md]]"
tags:
  - category
---
```

### Type-specific fields

**source**: `source_type` (article|press|job-posting|scrape|report), `author`, `date_published`, `url`, `key_claims` (list)

**entity**: `entity_type` (person|organization|product), `role`, `first_mentioned`

**case**: `scenario` (the interview question this addresses), `answer_quality` (draft|solid|ready)

---

## Conventions

- **Wikilinks**: Use `[[Page Name]]` always — never markdown paths
- **Raw is read-only**: Never modify files in `raw/`
- **Update, don't duplicate**: If a page exists, update it
- **Flag uncertainty**: Use `> [!gap]` and `> [!contradiction]` callouts
- **Log everything**: Append to `wiki/log.md` after every operation (new entries at TOP)
- **Keep hot cache current**: Update `wiki/hot.md` after every ingest
- **Redirect stubs**: Prefix absorbed/renamed pages with `~`

### Log entry format

```
- **YYYY-MM-DD** | `operation` | pages_created: N | pages_updated: N | dead_links_delta: ±N | open_gaps: N | [one-sentence summary]
```

`operation`: one of `ingest`, `update`, `lint`, `save`, `autoresearch`, `case-build`, `review`

### Session capture (mandatory on Stop)

Write `wiki/meta/sessions/session-YYYY-MM-DD-HHMM.md` before finishing any session where wiki pages were modified.

Required fields: Decisions, Interview Prep State, Open Questions, Pages Touched. Max 200 words.

### Post-ingest pipeline (mandatory)

After every `/wiki-ingest`:
1. `/wiki-lint` — append result to `log.md`
2. Update `hot.md § Last Updated`
3. Surface any new dead links or gaps to user

### hot.md § Line Budget (hard limit)

`hot.md` must never exceed 120 lines.

Section budgets:
```
Pipeline State block    : exactly 6 lines
Doctolib Overview       : max 20 lines
AI Strategy Signals     : max 15 lines
Sources list            : max 15 lines
Cases / Frameworks      : max 15 lines
Active Threads          : max 10 lines
Navigation              : max 8 lines
All other sections      : max 6 lines each
```

### Custom callout types

| Type | Usage |
|---|---|
| `> [!gap]` | Missing information, open research question |
| `> [!contradiction]` | Conflicting evidence between two sources |
| `> [!key-insight]` | Directly actionable finding for the interview |

---

## Google Drive Integration

```bash
source ~/google-cloud-sdk/path.zsh.inc && TOKEN=$(gcloud auth print-access-token 2>/dev/null)
```

**Auth account**: alex.simon@zalando.de

---

## Reference: Obsidian Vault

The Project Goldfish wiki lives at `/Users/alesimon/Obsidian`. Same conventions apply here.

---

_This file is the source of truth for vault conventions._
