# DELF50 V1.8 Authoritative Source Seed Pipeline

## Goal

Support 50 days at the 8-hour intensity without reusing unfinished content, while keeping materials high-quality, expandable and traceable.

## Three-layer source model

### 1. Exam calibration

France Éducation international and CEFR define task format, B1 communicative ability, timing, writing/speaking expectations and assessment alignment.

Official DELF sample subjects are calibration references only. They are not bulk-copied into the internal exercise bank.

### 2. Open factual seeds

Prefer authoritative public/open datasets for real-world facts and situations. Initial source families include:

- Service-Public.gouv.fr / DILA: administration, housing, family, consumer and daily-life procedures.
- Entreprendre.Service-Public.gouv.fr / DILA: work and professional procedures.
- Ministère de l'Éducation nationale open data: education and orientation.
- Assurance Maladie / official health catalogues: health-system and prevention-related public facts.
- SNCF / transport.data.gouv.fr: travel and timetable situations.
- Dares / France Travail: employment, work and training.
- ADEME / housing-energy open data: environment, energy and housing.
- Observatoires Locaux des Loyers: rent/budget comparison.

Each source seed must record authority, URL, licence, verification date and topic tags.

### 3. Original pedagogical derivatives

Reading texts, listening scripts, questions, writing prompts, speaking tasks and application scenarios are DELF50-original pedagogical materials derived from source facts and CEFR/DELF constraints.

Every generated item must store:

- stable contentId / traceId;
- sourceSeedIds;
- sourceVerifiedAt;
- authority and licence metadata;
- phase/day/slot;
- CEFR level and DELF function;
- grammar/function/topic tags;
- generation/template version;
- semantic fingerprint;
- revision number.

## Capacity requirements for 50 days × 8h

Minimum core capacity:

- grammar objective questions: 600;
- reading texts: 200;
- listening sets: 200;
- writing tasks: 100;
- speaking tasks: 200;
- application scenarios: 200.

Reading/listening items normally contain at least three questions, so the core bank exceeds 2,300 independently traceable learning units before vocabulary and review work are counted.

## No-repeat policy

Exact ID uniqueness is necessary but not sufficient. New content must also pass:

1. exact contentId/traceId uniqueness;
2. exact normalized text uniqueness;
3. exact question-stem uniqueness where appropriate;
4. semantic-near-duplicate review using topic + communicative function + text structure + fact seed fingerprint;
5. prior-user assignment exclusion for unfinished content.

Changing only a person's name, city or date is not considered new pedagogical content.

## Historical learning protection

Already completed or started records are immutable learning evidence. Expanding the bank may only change future/unstarted assignments.

A content revision must never silently reuse an existing contentId for a substantially different item. Use a new ID or increment an explicit revision with migration notes.

## Quality gate before a source seed enters production

A source must satisfy all applicable checks:

- authoritative origin;
- licence/reuse conditions recorded;
- current verification date;
- suitable for non-specialist B1 learners;
- no requirement to reproduce copyrighted exam/article text verbatim;
- facts can be rewritten into an original pedagogical text without distortion;
- clear DELF communicative function;
- no high-stakes medical/legal advice generated from the source.

## Publication workflow

Source discovery → licence check → fact extraction → pedagogical rewrite → CEFR/DELF tagging → answer validation → provenance assignment → exact + semantic duplicate audit → old-user regression test → Preview → Production.
