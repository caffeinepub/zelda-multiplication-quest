import type React from "react";
import { useEffect, useRef, useState } from "react";
import type { GameState } from "../hooks/useGameState";
import type { Question } from "../utils/questionGenerator";
import { FeedbackMessage } from "./FeedbackMessage";
import { HeartIcons } from "./HeartIcons";
import { ZeldaPanel } from "./ZeldaPanel";

const LEVEL_NAMES: Record<number, string> = {
  1: "The Coral Reef",
  2: "The Kelp Forest",
  3: "The Sunken Temple",
  4: "The Abyssal Caverns",
  5: "The Sacred Depths",
};

const LEVEL_SUBTITLES: Record<number, string> = {
  1: "Single-digit multiplication",
  2: "Times tables up to 12",
  3: "Two-digit × single-digit",
  4: "Two-digit × two-digit",
  5: "Master-level multiplication",
};

interface GameplayUIProps {
  level: number;
  gameState: GameState;
  onSubmit: (answer: number) => void;
  onFeedbackDone: () => void;
}

export function GameplayUI({
  level,
  gameState,
  onSubmit,
  onFeedbackDone,
}: GameplayUIProps) {
  const [inputValue, setInputValue] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion: Question | undefined =
    gameState.questions[
      Math.min(gameState.currentIndex, gameState.questions.length - 1)
    ];

  const displayIndex = Math.min(gameState.currentIndex, 10);
  const progress = (displayIndex / 10) * 100;

  // Auto-focus input
  useEffect(() => {
    if (!gameState.showFeedback && inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState.showFeedback]);

  // After feedback, clear input and refocus
  useEffect(() => {
    if (!gameState.showFeedback) {
      setInputValue("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [gameState.showFeedback]);

  // Shake on wrong
  useEffect(() => {
    if (gameState.showFeedback && gameState.lastAnswerCorrect === false) {
      setShakeKey((k) => k + 1);
    }
  }, [gameState.showFeedback, gameState.lastAnswerCorrect]);

  // Auto-advance after feedback
  useEffect(() => {
    if (gameState.showFeedback) {
      const timer = setTimeout(() => {
        onFeedbackDone();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState.showFeedback, onFeedbackDone]);

  const handleSubmit = () => {
    const parsed = Number.parseInt(inputValue, 10);
    if (Number.isNaN(parsed)) return;
    onSubmit(parsed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  if (!currentQuestion) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Level Header */}
      <div className="text-center mb-6">
        <h2
          className="text-2xl font-bold font-cinzel"
          style={{
            color: "oklch(0.97 0.02 210)",
            textShadow:
              "0 1px 0 oklch(0.7 0.15 195 / 0.5), 0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          Level {level}: {LEVEL_NAMES[level]}
        </h2>
        <p
          className="font-im-fell text-sm mt-1"
          style={{ color: "oklch(0.92 0.04 210)" }}
        >
          {LEVEL_SUBTITLES[level]}
        </p>
      </div>

      <ZeldaPanel className="p-6">
        {/* HUD Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col items-start">
            <span
              className="font-cinzel text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "oklch(0.75 0.20 192)" }}
            >
              Lives
            </span>
            <HeartIcons total={3} filled={gameState.lives} />
          </div>
          <div className="flex flex-col items-end">
            <span
              className="font-cinzel text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "oklch(0.80 0.20 192)" }}
            >
              Question
            </span>
            <span
              className="font-cinzel font-bold text-lg"
              style={{ color: "oklch(0.95 0.04 210)" }}
            >
              {displayIndex} <span className="opacity-90">/ 10</span>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-bg h-3 mb-6">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Score */}
        <div className="text-center mb-2">
          <span
            className="font-cinzel text-sm font-bold"
            style={{ color: "oklch(0.95 0.04 210)" }}
          >
            Score:{" "}
            <span
              className="font-bold"
              style={{ color: "oklch(0.72 0.20 152)" }}
            >
              {gameState.score}
            </span>{" "}
            / 10
          </span>
        </div>

        {/* Question Display */}
        <div
          key={`q-${gameState.currentIndex}-${shakeKey}`}
          className={`
            text-center py-8 px-4 mb-6 rounded-sm
            ${gameState.showFeedback && gameState.lastAnswerCorrect === false ? "animate-shake" : ""}
          `}
          style={{
            background: "oklch(0.16 0.06 228)",
            border: "1px solid oklch(0.45 0.12 210 / 0.4)",
          }}
        >
          <div
            className="font-cinzel-decorative text-5xl md:text-6xl font-bold tracking-wide"
            style={{
              color: "oklch(0.96 0.12 192)",
              textShadow:
                "0 0 16px oklch(0.78 0.2 195 / 0.8), 0 1px 0 oklch(0.3 0.12 220), 0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {currentQuestion.factorA} × {currentQuestion.factorB} = ?
          </div>
        </div>

        {/* Feedback */}
        <div className="mb-4 min-h-[64px] flex items-center justify-center">
          <FeedbackMessage
            visible={gameState.showFeedback}
            isCorrect={gameState.lastAnswerCorrect}
            correctAnswer={currentQuestion.answer}
          />
        </div>

        {/* Input + Submit */}
        {!gameState.showFeedback && (
          <div className="flex gap-3 items-center justify-center">
            <input
              ref={inputRef}
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="zelda-input w-36 h-14 px-4"
              placeholder="?"
              min={0}
              max={999}
              disabled={gameState.showFeedback}
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!inputValue || gameState.showFeedback}
              className="zelda-btn zelda-btn-green px-8 h-14 text-base"
            >
              Submit
            </button>
          </div>
        )}
      </ZeldaPanel>
    </div>
  );
}
