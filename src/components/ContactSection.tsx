const ContactSection = () => (
  <section className="section contact-section" id="contact">
    <div className="container contact-grid reveal">
      <div className="contact-copy">
        <span className="eyebrow">Contact</span>
        <h2>Book your consultation today.</h2>
        <p>Complete the form and we’ll reach out with a plan built around your goals.</p>
        <div className="contact-info">
          <p><strong>Email:</strong> hello@tibinfitness.com</p>
          <p><strong>Phone:</strong> +1 (555) 019-2347</p>
        </div>
        <div className="social-links">
          <a href="https://www.instagram.com/the_athletic_twin" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="https://www.youtube.com/@the_athletic_twin" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>
      <form className="contact-form card">
        <label><span>Name</span><input type="text" placeholder="Your name" /></label>
        <label><span>Email</span><input type="email" placeholder="you@example.com" /></label>
        <label><span>Phone</span><input type="tel" placeholder="(555) 123-4567" /></label>
        <label><span>Goal</span><input type="text" placeholder="Lose weight, build muscle, etc." /></label>
        <label><span>Message</span><textarea rows={4} placeholder="Tell us about your goals"></textarea></label>
        <button type="submit" className="button button-primary">Send Message</button>
      </form>
    </div>
  </section>
);

export default ContactSection;
