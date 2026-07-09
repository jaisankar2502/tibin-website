const TestimonialsSection = () => (
  <section className="section testimonials-section" id="testimonials">
    <div className="container section-header reveal">
      <span className="eyebrow">Testimonials</span>
      <h2>Clients who trust the process.</h2>
    </div>
    <div className="container testimonials-grid">
      {['Elena R.', 'Marcus T.', 'Sophia K.'].map((name, index) => (
        <article key={name} className="testimonial-card reveal">
          <div className="testimonial-head">
            <div className="avatar"></div>
            <div>
              <h4>{name}</h4>
              <p>{['Creative Director', 'Entrepreneur', 'Marketing Lead'][index]}</p>
            </div>
          </div>
          <p>"{['The coaching is detailed, motivating, and simply unmatched. I feel stronger and more confident every week.', 'A structured, no-nonsense approach — results that felt worth every session. The focus on habit made all the difference.', 'The online coaching plan is practical and easy to follow, with clear tracking and real results every week.'][index]}"</p>
          <div className="rating">★★★★★</div>
        </article>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
