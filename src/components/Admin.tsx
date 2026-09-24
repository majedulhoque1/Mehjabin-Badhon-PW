import { useEffect, useState } from 'react'
import {
  ArrowRight, CalendarDays, Check, ChevronRight, CircleCheck, Circle,
  Plus, RotateCcw, Search, Sparkles, TrendingUp, Users, X,
} from 'lucide-react'
import type { useBusinessOS, Lead, LeadStatus, ContentItem, ContentStatus, Task, Client } from '../hooks/useBusinessOS'
import { articles as baseArticles } from '../data/mockData'
import { relativeDayLabel } from '../lib/dates'
import { SiteHeader } from './SiteHeader'
import type { Go } from '../router'

type OS = ReturnType<typeof useBusinessOS>
const titleToPublicSlug = new Map(baseArticles.map(a => [a.title, a.slug]))

const LEAD_STAGES: LeadStatus[] = ['NEW', 'CONTACTED', 'DISCOVERY', 'PROPOSAL', 'WON', 'ACTIVE CLIENT', 'COMPLETED']
const CONTENT_STAGES: ContentStatus[] = ['IDEA', 'DRAFT', 'REVIEW', 'READY', 'PUBLISHED']
const CATEGORY_OPTIONS = ['Strategy', 'Customer', 'Marketing', 'Growth', 'Bangladesh Business', 'Leadership', 'Future']
const SERVICE_OPTIONS = ['Business Strategy', 'Customer & Market Insights', 'Growth Strategy', '1:1 Advisory', 'Workshops & Training', 'Speaking']

export function Admin({ path, go, os }: Readonly<{ path: string; go: Go; os: OS }>) {
  const [justConvertedClientId, setJustConvertedClientId] = useState<string | null>(null)

  const handleConvert = (leadId: string) => {
    const clientId = os.convertToClient(leadId)
    setJustConvertedClientId(clientId)
    return clientId
  }

  return (
    <div className="admin-layout">
      <SiteHeader admin onNavigate={go} currentPath={path} />
      <main className="admin-main">
        {path === '/admin/crm' && (
          <CRMPage
            leads={os.leads}
            tasks={os.tasks}
            onUpdateStatus={os.setLeadStatus}
            onConvert={handleConvert}
            onAddLead={os.addLead}
            onToggleTask={os.toggleTask}
            go={go}
          />
        )}
        {path === '/admin/clients' && <ClientsPage clients={os.clients} tasks={os.tasks} autoSelectId={justConvertedClientId} />}
        {path === '/admin/content' && (
          <ContentStudioPage content={os.content} onSave={os.saveContent} onSetStatus={os.setContentStatus} go={go} />
        )}
        {path === '/admin' && <DashboardPage os={os} go={go} />}
      </main>
    </div>
  )
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

function DashboardPage({ os, go }: Readonly<{ os: OS; go: Go }>) {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const published = os.content.filter(c => c.status === 'PUBLISHED').length
  const inProgress = os.content.filter(c => ['DRAFT', 'IDEA', 'REVIEW'].includes(c.status)).length
  const ready = os.content.filter(c => c.status === 'READY').length

  const maxPipeline = Math.max(
    os.leads.filter(l => l.status === 'NEW').length,
    os.leads.filter(l => l.status === 'DISCOVERY').length,
    os.leads.filter(l => l.status === 'PROPOSAL').length,
    os.activeClients,
    1
  )
  const pipeline = [
    { label: 'New Leads', count: os.leads.filter(l => l.status === 'NEW').length, color: 'var(--rust)' },
    { label: 'Discovery', count: os.leads.filter(l => l.status === 'DISCOVERY').length, color: '#8a6a1f' },
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
        <div className="dash-header-actions">
          <button className="secondary-btn" onClick={os.resetDemo}>
            <RotateCcw size={14} /> Reset demo data
          </button>
          <button className="primary" onClick={() => go('/book')}>
            New booking <CalendarDays size={16} />
          </button>
        </div>
      </div>

      <div className="metric-grid">
        <MetricCard value={String(os.todaysSessions.length).padStart(2, '0')} label="Today's sessions" icon={<CalendarDays size={18} />} />
        <MetricCard value={String(os.newInquiries).padStart(2, '0')} label="New inquiries" icon={<Users size={18} />} accent />
        <MetricCard value={String(os.pendingFollowUps).padStart(2, '0')} label="Pending follow-ups" icon={<ArrowRight size={18} />} />
        <MetricCard value={String(os.activeClients).padStart(2, '0')} label="Active clients" icon={<TrendingUp size={18} />} />
      </div>

      <div className="dash-grid">

        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Upcoming sessions</h2>
            <button onClick={() => go('/admin/clients')} className="view-link">View clients <ChevronRight size={15} /></button>
          </div>
          {os.upcomingSessions.length === 0
            ? <p className="empty-note">No upcoming sessions scheduled.</p>
            : os.upcomingSessions.slice(0, 4).map(s => (
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
                <div style={{ width: `${(p.count / maxPipeline) * 100}%`, background: p.color }} />
              </div>
            </div>
          ))}
        </section>

        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Next actions</h2>
          </div>
          {os.openTasks.length === 0
            ? <p className="empty-note">No open follow-ups. Nice.</p>
            : os.openTasks.slice(0, 4).map(t => (
              <button key={t.id} className="action-row action-row-btn" onClick={() => os.toggleTask(t.id)}>
                <Circle size={14} className="action-dot-icon" />
                <div>
                  <b>{t.title}</b>
                  <small>{t.relatedName} · {t.company}</small>
                </div>
                <span className="action-date">{t.dueLabel}</span>
              </button>
            ))}
        </section>

        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Content</h2>
            <button onClick={() => go('/admin/content')} className="view-link">Studio <ChevronRight size={15} /></button>
          </div>
          <div className="content-summary">
            <div className="cs-stat"><strong>{published}</strong><span>Published</span></div>
            <div className="cs-stat"><strong>{ready}</strong><span>Ready</span></div>
            <div className="cs-stat"><strong>{inProgress}</strong><span>In progress</span></div>
          </div>
          <button className="text-btn-small" onClick={() => go('/admin/content')}>
            <Sparkles size={14} /> New idea
          </button>
        </section>

      </div>

      <section className="dash-card activity">
        <div className="dash-card-head"><h2>Recent activity</h2></div>
        <div className="activity-list">
          {os.recentActivity.slice(0, 6).map(a => (
            <div key={a.id} className="activity-row">
              <span className={`act-tag ${a.tag.toLowerCase()}`}>{a.tag}</span>
              <span>{a.text}</span>
              <small>{relativeDayLabel(a.dateISO)}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function MetricCard({ value, label, icon, accent }: Readonly<{ value: string; label: string; icon: React.ReactNode; accent?: boolean }>) {
  return (
    <div className={`metric-card${accent ? ' accent' : ''}`}>
      <div className="metric-icon">{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  )
}

// ─── CRM ─────────────────────────────────────────────────────────────────────

function CRMPage({ leads, tasks, onUpdateStatus, onConvert, onAddLead, onToggleTask, go }: Readonly<{
  leads: Lead[]
  tasks: Task[]
  onUpdateStatus: (id: string, status: LeadStatus) => void
  onConvert: (leadId: string) => string
  onAddLead: OS['addLead']
  onToggleTask: (id: string) => void
  go: Go
}>) {
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const selectedLead = leads.find(l => l.id === selectedId) ?? null

  const filtered = leads.filter(l =>
    (filterStatus === 'All' || l.status === filterStatus) &&
    (l.name.toLowerCase().includes(query.toLowerCase()) || l.company.toLowerCase().includes(query.toLowerCase()))
  )

  const earliestTaskFor = (leadId: string) => tasks.find(t => t.relatedType === 'lead' && t.relatedId === leadId && !t.done)

  return (
    <div className="crm-page">
      <div className="page-title-bar">
        <div>
          <p className="eyebrow">DEMO DATA / PRIVATE BUSINESS OS</p>
          <h1>Leads & relationships.</h1>
          <p className="dash-sub">A clear view of the conversations that need your attention.</p>
        </div>
        <button className="primary" onClick={() => setShowAddForm(true)}><Plus size={16} /> Add lead</button>
      </div>

      {showAddForm && <AddLeadForm onAdd={onAddLead} onClose={() => setShowAddForm(false)} />}

      <div className="pipeline-overview">
        {LEAD_STAGES.map(s => (
          <button
            key={s}
            className={`pipeline-stage${filterStatus === s ? ' active' : ''}`}
            onClick={() => setFilterStatus(filterStatus === s ? 'All' : s)}
          >
            <span className="stage-count">{leads.filter(l => l.status === s).length}</span>
            <span className="stage-name">{s}</span>
          </button>
        ))}
        {filterStatus !== 'All' && <button className="clear-filter" onClick={() => setFilterStatus('All')}>&times; All</button>}
      </div>

      <div className="crm-body">
        <div className="crm-list-pane">
          <div className="crm-search">
            <label className="search-box">
              <Search size={15} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search leads..." />
            </label>
            <small>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</small>
          </div>
          {filtered.map(lead => {
            const task = earliestTaskFor(lead.id)
            return (
              <article
                key={lead.id}
                className={`lead-row${selectedId === lead.id ? ' selected' : ''}`}
                onClick={() => setSelectedId(lead.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelectedId(lead.id))}
              >
                <div className="lead-avatar">{lead.name.split(' ').map(w => w[0]).join('')}</div>
                <div className="lead-info">
                  <b>{lead.name}</b>
                  <small>{lead.company} · {lead.service}</small>
                </div>
                <span className={`status-badge ${lead.status.toLowerCase().replace(/\s/g, '-')}`}>{lead.status}</span>
                <div className="lead-next">{task ? `${task.title} · ${task.dueLabel}` : '—'}</div>
                <ChevronRight size={16} />
              </article>
            )
          })}
        </div>

        {selectedLead && (
          <LeadDetail
            key={selectedLead.id}
            lead={selectedLead}
            tasks={tasks.filter(t => t.relatedType === 'lead' && t.relatedId === selectedLead.id)}
            onClose={() => setSelectedId(null)}
            onUpdateStatus={onUpdateStatus}
            onConvert={onConvert}
            onToggleTask={onToggleTask}
            go={go}
          />
        )}
      </div>
    </div>
  )
}

function AddLeadForm({ onAdd, onClose }: Readonly<{ onAdd: OS['addLead']; onClose: () => void }>) {
  const [form, setForm] = useState({ name: '', company: '', role: '', email: '', phone: '', service: SERVICE_OPTIONS[0], requirement: '' })
  const update = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v })

  return (
    <div className="content-form-card">
      <div className="form-head">
        <h3>Add lead</h3>
        <button onClick={onClose}><X size={16} /></button>
      </div>
      <div className="form-grid">
        <label>Name<input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Full name" /></label>
        <label>Company<input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Company" /></label>
        <label>Role<input value={form.role} onChange={e => update('role', e.target.value)} placeholder="Their role" /></label>
        <label>Email<input value={form.email} onChange={e => update('email', e.target.value)} placeholder="email@example.com" /></label>
        <label>Phone<input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+880 ..." /></label>
        <label>
          Service
          <select value={form.service} onChange={e => update('service', e.target.value)}>
            {SERVICE_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className="wide">Requirement<textarea rows={3} value={form.requirement} onChange={e => update('requirement', e.target.value)} placeholder="What are they trying to solve?" /></label>
      </div>
      <div className="form-actions">
        <button
          className="primary"
          disabled={!form.name.trim()}
          onClick={() => { onAdd(form); onClose() }}
        >
          Add lead
        </button>
        <button className="secondary-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  )
}

function LeadDetail({ lead, tasks, onClose, onUpdateStatus, onConvert, onToggleTask, go }: Readonly<{
  lead: Lead
  tasks: Task[]
  onClose: () => void
  onUpdateStatus: (id: string, status: LeadStatus) => void
  onConvert: (leadId: string) => string
  onToggleTask: (id: string) => void
  go: Go
}>) {
  const [justConverted, setJustConverted] = useState(false)
  const currentIdx = LEAD_STAGES.indexOf(lead.status)
  const canConvert = !['ACTIVE CLIENT', 'COMPLETED'].includes(lead.status)

  const handleStageClick = (stage: LeadStatus) => {
    if (stage === 'ACTIVE CLIENT') {
      onConvert(lead.id)
      setJustConverted(true)
    } else {
      onUpdateStatus(lead.id, stage)
    }
  }

  return (
    <aside className="lead-detail">
      <div className="detail-head">
        <div>
          <h2>{lead.name}</h2>
          <p>{lead.role || lead.company} · {lead.company}</p>
        </div>
        <button className="close-btn" onClick={onClose}><X size={18} /></button>
      </div>

      <div className="detail-demo-badge">DEMO DATA</div>

      {justConverted && (
        <div className="convert-success">
          <Check size={16} /> Converted to an active client.
          <button className="text-button small" onClick={() => go('/admin/clients')}>Open client &rarr;</button>
        </div>
      )}

      <div className="detail-status-rail">
        {LEAD_STAGES.map((s, i) => (
          <button
            key={s}
            className={`rail-stage${i <= currentIdx ? ' done' : ''}${s === lead.status ? ' current' : ''}`}
            onClick={() => handleStageClick(s)}
          >
            {i < currentIdx ? <Check size={10} /> : null}
            <span>{s}</span>
          </button>
        ))}
      </div>

      {canConvert && (
        <button className="primary convert-btn" onClick={() => { onConvert(lead.id); setJustConverted(true) }}>
          Convert to client <ArrowRight size={15} />
        </button>
      )}

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

      <div className="detail-section">
        <p className="eyebrow">FOLLOW-UPS</p>
        {tasks.length === 0
          ? <p className="empty-note">No follow-up tasks.</p>
          : tasks.map(t => (
            <button key={t.id} className="task-row" onClick={() => onToggleTask(t.id)}>
              {t.done ? <CircleCheck size={15} className="task-done-icon" /> : <Circle size={15} />}
              <span className={t.done ? 'task-done-text' : ''}>{t.title}</span>
              <small>{t.dueLabel}</small>
            </button>
          ))}
      </div>
    </aside>
  )
}

// ─── CLIENTS ─────────────────────────────────────────────────────────────────

function ClientsPage({ clients, tasks, autoSelectId }: Readonly<{ clients: Client[]; tasks: Task[]; autoSelectId: string | null }>) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    if (autoSelectId) setSelectedId(autoSelectId)
  }, [autoSelectId])

  const selected = clients.find(c => c.id === selectedId) ?? null

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
              className={`client-card${selectedId === c.id ? ' selected' : ''}`}
              onClick={() => setSelectedId(c.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelectedId(c.id))}
            >
              <div className="client-avatar">{c.name.split(' ').map(w => w[0]).join('')}</div>
              <div className="client-info">
                <b>{c.name}</b>
                <small>{c.company}</small>
                <small>{c.service}</small>
              </div>
              <span className={`status-badge ${c.status.toLowerCase().replace(/\s/g, '-')}`}>{c.status}</span>
            </article>
          ))}
        </div>

        {selected ? (
          <ClientDetail client={selected} tasks={tasks.filter(t => t.relatedType === 'client' && t.relatedId === selected.id)} onClose={() => setSelectedId(null)} />
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

function ClientDetail({ client, tasks, onClose }: Readonly<{ client: Client; tasks: Task[]; onClose: () => void }>) {
  return (
    <div className="client-detail">
      <div className="detail-head">
        <div>
          <p className="eyebrow">CLIENT PROFILE</p>
          <h2>{client.name}</h2>
          <p>{client.role || client.company} · {client.company}</p>
        </div>
        <button className="close-btn" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="detail-demo-badge">DEMO DATA</div>

      <div className="detail-fields">
        <div className="field-row"><span>Service</span><b>{client.service}</b></div>
        <div className="field-row"><span>Status</span><b>{client.status}</b></div>
        <div className="field-row"><span>Email</span><b>{client.email}</b></div>
        <div className="field-row"><span>Phone</span><b>{client.phone}</b></div>
      </div>

      <div className="detail-section">
        <p className="eyebrow">TIMELINE</p>
        <div className="timeline">
          {client.timeline.map((e, i) => (
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
        <p>{client.notes}</p>
      </div>

      <div className="detail-section">
        <p className="eyebrow">TASKS</p>
        {tasks.length === 0
          ? <p className="empty-note">No open tasks.</p>
          : tasks.map(t => (
            <div key={t.id} className="task-row">
              {t.done ? <CircleCheck size={15} className="task-done-icon" /> : <Circle size={15} />}
              <span className={t.done ? 'task-done-text' : ''}>{t.title}</span>
              <small>{t.dueLabel}</small>
            </div>
          ))}
      </div>
    </div>
  )
}

// ─── CONTENT STUDIO ───────────────────────────────────────────────────────────

const BLANK_CONTENT: Omit<ContentItem, 'id' | 'isDemo'> = {
  title: '', topic: '', category: 'Strategy', platform: 'Website', body: '', media: '', publishDate: '', status: 'IDEA',
}

function ContentStudioPage({ content, onSave, onSetStatus, go }: Readonly<{
  content: ContentItem[]
  onSave: OS['saveContent']
  onSetStatus: (id: string, status: ContentStatus) => void
  go: Go
}>) {
  const [showForm, setShowForm] = useState(false)
  const [draft, setDraft] = useState<ContentItem | (Omit<ContentItem, 'id' | 'isDemo'> & { id?: string })>(BLANK_CONTENT)
  const [filterStatus, setFilterStatus] = useState<string>('All')

  const counts = Object.fromEntries(CONTENT_STAGES.map(s => [s, content.filter(c => c.status === s).length])) as Record<ContentStatus, number>
  const filtered = filterStatus === 'All' ? content : content.filter(c => c.status === filterStatus)

  const openNew = () => { setDraft(BLANK_CONTENT); setShowForm(true) }
  const openEdit = (item: ContentItem) => { setDraft(item); setShowForm(true) }

  const handleSave = () => {
    if (!draft.title.trim()) return
    onSave(draft)
    setShowForm(false)
  }

  return (
    <div className="content-studio">
      <div className="page-title-bar">
        <div>
          <p className="eyebrow">DEMO DATA / CONTENT STUDIO</p>
          <h1>Ideas in motion.</h1>
          <p className="dash-sub">Organise thinking before it becomes publishing.</p>
        </div>
        <button className="primary" onClick={openNew}><Sparkles size={16} /> New idea</button>
      </div>

      <div className="content-pipeline">
        {CONTENT_STAGES.map(s => (
          <button key={s} className={`pipeline-stage${filterStatus === s ? ' active' : ''}`} onClick={() => setFilterStatus(filterStatus === s ? 'All' : s)}>
            <span className="stage-count">{counts[s]}</span>
            <span className="stage-name">{s}</span>
          </button>
        ))}
        {filterStatus !== 'All' && <button className="clear-filter" onClick={() => setFilterStatus('All')}>&times; All</button>}
      </div>

      {showForm && (
        <div className="content-form-card">
          <div className="form-head">
            <h3>{('id' in draft && draft.id) ? 'Edit idea' : 'New idea'}</h3>
            <button onClick={() => setShowForm(false)}><X size={16} /></button>
          </div>
          <div className="form-grid">
            <label>Title<input placeholder="What's the idea?" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} /></label>
            <label>Topic<input placeholder="Core theme or subject" value={draft.topic} onChange={e => setDraft({ ...draft, topic: e.target.value })} /></label>
            <label>
              Category
              <select value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value })}>
                {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>Platform<input placeholder="Website / LinkedIn / Facebook" value={draft.platform} onChange={e => setDraft({ ...draft, platform: e.target.value })} /></label>
            <label>Media note<input placeholder="e.g. Photo carousel, 3 slides" value={draft.media} onChange={e => setDraft({ ...draft, media: e.target.value })} /></label>
            <label>
              Status
              <select value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value as ContentStatus })}>
                {CONTENT_STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
            </label>
            <label className="wide">Body<textarea rows={5} placeholder="Draft the piece here..." value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} /></label>
          </div>
          <div className="form-actions">
            <button className="primary" disabled={!draft.title.trim()} onClick={handleSave}>Save idea</button>
            <button className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

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
            <button className="content-row-title" onClick={() => openEdit(item)}>
              <b>{item.title}</b>
              {item.topic && <small>{item.topic}</small>}
            </button>
            <small>{item.category}</small>
            <small>{item.platform}</small>
            <div className="content-row-actions">
              <select value={item.status} onChange={e => onSetStatus(item.id, e.target.value as ContentStatus)} className="status-select">
                {CONTENT_STAGES.map(s => <option key={s}>{s}</option>)}
              </select>
              {item.status === 'READY' && (
                <button className="text-btn-small" onClick={() => onSetStatus(item.id, 'PUBLISHED')}>Publish</button>
              )}
              {item.status === 'PUBLISHED' && (
                <button className="text-btn-small" onClick={() => go(`/ideas/${titleToPublicSlug.get(item.title) ?? `demo-${item.id}`}`)}>View live</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
