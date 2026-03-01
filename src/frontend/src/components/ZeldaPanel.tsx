import type React from "react";

interface ZeldaPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function ZeldaPanel({ children, className = "" }: ZeldaPanelProps) {
  return (
    <div
      className={`zelda-panel relative ${className}`}
      style={{ backgroundColor: "oklch(0.16 0.09 228)" }}
    >
      {/* Corner decorations */}
      <span className="zelda-corner zelda-corner-tl" />
      <span className="zelda-corner zelda-corner-tr" />
      <span className="zelda-corner zelda-corner-bl" />
      <span className="zelda-corner zelda-corner-br" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
