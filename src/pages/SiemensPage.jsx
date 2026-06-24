import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyToggle from '../components/CaseStudyToggle'
import CaseStudyFeedbackPrompt from '../components/CaseStudyFeedbackPrompt'
import CaseStudyNav from '../components/CaseStudyNav'
import { useCaseStudyMode } from '../hooks/useCaseStudyMode'

export default function SiemensPage() {
  const isSimple = useCaseStudyMode()

  useEffect(() => {
    const reveals = document.querySelectorAll('.cs-siemens .reveal')
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach(el => observer.observe(el))
    document
      .querySelectorAll('.cs-siemens .insights-grid, .cs-siemens .outcomes-grid, .cs-siemens .ai-opportunities')
      .forEach(grid => {
        grid.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = `${i * 0.1}s` })
      })
    return () => observer.disconnect()
  }, [isSimple])

  return (
    <div className="cs-page cs-siemens">
      <CaseStudyNav />

      {/* 1. BREADCRUMB + TOGGLE */}
      <section className="cs-breadcrumb">
        <div className="breadcrumb-nav">
          <Link to="/work">Work</Link>
          <span className="separator">/</span>
          <span className="current">Siemens Xcelerator</span>
        </div>
        <CaseStudyToggle />
      </section>

      {/* 2. HERO */}
      <section id="cs-overview" className="hero">
        <div className="hero-content">
          <h1 className="hero-headline reveal">
            {isSimple
              ? 'Siemens wanted to know why users were dropping off their industry pages. I mapped 14 user journeys to find out.'
              : 'Siemens.com had a global ambition: create the best digital experience in the world. The industry pages were actively working against it.'}
          </h1>
          <p className="hero-subheadline reveal">
            I spent eight weeks mapping where enterprise buyers got lost, why they left, and what a left-panel filter system could do that a page redesign could not.
          </p>
          {!isSimple && (
            <p className="hero-tagline reveal">Two workstreams. One shipped to production.</p>
          )}
          <div className="hero-meta reveal">
            <div className="hero-meta-item">
              <span className="hero-meta-label">Role</span>
              <span className="hero-meta-value">UX Designer</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Platform</span>
              <span className="hero-meta-value">Web</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Timeline</span>
              <span className="hero-meta-value">2024</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Studio</span>
              <span className="hero-meta-value">Globant , Siemens DX</span>
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
        <div className="hero-image bp-frame">
          <span className="tick tl" aria-hidden="true" />
          <span className="tick tr" aria-hidden="true" />
          <span className="tick bl" aria-hidden="true" />
          <span className="tick br" aria-hidden="true" />
          <div className="hero-image-placeholder">
            <span>Siemens Xcelerator</span>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS CONTEXT */}
      <section id="cs-business" className="business-context">
        <div className="container">
          <div className="section-label reveal"><span>Business Context</span></div>
          <div className="two-col">
            <div className="body-copy">
              <h2 className="reveal">The platform existed.<br />The experience didn't.</h2>
              <div className="stats-row reveal">
                <div className="stat-card"><span className="stat-number">7</span><span className="stat-label">Most Common DX Pains identified</span></div>
                <div className="stat-card"><span className="stat-number">14</span><span className="stat-label">User journeys mapped</span></div>
                <div className="stat-card"><span className="stat-number">3</span><span className="stat-label">Competitors benchmarked</span></div>
              </div>
              {isSimple ? (
                <p className="reveal">Users were dropping off Siemens' industry pages. The site was organised around Siemens' internal structure rather than how buyers actually navigated. Our job was to find every friction point and design a path out.</p>
              ) : (
                <>
                  <p className="reveal">The Siemens Xcelerator Marketplace sits inside one of the most complex B2B digital ecosystems in the world. Enterprise buyers arrive from Siemens.com looking for industry-specific solutions , automation, building technology, energy management, digital manufacturing , and encounter a site organised around Siemens' internal structure, not around how buyers actually think.</p>
                  <p className="reveal">The result: users dropped off. Navigation changed unexpectedly between sections. Content was dense without hierarchy. Search returned irrelevant results. CTAs appeared before users had read enough to care. The DX team at Globant was embedded inside Siemens to find out exactly where the experience was failing, and what to do about it.</p>
                </>
              )}
              <div className="mandate-block reveal">
                <h4>My Mandate</h4>
                <p>UX Designer , Globant DX team , Siemens , embedded engagement. Two parallel workstreams: a heuristic UX and IA assessment of the full .com experience, and a user journey development study across 14 prioritised use cases. <em>How do you redesign a navigation system for expert buyers who already know what they want but cannot find it?</em></p>
              </div>
            </div>
            <div className="reveal">
              <div className="pull-quote">
                <div className="section-label"><span>The Stakes</span></div>
                <blockquote>"Navigating the site is particularly difficult unless users know exactly what they are looking for. The current site structure aligns more with the company's internal organisation rather than user-centric thinking."</blockquote>
                <cite>Most Common DX Pains report , Workstream 2</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE ECOSYSTEM - hidden in simple mode */}
      {!isSimple && (
        <section id="cs-ecosystem" className="complexity-map">
          <div className="container">
            <div className="section-label reveal"><span>The Ecosystem</span></div>
            <h2 className="cs-h2 reveal">One platform. Five stakeholder types.<br />Seven categories of pain.</h2>
            <p className="reveal" style={{ fontSize:'16px', color:'var(--muted)', maxWidth:'640px', lineHeight:1.8, marginBottom:0 }}>
              The Siemens digital ecosystem is not a single site. It is a network of domains , each with its own navigation, design language, and login requirement. Users crossing between them frequently did not know they had left Siemens at all.
            </p>
            <div className="stakeholder-grid reveal">
              <div className="stakeholder-card">
                <div className="stakeholder-title">Decision Makers</div>
                <div className="stakeholder-sub">Executive buyers</div>
                <div className="stakeholder-list">
                  <h5>Want</h5>
                  <ul>
                    <li>Validated solutions quickly</li>
                    <li>ROI signals before engaging sales</li>
                    <li>Trust the source without friction</li>
                  </ul>
                  <h5>Pain</h5>
                  <ul>
                    <li>CTAs fire before they have consumed enough content to care</li>
                    <li>Relevant case studies buried or cross-linked without warning</li>
                  </ul>
                </div>
              </div>
              <div className="stakeholder-card">
                <div className="stakeholder-title">End Users / Engineers</div>
                <div className="stakeholder-sub">Technical evaluators</div>
                <div className="stakeholder-list">
                  <h5>Want</h5>
                  <ul>
                    <li>Exact product specs and documentation</li>
                    <li>Configure products without calling a rep</li>
                    <li>Find technical resources fast</li>
                  </ul>
                  <h5>Pain</h5>
                  <ul>
                    <li>Search requires exact terminology to return useful results</li>
                    <li>Configurator tools require sign-in on a different domain, with no warning</li>
                  </ul>
                </div>
              </div>
              <div className="stakeholder-card">
                <div className="stakeholder-title">Buyers / Procurement</div>
                <div className="stakeholder-sub">Purchase decision-makers</div>
                <div className="stakeholder-list">
                  <h5>Want</h5>
                  <ul>
                    <li>Compare products across a category</li>
                    <li>Find pricing and financing options</li>
                    <li>Reach a contextual sales contact</li>
                  </ul>
                  <h5>Pain</h5>
                  <ul>
                    <li>Pricing consistently absent or hidden</li>
                    <li>Contact forms generic rather than contextual</li>
                    <li>Platform jumps break the purchase journey mid-flow</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tension-block reveal">
              <h3>Siemens' digital ambition was world-class.<br />The execution was organised around <em>Siemens</em> , not around the people trying to buy from Siemens.</h3>
              <p>The gap between those two things was where every drop-off happened.</p>
            </div>
          </div>
        </section>
      )}

      {/* 5. RESEARCH APPROACH - hidden in simple mode */}
      {!isSimple && (
        <section id="cs-research" className="research">
          <div className="container">
            <div className="section-label reveal"><span>Research Approach</span></div>
            <h2 className="cs-h2 reveal">Two workstreams. 14 journeys.<br />281 pages of findings.</h2>
            <div className="research-stats reveal">
              <div className="research-stat"><span className="research-stat-number">06</span><span className="research-stat-label">UX heuristics applied</span></div>
              <div className="research-stat"><span className="research-stat-number">14</span><span className="research-stat-label">User journeys mapped</span></div>
              <div className="research-stat"><span className="research-stat-number">03</span><span className="research-stat-label">Competitors benchmarked</span></div>
              <div className="research-stat"><span className="research-stat-number">07</span><span className="research-stat-label">DX pain categories</span></div>
            </div>
            <div className="method-cards reveal">
              <div className="method-card">
                <span className="method-card-label">Method 01</span>
                <h4>Heuristic UX Assessment</h4>
                <p>Six UX principles mapped against 10 Nielsen heuristics. Every screen scored 0 (no problem) to 4 (critical). Five areas assessed: navigation, content layout, forms, search, information hierarchy.</p>
              </div>
              <div className="method-card">
                <span className="method-card-label">Method 02</span>
                <h4>User Journey Development</h4>
                <p>14 granular journeys manually simulated across all relevant Siemens domains. Both successful and failed journeys documented. Failed journeys were the most valuable , they showed exactly where the site stopped serving the user.</p>
              </div>
              <div className="method-card">
                <span className="method-card-label">Method 03</span>
                <h4>Competitor Benchmarking</h4>
                <p>IBM, Honeywell, and Rockwell Automation benchmarked across the same six UX parameters , identifying patterns competitors solved well and gaps representing quick wins for Siemens.</p>
              </div>
            </div>
            <div className="surprise-callout reveal">
              <h4>The Structural Finding</h4>
              <blockquote>"Navigation consistency is lacking when browsing products and services or exploring by industry. Upon navigating to an industry-specific page, the entire navigation menu changes."</blockquote>
              <p>A single inconsistency in how the nav behaved when users entered an industry section registered as severity 4 , the same rating as a critical system failure. Users had no idea they had entered a different product environment. That was the problem everything else was downstream of.</p>
            </div>
          </div>
        </section>
      )}

      {/* 6. KEY INSIGHTS */}
      <section id="cs-insights" className="insights">
        <div className="container">
          <div className="section-label reveal"><span>Key Insights</span></div>
          <h2 className="cs-h2 reveal">Five findings that reframed what the redesign needed to be.</h2>
          <div className="insights-grid">
            <div className="insight-card reveal">
              <div className="insight-number">01</div>
              <h3 className="insight-title">"The site was organised for Siemens, not for buyers"</h3>
              {isSimple ? (
                <p className="insight-body">The navigation structure mapped to Siemens' internal business units, not to how buyers arrived or searched. Users without Siemens' internal taxonomy had no reliable way to self-navigate.</p>
              ) : (
                <>
                  <p className="insight-body">The navigation structure across siemens.com mapped directly to Siemens' internal business units. Products and Services, Industries, Company , each item reflected how Siemens thought about itself, not how a buyer arriving from Google thought about finding an industrial automation solution.</p>
                  <div className="insight-implication">
                    <h5>Strategic Implication</h5>
                    <p>A navigation redesign wasn't enough. The IA needed to be rebuilt around buyer mental models , specifically, the seven use cases representing how buyers actually arrived. The left-panel filter system we later designed was a direct response: give users multiple lenses on the same content instead of forcing them into one fixed hierarchy.</p>
                  </div>
                </>
              )}
            </div>
            <div className="insight-card reveal">
              <div className="insight-number">02</div>
              <h3 className="insight-title">"Navigation that changes is navigation that can't be trusted"</h3>
              {isSimple ? (
                <p className="insight-body">When users clicked into an industry page, the primary navigation changed entirely. They lost their location reference. Backtracking was unreliable. The environment itself had become unpredictable.</p>
              ) : (
                <>
                  <p className="insight-body">When a user clicked into an industry page, the primary navigation changed entirely. The Siemens Xcelerator Marketplace appeared as the first nav item , replacing the siemens.com structure. Users lost their location reference. Backtracking was unreliable. Choice paralysis followed because the environment itself had become unpredictable. This registered as a severity 4 (critical) finding.</p>
                  <div className="insight-implication">
                    <h5>Strategic Implication</h5>
                    <p>Consistency and system status visibility were the two most violated heuristics across the entire site. Before any feature work, the navigation needed to become persistent, sticky, and stable , a landmark users could rely on regardless of where in the ecosystem they were.</p>
                  </div>
                </>
              )}
            </div>
            <div className="insight-card reveal">
              <div className="insight-number">03</div>
              <h3 className="insight-title">"Content density was mistaken for content quality"</h3>
              {isSimple ? (
                <p className="insight-body">Page after page carried dense text, multiple videos, and numerous links at equal visual weight. The more choices presented simultaneously, the harder the decision , Hick's Law working against Siemens on every page.</p>
              ) : (
                <>
                  <p className="insight-body">Page after page carried dense blocks of text, multiple embedded videos, and numerous links , all at equal visual weight, with no clear primary or secondary hierarchy. Research identified this as a direct application of Hick's Law in reverse: the more choices presented simultaneously, the longer and harder the decision. Pages designed to showcase Siemens' breadth were actively impeding conversion.</p>
                  <div className="insight-implication">
                    <h5>Strategic Implication</h5>
                    <p>Content needed to be prioritised , not just edited. Progressive disclosure, clear heading hierarchies, and a focused flow for each use case were structural requirements, not styling preferences.</p>
                  </div>
                </>
              )}
            </div>
            <div className="insight-card reveal">
              <div className="insight-number">04</div>
              <h3 className="insight-title">"The search worked only if you already knew the answer"</h3>
              {isSimple ? (
                <p className="insight-body">Search returned results only for exact terminology matches. No spell tolerance. No autocomplete on the global bar. Results frequently surfaced irrelevant options first. New buyers , who didn't know Siemens' naming conventions , had no reliable path to discovery.</p>
              ) : (
                <>
                  <p className="insight-body">The internal search returned results only for exact terminology matches. No spell tolerance. No autocomplete on the global search bar. Results frequently surfaced the irrelevant option first. Users who did not already know Siemens' product naming conventions , which described most new buyers , had no reliable path to discovery through search.</p>
                  <div className="insight-implication">
                    <h5>Strategic Implication</h5>
                    <p>Search needed to become intent-aware rather than exact-match. Error tolerance, predictive suggestions, and faceted filtering were table-stakes requirements benchmarked against IBM and Honeywell , both of whom handled this well. Siemens did not.</p>
                  </div>
                </>
              )}
            </div>
            {!isSimple && (
              <div className="insight-card reveal" style={{ gridColumn: '1 / -1' }}>
                <div className="insight-number">05</div>
                <h3 className="insight-title">"The most common journey ended in a dead end or a platform jump"</h3>
                <p className="insight-body">Across all 14 user journeys, the most frequent failure mode was not a broken page or a 404. It was structural: the user reached a page with no logical next step, or clicked a CTA that silently transported them to a different Siemens domain with no continuity of context, design, or login state. Training content lived at training.plm.automation.siemens. Community content at community.siemens. Configuration tools at mail.industry.siemens. Each felt like a different product built by a different company.</p>
                <div className="insight-implication">
                  <h5>Strategic Implication</h5>
                  <p>The most impactful recommendation wasn't a screen redesign. It was platform unification , reducing domain jumps in any given user journey, standardising design language across sub-domains, and building a single sign-in experience. This sat outside the design team's direct control. Making the case for it with journey evidence was one of the most important things this workstream produced.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. STRATEGIC DECISIONS - hidden in simple mode */}
      {!isSimple && (
        <section id="cs-decisions" className="decisions">
          <div className="container">
            <div className="section-label reveal"><span>Strategic Decisions</span></div>
            <h2 className="cs-h2 reveal">Good design isn't about finding the perfect solution.<br />It's about making the right call when every option has a cost.</h2>
            <div className="decision-block">
              <div className="decision-header reveal">
                <span className="decision-num">01</span>
                <h3 className="decision-title">Page-Level Redesign<br />vs. System-Level Diagnosis</h3>
              </div>
              <div className="decision-options reveal">
                <div className="option-card rejected">
                  <p className="option-label">Option A , Rejected</p>
                  <h4>Redesign the Pages</h4>
                  <p>Improve visual hierarchy, fix content density, add better CTAs. Stay in scope and deliver polished screens quickly.</p>
                </div>
                <div className="option-card chosen">
                  <p className="option-label">Option B , Chosen</p>
                  <h4>Diagnose the System First</h4>
                  <p>Map all 14 user journeys before proposing any screen-level solution. Understand where journeys failed and what level of intervention was actually required.</p>
                </div>
              </div>
              <div className="decision-reasoning reveal">
                <div className="reasoning-block"><h5>Who Pushed Back</h5><p>Stakeholders expected screen-level deliverables early. The temptation was to move quickly to visible design outputs.</p></div>
                <div className="reasoning-block"><h5>How We Resolved It</h5><p>We walked one failing journey live in a stakeholder session. A decision-maker looking for product pricing: 8 pages, 3 domain jumps, 2 login prompts, still no price. That scenario made the case for the diagnostic phase.</p></div>
                <div className="reasoning-block"><h5>What We Sacrificed</h5><p>Speed to visible output. Stakeholders waited longer for design artefacts. The wait produced findings that changed the scope of every recommendation that followed.</p></div>
              </div>
            </div>
            <div className="decision-block">
              <div className="decision-header reveal">
                <span className="decision-num">02</span>
                <h3 className="decision-title">Single Navigation Fix<br />vs. Left-Panel Filter System</h3>
              </div>
              <div className="decision-options reveal">
                <div className="option-card rejected">
                  <p className="option-label">Option A , Rejected</p>
                  <h4>Fix the Primary Nav</h4>
                  <p>Make it sticky, standardised, and consistent. Address the severity 4 finding directly at the navigation level. Simpler. Faster.</p>
                </div>
                <div className="option-card chosen">
                  <p className="option-label">Option B , Chosen</p>
                  <h4>Left-Panel Filter System</h4>
                  <p>A secondary navigation layer , filterable by Industry, Solution Type, Product Category , persisting within the marketplace without requiring users to navigate up and back. This is the design that shipped to production.</p>
                </div>
              </div>
              <div className="decision-reasoning reveal">
                <div className="reasoning-block"><h5>Who Pushed Back</h5><p>Engineering flagged implementation complexity. A persistent left-panel filter was a larger development investment than a navigation standardisation fix.</p></div>
                <div className="reasoning-block"><h5>How We Resolved It</h5><p>Journey analysis showed the nav fix alone wouldn't solve the drop-off problem. Users inside an industry section needed to move laterally without losing context. The left-panel filter addressed exactly that.</p></div>
                <div className="reasoning-block"><h5>What We Sacrificed</h5><p>Simplicity of delivery. A nav fix is a single change. A filter system is an interaction paradigm that had to be introduced and tested for discoverability.</p></div>
              </div>
            </div>
            <div className="decision-block">
              <div className="decision-header reveal">
                <span className="decision-num">03</span>
                <h3 className="decision-title">Findings Report<br />vs. Journey-Anchored Evidence</h3>
              </div>
              <div className="decision-options reveal">
                <div className="option-card rejected">
                  <p className="option-label">Option A , Rejected</p>
                  <h4>Deliver a Findings Report</h4>
                  <p>List all 7 DX pain categories with recommendations. Professional, structured, complete. Standard consulting output.</p>
                </div>
                <div className="option-card chosen">
                  <p className="option-label">Option B , Chosen</p>
                  <h4>Journey-Anchored Evidence</h4>
                  <p>Anchor every finding to a specific journey , showing exactly which screen, which click, which moment the user hit a roadblock. Make failure concrete enough that stakeholders could feel it, not just read it.</p>
                </div>
              </div>
              <div className="decision-reasoning reveal">
                <div className="reasoning-block"><h5>Who Pushed Back</h5><p>Nobody explicitly. But building journey-level evidence for 14 use cases was significantly more work than writing a findings report.</p></div>
                <div className="reasoning-block"><h5>How We Resolved It</h5><p>We opened with a "how to read" format , establishing the visual language of roadblocks, checkpoints, moments of truth, and sentiment states , before walking through each journey. Stakeholders who might have skimmed a report stayed engaged.</p></div>
                <div className="reasoning-block"><h5>What We Sacrificed</h5><p>Nothing in outcome. But the decision required significantly more effort in the documentation phase. Worth it every time.</p></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 8. DESIGN WORK */}
      <section id="cs-design" className="design-work">
        <div className="container">
          <div className="section-label reveal"><span>Design Work</span></div>
          <h2 className="cs-h2 reveal">Three outputs. Each chosen because it shows a decision, not just a deliverable.</h2>

          {/* Work 01 */}
          <div className="screen-section">
            <h3 className="screen-title reveal">The Journey Map Framework</h3>
            <p className="screen-problem reveal">Existing UX reports described problems in lists. Stakeholders could read findings without understanding where in a journey they happened, who was affected, or how severe the cumulative impact was. Without a visual language for journey failure, the case for systemic change stayed abstract.</p>
            <div className="screen-container reveal">
              <span className="screen-label">Work 01 · Journey Maps · Figma · 14 use cases</span>
              <div className="screen-figma-embed">
                <iframe
                  title="Journey Map Framework · Siemens Xcelerator"
                  src="https://embed.figma.com/slides/BYq6ijKEZUcOGVOuxAmvWj/User-journeys---UX_IA-assessment-of-Siemens.com--Copy-?node-id=267-692&embed-host=share&hide-ui=1"
                  allowFullScreen
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation allow-pointer-lock"
                />
              </div>
            </div>
            <div className="screen-annotations reveal">
              <div className="annotation">
                <h5>Moments of Truth</h5>
                <p>Each journey concluded with a Moment of Truth symbol , successful resolution or failed resolution. Both were documented and colour-coded. <strong>Failed moments of truth were impossible to miss.</strong> Counting them was the most persuasive slide in any stakeholder presentation.</p>
              </div>
              <div className="annotation">
                <h5>Roadblock Notation</h5>
                <p>Roadblocks were placed exactly where the user encountered them , not listed separately. <strong>A roadblock at a CTA meant the CTA was the problem.</strong> A roadblock at a domain transition meant the domain jump was the problem. Location specificity drove design specificity.</p>
              </div>
              <div className="annotation">
                <h5>Channel Labels</h5>
                <p>Every touchpoint carried a channel label , siemens.com, xcelerator.siemens, community.siemens. <strong>A journey crossing four domain labels in eight touchpoints was self-evidently broken</strong> before a single annotation was added.</p>
              </div>
            </div>
          </div>

          {/* Work 02 */}
          <div className="screen-section">
            <h3 className="screen-title reveal">The Left-Panel Filter System</h3>
            <p className="screen-problem reveal">Users arriving at the Xcelerator Marketplace industry pages faced an undifferentiated list of solutions with no way to filter by what they actually cared about. The only navigation available was to go back up and try a different path. Most didn't. They left.</p>
            <div className="screen-container reveal">
              <span className="screen-label">Work 02 · Left-Panel Filter · Shipped to production</span>
              <div className="screen-placeholder">
                <span>Left-Panel Filter System</span>
              </div>
            </div>
            <div className="screen-annotations reveal">
              <div className="annotation">
                <h5>Why Left Panel, Not Top Filter Bar</h5>
                <p>A top filter bar required users to choose filter type before filter value , a two-step interaction that introduced friction. <strong>A persistent left panel kept all filter dimensions visible simultaneously,</strong> matching how expert buyers actually searched: "building automation AND IoT," not one then the other.</p>
              </div>
              <div className="annotation">
                <h5>Shipped to Production</h5>
                <p>The left-panel filter interaction pattern we designed during this engagement <strong>shipped to the live Siemens Xcelerator Marketplace.</strong> It is visible on the production Siemens website. This was the most direct design output of the entire engagement.</p>
              </div>
              <div className="annotation">
                <h5>Competitor Evidence</h5>
                <p>Rockwell Automation's left-panel filter for multi-category simultaneous selection was rated Good UX in our competitor benchmarking. <strong>That specific evidence was used in stakeholder conversations</strong> to counter the concern that left-panel filters were too complex.</p>
              </div>
            </div>
          </div>

          {/* Work 03 */}
          <div className="screen-section">
            <h3 className="screen-title reveal">User Journey: Find and Evaluate a Relevant Product</h3>
            <p className="screen-problem reveal">The most common buyer use case produced three different journey paths depending on whether the user arrived via Google, Siemens internal search, or the home page nav. All three paths had different failure modes. None of them reliably reached the same endpoint.</p>
            <div className="screen-container reveal">
              <span className="screen-label">Work 03 · Three-path journey · Decision Makers + End Users + Buyers</span>
              <div className="screen-figma-embed">
                <iframe
                  title="Find and Evaluate Journey Map · Siemens Xcelerator"
                  src="https://embed.figma.com/slides/BYq6ijKEZUcOGVOuxAmvWj/User-journeys---UX_IA-assessment-of-Siemens.com?node-id=144-717&embed-host=share&hide-ui=1"
                  allowFullScreen
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation allow-pointer-lock"
                />
              </div>
            </div>
            <div className="screen-annotations reveal">
              <div className="annotation">
                <h5>Three Entry Paths, One Broken Destination</h5>
                <p>Google path, internal search path, and home page nav all aimed at the same endpoint. All three had different failure modes. <strong>Mapping them simultaneously made visible what a single-path journey would have hidden:</strong> the inconsistency between paths was itself the problem.</p>
              </div>
              <div className="annotation">
                <h5>The Silent Failure</h5>
                <p>Users hitting a broken 'Manage MyResources Tools' link did not generate an error event. They silently gave up. <strong>This was documented as a Road Block in the journey map</strong> , precisely the kind of failure that never appears in analytics because there is no measurable signal that the user stopped.</p>
              </div>
              <div className="annotation">
                <h5>The Lead Form Timing Problem</h5>
                <p>"Get in contact" CTAs were placed at the top of industry pages , before users had consumed enough content to be interested. <strong>Documented as a specific roadblock pattern across multiple journeys:</strong> conversion mechanisms placed where they could not convert because the user was not yet ready.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. AI OPPORTUNITY LAYER - hidden in simple mode */}
      {!isSimple && (
        <section id="cs-ai" className="ai-layer">
          <div className="container">
            <div className="section-label reveal"><span>AI Opportunity Layer</span></div>
            <h2 className="cs-h2 reveal">This project was completed in 2024.<br />Here's how I'd push it further today.</h2>
            <div className="ai-opportunities">
              <div className="ai-card reveal">
                <div className="ai-card-num">01</div>
                <h3>Intent-Aware Search</h3>
                <p>The 2024 fix was structural: error tolerance, autocomplete, consistent result labelling. Today I'd layer an intent inference model on top , trained on Siemens' product taxonomy and the search behaviour of buyers who successfully converted. The difference between "show results for energy management" and "you're probably looking for EnergyIP, here's why" is the difference between a catalogue and a sales conversation.</p>
              </div>
              <div className="ai-card reveal">
                <div className="ai-card-num">02</div>
                <h3>Predictive Journey Routing</h3>
                <p>Every journey we mapped had a most common failure point. Today I'd design an AI routing layer that recognised when a user's path was converging on a known failure point and offered a redirect before the failure happened. Not a chatbot. A structural navigation intervention triggered by behavioural signals , the same way a well-designed airport routes passengers away from congestion before the queues form.</p>
              </div>
              <div className="ai-card reveal">
                <div className="ai-card-num">03</div>
                <h3>Dynamic Content Prioritisation</h3>
                <p>The content density problem was about pages carrying too much at equal weight. The editorial fix was to prioritise. The AI fix is to personalise , serving different content hierarchies to a returning decision-maker versus a first-time end user, based on what each has engaged with before. IBM was already moving in this direction during our benchmarking. The gap was visible.</p>
              </div>
            </div>
            <div className="ai-big-picture reveal">
              <p>These three opportunities share a common thread. They all move Siemens.com from a content delivery system to an intent-response system. From a site that shows buyers what Siemens makes, to one that understands what buyers are trying to do , and actively helps them get there.</p>
            </div>
          </div>
        </section>
      )}

      {/* 10. OUTCOMES + IMPACT */}
      <section id="cs-outcomes" className="outcomes">
        <div className="container">
          <div className="section-label reveal"><span>Outcomes + Impact</span></div>
          <h2 className="cs-h2 reveal">{isSimple ? 'What the work produced.' : 'Impact lives at three levels.'}</h2>
          <div className="outcomes-grid">
            <div className="outcome-column reveal">
              <div className="outcome-column-header"><h3>Research Impact</h3></div>
              <div className="outcome-item">
                <strong>First structured DX assessment</strong>
                <p>Seven categories of pain documented and severity-rated, creating the first evidence-based baseline for siemens.com UX decisions.</p>
              </div>
              <div className="outcome-item">
                <strong>14 journey maps</strong>
                <p>The most comprehensive buyer journey documentation the Siemens DX team had for the Xcelerator Marketplace , a reusable asset for all subsequent design decisions.</p>
              </div>
              {!isSimple && (
                <>
                  <div className="outcome-item">
                    <strong>3 competitor benchmarks</strong>
                    <p>IBM, Honeywell, and Rockwell Automation assessed across six identical parameters , producing specific evidence for design decisions rather than general inspiration.</p>
                  </div>
                  <div className="outcome-item">
                    <strong>Severity framework applied</strong>
                    <p>Every finding rated 0 to 4, giving product owners a clear prioritisation language for the first time.</p>
                  </div>
                </>
              )}
            </div>
            <div className="outcome-column reveal">
              <div className="outcome-column-header"><h3>Design Impact</h3></div>
              <div className="outcome-item">
                <strong>Left-panel filter system shipped</strong>
                <p>The primary interaction design output of the engagement went to production on the live Siemens Xcelerator Marketplace , visible on siemens.com today.</p>
              </div>
              <div className="outcome-item">
                <strong>Journey visualisation language established</strong>
                <p>A reusable visual system for mapping buyer journeys across complex multi-domain ecosystems, adopted by the DX team for subsequent workstreams.</p>
              </div>
              {!isSimple && (
                <div className="outcome-item">
                  <strong>7 DX pain categories with specific remedies</strong>
                  <p>Each pain category paired with actionable, evidence-grounded design recommendations rather than general UX principles.</p>
                </div>
              )}
            </div>
            <div className="outcome-column reveal">
              <div className="outcome-column-header"><h3>Strategic Impact</h3></div>
              <div className="outcome-item">
                <strong>Platform unification case made</strong>
                <p>Journey evidence used to make the case for reducing domain fragmentation , a business infrastructure recommendation that design research made undeniable.</p>
              </div>
              {!isSimple && (
                <>
                  <div className="outcome-item">
                    <strong>Buyer mental model documented</strong>
                    <p>Five buyer types , Decision Makers, End Users, Buyers, Networks, Career Seekers , mapped with their entry points, goals, and failure patterns for the first time.</p>
                  </div>
                  <div className="outcome-item">
                    <strong>IA rebuild rationale established</strong>
                    <p>The finding that siemens.com was organised around internal structure rather than buyer mental models gave the product team a clear mandate: the next IA iteration needed to start from use cases, not org charts.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 11. REFLECTION */}
      <section id="cs-reflection" className="reflection">
        <div className="container">
          <div className="section-label reveal"><span>Reflection</span></div>
          <h2 className="cs-h2 reveal">
            {isSimple
              ? "What I'd do differently today."
              : "The best designers aren't the ones who get everything right. They're the ones who know exactly what they'd do differently."}
          </h2>
          <div className="reflection-items">
            <div className="reflection-item">
              <div className="reflection-num reveal">01</div>
              <div className="reflection-content reveal">
                <h3>Instrument before you assess</h3>
                <p>Our journey mapping was manually simulated , which produced nuanced insight that quantitative data cannot. But getting analytics instrumentation in place first , exit rates by section, scroll depth, drop-off points in domain jump sequences , would have made the severity 4 navigation finding undeniable to everyone, not just self-evident to the design team. Numbers and journey evidence are a stronger combination than either alone.</p>
              </div>
            </div>
            <div className="reflection-item">
              <div className="reflection-num reveal">02</div>
              <div className="reflection-content reveal">
                <h3>Push harder for access to actual buyers</h3>
                <p>Simulation-based journey mapping is legitimate and valuable. But even two or three observational sessions with real B2B buyers navigating the site live would have added something simulation cannot fully replicate: the specific words they use when they can't find something, the moments they pause, the mental models we did not predict. In future enterprise engagements of this type, I would build the case for direct user access from the start.</p>
              </div>
            </div>
            {!isSimple && (
              <div className="reflection-item">
                <div className="reflection-num reveal">03</div>
                <div className="reflection-content reveal">
                  <h3>Design the multi-domain experience, not just the pages</h3>
                  <p>The most significant problem we found , domain fragmentation , was also the one we had the least design leverage over. We could map the pain. We could not redesign five Siemens domains simultaneously within one engagement. The most valuable additional deliverable would have been a cross-domain experience principles document , design standards for what consistent navigation, visual language, and login behaviour should look like across the entire ecosystem. Not a full redesign. A constitutional document that individual workstreams could build against.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <CaseStudyFeedbackPrompt />

      {/* 12. NEXT CASE STUDY */}
      <section className="next-case">
        <div className="container">
          <p className="reveal">Next Case Study</p>
          <h2 className="reveal">Coming Soon</h2>
          <Link to="/work" className="cs-btn reveal">
            <span className="cs-btn-arrow" aria-hidden="true">←</span> Back to Work
          </Link>
        </div>
      </section>
    </div>
  )
}
