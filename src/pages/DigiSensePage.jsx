import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyToggle from '../components/CaseStudyToggle'
import CaseStudyFeedbackPrompt from '../components/CaseStudyFeedbackPrompt'
import heroImg from '../../digisense_hero_image.png'

export default function DigiSensePage() {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const reveals = document.querySelectorAll('.cs-digisense .reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))

    document
      .querySelectorAll(
        '.cs-digisense .insights-grid, .cs-digisense .stakeholder-grid, .cs-digisense .ai-opportunities, .cs-digisense .outcomes-grid'
      )
      .forEach((grid) => {
        grid.querySelectorAll('.reveal').forEach((el, i) => {
          el.style.transitionDelay = `${i * 0.1}s`
        })
      })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="cs-page cs-digisense">
      {/* BREADCRUMB + TOGGLE */}
      <section className="cs-breadcrumb">
        <div className="breadcrumb-nav">
          <Link to="/work">Work</Link>
          <span className="separator">/</span>
          <span className="current">DiGiSense</span>
        </div>
        <CaseStudyToggle />
      </section>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-headline reveal">
            Mahindra had deployed connected technology across 28,000+ tractors in rural India. Most had stopped using it. Nobody knew why.
          </h1>
          <p className="hero-subheadline reveal">I spent 30 days finding out.</p>
          <div className="hero-meta reveal">
            <div className="hero-meta-item">
              <span className="hero-meta-label">Role</span>
              <span className="hero-meta-value">Lead UX Designer</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Platform</span>
              <span className="hero-meta-value">iOS · Android · Web</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Timeline</span>
              <span className="hero-meta-value">2018</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Studio</span>
              <span className="hero-meta-value">Extentia Experience Studio</span>
            </div>
          </div>
        </div>
        <div className="hero-image bp-frame">
          <span className="tick tl" aria-hidden="true" />
          <span className="tick tr" aria-hidden="true" />
          <span className="tick bl" aria-hidden="true" />
          <span className="tick br" aria-hidden="true" />
          {imgError ? (
            <div className="hero-image-placeholder">
              <span>DiGiSense</span>
            </div>
          ) : (
            <img
              src={heroImg}
              alt="DiGiSense mobile dashboard screens"
              onError={() => setImgError(true)}
            />
          )}
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* BUSINESS CONTEXT */}
      <section className="business-context">
        <div className="container">
          <div className="section-label reveal">
            <span>Business Context</span>
          </div>
          <div className="two-col">
            <div className="body-copy">
              <h2 className="reveal">The product existed.<br />The adoption didn't.</h2>
              <div className="stats-row reveal">
                <div className="stat-card">
                  <span className="stat-number">50%</span>
                  <span className="stat-label">feature awareness</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">29%</span>
                  <span className="stat-label">abandoned the app</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">₹20K+</span>
                  <span className="stat-label">paid per farmer</span>
                </div>
              </div>
              <p className="reveal">DiGiSense was a telematics platform giving farmers real-time tracking, diagnostics, and fuel monitoring. Farmers paid ₹20,000+ for it. But 50% didn't know what features existed, and 29% abandoned the app entirely. The gap between what Mahindra had built and what farmers actually needed was massive.</p>
              <div className="mandate-block reveal">
                <h4>My Mandate</h4>
                <p>Lead UX Designer · Extentia Experience Studio<br /><br />
                Research 44 farmers across 5 states to find the root cause of adoption failure and design a solution that works for the farmer, the dealer, and Mahindra simultaneously.</p>
              </div>
            </div>
            <div className="reveal">
              <div className="pull-quote">
                <div className="section-label">
                  <span>The Stakes</span>
                </div>
                <blockquote>"Without adoption, there was no data. Without data, there was no platform."</blockquote>
                <cite>The business case</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLEXITY MAP */}
      <section className="complexity-map">
        <div className="container">
          <div className="section-label reveal">
            <span>The Ecosystem</span>
          </div>
          <h2 className="cs-h2 reveal">Three stakeholders.<br />Three conflicting agendas.</h2>
          <p className="reveal" style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.8, marginBottom: 0 }}>DiGiSense wasn't a simple app with one type of user. It was a three-sided ecosystem ,  and each side wanted something fundamentally different.</p>

          <div className="stakeholder-grid reveal">
            <div className="stakeholder-card">
              <p className="stakeholder-title">Farmers</p>
              <p className="stakeholder-sub">End Users</p>
              <div className="stakeholder-list">
                <h5>Want</h5>
                <ul>
                  <li>Reliability first</li>
                  <li>Local language</li>
                  <li>Mobile only</li>
                  <li>Basic features that work</li>
                </ul>
                <h5>Pain</h5>
                <ul>
                  <li>App doesn't work in the field</li>
                  <li>Don't know half the features</li>
                </ul>
              </div>
            </div>
            <div className="stakeholder-card">
              <p className="stakeholder-title">Dealers</p>
              <p className="stakeholder-sub">Distribution Layer</p>
              <div className="stakeholder-list">
                <h5>Want</h5>
                <ul>
                  <li>Simple to demo</li>
                  <li>Easy to troubleshoot</li>
                  <li>Sell with confidence</li>
                </ul>
                <h5>Pain</h5>
                <ul>
                  <li>Became a burden</li>
                  <li>No demo tool</li>
                  <li>No follow-up system</li>
                </ul>
              </div>
            </div>
            <div className="stakeholder-card">
              <p className="stakeholder-title">Mahindra HQ</p>
              <p className="stakeholder-sub">Product Owners</p>
              <div className="stakeholder-list">
                <h5>Want</h5>
                <ul>
                  <li>Sophisticated platform</li>
                  <li>Data at scale</li>
                  <li>Monetisation</li>
                  <li>Predictive analytics</li>
                </ul>
                <h5>Pain</h5>
                <ul>
                  <li>No usage data coming back</li>
                  <li>Adoption far below projections</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="tension-block reveal">
            <h3>Mahindra's vision was sophisticated.<br />The farmer's reality was simple.<br /><em>Nobody had mapped that gap ,  until now.</em></h3>
            <p>Every decision we made had to thread through all three groups simultaneously. A feature that delighted Mahindra stakeholders could overwhelm a farmer. A simplification that worked for farmers could undermine the dealer's ability to demonstrate value.<br /><br />This is why the project needed a systems approach ,  not just a screen redesign.</p>
          </div>
        </div>
      </section>

      {/* RESEARCH APPROACH */}
      <section className="research">
        <div className="container">
          <div className="section-label reveal">
            <span>Research Approach</span>
          </div>
          <h2 className="cs-h2 reveal">30 days. 5 locations.<br />44 interviews. 4 languages.</h2>
          <p className="reveal" style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.8 }}>This was the first bottom-up consumer research Mahindra had ever conducted for DiGiSense ,  everything before it had been assumption-driven.</p>

          <div className="research-stats reveal">
            <div className="research-stat">
              <span className="research-stat-number">30</span>
              <span className="research-stat-label">Days</span>
            </div>
            <div className="research-stat">
              <span className="research-stat-number">05</span>
              <span className="research-stat-label">Locations</span>
            </div>
            <div className="research-stat">
              <span className="research-stat-number">44</span>
              <span className="research-stat-label">Interviews</span>
            </div>
            <div className="research-stat">
              <span className="research-stat-number">03</span>
              <span className="research-stat-label">Methods</span>
            </div>
            <div className="research-stat">
              <span className="research-stat-number">03</span>
              <span className="research-stat-label">Team Members</span>
            </div>
          </div>

          <div className="two-col reveal" style={{ marginBottom: '48px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, color: 'var(--text)', marginBottom: '16px' }}>WHAT-HOW-WHY Method</h3>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '24px' }}>Every interview followed a structured observation framework that moves from surface behaviour to emotional drivers.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>WHAT</span>
                  <p style={{ fontSize: '13px', color: 'var(--muted)' }}>What is the person doing right now?</p>
                </div>
                <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>HOW</span>
                  <p style={{ fontSize: '13px', color: 'var(--muted)' }}>How are they doing it? With effort? With confusion?</p>
                </div>
                <div style={{ padding: '20px', background: 'var(--surface)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>WHY</span>
                  <p style={{ fontSize: '13px', color: 'var(--muted)' }}>What is the emotional driver behind this behaviour?</p>
                </div>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 400, color: 'var(--text)', marginBottom: '16px' }}>Interview Structure</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ padding: '20px 24px', border: '1px solid var(--border)', borderBottom: 'none', borderRadius: '4px 4px 0 0', background: 'var(--surface)' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Trust Bump</span>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Intent + introductions</p>
                </div>
                <div style={{ padding: '20px 24px', border: '1px solid var(--border)', borderBottom: 'none' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Bird's Eye</span>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Tell me about the last time you...</p>
                </div>
                <div style={{ padding: '20px 24px', border: '1px solid var(--border)', borderBottom: 'none' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Magnifying Glass</span>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>Can you show me how you...</p>
                </div>
                <div style={{ padding: '20px 24px', border: '1px solid var(--border)', borderRadius: '0 0 4px 4px' }}>
                  <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>Microscope</span>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '4px' }}>5 Whys ,  why do you...</p>
                </div>
              </div>
            </div>
          </div>

          <table className="methods-table reveal">
            <thead>
              <tr>
                <th>Method</th>
                <th>Learning Goal</th>
                <th>What We Actually Found</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Farmer field interviews (34)</td>
                <td>Current usage patterns + pain points</td>
                <td className="gold">Users knew only 8 of 16 features. Average feature awareness: 50%</td>
              </tr>
              <tr>
                <td>Stakeholder interviews (3)</td>
                <td>Business vision + strategic priorities</td>
                <td className="highlight">"A bottom consumer study was not done. We just took standard telematics."</td>
              </tr>
              <tr>
                <td>Dealer + CCM interviews (5)</td>
                <td>Sales + support chain health</td>
                <td>DiGiSense had become a burden for dealers ,  not a selling point</td>
              </tr>
              <tr>
                <td>Cognitive walkthrough</td>
                <td>Task difficulty on critical flows</td>
                <td className="gold">Creating a geofence took 350 seconds and 37 clicks</td>
              </tr>
              <tr>
                <td>Competitor analysis</td>
                <td>Benchmark against JD Link</td>
                <td>JD Link's advantage wasn't features ,  it was installation service and SIM card freedom</td>
              </tr>
            </tbody>
          </table>

          <div className="surprise-callout reveal">
            <h4>The Surprising Moment</h4>
            <blockquote>"A bottom consumer study was not done. We just took standard telematics."</blockquote>
            <p>In one sentence, the entire product problem became clear. DiGiSense had been built for a farmer that Mahindra had imagined ,  not the farmer that actually existed. Our job wasn't just to fix the UX. It was to introduce Mahindra to their own user for the first time.</p>
          </div>
        </div>
      </section>

      {/* KEY INSIGHTS */}
      <section className="insights">
        <div className="container">
          <div className="section-label reveal">
            <span>Key Insights</span>
          </div>
          <h2 className="cs-h2 reveal">Five insights that completely<br />reframed the design problem.</h2>

          <div className="insights-grid">
            <div className="insight-card reveal">
              <div className="insight-number">01</div>
              <h3 className="insight-title">"The product farmers bought wasn't the product they got"</h3>
              <p className="insight-body">The app showed only 4 of 16 features. The rest required a web dashboard—which farmers didn't have access to. This fragmentation destroyed trust.</p>
            </div>

            <div className="insight-card reveal">
              <div className="insight-number">02</div>
              <h3 className="insight-title">"For 29% of users, SMS was the entire product"</h3>
              <p className="insight-body">Nearly a third never opened the app. They used only SMS alerts. Designing only for mobile meant ignoring 29% of actual users.</p>
            </div>

            <div className="insight-card reveal">
              <div className="insight-number">03</div>
              <h3 className="insight-title">"The dealer was the forgotten product surface"</h3>
              <p className="insight-body">Farmers learned about DiGiSense once, at purchase. After that: nothing. Dealers became support bottlenecks with no tools to help.</p>
            </div>

            <div className="insight-card reveal">
              <div className="insight-number">04</div>
              <h3 className="insight-title">"Users were rural millennials, not traditional farmers"</h3>
              <p className="insight-body">Active users were 18–38 years old, shaped by WhatsApp and YouTube. They expected intuitive design—not hand-holding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC DECISIONS */}
      <section className="decisions">
        <div className="container">
          <div className="section-label reveal">
            <span>Strategic Decisions</span>
          </div>
          <h2 className="cs-h2 reveal">Good design isn't about finding the perfect solution.<br />It's about making the right call when every option has a cost.</h2>

          {/* Decision 1 */}
          <div className="decision-block">
            <div className="decision-header reveal">
              <span className="decision-num">01</span>
              <h3 className="decision-title">Mobile Parity<br />vs. Progressive Disclosure</h3>
            </div>
            <div className="decision-options reveal">
              <div className="option-card rejected">
                <p className="option-label">Option A ,  Rejected</p>
                <h4>Full Parity</h4>
                <p>Port everything from web to mobile. Give Mahindra what they asked for. Ship a complete product with all 16 features accessible.</p>
              </div>
              <div className="option-card chosen">
                <p className="option-label">Option B ,  Chosen</p>
                <h4>Progressive Disclosure</h4>
                <p>Nail 5 core features first. Build trust. Surface advanced features progressively as farmers gained confidence with the product.</p>
              </div>
            </div>
            <div className="decision-reasoning reveal">
              <div className="reasoning-block">
                <h5>Who Pushed Back</h5>
                <p>Mahindra's product stakeholders. They had invested significantly in building 16 features and wanted all of them visible and accessible.</p>
              </div>
              <div className="reasoning-block">
                <h5>How We Resolved It</h5>
                <p>We reframed the metric. The question wasn't "how many features are available?" It was "how many features are actually being used?" Research showed farmers were aware of only 50% ,  meaning half the product was already invisible.</p>
              </div>
              <div className="reasoning-block">
                <h5>What We Sacrificed</h5>
                <p>Short-term stakeholder satisfaction. The recommendation required Mahindra to accept that less, done well, would outperform more, done poorly.</p>
              </div>
            </div>
          </div>

          {/* Decision 2 */}
          <div className="decision-block">
            <div className="decision-header reveal">
              <span className="decision-num">02</span>
              <h3 className="decision-title">App Redesign<br />vs. System Redesign</h3>
            </div>
            <div className="decision-options reveal">
              <div className="option-card rejected">
                <p className="option-label">Option A ,  Rejected</p>
                <h4>Redesign the App</h4>
                <p>Fix the UI. Improve the flows. Deliver polished screens. Stay in scope. This is what a design agency typically delivers.</p>
              </div>
              <div className="option-card chosen">
                <p className="option-label">Option B ,  Chosen</p>
                <h4>Redesign the System</h4>
                <p>Treat the dealer onboarding moment as a product surface. Design a dealer demo tool alongside the consumer app. Fix the trust gap at the point of sale.</p>
              </div>
            </div>
            <div className="decision-reasoning reveal">
              <div className="reasoning-block">
                <h5>Who Pushed Back</h5>
                <p>The engineering team flagged complexity. The PM flagged timeline risk. Expanding scope is never a popular decision mid-project.</p>
              </div>
              <div className="reasoning-block">
                <h5>How We Resolved It</h5>
                <p>We showed that the app redesign would fail without fixing the entry point. Farmers formed their entire mental model of DiGiSense in the first 10 minutes at a dealership. The dealer portal wasn't a nice-to-have. It was load-bearing.</p>
              </div>
              <div className="reasoning-block">
                <h5>What We Sacrificed</h5>
                <p>Simplicity of delivery. A single app redesign would have been faster and cleaner. We chose the harder, more complete solution.</p>
              </div>
            </div>
          </div>

          {/* Decision 3 */}
          <div className="decision-block">
            <div className="decision-header reveal">
              <span className="decision-num">03</span>
              <h3 className="decision-title">Design for the Imagined User<br />vs. Design for the Real User</h3>
            </div>
            <div className="decision-options reveal">
              <div className="option-card rejected">
                <p className="option-label">Option A ,  Rejected</p>
                <h4>The Assumed User</h4>
                <p>Keep the existing design philosophy. Simple, hand-holding, educational. Respect the original product vision built around an older, less tech-savvy farmer.</p>
              </div>
              <div className="option-card chosen">
                <p className="option-label">Option B ,  Chosen</p>
                <h4>The Real User</h4>
                <p>Rebuild the experience around rural millennials ,  18 to 38 year olds whose mental models were shaped by WhatsApp, YouTube, and Paytm. Meet them where they already were.</p>
              </div>
            </div>
            <div className="decision-reasoning reveal">
              <div className="reasoning-block">
                <h5>Who Pushed Back</h5>
                <p>Nobody explicitly ,  but this was the most culturally sensitive recommendation. Telling a client their foundational user assumption was wrong requires evidence, diplomacy, and care.</p>
              </div>
              <div className="reasoning-block">
                <h5>How We Resolved It</h5>
                <p>We let the research speak. When stakeholders saw Astute Anil comparing DiGiSense unfavourably to Facebook ,  not because he wanted games, but because he expected intuitive engagement ,  the shift in thinking happened naturally.</p>
              </div>
              <div className="reasoning-block">
                <h5>What We Sacrificed</h5>
                <p>Nothing, ultimately. But the conversation required trust built through the rigour of the research phase. Without that credibility, this recommendation would have been dismissed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGN WORK */}
      <section className="design-work">
        <div className="container">
          <div className="section-label reveal">
            <span>Design Work</span>
          </div>
          <h2 className="cs-h2 reveal">Three core redesigns that moved adoption.</h2>

          {/* Screen 1 */}
          <div className="screen-section">
            <h3 className="screen-title reveal">The Mobile Dashboard</h3>
            <p className="screen-problem reveal">16 features with equal weight. No clear hierarchy. Farmers didn't know what mattered.</p>
            <div className="screen-container reveal">
              <span className="screen-label">Screen 01 · Mobile Dashboard</span>
              <div className="screen-placeholder">
                <span>Dashboard Screen</span>
              </div>
            </div>
            <div className="screen-annotations reveal">
              <div className="annotation">
                <h5>The Decision</h5>
                <p>Prioritized 5 core features. Bottom nav mirrored WhatsApp—a mental model farmers already knew.</p>
              </div>
            </div>
          </div>

          {/* Screen 2 */}
          <div className="screen-section">
            <h3 className="screen-title reveal">Geofencing Flow</h3>
            <p className="screen-problem reveal">37 clicks, 350 seconds, web-only. Farmers with no laptops couldn't access it.</p>
            <div className="screen-container reveal">
              <span className="screen-label">Screen 02 · Geofencing Creation</span>
              <div className="screen-placeholder">
                <span>Geofencing Flow</span>
              </div>
            </div>
            <div className="screen-annotations reveal">
              <div className="annotation">
                <h5>The Decision</h5>
                <p>Rebuilt as 3-step mobile flow. Satellite view as default so farmers without formal addresses could find their land.</p>
              </div>
            </div>
          </div>

          {/* Screen 3 */}
          <div className="screen-section">
            <h3 className="screen-title reveal">Live Tracking</h3>
            <p className="screen-problem reveal">Static map required manual refresh. Broke trust in a product farmers were already skeptical of.</p>
            <div className="screen-container reveal">
              <span className="screen-label">Screen 03 · Location Services</span>
              <div className="screen-placeholder">
                <span>Location Services</span>
              </div>
            </div>
            <div className="screen-annotations reveal">
              <div className="annotation">
                <h5>The Decision</h5>
                <p>Removed the refresh button. Made data feel automatic, not manual—repairing broken trust.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI OPPORTUNITY LAYER */}
      <section className="ai-layer">
        <div className="container">
          <div className="section-label reveal">
            <span>AI Opportunity Layer</span>
          </div>
          <h2 className="cs-h2 reveal">This project was completed in 2018.<br />Here's how I'd approach it differently today.</h2>

          <div className="ai-opportunities">
            <div className="ai-card reveal">
              <div className="ai-card-num">01</div>
              <h3>Research Synthesis at Scale</h3>
              <p>44 interviews in 4 languages processed by 3 people over 4 days introduces significant bias risk. Today I'd use AI-assisted qualitative analysis to process the full dataset simultaneously ,  surfacing pattern clusters, contradictions, and outliers that manual affinity mapping might miss or flatten.<br /><br />The goal isn't to remove human judgement. It's to give human judgement better raw material to work with.</p>
            </div>
            <div className="ai-card reveal">
              <div className="ai-card-num">02</div>
              <h3>Predictive Alerts Over Threshold Alerts</h3>
              <p>The current alert system is reactive ,  it fires when sensors cross a threshold. With ML trained on fleet-wide data ,  engine hours patterns, PTO cycles, temperature curves ,  the system could shift from reactive to predictive.<br /><br />Instead of: "Your fuel is low."<br />The system could say: "Based on your usage patterns, your tractor will likely need servicing in 3–5 days."</p>
            </div>
            <div className="ai-card reveal">
              <div className="ai-card-num">03</div>
              <h3>Adaptive Onboarding Through Behavioural Intelligence</h3>
              <p>We solved the two-user-type problem with static personas and a single progressive disclosure model. Today I'd design an adaptive onboarding layer that observes behaviour in the first 7 days and adjusts the interface accordingly.<br /><br />Personalisation at scale. Without asking the farmer to tell us who they are.</p>
            </div>
          </div>

          <div className="ai-big-picture reveal">
            <p>These three opportunities share a common thread ,  they all move DiGiSense from a monitoring tool to an <em>intelligence layer.</em> From a product that tells farmers what happened, to one that helps them decide what to do next.</p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="outcomes">
        <div className="container">
          <div className="section-label reveal">
            <span>Outcomes + Impact</span>
          </div>
          <h2 className="cs-h2 reveal">Three moves that changed adoption.</h2>

          <div className="outcomes-grid">
            <div className="outcome-column reveal">
              <div className="outcome-column-header">
                <h3>Design Wins</h3>
              </div>
              <div className="outcome-item">
                <strong>Geofencing: 37 clicks → 3 steps</strong>
                Accessible to farmers without a laptop for the first time.
              </div>
              <div className="outcome-item">
                <strong>Dashboard: 16 → 5 features</strong>
                Simplified to match rural millennial mental models.
              </div>
            </div>

            <div className="outcome-column reveal">
              <div className="outcome-column-header">
                <h3>Research Foundation</h3>
              </div>
              <div className="outcome-item">
                <strong>Root cause identified</strong>
                Feature fragmentation was the structural problem, not UX polish. Mobile parity wasn't optional.
              </div>
              <div className="outcome-item">
                <strong>Dealer as a product surface</strong>
                The adoption problem started at the dealership, not in the app.
              </div>
            </div>

            <div className="outcome-column reveal">
              <div className="outcome-column-header">
                <h3>Strategic Shift</h3>
              </div>
              <div className="outcome-item">
                <strong>SIM card freedom</strong>
                The single most impactful recommendation was giving farmers network choice—a business decision, not a design one.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REFLECTION */}
      <section className="reflection">
        <div className="container">
          <div className="section-label reveal">
            <span>Reflection</span>
          </div>
          <h2 className="cs-h2 reveal">What I'd do differently today.</h2>

          <div className="reflection-items">
            <div className="reflection-item">
              <span className="reflection-num reveal">01</span>
              <div className="reflection-content reveal">
                <h3>Scope the dealer experience as a primary product, not an afterthought</h3>
                <p>The dealer portal emerged late as a recommendation. It should have been workstream one. Farmers form their mental model in the first 10 minutes at dealership, not in the app.</p>
              </div>
            </div>
            <div className="reflection-item">
              <span className="reflection-num reveal">02</span>
              <div className="reflection-content reveal">
                <h3>Pair research with real usage analytics from day one</h3>
                <p>We relied on farmer self-reporting. Pairing interviews with actual usage data would have surfaced patterns (like the SMS-only users) faster and stronger.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEEDBACK PROMPT - SIMPLE MODE ONLY */}
      <CaseStudyFeedbackPrompt />

      {/* NEXT CASE STUDY */}
      <section className="next-case">
        <div className="container">
          <p className="reveal">Next Case Study</p>
          <h2 className="reveal">Coming Soon</h2>
          <Link to="/work" className="cs-btn reveal"><span className="cs-btn-arrow" aria-hidden="true">←</span> Back to Work</Link>
        </div>
      </section>
    </div>
  )
}
