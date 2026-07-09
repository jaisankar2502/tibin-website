import coachImage from '../assets/coach.jpg';
import fitMp4 from '../assets/fit.mp4';
import fitWebm from '../assets/fit1.webm';

const HeroSection = () => (
  <section className="hero" id="home">
    <div className="hero-video-wrap">
      <video className="hero-video" autoPlay loop muted playsInline poster={coachImage}>
        <source src={fitMp4} type="video/mp4" />
        <source src={fitWebm} type="video/webm" />
      </video>
      <div className="hero-video-overlay"></div>

      <div className="container hero-overlay-content">
        <div className="hero-copy">
          <span className="eyebrow">Hybrid Coaching · HIIT Specialist</span>
          <h1>
            <span className="hero-tagline">Transform Your Body, Transform Your Life.</span>
            <span className="hero-brand">
              TIBIN<em className="hero-brand-script">Fitness</em>
            </span>
          </h1>
        </div>

        <div className="hero-caption">
          <p>"Coached by a HYROX athlete and hybrid training specialist — programming built on real racing and results."</p>
          <span className="hero-caption-name">
            Tibin Ambrose
            <span>Founder & Head Coach</span>
          </span>
        </div>
      </div>

      <div className="hero-bar">
        <div className="container hero-bar-inner">
          <div className="hero-bar-tag">
            <span className="hero-bar-label">Hybrid Coach</span>
            <strong>Tibin Ambrose</strong>
          </div>
          <div className="hero-actions">
            <a href="#contact" className="button button-primary">Start Training</a>
            <a href="#programs" className="button button-secondary">View Programs</a>
          </div>
        </div>
      </div>
    </div>

    <div className="container hero-highlights">
      <div>
        <strong>Personalized plans</strong>
        <p>Built for strength, mobility, and confidence.</p>
      </div>
      <div>
        <strong>Elite support</strong>
        <p>One-on-one coaching with measurable results.</p>
      </div>
    </div>
  </section>
);

export default HeroSection;
