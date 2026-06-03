import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import NamePopup from '../components/NamePopup';
import { useName } from '../context/NameContext';
import digisenseHero from '/digisense_hero_image.png';
import '../style-2026.css';

const DIGISENSE_IMG = digisenseHero;

const CLIENTS = [
  { name: 'Globant',                         role: 'Senior UX Designer',          period: 'Aug 2020 – Present', tag: 'Enterprise · IoT · Fintech', logo: '/portfolio-react/GLOB.png' },
  { name: 'Thought-Craft',                  role: 'Sr. UX Consultant',            period: 'Mar 2020 – Aug 2020', tag: 'Innovation Lab · B2B',        logo: null },
  { name: 'Innoplexus',                      role: 'Sr. UX Designer',              period: 'Dec 2019 – Feb 2020', tag: 'AI · Pharma Data',             logo: null },
  { name: 'Ogee Studio',                     role: 'Sr. Interaction Designer',     period: 'Feb 2019 – Oct 2019', tag: 'Cybersecurity · B2B',          logo: null },
  { name: 'Extentia Information Technology', role: 'UX Designer',                  period: 'Feb 2018 – Feb 2019', tag: 'Enterprise · B2B',             logo: null },
];

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap';

const PROCESS_STEPS = [
  {
    num: '01',
    title: 'Understanding',
    desc: 'Research isn\'t just interviews. I use Claude and ChatGPT to synthesize user feedback, competitive patterns, and domain research. Faster synthesis means I get to the strategic thinking sooner.',
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><line x1="16" y1="16" x2="21" y2="21" /></svg>
    ),
  },
  {
    num: '02',
    title: 'Exploring Ideas',
    desc: 'Figma AI and Claude help me generate variations and test frameworks quickly. This isn\'t about volume. It\'s about exploring the space thoroughly before committing direction.',
    icon: (
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /></svg>
    ),
  },
  {
    num: '03',
    title: 'Making & Testing',
    desc: 'High-fidelity prototypes in Figma and Framer. The goal is fast feedback with users and stakeholders, not polished mockups for the shelf. Speed matters when you\'re learning.',
    icon: (
      <svg viewBox="0 0 24 24"><polygon points="12,3 19,7 19,17 12,21 5,17 5,7" /><line x1="12" y1="3" x2="12" y2="12" /></svg>
    ),
  },
  {
    num: '04',
    title: 'Shipping & Learning',
    desc: 'I track what actually happens post-launch: user behavior, engagement patterns, feedback. This informs the next iteration. The 35%+ engagement lifts? They come from this cycle, not luck.',
    icon: (
      <svg viewBox="0 0 24 24"><path d="M4 13l5 5L20 6" /></svg>
    ),
  },
];

const Ticks = () => (
  <>
    <span className="tick tl" /><span className="tick tr" />
    <span className="tick bl" /><span className="tick br" />
  </>
);

export default function Homepage() {
  const rootRef = useRef(null);
  const pausedRef = useRef(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const { name } = useName();

  // Inject Google Fonts once (idempotent)
  useEffect(() => {
    if (document.getElementById('home-2026-fonts')) return;
    const pre1 = Object.assign(document.createElement('link'), { rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    const pre2 = Object.assign(document.createElement('link'), { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' });
    const css = Object.assign(document.createElement('link'), { id: 'home-2026-fonts', rel: 'stylesheet', href: FONTS_HREF });
    document.head.append(pre1, pre2, css);
    document.title = 'Ameya Kulkarni - Lead UX Designer';
  }, []);

  // Scroll reveal
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = root.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Process step auto-sequencer (pauses on hover)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = setInterval(() => {
      if (!pausedRef.current) setActiveStep((s) => (s + 1) % PROCESS_STEPS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (showLoading) return;
    // Skip the name popup on touchscreen / tablet + mobile breakpoints
    const isTouchOrSmall =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(max-width: 1024px)').matches;
    if (!name && !isTouchOrSmall) {
      setTimeout(() => setShowPopup(true), 400);
    } else {
      setContentReady(true);
    }
  }, [showLoading, name]);

  return (
    <>
      <LoadingScreen onComplete={() => setShowLoading(false)} />
      <NamePopup show={showPopup} onClose={() => {
        setShowPopup(false);
        setContentReady(true);
      }} />
      <div ref={rootRef} id="home-view" className={contentReady ? '' : 'content-blurred'}>
      <main id="top">
        {/* ── HERO ── */}
        <section className="section hero" id="hero">
          <div className="container">
            <div className="hero-grid bp-frame">
              <Ticks />

              <div className="hero-copy reveal">
                <span className="eyebrow">Lead UX Designer</span>
                <h1>I design where systems thinking, UX strategy,<br />and AI workflows meet.</h1>
                <p className="hero-sub"><span>9.5 years in fintech, IoT, and SaaS</span> · <span>I build systems, lead teams, and solve problems that matter.</span></p>
                <p className="hero-about">I design in the messy, high-stakes domains: fintech, IoT, and enterprise infrastructure. 9.5 years making complex products feel clear, and shipping things that move metrics.</p>
                <div className="hero-ctas">
                  <Link to="/work" className="btn btn-primary">View All Work <span className="arrow">→</span></Link>
                  <span className="status-pill hero-avail"><span className="dot" />Open to opportunities</span>
                </div>
              </div>

              <div className="hero-visual reveal">
                {/* Character image */}
                <img
                  src="/portfolio-react/hero.png"
                  alt="Ameya Kulkarni 3D character"
                  className="hero-char-img"
                />
                {/* Cards floating upper-right */}
                <div className="hero-cards">
                  <article className="bp-card">
                    <div className="card-head"><span>Design Stack</span><span className="dot" /></div>
                    <div className="disc-row"><span className="k">Tools</span><span className="v">Figma · Maze</span></div>
                    <div className="disc-row"><span className="k">Method</span><span className="v">Lean UX · Agile</span></div>
                    <div className="disc-row"><span className="k">Output</span><span className="v">End-to-End</span></div>
                  </article>
                  <article className="bp-card">
                    <div className="card-head"><span>Impact</span><span className="dot" /></div>
                    <div className="metric-grid">
                      <div className="metric-cell"><div className="num">+35%</div><div className="lbl">Engagement</div></div>
                      <div className="metric-cell"><div className="num">-2.5s</div><div className="lbl">Task Time</div></div>
                      <div className="metric-cell"><div className="num">+12%</div><div className="lbl">Conversion</div></div>
                      <div className="metric-cell"><div className="num">-8%</div><div className="lbl">Churn</div></div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
            <div className="scroll-hint" aria-hidden="true">
              <span className="scroll-hint-label">Scroll to explore</span>
              <svg className="scroll-hint-arrow" width="16" height="24" viewBox="0 0 16 24" fill="none">
                <rect x="6.5" y="0" width="3" height="3" rx="1.5" fill="currentColor" opacity="0.3"/>
                <rect x="6.5" y="5" width="3" height="3" rx="1.5" fill="currentColor" opacity="0.6"/>
                <rect x="6.5" y="10" width="3" height="3" rx="1.5" fill="currentColor"/>
                <path d="M1 15L8 22L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE SNAPSHOT ── */}
        <section className="section clients" id="clients">
          <div className="container">
            <div className="clients-head reveal">
              <span className="eyebrow">Experience Snapshot</span>
              <h2 className="section-title" style={{ marginTop: '14px' }}>Where I've built real products</h2>
            </div>
            <div className="clients-grid">
              {CLIENTS.map((c) => (
                <div key={c.name} className="client-chip reveal">
                  <div className="client-chip-top">
                    {c.logo
                      ? <img src={c.logo} alt={c.name + ' logo'} className="client-logo" />
                      : <div className="client-logo-placeholder" aria-hidden="true">{c.name.charAt(0)}</div>
                    }
                    <span className="client-period">{c.period}</span>
                  </div>
                  <div className="client-name">{c.name}</div>
                  <div className="client-role">{c.role}</div>
                  <div className="client-tag">{c.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED WORK ── */}
        <section className="section work" id="work">
          <div className="container">
            <div className="work-head reveal">
              <div>
                <span className="eyebrow">Selected Work</span>
                <h2 className="section-title" style={{ marginTop: '14px' }}>Featured Case Studies</h2>
              </div>
              <Link to="/work" className="btn btn-ghost">View All Work <span className="arrow">→</span></Link>
            </div>
            <div className="work-grid">
              <Link to="/digisense" className="work-card reveal">
                <div className="work-card-media">
                  <img src={DIGISENSE_IMG} alt="DiGiSense connected vehicle telematics platform" />
                  <span className="work-card-index">01</span>
                  <span className="work-card-domain">IoT · Telematics</span>
                </div>
                <div className="work-card-body">
                  <span className="work-card-sub">Connected Vehicle Telematics Platform</span>
                  <h3 className="work-card-title">DiGiSense</h3>
                  <p className="work-card-desc">Redesigned Mahindra's IoT telematics platform serving 100,000+ connected vehicles across rural and commercial fleets, turning fragmented real-time data into actionable insights, reducing operator decision time and driving measurable gains in fleet uptime and fuel efficiency.</p>
                  <div className="work-card-meta">
                    <div><span className="m-k">Client</span><span className="m-v">Mahindra & Mahindra</span></div>
                    <div><span className="m-k">Domain</span><span className="m-v">IoT · Telematics</span></div>
                    <div><span className="m-k">Role</span><span className="m-v">Lead UX Designer</span></div>
                  </div>
                  <span className="work-card-cta">Read Case Study <span className="arrow">→</span></span>
                </div>
              </Link>
              <Link to="/pfsone" className="work-card reveal">
                <div className="work-card-media">
                  <div className="ph"><span>NETSCOUT PFS ONE</span></div>
                  <span className="work-card-index">02</span>
                  <span className="work-card-domain">Enterprise · Network</span>
                </div>
                <div className="work-card-body">
                  <span className="work-card-sub">Enterprise Network Visibility Platform</span>
                  <h3 className="work-card-title">NETSCOUT PFS ONE</h3>
                  <p className="work-card-desc">Redesigned NETSCOUT's nGenius Packet Flow Switch management interface, replacing a legacy system with a lifecycle-based navigation architecture, giving network administrators staged topology publishing, perspective-based navigation, and role-differentiated access across enterprise data centres worldwide.</p>
                  <div className="work-card-meta">
                    <div><span className="m-k">Client</span><span className="m-v">NETSCOUT</span></div>
                    <div><span className="m-k">Domain</span><span className="m-v">Enterprise · Network</span></div>
                    <div><span className="m-k">Role</span><span className="m-v">UX Designer</span></div>
                  </div>
                  <span className="work-card-cta">Read Case Study <span className="arrow">→</span></span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── HOW I WORK: AI-FLUENT PRACTICE ── */}
        <section className="section process" id="process">
          <div className="container">
            <div className="process-head reveal">
              <span className="eyebrow">My Practice</span>
              <h2 className="section-title">How I approach<br />design work today.</h2>
              <p className="lead">A process built for complexity, speed, and precision. Where AI compounds judgement at every stage, not just the screens.</p>
            </div>

            <div className="process-frame bp-frame reveal">
              <Ticks />
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`pstep${i === activeStep ? ' is-active' : ''}`}
                  onMouseEnter={() => { pausedRef.current = true; setActiveStep(i); }}
                  onMouseLeave={() => { pausedRef.current = false; }}
                >
                  <div className="pstep-num">{step.num}</div>
                  <div className="pstep-icon" aria-hidden="true">{step.icon}</div>
                  <div className="pstep-body"><h3>{step.title}</h3><p>{step.desc}</p></div>
                </div>
              ))}
            </div>

            <div className="process-tagline reveal">
              <p>// I use tools fluently because I've thought about the work first.</p>
            </div>
          </div>
        </section>

        {/* ── ABOUT PREVIEW ── */}
        <section className="section about" id="about">
          <div className="container">
            <div className="about-frame bp-frame reveal">
              <Ticks />
              <div className="about-grid">
                <div>
                  <span className="eyebrow a-eyebrow">About Me</span>
                  <h2 className="a-title">Problem solver. System builder. Team player.</h2>
                </div>
                <div>
                  <p className="a-bio">With 9.5 years across enterprise B2B SaaS, fintech, and emerging AI workflows, I specialise in UX strategy and design systems that drive measurable outcomes. I've shipped <b>4+ design systems</b>, led cross-functional teams of <b>8+</b>, and consistently delivered <b>35%+ engagement lifts</b> through strategic design decisions.</p>
                  <div className="about-cta-row">
                    <Link to="/about" className="btn btn-ghost">Read Full Story <span className="arrow">&#x2192;</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="section contact" id="contact">
          <div className="container">
            <span className="eyebrow reveal">Get in Touch</span>
            <h2 className="section-title reveal" style={{ marginTop: '16px' }}>I can help your team move faster and ship better products.</h2>
            <p className="contact-sub reveal">Whether you need someone to build a design system, lead design strategy across teams, or design in complex domains, I've done this before and I know what works. Here's what you get: faster design-to-dev cycles, design systems that teams actually adopt, and products that move metrics.</p>
            <div className="contact-links reveal">
              <a href="mailto:ameyakulkarni43@icloud.com" className="contact-link">
                <span className="c-k">Email</span><span className="c-v">Schedule a Call</span><span className="c-arrow">↗︎</span>
              </a>
              <a href="https://www.linkedin.com/in/ameyakulkarni-ux" target="_blank" rel="noopener" className="contact-link">
                <span className="c-k">LinkedIn</span><span className="c-v">linkedin.com/in/ameyakulkarni-ux</span><span className="c-arrow">↗︎</span>
              </a>
              <a href="tel:+910000000000" className="contact-link">
                <span className="c-k">Call</span><span className="c-v">+91 00000 00000</span><span className="c-arrow">↗︎</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="legal">© 2026 Ameya Kulkarni</div>
          <div className="footer-explore">
            <span className="exploring-label">Currently Exploring</span>
            <p className="statement">AI-augmented design systems for distributed teams. Obsessed with the intersection of strategy, AI, and human-centered design.</p>
          </div>
          <div className="footer-contact">
            <a href="#contact">Get in touch</a>
            <a href="mailto:ameyakulkarni43@icloud.com" className="footer-email">ameyakulkarni43@icloud.com</a>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
