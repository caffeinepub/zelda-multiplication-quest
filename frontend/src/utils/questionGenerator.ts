export interface Question {
  factorA: number;
  factorB: number;
  answer: number;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(minA: number, maxA: number, minB: number, maxB: number): Question {
  const factorA = randomInt(minA, maxA);
  const factorB = randomInt(minB, maxB);
  return { factorA, factorB, answer: factorA * factorB };
}

// Level 1: single-digit × single-digit (2-9 × 2-9)
export function generateLevel1Questions(): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < 10; i++) {
    questions.push(generateQuestion(2, 9, 2, 9));
  }
  return questions;
}

// Level 2: one factor up to 12 (10-12 × 2-9, mixed with some 2-9 × 2-9)
export function generateLevel2Questions(): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < 10; i++) {
    if (i < 5) {
      // Guaranteed 10-12 factor
      const factorA = randomInt(10, 12);
      const factorB = randomInt(2, 9);
      questions.push({ factorA, factorB, answer: factorA * factorB });
    } else {
      // Mix: 2-12 × 2-12
      questions.push(generateQuestion(2, 12, 2, 12));
    }
  }
  // Shuffle
  return questions.sort(() => Math.random() - 0.5);
}

// Level 3: two-digit number × single digit (13-20 × 2-9)
export function generateLevel3Questions(): Question[] {
  const questions: Question[] = [];
  for (let i = 0; i < 10; i++) {
    questions.push(generateQuestion(13, 20, 2, 9));
  }
  return questions;
}

export function generateQuestionsForLevel(level: number): Question[] {
  switch (level) {
    case 1: return generateLevel1Questions();
    case 2: return generateLevel2Questions();
    case 3: return generateLevel3Questions();
    default: return generateLevel1Questions();
  }
}
