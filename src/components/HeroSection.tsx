const HeroSection = () => (
  <section className="hero section section-large" id="home">
    <div className="container hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">Premium Personal Training</span>
        <h1>Transform Your Body. Transform Your Life.</h1>
        <p>Elevate your performance with precision coaching, confident programming, and luxury support designed for lasting success.</p>
        <div className="hero-actions">
          <a href="#contact" className="button button-primary">Start Training</a>
          <a href="#programs" className="button button-secondary">View Programs</a>
        </div>
        <div className="hero-meta">
          <div>
            <strong>Personalized plans</strong>
            <p>Built for strength, mobility, and confidence.</p>
          </div>
          <div>
            <strong>Elite support</strong>
            <p>One-on-one coaching with measurable results.</p>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card glass-card">
          <div className="hero-image"></div>
          <div className="hero-card-copy">
            <p>Train with a coach who understands elite fitness, premium branding, and transformative results.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
