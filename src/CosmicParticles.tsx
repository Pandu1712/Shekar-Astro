import { useMemo } from 'react';

type Particle = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  drift: string;
};

export default function CosmicParticles({ count = 40 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 6 + 6}s`,
      drift: `${(Math.random() - 0.5) * 60}px`,
    }));
  }, [count]);

  return (
    <div className="cosmic-particles" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--drift': p.drift,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
