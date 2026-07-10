export type BmiCategory = 'Underweight' | 'Normal' | 'Overweight' | 'Obese';

export type BmiResult = {
  value: number;
  category: BmiCategory;
} | null;

type BmiSectionProps = {
  height: string;
  weight: string;
  bmiResult: BmiResult;
  setHeight: (value: string) => void;
  setWeight: (value: string) => void;
  handleCalculate: (event: React.FormEvent<HTMLButtonElement>) => void;
};

const GAUGE_MIN = 15;
const GAUGE_MAX = 40;

const categorySlug: Record<BmiCategory, string> = {
  Underweight: 'under',
  Normal: 'normal',
  Overweight: 'over',
  Obese: 'high',
};

const categoryHint: Record<BmiCategory, string> = {
  Underweight: 'A lean muscle-building plan can help you reach a stronger, healthier baseline.',
  Normal: "You're in a healthy range — let's build strength and performance from here.",
  Overweight: 'A structured training and nutrition plan can help you move toward your goal safely.',
  Obese: 'A guided coaching plan can help you build sustainable, healthy habits.',
};

const BmiGauge = ({ value }: { value: number | null }) => {
  const pointer = value === null ? null : Math.min(100, Math.max(0, ((value - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100));

  return (
    <div className="bmi-gauge">
      <div className="bmi-gauge-track">
        <span className="bmi-gauge-segment bmi-gauge-segment-under" style={{ flexGrow: 3.5 }} />
        <span className="bmi-gauge-segment bmi-gauge-segment-normal" style={{ flexGrow: 6.5 }} />
        <span className="bmi-gauge-segment bmi-gauge-segment-over" style={{ flexGrow: 5 }} />
        <span className="bmi-gauge-segment bmi-gauge-segment-high" style={{ flexGrow: 10 }} />
        {pointer !== null && <span className="bmi-gauge-pointer" style={{ left: `${pointer}%` }} />}
      </div>
      <div className="bmi-gauge-scale">
        <span>15</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40+</span>
      </div>
    </div>
  );
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
        <div className="bmi-inputs">
          <div className="input-group">
            <label>
              <span>Height</span>
              <div className="bmi-input-field">
                <input
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  type="number"
                  min="100"
                  max="250"
                  placeholder="180"
                  inputMode="numeric"
                />
                <span className="bmi-input-unit">cm</span>
              </div>
            </label>
          </div>
          <div className="input-group">
            <label>
              <span>Weight</span>
              <div className="bmi-input-field">
                <input
                  value={weight}
                  onChange={(event) => setWeight(event.target.value)}
                  type="number"
                  min="40"
                  max="180"
                  placeholder="75"
                  inputMode="numeric"
                />
                <span className="bmi-input-unit">kg</span>
              </div>
            </label>
          </div>
        </div>

        <button id="calculateBtn" className="button button-primary bmi-calculate" onClick={handleCalculate}>
          Calculate BMI
        </button>

        <div className="bmi-result-panel">
          {bmiResult ? (
            <>
              <div className="bmi-result-top">
                <div className="bmi-result-value">
                  <span className="bmi-number">{bmiResult.value}</span>
                  <span className="bmi-unit-label">BMI</span>
                </div>
                <span className={`bmi-category bmi-category-${categorySlug[bmiResult.category]}`}>
                  {bmiResult.category}
                </span>
              </div>
              <BmiGauge value={bmiResult.value} />
              <p className="bmi-hint">{categoryHint[bmiResult.category]}</p>
            </>
          ) : (
            <>
              <p className="bmi-placeholder">Enter your height and weight, then calculate to see your baseline.</p>
              <BmiGauge value={null} />
            </>
          )}
        </div>
      </div>
    </div>
  </section>
);

export default BmiSection;
