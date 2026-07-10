import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import AboutSection from './components/AboutSection';
import BmiSection from './components/BmiSection';
import BlogSection from './components/BlogSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InstagramSection from './components/InstagramSection';
import NutritionSection from './components/NutritionSection';
import PricingSection from './components/PricingSection';
import ServicesSection from './components/ServicesSection';
import StatsSection from './components/StatsSection';
import TestimonialsSection from './components/TestimonialsSection';
import TransformationsSection from './components/TransformationsSection';

const stats = [
  { label: 'Clients Trained', value: 500, suffix: '+' },
  { label: 'Experience', value: 10, suffix: '+ yrs' },
  { label: 'Success Rate', value: 98, suffix: '%' },
  { label: 'Training Sessions', value: 15000, suffix: '+' },
];

const services = [
  { name: 'Weight Loss Coaching', description: 'Lean, sustainable programs designed to help you lose weight confidently.' },
  { name: 'Muscle Building', description: 'Structured hypertrophy cycles that prioritize power, posture, and tone.' },
  { name: 'Strength Training', description: 'Performance training for athletes, professionals, and busy leaders.' },
  { name: 'Online Coaching', description: 'Remote coaching with daily accountability and direct support.' },
  { name: 'Nutrition Guidance', description: 'Simple meal strategies that complement your training and lifestyle.' },
  { name: 'HYROX & Hybrid Prep', description: 'Race-specific conditioning for HYROX and hybrid competitions.' },
];

const transformations = [
  { client: 'Maya', result: '18 lbs lost', details: '12 weeks of guided strength and nutrition.' },
  { client: 'James', result: '12 lbs gained', details: 'Focused muscle building with confident coaching.' },
  { client: 'Ava', result: '16 lbs lost', details: 'Strong habits built over 10 weeks of focused training.' },
];

const plans = [
  { name: 'Starter', price: '$149', description: 'For building consistent training habits', items: ['Weekly coaching sessions', 'Personalized training split', 'Accountability check-ins'], cta: 'Choose Starter' },
  { name: 'Pro', price: '$249', description: 'For steady, structured progress', items: ['Bi-weekly coaching sessions', 'Nutrition guidance', 'Progress tracking + updates'], featured: true, cta: 'Choose Pro' },
  { name: 'Elite', price: '$349', description: 'For complete hands-on support', items: ['Unlimited coaching support', 'Advanced training system', 'Priority scheduling'], cta: 'Choose Elite' },
];

gsap.registerPlugin(ScrollTrigger, SplitText);

const posts = [
  { category: 'Fitness', title: 'The smarter way to build strength without burnout.' },
  { category: 'Workout', title: 'Minimalist training splits for busy schedules.' },
  { category: 'Nutrition', title: 'How to create meals that support goals and keep energy high.' },
];

const meals = [
  { name: 'Power Salmon Bowl', className: 'salmon' },
  { name: 'Greens & Grain Salad', className: 'greens' },
  { name: 'Protein Power Bowl', className: 'bowl' },
];

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [countStates, setCountStates] = useState(() => stats.map(() => 0));
  const [height, setHeight] = useState('180');
  const [weight, setWeight] = useState('75');
  const [bmiResult, setBmiResult] = useState('Your BMI will appear here.');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const heroSplit = SplitText.create('.hero-copy h1', { type: 'lines', mask: 'lines' });
      gsap.from(heroSplit.lines, {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        delay: 0.15,
      });

      document.querySelectorAll<HTMLElement>('.section-header h2').forEach((heading) => {
        const split = SplitText.create(heading, { type: 'lines', mask: 'lines' });
        gsap.from(split.lines, {
          yPercent: 110,
          opacity: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
          },
        });
      });

      document.querySelectorAll<HTMLElement>('.about-image').forEach((image) => {
        gsap.to(image, {
          backgroundPosition: '50% 32%',
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setNavVisible(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const statsGrid = document.querySelector<HTMLElement>('.stats-grid');
    if (!statsGrid) return;

    let animationFrames: number[] = [];

    const runCountAnimation = () => {
      stats.forEach((item, index) => {
        const duration = 1200;
        const start = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const nextValue = Math.round(item.value * eased);
          setCountStates((current) => {
            const next = [...current];
            next[index] = nextValue;
            return next;
          });

          if (progress < 1) {
            animationFrames[index] = requestAnimationFrame(animate);
          }
        };

        animationFrames[index] = requestAnimationFrame(animate);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCountAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(statsGrid);

    return () => {
      observer.disconnect();
      animationFrames.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  const bmi = useMemo(() => {
    const h = Number(height);
    const w = Number(weight);
    if (!h || !w) return 'Enter both height and weight to calculate.';
    const value = (w / ((h / 100) ** 2)).toFixed(1);
    if (Number(value) < 18.5) return `BMI ${value} — Underweight`;
    if (Number(value) < 25) return `BMI ${value} — Normal`;
    if (Number(value) < 30) return `BMI ${value} — Overweight`;
    return `BMI ${value} — Strong focus required`;
  }, [height, weight]);

  const handleCalculate = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setBmiResult(bmi);
  };

  return (
    <div className="page-shell">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} visible={navVisible} />

      <main>
        <HeroSection />
        <InstagramSection />
        <StatsSection stats={stats} countStates={countStates} />
        <AboutSection />
        <ServicesSection services={services} />
        <TransformationsSection transformations={transformations} />
        <PricingSection plans={plans} />
        <TestimonialsSection />
        <BmiSection
          height={height}
          weight={weight}
          bmiResult={bmiResult}
          setHeight={setHeight}
          setWeight={setWeight}
          handleCalculate={handleCalculate}
        />
        <NutritionSection meals={meals} />
        <BlogSection posts={posts} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
