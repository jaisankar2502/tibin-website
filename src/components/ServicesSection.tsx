type Service = {
  name: string;
  description: string;
};

type ServicesSectionProps = {
  services: Service[];
};

const ServicesSection = ({ services }: ServicesSectionProps) => (
  <section className="section services-section" id="programs">
    <div className="container section-header reveal">
      <span className="eyebrow">Services</span>
      <h2>Training built around your goal.</h2>
    </div>
    <div className="container services-grid">
      {services.map((service) => (
        <article key={service.name} className="service-card reveal">
          <div className="icon"></div>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <a href="#pricing" className="link-button">Learn More</a>
        </article>
      ))}
    </div>
  </section>
);

export default ServicesSection;
