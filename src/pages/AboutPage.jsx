import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style-2026.css'
import '../about.css'

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

const IDENTITY = [
  { key: 'Role',       val: 'Lead UX Designer' },
  { key: 'Experience', val: '10+ Years' },
  { key: 'Focus',      val: 'B2B SaaS · Fintech · AI' },
  { key: 'Status',     val: 'Available', pulse: true },
]

const EXPERTISE_BLOCKS = [
  {
    num: '01',
    title: 'UX Strategy',
    desc: 'Translating ambiguous product problems into clear design direction. Stakeholder alignment. Roadmap influence. Business-outcome framing.',
  },
  {
    num: '02',
    title: 'Design Systems',
    desc: 'Shipped 4+ design systems across enterprise products. Component architecture, token governance, multi-team adoption.',
  },
  {
    num: '03',
    title: 'Cross-functional Leadership',
    desc: 'Led teams of 8+. Embedded with product, engineering, and research. Design as a shared practice, not a delivery handoff.',
  },
  {
    num: '04',
    title: 'AI-Augmented Workflows',
    desc: 'Synthesis, exploration, and validation. Judgment stays human.',
    link: { to: '/my-process', label: 'See full process' },
  },
]

const METRICS = [
  { value: '10+ yrs', label: 'Industry experience' },
  { value: '4+',      label: 'Design systems shipped' },
  { value: '8+',      label: 'Team members led' },
  { value: '35%+',    label: 'Avg. engagement lift' },
]

const WORK_EXPERIENCE = [
  {
    num: '01',
    role: 'Senior UX Designer',
    period: 'Aug 2020 - Present · Pune',
    company: 'Globant · Enterprise IoT, Fintech, SaaS · 6 Projects',
    bullets: [
      'Partnered directly with clients on product strategy, building user-centric interaction models, screen flows, and detailed designs across web, Android, and iOS.',
      'Applied WCAG accessibility standards across enterprise applications, cutting task completion time by 2.5s and driving a 35%+ engagement lift on flagship IoT dashboards.',
      'Ran heuristic evaluations and turned them into personas, user flows, and clickable prototypes, iterating fast with 8+ cross-functional teams.',
    ],
  },
  {
    num: '02',
    role: 'Senior UX Consultant',
    period: 'Mar 2020 - Aug 2020 · Pune',
    company: 'Thought-Craft · B2B Enterprise Applications',
    bullets: [
      'Translated enterprise requirements into UX scenarios, task flows, and workflows, using storyboards to communicate design intent to stakeholders.',
      'Converted complex problems into working low and high-fidelity prototypes to validate direction quickly with stakeholders.',
    ],
  },
  {
    num: '03',
    role: 'Senior UX Designer',
    period: 'Dec 2019 - Feb 2020 · Pune',
    company: 'Innoplexus · AI, Pharma Data',
    bullets: [
      'Designed low and high-fidelity wireframes and mockups, including IA diagrams, UI pattern libraries, and interaction guidelines for AI-driven pharma data products.',
      'Built rapid prototypes that turned abstract ideas into visual assets, helping the product team converge faster on solutions ready for development handoff.',
    ],
  },
  {
    num: '04',
    role: 'Senior Interaction Designer',
    period: 'Feb 2019 - Oct 2019 · Pune',
    company: 'Ogee Studio · Cybersecurity B2B',
    bullets: [
      'Translated security product requirements into UX scenarios, task flows, and storyboards, then produced low and high-fidelity prototypes for stakeholder validation.',
      'Mapped complex cybersecurity requirements to interaction models and workflows, keeping design consistent across the B2B application suite.',
    ],
  },
  {
    num: '05',
    role: 'UX Designer',
    period: 'Feb 2018 - Feb 2019 · Pune',
    company: 'Extentia Information Technology · Enterprise B2B',
    bullets: [
      'Converted briefs into user-centric interfaces, task flows, and interaction models through competitive analysis and primary research, including user interviews.',
      'Built low-to-high fidelity prototypes, tracked usability goals, reported to senior management, and worked closely with developers for cohesive delivery.',
    ],
  },
  {
    num: '06',
    role: 'Interaction Designer',
    period: 'May 2016 - Oct 2017 · Pune',
    company: 'Ogee Studio · Cybersecurity · 3 Projects',
    bullets: [
      'Took in requirements and translated them into UX scenarios, task flows, storyboards, and low and high-fidelity prototypes across 3 cybersecurity products.',
      'Mapped requirements into product workflows and contributed to design critiques and cross-team reviews to keep solution quality high.',
    ],
  },
]

const EDUCATION = [
  {
    num: '01',
    title: 'Bachelor of Design, User Experience Design',
    desc: 'Symbiosis Institute of Design, Pune.',
    period: '2012-2016',
  },
  {
    num: '02',
    title: 'Visiting Faculty, Symbiosis Institute of Design',
    desc: 'External jury and programme review committee member.',
    period: 'Since 2023',
  },
  {
    num: '03',
    title: 'Ideator, Analyzethis.ai',
    desc: 'AI product strategy.',
    period: 'Since 2025',
  },
]

const VALUES = [
  'I design for the people using it, not the people reviewing it.',
  'Systems thinking first. Visual execution second.',
  'Decisions without data are guesses. I prefer signals.',
]

const HERO_PHOTO_SRC = `${import.meta.env.BASE_URL}ameya-about-photo.jpg`

export default function AboutPage() {
  const rootRef = useRef(null)
  const [photoError, setPhotoError] = useState(false)

  useEffect(() => {
    document.title = 'About Me - Ameya Kulkarni'
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
    <div ref={rootRef} className="ab-root">
      <main id="about-view">

        {/* ── HERO ── */}
        <section className="section ab-hero" aria-labelledby="ab-hero-heading">
          <div className="container">
            <div className="ab-hero-grid">

              <div className="ab-hero-left reveal">
                <span className="eyebrow">About Me</span>
                <h1 id="ab-hero-heading" className="ab-hero-h1">
                  10+ years shipping<br />
                  systems that move people.
                </h1>
                <p className="ab-hero-lead">
                  Enterprise B2B SaaS, fintech, emerging AI workflows.<br />
                  Across all of it, the constant has been design that holds up<br />
                  operationally, not just visually.
                </p>
                <p className="ab-hero-sub">Lead UX Designer. Available for new opportunities.</p>

                <aside className="ab-identity" aria-label="Identity overview">
                  <ul className="ab-id-list">
                    {IDENTITY.map(({ key, val, pulse }) => (
                      <li key={key} className="ab-id-row">
                        <span className="ab-id-key">{key}</span>
                        <span className="ab-id-val">
                          {pulse && <span className="ab-pulse" aria-hidden="true" />}
                          {val}
                        </span>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>

              <div className="ab-hero-right reveal">
                <div className="ab-hero-photo bp-frame">
                  <Ticks />
                  {photoError ? (
                    <div className="ab-hero-photo-placeholder">
                      <span>Ameya Kulkarni</span>
                    </div>
                  ) : (
                    <img
                      src={HERO_PHOTO_SRC}
                      alt="Portrait of Ameya Kulkarni"
                      onError={() => setPhotoError(true)}
                    />
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── METRICS ── */}
        <section className="section ab-metrics" aria-labelledby="ab-metrics-heading">
          <div className="container">
            <h2 id="ab-metrics-heading" className="sr-only">Career impact metrics</h2>
            <div className="ab-metrics-grid">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className="ab-metric-block reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="ab-metric-value">{m.value}</span>
                  <span className="ab-metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERTISE ── */}
        <section className="section ab-expertise" aria-labelledby="ab-expertise-heading">
          <div className="container">
            <div className="ab-section-head reveal">
              <span className="eyebrow">What I Do</span>
              <h2 id="ab-expertise-heading" className="section-title">
                The four areas<br />I've built my practice around.
              </h2>
            </div>

            <ol className="ab-exp-list" aria-label="4 areas of expertise">
              {EXPERTISE_BLOCKS.map((block, i) => (
                <li
                  key={block.num}
                  className="ab-exp-block bp-frame reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <Ticks />
                  <span className="ab-exp-num" aria-hidden="true">{block.num}</span>
                  <div className="ab-exp-body">
                    <h3 className="ab-exp-title">{block.title}</h3>
                    <p className="ab-exp-desc">{block.desc}</p>
                    {block.link && (
                      <Link to={block.link.to} className="ab-exp-link">
                        {block.link.label} <span aria-hidden="true">&#x2192;</span>
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── WORK EXPERIENCE ── */}
        <section className="section ab-work" aria-labelledby="ab-work-heading">
          <div className="container">
            <div className="ab-section-head reveal">
              <span className="eyebrow">Where I've Worked</span>
              <h2 id="ab-work-heading" className="section-title">
                Six roles, one decade,<br />the same throughline.
              </h2>
            </div>

            <ol className="ab-work-list" aria-label="Work experience, 6 roles, most recent first">
              {WORK_EXPERIENCE.map((job, i) => (
                <li
                  key={job.num}
                  className="ab-work-item reveal"
                  style={{ transitionDelay: `${i * 0.05}s` }}
                >
                  <span className="ab-work-num" aria-hidden="true">{job.num}</span>
                  <div className="ab-work-body">
                    <div className="ab-work-header">
                      <h3 className="ab-work-role">{job.role}</h3>
                      <span className="ab-work-period">{job.period}</span>
                    </div>
                    <p className="ab-work-company">{job.company}</p>
                    <ul className="ab-work-bullets">
                      {job.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="section ab-education" aria-labelledby="ab-education-heading">
          <div className="container">
            <div className="ab-section-head reveal">
              <span className="eyebrow">Education</span>
              <h2 id="ab-education-heading" className="section-title">
                Where it started,<br />and where I still show up.
              </h2>
            </div>

            <ul className="ab-edu-list" aria-label="Education and teaching">
              {EDUCATION.map((edu, i) => (
                <li
                  key={edu.num}
                  className="ab-edu-block bp-frame reveal"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <Ticks />
                  <span className="ab-edu-num" aria-hidden="true">{edu.num}</span>
                  <h3 className="ab-edu-title">{edu.title}</h3>
                  <p className="ab-edu-desc">{edu.desc}</p>
                  <span className="ab-edu-period">{edu.period}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="section ab-values" aria-labelledby="ab-values-heading">
          <div className="container">
            <div className="ab-values-inner reveal">
              <span className="eyebrow">How I Think</span>
              <h2 id="ab-values-heading" className="section-title" style={{ marginTop: '16px', marginBottom: 'clamp(32px, 4vw, 56px)' }}>
                A few things I believe<br />about good design.
              </h2>
              <ul className="ab-values-list" aria-label="Design values">
                {VALUES.map((v, i) => (
                  <li key={i} className="ab-value-line reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section ab-cta" aria-labelledby="ab-cta-heading">
          <div className="container">
            <div className="ab-cta-inner reveal">
              <h2 id="ab-cta-heading" className="section-title">
                Open to the right opportunity.
              </h2>
              <p className="ab-cta-sub">
                Full-time or contract. Product, platform, or AI-native teams.
              </p>
              <div className="ab-cta-actions">
                <a href="mailto:ameosh18@gmail.com" className="btn btn-primary">
                  Get in Touch <span className="arrow" aria-hidden="true">&#x2192;</span>
                </a>
                <Link to="/work" className="btn btn-ghost">
                  See the Work <span className="arrow" aria-hidden="true">&#x2192;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
