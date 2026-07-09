type Transformation = {
  client: string;
  result: string;
  details: string;
};

type TransformationsSectionProps = {
  transformations: Transformation[];
};

const TransformationsSection = ({ transformations }: TransformationsSectionProps) => (
  <section className="section transformations-section" id="transformations">
    <div className="container section-header reveal">
      <span className="eyebrow">Transformations</span>
      <h2>Real results from real clients.</h2>
    </div>
    <div className="container transformation-slider reveal">
      {transformations.map((item) => (
        <article key={item.client} className="transform-card">
          <div className={`transform-image ${item.client.toLowerCase()}`}></div>
          <div className="transform-details">
            <p className="label">Client: {item.client}</p>
            <h3>{item.result}</h3>
            <p>{item.details}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default TransformationsSection;
