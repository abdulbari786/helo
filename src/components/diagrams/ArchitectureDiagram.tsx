import { useInViewOnce } from '@/lib/hooks'
import { cn } from '@/lib/cn'

type Box = { id: string; x: number; y: number; w?: number; label: string; sub?: string; accent?: boolean }
type Edge = [string, string]

interface Spec {
  title: string
  boundary?: string
  lanes: { label: string; y: number }[]
  boxes: Box[]
  edges: Edge[]
  caption: string
}

const BW = 150
const BH = 62

/** Architectures drawn strictly from the "How We Built It" text in the projects file. */
const specs: Record<'documind' | 'knowledge-navigator', Spec> = {
  documind: {
    title: 'DocuMind architecture',
    boundary: 'Containerised deployment · Docker / Kubernetes',
    lanes: [
      { label: 'Ingestion', y: 70 },
      { label: 'Question answering', y: 230 },
    ],
    boxes: [
      { id: 'docs', x: 40, y: 70, label: 'Documents', sub: 'collections' },
      { id: 'chunk', x: 230, y: 70, label: 'Extraction', sub: '& chunking' },
      { id: 'embed', x: 420, y: 70, label: 'Embeddings', sub: 'SentenceTransformers' },
      { id: 'faiss', x: 610, y: 70, label: 'Vector index', sub: 'FAISS', accent: true },
      { id: 'ui', x: 40, y: 230, label: 'React UI', sub: 'chat · dashboard' },
      { id: 'api', x: 230, y: 230, label: 'FastAPI', sub: 'authenticated APIs' },
      { id: 'rag', x: 420, y: 230, label: 'LangChain', sub: 'retrieval + RAG', accent: true },
      { id: 'llm', x: 610, y: 230, label: 'Language model', sub: 'response generation' },
      { id: 'pg', x: 790, y: 150, w: 130, label: 'PostgreSQL', sub: 'app data' },
    ],
    edges: [
      ['docs', 'chunk'],
      ['chunk', 'embed'],
      ['embed', 'faiss'],
      ['ui', 'api'],
      ['api', 'rag'],
      ['rag', 'faiss'],
      ['rag', 'llm'],
      ['api', 'pg'],
    ],
    caption: 'Documents are chunked, embedded and indexed in FAISS; questions flow through FastAPI to LangChain retrieval and the language model.',
  },
  'knowledge-navigator': {
    title: 'Knowledge Navigator architecture',
    boundary: 'Local, controlled environment · no documents sent to an external cloud service',
    lanes: [
      { label: 'Local indexing', y: 70 },
      { label: 'Search & exploration', y: 230 },
    ],
    boxes: [
      { id: 'docs', x: 40, y: 70, label: 'Local documents', sub: 'controlled access' },
      { id: 'prep', x: 230, y: 70, label: 'Ingestion', sub: 'Python preparation' },
      { id: 'embed', x: 420, y: 70, label: 'Embeddings', sub: 'PyTorch · CUDA', accent: true },
      { id: 'faiss', x: 610, y: 70, label: 'Vector index', sub: 'FAISS' },
      { id: 'ui', x: 40, y: 230, label: 'Streamlit / React', sub: 'query & explore' },
      { id: 'api', x: 230, y: 230, label: 'FastAPI', sub: 'local endpoints' },
      { id: 'search', x: 420, y: 230, label: 'Semantic search', sub: 'similar content', accent: true },
      { id: 'sqlite', x: 610, y: 230, label: 'SQLite', sub: 'local storage' },
      { id: 'docker', x: 790, y: 150, w: 130, label: 'Docker', sub: 'packaged deploy' },
    ],
    edges: [
      ['docs', 'prep'],
      ['prep', 'embed'],
      ['embed', 'faiss'],
      ['ui', 'api'],
      ['api', 'search'],
      ['search', 'faiss'],
      ['api', 'sqlite'],
    ],
    caption: 'Everything runs inside a controlled local environment: documents are embedded and indexed locally, then searched through local APIs.',
  },
}

export function ArchitectureDiagram({ kind }: { kind: 'documind' | 'knowledge-navigator' }) {
  const s = specs[kind]
  const [ref, inView] = useInViewOnce<HTMLDivElement>()
  const byId = Object.fromEntries(s.boxes.map((b) => [b.id, b]))
  const center = (b: Box) => ({ x: b.x + (b.w ?? BW) / 2, y: b.y + BH / 2 })

  const path = ([a, b]: Edge) => {
    const A = byId[a]
    const B = byId[b]
    const ca = center(A)
    const cb = center(B)
    if (Math.abs(ca.y - cb.y) < 4) {
      const [l, r] = ca.x < cb.x ? [A, B] : [B, A]
      return `M${l.x + (l.w ?? BW)} ${ca.y} L${r.x} ${cb.y}`
    }
    // vertical / diagonal connector with a soft elbow
    const sx = ca.x
    const sy = ca.y < cb.y ? A.y + BH : A.y
    const ex = cb.x < ca.x - 40 || cb.x > ca.x + 40 ? (cb.x > ca.x ? B.x : B.x + (B.w ?? BW)) : cb.x
    const ey = Math.abs(cb.x - ca.x) > 40 ? cb.y : ca.y < cb.y ? B.y : B.y + BH
    return `M${sx} ${sy} C${sx} ${(sy + ey) / 2}, ${ex - (ex > sx ? 30 : -30)} ${ey}, ${ex} ${ey}`
  }

  return (
    <figure className="card overflow-hidden" aria-labelledby={`${kind}-cap`}>
      <div ref={ref} className="no-scrollbar overflow-x-auto p-4 sm:p-6">
        <svg viewBox="0 0 960 340" role="img" aria-label={s.title} className={cn('arch min-w-[720px]', inView && 'arch-in')}>
          <defs>
            <marker id={`${kind}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10z" className="fill-brand" />
            </marker>
          </defs>
          {s.boundary && (
            <g>
              <rect x="16" y="16" width="928" height="310" rx="18" className="fill-none stroke-brand/40" strokeDasharray="6 6" strokeWidth="1.5" />
              <text x="32" y="40" className="fill-brand text-[12px] font-semibold">
                {s.boundary}
              </text>
            </g>
          )}
          {s.lanes.map((l) => (
            <text key={l.label} x="40" y={l.y - 12} className="fill-muted text-[11px] font-semibold uppercase tracking-wider">
              {l.label}
            </text>
          ))}
          {s.edges.map((e, i) => (
            <g key={e.join('-')}>
              <path d={path(e)} className="fill-none stroke-line" strokeWidth="2" />
              <path d={path(e)} className="arch-flow fill-none stroke-brand" strokeWidth="2" markerEnd={`url(#${kind}-arrow)`} style={{ animationDelay: `${i * 0.18}s` }} />
            </g>
          ))}
          {s.boxes.map((b, i) => (
            <g key={b.id} className="arch-node" style={{ transitionDelay: `${i * 70}ms` }}>
              <rect x={b.x} y={b.y} width={b.w ?? BW} height={BH} rx="12" className={b.accent ? 'fill-brand-tint stroke-brand' : 'fill-surface stroke-line'} strokeWidth="1.5" />
              <text x={b.x + (b.w ?? BW) / 2} y={b.y + 27} textAnchor="middle" className="fill-ink font-display text-[14px] font-semibold">
                {b.label}
              </text>
              {b.sub && (
                <text x={b.x + (b.w ?? BW) / 2} y={b.y + 46} textAnchor="middle" className="fill-muted text-[11px]">
                  {b.sub}
                </text>
              )}
            </g>
          ))}
        </svg>
      </div>
      <figcaption id={`${kind}-cap`} className="border-t border-line px-5 py-4 text-fluid-sm text-muted">
        <span className="mb-1 block text-fluid-xs font-semibold text-brand sm:hidden">Swipe to see the full diagram →</span>
        {s.caption}
      </figcaption>
    </figure>
  )
}
