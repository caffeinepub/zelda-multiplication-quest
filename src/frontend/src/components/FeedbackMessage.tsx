import { CheckCircle, XCircle } from "lucide-react";
import React from "react";

interface FeedbackMessageProps {
  visible: boolean;
  isCorrect: boolean | null;
  correctAnswer: number;
}

export function FeedbackMessage({
  visible,
  isCorrect,
  correctAnswer,
}: FeedbackMessageProps) {
  if (!visible || isCorrect === null) return null;

  return (
    <div
      className={`
        animate-fade-in-scale rounded-sm px-6 py-4 flex items-center gap-3
        font-cinzel font-bold text-lg
        ${isCorrect ? "feedback-correct" : "feedback-wrong"}
      `}
    >
      {isCorrect ? (
        <>
          <CheckCircle size={28} className="shrink-0" />
          <span>Correct! Well done, Hero!</span>
        </>
      ) : (
        <>
          <XCircle size={28} className="shrink-0" />
          <span>
            Wrong! The answer was <strong>{correctAnswer}</strong>
          </span>
        </>
      )}
    </div>
  );
}
