import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Sword, Lock, Star } from 'lucide-react';
import { ZeldaPanel } from '../components/ZeldaPanel';
import { useGetUnlockedLevels } from '../hooks/useQueries';

const LEVEL_INFO = [
  {
    level: 1,
    name: 'The Forest Trial',
    desc: 'Single-digit multiplication',
    flavor: 'Enter the Kokiri Forest and prove your worth!',
  },
  {
    level: 2,
    name: 'The Temple Challenge',
    desc: 'Times tables up to 12',
    flavor: 'The ancient temple awaits a true scholar!',
  },
  {
    level: 3,
    name: 'The Final Dungeon',
    desc: 'Two-digit multiplication',
    flavor: 'Only the mightiest hero can conquer this!',
  },
];

export function Home() {
  const navigate = useNavigate();
  const { data: unlockedLevel, isLoading } = useGetUnlockedLevels();

  const maxUnlocked = Number(unlockedLevel ?? BigInt(1));

  const handleLevelClick = (level: number) => {
    if (level <= maxUnlocked) {
      navigate({ to: '/level/$levelId', params: { levelId: String(level) } });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(180deg, oklch(0.25 0.09 148) 0%, oklch(0.18 0.07 145) 40%, oklch(0.12 0.05 140) 100%)',
      }}
    >
      {/* Stars background effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-zelda-gold opacity-30"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        {/* Title Banner */}
        <div className="text-center mb-8 animate-fade-in-scale">
          <img
            src="/assets/generated/title-banner.dim_800x200.png"
            alt="Quest of Numbers"
            className="w-full max-w-lg mx-auto mb-4"
            style={{ maxHeight: '160px', objectFit: 'contain' }}
          />
          <div className="flex items-center justify-center gap-4 mb-2">
            <img
              src="/assets/generated/triforce-icon.dim_128x128.png"
              alt="Triforce"
              className="w-12 h-12 object-contain"
            />
            <h1 className="zelda-heading-gold font-cinzel-decorative text-4xl md:text-5xl font-bold">
              Quest of Numbers
            </h1>
            <img
              src="/assets/generated/triforce-icon.dim_128x128.png"
              alt="Triforce"
              className="w-12 h-12 object-contain"
            />
          </div>
          <p className="font-im-fell text-zelda-gold text-lg italic opacity-90">
            Prove your multiplication mastery across 3 epic levels!
          </p>
        </div>

        {/* Level Cards */}
        <div className="w-full max-w-2xl mb-8">
          <div className="grid gap-4">
            {LEVEL_INFO.map(({ level, name, desc, flavor }) => {
              const isUnlocked = level <= maxUnlocked;
              return (
                <div
                  key={level}
                  onClick={() => handleLevelClick(level)}
                  className={`
                    zelda-panel p-5 flex items-center gap-5 transition-all duration-200
                    ${isUnlocked
                      ? 'cursor-pointer hover:scale-[1.02] animate-pulse-gold'
                      : 'level-locked cursor-not-allowed'
                    }
                  `}
                  style={
                    isUnlocked
                      ? {}
                      : { backgroundImage: "url('/assets/generated/parchment-bg.dim_800x600.png')" }
                  }
                >
                  {/* Level Icon */}
                  <div
                    className={`
                      w-14 h-14 rounded-sm flex items-center justify-center shrink-0
                      border-2 border-zelda-brown
                      ${isUnlocked
                        ? 'bg-zelda-green text-zelda-gold'
                        : 'bg-zelda-brown/30 text-zelda-brown/50'
                      }
                    `}
                  >
                    {isUnlocked ? (
                      <Sword size={28} />
                    ) : (
                      <Lock size={24} />
                    )}
                  </div>

                  {/* Level Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-cinzel font-bold text-xs opacity-60 uppercase tracking-widest">
                        Level {level}
                      </span>
                      {isUnlocked && (
                        <span className="flex gap-0.5">
                          {Array.from({ length: level }).map((_, i) => (
                            <Star key={i} size={10} className="text-zelda-gold fill-zelda-gold" />
                          ))}
                        </span>
                      )}
                    </div>
                    <h3 className="zelda-heading font-cinzel font-bold text-lg">{name}</h3>
                    <p className="font-im-fell text-sm opacity-70">{desc}</p>
                    <p className="font-im-fell text-xs italic opacity-50 mt-1">{flavor}</p>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    {isUnlocked ? (
                      <span className="zelda-btn px-3 py-1 text-xs font-cinzel font-bold">
                        Enter
                      </span>
                    ) : (
                      <span className="font-cinzel text-xs opacity-40 font-bold">Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Begin Quest Button */}
        <button
          onClick={() => navigate({ to: '/level/$levelId', params: { levelId: '1' } })}
          className="zelda-btn zelda-btn-green px-12 py-4 text-xl font-cinzel font-bold tracking-wider"
          disabled={isLoading}
        >
          ⚔ Begin Quest ⚔
        </button>

        {isLoading && (
          <p className="font-im-fell text-zelda-gold mt-4 italic opacity-70 animate-pulse">
            Loading your progress...
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 px-4">
        <p className="font-im-fell text-zelda-gold/50 text-sm">
          © {new Date().getFullYear()} Quest of Numbers &nbsp;·&nbsp; Built with{' '}
          <span className="text-zelda-red">♥</span> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'quest-of-numbers')}`}
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
