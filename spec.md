# Specification

## Summary
**Goal:** Build a Zelda-themed gamified multiplication practice app ("Quest of Numbers") for 4th graders with 3 progressive levels, Zelda-inspired visuals, and persistent level unlock tracking.

**Planned changes:**
- Apply a Zelda-inspired color theme throughout (dark forest green #2D5A27, golden yellow #C9A84C, parchment #F2E8C9, deep brown #3B1F0A, danger red #8B0000) with fantasy serif/pixel-style headings and HUD-style bordered panels
- Build a Home screen with the title "Quest of Numbers", a "Begin Quest" button, and three level indicators showing locked/unlocked state with Zelda-style icons
- Implement 3 multiplication levels: Level 1 "The Forest Trial" (single-digit × single-digit), Level 2 "The Temple Challenge" (factors up to 12), Level 3 "The Final Dungeon" (two-digit × single-digit); 10 random questions each, pass threshold 8/10
- Build a gameplay screen per level showing level name banner, question counter, 3 heart icons (lose one after 2nd+ wrong answer), the multiplication question, numeric input + Submit button, immediate correct/wrong visual feedback, and a progress bar
- Build a Level Complete screen with Zelda-flavored victory message (e.g., "You obtained the Forest Medallion!"), score, and Continue/Return button; build a Level Failed screen with defeat message, score, and Try Again button
- Persist level unlock state in the backend Motoko actor (level 1 always unlocked; levels 2 and 3 unlock on passing the prior level); expose functions to get and update unlock state; frontend reads and updates on load and level completion
- Serve custom image assets (parchment background, triforce icon, title banner) from `frontend/public/assets/generated` and reference them in the UI

**User-visible outcome:** A student can open the app, see a Zelda-styled home screen, play through 3 progressively harder multiplication quizzes with heart-based lives and instant feedback, earn level unlocks stored persistently, and experience win/lose result screens with thematic messages.
