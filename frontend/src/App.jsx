import { useState, useCallback } from 'react'
import StepPersonal   from './components/StepPersonal'
import StepHealth     from './components/StepHealth'
import StepFamily     from './components/StepFamily'
import ResultScreen   from './components/ResultScreen'

const STEPS = [
  { label: 'Personal' },
  { label: 'Health'   },
  { label: 'Location' },
]

const DEFAULT = {
  age: 35, sex: 'male', smoker: 'no',
  bmi: 24.0, diabetes: 'No', blood_pressure: 'Normal',
  city_tier: 'Tier 1', total_family_members: 3, max_family_age: 45,
}

export default function App() {
  const [step,    setStep]    = useState(0)          // 0-2 = form, 3 = result
  const [data,    setData]    = useState(DEFAULT)
  const [result,  setResult]  = useState(null)
  const [error,   setError]   = useState(null)
  const [loading, setLoading] = useState(false)

  const update = (patch) => setData(d => ({ ...d, ...patch }))

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => Math.max(0, s - 1))

  const submit = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const b = await res.json().catch(() => ({}))
        throw new Error(b.detail || `Error ${res.status}`)
      }
      const json = await res.json()
      if (!json.recommended_plan) throw new Error('No plan returned.')
      setResult(json.recommended_plan)
      setStep(3)
    } catch (e) {
      setError(e.name === 'TypeError'
        ? 'Cannot reach the backend. Ensure FastAPI is running on port 8000.'
        : e.message)
    } finally {
      setLoading(false)
    }
  }, [data])

  const restart = () => { setStep(0); setData(DEFAULT); setResult(null); setError(null) }

  const stepCount = step < 3 ? `Step ${step + 1} of 3` : 'Complete'

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo">
          <div className="logo-mark">B</div>
          <span className="logo-name">Bajaj <em>Allianz</em></span>
        </div>
        <div className="header-right">
          <span className="header-step-count">{stepCount}</span>
          <div className="header-badge">AI Engine Online</div>
        </div>
      </header>

      <div className="page">
        {step < 3 ? (
          <>
            {/* Hero */}
            <div className="hero">
              <div className="hero-kicker">⚡ AI-Powered Recommendation</div>
              <h1 className="hero-title">
                Your ideal health plan,<br /><em>found instantly.</em>
              </h1>
              <p className="hero-sub">
                Answer 9 quick questions. Our XGBoost engine matches your profile
                to the most suitable Bajaj Allianz plan — in under a second.
              </p>

              {/* Step progress */}
              <div className="steps-track">
                {STEPS.map((s, i) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="step-node">
                      <div className={`step-circle ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      <span className={`step-label ${i === step ? 'active' : ''}`}>{s.label}</span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className={`step-connector ${i < step ? 'done' : ''}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step cards */}
            {step === 0 && <StepPersonal data={data} update={update} onNext={next} />}
            {step === 1 && <StepHealth   data={data} update={update} onNext={next} onBack={back} />}
            {step === 2 && (
              <StepFamily
                data={data} update={update} onBack={back}
                onSubmit={submit} loading={loading} error={error}
              />
            )}
          </>
        ) : (
          <ResultScreen plan={result} data={data} onRestart={restart} />
        )}
      </div>
    </>
  )
}
