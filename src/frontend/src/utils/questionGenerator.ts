export interface Question {
  factorA: number;
  factorB: number;
  answer: number;
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildPool(
  minA: number,
  maxA: number,
  minB: number,
  maxB: number,
): Question[] {
  const pool: Question[] = [];
  for (let a = minA; a <= maxA; a++) {
    for (let b = minB; b <= maxB; b++) {
      pool.push({ factorA: a, factorB: b, answer: a * b });
    }
  }
  return shuffle(pool);
}

// Level 1: single-digit × single-digit (2–9 × 2–9)
export function generateLevel1Questions(): Question[] {
  return buildPool(2, 9, 2, 9).slice(0, 10);
}

// Level 2: full 2–12 × 2–12 pool, then guarantee 5 with a factor of 10–12
export function generateLevel2Questions(): Question[] {
  // Pool of questions that include at least one factor from 10–12
  const highPool = buildPool(10, 12, 2, 12);
  // Pool of remaining lower questions (2–9 × 2–9)
  const lowPool = buildPool(2, 9, 2, 9);
  // Take 5 from high pool + 5 from low pool, then shuffle together
  const combined = shuffle([...highPool.slice(0, 5), ...lowPool.slice(0, 5)]);
  return combined.slice(0, 10);
}

// Level 3: two-digit × single-digit (13–20 × 2–9)
export function generateLevel3Questions(): Question[] {
  return buildPool(13, 20, 2, 9).slice(0, 10);
}

// Level 4 (NEW): two-digit × two-digit (11–19 × 11–19)
export function generateLevel4Questions(): Question[] {
  return buildPool(11, 19, 11, 19).slice(0, 10);
}

// Level 5 (NEW): larger two-digit × two-digit (15–25 × 15–25)
export function generateLevel5Questions(): Question[] {
  return buildPool(15, 25, 15, 25).slice(0, 10);
}

export function generateQuestionsForLevel(level: number): Question[] {
  switch (level) {
    case 1:
      return generateLevel1Questions();
    case 2:
      return generateLevel2Questions();
    case 3:
      return generateLevel3Questions();
    case 4:
      return generateLevel4Questions();
    case 5:
      return generateLevel5Questions();
    default:
      return generateLevel1Questions();
  }
}
