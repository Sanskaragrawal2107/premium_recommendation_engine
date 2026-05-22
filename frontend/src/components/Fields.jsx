function SliderField({ id, label, min, max, step = 1, value, onChange, unit = '' }) {
  return (
    <div className="field">
      <span className="field-label">{label}</span>
      <div className="slider-wrap">
        <div className="slider-top">
          <span className="slider-val">{typeof value === 'number' && step < 1 ? value.toFixed(1) : value}</span>
          <span className="slider-bounds">{min} – {max}{unit}</span>
        </div>
        <input type="range" id={id} min={min} max={max} step={step} value={value}
          onChange={e => onChange(step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value, 10))}
        />
      </div>
    </div>
  )
}

function SelectField({ id, label, value, onChange, options }) {
  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>{label}</label>
      <div className="select-wrap">
        <select id={id} value={value} onChange={e => onChange(e.target.value)}>
          {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      </div>
    </div>
  )
}

export { SliderField, SelectField }
