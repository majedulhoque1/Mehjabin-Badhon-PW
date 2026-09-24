import { useMemo, useState } from 'react'
import { AlertCircle, ArrowRight, Check } from 'lucide-react'
import { services } from '../data/mockData'
import { nextWorkdaySlots } from '../lib/dates'
import { useReveal } from '../hooks/useReveal'
import type { Go } from '../router'

interface BookingProps {
  readonly onComplete: (info: { name: string; company: string; service: string; email: string; phone: string; requirement: string }) => string
  readonly initialServiceId?: string | null
  readonly go: Go
}

const SLOT_TIMES = ['10:30 AM', '2:00 PM', '11:00 AM', '4:00 PM']

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function Booking({ onComplete, initialServiceId, go }: BookingProps) {
  const slots = useMemo(() => nextWorkdaySlots(6, SLOT_TIMES), [])
  const initialService = services.find(s => s.id === initialServiceId) ?? services[0]

  const [step, setStep] = useState(1)
  const [service, setService] = useState(initialService.title)
  const [slotIndex, setSlotIndex] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', requirement: '' })
  const [touched, setTouched] = useState(false)
  const [leadId, setLeadId] = useState<string | null>(null)

  useReveal([step])

  const update = (key: keyof typeof form, value: string) => setForm({ ...form, [key]: value })

  const nameError = touched && !form.name.trim() ? 'Your name is required.' : ''
  const emailError = touched && !isValidEmail(form.email) ? 'Enter a valid email address.' : ''

  const handleSubmit = () => {
    setTouched(true)
    if (!form.name.trim() || !isValidEmail(form.email)) return
    const id = onComplete({
      name: form.name.trim(),
      company: form.company.trim() || 'Independent',
      service,
      email: form.email.trim(),
      phone: form.phone.trim(),
      requirement: form.requirement.trim(),
    })
    setLeadId(id)
    setStep(4)
  }

  const slot = slots[slotIndex]

  if (step === 4) {
    return (
      <main className="booking">
        <p className="eyebrow">CONVERSATION CONFIRMED</p>
        <div className="confirmation" data-reveal>
          <div className="confirm-icon"><Check size={28} /></div>
          <h2>You're on the list.</h2>
          <p>
            Thank you, <strong>{form.name}</strong>. I'll be in touch within 48 business hours
            to confirm your <em>{service.toLowerCase()}</em> conversation.
          </p>
          <div className="confirm-detail">
            <span>{slot.dayLabel} · {slot.time}</span>
          </div>
          <small className="demo-note">
            DEMO DATA — this request now appears in the Business OS CRM as a new lead.
          </small>
          {leadId && (
            <button className="text-button confirm-crm-link" onClick={() => go('/admin/crm')}>
              See this lead in the Business OS →
            </button>
          )}
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
            <span className="step-num">{x < step ? <Check size={12} /> : `0${x}`}</span>
            <span>{['Choose service', 'Pick a time', 'Your details'][x - 1]}</span>
          </button>
        ))}
      </div>

      {step === 1 && (
        <section className="booking-section" data-reveal>
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
        <section className="booking-section" data-reveal>
          <h2>Choose a time that works.</h2>
          <p className="booking-note">All times are Dhaka time (GMT+6). Sessions run Sunday to Thursday, 60 minutes each.</p>
          <div className="times">
            {slots.map((s, i) => (
              <button key={s.iso + s.time} className={`time-btn${slotIndex === i ? ' selected' : ''}`} onClick={() => setSlotIndex(i)}>
                {s.dayLabel} · {s.time}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="booking-section" data-reveal>
          <h2>A little about you.</h2>
          <div className="form-grid">
            <label>
              Your name <span className="required">*</span>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" aria-invalid={!!nameError} />
              {nameError && <small className="field-error"><AlertCircle size={12} /> {nameError}</small>}
            </label>
            <label>
              Email address <span className="required">*</span>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" aria-invalid={!!emailError} />
              {emailError && <small className="field-error"><AlertCircle size={12} /> {emailError}</small>}
            </label>
            <label>
              Phone number
              <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+880 ..." />
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
                placeholder="Describe what you're trying to solve, decide or understand..."
                rows={4}
              />
            </label>
          </div>
        </section>
      )}

      <div className="booking-footer">
        {step > 1 && (
          <button className="back-btn" onClick={() => setStep(step - 1)}>&larr; Back</button>
        )}
        <button
          className="primary"
          onClick={() => (step === 3 ? handleSubmit() : setStep(step + 1))}
        >
          {step === 3 ? 'Send Request' : 'Continue'} <ArrowRight size={16} />
        </button>
      </div>
    </main>
  )
}
