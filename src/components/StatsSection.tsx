type StatsSectionProps = {
  stats: Array<{ label: string; value: number; suffix: string }>;
  countStates: number[];
};

const StatsSection = ({ stats, countStates }: StatsSectionProps) => (
  <section className="section stats-section" aria-label="Statistics">
    <div className="container section-header reveal">
      <span className="eyebrow">Performance</span>
      <h2>Results that reflect premium coaching and sustainable growth.</h2>
    </div>
    <div className="container stats-grid">
      {stats.map((item, index) => (
        <article key={item.label} className="stat-card reveal">
          <h3>{countStates[index]}{item.suffix}</h3>
          <p>{item.label}</p>
        </article>
      ))}
    </div>
  </section>
);

export default StatsSection;
