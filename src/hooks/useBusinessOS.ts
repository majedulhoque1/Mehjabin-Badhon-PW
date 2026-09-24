import { useCallback, useEffect, useReducer } from 'react'
import {
  seedLeads,
  seedClients,
  seedSessions,
  seedTasks,
  seedContent,
  seedActivity,
  type Lead,
  type LeadStatus,
  type Client,
  type Session,
  type Task,
  type ContentItem,
  type ContentStatus,
  type ActivityEntry,
} from '../data/mockData'
import { addDays, dateOnlyLabel, isoDate, longDayLabel, todayISO } from '../lib/dates'

export type { Lead, LeadStatus, Client, Session, Task, ContentItem, ContentStatus, ActivityEntry }

const STORAGE_KEY = 'mehjabin-business-os-v1'

type State = {
  leads: Lead[]
  clients: Client[]
  sessions: Session[]
  tasks: Task[]
  content: ContentItem[]
  activity: ActivityEntry[]
}

export type BookingInfo = {
  name: string
  company: string
  service: string
  email: string
  phone: string
  requirement: string
}

export type NewLeadInfo = {
  name: string
  company?: string
  role?: string
  email?: string
  phone?: string
  service: string
  source?: string
  requirement?: string
}

type Action =
  | { type: 'ADD_BOOKING'; id: string; booking: BookingInfo }
  | { type: 'ADD_LEAD'; id: string; lead: NewLeadInfo }
  | { type: 'SET_LEAD_STATUS'; id: string; status: LeadStatus }
  | { type: 'CONVERT_TO_CLIENT'; leadId: string; clientId: string }
  | { type: 'TOGGLE_TASK'; id: string }
  | { type: 'SAVE_CONTENT'; item: ContentItem }
  | { type: 'SET_CONTENT_STATUS'; id: string; status: ContentStatus }
  | { type: 'RESET_DEMO' }

function seedState(): State {
  return {
    leads: seedLeads,
    clients: seedClients,
    sessions: seedSessions,
    tasks: seedTasks,
    content: seedContent,
    activity: seedActivity,
  }
}

function loadInitial(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedState()
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.leads) || !Array.isArray(parsed.content)) return seedState()
    return parsed as State
  } catch {
    return seedState()
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_BOOKING': {
      const { id, booking } = action
      const createdLabel = dateOnlyLabel(new Date())
      const lead: Lead = {
        id,
        name: booking.name || 'New Inquiry',
        company: booking.company || 'Independent',
        role: '',
        phone: booking.phone || '',
        email: booking.email || '',
        source: 'Website booking',
        service: booking.service,
        requirement: booking.requirement || '',
        status: 'NEW',
        notes: 'Created via the website booking form.',
        createdAt: createdLabel,
        isDemo: true,
      }
      const task: Task = {
        id: `task-${id}`,
        title: 'Reply to new inquiry',
        relatedType: 'lead',
        relatedId: id,
        relatedName: lead.name,
        company: lead.company,
        dueISO: todayISO(),
        dueLabel: createdLabel,
        done: false,
        isDemo: true,
      }
      const activity: ActivityEntry = {
        id: `act-${id}`,
        tag: 'BOOKING',
        text: `${lead.name} booked a ${lead.service} conversation`,
        dateISO: todayISO(),
        isDemo: true,
      }
      return { ...state, leads: [lead, ...state.leads], tasks: [task, ...state.tasks], activity: [activity, ...state.activity] }
    }

    case 'ADD_LEAD': {
      const { id, lead } = action
      const createdLabel = dateOnlyLabel(new Date())
      const newLead: Lead = {
        id,
        name: lead.name,
        company: lead.company || 'Independent',
        role: lead.role || '',
        phone: lead.phone || '',
        email: lead.email || '',
        source: lead.source || 'Manual entry',
        service: lead.service || 'Business Strategy',
        requirement: lead.requirement || '',
        status: 'NEW',
        notes: 'Added manually in the Business OS.',
        createdAt: createdLabel,
        isDemo: true,
      }
      const activity: ActivityEntry = {
        id: `act-${id}`,
        tag: 'NEW',
        text: `${newLead.name} added to the pipeline`,
        dateISO: todayISO(),
        isDemo: true,
      }
      return { ...state, leads: [newLead, ...state.leads], activity: [activity, ...state.activity] }
    }

    case 'SET_LEAD_STATUS': {
      const leads = state.leads.map(l => (l.id === action.id ? { ...l, status: action.status } : l))
      const lead = leads.find(l => l.id === action.id)
      const activity =
        lead && action.status === 'WON'
          ? [{ id: `act-won-${action.id}-${Date.now()}`, tag: 'WON' as const, text: `${lead.name} — ${lead.service} confirmed`, dateISO: todayISO(), isDemo: true }, ...state.activity]
          : state.activity
      return { ...state, leads, activity }
    }

    case 'CONVERT_TO_CLIENT': {
      const lead = state.leads.find(l => l.id === action.leadId)
      if (!lead) return state
      const createdLabel = dateOnlyLabel(new Date())
      const sessionDate = addDays(new Date(), 5)
      const taskDueDate = addDays(new Date(), 2)

      const client: Client = {
        id: action.clientId,
        leadId: lead.id,
        name: lead.name,
        company: lead.company,
        role: lead.role,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        status: 'ACTIVE',
        timeline: [
          { event: 'Inquiry received', date: lead.createdAt },
          { event: 'Converted to client', date: createdLabel },
        ],
        notes: lead.notes,
        isDemo: true,
      }
      const session: Session = {
        id: `session-${action.clientId}`,
        clientName: lead.name,
        company: lead.company,
        service: `${lead.service} — Kickoff`,
        dateISO: isoDate(sessionDate),
        date: longDayLabel(sessionDate),
        time: '11:00 AM',
        type: 'Discovery',
        status: 'Upcoming',
        isDemo: true,
      }
      const task: Task = {
        id: `task-${action.clientId}`,
        title: 'Prepare kickoff agenda',
        relatedType: 'client',
        relatedId: action.clientId,
        relatedName: lead.name,
        company: lead.company,
        dueISO: isoDate(taskDueDate),
        dueLabel: dateOnlyLabel(taskDueDate),
        done: false,
        isDemo: true,
      }
      const activity: ActivityEntry = {
        id: `act-client-${action.clientId}`,
        tag: 'CLIENT',
        text: `${lead.name} became an active client`,
        dateISO: todayISO(),
        isDemo: true,
      }

      return {
        ...state,
        leads: state.leads.map(l => (l.id === lead.id ? { ...l, status: 'ACTIVE CLIENT' } : l)),
        clients: [client, ...state.clients],
        sessions: [session, ...state.sessions],
        tasks: [
          task,
          ...state.tasks.map(t => (t.relatedType === 'lead' && t.relatedId === lead.id ? { ...t, done: true } : t)),
        ],
        activity: [activity, ...state.activity],
      }
    }

    case 'TOGGLE_TASK':
      return { ...state, tasks: state.tasks.map(t => (t.id === action.id ? { ...t, done: !t.done } : t)) }

    case 'SAVE_CONTENT': {
      const exists = state.content.some(c => c.id === action.item.id)
      const content = exists ? state.content.map(c => (c.id === action.item.id ? action.item : c)) : [action.item, ...state.content]
      return { ...state, content }
    }

    case 'SET_CONTENT_STATUS': {
      const willPublishNow = action.status === 'PUBLISHED'
      const content = state.content.map(c =>
        c.id === action.id
          ? { ...c, status: action.status, publishDate: willPublishNow && !c.publishDate ? dateOnlyLabel(new Date()) : c.publishDate }
          : c
      )
      const item = content.find(c => c.id === action.id)
      const activity =
        willPublishNow && item
          ? [{ id: `act-pub-${action.id}-${Date.now()}`, tag: 'CONTENT' as const, text: `Article "${item.title}" published`, dateISO: todayISO(), isDemo: true }, ...state.activity]
          : state.activity
      return { ...state, content, activity }
    }

    case 'RESET_DEMO':
      return seedState()

    default:
      return state
  }
}

export function useBusinessOS() {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage unavailable (private browsing, quota) — the demo still works in-memory.
    }
  }, [state])

  const addBooking = useCallback((booking: BookingInfo) => {
    const id = `lead-${Date.now()}`
    dispatch({ type: 'ADD_BOOKING', id, booking })
    return id
  }, [])

  const addLead = useCallback((lead: NewLeadInfo) => {
    const id = `lead-${Date.now()}`
    dispatch({ type: 'ADD_LEAD', id, lead })
    return id
  }, [])

  const setLeadStatus = useCallback((id: string, status: LeadStatus) => dispatch({ type: 'SET_LEAD_STATUS', id, status }), [])

  const convertToClient = useCallback((leadId: string) => {
    const clientId = `client-${Date.now()}`
    dispatch({ type: 'CONVERT_TO_CLIENT', leadId, clientId })
    return clientId
  }, [])

  const toggleTask = useCallback((id: string) => dispatch({ type: 'TOGGLE_TASK', id }), [])

  const saveContent = useCallback((item: Omit<ContentItem, 'id' | 'isDemo'> & { id?: string }) => {
    const id = item.id || `c-${Date.now()}`
    dispatch({ type: 'SAVE_CONTENT', item: { ...item, id, isDemo: true } })
    return id
  }, [])

  const setContentStatus = useCallback((id: string, status: ContentStatus) => dispatch({ type: 'SET_CONTENT_STATUS', id, status }), [])

  const resetDemo = useCallback(() => dispatch({ type: 'RESET_DEMO' }), [])

  const today = todayISO()
  const todaysSessions = state.sessions.filter(s => s.status === 'Upcoming' && s.dateISO === today)
  const upcomingSessions = [...state.sessions]
    .filter(s => s.status === 'Upcoming')
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO))
  const openTasks = [...state.tasks].filter(t => !t.done).sort((a, b) => a.dueISO.localeCompare(b.dueISO))
  const newInquiries = state.leads.filter(l => l.status === 'NEW').length
  const pendingFollowUps = openTasks.filter(t => {
    if (t.relatedType !== 'lead') return false
    const lead = state.leads.find(l => l.id === t.relatedId)
    return lead ? lead.status !== 'NEW' : true
  }).length
  const activeClients = state.clients.filter(c => c.status === 'ACTIVE').length
  const recentActivity = [...state.activity].sort((a, b) => b.dateISO.localeCompare(a.dateISO))
  const publishedContent = state.content.filter(c => c.status === 'PUBLISHED')

  return {
    ...state,
    todaysSessions,
    upcomingSessions,
    openTasks,
    newInquiries,
    pendingFollowUps,
    activeClients,
    recentActivity,
    publishedContent,
    addBooking,
    addLead,
    setLeadStatus,
    convertToClient,
    toggleTask,
    saveContent,
    setContentStatus,
    resetDemo,
  }
}
