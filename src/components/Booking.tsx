import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { services } from '../data/mockData'

interface BookingProps {
  readonly onComplete: (info: { name: string; company: string; service: string; email: string; phone: string; requirement: string }) => void
}

const slots = [
  'Tuesday · 10 Oct · 10:30 AM',
  'Wednesday · 11 Oct · 2:00 PM',
  'Thursday · 12 Oct · 11:00 AM',
  'Friday · 13 Oct · 4:00 PM',
  'Tuesday · 17 Oct · 10:30 AM',
  'Wednesday · 18 Oct · 2:00 PM',
]

export function Booking({ onComplete }: BookingProps) {
  const [step, setStep] = useState(1)
  const [service, setService] = useState(services[0].title)
  const [slot, setSlot] = useState(slots[0])
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', requirement: '' })
  const update = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value })

  const handleSubmit = () => {
    onComplete({
      name: form.name || 'New Inquiry',
      company: form.company || 'Independent',
      service,
      email: form.email,
      phone: form.phone,
      requirement: form.requirement,
    })
    setStep(4)
  }

  if (step === 4) {
    return (
      <main className="booking">
        <p className="eyebrow">CONVERSATION CONFIRMED</p>
        <div className="confirmation">
          <div className="confirm-icon"><Check size={28} /></div>
          <h2>You're on the list.</h2>
          <p>
            Thank you, <strong>{form.name || 'there'}</strong>. I'll be in touch within 48 business hours
            to confirm your <em>{service.toLowerCase()}</em> conversation.
          </p>
          <div className="confirm-detail">
            <span>📅 {slot}</span>
          </div>
          <small className="demo-note">
            DEMO DATA — this request now appears in the Business OS CRM as a new lead.
          </small>
        </div>
      </main>
    )
  }

  return (
    <main className="booking">
      <p className="eyebrow">BOOK A CONSULTATION</p>
      <h1>A good conversation<br />is a useful place<br /><em>to start.</em></h1>

      <div className="steps">
        {[1, 2, 3].map(x => (
          <button
            key={x}
            className={x === step ? 'active' : x < step ? 'done' : ''}
            onClick={() => x < step && setStep(x)}
          >
            <span className="step-num">{x < step ? '✓' : `0${x}`}</span>
            <span>{['Choose service', 'Pick a time', 'Your details'][x - 1]}</span>
          </button>
        ))}
      </div>

      {step === 1 && (
        <section className="booking-section">
          <h2>What would you like to talk about?</h2>
          <div className="choice-grid">
            {services.map(s => (
              <button
                key={s.id}
                className={`choice-btn${service === s.title ? ' selected' : ''}`}
                onClick={() => setService(s.title)}
              >
                <strong>{s.title}</strong>
                <span>{s.tagline}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="booking-section">
          <h2>Choose a time that works.</h2>
          <p className="booking-note">All times are Dhaka time (GMT+6). Sessions are 60 minutes.</p>
          <div className="times">
            {slots.map(x => (
              <button key={x} className={`time-btn${slot === x ? ' selected' : ''}`} onClick={() => setSlot(x)}>
                {x}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="booking-section">
          <h2>A little about you.</h2>
          <div className="form-grid">
            <label>
              Your name <span className="required">*</span>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" />
            </label>
            <label>
              Email address <span className="required">*</span>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" />
            </label>
            <label>
              Phone number
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+880 …" />
            </label>
            <label>
              Company / organisation
              <input type="text" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Company name" />
            </label>
            <label className="wide">
              What business problem are you exploring?
              <textarea
                value={form.requirement}
                onChange={e => update('requirement', e.target.value)}
                placeholder="Describe what you're trying to solve, decide or understand…"
                rows={4}
              />
            </label>
          </div>
        </section>
      )}

      <div className="booking-footer">
        {step > 1 && (
          <button className="back-btn" onClick={() => setStep(step - 1)}>← Back</button>
        )}
        <button
          className="primary"
          onClick={() => step === 3 ? handleSubmit() : setStep(step + 1)}
          disabled={step === 3 && !form.name}
        >
          {step === 3 ? 'Send Request' : 'Continue'} <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}
