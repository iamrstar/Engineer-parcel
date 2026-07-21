import React from 'react';

export default function AnimatedBox3D({ colorTheme = 'blue' }) {
  const getColors = () => {
    switch (colorTheme) {
      case 'orange':
        // Rich brown cardboard box — stands out on orange bg
        return {
          front: '#78350f',    // amber-900 (dark brown)
          right: '#92400e',    // amber-800
          left: '#451a03',     // amber-950 (deep shadow side)
          top: '#b45309',      // amber-700 (warm brown lid, matches body)
          back: '#451a03',     // amber-950
          bottom: '#1c0a00',   // near-black base
          edge: 'rgba(255,255,255,0.4)',  // white edge lines for visibility
          icon: '#fbbf24',     // amber-400 bright icon
          shadow: 'rgba(120,53,15,0.5)',
        };
      case 'black-orange':
        // Dark box with bright orange edges — premium contrast
        return {
          front: '#1e293b',    // slate-800
          right: '#0f172a',    // slate-900
          left: '#0f172a',     // slate-900
          top: '#f97316',      // orange-500 lid
          back: '#020617',     // slate-950
          bottom: '#020617',   // slate-950
          edge: 'rgba(249,115,22,0.7)',  // orange edge glow
          icon: '#fb923c',     // orange-400
          shadow: 'rgba(249,115,22,0.4)',
        };
      case 'blue':
      default:
        return {
          front: '#dbeafe',    // blue-100
          right: '#93c5fd',    // blue-300
          left: '#60a5fa',     // blue-400
          top: '#eff6ff',      // blue-50 for shine
          back: '#3b82f6',     // blue-500
          bottom: '#1e40af',   // blue-800
          edge: 'rgba(59,130,246,0.5)',
          icon: '#2563eb',     // blue-600
          shadow: 'rgba(59,130,246,0.3)',
        };
    }
  };

  const c = getColors();

  return (
    <div className="w-full h-28 mb-2 flex items-center justify-center" style={{ perspective: '600px' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rotateCube {
          0%   { transform: rotateX(-20deg) rotateY(-30deg); }
          25%  { transform: rotateX(-15deg) rotateY(60deg); }
          50%  { transform: rotateX(-20deg) rotateY(150deg); }
          75%  { transform: rotateX(-15deg) rotateY(240deg); }
          100% { transform: rotateX(-20deg) rotateY(330deg); }
        }
        .cube-preserve {
          transform-style: preserve-3d;
        }
        .cube-animate {
          animation: rotateCube 5s infinite ease-in-out;
        }
      `}} />
      <div 
        className="relative cube-preserve cube-animate" 
        style={{ width: '4.5rem', height: '4.5rem' }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', width: '4.5rem', height: '4.5rem',
          transform: 'translateZ(2.25rem)',
          background: c.front,
          border: `2px solid ${c.edge}`,
          borderRadius: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `inset 0 0 12px rgba(255,255,255,0.2), 0 0 8px ${c.shadow}`,
          overflow: 'hidden',
        }}>
          <img src="/logo.jpeg" alt="EP" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain', borderRadius: '4px' }} />
        </div>
        {/* Back */}
        <div style={{
          position: 'absolute', width: '4.5rem', height: '4.5rem',
          transform: 'rotateY(180deg) translateZ(2.25rem)',
          background: c.back,
          border: `2px solid ${c.edge}`,
          borderRadius: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `inset 0 0 12px rgba(255,255,255,0.1)`,
          overflow: 'hidden',
        }}>
          <img src="/logo.jpeg" alt="EP" style={{ width: '2rem', height: '2rem', objectFit: 'contain', borderRadius: '4px', opacity: 0.5 }} />
        </div>
        {/* Right */}
        <div style={{
          position: 'absolute', width: '4.5rem', height: '4.5rem',
          transform: 'rotateY(90deg) translateZ(2.25rem)',
          background: c.right,
          border: `2px solid ${c.edge}`,
          borderRadius: '4px',
          boxShadow: `inset 0 0 10px rgba(255,255,255,0.15)`,
        }} />
        {/* Left */}
        <div style={{
          position: 'absolute', width: '4.5rem', height: '4.5rem',
          transform: 'rotateY(-90deg) translateZ(2.25rem)',
          background: c.left,
          border: `2px solid ${c.edge}`,
          borderRadius: '4px',
          boxShadow: `inset 0 0 10px rgba(255,255,255,0.15)`,
        }} />
        {/* Top (lid) */}
        <div style={{
          position: 'absolute', width: '4.5rem', height: '4.5rem',
          transform: 'rotateX(90deg) translateZ(2.25rem)',
          background: c.top,
          border: `2px solid ${c.edge}`,
          borderRadius: '4px',
          boxShadow: `inset 0 0 15px rgba(255,255,255,0.3), 0 0 10px ${c.shadow}`,
        }}>
          {/* Tape line on top */}
          <div style={{
            position: 'absolute', top: '50%', left: '15%', right: '15%',
            height: '6px', marginTop: '-3px',
            background: c.edge,
            borderRadius: '3px',
            opacity: 0.7,
          }} />
        </div>
        {/* Bottom */}
        <div style={{
          position: 'absolute', width: '4.5rem', height: '4.5rem',
          transform: 'rotateX(-90deg) translateZ(2.25rem)',
          background: c.bottom,
          border: `2px solid ${c.edge}`,
          borderRadius: '4px',
        }} />
      </div>
    </div>
  );
}
