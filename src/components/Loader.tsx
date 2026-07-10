import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

type LoaderProps = {
  onComplete: () => void;
};

const lines = [
  { lead: 'Train', rest: 'Together.' },
  { lead: 'Grow', rest: 'Together.' },
  { lead: 'Win', rest: 'Together.' },
];

const Loader = ({ onComplete }: LoaderProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || done) return;

    const finish = () => {
      setDone(true);
      onComplete();
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = window.setTimeout(finish, 500);
      return () => window.clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      const lineEls = gsap.utils.toArray<HTMLElement>('.loader-line');
      const splits = lineEls.map((line) => SplitText.create(line, { type: 'words', mask: 'words' }));

      const tl = gsap.timeline({ onComplete: finish });

      tl.set('.loader-line', { opacity: 1 });

      tl.to(barFillRef.current, { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0);

      splits.forEach((split, index) => {
        tl.from(
          split.words,
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.55,
            ease: 'expo.out',
            stagger: 0.035,
          },
          index === 0 ? 0.1 : '+=0.05'
        );
      });

      tl.to(
        lineEls,
        {
          yPercent: -110,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.in',
          stagger: 0.05,
        },
        '+=0.2'
      );

      tl.to(
        '.loader-mark, .loader-bar',
        { opacity: 0, duration: 0.3 },
        '<'
      );

      tl.to(
        root,
        {
          yPercent: -100,
          duration: 0.7,
          ease: 'power4.inOut',
        },
        '-=0.1'
      );
    }, root);

    return () => ctx.revert();
  }, [done, onComplete]);

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader-inner">
        <span className="loader-mark">TIBIN</span>
        <div className="loader-lines">
          {lines.map((line) => (
            <span className="loader-line" key={line.lead}>
              <span className="loader-lead">{line.lead}</span> {line.rest}
            </span>
          ))}
        </div>
      </div>
      <div className="loader-bar">
        <span className="loader-bar-fill" ref={barFillRef}></span>
      </div>
    </div>
  );
};

export default Loader;
