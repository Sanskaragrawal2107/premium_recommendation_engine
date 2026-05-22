const BMI_CAT  = b => b < 18.5 ? 'Underweight' : b < 25 ? 'Normal' : b < 30 ? 'Overweight' : 'Obese'
const AGE_BAND = a => a < 30 ? '18–29' : a < 45 ? '30–44' : a < 60 ? '45–59' : '60+'

function buildTags(data) {
  const tags = []
  if (data.smoker === 'yes')
    tags.push({ l: 'Smoker — High Risk', c: 'red' })
  else
    tags.push({ l: 'Non-smoker', c: 'green' })
  if (data.diabetes === 'Yes')
    tags.push({ l: 'Diabetic', c: 'amber' })
  if (data.blood_pressure === 'High')
    tags.push({ l: 'High BP', c: 'amber' })
  if (data.total_family_members > 3)
    tags.push({ l: 'Family Floater', c: 'green' })
  tags.push({ l: data.city_tier, c: 'gray' })
  return tags
}

function tip(data) {
  if (data.smoker === 'yes')
    return { title: 'Smoker Premium Applied', body: 'Your plan includes a smoker loading. Quitting can reduce premiums significantly at renewal.' }
  if (data.bmi >= 30)
    return { title: 'BMI Note', body: 'A BMI above 30 may attract co-payment clauses in some plans. Review policy terms carefully.' }
  if (data.total_family_members > 4)
    return { title: 'Large Family Benefit', body: 'Family floater plans with high sum insured are cost-effective for your group size.' }
  return { title: 'Great Profile', body: 'Your risk indicators are well within standard range — expect competitive premiums at renewal.' }
}

export default function ResultScreen({ plan, data, onRestart }) {
  const tags = buildTags(data)
  const t = tip(data)

  return (
    <div className="result-page">
      <div className="result-hero">
        <div className="result-icon-wrap">🛡️</div>
        <div className="result-kicker">✓ Your Recommendation Is Ready</div>
        <div className="result-plan">{plan}</div>
        <div className="result-tags">
          {tags.map(tg => (
            <span key={tg.l} className={`tag tag-${tg.c}`}>{tg.l}</span>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="tip-box">
        <div className="tip-icon">💡</div>
        <div>
          <div className="tip-title">{t.title}</div>
          <div className="tip-body">{t.body}</div>
        </div>
      </div>

      {/* Profile summary */}
      <div className="profile-section">
        <div className="profile-header">Your Profile Summary</div>
        <div className="profile-grid">
          <div className="profile-cell">
            <div className="cell-val">{data.age} yrs</div>
            <div className="cell-lbl">Age · {AGE_BAND(data.age)}</div>
          </div>
          <div className="profile-cell">
            <div className="cell-val" style={{ textTransform: 'capitalize' }}>{data.sex}</div>
            <div className="cell-lbl">Biological Sex</div>
          </div>
          <div className="profile-cell">
            <div className="cell-val">{data.smoker === 'yes' ? 'Yes' : 'No'}</div>
            <div className="cell-lbl">Smoker</div>
          </div>
          <div className="profile-cell">
            <div className="cell-val">{typeof data.bmi === 'number' ? data.bmi.toFixed(1) : data.bmi}</div>
            <div className="cell-lbl">BMI · {BMI_CAT(data.bmi)}</div>
          </div>
          <div className="profile-cell">
            <div className="cell-val">{data.total_family_members}</div>
            <div className="cell-lbl">Family Members</div>
          </div>
          <div className="profile-cell">
            <div className="cell-val">{data.city_tier}</div>
            <div className="cell-lbl">City Tier</div>
          </div>
        </div>
      </div>

      <button className="btn-restart" onClick={onRestart}>
        ↩ Start Over
      </button>
    </div>
  )
}
