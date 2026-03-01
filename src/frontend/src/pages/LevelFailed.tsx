import { useNavigate, useSearch } from "@tanstack/react-router";
import { Home, RefreshCw, Skull } from "lucide-react";
import React from "react";
import { ZeldaPanel } from "../components/ZeldaPanel";

const DEFEAT_MESSAGES: Record<number, { title: string; flavor: string }> = {
  1: {
    title: "The Forest Trial Defeated You...",
    flavor:
      "The monsters of Kokiri Forest were too strong. Train harder, young hero!",
  },
  2: {
    title: "The Temple Remains Unconquered...",
    flavor:
      "The ancient puzzles proved too difficult. Study your times tables!",
  },
  3: {
    title: "The Shadow Passage Blocks Your Way...",
    flavor:
      "The two-digit beasts proved too much. Practice and return stronger!",
  },
  4: {
    title: "The Shadow Realm Consumes You...",
    flavor: "The two-digit beasts overwhelmed you. Study harder!",
  },
  5: {
    title: "Ganon Triumphs...",
    flavor:
      "The Sacred Realm remains locked. Only a true math master can prevail!",
  },
};

export function LevelFailed() {
  const navigate = useNavigate();
  const { level, score } = useSearch({ from: "/level-failed" });

  const info = DEFEAT_MESSAGES[level] ?? DEFEAT_MESSAGES[1];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.18 0.05 30) 0%, oklch(0.12 0.04 25) 40%, oklch(0.08 0.03 20) 100%)",
      }}
    >
      <div className="w-full max-w-lg animate-fade-in-scale">
        <ZeldaPanel className="p-8 text-center">
          {/* Defeat Header */}
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-zelda-red/20 border-2 border-zelda-red flex items-center justify-center">
                <Skull size={40} className="text-zelda-red" />
              </div>
            </div>
            <h1
              className="font-cinzel-decorative text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "oklch(0.55 0.22 25)" }}
            >
              Defeated!
            </h1>
            <h2 className="zelda-heading font-cinzel font-bold text-xl mb-3">
              {info.title}
            </h2>
          </div>

          {/* Flavor text */}
          <div
            className="border rounded-sm px-6 py-4 mb-6"
            style={{
              background: "oklch(0.45 0.2 25 / 0.1)",
              borderColor: "oklch(0.45 0.2 25 / 0.5)",
            }}
          >
            <p className="font-im-fell italic text-sm opacity-80">
              {info.flavor}
            </p>
          </div>

          {/* Score */}
          <div className="mb-8">
            <p className="font-cinzel text-sm opacity-60 uppercase tracking-widest mb-2">
              Your Score
            </p>
            <div
              className="font-cinzel-decorative text-5xl font-bold"
              style={{ color: "oklch(0.55 0.22 25)" }}
            >
              {score} <span className="text-2xl opacity-60">/ 10</span>
            </div>
            <p className="font-im-fell text-sm opacity-60 mt-2">
              You needed <strong>8</strong> correct answers to pass.
            </p>
            <div className="flex justify-center gap-1 mt-3">
              {Array.from({ length: 10 }, (_, idx) => idx).map((slot) => (
                <div
                  key={`dot-slot-${slot}`}
                  className="w-5 h-5 rounded-sm border"
                  style={{
                    background:
                      slot < score
                        ? "oklch(0.55 0.22 25)"
                        : "oklch(0.45 0.2 25 / 0.2)",
                    borderColor: "oklch(0.45 0.2 25 / 0.5)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/level/$levelId",
                  params: { levelId: String(level) },
                })
              }
              className="zelda-btn zelda-btn-green px-8 py-3 text-base font-cinzel font-bold flex items-center gap-2 justify-center"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="zelda-btn px-6 py-3 text-base font-cinzel font-bold flex items-center gap-2 justify-center"
            >
              <Home size={18} />
              Return to Map
            </button>
          </div>
        </ZeldaPanel>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="font-im-fell text-zelda-gold/40 text-sm">
          © {new Date().getFullYear()} Quest of Numbers &nbsp;·&nbsp; Built with{" "}
          <span className="text-zelda-red">♥</span> using{" "}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "quest-of-numbers")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zelda-gold hover:text-zelda-gold-bright underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
