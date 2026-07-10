import { useEffect, useRef } from 'react';
import client1 from '../assets/CLIENT1.webp';
import client2 from '../assets/CLIENT2.webp';
import client3 from '../assets/CLIENT3.webp';

type Transformation = {
  client: string;
  result: string;
  details: string;
};

type TransformationsSectionProps = {
  transformations: Transformation[];
};

const clientPhotos = [client1, client2, client3];

const parseResult = (result: string) => {
  const match = result.match(/^(\d+)\s*(.*)$/);
  if (!match) return { value: result, unit: '' };
  return { value: match[1], unit: match[2] };
};

const TransformationsSection = ({ transformations }: TransformationsSectionProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    const cards = Array.from(slider.querySelectorAll<HTMLElement>('.proof-card'));
    const maxTilt = 9;
    const state = cards.map(() => ({ targetX: 0, targetY: 0, x: 0, y: 0 }));
    const cleanups: Array<() => void> = [];

    cards.forEach((card, index) => {
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        state[index].targetX = px * maxTilt * 2;
        state[index].targetY = -py * maxTilt * 2;
      };
      const onLeave = () => {
        state[index].targetX = 0;
        state[index].targetY = 0;
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    let frame: number;
    const tick = () => {
      cards.forEach((card, index) => {
        const s = state[index];
        s.x += (s.targetX - s.x) * 0.12;
        s.y += (s.targetY - s.y) * 0.12;
        card.style.setProperty('--rx', `${s.x.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${s.y.toFixed(2)}deg`);
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      cleanups.forEach((off) => off());
    };
  }, [transformations]);

  return (
    <section className="section transformations-section" id="transformations">
      <div className="container section-header reveal">
        <span className="eyebrow">Transformations</span>
        <h2>Proof in the progress.</h2>
      </div>
      <div className="container transformation-slider reveal" ref={sliderRef}>
        {transformations.map((item, index) => {
          const stat = parseResult(item.result);
          return (
            <article key={item.client} className="proof-card">
              <span className="proof-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="proof-shadow"></div>
              <img
                className="proof-photo"
                src={clientPhotos[index % clientPhotos.length]}
                alt={`${item.client}, Tibin Fitness client`}
                loading="lazy"
              />
              <div className="proof-scrim"></div>
              <div className="proof-frame"></div>
              <div className="proof-body">
                <p className="proof-label">Client</p>
                <h3 className="proof-name">{item.client}</h3>
                <div className="proof-stat">
                  <span className="proof-stat-number">{stat.value}</span>
                  <span className="proof-stat-unit">{stat.unit}</span>
                </div>
                <p className="proof-details">{item.details}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TransformationsSection;
