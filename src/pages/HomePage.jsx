import { useEffect, useRef, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import NamePopup from '../components/NamePopup';
import { useName } from '../context/NameContext';
import '../style-2026.css';

/*
 * Homepage — React conversion of home-2026.html + home-2026.js.
 * Styling lives in style-2026.css (imported above).
 * Assets resolve from Vite's public/ folder (served at root). Drop
 * AKlogo.png and digisense_hero_image.png into public/, or replace these
 * constants with `import logo from './AKlogo.png'` style asset imports.
 */
const LOGO = '/AKlogo.png';
const DIGISENSE_IMG = '/digisense_hero_image.png';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const { name } = useName();

  const closeMenu = () => setMenuOpen(false);

  // Inject Google Fonts once (idempotent)
  useEffect(() => {
    if (document.getElementById('home-2026-fonts')) return;
    const pre1 = Object.assign(document.createElement('link'), { rel: 'preconnect', href: 'https://fonts.googleapis.com' });
    const pre2 = Object.assign(document.createElement('link'), { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' });
    const css = Object.assign(document.createElement('link'), { id: 'home-2026-fonts', rel: 'stylesheet', href: FONTS_HREF });
    document.head.append(pre1, pre2, css);
    document.title = 'Ameya Kulkarni — Lead UX Designer';
  }, []);

  // Escape closes the mobile menu
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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

  // Handle loading screen and name popup
  useEffect(() => {
    if (showLoading) return;
    if (!name) {
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
      <div ref={rootRef} className={contentReady ? '' : 'content-blurred'}>
      {/* ── NAV ── */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="Ameya Kulkarni — home">
            <img src={LOGO} alt="" />
            <span className="wordmark">Ameya Kulkarni</span>
          </a>
          <ul className="nav-links">
            <li><a href="#work">Work</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact" className="cta">Let's Talk →</a></li>
          </ul>
          <button
            className="nav-hamburger"
            id="hamburger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        aria-hidden={!menuOpen}
      >
        <button className="mobile-menu-close" id="menu-close" aria-label="Close menu" onClick={closeMenu}>×</button>
        <ul className="mobile-menu-links">
          {[
            { href: '#work', num: '01', label: 'Work' },
            { href: '#process', num: '02', label: 'Process' },
            { href: '#about', num: '03', label: 'About' },
            { href: '#contact', num: '04', label: 'Contact' },
          ].map((item, i) => (
            <li key={item.href}>
              <a href={item.href} style={{ '--stagger': i + 1 }} onClick={closeMenu}>
                <span className="label"><span className="menu-num">{item.num}</span>{item.label}</span>
                <span className="arrow">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-foot">
          <span
            className="dot"
            style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 12px rgba(var(--accent-rgb),.6)' }}
          />
          Available to join your company
        </div>
      </div>

      <main id="top">
        {/* ── HERO ── */}
        <section className="section hero" id="hero">
          <div className="container">
            <div className="hero-grid bp-frame">
              <Ticks />

              <div className="hero-copy reveal">
                <span className="eyebrow">Lead UX Designer</span>
                <h1>I design systems that help teams move faster and users get what they need.</h1>
                <p className="hero-sub"><span>9.5 years in fintech, IoT, and SaaS</span> · <span>I build systems, lead teams, and solve problems that matter.</span></p>
                <p className="hero-about">I work at the intersection of strategy and systems. Over the past 9.5 years, I've shipped design systems that helped teams go faster, led teams across timezones, and consistently delivered products that move engagement metrics. I'm most energized when tackling complex domains: rural IoT, fintech compliance, enterprise infrastructure. This is where good design actually matters.</p>
                <div className="hero-ctas">
                  <a href="#work" className="btn btn-primary">Explore DiGiSense Case Study <span className="arrow">→</span></a>
                  <a href="#contact" className="btn btn-ghost">Schedule a Conversation</a>
                </div>
              </div>

              <div className="hero-cards reveal">
                <article className="bp-card">
                  <div className="card-head"><span>UX Strategy</span><span className="dot" /></div>
                  <div className="disc-row"><span className="k">Research</span><span className="v">Generative</span></div>
                  <div className="disc-row"><span className="k">Prototyping</span><span className="v">Hi-Fi</span></div>
                  <div className="disc-row"><span className="k">Validation</span><span className="v">Usability</span></div>
                </article>
                <article className="bp-card">
                  <div className="card-head"><span>Performance Impact</span><span className="dot" /></div>
                  <div className="metric-grid">
                    <div className="metric-cell"><div className="num">+35%</div><div className="lbl">User Engagement</div></div>
                    <div className="metric-cell"><div className="num">-2.5s</div><div className="lbl">Task Time</div></div>
                    <div className="metric-cell"><div className="num">+12.4%</div><div className="lbl">Conversion</div></div>
                    <div className="metric-cell"><div className="num">-8.1%</div><div className="lbl">Drop-off</div></div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ── AI-AUGMENTED DESIGN PROCESS ── */}
        <section className="section process" id="process">
          <div className="container">
            <div className="process-head reveal">
              <span className="eyebrow">Design Process</span>
              <h2 className="section-title">AI-Augmented<br />Design Process</h2>
              <p className="lead">A process built for complexity, speed, and precision — where AI compounds judgement at every stage, not just the screens.</p>
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
              <p>// Where you create differentiation: framing, insight, judgement</p>
              <a href="#process" className="btn btn-ghost">Explore Full Process <span className="arrow">→</span></a>
            </div>
          </div>
        </section>

        {/* ── CREDIBILITY STRIP ── */}
        <section className="section" id="credibility">
          <div className="container">
            <div className="cred-grid reveal">
              <div className="cred-cell">
                <span className="cred-label">Experience</span>
                <div className="cred-years">9.5<span>years</span></div>
                <p className="cred-desc">UX strategy and systems design across enterprise and consumer products.</p>
              </div>
              <div className="cred-cell">
                <span className="cred-label">Companies</span>
                <ul className="cred-list">
                  {['Globant', 'Mahindra', 'Innoplexus', 'Ogee Studio', 'Extentia'].map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div className="cred-cell">
                <span className="cred-label">Disciplines</span>
                <ul className="cred-list">
                  {['UX Strategy', 'Systems Design', 'AI/ML Product Design'].map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <div className="cred-cell">
                <span className="cred-label">Focus Areas</span>
                <ul className="cred-list">
                  {['B2B SaaS', 'Fintech', 'Cybersecurity', 'Life Sciences', 'IoT'].map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
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
              <a href="#work" className="btn btn-ghost">View All Work <span className="arrow">→</span></a>
            </div>
            <div className="work-grid">
              <a href="#work" className="work-card reveal">
                <div className="work-card-media">
                  <img src={DIGISENSE_IMG} alt="DiGiSense connected vehicle telematics platform" />
                  <span className="work-card-index">01</span>
                  <span className="work-card-domain">IoT · Telematics</span>
                </div>
                <div className="work-card-body">
                  <span className="work-card-sub">Connected Vehicle Telematics Platform</span>
                  <h3 className="work-card-title">DiGiSense</h3>
                  <p className="work-card-desc">Redesigned Mahindra's IoT telematics platform serving 100,000+ connected vehicles across rural and commercial fleets — turning fragmented real-time data into actionable insights, reducing operator decision time and driving measurable gains in fleet uptime and fuel efficiency.</p>
                  <div className="work-card-meta">
                    <div><span className="m-k">Client</span><span className="m-v">Mahindra & Mahindra</span></div>
                    <div><span className="m-k">Domain</span><span className="m-v">IoT · Telematics</span></div>
                    <div><span className="m-k">Role</span><span className="m-v">Lead UX Designer</span></div>
                  </div>
                  <span className="work-card-cta">Read Case Study <span className="arrow">→</span></span>
                </div>
              </a>
              <a href="#work" className="work-card reveal">
                <div className="work-card-media">
                  <div className="ph"><span>NETSCOUT PFS ONE</span></div>
                  <span className="work-card-index">02</span>
                  <span className="work-card-domain">Enterprise · Network</span>
                </div>
                <div className="work-card-body">
                  <span className="work-card-sub">Enterprise Network Visibility Platform</span>
                  <h3 className="work-card-title">NETSCOUT PFS ONE</h3>
                  <p className="work-card-desc">Redesigned NETSCOUT's nGenius Packet Flow Switch management interface, replacing a legacy system with a lifecycle-based navigation architecture — giving network administrators staged topology publishing, perspective-based navigation, and role-differentiated access across enterprise data centres worldwide.</p>
                  <div className="work-card-meta">
                    <div><span className="m-k">Client</span><span className="m-v">NETSCOUT</span></div>
                    <div><span className="m-k">Domain</span><span className="m-v">Enterprise · Network</span></div>
                    <div><span className="m-k">Role</span><span className="m-v">UX Designer</span></div>
                  </div>
                  <span className="work-card-cta">Read Case Study <span className="arrow">→</span></span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ── MEASURED IMPACT ── */}
        <section className="section impact" id="impact">
          <div className="container">
            <div className="process-head reveal" style={{ marginBottom: 'clamp(32px,4vw,52px)' }}>
              <span className="eyebrow">Outcomes</span>
              <h2 className="section-title" style={{ marginTop: '14px' }}>Measured Impact</h2>
            </div>
            <div className="impact-grid reveal">
              {[
                { i: '01', num: '25+', label: 'Projects Led', desc: 'Across B2B SaaS, Fintech, Cybersecurity, Life Sciences, IoT.' },
                { i: '02', num: '15+', label: 'Cross-Functional Teams', desc: 'Average team size: 8+ members.' },
                { i: '03', num: '4', label: 'Design Systems Built', desc: 'Tokens, components, documentation, accessibility audits.' },
                { i: '04', num: '35%+', label: 'Avg Engagement Lift', desc: 'Measured across product launches and redesigns.' },
              ].map((m) => (
                <div className="impact-cell" key={m.i}>
                  <span className="i-index">{m.i}</span>
                  <div className="impact-stat">
                    <div className="i-num">{m.num}</div>
                    <div className="i-label">{m.label}</div>
                    <p className="i-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
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
                  <h2 className="a-title">A systems thinker who designs for impact</h2>
                </div>
                <div>
                  <p className="a-bio">With 9.5 years across enterprise B2B SaaS, fintech, and emerging AI workflows, I specialise in UX strategy and design systems that drive measurable outcomes. I've shipped <b>4+ design systems</b>, led cross-functional teams of <b>8+</b>, and consistently delivered <b>35%+ engagement lifts</b> through strategic design decisions.</p>
                  <div className="about-cta-row">
                    <a href="#about" className="btn btn-primary">Read Full Story <span className="arrow">→</span></a>
                    <span className="status-pill"><span className="dot" />Available to join your company</span>
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
              <a href="mailto:ameya@example.com" className="contact-link">
                <span className="c-k">Email</span><span className="c-v">Schedule a Conversation</span><span className="c-arrow">↗</span>
              </a>
              <a href="https://linkedin.com/in/ameyakulkarni" target="_blank" rel="noopener" className="contact-link">
                <span className="c-k">LinkedIn</span><span className="c-v">linkedin.com/in/ameyakulkarni</span><span className="c-arrow">↗</span>
              </a>
              <a href="https://twitter.com/ameyakulkarni" target="_blank" rel="noopener" className="contact-link">
                <span className="c-k">Twitter / X</span><span className="c-v">twitter.com/ameyakulkarni</span><span className="c-arrow">↗</span>
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
            <a href="mailto:ameya@example.com" className="footer-email">ameya@example.com</a>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}
