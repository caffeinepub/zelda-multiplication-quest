# Zelda Multiplication Quest

## Current State
- 3 levels: Forest Trial (single-digit), Temple Challenge (up to 12), Final Dungeon (two-digit × single digit)
- 10 questions per level, randomly generated with possible duplicates
- Home page shows 3 level cards; LevelComplete and LevelFailed have messages for levels 1–3
- `questionGenerator.ts` generates questions randomly without deduplication

## Requested Changes (Diff)

### Add
- Level 4: "The Shadow Realm" — two-digit × two-digit (11–19 × 11–19)
- Level 5: "The Sacred Realm" — large two-digit × two-digit (15–25 × 15–25) and mixed harder problems
- Victory/defeat messages for levels 4 and 5 in LevelComplete and LevelFailed
- Level cards for levels 4 and 5 on the Home page

### Modify
- `questionGenerator.ts`: Add `generateLevel4Questions` and `generateLevel5Questions`, rewrite all level generators to guarantee no duplicate problems within a level session using a Set-based deduplication approach (key = `factorA:factorB`)
- Home page: Update LEVEL_INFO array to 5 entries; update subtitle to "5 epic levels"
- LevelComplete: Update `isLastLevel` check to `level >= 5`; add entries for levels 4 and 5
- LevelFailed: Add entries for levels 4 and 5

### Remove
- Nothing removed

## Implementation Plan
1. Rewrite `questionGenerator.ts`:
   - Add shuffle helper
   - Add deduplication: generate from a full pool of valid pairs, shuffle, slice 10
   - Level 1: 2–9 × 2–9 (single-digit × single-digit)
   - Level 2: 2–12 × 2–12, guaranteed mix including 10–12 factors
   - Level 3: 13–20 × 2–9
   - Level 4: 11–19 × 11–19
   - Level 5: 15–25 × 12–25 (harder, larger numbers)
   - `generateQuestionsForLevel` handles cases 1–5

2. Update `Home.tsx`:
   - Expand LEVEL_INFO to 5 levels with Zelda-themed names and descriptions
   - Update subtitle text from "3" to "5"

3. Update `LevelComplete.tsx`:
   - Add victory messages for levels 4 and 5
   - Change `isLastLevel` to `level >= 5`

4. Update `LevelFailed.tsx`:
   - Add defeat messages for levels 4 and 5
