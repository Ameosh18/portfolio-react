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

/* SVG paths from simple-icons v16 (bundled — no CDN dependency) */
const TOOL_ICONS = {
  'Claude': {
    bg: '#C47E3C', fg: '#ffffff',
    path: 'M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z',
  },
  'ChatGPT': { bg: '#10A37F', fg: '#ffffff', path: null },
  'Perplexity': {
    bg: '#1FB8CD', fg: '#ffffff',
    path: 'M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z',
  },
  'Figma AI': {
    bg: '#F24E1E', fg: '#ffffff',
    path: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z',
  },
  'Miro': {
    bg: '#FFD02F', fg: '#050038',
    path: 'M17.392 0H13.9L17 4.808 10.444 0H6.949l3.102 6.3L3.494 0H0l3.05 8.131L0 24h3.494L10.05 6.985 6.949 24h3.494L17 5.494 13.899 24h3.493L24 3.672 17.392 0z',
  },
  'FigJam': {
    bg: '#9747FF', fg: '#ffffff',
    path: 'M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z',
  },
  'Framer': {
    bg: '#0055FF', fg: '#ffffff',
    path: 'M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z',
  },
  'Maze': {
    bg: '#FF4F4F', fg: '#ffffff',
    path: 'M1.126 16.547c-1.5013-1.4881-1.5013-3.9009 0-5.389l4.0778-4.042c1.2692-1.258 3.205-1.4525 4.6803-.5836.4564.2687.4524.8852.077 1.2573-.3753.372-.988.34-1.4975.1923-.6524-.1891-1.386-.0287-1.9006.4813l-4.0777 4.0419a1.8935 1.8935 0 0 0 0 2.6945c.7506.744 1.9678.744 2.7184 0l8.1555-8.0836c1.5014-1.4882 3.9355-1.4882 5.437 0l4.0778 4.0418c1.5013 1.4881 1.5013 3.901 0 5.389-1.5014 1.4882-3.9356 1.4882-5.437 0l-1.3593-1.3472-1.699 1.684c-1.2692 1.258-3.205 1.4526-4.6804.5837-.4563-.2687-.4523-.8852-.077-1.2573.3754-.372.988-.34 1.4975-.1923.6524.1892 1.386.0287 1.9006-.4813l1.7476-1.7322c.724-.7175 1.8975-.7175 2.6214 0l1.4078 1.3954c.7507.744 1.9678.744 2.7186 0a1.8936 1.8936 0 0 0 0-2.6945l-4.0779-4.0419c-.7507-.744-1.9678-.744-2.7185 0L6.563 16.5471c-1.5014 1.4882-3.9356 1.4881-5.437 0',
  },
  'UserTesting': { bg: '#7C3AED', fg: '#ffffff', path: null },
  'Notion AI': {
    bg: '#3D3D3D', fg: '#ffffff',
    path: 'M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z',
  },
  'Analytics': {
    bg: '#E37400', fg: '#ffffff',
    path: 'M22.84 2.9982v17.9987c.0086 1.6473-1.3197 2.9897-2.967 2.9984a2.9808 2.9808 0 01-.3677-.0208c-1.528-.226-2.6477-1.5558-2.6105-3.1V3.1204c-.0369-1.5458 1.0856-2.8762 2.6157-3.1 1.6361-.1915 3.1178.9796 3.3093 2.6158.014.1201.0208.241.0202.3619zM4.1326 18.0548c-1.6417 0-2.9726 1.331-2.9726 2.9726C1.16 22.6691 2.4909 24 4.1326 24s2.9726-1.3309 2.9726-2.9726-1.331-2.9726-2.9726-2.9726zm7.8728-9.0098c-.0171 0-.0342 0-.0513.0003-1.6495.0904-2.9293 1.474-2.891 3.1256v7.9846c0 2.167.9535 3.4825 2.3505 3.763 1.6118.3266 3.1832-.7152 3.5098-2.327.04-.1974.06-.3983.0593-.5998v-8.9585c.003-1.6474-1.33-2.9852-2.9773-2.9882z',
  },
}

function ToolChip({ name }) {
  const info = TOOL_ICONS[name] ?? { path: null, bg: '#444444', fg: '#ffffff' }
  return (
    <li className="mp-tool-chip" style={{ background: info.bg }} data-tool={name} title={name}>
      {info.path ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" fill={info.fg} width="20" height="20">
          <path d={info.path} />
        </svg>
      ) : (
        <span className="mp-tool-chip-initial" style={{ color: info.fg }} aria-label={name}>{name[0]}</span>
      )}
    </li>
  )
}

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
                      {step.tools.map(t => <ToolChip key={t} name={t} />)}
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
