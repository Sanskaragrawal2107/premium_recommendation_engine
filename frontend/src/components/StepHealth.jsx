import { SliderField, SelectField } from './Fields'

export default function StepHealth({ data, update, onNext, onBack }) {
  return (
    <div className="card">
      <div className="card-step-tag">
        <div className="step-pill">2</div>
        <span className="step-of">Step 2 of 3</span>
      </div>
      <div className="card-title">Your health indicators</div>
      <p className="card-sub">Health data is the strongest predictor of the right plan tier.</p>

      <div className="fields-row">
        <SliderField id="bmi" label="BMI" min={10} max={60} step={0.1} value={data.bmi}
          onChange={v => update({ bmi: v })} />
        <SelectField id="diabetes" label="Diabetes" value={data.diabetes}
          onChange={v => update({ diabetes: v })}
          options={[{ v: 'No', l: 'No' }, { v: 'Yes', l: 'Yes — Diabetic' }]} />
        <SelectField id="bp" label="Blood Pressure" value={data.blood_pressure}
          onChange={v => update({ blood_pressure: v })}
          options={[{ v: 'Normal', l: 'Normal' }, { v: 'High', l: 'High' }]} />
      </div>

      <div className="card-footer">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" onClick={onNext}>Continue →</button>
      </div>
    </div>
  )
}
