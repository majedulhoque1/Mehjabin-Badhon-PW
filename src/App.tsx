import { useMemo, useState, type FormEvent } from 'react'
import { ArrowRight, Compass } from 'lucide-react'
import { useBusinessOS } from './hooks/useBusinessOS'
import { contentToArticle } from './data/mockData'
import { useRoute } from './router'
import { PublicSite } from './components/PublicSite'
import { Admin } from './components/Admin'
import { DemoTour, type TourState } from './components/DemoTour'

const BASE_ARTICLE_IDS = new Set(['c-001', 'c-002', 'c-003', 'c-004', 'c-005', 'c-006', 'c-007'])
const ADMIN_SESSION_KEY = 'mehjabin-admin-session'
const TOUR_SESSION_KEY = 'mehjabin-tour-v1'
const DEMO_EMAIL = 'mehjabin@letstalkbusiness.co'
const DEMO_PASSWORD = 'mehjabin-demo'

function loadTour(): TourState {
  try {
    const raw = sessionStorage.getItem(TOUR_SESSION_KEY)
    return raw ? JSON.parse(raw) : { active: false, step: 0 }
  } catch {
    return { active: false, step: 0 }
  }
}

function loadAdminAccess(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

function App() {
  const { path, query, hash, go } = useRoute()
  const [adminAccess, setAdminAccess] = useState(loadAdminAccess)
  const [tour, setTourState] = useState<TourState>(loadTour)
  const os = useBusinessOS()

  const setTour = (t: TourState) => {
    setTourState(t)
    try {
      sessionStorage.setItem(TOUR_SESSION_KEY, JSON.stringify(t))
    } catch {
      // sessionStorage unavailable — the tour still works for this render
    }
  }

  const signIn = () => {
    setAdminAccess(true)
    try {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true')
    } catch {
      // ignore
    }
  }

  const startTour = () => {
    setTour({ active: true, step: 0 })
    go('/')
  }

  const extraArticles = useMemo(
    () => os.publishedContent.filter(c => !BASE_ARTICLE_IDS.has(c.id)).map(contentToArticle),
    [os.publishedContent]
  )

  const isAdminRoute = path.startsWith('/admin')

  return (
    <>
      {isAdminRoute
        ? adminAccess
          ? <Admin path={path} go={go} os={os} />
          : <LoginPage onSuccess={signIn} go={go} onStartTour={startTour} />
        : <PublicSite path={path} query={query} hash={hash} go={go} onBooking={os.addBooking} extraArticles={extraArticles} onStartTour={startTour} />
      }
      <DemoTour path={path} go={go} tour={tour} setTour={setTour} />
    </>
  )
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

function LoginPage({ onSuccess, go, onStartTour }: Readonly<{ onSuccess: () => void; go: (path: string) => void; onStartTour: () => void }>) {
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      onSuccess()
    } else {
      setError('Use the demo credentials shown below.')
    }
  }

  return (
    <main className="login-page">
      <button className="wordmark login-wordmark" onClick={() => go('/')}>
        mehjabin badhon<br /><i>business os</i>
      </button>
      <form className="login-card" onSubmit={submit}>
        <p className="eyebrow">OPTIONAL ADD-ON &middot; PRIVATE BUSINESS OS</p>
        <h1>Welcome back.</h1>
        <p className="login-sub">Sign in to manage your leads, clients and content.</p>
        <label>
          Email address
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        {error && <small className="login-error">{error}</small>}
        <button className="primary" type="submit">
          Sign in <ArrowRight size={16} />
        </button>
        <aside className="demo-creds">
          <b>DEMO ACCESS</b>
          <span>Email: {DEMO_EMAIL}</span>
          <span>Password: {DEMO_PASSWORD}</span>
        </aside>
        <button type="button" className="text-btn-small login-tour-link" onClick={onStartTour}>
          <Compass size={13} /> Take the 3-minute tour instead
        </button>
      </form>
    </main>
  )
}

export default App
