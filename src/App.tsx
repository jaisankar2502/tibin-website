import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Lenis from 'lenis';
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
  { name: 'Online Coaching', description: 'Elite remote coaching with daily accountability and premium support.' },
  { name: 'Nutrition Guidance', description: 'Simple meal strategies that complement your training and lifestyle.' },
  { name: 'Custom Workout Plans', description: 'Precision plans tailored to your schedule, body, and growth goals.' },
];

const transformations = [
  { client: 'Maya', result: '18 lbs lost', details: '12 weeks of guided strength and nutrition.' },
  { client: 'James', result: '12 lbs gained', details: 'Focused muscle building with confident coaching.' },
  { client: 'Ava', result: '16 lbs lost', details: 'Strong habits built over 10 weeks of premium training.' },
];

const plans = [
  { name: 'Starter', price: '$149', description: 'Weekly coaching sessions', items: ['Weekly coaching sessions', 'Personalized training split', 'Accountability check-ins'], cta: 'Choose Starter' },
  { name: 'Pro', price: '$249', description: 'Bi-weekly coaching sessions', items: ['Bi-weekly coaching sessions', 'Nutrition guidance', 'Progress tracking + updates'], featured: true, cta: 'Choose Pro' },
  { name: 'Elite', price: '$349', description: 'Unlimited coaching support', items: ['Unlimited coaching support', 'Advanced training system', 'Priority scheduling'], cta: 'Choose Elite' },
];

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

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
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
    const animationFrames: number[] = [];
    stats.forEach((item, index) => {
      const duration = 900;
      const start = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const nextValue = Math.round(item.value * progress);
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

    return () => animationFrames.forEach((id) => cancelAnimationFrame(id));
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
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <InstagramSection />
        <HeroSection />
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
