import { SliderField, SelectField } from './Fields'

export default function StepFamily({ data, update, onBack, onSubmit, loading, error }) {
  return (
    <div className="card">
      <div className="card-step-tag">
        <div className="step-pill">3</div>
        <span className="step-of">Step 3 of 3</span>
      </div>
      <div className="card-title">Family &amp; location</div>
      <p className="card-sub">Coverage needs scale with family size and city tier premiums.</p>

      <div className="fields-row">
        <SelectField id="city_tier" label="City Tier" value={data.city_tier}
          onChange={v => update({ city_tier: v })}
          options={[
            { v: 'Tier 1', l: 'Tier 1 — Metro city' },
            { v: 'Tier 2', l: 'Tier 2 — Semi-urban' },
            { v: 'Tier 3', l: 'Tier 3 — Rural area' },
          ]} />
        <SliderField id="members" label="Family Members" min={1} max={15}
          value={data.total_family_members}
          onChange={v => update({ total_family_members: v })} unit=" people" />
        <SliderField id="oldest" label="Oldest Member Age" min={1} max={100}
          value={data.max_family_age}
          onChange={v => update({ max_family_age: v })} unit=" yrs" />
      </div>

      {error && (
        <div className="error-box">
          <span style={{ fontSize: 20 }}>⚠️</span>
          <div>
            <div className="error-title">Could not get recommendation</div>
            <div className="error-body">{error}</div>
          </div>
        </div>
      )}

      <div className="card-footer">
        <button className="btn-back" onClick={onBack} disabled={loading}>← Back</button>
        <button className="btn-submit" onClick={onSubmit} disabled={loading}>
          {loading ? <><span className="spinner" /> Analysing…</> : <>✦ Get My Plan</>}
        </button>
      </div>
    </div>
  )
}
