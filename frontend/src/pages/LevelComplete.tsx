import React from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { ZeldaPanel } from '../components/ZeldaPanel';
import { Star, Shield, Home } from 'lucide-react';

const VICTORY_MESSAGES: Record<number, { title: string; flavor: string; reward: string }> = {
  1: {
    title: 'The Forest Trial is Conquered!',
    flavor: 'The Great Deku Tree smiles upon you, young hero.',
    reward: 'You obtained the Forest Medallion!',
  },
  2: {
    title: 'The Temple Bows Before You!',
    flavor: 'The ancient spirits of the temple acknowledge your wisdom.',
    reward: 'You obtained the Fire Medallion!',
  },
  3: {
    title: 'The Final Dungeon Falls!',
    flavor: 'Hyrule is saved! Your mathematical might is legendary!',
    reward: 'You obtained the Triforce of Wisdom!',
  },
};

export function LevelComplete() {
  const navigate = useNavigate();
  const { level, score } = useSearch({ from: '/level-complete' });

  const info = VICTORY_MESSAGES[level] ?? VICTORY_MESSAGES[1];
  const isLastLevel = level >= 3;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{
        background: 'linear-gradient(180deg, oklch(0.25 0.09 148) 0%, oklch(0.18 0.07 145) 40%, oklch(0.12 0.05 140) 100%)',
      }}
    >
      <div className="w-full max-w-lg animate-fade-in-scale">
        {/* Triforce accent */}
        <div className="text-center mb-4">
          <img
            src="/assets/generated/triforce-icon.dim_128x128.png"
            alt="Triforce"
            className="w-20 h-20 object-contain mx-auto"
          />
        </div>

        <ZeldaPanel className="p-8 text-center">
          {/* Victory Header */}
          <div className="mb-6">
            <div className="flex justify-center gap-2 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="text-zelda-gold fill-zelda-gold"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <h1 className="zelda-heading-gold font-cinzel-decorative text-2xl md:text-3xl font-bold mb-2">
              Victory!
            </h1>
            <h2 className="zelda-heading font-cinzel font-bold text-xl mb-3">
              {info.title}
            </h2>
          </div>

          {/* Reward */}
          <div className="bg-zelda-parchment-dark border border-zelda-gold/50 rounded-sm px-6 py-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield size={20} className="text-zelda-gold" />
              <span className="font-cinzel font-bold text-zelda-gold text-lg">{info.reward}</span>
              <Shield size={20} className="text-zelda-gold" />
            </div>
            <p className="font-im-fell italic text-sm opacity-70">{info.flavor}</p>
          </div>

          {/* Score */}
          <div className="mb-8">
            <p className="font-cinzel text-sm opacity-60 uppercase tracking-widest mb-2">Your Score</p>
            <div className="zelda-heading-gold font-cinzel-decorative text-5xl font-bold">
              {score} <span className="text-2xl opacity-60">/ 10</span>
            </div>
            <div className="flex justify-center gap-1 mt-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-sm border border-zelda-brown/50 ${
                    i < score ? 'bg-zelda-green' : 'bg-zelda-brown/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {!isLastLevel ? (
              <button
                onClick={() => navigate({ to: '/level/$levelId', params: { levelId: String(level + 1) } })}
                className="zelda-btn zelda-btn-green px-8 py-3 text-base font-cinzel font-bold"
              >
                ⚔ Continue to Level {level + 1}
              </button>
            ) : (
              <button
                onClick={() => navigate({ to: '/' })}
                className="zelda-btn zelda-btn-green px-8 py-3 text-base font-cinzel font-bold"
              >
                🏆 You Are a Legend!
              </button>
            )}
            <button
              onClick={() => navigate({ to: '/' })}
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
