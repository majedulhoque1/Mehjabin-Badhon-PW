import { useEffect, useState, type FormEvent } from 'react'
import {
  ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronRight,
  Plus, Search, Sparkles, TrendingUp, Users, FileText, BarChart2, X,
} from 'lucide-react'
import { useBusinessOS, type Lead, type ContentItem } from './hooks/useBusinessOS'
import { analyticsData, seedContent } from './data/mockData'
import { SiteHeader } from './components/SiteHeader'
import { PublicSite } from './components/PublicSite'
import './styles.css'

type Go = (path: string) => void

function App() {
  const [path, setPath] = useState(location.pathname)
  const [adminAccess, setAdminAccess] = useState(false)
  const os = useBusinessOS()

  const go: Go = to => {
    history.pushState({}, '', to)
    setPath(to)
    scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const update = () => setPath(location.pathname)
    addEventListener('popstate', update)
    return () => removeEventListener('popstate', update)
  }, [])

  if (path.startsWith('/admin')) {
    return adminAccess
      ? <AdminApp path={path} go={go} os={os} />
      : <LoginPage onSuccess={() => setAdminAccess(true)} go={go} />
  }

  return (
    <PublicSite
      path={path}
      go={go}
      onBooking={info => os.addLead(info)}
    />
  )
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────

function LoginPage({ onSuccess, go }: Readonly<{ onSuccess: () => void; go: Go }>) {
  const [email, setEmail] = useState('mehjabin@letstalkbusiness.co')
  const [password, setPassword] = useState('mehjabin-demo')
  const [error, setError] = useState('')

  const signIn = (e: FormEvent) => {
    e.preventDefault()
    if (email === 'mehjabin@letstalkbusiness.co' && password === 'mehjabin-demo') {
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
      <form className="login-card" onSubmit={signIn}>
        <p className="eyebrow">PRIVATE BUSINESS OS</p>
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
          <span>Email: mehjabin@letstalkbusiness.co</span>
          <span>Password: mehjabin-demo</span>
        </aside>
      </form>
    </main>
  )
}

// ─── ADMIN APP ────────────────────────────────────────────────────────────────

function AdminApp({ path, go, os }: Readonly<{ path: string; go: Go; os: ReturnType<typeof useBusinessOS> }>) {
  return (
    <div className="admin-layout">
      <SiteHeader admin onNavigate={go} currentPath={path} />
      <main className="admin-main">
        {path === '/admin/crm' && <CRMPage leads={os.leads} onUpdate={os.updateLeadStatus} />}
        {path === '/admin/clients' && <ClientsPage clients={os.clients} />}
        {path === '/admin/content' && <ContentStudioPage content={os.content} onAdd={os.addContentItem} onUpdate={os.updateContentStatus} />}
        {path === '/admin/analytics' && <AnalyticsPage />}
        {path === '/admin' && <DashboardPage os={os} go={go} />}
      </main>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

function DashboardPage({ os, go }: Readonly<{ os: ReturnType<typeof useBusinessOS>; go: Go }>) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const published = os.content.filter(c => c.status === 'PUBLISHED').length
  const drafts = os.content.filter(c => ['DRAFT', 'IDEA'].includes(c.status)).length
  const ready = os.content.filter(c => c.status === 'READY').length

  const pipeline = [
    { label: 'New Leads', count: os.leads.filter(l => l.status === 'NEW').length, color: '#a04024' },
    { label: 'Discovery', count: os.leads.filter(l => l.status === 'DISCOVERY').length, color: '#785b00' },
    { label: 'Proposal', count: os.leads.filter(l => l.status === 'PROPOSAL').length, color: '#3d5988' },
    { label: 'Active Clients', count: os.activeClients, color: '#2d6e4e' },
  ]

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div>
          <p className="eyebrow">DEMO DATA / PRIVATE BUSINESS OS</p>
          <h1>{greeting}, Mehjabin.</h1>
          <p className="dash-sub">Here is what needs your attention today.</p>
        </div>
        <button className="primary" onClick={() => go('/book')}>
          New booking <CalendarDays size={16} />
        </button>
      </div>

      {/* Priority metrics */}
      <div className="metric-grid">
        <MetricCard value={`0${os.upcomingSessions.length}`} label="Today's sessions" icon={<CalendarDays size={18} />} />
        <MetricCard value={String(os.newInquiries).padStart(2, '0')} label="New inquiries" icon={<Users size={18} />} accent />
        <MetricCard value={String(os.pendingFollowUps).padStart(2, '0')} label="Pending follow-ups" icon={<ArrowRight size={18} />} />
        <MetricCard value={String(os.activeClients).padStart(2, '0')} label="Active clients" icon={<TrendingUp size={18} />} />
      </div>

      <div className="dash-grid">

        {/* Upcoming sessions */}
        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Upcoming sessions</h2>
            <button onClick={() => go('/admin/clients')} className="view-link">View clients <ChevronRight size={15} /></button>
          </div>
          {os.upcomingSessions.length === 0
            ? <p className="empty-note">No upcoming sessions scheduled.</p>
            : os.upcomingSessions.map(s => (
              <div key={s.id} className="session-row">
                <div className="session-dot" />
                <div>
                  <b>{s.service}</b>
                  <small>{s.clientName} · {s.company}</small>
                </div>
                <span className="session-time">{s.date}<br />{s.time}</span>
              </div>
            ))
          }
        </section>

        {/* Pipeline summary */}
        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Pipeline</h2>
            <button onClick={() => go('/admin/crm')} className="view-link">View CRM <ChevronRight size={15} /></button>
          </div>
          {pipeline.map(p => (
            <div key={p.label} className="pipeline-row">
              <span>{p.label}</span>
              <b style={{ color: p.color }}>{p.count}</b>
              <div className="pipeline-bar">
                <div style={{ width: `${Math.min(100, p.count * 22)}%`, background: p.color }} />
              </div>
            </div>
          ))}
        </section>

        {/* Next actions */}
        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Next actions</h2>
          </div>
          {os.leads.filter(l => !['COMPLETED', 'WON'].includes(l.status)).slice(0, 4).map(l => (
            <div key={l.id} className="action-row">
              <div className="action-dot" />
              <div>
                <b>{l.next}</b>
                <small>{l.name} · {l.company}</small>
              </div>
              <span className="action-date">{l.nextDate}</span>
            </div>
          ))}
        </section>

        {/* Content summary */}
        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Content</h2>
            <button onClick={() => go('/admin/content')} className="view-link">Studio <ChevronRight size={15} /></button>
          </div>
          <div className="content-summary">
            <div className="cs-stat"><strong>{published}</strong><span>Published</span></div>
            <div className="cs-stat"><strong>{ready}</strong><span>Ready</span></div>
            <div className="cs-stat"><strong>{drafts}</strong><span>In progress</span></div>
          </div>
          <button className="text-btn-small" onClick={() => go('/admin/content')}>
            <Sparkles size={14} /> New idea
          </button>
        </section>

      </div>

      {/* Recent activity */}
      <section className="dash-card activity">
        <div className="dash-card-head"><h2>Recent activity</h2></div>
        <div className="activity-list">
          <div className="activity-row"><span className="act-tag new">NEW</span><span>Sharmeen Kabir submitted a website inquiry</span><small>Today</small></div>
          <div className="activity-row"><span className="act-tag">BOOKING</span><span>Tania Rahman confirmed discovery call</span><small>Yesterday</small></div>
          <div className="activity-row"><span className="act-tag">CONTENT</span><span>Article "The customer is not a segment" published</span><small>12 Sep</small></div>
          <div className="activity-row"><span className="act-tag">PROPOSAL</span><span>Proposal sent to Pathao Retail</span><small>19 Sep</small></div>
          <div className="activity-row"><span className="act-tag won">WON</span><span>Meghna Group keynote confirmed</span><small>05 Sep</small></div>
        </div>
      </section>
    </div>
  )
}

function MetricCard({ value, label, icon, accent }: { value: string; label: string; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`metric-card${accent ? ' accent' : ''}`}>
      <div className="metric-icon">{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

// ─── CRM ─────────────────────────────────────────────────────────────────────

function CRMPage({ leads, onUpdate }: Readonly<{ leads: Lead[]; onUpdate: (id: string, status: Lead['status']) => void }>) {
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const stages: Lead['status'][] = ['NEW', 'CONTACTED', 'DISCOVERY', 'PROPOSAL', 'WON', 'ACTIVE CLIENT', 'COMPLETED']

  const filtered = leads.filter(l =>
    (filterStatus === 'All' || l.status === filterStatus) &&
    (l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.company.toLowerCase().includes(query.toLowerCase()))
  )

  return (
    <div className="crm-page">
      <div className="page-title-bar">
        <div>
          <p className="eyebrow">DEMO DATA / PRIVATE BUSINESS OS</p>
          <h1>Leads & relationships.</h1>
          <p className="dash-sub">A clear view of the conversations that need your attention.</p>
        </div>
        <button className="primary"><Plus size={16} /> Add lead</button>
      </div>

      {/* Pipeline overview */}
      <div className="pipeline-overview">
        {stages.map(s => (
          <button
            key={s}
            className={`pipeline-stage${filterStatus === s ? ' active' : ''}`}
            onClick={() => setFilterStatus(filterStatus === s ? 'All' : s)}
          >
            <span className="stage-count">{leads.filter(l => l.status === s).length}</span>
            <span className="stage-name">{s}</span>
          </button>
        ))}
        {filterStatus !== 'All' && (
          <button className="clear-filter" onClick={() => setFilterStatus('All')}>× All</button>
        )}
      </div>

      <div className="crm-body">
        <div className="crm-list-pane">
          <div className="crm-search">
            <label className="search-box">
              <Search size={15} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search leads…" />
            </label>
            <small>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</small>
          </div>
          {filtered.map(lead => (
            <article
              key={lead.id}
              className={`lead-row${selectedLead?.id === lead.id ? ' selected' : ''}`}
              onClick={() => setSelectedLead(lead)}
            >
              <div className="lead-avatar">{lead.name.split(' ').map(w => w[0]).join('')}</div>
              <div className="lead-info">
                <b>{lead.name}</b>
                <small>{lead.company} · {lead.service}</small>
              </div>
              <span className={`status-badge ${lead.status.toLowerCase().replace(/\s/g, '-')}`}>
                {lead.status}
              </span>
              <div className="lead-next">{lead.next}</div>
              <ChevronRight size={16} />
            </article>
          ))}
        </div>

        {selectedLead && (
          <LeadDetail
            lead={selectedLead}
            onClose={() => setSelectedLead(null)}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </div>
  )
}

function LeadDetail({ lead, onClose, onUpdate }: Readonly<{
  lead: Lead
  onClose: () => void
  onUpdate: (id: string, status: Lead['status']) => void
}>) {
  const stages: Lead['status'][] = ['NEW', 'CONTACTED', 'DISCOVERY', 'PROPOSAL', 'WON', 'ACTIVE CLIENT', 'COMPLETED']
  const currentIdx = stages.indexOf(lead.status)

  return (
    <aside className="lead-detail">
      <div className="detail-head">
        <div>
          <h2>{lead.name}</h2>
          <p>{lead.role} · {lead.company}</p>
        </div>
        <button className="close-btn" onClick={onClose}><X size={18} /></button>
      </div>

      <div className="detail-demo-badge">DEMO DATA</div>

      <div className="detail-status-rail">
        {stages.map((s, i) => (
          <button
            key={s}
            className={`rail-stage${i <= currentIdx ? ' done' : ''}${s === lead.status ? ' current' : ''}`}
            onClick={() => onUpdate(lead.id, s)}
          >
            {i < currentIdx ? <Check size={10} /> : null}
            <span>{s}</span>
          </button>
        ))}
      </div>

      <div className="detail-fields">
        <div className="field-row"><span>Email</span><b>{lead.email || '—'}</b></div>
        <div className="field-row"><span>Phone</span><b>{lead.phone || '—'}</b></div>
        <div className="field-row"><span>Source</span><b>{lead.source}</b></div>
        <div className="field-row"><span>Service</span><b>{lead.service}</b></div>
        <div className="field-row"><span>Created</span><b>{lead.createdAt}</b></div>
      </div>

      {lead.requirement && (
        <div className="detail-section">
          <p className="eyebrow">REQUIREMENT</p>
          <p>{lead.requirement}</p>
        </div>
      )}

      <div className="detail-section">
        <p className="eyebrow">NOTES</p>
        <p>{lead.notes || 'No notes yet.'}</p>
      </div>

      <div className="detail-next">
        <p className="eyebrow">NEXT ACTION</p>
        <b>{lead.next}</b>
        <small>{lead.nextDate}</small>
      </div>
    </aside>
  )
}

// ─── CLIENTS ─────────────────────────────────────────────────────────────────

function ClientsPage({ clients }: Readonly<{ clients: ReturnType<typeof useBusinessOS>['clients'] }>) {
  const [selected, setSelected] = useState<typeof clients[0] | null>(null)

  return (
    <div className="clients-page">
      <div className="page-title-bar">
        <div>
          <p className="eyebrow">DEMO DATA / PRIVATE BUSINESS OS</p>
          <h1>Client management.</h1>
          <p className="dash-sub">Active relationships, timelines and next actions.</p>
        </div>
      </div>

      <div className="clients-body">
        <div className="client-list">
          {clients.map(c => (
            <article
              key={c.id}
              className={`client-card${selected?.id === c.id ? ' selected' : ''}`}
              onClick={() => setSelected(c)}
            >
              <div className="client-avatar">{c.name.split(' ').map(w => w[0]).join('')}</div>
              <div className="client-info">
                <b>{c.name}</b>
                <small>{c.company}</small>
                <small>{c.service}</small>
              </div>
              <span className={`status-badge ${c.status.toLowerCase().replace(/\s/g, '-')}`}>
                {c.status}
              </span>
            </article>
          ))}
        </div>

        {selected ? (
          <div className="client-detail">
            <div className="detail-head">
              <div>
                <p className="eyebrow">CLIENT PROFILE</p>
                <h2>{selected.name}</h2>
                <p>{selected.role} · {selected.company}</p>
              </div>
              <button className="close-btn" onClick={() => setSelected(null)}><X size={18} /></button>
            </div>
            <div className="detail-demo-badge">DEMO DATA</div>

            <div className="detail-fields">
              <div className="field-row"><span>Service</span><b>{selected.service}</b></div>
              <div className="field-row"><span>Status</span><b>{selected.status}</b></div>
              <div className="field-row"><span>Email</span><b>{selected.email}</b></div>
              <div className="field-row"><span>Phone</span><b>{selected.phone}</b></div>
            </div>

            <div className="detail-section">
              <p className="eyebrow">TIMELINE</p>
              <div className="timeline">
                {selected.timeline.map((e, i) => (
                  <div key={i} className="timeline-item">
                    <div className="tl-dot" />
                    <div>
                      <b>{e.event}</b>
                      <small>{e.date}</small>
                      {e.note && <p>{e.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <p className="eyebrow">NOTES</p>
              <p>{selected.notes}</p>
            </div>

            <div className="detail-next">
              <p className="eyebrow">NEXT ACTION</p>
              <b>{selected.nextAction}</b>
              <small>{selected.nextActionDate}</small>
            </div>

            {selected.upcomingSessions.length > 0 && (
              <div className="detail-section">
                <p className="eyebrow">UPCOMING SESSIONS</p>
                {selected.upcomingSessions.map(s => (
                  <div key={s.title} className="upcoming-session">
                    <CalendarDays size={14} />
                    <div><b>{s.title}</b><small>{s.date} · {s.time}</small></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="detail-placeholder">
            <Users size={32} />
            <p>Select a client to view their profile.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── CONTENT STUDIO ───────────────────────────────────────────────────────────

function ContentStudioPage({
  content,
  onAdd,
  onUpdate,
}: Readonly<{
  content: ContentItem[]
  onAdd: (item: Omit<ContentItem, 'id'>) => void
  onUpdate: (id: string, status: ContentItem['status']) => void
}>) {
  const [showForm, setShowForm] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [newItem, setNewItem] = useState<Partial<ContentItem>>({ status: 'IDEA', isDemo: true })

  const stages: ContentItem['status'][] = ['IDEA', 'DRAFT', 'REVIEW', 'READY', 'PUBLISHED']

  const counts = {
    IDEA: content.filter(c => c.status === 'IDEA').length,
    DRAFT: content.filter(c => c.status === 'DRAFT').length,
    REVIEW: content.filter(c => c.status === 'REVIEW').length,
    READY: content.filter(c => c.status === 'READY').length,
    PUBLISHED: content.filter(c => c.status === 'PUBLISHED').length,
  }

  const filtered = filterStatus === 'All' ? content : content.filter(c => c.status === filterStatus)

  const handleSave = () => {
    if (!newItem.title) return
    onAdd({
      title: newItem.title || '',
      topic: newItem.topic || '',
      category: newItem.category || 'Strategy',
      platform: newItem.platform || 'Website',
      body: newItem.body || '',
      publishDate: newItem.publishDate || '',
      status: newItem.status as ContentItem['status'] || 'IDEA',
      isDemo: true,
    })
    setShowForm(false)
    setNewItem({ status: 'IDEA', isDemo: true })
  }

  return (
    <div className="content-studio">
      <div className="page-title-bar">
        <div>
          <p className="eyebrow">DEMO DATA / CONTENT STUDIO</p>
          <h1>Ideas in motion.</h1>
          <p className="dash-sub">Organise thinking before it becomes publishing.</p>
        </div>
        <button className="primary" onClick={() => setShowForm(true)}>
          <Sparkles size={16} /> New idea
        </button>
      </div>

      {/* Pipeline counts */}
      <div className="content-pipeline">
        {stages.map(s => (
          <button
            key={s}
            className={`pipeline-stage${filterStatus === s ? ' active' : ''}`}
            onClick={() => setFilterStatus(filterStatus === s ? 'All' : s)}
          >
            <span className="stage-count">{counts[s]}</span>
            <span className="stage-name">{s}</span>
          </button>
        ))}
      </div>

      {/* New idea form */}
      {showForm && (
        <div className="content-form-card">
          <div className="form-head">
            <h3>New idea</h3>
            <button onClick={() => setShowForm(false)}><X size={16} /></button>
          </div>
          <div className="form-grid">
            <label>
              Title
              <input
                placeholder="What's the idea?"
                value={newItem.title || ''}
                onChange={e => setNewItem({ ...newItem, title: e.target.value })}
              />
            </label>
            <label>
              Topic
              <input
                placeholder="Core theme or subject"
                value={newItem.topic || ''}
                onChange={e => setNewItem({ ...newItem, topic: e.target.value })}
              />
            </label>
            <label>
              Category
              <select
                value={newItem.category || 'Strategy'}
                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
              >
                {['Strategy', 'Customer', 'Marketing', 'Growth', 'Bangladesh Business', 'Leadership', 'Future'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Platform
              <input
                placeholder="Website / LinkedIn / Facebook"
                value={newItem.platform || ''}
                onChange={e => setNewItem({ ...newItem, platform: e.target.value })}
              />
            </label>
            <label>
              Status
              <select
                value={newItem.status || 'IDEA'}
                onChange={e => setNewItem({ ...newItem, status: e.target.value as ContentItem['status'] })}
              >
                {stages.map(s => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>
          <div className="form-actions">
            <button className="primary" onClick={handleSave}>Save idea</button>
            <button className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Content table */}
      <div className="content-table">
        <div className="content-table-head">
          <span>Status</span>
          <span>Title</span>
          <span>Category</span>
          <span>Platform</span>
          <span>Action</span>
        </div>
        {filtered.map(item => (
          <div key={item.id} className="content-row">
            <span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
            <div>
              <b>{item.title}</b>
              {item.topic && <small>{item.topic}</small>}
            </div>
            <small>{item.category}</small>
            <small>{item.platform}</small>
            <select
              value={item.status}
              onChange={e => onUpdate(item.id, e.target.value as ContentItem['status'])}
              className="status-select"
            >
              {stages.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── ANALYTICS ────────────────────────────────────────────────────────────────

function AnalyticsPage() {
  const { websiteVisitors, topIdeas, sources, conversion } = analyticsData
  const maxVisitors = Math.max(...websiteVisitors.map(d => d.value))
  const maxConversion = conversion[0].count

  return (
    <div className="analytics-page">
      <div className="page-title-bar">
        <div>
          <p className="eyebrow">DEMO DATA / ANALYTICS</p>
          <h1>Brand & business.</h1>
          <p className="dash-sub">A clear view of reach, content and conversion. All numbers are illustrative demo data.</p>
        </div>
      </div>

      <div className="analytics-grid">

        {/* Website visitors */}
        <section className="analytics-card wide">
          <div className="analytics-card-head">
            <h2>Website visitors</h2>
            <span className="analytics-tag"><TrendingUp size={13} /> +33% vs last month</span>
          </div>
          <div className="bar-chart">
            {websiteVisitors.map(d => (
              <div key={d.label} className="bar-col">
                <div className="bar-fill" style={{ height: `${(d.value / maxVisitors) * 100}%` }}>
                  <span className="bar-value">{d.value}</span>
                </div>
                <span className="bar-label">{d.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Top ideas */}
        <section className="analytics-card">
          <div className="analytics-card-head">
            <h2>Most read ideas</h2>
            <FileText size={16} />
          </div>
          {topIdeas.map(idea => (
            <div key={idea.title} className="top-idea-row">
              <div>
                <span className="cat-badge small">{idea.category}</span>
                <b>{idea.title}</b>
              </div>
              <span className="idea-views">{idea.views.toLocaleString()}</span>
            </div>
          ))}
        </section>

        {/* Sources */}
        <section className="analytics-card">
          <div className="analytics-card-head">
            <h2>Inquiry sources</h2>
            <BarChart2 size={16} />
          </div>
          {sources.map(s => (
            <div key={s.label} className="source-row">
              <span>{s.label}</span>
              <div className="source-bar">
                <div style={{ width: `${s.pct}%` }} />
              </div>
              <span className="source-pct">{s.pct}%</span>
            </div>
          ))}
        </section>

        {/* Conversion funnel */}
        <section className="analytics-card wide">
          <div className="analytics-card-head">
            <h2>Conversion funnel</h2>
            <span className="analytics-tag">Inquiry → Client</span>
          </div>
          <div className="funnel">
            {conversion.map((stage, i) => (
              <div key={stage.stage} className="funnel-row">
                <span className="funnel-label">{stage.stage}</span>
                <div className="funnel-bar">
                  <div
                    className="funnel-fill"
                    style={{ width: `${(stage.count / maxConversion) * 100}%` }}
                  />
                </div>
                <span className="funnel-count">{stage.count}</span>
                {i > 0 && (
                  <span className="funnel-rate">
                    {Math.round((stage.count / conversion[i - 1].count) * 100)}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default App
