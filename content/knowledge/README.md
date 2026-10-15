# Knowledge base

Every answer Ova Care gives is written only from these files. Each file covers one topic in plain language and ends with the trusted sources it is based on.

## File format

```markdown
# Irregular Periods

## 1. What Are Irregular Periods?

Short, plain-language paragraphs…

## Sources

1. NHS — Irregular periods
   https://www.nhs.uk/symptoms/irregular-periods/
```

- `# Title` on the first line; `## Section` headings for each part.
- A `## Sources` list at the end, with a link for every source (`- Name: https://…` or a numbered name with the link on the next line). Files without sources are skipped.
- The topic used for search filters is set per file in `scripts/ingest.mts` (`TOPIC_BY_FILE`); the language defaults to English.

## Loading changes

```bash
npm run ingest -- --dry-run   # preview the chunks
npm run ingest                # embed, load into MongoDB Atlas, build the vector index
npm run retrieve:test         # check that searches find the right passages
```
