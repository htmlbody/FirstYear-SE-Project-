'use client';

import { useEffect, useRef, useState } from 'react';

function EarthyBackgroundLayer({ theme, active }) {
  const canvasRef = useRef(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        setOpacity(1);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setOpacity(0);
    }
  }, [active]);

  // We dynamicize base colors based on theme prop: default (terracotta/chocolate/marigold), blue (boy), pink (girl)
  let bgBaseColor = '#FAF5F2';
  let gridLineColor = 'rgba(143, 35, 24, 0.012)';

  if (theme === 'blue') {
    bgBaseColor = '#F0F9FF';
    gridLineColor = 'rgba(59, 130, 246, 0.012)';
  } else if (theme === 'pink') {
    bgBaseColor = '#FFF1F2';
    gridLineColor = 'rgba(244, 63, 94, 0.012)';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // 1. Draw solid base color background
      ctx.fillStyle = bgBaseColor;
      ctx.fillRect(0, 0, width, height);

      // 2. Render waves based on theme selector
      let waves = [];
      if (theme === 'blue') {
        waves = [
          {
            yBase: height * 0.18,
            amplitude: height * 0.16,
            frequency: 0.0012,
            speed: 0.0003,
            colorStart: 'rgba(185, 241, 222, 0.22)',  // Mint
            colorEnd: 'rgba(204, 231, 255, 0.32)',    // Soft blue
            phase: 0
          },
          {
            yBase: height * 0.44,
            amplitude: height * 0.22,
            frequency: 0.0009,
            speed: -0.0002,
            colorStart: 'rgba(204, 231, 255, 0.24)',  // Soft blue
            colorEnd: 'rgba(163, 203, 239, 0.18)',    // Cornflower
            phase: Math.PI / 3
          },
          {
            yBase: height * 0.68,
            amplitude: height * 0.2,
            frequency: 0.0014,
            speed: 0.00015,
            colorStart: 'rgba(163, 203, 239, 0.26)',  // Cornflower
            colorEnd: 'rgba(199, 210, 254, 0.35)',    // Lavender Indigo
            phase: Math.PI * 1.5
          },
          {
            yBase: height * 0.88,
            amplitude: height * 0.15,
            frequency: 0.0016,
            speed: -0.00025,
            colorStart: 'rgba(199, 210, 254, 0.2)',   // Lavender Indigo
            colorEnd: 'rgba(204, 231, 255, 0.15)',    // Soft blue
            phase: Math.PI * 0.8
          }
        ];
      } else if (theme === 'pink') {
        waves = [
          {
            yBase: height * 0.18,
            amplitude: height * 0.16,
            frequency: 0.0012,
            speed: 0.0003,
            colorStart: 'rgba(255, 163, 163, 0.22)',  // Soft Rose
            colorEnd: 'rgba(255, 204, 163, 0.32)',    // Soft Peach
            phase: 0
          },
          {
            yBase: height * 0.44,
            amplitude: height * 0.22,
            frequency: 0.0009,
            speed: -0.0002,
            colorStart: 'rgba(255, 204, 163, 0.24)',  // Soft Peach
            colorEnd: 'rgba(255, 194, 209, 0.18)',    // Sunset Rose
            phase: Math.PI / 3
          },
          {
            yBase: height * 0.68,
            amplitude: height * 0.2,
            frequency: 0.0014,
            speed: 0.00015,
            colorStart: 'rgba(255, 194, 209, 0.26)',  // Sunset Rose
            colorEnd: 'rgba(255, 228, 230, 0.35)',    // Soft Blush
            phase: Math.PI * 1.5
          },
          {
            yBase: height * 0.88,
            amplitude: height * 0.15,
            frequency: 0.0016,
            speed: -0.00025,
            colorStart: 'rgba(255, 228, 230, 0.2)',   // Soft Blush
            colorEnd: 'rgba(255, 163, 163, 0.15)',    // Soft Rose
            phase: Math.PI * 0.8
          }
        ];
      } else {
        waves = [
          {
            yBase: height * 0.18,
            amplitude: height * 0.16,
            frequency: 0.0012,
            speed: 0.0003,
            colorStart: 'rgba(74, 30, 26, 0.22)',   // Deep Chocolate
            colorEnd: 'rgba(143, 35, 24, 0.32)',     // Terracotta
            phase: 0
          },
          {
            yBase: height * 0.44,
            amplitude: height * 0.22,
            frequency: 0.0009,
            speed: -0.0002,
            colorStart: 'rgba(233, 136, 79, 0.24)',  // Marigold Amber
            colorEnd: 'rgba(189, 90, 78, 0.18)',     // Dusty Rust Rose
            phase: Math.PI / 3
          },
          {
            yBase: height * 0.68,
            amplitude: height * 0.2,
            frequency: 0.0014,
            speed: 0.00015,
            colorStart: 'rgba(189, 90, 78, 0.26)',   // Dusty Rust Rose
            colorEnd: 'rgba(254, 239, 230, 0.35)',   // Pale Sand Peak
            phase: Math.PI * 1.5
          },
          {
            yBase: height * 0.88,
            amplitude: height * 0.15,
            frequency: 0.0016,
            speed: -0.00025,
            colorStart: 'rgba(143, 35, 24, 0.2)',    // Terracotta
            colorEnd: 'rgba(74, 30, 26, 0.15)',      // Deep Chocolate
            phase: Math.PI * 0.8
          }
        ];
      }

      waves.forEach((wave) => {
        ctx.beginPath();
        const currentPhase = time * wave.speed + wave.phase;

        ctx.moveTo(0, height);
        ctx.lineTo(0, wave.yBase + Math.sin(currentPhase) * wave.amplitude);

        for (let x = 0; x <= width; x += 15) {
          const angle = x * wave.frequency + currentPhase;
          const y = wave.yBase + 
                    Math.sin(angle) * wave.amplitude + 
                    Math.cos(angle * 1.6) * (wave.amplitude * 0.25) +
                    Math.sin(angle * 0.70) * (wave.amplitude * 0.15);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, wave.yBase - wave.amplitude, width, wave.yBase + wave.amplitude);
        grad.addColorStop(0, wave.colorStart);
        grad.addColorStop(1, wave.colorEnd);
        
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 3. Render drifting organic light fields
      let streaks = [];
      if (theme === 'blue') {
        streaks = [
          { x: width * 0.25 + Math.cos(time * 0.00010) * 120, y: height * 0.35 + Math.sin(time * 0.00015) * 90, r: 220, c: 'rgba(96, 165, 250, 0.18)' },
          { x: width * 0.72 + Math.sin(time * 0.00018) * 150, y: height * 0.48 + Math.cos(time * 0.00012) * 110, r: 260, c: 'rgba(59, 130, 246, 0.15)' },
          { x: width * 0.45 + Math.cos(time * 0.00015) * 180, y: height * 0.80 + Math.sin(time * 0.00008) * 130, r: 240, c: 'rgba(147, 197, 253, 0.12)' }
        ];
      } else if (theme === 'pink') {
        streaks = [
          { x: width * 0.25 + Math.cos(time * 0.00010) * 120, y: height * 0.35 + Math.sin(time * 0.00015) * 90, r: 220, c: 'rgba(248, 113, 113, 0.18)' },
          { x: width * 0.72 + Math.sin(time * 0.00018) * 150, y: height * 0.48 + Math.cos(time * 0.00012) * 110, r: 260, c: 'rgba(244, 63, 94, 0.15)' },
          { x: width * 0.45 + Math.cos(time * 0.00015) * 180, y: height * 0.80 + Math.sin(time * 0.00008) * 130, r: 240, c: 'rgba(251, 113, 133, 0.12)' }
        ];
      } else {
        streaks = [
          { x: width * 0.25 + Math.cos(time * 0.00010) * 120, y: height * 0.35 + Math.sin(time * 0.00015) * 90, r: 220, c: 'rgba(233, 136, 79, 0.18)' },
          { x: width * 0.72 + Math.sin(time * 0.00018) * 150, y: height * 0.48 + Math.cos(time * 0.00012) * 110, r: 260, c: 'rgba(189, 90, 78, 0.15)' },
          { x: width * 0.45 + Math.cos(time * 0.00015) * 180, y: height * 0.80 + Math.sin(time * 0.00008) * 130, r: 240, c: 'rgba(143, 35, 24, 0.12)' }
        ];
      }

      streaks.forEach(s => {
        ctx.beginPath();
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        g.addColorStop(0, s.c);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      time += 6; // slightly slower for high-end organic flow
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, bgBaseColor]);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      opacity: opacity,
      transition: 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
      pointerEvents: 'none'
    }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          filter: 'blur(80px) saturate(1.4)',
          transform: 'scale(1.15)',
          opacity: 0.95
        }}
      />
      {/* Subtle fine architectural mesh overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(${gridLineColor} 1px, transparent 1px), linear-gradient(90deg, ${gridLineColor} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        opacity: 0.7,
        mixBlendMode: 'overlay'
      }} />
    </div>
  );
}

export default function EarthyBackground({ theme = 'default' }) {
  const [layers, setLayers] = useState([{ id: theme, theme, active: true }]);

  useEffect(() => {
    // If theme changes, add a new active layer, and fade out the existing layer
    setLayers(prev => {
      // Deactivate all existing layers
      const updated = prev.map(l => ({ ...l, active: false }));
      // Append the new active layer
      return [...updated, { id: `${theme}-${Date.now()}`, theme, active: true }];
    });

    // Cleanup faded-out layers after transition completes (1.2s)
    const cleanup = setTimeout(() => {
      setLayers(prev => prev.filter(l => l.active));
    }, 1300);

    return () => clearTimeout(cleanup);
  }, [theme]);

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 1
    }}>
      {layers.map(layer => (
        <EarthyBackgroundLayer
          key={layer.id}
          theme={layer.theme}
          active={layer.active}
        />
      ))}
    </div>
  );
}
