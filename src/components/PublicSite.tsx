import { useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, Search, CheckCircle } from 'lucide-react'
import { articles, ideas, services } from '../data/mockData'
import { SiteHeader } from './SiteHeader'
import { IdeaCard } from './IdeaCard'
import { Booking } from './Booking'
import './public-site.css'

type Go = (path: string) => void
type PublicSiteProps = Readonly<{
  path: string
  go: Go
  onBooking: (info: { name: string; company: string; service: string; email: string; phone: string; requirement: string }) => void
}>

export function PublicSite({ path, go, onBooking }: PublicSiteProps) {
  if (path === '/book') return <><SiteHeader onNavigate={go} currentPath={path} /><Booking onComplete={onBooking} /><PublicFooter go={go} /></>
  if (path === '/start') return <StartHerePage go={go} />
  if (path === '/ideas') return <IdeasPage go={go} />
  if (path.startsWith('/ideas/')) return <ArticlePage go={go} slug={path.split('/').pop() || ''} />
  if (path === '/work-with-me') return <WorkWithMePage go={go} />
  if (path === '/about') return <AboutPage go={go} />
  return <HomePage go={go} />
}

// ─── HOME ─────────────────────────────────────────────────────────────────────

function HomePage({ go }: Readonly<{ go: Go }>) {
  const problemCards = [
    { label: 'I need business clarity', sub: 'Strategy Consulting', path: '/work-with-me' },
    { label: 'I need to understand my customers', sub: 'Customer & Market Insights', path: '/work-with-me' },
    { label: 'I want to grow', sub: 'Growth Strategy', path: '/work-with-me' },
    { label: 'I need guidance', sub: '1:1 Advisory / Coaching', path: '/work-with-me' },
    { label: 'I want to develop my team', sub: 'Workshops & Training', path: '/work-with-me' },
    { label: 'I need a speaker', sub: 'Speaking', path: '/work-with-me' },
  ]

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/" />
      <main className="public-home">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">MEHJABIN BADHON · STRATEGY & ADVISORY</p>
            <h1>
              Better business<br />starts with<br /><em>better understanding.</em>
            </h1>
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
            <img src="/mehjabin-hero.jpg" alt="Mehjabin Badhon - Business Strategy & Advisory" />
            <span className="portrait-note">
              Mehjabin Badhon<br /><i>Founder, Let's Talk Business</i>
            </span>
          </div>
        </section>

        {/* ── EXPERTISE STRIP ── */}
        <section className="expertise-strip">
          <span>Business Strategy</span>
          <span>Customer Experience</span>
          <span>Market Research</span>
          <span>Growth</span>
        </section>

        {/* ── PROBLEM FIRST ── */}
        <section className="problems">
          <p className="eyebrow">START WITH YOUR QUESTION</p>
          <h2>What are you trying<br />to solve?</h2>
          <div className="problem-list">
            {problemCards.map((card, i) => (
              <button key={card.label} onClick={() => go(card.path)} className="problem-row">
                <b className="problem-num">0{i + 1}</b>
                <div className="problem-text">
                  <span className="problem-label">{card.label}</span>
                  <span className="problem-sub">→ {card.sub}</span>
                </div>
                <ArrowUpRight size={20} className="problem-arrow" />
              </button>
            ))}
          </div>
          <button className="text-button start-here-link" onClick={() => go('/start')}>
            Not sure where to start? Let me help. <ArrowUpRight size={15} />
          </button>
        </section>

        {/* ── PHILOSOPHY ── */}
        <section className="philosophy">
          <p className="eyebrow">A POINT OF VIEW</p>
          <blockquote>
            "Business isn't built around products.<br />It's built around people."
          </blockquote>
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

        {/* ── FEATURED IDEAS ── */}
        <section className="ideas-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">THINKING OUT LOUD</p>
              <h2>Ideas for better business.</h2>
            </div>
            <button className="text-button" onClick={() => go('/ideas')}>
              All ideas <ArrowRight size={16} />
            </button>
          </div>
          <div className="ideas-grid">
            {ideas.slice(0, 4).map(idea => {
              const article = articles.find(a => a.category === idea.category && a.title === idea.title)
              return (
                <IdeaCard
                  key={idea.title}
                  idea={idea}
                  onOpen={() => go(`/ideas/${article?.slug ?? 'customer-is-not-a-segment'}`)}
                />
              )
            })}
          </div>
        </section>

        {/* ── WORK WITH ME TEASER ── */}
        <section className="services-teaser">
          <div className="section-head">
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
              <article key={s.id} className="service-tile" onClick={() => go('/work-with-me')}>
                <span className="tile-num">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.tagline}</p>
                <button className="text-button small">Learn more <ArrowRight size={14} /></button>
              </article>
            ))}
          </div>
        </section>

        {/* ── SOCIAL PROOF ── */}
        <section className="social-proof">
          <p className="eyebrow">TRUSTED BY</p>
          <p className="proof-note">
            Client references and case studies available on request. Testimonials coming soon.
          </p>
          <div className="proof-placeholders">
            {['Consumer Brand', 'Digital Startup', 'Enterprise Team', 'NGO / Social Enterprise', 'Media Company'].map(t => (
              <div key={t} className="proof-placeholder">{t}</div>
            ))}
          </div>
          <div className="proof-stats">
            <div className="stat"><strong>10+</strong><span>Years in business strategy & consumer research</span></div>
            <div className="stat"><strong>Dhaka</strong><span>Based in Bangladesh, working globally</span></div>
            <div className="stat"><strong>Ideas</strong><span>Regularly published on LinkedIn and here</span></div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="final-cta">
          <p className="eyebrow">LET'S BEGIN</p>
          <h2>Have a business problem<br />worth talking through?</h2>
          <p>Every good engagement starts with a single conversation.</p>
          <button className="primary" onClick={() => go('/book')}>
            Let's Talk <ArrowRight size={16} />
          </button>
        </section>

      </main>
      <PublicFooter go={go} />
    </>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────

function AboutPage({ go }: Readonly<{ go: Go }>) {
  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/about" />
      <main className="public-page about-page">

        <div className="page-header">
          <p className="eyebrow">ABOUT MEHJABIN</p>
          <h1>I'm interested in the<br /><em>why behind the what.</em></h1>
        </div>

        {/* Intro split */}
        <section className="about-intro">
          <div className="about-portrait">
            <img src="/screen.png" alt="Mehjabin Badhon" />
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

        {/* Journey */}
        <section className="about-section">
          <div className="about-section-label">
            <p className="eyebrow">THE JOURNEY</p>
          </div>
          <div className="about-section-body">
            <h2>A career shaped by questions.</h2>
            <p>
              My professional journey has taken me through research, strategy and advisory
              roles — always circling back to the same core question: do businesses really
              understand the people they are trying to serve?
            </p>
            <p>
              The answer, more often than not, is that they think they do. The gap between
              what businesses assume and what customers actually experience is where most
              of the opportunity lives.
            </p>
            <p>
              I have spent my career working in and around that gap — helping teams
              see it clearly and do something useful with it.
            </p>
          </div>
        </section>

        {/* Quote */}
        <section className="about-pullquote">
          <blockquote>
            "The work is not to make business sound more complicated. It is to make the important things clearer."
          </blockquote>
        </section>

        {/* Belief */}
        <section className="about-section">
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

        {/* Expertise */}
        <section className="about-expertise">
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

        {/* Current work */}
        <section className="about-current">
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
      <PublicFooter go={go} />
    </>
  )
}

// ─── WORK WITH ME ─────────────────────────────────────────────────────────────

function WorkWithMePage({ go }: Readonly<{ go: Go }>) {
  const [activeService, setActiveService] = useState<string | null>(null)

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/work-with-me" />
      <main className="public-page work-page">

        <div className="page-header">
          <p className="eyebrow">WORK WITH ME</p>
          <h1>Start with the<br /><em>problem in front of you.</em></h1>
          <p className="page-lede">
            Different business questions call for different kinds of thinking.
            Here are the places we can begin.
          </p>
        </div>

        <div className="challenge-intro">
          <h2>Choose your challenge.</h2>
        </div>

        <div className="service-list">
          {services.map((s, i) => (
            <article
              key={s.id}
              className={`service-item${activeService === s.id ? ' open' : ''}`}
            >
              <button
                className="service-header"
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
                  <button className="primary" onClick={() => go('/book')}>
                    {s.cta} <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>

        <section className="work-cta">
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
      <PublicFooter go={go} />
    </>
  )
}

// ─── IDEAS ────────────────────────────────────────────────────────────────────

function IdeasPage({ go }: Readonly<{ go: Go }>) {
  const [filter, setFilter] = useState('All')
  const [query, setQuery] = useState('')

  const categories = ['All', 'Strategy', 'Customer', 'Marketing', 'Growth', 'Bangladesh Business', 'Leadership', 'Future']

  const list = useMemo(() =>
    articles.filter(x =>
      (filter === 'All' || x.category === filter) &&
      x.title.toLowerCase().includes(query.toLowerCase())
    ),
    [filter, query]
  )

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/ideas" />
      <main className="public-page ideas-page">

        <div className="page-header">
          <p className="eyebrow">IDEAS</p>
          <h1>Things worth<br /><em>thinking about.</em></h1>
          <p className="page-lede">
            Writing, talks and insights on business strategy, customer understanding
            and growth — mostly from a Bangladesh perspective, always with practical intent.
          </p>
        </div>

        <div className="library-tools">
          <div className="filter-tabs">
            {categories.map(x => (
              <button
                key={x}
                className={filter === x ? 'active' : ''}
                onClick={() => setFilter(x)}
              >
                {x}
              </button>
            ))}
          </div>
          <label className="search-box">
            <Search size={15} />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search ideas…"
            />
          </label>
        </div>

        {list.length === 0 ? (
          <div className="empty-state">
            <p>No results for "{query}" in {filter}.</p>
            <button className="text-button" onClick={() => { setFilter('All'); setQuery('') }}>Clear filters</button>
          </div>
        ) : (
          <div className="ideas-grid wide">
            {list.map(article => (
              <IdeaCard
                key={article.slug}
                idea={article}
                onOpen={() => go(`/ideas/${article.slug}`)}
              />
            ))}
          </div>
        )}

      </main>
      <PublicFooter go={go} />
    </>
  )
}

// ─── ARTICLE ─────────────────────────────────────────────────────────────────

function ArticlePage({ go, slug }: Readonly<{ go: Go; slug: string }>) {
  const article = articles.find(x => x.slug === slug) || articles[0]
  const related = articles.filter(x => x.slug !== article.slug).slice(0, 2)

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/ideas" />
      <main className="article-page">

        <div className="article-header">
          <button className="back-link" onClick={() => go('/ideas')}>← Ideas</button>
          <div className="article-meta">
            <span className="cat-badge">{article.category}</span>
            <span>{article.type}</span>
            <span>{article.date}</span>
            {'readTime' in article && <span>{(article as typeof articles[0]).readTime}</span>}
          </div>
          <h1>{article.title}</h1>
          <p className="article-dek">{article.excerpt}</p>
        </div>

        <div className="article-hero">
          <img src="/screen.png" alt="Mehjabin Badhon" />
          <span className="article-byline">Mehjabin Badhon · Let's Talk Business</span>
        </div>

        <div className="article-body">
          {article.body.map((text, i) => (
            i === 2
              ? <><blockquote key={i}>Understanding people well is not a soft skill. It is strategic infrastructure.</blockquote><p key={`${i}b`}>{text}</p></>
              : <p key={i}>{text}</p>
          ))}
        </div>

        <div className="article-end-cta">
          <h2>Have a question like this in your business?</h2>
          <p>I offer strategy and advisory conversations to help leaders think through exactly these kinds of problems.</p>
          <button className="primary" onClick={() => go('/book')}>
            Talk it through <ArrowRight size={16} />
          </button>
        </div>

        {related.length > 0 && (
          <div className="related-ideas">
            <p className="eyebrow">CONTINUE READING</p>
            <div className="related-grid">
              {related.map(x => (
                <IdeaCard key={x.slug} idea={x} onOpen={() => go(`/ideas/${x.slug}`)} />
              ))}
            </div>
          </div>
        )}

      </main>
      <PublicFooter go={go} />
    </>
  )
}

// ─── START HERE ──────────────────────────────────────────────────────────────

function StartHerePage({ go }: Readonly<{ go: Go }>) {
  const paths = [
    { label: "I'm building a business.", sub: 'Explore Business Strategy', desc: 'Get clarity on direction, priorities and the decisions that matter most.', path: '/work-with-me', icon: '◈' },
    { label: "I'm trying to grow.", sub: 'Explore Growth', desc: 'Find the sustainable, practical opportunities your business is ready for.', path: '/work-with-me', icon: '↑' },
    { label: "I'm struggling to understand my customers.", sub: 'Customer Strategy', desc: 'Build a real picture of who your customers are and what they need.', path: '/work-with-me', icon: '◎' },
    { label: "I want to work directly with Mehjabin.", sub: 'Book a Consultation', desc: "Start with a conversation. We'll find the right fit together.", path: '/book', icon: '→' },
    { label: "I want to learn from her thinking.", sub: 'Explore Ideas', desc: 'Articles, talks and insights on business, customers and growth.', path: '/ideas', icon: '✦' },
  ]

  return (
    <>
      <SiteHeader onNavigate={go} currentPath="/" />
      <main className="start-here-page">
        <div className="start-header">
          <p className="eyebrow">START HERE</p>
          <h1>What brings<br /><em>you here?</em></h1>
          <p className="lede">Choose the statement that best describes where you are right now.</p>
        </div>
        <div className="start-grid">
          {paths.map(p => (
            <button key={p.label} className="start-card" onClick={() => go(p.path)}>
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
      <PublicFooter go={go} />
    </>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function PublicFooter({ go }: Readonly<{ go: Go }>) {
  return (
    <footer className="public-footer">
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
          <button className="primary small" onClick={() => go('/book')}>
            Book a Consultation
          </button>
          <button className="footer-os-link" onClick={() => go('/admin')}>
            Business OS demo <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
      <div className="footer-base">
        <span>© 2026 Mehjabin Badhon. Let's Talk Business.</span>
        <span>Dhaka, Bangladesh · GMT+6</span>
      </div>
    </footer>
  )
}
