type BmiSectionProps = {
  height: string;
  weight: string;
  bmiResult: string;
  setHeight: (value: string) => void;
  setWeight: (value: string) => void;
  handleCalculate: (event: React.FormEvent<HTMLButtonElement>) => void;
};

const BmiSection = ({ height, weight, bmiResult, setHeight, setWeight, handleCalculate }: BmiSectionProps) => (
  <section className="section bmi-section">
    <div className="container bmi-grid reveal">
      <div className="bmi-copy">
        <span className="eyebrow">Quick Preview</span>
        <h2>BMI Calculator</h2>
        <p>Estimate your baseline and discover the right starting point for your personalized training path.</p>
      </div>
      <div className="bmi-card card">
        <div className="input-group">
          <label>
            <span>Height (cm)</span>
            <input value={height} onChange={(event) => setHeight(event.target.value)} type="number" min="100" max="250" placeholder="180" />
          </label>
        </div>
        <div className="input-group">
          <label>
            <span>Weight (kg)</span>
            <input value={weight} onChange={(event) => setWeight(event.target.value)} type="number" min="40" max="180" placeholder="75" />
          </label>
        </div>
        <button id="calculateBtn" className="button button-primary" onClick={handleCalculate}>Calculate</button>
        <p className="bmi-result">{bmiResult}</p>
      </div>
    </div>
  </section>
);

export default BmiSection;
