import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Search, CheckCircle, Compass } from 'lucide-react'
import { articles as baseArticles, careerTimeline, services, trustedBy, type Article, type TrustedByEntry } from '../data/mockData'
import { SiteHeader } from './SiteHeader'
import { IdeaCard } from './IdeaCard'
import { Booking } from './Booking'
import { useReveal } from '../hooks/useReveal'
import type { Go } from '../router'
import './public-site.css'

type BookingInfo = { name: string; company: string; service: string; email: string; phone: string; requirement: string }

type PublicSiteProps = Readonly<{
  path: string
  query: URLSearchParams
  hash: string
  go: Go
  onBooking: (info: BookingInfo) => string
  extraArticles: Article[]
  onStartTour: () => void
}>

export function PublicSite({ path, query, hash, go, onBooking, extraArticles, onStartTour }: PublicSiteProps) {
  const allArticles = useMemo(() => [...baseArticles, ...extraArticles], [extraArticles])

  if (path === '/book') {
    return (
      <>
        <SiteHeader onNavigate={go} currentPath={path} />
        <Booking onComplete={onBooking} initialServiceId={query.get('service')} go={go} />
        <PublicFooter go={go} onStartTour={onStartTour} />
      </>
    )
  }
  if (path === '/start') return <StartHerePage go={go} onStartTour={onStartTour} />
  if (path === '/ideas') return <IdeasPage go={go} articles={allArticles} onStartTour={onStartTour} />
  if (path.startsWith('/ideas/')) return <ArticlePage go={go} slug={path.split('/').pop() || ''} articles={allArticles} onStartTour={onStartTour} />
  if (path === '/work-with-me') return <WorkWithMePage go={go} hash={hash} onStartTour={onStartTour} />
  if (path === '/about') return <AboutPage go={go} onStartTour={onStartTour} />
  return <HomePage go={go} articles={allArticles} onStartTour={onStartTour} />
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

const problemCards = [
  { label: 'I need business clarity', sub: 'Strategy Consulting', serviceId: 'strategy' },
  { label: 'I need to understand my customers', sub: 'Customer & Market Insights', serviceId: 'customer-insights' },
  { label: 'I want to grow', sub: 'Growth Strategy', serviceId: 'growth' },
  { label: 'I need guidance', sub: '1:1 Advisory / Coaching', serviceId: 'advisory' },
  { label: 'I want to develop my team', sub: 'Workshops & Training', serviceId: 'workshops' },
  { label: 'I need a speaker', sub: 'Speaking', serviceId: 'speaking' },
]

function HomePage({ go, articles, onStartTour }: Readonly<{ go: Go; articles: Article[]; onStartTour: () => void }>) {
  useReveal()
  const [featured, ...rest] = articles

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/" />
      <main className="public-home">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">MEHJABIN BADHON · STRATEGY & ADVISORY</p>
            <h1 className="hero-headline">
              <span className="reveal-line" style={{ animationDelay: '0ms' }}>Better business</span>
              <span className="reveal-line" style={{ animationDelay: '90ms' }}>starts with</span>
              <span className="reveal-line reveal-em" style={{ animationDelay: '180ms' }}><em>better understanding.</em></span>
            </h1>
            <p className="hero-bangla" lang="bn">ভালো ব্যবসা শুরু হয় ভালো বোঝাপড়া থেকে।</p>
            <p className="lede">
              I help businesses understand their customers, clarify their strategy
              and turn ideas into practical opportunities for growth.
            </p>
            <div className="actions">
              <button className="primary" onClick={() => go('/work-with-me')}>
                Work With Me <ArrowRight size={16} />
              </button>
              <button className="text-button" onClick={() => go('/ideas')}>
                Explore My Ideas <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
          <div className="portrait-wrap">
            <img src="/mehjabin-portrait.jpg" alt="Mehjabin Badhon, Founder and Growth Lead at Let's Talk Business" />
            <span className="portrait-note">
              Mehjabin Badhon<br /><i>Founder & Growth Lead, Let's Talk Business</i>
            </span>
          </div>
        </section>

        {/* ── EXPERTISE STRIP ── */}
        <section className="expertise-strip" data-reveal>
          <span>Business Strategy</span>
          <span>Customer Experience</span>
          <span>Market Research</span>
          <span>Growth</span>
        </section>

        {/* ── PROBLEM FIRST ── */}
        <section className="problems">
          <p className="eyebrow" data-reveal>START WITH YOUR QUESTION</p>
          <h2 data-reveal>What are you trying<br />to solve?</h2>
          <div className="problem-list">
            {problemCards.map((card, i) => (
              <button key={card.label} data-reveal onClick={() => go(`/work-with-me#${card.serviceId}`)} className="problem-row">
                <b className="problem-num">0{i + 1}</b>
                <div className="problem-text">
                  <span className="problem-label">{card.label}</span>
                  <span className="problem-sub">→ {card.sub}</span>
                </div>
                <ArrowUpRight size={20} className="problem-arrow" />
              </button>
            ))}
          </div>
          <button className="text-button start-here-link" data-reveal onClick={() => go('/start')}>
            Not sure where to start? Let me help. <ArrowUpRight size={15} />
          </button>
        </section>

        {/* ── PHILOSOPHY ── */}
        <section className="philosophy" data-reveal>
          <p className="eyebrow">A POINT OF VIEW</p>
          <blockquote>
            "Business isn't built around products.<br />It's built around people."
          </blockquote>
          <p className="philosophy-bangla" lang="bn">ব্যবসা পণ্যের চারপাশে গড়ে ওঠে না, গড়ে ওঠে মানুষকে ঘিরে।</p>
          <p>
            The businesses I admire most are the ones that pay closer attention to the
            people they exist to serve. Not as segments or data points, but as human
            beings making decisions in the context of their actual lives.
          </p>
          <p>
            Better customer understanding leads to better strategy. Better strategy
            leads to more sustainable growth. It really is that simple — and that difficult.
          </p>
        </section>

        {/* ── FEATURED IDEA + LIST ── */}
        <section className="ideas-section">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">THINKING OUT LOUD</p>
              <h2>Ideas for better business.</h2>
            </div>
            <button className="text-button" onClick={() => go('/ideas')}>
              All ideas <ArrowRight size={16} />
            </button>
          </div>

          {featured && (
            <button className="featured-idea" data-reveal onClick={() => go(`/ideas/${featured.slug}`)}>
              <span className="featured-cat">{featured.category} · {featured.type}</span>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <span className="featured-cta">Read the piece <ArrowUpRight size={15} /></span>
            </button>
          )}

          <ol className="idea-list">
            {rest.slice(0, 3).map((idea, i) => (
              <li key={idea.title} data-reveal>
                <button onClick={() => go(`/ideas/${idea.slug}`)}>
                  <span className="idea-list-num">0{i + 2}</span>
                  <span className="idea-list-title">{idea.title}</span>
                  <span className="idea-list-cat">{idea.category}</span>
                  <ArrowUpRight size={16} />
                </button>
              </li>
            ))}
          </ol>
        </section>

        {/* ── WORK WITH ME TEASER ── */}
        <section className="services-teaser">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">WORK WITH ME</p>
              <h2>Where can I help?</h2>
            </div>
            <button className="text-button" onClick={() => go('/work-with-me')}>
              See all services <ArrowRight size={16} />
            </button>
          </div>
          <div className="service-tiles">
            {services.slice(0, 4).map((s, i) => (
              <article key={s.id} className="service-tile" data-reveal>
                <span className="tile-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.tagline}</p>
                <button className="text-button small" onClick={() => go(`/work-with-me#${s.id}`)}>
                  Learn more <ArrowRight size={14} />
                </button>
              </article>
            ))}
          </div>
        </section>

        {/* ── TRUSTED BY ── */}
        <section className="trusted-section" data-reveal>
          <p className="eyebrow">TRUSTED BY</p>
          <TrustedByMarquee />
        </section>

        {/* ── IN THE ROOM ── */}
        <section className="in-the-room" data-reveal>
          <div className="itr-media">
            <img src="/mehjabin-speaking.jpg" alt="Mehjabin Badhon speaking on a business panel" />
          </div>
          <div className="itr-copy">
            <p className="eyebrow">IN THE ROOM</p>
            <h2>Conversations, not just consulting.</h2>
            <p>
              Mehjabin has run a full-day training on customer analytics for marketing and
              sales professionals — "Consumer Analytics to Increase Sales" — at the Prothom
              Alo Conference Hall, and speaks on panels about customer-led growth.
            </p>
            <p className="itr-note">
              Client references and testimonials are available on request. None are published
              here yet — this prototype doesn't print quotes nobody said.
            </p>
          </div>
        </section>

      </main>
      <PublicFooter go={go} onStartTour={onStartTour} />
    </>
  )
}

function TrustedItem({ t }: Readonly<{ t: TrustedByEntry }>) {
  return (
    <div className="trusted-item">
      {t.logoKind === 'image' && t.logo
        ? <img src={t.logo} alt={t.name} className="trusted-logo-img" />
        : <span className="trusted-wordmark">{t.name}</span>}
      <span className="trusted-caption">{t.role} · {t.years}</span>
    </div>
  )
}

function TrustedByMarquee() {
  return (
    <div className="trusted-marquee">
      <div className="trusted-track">
        <div className="trusted-set">
          {trustedBy.map(t => <TrustedItem key={t.name} t={t} />)}
        </div>
        <div className="trusted-set" aria-hidden="true">
          {trustedBy.map(t => <TrustedItem key={`${t.name}-dup`} t={t} />)}
        </div>
      </div>
    </div>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function AboutPage({ go, onStartTour }: Readonly<{ go: Go; onStartTour: () => void }>) {
  useReveal()
  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/about" />
      <main className="public-page about-page">

        <div className="page-header" data-reveal>
          <p className="eyebrow">ABOUT MEHJABIN</p>
          <h1>I'm interested in the<br /><em>why behind the what.</em></h1>
        </div>

        <section className="about-intro" data-reveal>
          <div className="about-portrait">
            <img src="/mehjabin-portrait.jpg" alt="Mehjabin Badhon" />
          </div>
          <div className="about-intro-copy">
            <p className="lede">
              I work with people building businesses that want to be more useful,
              more deliberate and more connected to their customers.
            </p>
            <p>
              Through Let's Talk Business, I explore the ideas, conversations and
              practical tools that help leaders make better decisions — starting
              with a clearer understanding of the people they serve.
            </p>
            <p>
              My work sits at the intersection of strategy, customer research and
              the kind of business thinking that actually holds up when things get hard.
            </p>
          </div>
        </section>

        <section className="about-section about-timeline-section" data-reveal>
          <div className="about-section-label">
            <p className="eyebrow">THE JOURNEY</p>
          </div>
          <div className="about-section-body">
            <h2>A career built on the same question.</h2>
            <ol className="career-timeline">
              {careerTimeline.map(t => (
                <li key={t.org}>
                  <span className="ct-year">{t.year}</span>
                  <div>
                    <b>{t.role}</b>
                    <span className="ct-org">{t.org}</span>
                    <p>{t.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="about-pullquote" data-reveal>
          <blockquote>
            "The work is not to make business sound more complicated. It is to make the important things clearer."
          </blockquote>
        </section>

        <section className="about-section" data-reveal>
          <div className="about-section-label">
            <p className="eyebrow">THE BELIEF</p>
          </div>
          <div className="about-section-body">
            <h2>Business is a human endeavour.</h2>
            <p>
              I believe that businesses become more valuable — and more durable — when
              they pay closer attention to the people they exist to serve.
            </p>
            <p>
              This is not a soft idea. It has practical, commercial consequences. The
              businesses I have seen grow most meaningfully are the ones that invest
              in understanding before they invest in execution.
            </p>
          </div>
        </section>

        <section className="about-expertise" data-reveal>
          <p className="eyebrow">THE EXPERTISE</p>
          <div className="expertise-cols">
            <div>
              <h3>Customer</h3>
              <p>Understanding how people actually make decisions, what they need, and what they wish businesses understood about their lives.</p>
            </div>
            <div>
              <h3>Strategy</h3>
              <p>Translating customer understanding into clear strategic direction — priorities, choices and plans that a team can actually carry.</p>
            </div>
            <div>
              <h3>Growth</h3>
              <p>Finding the practical, sustainable opportunities for a business to grow — grounded in customer behaviour and commercial reality.</p>
            </div>
          </div>
        </section>

        <section className="about-current" data-reveal>
          <p className="eyebrow">CURRENT WORK</p>
          <h2>Let's Talk Business</h2>
          <p>
            I currently work with founders, leadership teams and organisations across
            Bangladesh and beyond — advising on strategy, conducting customer research,
            and running workshops that help teams think more clearly.
          </p>
          <p>
            I also write regularly about business strategy, customer behaviour and
            the ideas that shape how organisations grow.
          </p>
          <div className="actions">
            <button className="primary" onClick={() => go('/work-with-me')}>
              Work With Me <ArrowRight size={16} />
            </button>
            <button className="text-button" onClick={() => go('/ideas')}>
              Read my ideas <ArrowUpRight size={16} />
            </button>
          </div>
        </section>

      </main>
      <PublicFooter go={go} onStartTour={onStartTour} />
    </>
  )
}

// ─── WORK WITH ME ─────────────────────────────────────────────────────────────

function WorkWithMePage({ go, hash, onStartTour }: Readonly<{ go: Go; hash: string; onStartTour: () => void }>) {
  useReveal()
  const [activeService, setActiveService] = useState<string | null>(hash || null)

  useEffect(() => {
    if (hash) setActiveService(hash)
  }, [hash])

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/work-with-me" />
      <main className="public-page work-page">

        <div className="page-header" data-reveal>
          <p className="eyebrow">WORK WITH ME</p>
          <h1>Start with the<br /><em>problem in front of you.</em></h1>
          <p className="page-lede">
            Different business questions call for different kinds of thinking.
            Here are the places we can begin.
          </p>
        </div>

        <div className="challenge-intro" data-reveal>
          <h2>Choose your challenge.</h2>
        </div>

        <div className="service-list">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              data-reveal
              className={`service-item${activeService === s.id ? ' open' : ''}`}
            >
              <button
                className="service-header"
                aria-expanded={activeService === s.id}
                onClick={() => setActiveService(activeService === s.id ? null : s.id)}
              >
                <span className="service-num">0{i + 1}</span>
                <div className="service-title-group">
                  <h2>{s.title}</h2>
                  <p className="service-tagline">{s.tagline}</p>
                </div>
                <span className="service-toggle">{activeService === s.id ? '−' : '+'}</span>
              </button>

              {activeService === s.id && (
                <div className="service-body">
                  <p className="service-desc">{s.description}</p>
                  <div className="service-meta">
                    <div className="service-for">
                      <p className="eyebrow">WHO IT'S FOR</p>
                      <p>{s.whoFor}</p>
                    </div>
                    <div className="service-helps">
                      <p className="eyebrow">WHAT IT HELPS WITH</p>
                      <ul>
                        {s.helps.map(h => (
                          <li key={h}><CheckCircle size={14} /> {h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button className="primary" onClick={() => go(`/book?service=${s.id}`)}>
                    {s.cta} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>

        <section className="work-cta" data-reveal>
          <h2>Not sure which is right for you?</h2>
          <p>Start with a conversation. We'll figure out the right fit together.</p>
          <button className="primary" onClick={() => go('/book')}>
            Book a Consultation <ArrowRight size={16} />
          </button>
          <button className="text-button" onClick={() => go('/start')}>
            Take the guided path <ArrowUpRight size={16} />
          </button>
        </section>

      </main>
      <PublicFooter go={go} onStartTour={onStartTour} />
    </>
  )
}

// ─── IDEAS ────────────────────────────────────────────────────────────────────

const categories = ['All', 'Strategy', 'Customer', 'Marketing', 'Growth', 'Bangladesh Business', 'Leadership', 'Future']
const types = ['All types', 'Article', 'Insight', 'Video', 'Talk']

function IdeasPage({ go, articles, onStartTour }: Readonly<{ go: Go; articles: Article[]; onStartTour: () => void }>) {
  const [filter, setFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All types')
  const [query, setQuery] = useState('')

  const list = useMemo(() =>
    articles.filter(x =>
      (filter === 'All' || x.category === filter) &&
      (typeFilter === 'All types' || x.type === typeFilter) &&
      (x.title.toLowerCase().includes(query.toLowerCase()) || x.excerpt.toLowerCase().includes(query.toLowerCase()))
    ),
    [articles, filter, typeFilter, query]
  )

  useReveal([filter, typeFilter, query, list.length])

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/ideas" />
      <main className="public-page ideas-page">

        <div className="page-header" data-reveal>
          <p className="eyebrow">IDEAS</p>
          <h1>Things worth<br /><em>thinking about.</em></h1>
          <p className="page-lede">
            Writing, talks and insights on business strategy, customer understanding
            and growth — mostly from a Bangladesh perspective, always with practical intent.
          </p>
        </div>

        <div className="library-tools" data-reveal>
          <div className="filter-tabs">
            {categories.map(x => (
              <button key={x} className={filter === x ? 'active' : ''} onClick={() => setFilter(x)}>
                {x}
              </button>
            ))}
          </div>
          <div className="library-tools-row2">
            <select className="type-select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} aria-label="Filter by content type">
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
            <label className="search-box">
              <Search size={15} />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search ideas..." />
            </label>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="empty-state" data-reveal>
            <p>No results for "{query}" in {filter}.</p>
            <button className="text-button" onClick={() => { setFilter('All'); setTypeFilter('All types'); setQuery('') }}>Clear filters</button>
          </div>
        ) : (
          <div className="ideas-grid wide">
            {list.map((article, i) => (
              <IdeaCard
                key={article.slug}
                idea={article}
                index={i}
                isDemo={article.isDemo}
                onOpen={() => go(`/ideas/${article.slug}`)}
              />
            ))}
          </div>
        )}

      </main>
      <PublicFooter go={go} onStartTour={onStartTour} />
    </>
  )
}

// ─── ARTICLE ─────────────────────────────────────────────────────────────────

function ReadingProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector('.article-body')
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - innerHeight * 0.5
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => removeEventListener('scroll', onScroll)
  }, [])
  return <div className="reading-progress"><div style={{ width: `${pct}%` }} /></div>
}

const categoryToServiceId: Record<string, string> = {
  Growth: 'growth',
  Customer: 'customer-insights',
  Strategy: 'strategy',
  'Bangladesh Business': 'customer-insights',
  Marketing: 'growth',
  Leadership: 'advisory',
  Future: 'speaking',
}

function ArticlePage({ go, slug, articles, onStartTour }: Readonly<{ go: Go; slug: string; articles: Article[]; onStartTour: () => void }>) {
  const article = articles.find(x => x.slug === slug) || articles[0]
  const related = articles.filter(x => x.slug !== article.slug && x.category === article.category)
  const relatedFallback = articles.filter(x => x.slug !== article.slug)
  const relatedList = (related.length > 0 ? related : relatedFallback).slice(0, 2)
  const relatedService = services.find(s => s.id === categoryToServiceId[article.category]) ?? services[0]

  useReveal([slug])

  return (
    <>
      <ReadingProgress />
      <SiteHeader onNavigate={go} currentPath="/ideas" />
      <main className="article-page">

        <div className="article-header" data-reveal>
          <button className="back-link" onClick={() => go('/ideas')}>&larr; Ideas</button>
          <div className="article-meta">
            <span className="cat-badge">{article.category}</span>
            <span>{article.type}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
            {article.isDemo && <span className="demo-pill">DEMO</span>}
          </div>
          <h1>{article.title}</h1>
          <p className="article-dek">{article.excerpt}</p>
        </div>

        <div className="article-cover" data-reveal data-cat={article.category}>
          <span className="article-cover-mark">&ldquo;</span>
          <span className="article-cover-cat">{article.category}</span>
          <span className="article-cover-byline">Mehjabin Badhon &middot; Let's Talk Business</span>
        </div>

        {article.note && <p className="article-note">{article.note}</p>}

        <div className="article-body">
          {article.body.map((text, i) => (
            i === Math.min(2, article.body.length - 1)
              ? <div key={i}><blockquote>{article.pullQuote}</blockquote><p>{text}</p></div>
              : <p key={i}>{text}</p>
          ))}
        </div>

        <div className="article-end-cta" data-reveal>
          <h2>Have a question like this in your business?</h2>
          <p>I offer strategy and advisory conversations to help leaders think through exactly these kinds of problems.</p>
          <button className="primary" onClick={() => go(`/book?service=${relatedService.id}`)}>
            Talk it through <ArrowRight size={16} />
          </button>
        </div>

        {relatedList.length > 0 && (
          <div className="related-ideas" data-reveal>
            <p className="eyebrow">CONTINUE READING</p>
            <div className="related-grid">
              {relatedList.map(x => (
                <IdeaCard key={x.slug} idea={x} isDemo={x.isDemo} onOpen={() => go(`/ideas/${x.slug}`)} />
              ))}
            </div>
          </div>
        )}

      </main>
      <PublicFooter go={go} onStartTour={onStartTour} />
    </>
  )
}

// ─── START HERE ──────────────────────────────────────────────────────────────

function StartHerePage({ go, onStartTour }: Readonly<{ go: Go; onStartTour: () => void }>) {
  useReveal()
  const paths = [
    { label: "I'm building a business.", sub: 'Explore Business Strategy', desc: 'Get clarity on direction, priorities and the decisions that matter most.', path: '/work-with-me#strategy', icon: <Compass size={20} /> },
    { label: "I'm trying to grow.", sub: 'Explore Growth', desc: 'Find the sustainable, practical opportunities your business is ready for.', path: '/work-with-me#growth', icon: '↑' },
    { label: "I'm struggling to understand my customers.", sub: 'Customer Strategy', desc: 'Build a real picture of who your customers are and what they need.', path: '/work-with-me#customer-insights', icon: '◎' },
    { label: 'I want to work directly with Mehjabin.', sub: 'Book a Consultation', desc: "Start with a conversation. We'll find the right fit together.", path: '/book', icon: '→' },
    { label: 'I want to learn from her thinking.', sub: 'Explore Ideas', desc: 'Articles, talks and insights on business, customers and growth.', path: '/ideas', icon: '✦' },
  ]

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/" />
      <main className="start-here-page">
        <div className="start-header" data-reveal>
          <p className="eyebrow">START HERE</p>
          <h1>What brings<br /><em>you here?</em></h1>
          <p className="lede">Choose the statement that best describes where you are right now.</p>
        </div>
        <div className="start-grid">
          {paths.map(p => (
            <button key={p.label} className="start-card" data-reveal onClick={() => go(p.path)}>
              <span className="start-icon">{p.icon}</span>
              <div className="start-card-body">
                <strong>{p.label}</strong>
                <span className="start-sub">→ {p.sub}</span>
                <p>{p.desc}</p>
              </div>
              <ArrowRight size={20} className="start-arrow" />
            </button>
          ))}
        </div>
      </main>
      <PublicFooter go={go} onStartTour={onStartTour} />
    </>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function PublicFooter({ go, onStartTour }: Readonly<{ go: Go; onStartTour: () => void }>) {
  return (
    <footer className="public-footer">
      <div className="footer-statement">
        <p className="eyebrow">LET'S TALK BUSINESS</p>
        <h2>Have a business problem<br />worth talking through?</h2>
        <button className="primary" onClick={() => go('/book')}>Let's Talk <ArrowRight size={16} /></button>
      </div>
      <div className="footer-inner">
        <div className="footer-brand">
          <button className="wordmark" onClick={() => go('/')}>
            mehjabin badhon<br /><i>let's talk business</i>
          </button>
          <p>Better business starts with better understanding.</p>
        </div>
        <nav className="footer-nav">
          <button onClick={() => go('/about')}>About</button>
          <button onClick={() => go('/work-with-me')}>Work With Me</button>
          <button onClick={() => go('/ideas')}>Ideas</button>
          <button onClick={() => go('/book')}>Let's Talk</button>
          <button onClick={() => go('/start')}>Start Here</button>
        </nav>
        <div className="footer-right">
          <button className="text-btn-small" onClick={onStartTour}>
            <Compass size={13} /> Take the 3-minute tour
          </button>
          <button className="footer-os-link" onClick={() => go('/admin')}>
            Optional add-on: Business OS demo <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
      <div className="footer-base">
        <span>&copy; 2026 Mehjabin Badhon. Let's Talk Business.</span>
        <span>Dhaka, Bangladesh · GMT+6</span>
      </div>
    </footer>
  )
}
