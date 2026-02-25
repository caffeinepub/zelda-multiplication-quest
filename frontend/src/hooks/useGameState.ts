import { useState, useCallback } from 'react';
import { Question } from '../utils/questionGenerator';

export interface GameState {
  questions: Question[];
  currentIndex: number;
  score: number;
  mistakes: number;
  lives: number;
  isComplete: boolean;
  isPassed: boolean;
  lastAnswerCorrect: boolean | null;
  showFeedback: boolean;
}

const TOTAL_HEARTS = 3;
const PASS_THRESHOLD = 8;
const TOTAL_QUESTIONS = 10;

export function useGameState(questions: Question[]) {
  const [state, setState] = useState<GameState>({
    questions,
    currentIndex: 0,
    score: 0,
    mistakes: 0,
    lives: TOTAL_HEARTS,
    isComplete: false,
    isPassed: false,
    lastAnswerCorrect: null,
    showFeedback: false,
  });

  const submitAnswer = useCallback((userAnswer: number): boolean => {
    const currentQuestion = state.questions[state.currentIndex];
    const isCorrect = userAnswer === currentQuestion.answer;

    setState(prev => {
      const newScore = isCorrect ? prev.score + 1 : prev.score;
      const newMistakes = isCorrect ? prev.mistakes : prev.mistakes + 1;
      // Lose a heart after every 2nd mistake (mistakes 2, 4, 6...)
      const newLives = (!isCorrect && newMistakes % 2 === 0)
        ? Math.max(0, prev.lives - 1)
        : prev.lives;

      const nextIndex = prev.currentIndex + 1;
      const isComplete = nextIndex >= TOTAL_QUESTIONS;
      const isPassed = isComplete && newScore >= PASS_THRESHOLD;

      return {
        ...prev,
        score: newScore,
        mistakes: newMistakes,
        lives: newLives,
        currentIndex: nextIndex,
        isComplete,
        isPassed,
        lastAnswerCorrect: isCorrect,
        showFeedback: true,
      };
    });

    return isCorrect;
  }, [state.questions, state.currentIndex]);

  const hideFeedback = useCallback(() => {
    setState(prev => ({ ...prev, showFeedback: false }));
  }, []);

  const reset = useCallback((newQuestions: Question[]) => {
    setState({
      questions: newQuestions,
      currentIndex: 0,
      score: 0,
      mistakes: 0,
      lives: TOTAL_HEARTS,
      isComplete: false,
      isPassed: false,
      lastAnswerCorrect: null,
      showFeedback: false,
    });
  }, []);

  return { state, submitAnswer, hideFeedback, reset };
}
