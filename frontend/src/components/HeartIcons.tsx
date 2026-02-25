import React from 'react';
import { Heart } from 'lucide-react';

interface HeartIconsProps {
  total: number;
  filled: number;
}

export function HeartIcons({ total, filled }: HeartIconsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <Heart
          key={i}
          size={28}
          className={i < filled ? 'heart-full' : 'heart-empty'}
          fill={i < filled ? 'currentColor' : 'none'}
          strokeWidth={i < filled ? 0 : 1.5}
        />
      ))}
    </div>
  );
}
