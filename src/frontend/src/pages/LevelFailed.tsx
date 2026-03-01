import { useNavigate, useSearch } from "@tanstack/react-router";
import { Home, RefreshCw, Skull } from "lucide-react";
import React from "react";
import { ZeldaPanel } from "../components/ZeldaPanel";

const DEFEAT_MESSAGES: Record<number, { title: string; flavor: string }> = {
  1: {
    title: "The Coral Reef Defeated You...",
    flavor: "The ocean creatures were too clever. Train harder, young hero!",
  },
  2: {
    title: "The Kelp Forest Remains Unconquered...",
    flavor:
      "The sea spirit puzzles proved too difficult. Study your times tables!",
  },
  3: {
    title: "The Sunken Temple Blocks Your Way...",
    flavor:
      "The two-digit sea beasts proved too much. Practice and return stronger!",
  },
  4: {
    title: "The Abyssal Caverns Consume You...",
    flavor: "The deep-water beasts overwhelmed you. Study harder!",
  },
  5: {
    title: "The Sacred Depths Remain Sealed...",
    flavor:
      "The ultimate challenge remains locked. Only a true math master can prevail!",
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
          "linear-gradient(180deg, oklch(0.28 0.12 215) 0%, oklch(0.20 0.10 225) 40%, oklch(0.12 0.07 235) 100%)",
      }}
    >
      <div className="w-full max-w-lg animate-fade-in-scale">
        <ZeldaPanel className="p-8 text-center">
          {/* Defeat Header */}
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.42 0.22 22 / 0.2)",
                  border: "2px solid oklch(0.42 0.22 22)",
                }}
              >
                <Skull size={40} style={{ color: "oklch(0.60 0.22 25)" }} />
              </div>
            </div>
            <h1
              className="font-cinzel-decorative text-2xl md:text-3xl font-bold mb-2"
              style={{
                color: "oklch(0.60 0.22 25)",
                textShadow: "0 0 12px oklch(0.55 0.22 25 / 0.6)",
              }}
            >
              Defeated!
            </h1>
            <h2
              className="font-cinzel font-bold text-xl mb-3"
              style={{ color: "oklch(0.97 0.02 210)" }}
            >
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
            <p
              className="font-im-fell italic text-sm"
              style={{ color: "oklch(0.93 0.04 210)" }}
            >
              {info.flavor}
            </p>
          </div>

          {/* Score */}
          <div className="mb-8">
            <p
              className="font-cinzel text-sm uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.93 0.04 210)" }}
            >
              Your Score
            </p>
            <div
              className="font-cinzel-decorative text-5xl font-bold"
              style={{ color: "oklch(0.72 0.22 25)" }}
            >
              {score}{" "}
              <span
                className="text-2xl opacity-90"
                style={{ color: "oklch(0.72 0.22 25)" }}
              >
                / 10
              </span>
            </div>
            <p
              className="font-im-fell text-sm mt-2"
              style={{ color: "oklch(0.93 0.04 210)" }}
            >
              You needed{" "}
              <strong
                style={{ color: "oklch(0.97 0.02 210)", fontWeight: "bold" }}
              >
                8
              </strong>{" "}
              correct answers to pass.
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
        <p
          className="font-im-fell text-sm"
          style={{ color: "oklch(0.70 0.20 192 / 0.80)" }}
        >
          © {new Date().getFullYear()} Quest of Numbers &nbsp;·&nbsp; Built with{" "}
          <span style={{ color: "oklch(0.55 0.22 25)" }}>♥</span> using{" "}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "quest-of-numbers")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.70 0.20 192)" }}
            className="underline underline-offset-2 hover:opacity-80"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
