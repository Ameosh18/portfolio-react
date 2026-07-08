import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style-2026.css'
import '../about.css'
import symbiosisLogo from '/symbiosis-logo.png'

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
    period: 'Aug 2020 – Present · Pune, India',
    company: 'Globant · Enterprise IoT · Fintech · SaaS, 6 projects delivered across web, iOS, and Android',
    bullets: [
      'Led end-to-end experience design across 6 enterprise products, starting with customer problem definition, working backwards through research and iteration to ship solutions that drove a 35%+ engagement lift and 2.5-second reduction in task completion time.',
      'Analysed real usage data and site metrics alongside usability findings to identify customer drop-off patterns, translating insights into design optimisations validated through A/B testing and iterative prototyping.',
      'Presented and defended design decisions to product and engineering leadership across 8+ cross-functional teams, maintaining design direction under stakeholder pressure while incorporating evidence-backed feedback.',
      'Governed 4+ design systems, driving adoption of visual design guidelines and interaction patterns across product teams, accelerating engineering handoff and ensuring consistency at scale.',
      'Ran Scrum-integrated design sprints, including sprint planning, backlog grooming, and retrospectives, ensuring design velocity matched engineering delivery cadence.',
    ],
  },
  {
    num: '02',
    role: 'Senior UX Consultant',
    period: 'Mar 2020 – Aug 2020 · Pune, India',
    company: 'Thought-Craft · B2B Enterprise Applications',
    bullets: [
      'Translated B2B enterprise requirements into UX scenarios, task flows, and product workflows, creating storyboards to communicate design intent to stakeholder and engineering teams.',
      'Produced low and high-fidelity prototypes in rapid iteration cycles, validating interaction models and reducing design ambiguity before development handoff.',
    ],
  },
  {
    num: '03',
    role: 'Senior UX Designer',
    period: 'Dec 2019 – Feb 2020 · Pune, India',
    company: 'Innoplexus · AI-driven Pharma Data Products',
    bullets: [
      'Designed wireframes, mockups, information architecture diagrams, and UI pattern libraries for AI-driven pharma data platforms.',
      'Built rapid prototypes to translate complex AI concepts into testable visual assets, enabling the product team to converge on design directions faster.',
    ],
  },
  {
    num: '04',
    role: 'Senior Interaction Designer',
    period: 'Feb 2019 – Oct 2019 · Pune, India',
    company: 'Ogee Studio · Cybersecurity B2B Enterprise',
    bullets: [
      'Designed enterprise cybersecurity interaction models by translating security domain requirements into UX scenarios, task flows, and storyboards mapped to expert user mental models.',
      'Maintained design consistency across multiple B2B application suites through iterative stakeholder review cycles and documented interaction patterns.',
    ],
  },
  {
    num: '05',
    role: 'UX Designer, Lead on DiGiSense (Mahindra Design Partner)',
    period: 'Feb 2018 – Feb 2019 · Pune, India',
    company: 'Extentia Information Technology · Enterprise B2B: Connected telematics platform deployed across 28,000+ Mahindra tractors',
    bullets: [
      'Led first-ever consumer research for DiGiSense: 44 field interviews across 5 states in 4 languages, identifying that 50% of features were unknown to users and the dealer onboarding moment was the structural root cause of adoption failure across 28,000+ deployed units.',
      'Worked backwards from customer reality to redesign the geofencing flow from 37 clicks / 350 seconds to a 3-step mobile-native interaction, and rebuilt the dashboard from 16 equally weighted features to 5 prioritised elements using progressive disclosure driven by actual usage patterns.',
      "Presented research findings and strategic recommendations, including a SIM card infrastructure change, directly to Mahindra senior leadership, defending data-backed design decisions against existing product assumptions and shifting the product team's understanding of the adoption problem.",
    ],
  },
  {
    num: '06',
    role: 'Interaction Designer',
    period: 'May 2016 – Oct 2017 · Pune, India',
    company: 'Ogee Studio · Cybersecurity: 3 Projects including NETSCOUT PFS ONE',
    bullets: [
      'Defined and drove the experience vision for NETSCOUT PFS ONE, a global enterprise visibility fabric platform, designing lifecycle-based navigation, perspective-based left panel, and staged topology publishing that shipped as core product architecture deployed across enterprise data centres worldwide.',
      'Navigated high-stakes design decisions for zero-error-tolerance expert users, producing detailed UI specifications for engineering, presenting design rationale to product leadership, and maintaining design direction through multiple review cycles across a one-year engagement.',
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
                  {i === 0 && (
                    <img
                      src={symbiosisLogo}
                      alt="Symbiosis Institute of Design logo"
                      className="ab-edu-sticker"
                    />
                  )}
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
