import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../style-2026.css'
import '../my-process.css'

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap'

const Ticks = () => (
  <>
    <span className="tick tl" aria-hidden="true" />
    <span className="tick tr" aria-hidden="true" />
    <span className="tick bl" aria-hidden="true" />
    <span className="tick br" aria-hidden="true" />
  </>
)

const SIGNALS = [
  { key: 'Research',    val: 'Synthesized' },
  { key: 'Exploration', val: 'Multi-directional' },
  { key: 'Validation',  val: 'Human-reviewed' },
  { key: 'Systems',     val: 'Scalable' },
]

const WORKFLOW_STEPS = [
  {
    num: '01',
    title: 'Understanding Signals',
    desc: 'Research patterns, behavioral friction, operational context. AI helps compress large volumes of input into structured direction.',
    tools: ['Claude', 'ChatGPT', 'Perplexity'],
  },
  {
    num: '02',
    title: 'Exploring Directions',
    desc: 'Flows, structures, interaction pathways, alternative systems. Faster exploration. Better strategic filtering.',
    tools: ['Figma AI', 'Miro', 'FigJam'],
  },
  {
    num: '03',
    title: 'Making and Testing',
    desc: 'Rapid prototyping, workflow validation, feedback synthesis, usability analysis. Signals over assumptions.',
    tools: ['Framer', 'Maze', 'UserTesting'],
  },
  {
    num: '04',
    title: 'Shipping and Learning',
    desc: 'Systems evolve through usage patterns, feedback loops, and operational data. Iteration stays continuous.',
    tools: ['Notion AI', 'Analytics'],
  },
]

const STACK_GROUPS = [
  { category: 'Research Intelligence',  tools: ['Claude', 'ChatGPT', 'Perplexity'] },
  { category: 'Systems and Mapping',    tools: ['Miro', 'FigJam'] },
  { category: 'Validation Layer',       tools: ['Maze', 'UserTesting'] },
  { category: 'Documentation Flow',     tools: ['Notion AI'] },
  { category: 'Prototype Operations',   tools: ['Figma AI', 'Framer'] },
]

const METRICS = [
  { value: '+40%',       label: 'Workflow acceleration' },
  { value: '3x',        label: 'Exploration range' },
  { value: '-28%',       label: 'Repetitive overhead' },
  { value: 'Human-led', label: 'Final decisions' },
]

export default function MyProcessPage() {
  const rootRef = useRef(null)

  useEffect(() => {
    document.title = 'My Process - Ameya Kulkarni'
    if (!document.getElementById('home-2026-fonts')) {
      const link = document.createElement('link')
      link.id = 'home-2026-fonts'
      link.rel = 'stylesheet'
      link.href = FONTS_HREF
      document.head.appendChild(link)
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = root.querySelectorAll('.reveal')
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="mp-root">
      <main id="my-process-view">

        {/* ── HERO ── */}
        <section className="section mp-hero" aria-labelledby="mp-hero-heading">
          <div className="container">
            <div className="mp-hero-grid">

              <div className="mp-hero-left reveal">
                <span className="eyebrow">My Process</span>
                <h1 id="mp-hero-heading" className="mp-hero-h1">
                  Where systems thinking,<br />
                  UX strategy,<br />
                  and AI workflows meet.
                </h1>
                <p className="mp-hero-lead">
                  Built for complexity, speed,<br />
                  and operational clarity.
                </p>
                <p className="mp-hero-sub">
                  AI supports synthesis, exploration, and validation<br />
                  while product judgment remains human-led.
                </p>
              </div>

              <aside className="mp-signals bp-card reveal" aria-label="Process signals overview">
                <div className="card-head">
                  <span>Process Signals</span>
                  <span className="mp-signals-status">
                    <span className="mp-pulse" aria-hidden="true" />
                    Active
                  </span>
                </div>
                <ul className="mp-signals-list">
                  {SIGNALS.map(({ key, val }) => (
                    <li key={key} className="mp-signal-row">
                      <span className="mp-signal-dot" aria-hidden="true" />
                      <span className="mp-signal-key">{key}</span>
                      <span className="mp-signal-val">{val}</span>
                    </li>
                  ))}
                </ul>
                <p className="mp-signals-note">Human judgment remains central.</p>
              </aside>

            </div>
          </div>
        </section>

        {/* ── AI PHILOSOPHY CALLOUT ── */}
        <section className="section mp-philosophy" aria-label="Design philosophy">
          <div className="container">
            <div className="mp-philosophy-block bp-frame reveal">
              <Ticks />
              <p className="mp-philosophy-line">AI accelerates exploration.</p>
              <p className="mp-philosophy-line dim">It does not own the decision.</p>
            </div>
          </div>
        </section>

        {/* ── WORKFLOW ── */}
        <section className="section mp-workflow" aria-labelledby="mp-workflow-heading">
          <div className="container">
            <div className="mp-section-head reveal">
              <span className="eyebrow">Operational Flow</span>
              <h2 id="mp-workflow-heading" className="section-title">
                How intelligence<br />moves through the workflow.
              </h2>
            </div>

            <ol className="mp-workflow-list" aria-label="4-step design workflow">
              {WORKFLOW_STEPS.map((step, i) => (
                <li
                  key={step.num}
                  className="mp-wf-block bp-frame reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <Ticks />
                  <span className="mp-wf-num" aria-hidden="true">{step.num}</span>
                  <div className="mp-wf-body">
                    <h3 className="mp-wf-title">{step.title}</h3>
                    <p className="mp-wf-desc">{step.desc}</p>
                    <ul className="mp-wf-tools" aria-label="Tools used">
                      {step.tools.map(t => <li key={t} className="mp-wf-tool">{t}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── INFRASTRUCTURE / STACK ── */}
        <section className="section mp-stack" aria-labelledby="mp-stack-heading">
          <div className="container">
            <div className="mp-section-head reveal">
              <span className="eyebrow">Workflow Layer</span>
              <h2 id="mp-stack-heading" className="section-title">
                The operational stack<br />behind the process.
              </h2>
            </div>

            <div className="mp-stack-grid">
              {STACK_GROUPS.map((group, i) => (
                <div
                  key={group.category}
                  className="mp-stack-card bp-card reveal"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <div className="card-head">
                    <span>{group.category}</span>
                  </div>
                  <ul className="mp-stack-tools" aria-label={`Tools: ${group.category}`}>
                    {group.tools.map(tool => (
                      <li key={tool} className="mp-stack-tool">
                        <span className="mp-dot" aria-hidden="true" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── METRICS ── */}
        <section className="section mp-metrics" aria-labelledby="mp-metrics-heading">
          <div className="container">
            <h2 id="mp-metrics-heading" className="sr-only">Process impact metrics</h2>
            <div className="mp-metrics-grid">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className="mp-metric-block reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="mp-metric-value">{m.value}</span>
                  <span className="mp-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FUTURE THINKING ── */}
        <section className="section mp-future" aria-labelledby="mp-future-heading">
          <div className="container">
            <div className="mp-future-inner reveal">
              <span className="eyebrow">Future Direction</span>
              <h2 id="mp-future-heading" className="section-title">
                Designing systems<br />for adaptive product ecosystems.
              </h2>
              <div className="mp-future-copy">
                <p>The future is not faster production.</p>
                <p>It is better decisions, clearer systems,</p>
                <p>and more adaptive workflows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section mp-cta" aria-labelledby="mp-cta-heading">
          <div className="container">
            <div className="mp-cta-inner reveal">
              <h2 id="mp-cta-heading" className="section-title">
                Built for modern product teams.
              </h2>
              <p className="mp-cta-sub">
                Strategy. Systems. Execution.
              </p>
              <div className="mp-cta-actions">
                <Link to="/work" className="btn btn-primary">
                  See the Work <span className="arrow" aria-hidden="true">&#x2192;</span>
                </Link>
                <Link to="/" className="btn btn-ghost">
                  Back to Home <span className="arrow" aria-hidden="true">&#x2192;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
