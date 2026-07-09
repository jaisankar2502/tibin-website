const AboutSection = () => (
  <section className="section about-section" id="about">
    <div className="container about-grid">
      <div className="about-image card reveal"></div>
      <div className="about-copy reveal">
        <span className="eyebrow">Meet Your Coach</span>
        <h2>Strategic coaching for lasting confidence and strength.</h2>
        <p>With a focus on mindset, movement, and nutrition, I deliver a sustainable fitness journey that feels premium, effective, and motivating.</p>
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
          <li>Online coaching for ambitious clients</li>
        </ul>
      </div>
    </div>
  </section>
);

export default AboutSection;
