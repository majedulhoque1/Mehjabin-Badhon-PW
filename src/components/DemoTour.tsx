import { useEffect } from 'react'
import { ArrowLeft, ArrowRight, Sparkles, X } from 'lucide-react'
import type { Go } from '../router'

export type TourState = { active: boolean; step: number }

type Step = { path: string; label: string; text: string }

// Mirrors the demo journey in plan.md: idea -> expertise -> problem -> service
// -> booking -> lead -> client/session/task -> published idea.
const steps: Step[] = [
  { path: '/', label: 'The home page', text: "This is Mehjabin's public home — the whole pitch, in one page." },
  { path: '/ideas', label: 'Read an idea', text: 'This is her real, sourced thinking — not filler copy.' },
  { path: '/work-with-me', label: 'Choose a problem', text: 'Every idea leads to a service. See how a reader finds the right one.' },
  { path: '/book', label: 'Book a slot', text: 'One click books a real consultation time — no back-and-forth email.' },
  { path: '/admin/crm', label: 'See the lead', text: 'That booking just became a lead here. Open it, then convert it to a client.' },
  { path: '/admin', label: 'Check the dashboard', text: 'The new session and follow-up task are already on the dashboard.' },
  { path: '/admin/content', label: 'Publish an idea', text: "Publish the item marked READY — it goes straight onto the public site." },
  { path: '/ideas', label: 'See it live', text: 'Back on the public Ideas page — the piece you just published is right there.' },
]

function findStepIndex(path: string, fromIndex: number): number | null {
  for (let i = fromIndex; i < steps.length; i++) if (steps[i].path === path) return i
  for (let i = 0; i < fromIndex; i++) if (steps[i].path === path) return i
  return null
}

export function DemoTour({
  path,
  go,
  tour,
  setTour,
}: Readonly<{ path: string; go: Go; tour: TourState; setTour: (t: TourState) => void }>) {
  // Keep the visible step in sync when the viewer follows an ordinary link
  // instead of the tour's own Next/Back buttons.
  useEffect(() => {
    if (!tour.active) return
    const synced = findStepIndex(path, tour.step)
    if (synced !== null && synced !== tour.step) setTour({ active: true, step: synced })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  if (!tour.active) return null

  const step = steps[tour.step]
  const isLast = tour.step === steps.length - 1

  const jump = (i: number) => {
    setTour({ active: true, step: i })
    go(steps[i].path)
  }

  return (
    <div className="demo-tour" role="dialog" aria-label="Guided demo tour">
      <div className="demo-tour-head">
        <span className="demo-tour-badge">
          <Sparkles size={12} /> Demo journey {'·'} {tour.step + 1} of {steps.length}
        </span>
        <button className="demo-tour-close" onClick={() => setTour({ active: false, step: 0 })} aria-label="Close tour">
          <X size={14} />
        </button>
      </div>
      <b>{step.label}</b>
      <p>{step.text}</p>
      <div className="demo-tour-actions">
        <button className="demo-tour-back" disabled={tour.step === 0} onClick={() => jump(Math.max(0, tour.step - 1))}>
          <ArrowLeft size={14} /> Back
        </button>
        <button
          className="primary small"
          onClick={() => (isLast ? setTour({ active: false, step: 0 }) : jump(tour.step + 1))}
        >
          {isLast ? 'Finish' : 'Next'} {!isLast && <ArrowRight size={14} />}
        </button>
      </div>
    </div>
  )
}
