import { useNavigate, useSearch } from "@tanstack/react-router";
import { Home, Shield, Star } from "lucide-react";
import React from "react";
import { ZeldaPanel } from "../components/ZeldaPanel";

const VICTORY_MESSAGES: Record<
  number,
  { title: string; flavor: string; reward: string }
> = {
  1: {
    title: "The Coral Reef is Conquered!",
    flavor: "The ocean spirits smile upon you, young hero.",
    reward: "You obtained the Coral Medallion!",
  },
  2: {
    title: "The Kelp Forest Bows Before You!",
    flavor: "The ancient sea spirits of the forest acknowledge your wisdom.",
    reward: "You obtained the Tide Medallion!",
  },
  3: {
    title: "The Sunken Temple is Cleared!",
    flavor: "The sunken city yields to your mathematical power!",
    reward: "You obtained the Deep Crystal!",
  },
  4: {
    title: "The Abyssal Caverns Vanquished!",
    flavor: "The ocean darkness bows before your mathematical might!",
    reward: "You obtained the Abyss Medallion!",
  },
  5: {
    title: "The Sacred Depths Yield to You!",
    flavor:
      "The final challenge is overcome! You are the ultimate ocean math hero!",
    reward: "You obtained the Complete Ocean Triforce!",
  },
};

export function LevelComplete() {
  const navigate = useNavigate();
  const { level, score } = useSearch({ from: "/level-complete" });

  const info = VICTORY_MESSAGES[level] ?? VICTORY_MESSAGES[1];
  const isLastLevel = level >= 5;

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
          {/* Victory Header */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-3">
              {Array.from({ length: 5 }, (_, idx) => idx).map((slot) => (
                <Star
                  key={`star-slot-${slot}`}
                  size={24}
                  className="animate-shimmer"
                  style={{
                    color: "#ffffff",
                    fill: "#ffffff",
                    animationDelay: `${slot * 0.1}s`,
                  }}
                />
              ))}
            </div>
            <h1
              className="font-cinzel-decorative text-2xl md:text-3xl font-bold mb-2"
              style={{
                color: "#ffffff",
                textShadow:
                  "0 0 16px oklch(0.78 0.2 195 / 0.8), 0 1px 0 oklch(0.3 0.12 220), 0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Victory!
            </h1>
            <h2
              className="font-cinzel font-bold text-xl mb-3"
              style={{ color: "#ffffff" }}
            >
              {info.title}
            </h2>
          </div>

          {/* Reward */}
          <div
            className="rounded-sm px-6 py-4 mb-6"
            style={{
              background: "oklch(0.20 0.08 225)",
              border: "1px solid oklch(0.55 0.18 195 / 0.5)",
            }}
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield size={20} style={{ color: "#ffffff" }} />
              <span
                className="font-cinzel font-bold text-lg"
                style={{ color: "#ffffff" }}
              >
                {info.reward}
              </span>
              <Shield size={20} style={{ color: "#ffffff" }} />
            </div>
            <p
              className="font-im-fell italic text-sm"
              style={{ color: "#ffffff" }}
            >
              {info.flavor}
            </p>
          </div>

          {/* Score */}
          <div className="mb-8">
            <p
              className="font-cinzel text-sm uppercase tracking-widest mb-2"
              style={{ color: "#ffffff" }}
            >
              Your Score
            </p>
            <div
              className="zelda-heading-gold font-cinzel-decorative text-5xl font-bold"
              style={{ color: "#ffffff" }}
            >
              {score}{" "}
              <span
                className="text-2xl opacity-80"
                style={{ color: "#ffffff" }}
              >
                / 10
              </span>
            </div>
            <div className="flex justify-center gap-1 mt-3">
              {Array.from({ length: 10 }, (_, idx) => idx).map((slot) => (
                <div
                  key={`dot-slot-${slot}`}
                  className="w-5 h-5 rounded-sm"
                  style={{
                    background:
                      slot < score
                        ? "oklch(0.55 0.18 155)"
                        : "oklch(0.25 0.06 225)",
                    border: `1px solid ${slot < score ? "oklch(0.62 0.18 152 / 0.6)" : "oklch(0.40 0.08 220 / 0.4)"}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!isLastLevel ? (
              <button
                type="button"
                onClick={() =>
                  navigate({
                    to: "/level/$levelId",
                    params: { levelId: String(level + 1) },
                  })
                }
                className="zelda-btn zelda-btn-green px-8 py-3 text-base font-cinzel font-bold"
              >
                🌊 Continue to Level {level + 1}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="zelda-btn zelda-btn-green px-8 py-3 text-base font-cinzel font-bold"
              >
                🏆 You Are a Legend!
              </button>
            )}
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
        <p className="font-im-fell text-sm" style={{ color: "#ffffff" }}>
          © {new Date().getFullYear()} Quest of Numbers &nbsp;·&nbsp; Built with{" "}
          <span style={{ color: "#ff6b6b" }}>♥</span> using{" "}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || "quest-of-numbers")}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#ffffff" }}
            className="underline underline-offset-2 hover:opacity-80"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
