export default function WorkPage() {
  return (
    <>
      <main className="work-page">
      <div className="work-page-header">
        <div className="work-page-header-inner">
          <span className="work-eyebrow">Portfolio</span>
          <h1 className="work-page-title">Selected Work</h1>
          <div className="work-header-rule"></div>
          <p className="work-header-meta">Featured case studies from 9.5+ years of UX strategy and systems design</p>
        </div>
      </div>

      {/* Featured work chapters */}
      <section className="work-chapter">
        <div className="chapter-bg" style={{backgroundImage: 'url(digisense_hero_image.png)'}}></div>
        <div className="chapter-overlay"></div>
        <div className="chapter-content">
          <span className="chapter-number reveal">01</span>
          <h2 className="chapter-title reveal reveal-1">DiGiSense</h2>
          <p className="chapter-subtitle reveal reveal-2">Connected Vehicle Telematics Platform</p>
          <div className="chapter-tags reveal reveal-3">
            <span className="chapter-tag">IoT</span>
            <span className="chapter-tag">Telematics</span>
            <span className="chapter-tag">Systems Design</span>
            <span className="chapter-tag">Mahindra</span>
          </div>
          <div className="chapter-metrics reveal reveal-4">
            <div className="chapter-metric">
              <span className="c-metric-val">100K+</span>
              <span className="c-metric-lbl">Connected Vehicles</span>
            </div>
            <div className="chapter-metric">
              <span className="c-metric-val">Rural & Commercial</span>
              <span className="c-metric-lbl">Fleet Coverage</span>
            </div>
            <div className="chapter-metric">
              <span className="c-metric-val">Redesigned</span>
              <span className="c-metric-lbl">From Ground Up</span>
            </div>
          </div>
          <a href="/digisense" className="chapter-cta reveal reveal-5">View Case Study →</a>
        </div>
      </section>

      <section className="work-chapter">
        <div className="chapter-bg" style={{backgroundColor: 'var(--surface)'}}></div>
        <div className="chapter-overlay"></div>
        <div className="chapter-content">
          <span className="chapter-number reveal">02</span>
          <h2 className="chapter-title reveal reveal-1">NETSCOUT PFS ONE</h2>
          <p className="chapter-subtitle reveal reveal-2">Enterprise Network Visibility Platform</p>
          <div className="chapter-tags reveal reveal-3">
            <span className="chapter-tag">Cybersecurity</span>
            <span className="chapter-tag">Enterprise SaaS</span>
            <span className="chapter-tag">Systems Design</span>
            <span className="chapter-tag">NETSCOUT</span>
          </div>
          <div className="chapter-metrics reveal reveal-4">
            <div className="chapter-metric">
              <span className="c-metric-val">Global</span>
              <span className="c-metric-lbl">Enterprise Data Centres</span>
            </div>
            <div className="chapter-metric">
              <span className="c-metric-val">3</span>
              <span className="c-metric-lbl">Roles Unified in One Platform</span>
            </div>
            <div className="chapter-metric">
              <span className="c-metric-val">Legacy</span>
              <span className="c-metric-lbl">System Completely Redesigned</span>
            </div>
          </div>
          <a href="/pfsone" className="chapter-cta reveal reveal-5">View Case Study →</a>
        </div>
      </section>

      {/* Also Notable */}
      <section className="also-notable">
        <div className="notable-header reveal">
          <h2 className="notable-section-title">Also Notable</h2>
          <p className="notable-section-sub">More work worth knowing — detailed case studies coming soon.</p>
        </div>
        <div className="notable-grid">
          <div className="notable-card reveal">
            <div className="notable-card-header">
              <span className="notable-card-num">03</span>
              <div className="notable-card-tags">
                <span className="notable-card-tag">Life Sciences</span>
                <span className="notable-card-tag">AI</span>
              </div>
            </div>
            <h3 className="notable-card-name">Innoplexus Research Intelligence</h3>
            <p className="notable-card-company">Innoplexus · 2022</p>
            <p className="notable-card-role">Lead UX Designer</p>
            <div className="notable-card-metrics">
              <span className="notable-metric-line">AI-assisted drug discovery workflows</span>
              <span className="notable-metric-line">Complex data visualisation for researchers</span>
            </div>
          </div>

          <div className="notable-card reveal reveal-1">
            <div className="notable-card-header">
              <span className="notable-card-num">04</span>
              <div className="notable-card-tags">
                <span className="notable-card-tag">Fintech</span>
                <span className="notable-card-tag">B2B SaaS</span>
              </div>
            </div>
            <h3 className="notable-card-name">Extentia Fintech Platform</h3>
            <p className="notable-card-company">Extentia · 2020</p>
            <p className="notable-card-role">UX Designer</p>
            <div className="notable-card-metrics">
              <span className="notable-metric-line">End-to-end product design for financial services</span>
              <span className="notable-metric-line">Multi-role dashboard with real-time analytics</span>
            </div>
          </div>

          <div className="notable-card reveal reveal-2">
            <div className="notable-card-header">
              <span className="notable-card-num">05</span>
              <div className="notable-card-tags">
                <span className="notable-card-tag">Design Systems</span>
                <span className="notable-card-tag">Brand</span>
              </div>
            </div>
            <h3 className="notable-card-name">Ogee Studio Design System</h3>
            <p className="notable-card-company">Ogee Studio · 2021</p>
            <p className="notable-card-role">UX & Product Designer</p>
            <div className="notable-card-metrics">
              <span className="notable-metric-line">Token-based design system from scratch</span>
              <span className="notable-metric-line">Component library across 3 digital products</span>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
