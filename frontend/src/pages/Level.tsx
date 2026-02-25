import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { GameplayUI } from '../components/GameplayUI';
import { useGameState } from '../hooks/useGameState';
import { generateQuestionsForLevel } from '../utils/questionGenerator';
import { useUnlockNextLevel } from '../hooks/useQueries';

export function Level() {
  const { levelId } = useParams({ from: '/level/$levelId' });
  const navigate = useNavigate();
  const level = parseInt(levelId, 10);

  const questions = useRef(generateQuestionsForLevel(level));
  const { state, submitAnswer, hideFeedback, reset } = useGameState(questions.current);
  const unlockMutation = useUnlockNextLevel();
  const hasHandledComplete = useRef(false);

  // Regenerate questions when level changes
  useEffect(() => {
    questions.current = generateQuestionsForLevel(level);
    reset(questions.current);
    hasHandledComplete.current = false;
  }, [level]);

  // Handle level completion
  useEffect(() => {
    if (state.isComplete && !hasHandledComplete.current) {
      hasHandledComplete.current = true;

      if (state.isPassed) {
        const nextLevel = BigInt(level + 1);
        unlockMutation.mutate(nextLevel, {
          onSettled: () => {
            navigate({
              to: '/level-complete',
              search: { level, score: state.score },
            });
          },
        });
      } else {
        navigate({
          to: '/level-failed',
          search: { level, score: state.score },
        });
      }
    }
  }, [state.isComplete, state.isPassed, state.score, level, navigate, unlockMutation]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-8"
      style={{
        background: 'linear-gradient(180deg, oklch(0.25 0.09 148) 0%, oklch(0.18 0.07 145) 40%, oklch(0.12 0.05 140) 100%)',
      }}
    >
      <GameplayUI
        level={level}
        gameState={state}
        onSubmit={submitAnswer}
        onFeedbackDone={hideFeedback}
      />
    </div>
  );
}
