import { addDays, dateOnlyLabel, isoDate, longDayLabel } from '../lib/dates'

const now = new Date()
const d = (n: number) => addDays(now, n)
const dISO = (n: number) => isoDate(d(n))
const dLabel = (n: number) => dateOnlyLabel(d(n))
const dLong = (n: number) => longDayLabel(d(n))

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type Idea = {
  title: string
  category: string
  excerpt: string
  date: string
  type: 'Article' | 'Insight' | 'Video' | 'Talk'
}

export type Article = Idea & {
  slug: string
  readTime: string
  body: string[]
  pullQuote: string
  note?: string
  isDemo?: boolean
}

export type Service = {
  id: string
  title: string
  tagline: string
  description: string
  whoFor: string
  helps: string[]
  cta: string
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'DISCOVERY' | 'PROPOSAL' | 'WON' | 'ACTIVE CLIENT' | 'COMPLETED'

export type Lead = {
  id: string
  name: string
  company: string
  role: string
  phone: string
  email: string
  source: string
  service: string
  requirement: string
  status: LeadStatus
  notes: string
  createdAt: string
  isDemo: boolean
}

export type Client = {
  id: string
  leadId?: string
  name: string
  company: string
  role: string
  email: string
  phone: string
  service: string
  status: 'ACTIVE' | 'COMPLETED' | 'ON HOLD'
  timeline: { event: string; date: string; note?: string }[]
  notes: string
  isDemo: boolean
}

export type Session = {
  id: string
  clientName: string
  company: string
  service: string
  dateISO: string
  date: string
  time: string
  type: 'Discovery' | 'Strategy' | 'Advisory' | 'Review' | 'Follow-up'
  status: 'Upcoming' | 'Completed' | 'Cancelled'
  isDemo: boolean
}

export type Task = {
  id: string
  title: string
  relatedType: 'lead' | 'client'
  relatedId: string
  relatedName: string
  company: string
  dueISO: string
  dueLabel: string
  done: boolean
  isDemo: boolean
}

export type ContentStatus = 'IDEA' | 'DRAFT' | 'REVIEW' | 'READY' | 'PUBLISHED'

export type ContentItem = {
  id: string
  title: string
  topic: string
  category: string
  platform: string
  body: string
  media: string
  publishDate: string
  status: ContentStatus
  isDemo: boolean
}

export type ActivityTag = 'NEW' | 'BOOKING' | 'CONTENT' | 'PROPOSAL' | 'WON' | 'CLIENT' | 'SESSION'

export type ActivityEntry = {
  id: string
  tag: ActivityTag
  text: string
  dateISO: string
  isDemo: boolean
}

export type TrustedByEntry = {
  name: string
  role: string
  years: string
  logo?: string
  logoKind: 'image' | 'wordmark'
}

export type TimelineEntry = {
  year: string
  role: string
  org: string
  note: string
}

// ─── IDEAS & ARTICLES ─────────────────────────────────────────────────────────
// Grounded in Mehjabin's real, public topics: the bKash friction story, the
// customer decision-making tree and CLV from her 2022 training, omnipresence
// and neuromarketing from her LinkedIn writing.

export const articles: Article[] = [
  {
    title: 'What two minutes with bKash taught me about product design',
    category: 'Customer',
    type: 'Insight',
    excerpt: 'It took two years to open a savings account the old way. It took two minutes on a phone. The gap between those numbers is the whole argument for customer-first design.',
    date: dLabel(-16),
    slug: 'two-minutes-with-bkash',
    readTime: '4 min read',
    pullQuote: 'A product does one of two things: it solves a problem, or it makes a customer’s life better. Everything else is decoration.',
    note: 'Sample essay drafted for this prototype, based on a public post by Mehjabin on LinkedIn.',
    body: [
      'For two years, opening a savings account meant a trip to a branch, a stack of paperwork and a queue that ate an afternoon. Then, on an ordinary day, I did the same thing on my phone in under two minutes.',
      'Three things had stood in the way before: the inconvenience of travelling somewhere, the hassle of documentation, and the small daily irritation of dealing with an institution that made you feel like a case number. None of those barriers were about the product itself. They were about everything wrapped around it.',
      'This is not a story about a banking app. It is a story about where value actually gets created. A business can have a good product and still lose customers to friction it never bothered to measure — the travel, the waiting, the forms, the tone of the person behind the counter.',
      'The businesses that win the next decade in Bangladesh will not necessarily have the best product on a spec sheet. They will be the ones that keep asking what is standing between a customer and the thing they are trying to do — and then quietly remove it.',
    ],
  },
  {
    title: 'The customer decision-making tree, and why most strategy skips it',
    category: 'Strategy',
    type: 'Article',
    excerpt: 'Before a strategy document gets written, most teams should be able to draw the path a customer actually takes to say yes. Most can’t.',
    date: dLabel(-31),
    slug: 'customer-decision-making-tree',
    readTime: '5 min read',
    pullQuote: 'If you can’t draw how a customer decides, you’re not ready to decide what to do about it.',
    body: [
      'In a full-day training I ran on customer analytics, the exercise that stopped the room every time was the simplest one: draw the decision-making tree. Not the funnel from your dashboard — the actual sequence of small decisions a real customer works through before they buy anything from you.',
      'Most teams can describe their customer in a sentence. Fewer can describe the branching points: the moment of awareness, the comparison, the hesitation, the trigger that finally moves someone from considering to committing. Those branches are where strategy actually happens, not in the boardroom.',
      'This matters because strategy built without the tree tends to optimise for the wrong branch. A team convinced their problem is awareness will pour money into ads, when the real leak is at the comparison stage, where a competitor’s simpler pricing page is quietly winning.',
      'Good strategy starts with the tree, not the target. Map how the decision actually gets made, and the priorities tend to declare themselves.',
    ],
  },
  {
    title: 'Customer lifetime value is a strategy question, not a finance one',
    category: 'Growth',
    type: 'Insight',
    excerpt: 'Most businesses treat CLV as a number for the finance team. It’s really a test of whether your strategy earns loyalty or just transactions.',
    date: dLabel(-53),
    slug: 'customer-lifetime-value-is-strategy',
    readTime: '5 min read',
    pullQuote: 'A high customer lifetime value is not a metric. It is evidence that a business kept a promise more than once.',
    body: [
      'Customer lifetime value gets treated as a spreadsheet exercise — a formula, a cohort chart, a number to report upward. That framing misses what the number is actually telling you.',
      'CLV is a report card on whether your strategy creates reasons to come back, or simply reasons to show up once. A business can hit its acquisition targets every quarter and still be a leaking bucket if nothing after the first purchase gives a customer a reason to return.',
      'In practice, the businesses with strong CLV rarely have a single retention tactic. They have a strategy where the product, the service and the follow-through all point toward the same promise, so a second purchase feels obvious rather than incentivised.',
      'If you want to grow lifetime value, do not start with a loyalty programme. Start by asking what would make a customer’s second decision easier than their first.',
    ],
  },
  {
    title: 'Omnipresence: what "being everywhere" actually requires',
    category: 'Bangladesh Business',
    type: 'Talk',
    excerpt: 'Omnichannel is not the same as omnipresent. One means you exist in many places. The other means a customer barely notices moving between them.',
    date: dLabel(-72),
    slug: 'omnipresence-being-everywhere',
    readTime: '6 min read',
    pullQuote: 'Being everywhere is not a channel strategy. It is a promise that the customer never has to start over.',
    body: [
      'Every retail business I have worked with wants to be omnichannel — present in-store, online, on a delivery app, on social. Most manage the presence. Few manage the promise underneath it: that a customer can move between those channels without feeling like they have started a new relationship each time.',
      'In a market like Bangladesh, where a customer might discover a brand on Facebook, ask a question over WhatsApp, and complete the purchase in a physical store, omnipresence is not a nice-to-have. It is the only way the customer experience actually holds together.',
      'The businesses that get this right treat every channel as one continuous conversation, not a set of separate storefronts competing for the same budget line. A support answer given on one channel should be visible on the next. A cart should not reset because a customer switched from an app to a shop.',
      'Omnipresence is not about adding more channels. It is about removing the seams between the ones you already have.',
    ],
  },
  {
    title: 'Why neuromarketing changes how we think about buying decisions',
    category: 'Marketing',
    type: 'Article',
    excerpt: 'Planned versus impulse: what the brain tells us about how customers actually decide — and what that means for strategy.',
    date: dLabel(-91),
    slug: 'neuromarketing-buying-decisions',
    readTime: '6 min read',
    pullQuote: 'Getting a customer’s emotional moment right is not manipulation — it is a form of respect for how human beings actually work.',
    body: [
      'For decades, marketing assumed that customers make decisions rationally — weighing options, comparing prices, selecting the best value. Neuromarketing has shown us something more interesting: most decisions happen before conscious reasoning even begins.',
      'The distinction between planned and impulse purchasing is not simply a question of product category or price point. It is a question of emotional state, environmental cue, and the relationship a customer already has with a brand.',
      'For businesses in Bangladesh and across South Asia, this insight opens a genuinely useful question: what emotional landscape are our customers in at the moment they encounter us? And are we designed for that moment?',
      'The answer to that question shapes everything from store layout to digital UX to the language in an ad. Getting it right is not manipulation — it is a form of respect for how human beings actually work.',
    ],
  },
  {
    title: 'The leader who listens differently',
    category: 'Leadership',
    type: 'Insight',
    excerpt: 'Curiosity is the most underrated strategic capacity in a leadership team.',
    date: dLabel(-112),
    slug: 'leader-who-listens-differently',
    readTime: '4 min read',
    pullQuote: 'The organisations that outlast the rest are almost always led by people who stayed curious long after they had every reason to become certain.',
    body: [
      'The leaders who have most shaped the way I think about business share something that is easy to overlook: they are genuinely curious about being wrong.',
      'Curiosity is often framed as a personality trait — something you either have or you do not. I think that misses the point. Curiosity in a leadership context is a strategic behaviour. It is the discipline of asking useful questions before reaching for familiar answers.',
      'In practice, this means holding a hypothesis lightly. It means treating a customer complaint as a data point rather than a problem to close. It means running a meeting that ends with better questions rather than neater conclusions.',
      'The organisations that outlast the rest are almost always led by people who stayed curious long after they had every reason to become certain.',
    ],
  },
  {
    title: 'Business in a decade of disruption',
    category: 'Future',
    type: 'Talk',
    excerpt: 'The organisations that will survive the next decade are already practising something most teams ignore.',
    date: dLabel(-129),
    slug: 'business-decade-of-disruption',
    readTime: '5 min read',
    pullQuote: 'In a decade of disruption, the most durable strategic advantage is a business that genuinely understands the people it serves.',
    body: [
      'Every industry conversation eventually arrives at the same word: disruption. The platforms, the AI, the shifting demographics, the post-pandemic consumer — all of it collides into a sense that everything is about to change.',
      'Some of it will. Some of it already has. But the businesses I have watched navigate disruption well share a pattern that is almost anti-disruptive in its logic: they went deeper into customer understanding precisely when their competitors were chasing the next trend.',
      'Disruption rewards the businesses that know their customers best. Not because knowledge protects you from change, but because it gives you the clarity to decide which changes matter and which are noise.',
      'In a decade of disruption, the most durable strategic advantage is a business that genuinely understands the people it serves.',
    ],
  },
]

export const ideas: Idea[] = articles.map(({ title, category, excerpt, date, type }) => ({ title, category, excerpt, date, type }))

/** Turns a Content Studio item into something the public Ideas library can render. */
export function contentToArticle(item: ContentItem): Article {
  const paragraphs = item.body.split('\n\n').filter(Boolean)
  const firstLine = paragraphs[0] ?? item.topic
  const wordCount = paragraphs.join(' ').split(/\s+/).filter(Boolean).length
  return {
    title: item.title,
    category: item.category,
    type: 'Insight',
    excerpt: firstLine.length > 160 ? `${firstLine.slice(0, 157)}…` : firstLine,
    date: item.publishDate || 'Recently published',
    slug: `demo-${item.id}`,
    readTime: `${Math.max(1, Math.round(wordCount / 200))} min read`,
    pullQuote: paragraphs[1] ?? firstLine,
    note: 'Published from the Content Studio demo — not one of Mehjabin’s verified public essays.',
    body: paragraphs.length > 0 ? paragraphs : [item.topic],
    isDemo: true,
  }
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

export const services: Service[] = [
  {
    id: 'strategy',
    title: 'Business Strategy',
    tagline: 'Turn a complicated question into a useful direction.',
    description: 'Strategic planning and advisory for businesses facing a significant decision — a new market, a pivot, a growth moment, or a period of uncertainty.',
    whoFor: 'Founders, CEOs and leadership teams who need clarity before committing to a direction.',
    helps: ['Define a clear strategic position', 'Identify the highest-value priorities', 'Build a plan the team can actually carry'],
    cta: 'Explore Strategy',
  },
  {
    id: 'customer-insights',
    title: 'Customer & Market Insights',
    tagline: 'See the people, not just the data.',
    description: 'Qualitative and quantitative research that gets beneath the surface of customer behaviour — what people are actually doing, and why.',
    whoFor: 'Teams that suspect their assumptions about customers need challenging, or that want to ground decisions in real evidence.',
    helps: ['Understand how customers make decisions', 'Identify unmet needs and friction points', 'Build a customer picture that informs strategy'],
    cta: 'Explore Insights',
  },
  {
    id: 'growth',
    title: 'Growth Strategy',
    tagline: 'Find the path that is sustainable, not just fast.',
    description: 'A disciplined approach to identifying and activating practical growth — grounded in customer behaviour, unit economics, and market opportunity.',
    whoFor: 'Businesses ready to grow deliberately, not just reactively.',
    helps: ['Identify the highest-leverage growth levers', 'Evaluate market and customer expansion', 'Design a growth approach with longevity'],
    cta: 'Explore Growth',
  },
  {
    id: 'advisory',
    title: '1:1 Advisory',
    tagline: 'A thinking partnership when it matters most.',
    description: 'A direct, confidential advisory relationship for founders and senior leaders who need a trusted sounding board — someone who brings an outside perspective with genuine depth.',
    whoFor: 'Founders and leaders navigating an important decision, a difficult period, or a transition they want to handle well.',
    helps: ['Get honest, outside-in perspective', 'Think through high-stakes decisions', 'Build the confidence to act'],
    cta: 'Explore Advisory',
  },
  {
    id: 'workshops',
    title: 'Workshops & Training',
    tagline: 'Build customer-centred thinking into your team.',
    description: 'Facilitated workshops and training sessions designed to give teams a shared language and practical tools for customer understanding and strategic thinking.',
    whoFor: 'Teams who want to embed better thinking habits — not just attend a one-off training.',
    helps: ['Align a team around customer understanding', 'Build practical research and strategy skills', 'Create a shared framework for decisions'],
    cta: 'Explore Workshops',
  },
  {
    id: 'speaking',
    title: 'Speaking',
    tagline: 'Conversations that open up the room.',
    description: 'Keynotes, panels and facilitated conversations on customer understanding, business strategy, growth and the future of business in Bangladesh and beyond.',
    whoFor: 'Event organisers, corporate learning teams and panels looking for a speaker who brings both rigour and warmth.',
    helps: ['Provoke useful thinking in an audience', 'Ground a conference theme in real business practice', 'Open a conversation that continues after the room empties'],
    cta: 'Invite Mehjabin',
  },
]

// ─── TRUSTED BY / CAREER (all real, sourced facts) ───────────────────────────

export const trustedBy: TrustedByEntry[] = [
  { name: "Let's Talk Business", role: 'Founder & Growth Lead', years: '2025 — Present', logo: '/logos/letstalk-business.png', logoKind: 'image' },
  { name: 'ACI Logistics · Shwapno', role: 'Head of Customer Analytics & CRM', years: '2018 — 2022', logoKind: 'wordmark' },
  { name: 'Grameenphone', role: 'Intern', years: '2014', logo: '/logos/grameenphone-mark.svg', logoKind: 'image' },
  { name: 'RSPL BD Ltd', role: 'Marketing Specialist', years: '2017 — 2018', logoKind: 'wordmark' },
]

export const careerTimeline: TimelineEntry[] = [
  {
    year: '2014',
    role: 'Intern',
    org: 'Grameenphone',
    note: 'Started inside one of the country’s largest customer bases — an early lesson in how systems, not individuals, decide most customer experiences.',
  },
  {
    year: '2017 — 2018',
    role: 'Marketing Specialist',
    org: 'RSPL BD Ltd',
    note: 'Moved from customer systems to customer communication, and saw how often the two are planned by teams that never talk to each other.',
  },
  {
    year: '2018 — 2022',
    role: 'Head of Customer Analytics, Process Innovation & Store Strategy',
    org: 'ACI Logistics Ltd · Shwapno',
    note: 'Ran customer analytics and store strategy for one of Bangladesh’s largest retail chains, where a decision-making tree could be tested against thousands of real transactions a day.',
  },
  {
    year: '2025 — Present',
    role: 'Founder & Growth Lead',
    org: "Let's Talk Business",
    note: 'Now works directly with founders and teams who want the same customer-first thinking, without needing a retail chain to test it on.',
  },
]

// ─── LEADS ────────────────────────────────────────────────────────────────────
// Fictional companies on .example addresses (RFC 2606) — no real business implied.

export const seedLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Tania Rahman',
    company: 'Nodi Textiles',
    role: 'CEO',
    phone: '+880 1711-234567',
    email: 'tania@nodi-textiles.example',
    source: 'LinkedIn',
    service: 'Growth Strategy',
    requirement: 'Looking to expand into new product categories and need strategic clarity before investing.',
    status: 'DISCOVERY',
    notes: 'Very clear about what she wants. Has budget confirmed. Eager to move fast.',
    createdAt: dLabel(-6),
    isDemo: true,
  },
  {
    id: 'lead-002',
    name: 'Sharmeen Kabir',
    company: 'Projapoti Studio',
    role: 'Founder',
    phone: '+880 1812-345678',
    email: 'sharmeen@projapotistudio.example',
    source: 'Website',
    service: 'Business Strategy',
    requirement: 'New business struggling to define its market position. First-time founder needing a strategic thinking partner.',
    status: 'NEW',
    notes: 'Found the website via Google. Sent inquiry form. Has not replied to the welcome email yet.',
    createdAt: dLabel(-4),
    isDemo: true,
  },
  {
    id: 'lead-003',
    name: 'Arif Hossain',
    company: 'Dhaka Loop Retail',
    role: 'Head of Strategy',
    phone: '+880 1923-456789',
    email: 'arif@dhakaloopretail.example',
    source: 'Referral',
    service: 'Customer & Market Insights',
    requirement: 'Need deep customer research to understand drop-off in repeat purchase behaviour post-delivery.',
    status: 'PROPOSAL',
    notes: 'Referred by a previous client. High quality lead. Decision maker confirmed. Proposal sent.',
    createdAt: dLabel(-9),
    isDemo: true,
  },
  {
    id: 'lead-004',
    name: 'Dilruba Akter',
    company: 'Charulata Foods',
    role: 'Co-Founder',
    phone: '+880 1634-567890',
    email: 'dilruba@charulatafoods.example',
    source: 'Facebook',
    service: 'Workshops & Training',
    requirement: 'Team of 12 needs a customer-centred thinking workshop. Would like a half-day format.',
    status: 'CONTACTED',
    notes: 'Responded well to the first email. Waiting on internal budget approval.',
    createdAt: dLabel(-12),
    isDemo: true,
  },
  {
    id: 'lead-005',
    name: 'Rezaul Karim',
    company: 'Shonar Bangla Ventures',
    role: 'Director, New Business',
    phone: '+880 1745-678901',
    email: 'rkarim@sbventures.example',
    source: 'Speaking event',
    service: 'Speaking',
    requirement: 'Annual leadership conference, 400 attendees. Looking for a keynote on customer-led growth.',
    status: 'WON',
    notes: 'Confirmed. Brief received.',
    createdAt: dLabel(-19),
    isDemo: true,
  },
]

// ─── CLIENTS ──────────────────────────────────────────────────────────────────

export const seedClients: Client[] = [
  {
    id: 'client-001',
    name: 'Fariha Chowdhury',
    company: 'Anko Media',
    role: 'Head of Customer Experience',
    email: 'f.chowdhury@ankomedia.example',
    phone: '+880 1811-100200',
    service: 'Customer & Market Insights',
    status: 'ACTIVE',
    timeline: [
      { event: 'Inquiry received', date: dLabel(-45) },
      { event: 'Discovery session', date: dLabel(-37), note: 'Discussed scope — focus on urban millennials and gift purchasing behaviour' },
      { event: 'Proposal accepted', date: dLabel(-30) },
      { event: 'Research session 1', date: dLabel(-19), note: 'Customer interview series began — 12 interviews completed' },
      { event: 'Research session 2', date: dLabel(-9), note: 'Synthesis and pattern identification' },
    ],
    notes: 'Strong working relationship. Client is highly engaged and participates actively in research reviews. Wants monthly follow-ups.',
    isDemo: true,
  },
  {
    id: 'client-002',
    name: 'Nusrat Jahan',
    company: 'Moyna Home & Craft',
    role: 'Founder',
    email: 'nusrat@moynahomecraft.example',
    phone: '+880 1712-300400',
    service: '1:1 Advisory',
    status: 'ACTIVE',
    timeline: [
      { event: 'Inquiry received', date: dLabel(-54) },
      { event: 'Discovery call', date: dLabel(-47), note: 'Exploring pricing strategy and brand positioning for scaling' },
      { event: 'Advisory retainer agreed', date: dLabel(-41) },
      { event: 'Session 1', date: dLabel(-33) },
      { event: 'Session 2', date: dLabel(-19) },
      { event: 'Session 3', date: dLabel(-5) },
    ],
    notes: 'Monthly 90-minute advisory sessions. Currently working through pricing architecture and channel strategy.',
    isDemo: true,
  },
  {
    id: 'client-003',
    name: 'Kamrul Islam',
    company: 'Kagoj Digital',
    role: 'Head of Product',
    email: 'k.islam@kagojdigital.example',
    phone: '+880 1923-500600',
    service: 'Business Strategy',
    status: 'COMPLETED',
    timeline: [
      { event: 'Inquiry received', date: dLabel(-110) },
      { event: 'Discovery', date: dLabel(-103) },
      { event: 'Strategy workshop', date: dLabel(-89) },
      { event: 'Strategy report delivered', date: dLabel(-68) },
      { event: 'Follow-up review', date: dLabel(-52), note: 'All recommendations reviewed, implementation roadmap agreed' },
    ],
    notes: 'Engagement complete. Client is happy. Asked about future work on audience research. Keep warm.',
    isDemo: true,
  },
]

// ─── SESSIONS ─────────────────────────────────────────────────────────────────

export const seedSessions: Session[] = [
  { id: 's-001', clientName: 'Tania Rahman', company: 'Nodi Textiles', service: 'Discovery Call', dateISO: dISO(0), date: dLong(0), time: '11:00 AM', type: 'Discovery', status: 'Upcoming', isDemo: true },
  { id: 's-002', clientName: 'Fariha Chowdhury', company: 'Anko Media', service: 'Insights Presentation', dateISO: dISO(7), date: dLong(7), time: '2:00 PM', type: 'Review', status: 'Upcoming', isDemo: true },
  { id: 's-003', clientName: 'Nusrat Jahan', company: 'Moyna Home & Craft', service: 'Advisory Session 4', dateISO: dISO(9), date: dLong(9), time: '10:30 AM', type: 'Advisory', status: 'Upcoming', isDemo: true },
  { id: 's-004', clientName: 'Rezaul Karim', company: 'Shonar Bangla Ventures', service: 'Keynote Brief Review', dateISO: dISO(7), date: dLong(7), time: '4:00 PM', type: 'Strategy', status: 'Upcoming', isDemo: true },
  { id: 's-005', clientName: 'Fariha Chowdhury', company: 'Anko Media', service: 'Research Session 2', dateISO: dISO(-9), date: dLong(-9), time: '2:00 PM', type: 'Discovery', status: 'Completed', isDemo: true },
  { id: 's-006', clientName: 'Nusrat Jahan', company: 'Moyna Home & Craft', service: 'Advisory Session 3', dateISO: dISO(-5), date: dLong(-5), time: '10:30 AM', type: 'Advisory', status: 'Completed', isDemo: true },
]

// ─── TASKS ────────────────────────────────────────────────────────────────────

export const seedTasks: Task[] = [
  { id: 'task-001', title: 'Confirm discovery call scope and timeline', relatedType: 'lead', relatedId: 'lead-001', relatedName: 'Tania Rahman', company: 'Nodi Textiles', dueISO: dISO(0), dueLabel: dLabel(0), done: false, isDemo: true },
  { id: 'task-002', title: 'Reply to inquiry email', relatedType: 'lead', relatedId: 'lead-002', relatedName: 'Sharmeen Kabir', company: 'Projapoti Studio', dueISO: dISO(0), dueLabel: dLabel(0), done: false, isDemo: true },
  { id: 'task-003', title: 'Follow up on proposal — decision expected', relatedType: 'lead', relatedId: 'lead-003', relatedName: 'Arif Hossain', company: 'Dhaka Loop Retail', dueISO: dISO(2), dueLabel: dLabel(2), done: false, isDemo: true },
  { id: 'task-004', title: 'Send workshop proposal and pricing', relatedType: 'lead', relatedId: 'lead-004', relatedName: 'Dilruba Akter', company: 'Charulata Foods', dueISO: dISO(5), dueLabel: dLabel(5), done: false, isDemo: true },
  { id: 'task-005', title: 'Draft keynote outline and share for approval', relatedType: 'lead', relatedId: 'lead-005', relatedName: 'Rezaul Karim', company: 'Shonar Bangla Ventures', dueISO: dISO(3), dueLabel: dLabel(3), done: false, isDemo: true },
  { id: 'task-006', title: 'Deliver insights report and present findings', relatedType: 'client', relatedId: 'client-001', relatedName: 'Fariha Chowdhury', company: 'Anko Media', dueISO: dISO(7), dueLabel: dLabel(7), done: false, isDemo: true },
  { id: 'task-007', title: 'Session 4 — review pricing decisions and distribution plan', relatedType: 'client', relatedId: 'client-002', relatedName: 'Nusrat Jahan', company: 'Moyna Home & Craft', dueISO: dISO(9), dueLabel: dLabel(9), done: false, isDemo: true },
  { id: 'task-008', title: 'Send quarterly check-in', relatedType: 'client', relatedId: 'client-003', relatedName: 'Kamrul Islam', company: 'Kagoj Digital', dueISO: dISO(14), dueLabel: dLabel(14), done: false, isDemo: true },
]

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const seedContent: ContentItem[] = [
  { id: 'c-001', title: 'What two minutes with bKash taught me about product design', topic: 'Customer-first product design', category: 'Customer', platform: 'Website / LinkedIn', body: '', media: '', publishDate: dLabel(-16), status: 'PUBLISHED', isDemo: true },
  { id: 'c-002', title: 'The customer decision-making tree, and why most strategy skips it', topic: 'Customer decision-making', category: 'Strategy', platform: 'Website / LinkedIn', body: '', media: '', publishDate: dLabel(-31), status: 'PUBLISHED', isDemo: true },
  { id: 'c-003', title: 'Customer lifetime value is a strategy question, not a finance one', topic: 'CLV & growth strategy', category: 'Growth', platform: 'Website / LinkedIn', body: '', media: '', publishDate: dLabel(-53), status: 'PUBLISHED', isDemo: true },
  { id: 'c-004', title: 'Omnipresence: what "being everywhere" actually requires', topic: 'Omnichannel retail', category: 'Bangladesh Business', platform: 'Website / Talk', body: '', media: '', publishDate: dLabel(-72), status: 'PUBLISHED', isDemo: true },
  { id: 'c-005', title: 'Why neuromarketing changes how we think about buying decisions', topic: 'Neuromarketing / consumer behaviour', category: 'Marketing', platform: 'Website / LinkedIn', body: '', media: '', publishDate: dLabel(-91), status: 'PUBLISHED', isDemo: true },
  { id: 'c-006', title: 'The leader who listens differently', topic: 'Leadership and curiosity', category: 'Leadership', platform: 'LinkedIn', body: '', media: '', publishDate: dLabel(-112), status: 'PUBLISHED', isDemo: true },
  { id: 'c-007', title: 'Business in a decade of disruption', topic: 'Future of business', category: 'Future', platform: 'Website / Talk', body: '', media: '', publishDate: dLabel(-129), status: 'PUBLISHED', isDemo: true },
  {
    id: 'c-008',
    title: 'Why customer feedback is not the same as customer understanding',
    topic: 'Research methodology',
    category: 'Customer',
    platform: 'Website',
    body: 'Feedback tells you what a customer noticed enough to mention. Understanding tells you what they never thought to say.\n\nStill drafting the middle section — want to use a retail example rather than a SaaS one.',
    media: '',
    publishDate: '',
    status: 'DRAFT',
    isDemo: true,
  },
  { id: 'c-009', title: 'The 3 questions a growth strategy must answer', topic: 'Growth frameworks', category: 'Growth', platform: 'LinkedIn / Website', body: 'What are we choosing to do, what are we choosing not to do, and why will those choices matter to the people we serve?\n\nIn review with one more pass needed on the examples.', media: '', publishDate: '', status: 'REVIEW', isDemo: true },
  {
    id: 'c-010',
    title: 'What a decision-making tree looks like in a Dhaka retail store',
    topic: 'Applying the decision tree in Bangladesh retail',
    category: 'Bangladesh Business',
    platform: 'Website / Facebook',
    body: 'A retail chain does not have one customer decision tree — it has dozens, branching by category, by season, by store format. Mapping even one properly changes how a store team thinks about layout, staffing and promotions.\n\nWhen we mapped the tree for a single high-traffic category, the surprise was not the destination. It was how many customers abandoned the decision one step before purchase, at a point no dashboard was tracking.\n\nThis is a short version of a longer piece, written to show how a working idea becomes a published piece without extra planning time on Mehjabin’s side.',
    media: 'Store-floor photo from the Prothom Alo training',
    publishDate: '',
    status: 'READY',
    isDemo: true,
  },
  { id: 'c-011', title: 'What I wish I had known about strategy at the start', topic: 'Career lessons', category: 'Leadership', platform: 'LinkedIn', body: '', media: '', publishDate: '', status: 'IDEA', isDemo: true },
]

// ─── ACTIVITY ─────────────────────────────────────────────────────────────────

export const seedActivity: ActivityEntry[] = [
  { id: 'act-001', tag: 'NEW', text: 'Sharmeen Kabir submitted a business strategy inquiry', dateISO: dISO(-4), isDemo: true },
  { id: 'act-002', tag: 'BOOKING', text: 'Tania Rahman confirmed a discovery call', dateISO: dISO(-6), isDemo: true },
  { id: 'act-003', tag: 'CONTENT', text: 'Article "What two minutes with bKash taught me about product design" published', dateISO: dISO(-16), isDemo: true },
  { id: 'act-004', tag: 'PROPOSAL', text: 'Proposal sent to Dhaka Loop Retail', dateISO: dISO(-9), isDemo: true },
  { id: 'act-005', tag: 'WON', text: 'Shonar Bangla Ventures keynote confirmed', dateISO: dISO(-19), isDemo: true },
]
