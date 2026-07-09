const AboutSection = () => (
  <section className="section about-section" id="about">
    <div className="container about-grid">
      <div className="about-image card reveal"></div>
      <div className="about-copy reveal">
        <span className="eyebrow">Meet Your Coach</span>
        <h2>Strategic coaching for lasting confidence and strength.</h2>
        <p>A hybrid approach to mindset, movement, and nutrition — built to be sustainable, effective, and genuinely motivating.</p>
        <div className="about-highlights">
          <div>
            <strong>Certifications</strong>
            <p>NASM, Precision Nutrition, Strength & Conditioning</p>
          </div>
          <div>
            <strong>Mission</strong>
            <p>Empower clients to build strength in body and belief.</p>
          </div>
          <div>
            <strong>Approach</strong>
            <p>Minimal clutter, maximum clarity, measurable progress.</p>
          </div>
        </div>
        <ul className="feature-list">
          <li>Tailored weight loss cycles</li>
          <li>High-performance muscle plans</li>
          <li>HYROX & hybrid race prep</li>
        </ul>
      </div>
    </div>
  </section>
);

export default AboutSection;
