type Plan = {
  name: string;
  price: string;
  description: string;
  items: string[];
  featured?: boolean;
  cta: string;
};

type PricingSectionProps = {
  plans: Plan[];
};

const PricingSection = ({ plans }: PricingSectionProps) => (
  <section className="section pricing-section" id="pricing">
    <div className="container section-header reveal">
      <span className="eyebrow">Programs</span>
      <h2>Plans built to match your ambition.</h2>
    </div>
    <div className="container pricing-grid">
      {plans.map((plan) => (
        <article key={plan.name} className={`pricing-card reveal${plan.featured ? ' pricing-card-featured' : ''}`}>
          <span className="plan-label">{plan.name}</span>
          <h3>{plan.price}</h3>
          <p>{plan.description}</p>
          <ul>
            {plan.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <a href="#contact" className={`button ${plan.featured ? 'button-primary' : 'button-secondary'}`}>{plan.cta}</a>
        </article>
      ))}
    </div>
  </section>
);

export default PricingSection;
