type NutritionSectionProps = {
  meals: Array<{ name: string; className: string }>;
};

const NutritionSection = ({ meals }: NutritionSectionProps) => (
  <section className="section nutrition-section">
    <div className="container section-header reveal">
      <span className="eyebrow">Nutrition</span>
      <h2>Healthy meals that fuel performance.</h2>
    </div>
    <div className="container nutrition-grid">
      {meals.map((meal) => (
        <article key={meal.name} className="meal-card reveal">
          <div className={`meal-image ${meal.className}`}></div>
          <div className="meal-copy">
            <h3>{meal.name}</h3>
            <div className="meal-stats">
              <span>420 kcal</span>
              <span>32g Protein</span>
              <span>28g Carbs</span>
              <span>18g Fat</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default NutritionSection;
