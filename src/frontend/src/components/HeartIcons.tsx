import { Heart } from "lucide-react";
import React from "react";

interface HeartIconsProps {
  total: number;
  filled: number;
}

export function HeartIcons({ total, filled }: HeartIconsProps) {
  const slots = Array.from({ length: total }, (_, idx) => idx);
  return (
    <div className="flex items-center gap-1">
      {slots.map((slot) => (
        <Heart
          key={`heart-slot-${slot}`}
          size={28}
          className={slot < filled ? "heart-full" : "heart-empty"}
          fill={slot < filled ? "currentColor" : "none"}
          strokeWidth={slot < filled ? 0 : 1.5}
        />
      ))}
    </div>
  );
}
