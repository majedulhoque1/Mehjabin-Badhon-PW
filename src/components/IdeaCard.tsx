import { ArrowUpRight } from 'lucide-react'
import type { Idea } from '../data/mockData'

interface IdeaCardProps {
  readonly idea: Idea
  readonly onOpen: () => void
  readonly isDemo?: boolean
  readonly index?: number
}

const typeColors: Record<string, string> = {
  Article: 'var(--rust)',
  Insight: '#8a6a1f',
  Video: '#3d5988',
  Talk: '#2d6e4e',
}

export function IdeaCard({ idea, onOpen, isDemo, index }: IdeaCardProps) {
  return (
    <article
      className="idea-card"
      data-reveal
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onOpen())}
    >
      <div className="card-meta">
        <span className="card-category">
          {typeof index === 'number' && <b className="card-index">{String(index + 1).padStart(2, '0')}</b>}
          {idea.category}
        </span>
        <span className="card-type" style={{ color: typeColors[idea.type] ?? 'var(--muted)' }}>
          {idea.type}
        </span>
      </div>
      <h3>{idea.title}</h3>
      <p>{idea.excerpt}</p>
      <footer>
        <small>{idea.date}{isDemo && <span className="demo-pill">DEMO</span>}</small>
        <button onClick={e => { e.stopPropagation(); onOpen() }} aria-label="Read idea">
          Read <ArrowUpRight size={15} />
        </button>
      </footer>
    </article>
  )
}
