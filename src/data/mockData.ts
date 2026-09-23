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
  status: 'NEW' | 'CONTACTED' | 'DISCOVERY' | 'PROPOSAL' | 'WON' | 'ACTIVE CLIENT' | 'COMPLETED'
  notes: string
  next: string
  nextDate: string
  createdAt: string
  isDemo: boolean
}

export type Client = {
  id: string
  name: string
  company: string
  role: string
  email: string
  phone: string
  service: string
  status: 'ACTIVE' | 'COMPLETED' | 'ON HOLD'
  timeline: { event: string; date: string; note?: string }[]
  notes: string
  nextAction: string
  nextActionDate: string
  upcomingSessions: { title: string; date: string; time: string }[]
  isDemo: boolean
}

export type Session = {
  id: string
  clientName: string
  company: string
  service: string
  date: string
  time: string
  type: 'Discovery' | 'Strategy' | 'Advisory' | 'Review' | 'Follow-up'
  status: 'Upcoming' | 'Completed' | 'Cancelled'
  isDemo: boolean
}

export type ContentItem = {
  id: string
  title: string
  topic: string
  category: string
  platform: string
  body: string
  publishDate: string
  status: 'IDEA' | 'DRAFT' | 'REVIEW' | 'READY' | 'PUBLISHED'
  isDemo: boolean
}

export type AnalyticsData = {
  websiteVisitors: { label: string; value: number }[]
  topIdeas: { title: string; views: number; category: string }[]
  inquiries: { label: string; value: number }[]
  sources: { label: string; value: number; pct: number }[]
  conversion: { stage: string; count: number }[]
}

// ─── IDEAS ────────────────────────────────────────────────────────────────────

export const ideas: Idea[] = [
  {
    title: 'The customer is not a segment on a slide',
    category: 'Customer',
    excerpt: 'A better way to use customer understanding as a strategic discipline — not a research afterthought.',
    date: '12 September 2026',
    type: 'Article',
  },
  {
    title: 'Growth starts before the marketing plan',
    category: 'Growth',
    excerpt: 'The clarity questions leadership teams should answer before asking for more campaigns.',
    date: '28 August 2026',
    type: 'Insight',
  },
  {
    title: 'What Bangladesh businesses can learn from listening',
    category: 'Bangladesh Business',
    excerpt: 'Practical signals hiding in the everyday experiences customers already share with us.',
    date: '04 August 2026',
    type: 'Talk',
  },
  {
    title: 'Strategy that people can actually use',
    category: 'Strategy',
    excerpt: 'Why the best strategy has to make sense on Monday morning, not only in the boardroom.',
    date: '21 July 2026',
    type: 'Video',
  },
  {
    title: 'Why neuromarketing changes how we think about buying decisions',
    category: 'Marketing',
    excerpt: 'Planned versus impulse: what the brain tells us about how customers actually decide — and what that means for strategy.',
    date: '10 July 2026',
    type: 'Article',
  },
  {
    title: 'The leader who listens differently',
    category: 'Leadership',
    excerpt: 'Curiosity is the most underrated strategic capacity in a leadership team.',
    date: '02 July 2026',
    type: 'Insight',
  },
  {
    title: 'Business in a decade of disruption',
    category: 'Future',
    excerpt: 'The organisations that will survive the next decade are already practising something most teams ignore.',
    date: '18 June 2026',
    type: 'Talk',
  },
]

// ─── ARTICLES ─────────────────────────────────────────────────────────────────

export const articles: Article[] = [
  {
    ...ideas[0],
    slug: 'customer-is-not-a-segment',
    readTime: '4 min read',
    body: [
      'Customer segments are useful. They help us organise a complex world and make decisions at scale. But they are a starting point, not the whole story.',
      'The question is not simply who customers are. It is what they are trying to do, what gets in their way, and what they wish a business understood about their lives.',
      'When a business reduces its customers to a demographic group on a slide, it loses the texture that makes insight actionable. A 28–35 year old urban professional is not a person. A parent who commutes 90 minutes each day and shops online because it is the only quiet time she has — that is a person.',
      'The businesses that make room for this kind of listening are better placed to create relevance. And relevance is where lasting growth begins.',
    ],
  },
  {
    ...ideas[1],
    slug: 'growth-starts-before-the-marketing-plan',
    readTime: '5 min read',
    body: [
      'Growth asks more of a business than a louder marketing plan. It asks for clarity about where value is created, protected and repeated.',
      'Before choosing tactics, leadership teams need a shared understanding of the customer behaviour they are trying to earn. Which problem are we genuinely the best answer to? Which customers have we earned the right to serve? What would make them stay?',
      'These questions feel uncomfortable in a budget meeting. But skipping them is what turns marketing spend into noise rather than signal.',
      'The businesses I admire most are not the loudest. They are the ones that know exactly who they exist for — and make every decision accordingly.',
    ],
  },
  {
    ...ideas[2],
    slug: 'what-listening-teaches-business',
    readTime: '6 min read',
    body: [
      'Bangladesh has one of the most energetic and adaptive business cultures in the region. Entrepreneurs here learn fast, iterate quickly, and operate in conditions that would stop many Western businesses entirely.',
      'But there is a gap. Many of the businesses I have worked with have remarkable instincts about what their customers want — and very few structured ways to confirm or challenge those instincts.',
      'The everyday experiences customers share are not background noise. They are often the most useful evidence a business has. A complaint logged in a call centre, a pattern in cart abandonments, a recurring topic in social comments — these are signals, not noise.',
      'Listening is not a ritual at the end of a project. It is part of how a business learns to stay relevant.',
    ],
  },
  {
    ...ideas[3],
    slug: 'strategy-people-can-use',
    readTime: '4 min read',
    body: [
      'The best strategy I have seen is rarely the most sophisticated. It is the one that a team can actually explain on a Monday morning.',
      'Strategic planning has a tendency to produce documents that live in shared drives and die in the first quarter. The reason is almost always the same: the plan was built for the boardroom, not for the people who have to carry it.',
      'Useful strategy answers three things clearly: what we are choosing to do, what we are choosing not to do, and why those choices will matter to the people we serve.',
      'Simplicity in strategy is not a dumbing-down. It is a discipline.',
    ],
  },
  {
    ...ideas[4],
    slug: 'neuromarketing-buying-decisions',
    readTime: '6 min read',
    body: [
      'For decades, marketing assumed that customers make decisions rationally — weighing options, comparing prices, selecting the best value. Neuromarketing has shown us something more interesting: most decisions happen before conscious reasoning even begins.',
      'The distinction between planned and impulse purchasing is not simply a question of product category or price point. It is a question of emotional state, environmental cue, and the relationship a customer already has with a brand.',
      'For businesses in Bangladesh and across South Asia, this insight opens a genuinely useful question: what emotional landscape are our customers in at the moment they encounter us? And are we designed for that moment?',
      'The answer to that question shapes everything from store layout to digital UX to the language in an ad. Getting it right is not manipulation — it is a form of respect for how human beings actually work.',
    ],
  },
  {
    ...ideas[5],
    slug: 'leader-who-listens-differently',
    readTime: '4 min read',
    body: [
      'The leaders who have most shaped the way I think about business share something that is easy to overlook: they are genuinely curious about being wrong.',
      'Curiosity is often framed as a personality trait — something you either have or you do not. I think that misses the point. Curiosity in a leadership context is a strategic behaviour. It is the discipline of asking useful questions before reaching for familiar answers.',
      'In practice, this means holding a hypothesis lightly. It means treating a customer complaint as a data point rather than a problem to close. It means running a meeting that ends with better questions rather than neater conclusions.',
      'The organisations that outlast the rest are almost always led by people who stayed curious long after they had every reason to become certain.',
    ],
  },
  {
    ...ideas[6],
    slug: 'business-decade-of-disruption',
    readTime: '5 min read',
    body: [
      'Every industry conversation eventually arrives at the same word: disruption. The platforms, the AI, the shifting demographics, the post-pandemic consumer — all of it collides into a sense that everything is about to change.',
      'Some of it will. Some of it already has. But the businesses I have watched navigate disruption well share a pattern that is almost anti-disruptive in its logic: they went deeper into customer understanding precisely when their competitors were chasing the next trend.',
      'Disruption rewards the businesses that know their customers best. Not because knowledge protects you from change, but because it gives you the clarity to decide which changes matter and which are noise.',
      'In a decade of disruption, the most durable strategic advantage is a business that genuinely understands the people it serves.',
    ],
  },
]

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

// ─── LEADS ────────────────────────────────────────────────────────────────────

export const seedLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Tania Rahman',
    company: 'Noksha Foods',
    role: 'CEO',
    phone: '+880 1711-234567',
    email: 'tania@noksha.com.bd',
    source: 'LinkedIn',
    service: 'Growth Strategy',
    requirement: 'Looking to expand into new product categories and need strategic clarity before investing.',
    status: 'DISCOVERY',
    notes: 'Very clear about what she wants. Has budget confirmed. Eager to move fast.',
    next: 'Discovery call — confirm scope and timeline',
    nextDate: 'Thu, 25 Sep · 11:00 AM',
    createdAt: '18 Sep 2026',
    isDemo: true,
  },
  {
    id: 'lead-002',
    name: 'Sharmeen Kabir',
    company: 'The Loom Studio',
    role: 'Founder',
    phone: '+880 1812-345678',
    email: 'sharmeen@theloomstudio.com',
    source: 'Website',
    service: 'Business Strategy',
    requirement: 'New business struggling to define its market position. First-time founder needing strategic thinking partner.',
    status: 'NEW',
    notes: 'Found the website via Google. Sent inquiry form. Has not replied to welcome email yet.',
    next: 'Reply to inquiry email',
    nextDate: 'Today',
    createdAt: '20 Sep 2026',
    isDemo: true,
  },
  {
    id: 'lead-003',
    name: 'Arif Hossain',
    company: 'Pathao Retail',
    role: 'Head of Strategy',
    phone: '+880 1923-456789',
    email: 'arif.h@pathao.com',
    source: 'Referral',
    service: 'Customer & Market Insights',
    requirement: 'Need deep customer research to understand drop-off in repeat purchase behaviour post-delivery.',
    status: 'PROPOSAL',
    notes: 'Referred by a previous client. High quality lead. Decision maker confirmed. Proposal sent 19 Sep.',
    next: 'Follow up on proposal — decision by Friday',
    nextDate: 'Fri, 26 Sep',
    createdAt: '15 Sep 2026',
    isDemo: true,
  },
  {
    id: 'lead-004',
    name: 'Dilruba Akter',
    company: 'ShajGhor',
    role: 'Co-Founder',
    phone: '+880 1634-567890',
    email: 'dilruba@shajghor.com',
    source: 'Facebook',
    service: 'Workshops & Training',
    requirement: 'Team of 12 needs a customer-centred thinking workshop. Would like a half-day format.',
    status: 'CONTACTED',
    notes: 'Responded well to first email. Waiting for internal budget approval.',
    next: 'Send workshop proposal and pricing',
    nextDate: 'Mon, 29 Sep',
    createdAt: '12 Sep 2026',
    isDemo: true,
  },
  {
    id: 'lead-005',
    name: 'Rezaul Karim',
    company: 'Meghna Group',
    role: 'Director, New Business',
    phone: '+880 1745-678901',
    email: 'rkarim@meghnagroup.com',
    source: 'Speaking event',
    service: 'Speaking',
    requirement: 'Annual leadership conference, 400 attendees. Looking for a keynote on customer-led growth.',
    status: 'WON',
    notes: 'Confirmed. Event on 15 November. Brief received.',
    next: 'Draft keynote outline and share for approval',
    nextDate: 'Wed, 01 Oct',
    createdAt: '05 Sep 2026',
    isDemo: true,
  },
]

// ─── CLIENTS ──────────────────────────────────────────────────────────────────

export const seedClients: Client[] = [
  {
    id: 'client-001',
    name: 'Fariha Chowdhury',
    company: 'Aarong (BRAC)',
    role: 'Head of Customer Experience',
    email: 'f.chowdhury@aarong.com',
    phone: '+880 1811-100200',
    service: 'Customer & Market Insights',
    status: 'ACTIVE',
    timeline: [
      { event: 'Inquiry received', date: '10 Aug 2026' },
      { event: 'Discovery session', date: '18 Aug 2026', note: 'Discussed scope — focus on urban millennials and gift purchasing behaviour' },
      { event: 'Proposal accepted', date: '25 Aug 2026' },
      { event: 'Research session 1', date: '05 Sep 2026', note: 'Customer interview series began — 12 interviews completed' },
      { event: 'Research session 2', date: '15 Sep 2026', note: 'Synthesis and pattern identification' },
    ],
    notes: 'Strong working relationship. Client is highly engaged and participates actively in research reviews. Wants monthly follow-ups.',
    nextAction: 'Deliver insights report and present findings',
    nextActionDate: 'Wed, 01 Oct · 2:00 PM',
    upcomingSessions: [{ title: 'Insights Presentation', date: '01 Oct 2026', time: '2:00 PM' }],
    isDemo: true,
  },
  {
    id: 'client-002',
    name: 'Nusrat Jahan',
    company: 'Shokhi Homemade',
    role: 'Founder',
    email: 'nusrat@shokhihomemade.com',
    phone: '+880 1712-300400',
    service: '1:1 Advisory',
    status: 'ACTIVE',
    timeline: [
      { event: 'Inquiry received', date: '01 Aug 2026' },
      { event: 'Discovery call', date: '08 Aug 2026', note: 'Exploring pricing strategy and brand positioning for scaling' },
      { event: 'Advisory retainer agreed', date: '14 Aug 2026' },
      { event: 'Session 1', date: '22 Aug 2026' },
      { event: 'Session 2', date: '05 Sep 2026' },
      { event: 'Session 3', date: '19 Sep 2026' },
    ],
    notes: 'Monthly 90-minute advisory sessions. Currently working through pricing architecture and channel strategy.',
    nextAction: 'Session 4 — review pricing decisions and distribution plan',
    nextActionDate: 'Fri, 03 Oct · 10:30 AM',
    upcomingSessions: [{ title: 'Advisory Session 4', date: '03 Oct 2026', time: '10:30 AM' }],
    isDemo: true,
  },
  {
    id: 'client-003',
    name: 'Kamrul Islam',
    company: 'Dhaka Tribune (Digital)',
    role: 'Head of Product',
    email: 'k.islam@dhakatribune.com',
    phone: '+880 1923-500600',
    service: 'Business Strategy',
    status: 'COMPLETED',
    timeline: [
      { event: 'Inquiry received', date: '05 Jun 2026' },
      { event: 'Discovery', date: '12 Jun 2026' },
      { event: 'Strategy workshop', date: '26 Jun 2026' },
      { event: 'Strategy report delivered', date: '15 Jul 2026' },
      { event: 'Follow-up review', date: '01 Aug 2026', note: 'All recommendations reviewed, implementation roadmap agreed' },
    ],
    notes: 'Engagement complete. Client is happy. Asked about future work on audience research. Keep warm.',
    nextAction: 'Send quarterly check-in',
    nextActionDate: 'Oct 2026',
    upcomingSessions: [],
    isDemo: true,
  },
]

// ─── SESSIONS ─────────────────────────────────────────────────────────────────

export const seedSessions: Session[] = [
  { id: 's-001', clientName: 'Fariha Chowdhury', company: 'Aarong', service: 'Insights Presentation', date: '01 Oct 2026', time: '2:00 PM', type: 'Review', status: 'Upcoming', isDemo: true },
  { id: 's-002', clientName: 'Nusrat Jahan', company: 'Shokhi Homemade', service: 'Advisory Session 4', date: '03 Oct 2026', time: '10:30 AM', type: 'Advisory', status: 'Upcoming', isDemo: true },
  { id: 's-003', clientName: 'Rezaul Karim', company: 'Meghna Group', service: 'Keynote Brief Review', date: '01 Oct 2026', time: '4:00 PM', type: 'Strategy', status: 'Upcoming', isDemo: true },
  { id: 's-004', clientName: 'Fariha Chowdhury', company: 'Aarong', service: 'Research Session 2', date: '15 Sep 2026', time: '2:00 PM', type: 'Discovery', status: 'Completed', isDemo: true },
  { id: 's-005', clientName: 'Nusrat Jahan', company: 'Shokhi Homemade', service: 'Advisory Session 3', date: '19 Sep 2026', time: '10:30 AM', type: 'Advisory', status: 'Completed', isDemo: true },
]

// ─── CONTENT ──────────────────────────────────────────────────────────────────

export const seedContent: ContentItem[] = [
  { id: 'c-001', title: 'The customer is not a segment on a slide', topic: 'Customer understanding', category: 'Customer', platform: 'Website / LinkedIn', body: '', publishDate: '12 Sep 2026', status: 'PUBLISHED', isDemo: true },
  { id: 'c-002', title: 'Growth starts before the marketing plan', topic: 'Growth strategy', category: 'Growth', platform: 'Website / LinkedIn', body: '', publishDate: '28 Aug 2026', status: 'PUBLISHED', isDemo: true },
  { id: 'c-003', title: 'What Bangladesh businesses can learn from listening', topic: 'Bangladesh business', category: 'Bangladesh Business', platform: 'Website / Facebook', body: '', publishDate: '04 Aug 2026', status: 'PUBLISHED', isDemo: true },
  { id: 'c-004', title: 'Why neuromarketing changes how we think about buying decisions', topic: 'Neuromarketing / consumer behaviour', category: 'Marketing', platform: 'Website / LinkedIn', body: '', publishDate: '10 Jul 2026', status: 'PUBLISHED', isDemo: true },
  { id: 'c-005', title: 'The leader who listens differently', topic: 'Leadership and curiosity', category: 'Leadership', platform: 'LinkedIn', body: '', publishDate: '02 Jul 2026', status: 'PUBLISHED', isDemo: true },
  { id: 'c-006', title: 'Business in a decade of disruption', topic: 'Future of business', category: 'Future', platform: 'Website / Talk', body: '', publishDate: '18 Jun 2026', status: 'PUBLISHED', isDemo: true },
  { id: 'c-007', title: 'Why customer feedback is not the same as customer understanding', topic: 'Research methodology', category: 'Customer', platform: 'Website', body: 'Draft in progress...', publishDate: '', status: 'DRAFT', isDemo: true },
  { id: 'c-008', title: 'The 3 questions a growth strategy must answer', topic: 'Growth frameworks', category: 'Growth', platform: 'LinkedIn / Website', body: '', publishDate: '', status: 'REVIEW', isDemo: true },
  { id: 'c-009', title: 'How Bangladeshi brands can compete on customer experience', topic: 'Bangladesh CX', category: 'Bangladesh Business', platform: 'Website / Facebook', body: '', publishDate: '', status: 'READY', isDemo: true },
  { id: 'c-010', title: 'What I wish I had known about strategy at the start', topic: 'Career lessons', category: 'Leadership', platform: 'LinkedIn', body: '', publishDate: '', status: 'IDEA', isDemo: true },
  { id: 'c-011', title: 'The impulse purchase — and what it tells us about trust', topic: 'Consumer behaviour', category: 'Marketing', platform: 'Website', body: '', publishDate: '', status: 'IDEA', isDemo: true },
]

// ─── ANALYTICS ────────────────────────────────────────────────────────────────

export const analyticsData: AnalyticsData = {
  websiteVisitors: [
    { label: 'Mar', value: 210 },
    { label: 'Apr', value: 340 },
    { label: 'May', value: 390 },
    { label: 'Jun', value: 520 },
    { label: 'Jul', value: 480 },
    { label: 'Aug', value: 670 },
    { label: 'Sep', value: 890 },
  ],
  topIdeas: [
    { title: 'The customer is not a segment on a slide', views: 1240, category: 'Customer' },
    { title: 'Why neuromarketing changes how we think about buying decisions', views: 980, category: 'Marketing' },
    { title: 'Growth starts before the marketing plan', views: 810, category: 'Growth' },
    { title: 'What Bangladesh businesses can learn from listening', views: 640, category: 'Bangladesh Business' },
  ],
  inquiries: [
    { label: 'Jun', value: 3 },
    { label: 'Jul', value: 4 },
    { label: 'Aug', value: 6 },
    { label: 'Sep', value: 8 },
  ],
  sources: [
    { label: 'LinkedIn', value: 38, pct: 38 },
    { label: 'Website', value: 27, pct: 27 },
    { label: 'Referral', value: 21, pct: 21 },
    { label: 'Facebook', value: 10, pct: 10 },
    { label: 'Other', value: 4, pct: 4 },
  ],
  conversion: [
    { stage: 'Website visitors', count: 890 },
    { stage: 'Inquiries', count: 21 },
    { stage: 'Discovery calls', count: 12 },
    { stage: 'Proposals', count: 7 },
    { stage: 'Clients', count: 5 },
  ],
}
