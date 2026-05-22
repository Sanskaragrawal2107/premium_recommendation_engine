import { SliderField, SelectField } from './Fields'

export default function StepPersonal({ data, update, onNext }) {
  return (
    <div className="card">
      <div className="card-step-tag">
        <div className="step-pill">1</div>
        <span className="step-of">Step 1 of 3</span>
      </div>
      <div className="card-title">Tell us about yourself</div>
      <p className="card-sub">Basic personal details help us understand your risk profile.</p>

      <div className="fields-row">
        <SliderField id="age" label="Age" min={18} max={100} value={data.age}
          onChange={v => update({ age: v })} unit=" yrs" />
        <SelectField id="sex" label="Biological Sex" value={data.sex}
          onChange={v => update({ sex: v })}
          options={[{ v: 'male', l: 'Male' }, { v: 'female', l: 'Female' }]} />
        <SelectField id="smoker" label="Smoking Status" value={data.smoker}
          onChange={v => update({ smoker: v })}
          options={[{ v: 'no', l: 'Non-smoker' }, { v: 'yes', l: 'Smoker' }]} />
      </div>

      <div className="card-footer">
        <span />
        <button className="btn-next" onClick={onNext}>
          Continue <span>→</span>
        </button>
      </div>
    </div>
  )
}
