'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

// An energy transfer station as a 3D wireframe in red line. The section
// holds while the model draws itself in, turns, and pulls apart into its
// parts; each part is labelled in plain words. three.js is loaded only when
// this section is reached.

const RED = 0xe5322d;

type GroupKey = 'primary' | 'valve' | 'meter' | 'hx' | 'secondary' | 'skid';

// How far each group travels when the model pulls apart (x, y, z)
const SPREAD: Record<GroupKey, [number, number, number]> = {
  primary: [-0.95, 0.12, 0],
  valve: [-0.15, 0.62, 0.35],
  meter: [-0.1, 0.78, 0],
  hx: [0, 0, 0],
  secondary: [0.95, 0.12, 0],
  skid: [0, -0.75, 0],
};

// Labelled points, in the local space of the group they belong to
const PARTS: { key: string; num: number; group: GroupKey; at: [number, number, number]; flip?: boolean }[] = [
  { key: 'p1', num: 1, group: 'primary', at: [-3.9, 0.55, 0] },
  { key: 'p2', num: 2, group: 'primary', at: [-3.9, -0.55, 0] },
  { key: 'p3', num: 3, group: 'valve', at: [-1.9, -0.05, 0] },
  { key: 'p4', num: 4, group: 'hx', at: [0, 1.12, 0] },
  { key: 'p5', num: 5, group: 'meter', at: [-1.5, 1.28, 0] },
  { key: 'p6', num: 6, group: 'secondary', at: [3.9, 0.55, 0], flip: true },
  { key: 'p7', num: 7, group: 'secondary', at: [3.5, -0.3, 0], flip: true },
];

export default function EtsExploded() {
  const t = useTranslations('Ets');
  const reduceMotion = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  // Function pass-through keeps framer-motion computing scroll-linked values itself.
  const p = useTransform(raw, (v) => v);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // Kept non-null for the async three.js callback below, where TypeScript
    // no longer carries the check above
    const host: HTMLDivElement = stage;
    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed) return;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.localClippingEnabled = true;
      stage.prepend(renderer.domElement);
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
      // Draw-in: a plane sweeps left to right, revealing the lines behind it
      const sweep = new THREE.Plane(new THREE.Vector3(-1, 0, 0), -6);
      const material = new THREE.LineBasicMaterial({ color: RED, transparent: true, opacity: 0.92, clippingPlanes: [sweep] });

      const model = new THREE.Group();
      scene.add(model);
      const groups = {} as Record<GroupKey, InstanceType<typeof THREE.Group>>;
      (Object.keys(SPREAD) as GroupKey[]).forEach((k) => {
        groups[k] = new THREE.Group();
        model.add(groups[k]);
      });

      // --- geometry helpers: everything is drawn as line segments ---
      const segs = (pts: number[], g: GroupKey) => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        groups[g].add(new THREE.LineSegments(geo, material));
      };
      const box = (g: GroupKey, size: [number, number, number], at: [number, number, number]) => {
        const e = new THREE.EdgesGeometry(new THREE.BoxGeometry(...size));
        const l = new THREE.LineSegments(e, material);
        l.position.set(...at);
        groups[g].add(l);
      };
      // A pipe along X: lines running its length plus rings along it
      const pipe = (g: GroupKey, x1: number, x2: number, y: number, z: number, r: number) => {
        const pts: number[] = [];
        const n = 16;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          const yy = y + r * Math.cos(a), zz = z + r * Math.sin(a);
          pts.push(x1, yy, zz, x2, yy, zz);
        }
        const rings = Math.max(2, Math.round(Math.abs(x2 - x1) / 0.28));
        for (let k = 0; k <= rings; k++) {
          const x = x1 + ((x2 - x1) * k) / rings;
          for (let i = 0; i < n; i++) {
            const a1 = (i / n) * Math.PI * 2, a2 = ((i + 1) / n) * Math.PI * 2;
            pts.push(x, y + r * Math.cos(a1), z + r * Math.sin(a1), x, y + r * Math.cos(a2), z + r * Math.sin(a2));
          }
        }
        // Flanges at both ends
        [x1, x2].forEach((x) => {
          for (let i = 0; i < 24; i++) {
            const a1 = (i / 24) * Math.PI * 2, a2 = ((i + 1) / 24) * Math.PI * 2;
            pts.push(x, y + r * 1.45 * Math.cos(a1), z + r * 1.45 * Math.sin(a1), x, y + r * 1.45 * Math.cos(a2), z + r * 1.45 * Math.sin(a2));
          }
        });
        segs(pts, g);
      };
      // A circle in the given plane, used for valve bodies, wheels, the pump
      const ring = (g: GroupKey, x: number, y: number, z: number, r: number, plane: 'yz' | 'xz' | 'xy' = 'yz') => {
        const pts: number[] = [];
        for (let i = 0; i < 32; i++) {
          const a1 = (i / 32) * Math.PI * 2, a2 = ((i + 1) / 32) * Math.PI * 2;
          const p1 = [r * Math.cos(a1), r * Math.sin(a1)], p2 = [r * Math.cos(a2), r * Math.sin(a2)];
          if (plane === 'yz') pts.push(x, y + p1[0], z + p1[1], x, y + p2[0], z + p2[1]);
          if (plane === 'xz') pts.push(x + p1[0], y, z + p1[1], x + p2[0], y, z + p2[1]);
          if (plane === 'xy') pts.push(x + p1[0], y + p1[1], z, x + p2[0], y + p2[1], z);
        }
        segs(pts, g);
      };
      // Butterfly isolation valve: body rings, stem and handwheel
      const butterfly = (g: GroupKey, x: number, y: number) => {
        ring(g, x - 0.06, y, 0, 0.24);
        ring(g, x + 0.06, y, 0, 0.24);
        segs([x, y + 0.24, 0, x, y + 0.6, 0], g);
        ring(g, x, y + 0.6, 0, 0.2, 'xz');
        segs([x - 0.2, y + 0.6, 0, x + 0.2, y + 0.6, 0, x, y + 0.6, -0.2, x, y + 0.6, 0.2], g);
      };

      // --- heat exchanger: frame, plates, bars, nozzles ---
      box('hx', [0.14, 2.1, 1.15], [-0.78, 0, 0]);
      box('hx', [0.14, 2.1, 1.15], [0.78, 0, 0]);
      for (let i = 0; i < 20; i++) box('hx', [0.025, 1.86, 1.0], [-0.62 + i * 0.065, 0, 0]);
      box('hx', [1.95, 0.07, 0.07], [0, 1.1, 0]);
      box('hx', [1.95, 0.07, 0.07], [0, -1.1, 0]);
      [-0.45, 0.45].forEach((z) => segs([-0.86, 0.95, z, 0.86, 0.95, z, -0.86, -0.95, z, 0.86, -0.95, z], 'hx'));
      pipe('hx', -1.05, -0.85, 0.55, 0, 0.13);
      pipe('hx', -1.05, -0.85, -0.55, 0, 0.13);
      pipe('hx', 0.85, 1.05, 0.55, 0, 0.13);
      pipe('hx', 0.85, 1.05, -0.55, 0, 0.13);

      // --- network side: supply and return, isolation valves, strainer ---
      pipe('primary', -4.2, -1.08, 0.55, 0, 0.13);
      pipe('primary', -4.2, -1.08, -0.55, 0, 0.13);
      butterfly('primary', -3.5, 0.55);
      butterfly('primary', -3.5, -0.55);
      segs([-2.85, 0.42, 0, -2.6, -0.02, 0, -2.75, 0.42, 0, -2.5, -0.02, 0, -2.66, -0.06, 0, -2.44, -0.06, 0], 'primary');

      // --- control valve and actuator on the return ---
      box('valve', [0.34, 0.34, 0.34], [-1.9, -0.55, 0]);
      segs([-2.07, -0.38, 0, -1.73, -0.72, 0, -2.07, -0.72, 0, -1.73, -0.38, 0], 'valve');
      segs([-1.9, -0.38, 0, -1.9, -0.18, 0], 'valve');
      box('valve', [0.34, 0.36, 0.3], [-1.9, 0.0, 0]);

      // --- energy meter: flow spool on the supply, calculator above ---
      box('meter', [0.4, 0.36, 0.36], [-1.5, 0.55, 0]);
      segs([-1.5, 0.73, 0, -1.5, 0.95, 0], 'meter');
      box('meter', [0.5, 0.36, 0.14], [-1.5, 1.12, 0]);
      segs([-1.68, 1.18, 0.07, -1.32, 1.18, 0.07, -1.68, 1.08, 0.07, -1.45, 1.08, 0.07], 'meter');

      // --- building side: pipes, circulation pump, isolation valves ---
      pipe('secondary', 1.08, 4.2, 0.55, 0, 0.13);
      pipe('secondary', 1.08, 4.2, -0.55, 0, 0.13);
      ring('secondary', 2.3, -0.55, 0, 0.36, 'xy');
      ring('secondary', 2.3, -0.55, 0.18, 0.36, 'xy');
      ring('secondary', 2.3, -0.55, -0.18, 0.36, 'xy');
      box('secondary', [0.4, 0.5, 0.4], [2.3, 0.05, 0]);
      butterfly('secondary', 3.5, 0.55);
      butterfly('secondary', 3.5, -0.55);

      // --- base frame ---
      [-0.55, 0.55].forEach((z) => box('skid', [8.6, 0.14, 0.14], [0, -1.35, z]));
      [-4.1, -2.05, 0, 2.05, 4.1].forEach((x) => box('skid', [0.14, 0.14, 1.24], [x, -1.35, 0]));
      [-4.1, 4.1].forEach((x) => [-0.55, 0.55].forEach((z) => box('skid', [0.1, 0.3, 0.1], [x, -1.57, z])));

      const tmp = new THREE.Vector3();

      const resize = () => {
        const w = host.clientWidth, h = host.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Keep the whole model (about 9.8 units wide) in frame at any width
        const fit = 9.8 / (2 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect);
        camera.position.set(0, 1.9, Math.max(11.5, fit));
        camera.lookAt(0, -0.1, 0);
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);

      let raf = 0;
      let visible = false;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(frame);
      });
      io.observe(stage);

      function frame() {
        raf = 0;
        if (!visible) return;
        const v = p.get();
        const draw = reduceMotion ? 1 : Math.min(1, v / 0.28);
        const apart = reduceMotion ? 1 : Math.max(0, Math.min(1, (v - 0.32) / 0.3));
        const ease = apart < 0.5 ? 2 * apart * apart : 1 - Math.pow(-2 * apart + 2, 2) / 2;
        sweep.constant = -5 + draw * 10.5;
        model.rotation.y = reduceMotion ? -0.25 : -0.55 + v * 0.75;
        model.rotation.x = 0.1;
        (Object.keys(SPREAD) as GroupKey[]).forEach((k) => {
          const [x, y, z] = SPREAD[k];
          groups[k].position.set(x * ease, y * ease, z * ease);
        });
        renderer.render(scene, camera);

        // Labels follow their parts on screen
        const w = host.clientWidth, h = host.clientHeight;
        PARTS.forEach((part, i) => {
          const el = labelRefs.current[i];
          if (!el) return;
          tmp.set(...part.at);
          groups[part.group].localToWorld(tmp);
          tmp.project(camera);
          const x = (tmp.x * 0.5 + 0.5) * w, y = (-tmp.y * 0.5 + 0.5) * h;
          const start = 0.5 + i * 0.045;
          const show = reduceMotion ? 1 : Math.max(0, Math.min(1, (v - start) / 0.06));
          el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
          el.style.opacity = String(show);
        });
        raf = requestAnimationFrame(frame);
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('resize', resize);
        renderer.dispose();
        material.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [p, reduceMotion]);

  return (
    <section data-section="ets" aria-labelledby="ets-heading" className="bg-[#0b0b0c] text-white">
      <div ref={ref} className="relative" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col px-[22px] md:px-8 pt-24 md:pt-28 pb-8">
          <div className="grid lg:grid-cols-12 gap-x-6 gap-y-4 items-end">
            <h2 id="ets-heading" className="lg:col-span-6 text-[34px] md:text-[56px] leading-[1] font-medium tracking-[-0.01em] text-balance">
              {t('headline')}
            </h2>
            <p className="lg:col-span-5 lg:col-start-8 text-base md:text-lg leading-relaxed text-white/70 max-w-[46ch]">{t('intro')}</p>
          </div>

          <div ref={stageRef} className="relative flex-1 min-h-0 mt-4" role="img" aria-label={t('drawingLabel')}>
            {PARTS.map((part, i) => (
              <div
                key={part.key}
                ref={(el) => { labelRefs.current[i] = el; }}
                className="absolute left-0 top-0 pointer-events-none"
                style={{ opacity: 0 }}
              >
                <span className="absolute -left-[9px] -top-[9px] w-[18px] h-[18px] rounded-full bg-white text-[#0b0b0c] text-[11px] font-semibold flex items-center justify-center tabular-nums">
                  {part.num}
                </span>
                <span className={`hidden lg:block absolute -top-[34px] whitespace-nowrap bg-[#0b0b0c]/80 px-2 py-1 ${part.flip ? 'right-4 text-right' : 'left-4'}`}>
                  <span className="block text-[15px] font-medium text-white">{t(`${part.key}Title`)}</span>
                  <span className="block text-[13px] text-white/60">{t(`${part.key}Text`)}</span>
                </span>
              </div>
            ))}
          </div>

          {/* On phones the labels read as a numbered key under the model */}
          <ol className="lg:hidden mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] leading-snug">
            {PARTS.map((part) => (
              <li key={part.key} className="flex gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-white text-[#0b0b0c] text-[11px] font-semibold flex items-center justify-center tabular-nums">{part.num}</span>
                <span>
                  <span className="text-white">{t(`${part.key}Title`)}</span>
                  <span className="text-white/55"> · {t(`${part.key}Text`)}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
