import { useNavigate } from "@tanstack/react-router";
import { Lock, Star, Waves } from "lucide-react";
import React from "react";
import { ZeldaPanel } from "../components/ZeldaPanel";
import { useGetUnlockedLevels } from "../hooks/useQueries";

const LEVEL_INFO = [
  {
    level: 1,
    name: "The Coral Reef",
    desc: "Single-digit multiplication",
    flavor: "Dive into the shallows and prove your worth!",
  },
  {
    level: 2,
    name: "The Kelp Forest",
    desc: "Times tables up to 12",
    flavor: "The ancient sea spirits await a true scholar!",
  },
  {
    level: 3,
    name: "The Sunken Temple",
    desc: "Two-digit × single-digit",
    flavor: "Brave the depths, young ocean hero!",
  },
  {
    level: 4,
    name: "The Abyssal Caverns",
    desc: "Two-digit × two-digit",
    flavor: "Only the wisest navigator can find the way!",
  },
  {
    level: 5,
    name: "The Sacred Depths",
    desc: "Master-level multiplication",
    flavor: "Face the ultimate ocean math challenge!",
  },
];

export function Home() {
  const navigate = useNavigate();
  const { data: unlockedLevel, isLoading } = useGetUnlockedLevels();

  const maxUnlocked = Number(unlockedLevel ?? BigInt(1));

  const handleLevelClick = (level: number) => {
    if (level <= maxUnlocked) {
      navigate({ to: "/level/$levelId", params: { levelId: String(level) } });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.28 0.12 215) 0%, oklch(0.20 0.10 225) 40%, oklch(0.12 0.07 235) 100%)",
      }}
    >
      {/* Twinkling stars / bubbles background effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }, (_, idx) => idx).map((slot) => (
          <div
            key={`particle-slot-${slot}`}
            className="absolute rounded-full animate-twinkle"
            style={{
              width: `${(slot % 3) + 1}px`,
              height: `${(slot % 3) + 1}px`,
              top: `${(slot * 7 + 13) % 100}%`,
              left: `${(slot * 11 + 7) % 100}%`,
              animationDelay: `${(slot * 0.3) % 3}s`,
              background:
                slot % 3 === 0
                  ? "oklch(0.70 0.20 192)"
                  : slot % 3 === 1
                    ? "oklch(0.85 0.04 210)"
                    : "oklch(0.62 0.18 152)",
            }}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        {/* Title Banner */}
        <div className="text-center mb-8 animate-fade-in-scale">
          <div className="flex items-center justify-center gap-4 mb-2">
            <h1
              className="font-cinzel-decorative text-4xl md:text-5xl font-bold"
              style={{
                color: "#ffffff",
                textShadow:
                  "0 0 16px oklch(0.78 0.2 195 / 0.8), 0 1px 0 oklch(0.3 0.12 220), 0 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              Quest of Numbers
            </h1>
          </div>
          <p
            className="font-im-fell text-lg italic"
            style={{ color: "#ffffff" }}
          >
            Prove your multiplication mastery across 5 epic ocean levels!
          </p>
        </div>

        {/* Level Cards */}
        <div className="w-full max-w-2xl mb-8">
          <div className="grid gap-4">
            {LEVEL_INFO.map(({ level, name, desc, flavor }) => {
              const isUnlocked = level <= maxUnlocked;
              return (
                <button
                  key={level}
                  type="button"
                  tabIndex={isUnlocked ? 0 : -1}
                  onClick={() => handleLevelClick(level)}
                  className={`
                    zelda-panel p-5 flex items-center gap-5 transition-all duration-200 w-full text-left
                    ${
                      isUnlocked
                        ? "cursor-pointer hover:scale-[1.02] animate-pulse-gold"
                        : "level-locked cursor-not-allowed"
                    }
                  `}
                >
                  {/* Level Icon */}
                  <div
                    className={`
                      w-14 h-14 rounded-sm flex items-center justify-center shrink-0
                      border-2
                    `}
                    style={{
                      borderColor: isUnlocked
                        ? "oklch(0.55 0.18 195)"
                        : "oklch(0.45 0.08 220 / 0.5)",
                      background: isUnlocked
                        ? "oklch(0.30 0.14 195 / 0.6)"
                        : "oklch(0.25 0.06 220 / 0.3)",
                      color: isUnlocked
                        ? "oklch(0.70 0.20 192)"
                        : "oklch(0.50 0.06 220 / 0.5)",
                    }}
                  >
                    {isUnlocked ? <Waves size={28} /> : <Lock size={24} />}
                  </div>

                  {/* Level Info */}
                  <div className="flex-1" style={{ color: "#ffffff" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-cinzel font-bold text-xs uppercase tracking-widest"
                        style={{ color: "#ffffff" }}
                      >
                        Level {level}
                      </span>
                      {isUnlocked && (
                        <span className="flex gap-0.5">
                          {Array.from({ length: level }, (_, idx) => idx).map(
                            (slot) => (
                              <Star
                                key={`star-${level}-slot-${slot}`}
                                size={10}
                                className="animate-shimmer"
                                style={{
                                  color: "#ffffff",
                                  fill: "#ffffff",
                                  animationDelay: `${slot * 0.2}s`,
                                }}
                              />
                            ),
                          )}
                        </span>
                      )}
                    </div>
                    <h3
                      className="font-cinzel font-bold text-lg"
                      style={{
                        color: "#ffffff",
                        textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                      }}
                    >
                      {name}
                    </h3>
                    <p
                      className="font-im-fell text-sm"
                      style={{ color: "#ffffff" }}
                    >
                      {desc}
                    </p>
                    <p
                      className="font-im-fell text-xs italic mt-1"
                      style={{ color: "#ffffff" }}
                    >
                      {flavor}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    {isUnlocked ? (
                      <span className="zelda-btn px-3 py-1 text-xs font-cinzel font-bold">
                        Enter
                      </span>
                    ) : (
                      <span
                        className="font-cinzel text-xs font-bold"
                        style={{ color: "#ffffff" }}
                      >
                        Locked
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Begin Quest Button */}
        <button
          type="button"
          onClick={() =>
            navigate({ to: "/level/$levelId", params: { levelId: "1" } })
          }
          className="zelda-btn zelda-btn-green px-12 py-4 text-xl font-cinzel font-bold tracking-wider"
          disabled={isLoading}
        >
          🌊 Begin Quest 🌊
        </button>

        {isLoading && (
          <p
            className="font-im-fell mt-4 italic animate-pulse"
            style={{ color: "#ffffff" }}
          >
            Loading your progress...
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 px-4">
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
