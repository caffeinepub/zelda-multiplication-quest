import React from 'react';

interface ZeldaPanelProps {
  children: React.ReactNode;
  className?: string;
  noBg?: boolean;
}

export function ZeldaPanel({ children, className = '', noBg = false }: ZeldaPanelProps) {
  return (
    <div
      className={`zelda-panel relative ${noBg ? '' : ''} ${className}`}
      style={
        noBg
          ? {}
          : {
              backgroundImage: "url('/assets/generated/parchment-bg.dim_800x600.png')",
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }
      }
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
