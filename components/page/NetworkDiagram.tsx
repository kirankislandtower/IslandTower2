'use client';

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Labels = { plant: string; mains: string; ets: string; buildings: string };

// Seeded random numbers (mulberry32), so the network is the same on every
// visit: generated once from the seed, not redrawn by hand.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 640;
const H = 360;

// A district cooling network as a still diagram: the central plant on the
// left, the chilled water main running straight across from it, branches
// leaving it alternately up and down at seeded intervals, an energy
// transfer station (ETS) where each branch meets its building, the
// buildings of seeded heights. Lines draw in once when it comes into view.
function build(seed: number) {
  const r = rng(seed);
  const plant = { x: 56, y: H / 2 };
  const startX = plant.x + 34;
  const endX = W - 24;
  const main: [number, number][] = [[startX, plant.y], [endX, plant.y]];
  const count = 7;
  const step = (endX - startX - 60) / count;
  const branches: { from: [number, number]; to: [number, number]; ets: [number, number]; bw: number; bh: number }[] = [];
  for (let k = 0; k < count; k++) {
    const up = k % 2 === 0;
    const fx = startX + 60 + k * step + (r() - 0.5) * step * 0.35;
    const len = 54 + r() * 40;
    const ty = up ? plant.y - len : plant.y + len;
    branches.push({
      from: [fx, plant.y],
      to: [fx, ty],
      ets: [fx, up ? ty + 14 : ty - 14],
      bw: 20 + Math.round(r() * 10),
      bh: 18 + Math.round(r() * 34),
    });
  }
  return { plant, main, branches };
}

export default function NetworkDiagram({ labels, seed = 2003 }: { labels: Labels; seed?: number }) {
  const reduce = useReducedMotion();
  const { plant, main, branches } = useMemo(() => build(seed), [seed]);
  const d = `M${main.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(' L')}`;
  const draw = (delay: number, dur = 1.2) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: '-15% 0px' },
          transition: { duration: dur, delay, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] },
        };
  const pop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.6 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true, margin: '-15% 0px' },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };
  const firstEts = branches[0];
  const lastB = branches[branches.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${labels.plant}, ${labels.mains}, ${labels.ets}, ${labels.buildings}`} direction="ltr">
      {/* Branches to the buildings */}
      {branches.map((b, i) => (
        <motion.path key={`b${i}`} d={`M${b.from[0]},${b.from[1]} L${b.to[0]},${b.to[1]}`} fill="none" stroke="#1a1a17" strokeOpacity={0.35} strokeWidth={1.4} {...draw(0.9 + i * 0.07, 0.6)} />
      ))}
      {/* The main */}
      <motion.path d={d} fill="none" stroke="#1a1a17" strokeWidth={3} strokeLinejoin="round" {...draw(0.15, 1.3)} />

      {/* ETS at each connection, a building at each branch end */}
      {branches.map((b, i) => (
        <g key={`n${i}`}>
          <motion.circle cx={b.ets[0]} cy={b.ets[1]} r={4.5} fill="#f4f3ea" stroke="#dc2626" strokeWidth={2} style={{ transformOrigin: `${b.ets[0]}px ${b.ets[1]}px` }} {...pop(1.3 + i * 0.07)} />
          <motion.rect x={b.to[0] - b.bw / 2} y={b.to[1] < H / 2 ? b.to[1] - b.bh : b.to[1]} width={b.bw} height={b.bh} rx={2} fill="#e6e8dd" stroke="#1a1a17" strokeOpacity={0.5} strokeWidth={1.2} style={{ transformOrigin: `${b.to[0]}px ${b.to[1]}px` }} {...pop(1.4 + i * 0.07)} />
        </g>
      ))}

      {/* The plant */}
      <motion.g style={{ transformOrigin: `${plant.x}px ${plant.y}px` }} {...pop(0)}>
        <rect x={plant.x - 34} y={plant.y - 30} width={68} height={60} rx={6} fill="#dc2626" />
        <path d={`M${plant.x - 14},${plant.y + 8} q7,-14 14,0 t14,0 M${plant.x - 14},${plant.y - 6} q7,-14 14,0 t14,0`} fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
      </motion.g>

      {/* Labels */}
      <g className="font-mono" fill="#1a1a17" fontSize={12} letterSpacing="0.06em">
        <motion.text x={plant.x - 34} y={plant.y + 52} {...pop(0.4)}>{labels.plant.toUpperCase()}</motion.text>
        <motion.text x={branches[0].from[0] + 14} y={plant.y + 20} fillOpacity={0.7} {...pop(1.1)}>{labels.mains.toUpperCase()}</motion.text>
        {firstEts && (
          <motion.text x={firstEts.ets[0] + 10} y={firstEts.ets[1] + 4} fill="#dc2626" {...pop(1.6)}>{labels.ets}</motion.text>
        )}
        {lastB && (
          <motion.text x={lastB.to[0] + lastB.bw / 2} y={lastB.to[1] < H / 2 ? lastB.to[1] - lastB.bh - 10 : lastB.to[1] + lastB.bh + 18} fillOpacity={0.7} textAnchor="end" {...pop(1.8)}>{labels.buildings.toUpperCase()}</motion.text>
        )}
      </g>
    </svg>
  );
}
