import { ArrowUpRight } from 'lucide-react'
import type { Idea } from '../data/mockData'

interface IdeaCardProps {
  readonly idea: Idea
  readonly onOpen: () => void
}

const typeColors: Record<string, string> = {
  Article: '#a04024',
  Insight: '#785b00',
  Video: '#3d5988',
  Talk: '#2d6e4e',
}

export function IdeaCard({ idea, onOpen }: IdeaCardProps) {
  return (
    <article className="idea-card" onClick={onOpen} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && onOpen()}>
      <div className="card-meta">
        <span className="card-category">{idea.category}</span>
        <span className="card-type" style={{ color: typeColors[idea.type] ?? '#655f58' }}>
          {idea.type}
        </span>
      </div>
      <h3>{idea.title}</h3>
      <p>{idea.excerpt}</p>
      <footer>
        <small>{idea.date}</small>
        <button onClick={e => { e.stopPropagation(); onOpen() }} aria-label="Read idea">
          Read <ArrowUpRight size={15} />
        </button>
      </footer>
    </article>
  )
}
