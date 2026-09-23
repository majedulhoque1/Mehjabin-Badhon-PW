import { useState } from 'react'
import {
  seedLeads,
  seedClients,
  seedSessions,
  seedContent,
  type Lead,
  type Client,
  type Session,
  type ContentItem,
} from '../data/mockData'

export type { Lead, Client, Session, ContentItem }

export function useBusinessOS() {
  const [leads, setLeads] = useState<Lead[]>(seedLeads)
  const [clients] = useState<Client[]>(seedClients)
  const [sessions] = useState<Session[]>(seedSessions)
  const [content, setContent] = useState<ContentItem[]>(seedContent)

  const addLead = (info: { name: string; company: string; service: string; email?: string; phone?: string; requirement?: string }) => {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: info.name || 'New Inquiry',
      company: info.company || 'Independent',
      role: '',
      phone: info.phone || '',
      email: info.email || '',
      source: 'Website booking',
      service: info.service,
      requirement: info.requirement || '',
      status: 'NEW',
      notes: 'Created via website booking form.',
      next: 'Reply to inquiry · Today',
      nextDate: 'Today',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      isDemo: true,
    }
    setLeads(prev => [newLead, ...prev])
  }

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, status } : l)))
  }

  const addContentItem = (item: Omit<ContentItem, 'id'>) => {
    const newItem: ContentItem = { ...item, id: `c-${Date.now()}` }
    setContent(prev => [newItem, ...prev])
  }

  const updateContentStatus = (id: string, status: ContentItem['status']) => {
    setContent(prev => prev.map(c => (c.id === id ? { ...c, status } : c)))
  }

  const upcomingSessions = sessions.filter(s => s.status === 'Upcoming')
  const newInquiries = leads.filter(l => l.status === 'NEW').length
  const pendingFollowUps = leads.filter(l => ['CONTACTED', 'PROPOSAL'].includes(l.status)).length
  const activeClients = clients.filter(c => c.status === 'ACTIVE').length

  return {
    leads,
    clients,
    sessions,
    content,
    upcomingSessions,
    newInquiries,
    pendingFollowUps,
    activeClients,
    addLead,
    updateLeadStatus,
    addContentItem,
    updateContentStatus,
  }
}
