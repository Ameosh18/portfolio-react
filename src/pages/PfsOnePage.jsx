import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyToggle from '../components/CaseStudyToggle'
import CaseStudyFeedbackPrompt from '../components/CaseStudyFeedbackPrompt'
import { useCaseStudyMode } from '../hooks/useCaseStudyMode'

const FLOW_DATA = {
  flow_01: {
    label: 'D1 ,  Page Elements & Access to Lifecycles',
    title: 'Flow 01 ,  Lifecycle Navigation & Role-Based Access',
    decision: 'Designed a primary navigation bar ,  Configure, Deploy, Monitor ,  where visible lifecycles are determined by user role at login. A Network Operator sees only Monitor. A Switch Configuration Manager sees Configure and Deploy. A Service Administrator sees everything.',
    annotations: [
      { num: '1', label: 'Lifecycle Bar', text: 'Configure · Deploy · Monitor are not tabs ,  they are distinct operational contexts. Switching lifecycle changes the entire left panel, toolbar, and workspace state. Navigation here is a workflow mirror, not a feature menu.' },
      { num: '2', label: 'Role-Based Lifecycle Visibility', text: 'A Network Operator sees only Monitor. A Switch Configuration Manager sees Configure and Deploy. Lifecycle access isn\'t a permissions gate ,  it\'s a product personalisation. Each role gets the product they actually need.' },
      { num: '3', label: 'User Access Panel', text: 'Role, organisation, and domain context is surfaced immediately on login. In a multi-tenant enterprise tool, knowing who you are in this system is as important as knowing where you are.' },
    ],
  },
  flow_02: {
    label: 'D2 ,  Perspectives (Deployment LC)',
    title: 'Flow 02 ,  Perspective-Based Left Panel',
    decision: 'Built a perspective-switching system ,  Location, Logical, Filter, Template ,  that allows administrators to reorganise the same resource hierarchy through the lens most relevant to their current task.',
    annotations: [
      { num: '1', label: 'Perspective Selector', text: 'Four perspectives reorganise the same resources through different cognitive lenses. This isn\'t filtering. It\'s giving administrators the ability to think about their network differently depending on the task at hand.' },
      { num: '2', label: 'Location Perspective', text: 'Ports organised by geography ,  New York, Seattle, San Francisco. When an administrator is troubleshooting a regional issue, geographic organisation is the most natural mental model. The interface adapts to the task, not the other way around.' },
      { num: '3', label: 'Logical Perspective', text: 'The same ports, reorganised by type ,  Network, Monitor, Service, Duplex. When auditing port configurations across a deployment, logical grouping is faster and safer than geographic browsing. One perspective switch. Completely different working context.' },
    ],
  },
  flow_03: {
    label: 'D3 ,  Landing Page (Deployment Lifecycle)',
    title: 'Flow 03 ,  Topology Landing Page',
    decision: 'Designed a card-based landing page where each Deployment Environment surfaces live status, topology versions, active editors, and modification history ,  before the administrator enters the topology workspace.',
    annotations: [
      { num: '1', label: 'Deployment Environment Cards', text: 'Each card shows live status, version history, and active editors at a glance. Administrators see the health of their entire deployment before they open a single topology ,  reducing the risk of entering a workspace blind.' },
      { num: '2', label: 'Recently Modified Feed', text: 'The most recently touched topologies surface automatically ,  with editor name, timestamp, and deployment environment. In a multi-user system, knowing who changed what and when is not a nice-to-have. It is an operational requirement.' },
      { num: '3', label: 'Auto Publish Toggle', text: 'Auto Publish ON vs OFF is visible at the topology level ,  not buried in settings. This single toggle determines whether changes go live immediately or enter a staged state. Its prominence in the UI reflects its operational weight.' },
    ],
  },
  flow_04: {
    label: 'D4.2 ,  Primary Flow: Editing an Existing Topology',
    title: 'Flow 04 ,  Primary Topology Editing Flow',
    decision: 'Designed an editing model where the moment an administrator begins editing a published topology, a new version is automatically created. The published version remains live and untouched until the administrator chooses to push.',
    annotations: [
      { num: '1', label: 'Version Creation on Edit', text: 'The moment an administrator begins editing a published topology, a new version is automatically created. The published version remains live and untouched. Editing and deploying are structurally separated ,  not just conceptually.' },
      { num: '2', label: 'Entity State Indicators', text: 'Blue outline with publish icon means configured but not deployed. Green means live. This visual language operates at the individual entity level ,  an administrator can see the publication state of every port and connection without opening a single panel.' },
      { num: '3', label: 'Configuration Panel', text: 'Port configuration slides out contextually without navigating away from the topology. The administrator maintains spatial awareness of the full network while editing a single entity ,  reducing the risk of making a change without understanding its downstream connections.' },
    ],
  },
  flow_05: {
    label: 'D6 ,  Publish Now',
    title: 'Flow 05 ,  Publish & Validate',
    decision: 'Designed a multi-stage publish flow ,  Validate → Pre-commit → Commit → Finalise ,  with real-time progress visibility, per-topology error surfacing, and a bulk publish option for administrators managing multiple topologies simultaneously.',
    annotations: [
      { num: '1', label: 'Staged vs Live State', text: 'Unpublished connections are black. Published connections are green. Disabled connections are grey. Three states. Three colours. No ambiguity about what is live on the network at any moment ,  because ambiguity in this context is operationally dangerous.' },
      { num: '2', label: 'Publish All Topologies', text: 'Administrators can select specific versions across multiple topologies and publish them together ,  with per-topology validation happening in parallel before any changes reach the infrastructure. Coordination without complexity.' },
      { num: '3', label: 'Validation Progress Flow', text: 'Validating → Pre-committing → Committing → Finalising. Each stage is visible in real time. If validation fails, publication stops cleanly ,  with the specific failure surfaced immediately. The administrator always knows exactly where in the process a problem occurred.' },
    ],
  },
  flow_06: {
    label: 'D7 ,  Left Panel Interactions',
    title: 'Flow 06 ,  Left Panel Interactions',
    decision: 'Designed a contextual hover-action system where every resource in the left panel surfaces relevant actions ,  Configure, Enable/Disable, Focus In, Monitor, Remove ,  exactly where the administrator\'s attention already is.',
    annotations: [
      { num: '1', label: 'Hover Action Menus', text: 'Every resource surfaces a contextual action menu on hover ,  Configure, Enable/Disable, Focus In, Monitor, Remove. Actions are available exactly where the administrator\'s attention already is ,  no secondary navigation required.' },
      { num: '2', label: 'Multi-Select Behaviour', text: 'Administrators can select multiple ports simultaneously using Ctrl+Click ,  with counts updating in real time in the hierarchy. Bulk operations on a network with hundreds of ports aren\'t an edge case. They\'re the daily workflow.' },
      { num: '3', label: 'Drill Down into Switch Hierarchy', text: 'The left panel supports drilling from geographic location → switch → chassis → blade → port ,  with each level maintaining context of what\'s above it. Administrators can go deep without losing their place in the broader network structure.' },
    ],
  },
}

export default function PfsOnePage() {
  const [activeFlow, setActiveFlow] = useState(null)
  const isSimple = useCaseStudyMode()

  useEffect(() => {
    const reveals = document.querySelectorAll('.cs-pfsone .reveal')
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
        '.cs-pfsone .insights-grid, .cs-pfsone .stakeholder-grid, .cs-pfsone .ai-opportunities, .cs-pfsone .outcomes-grid, .cs-pfsone .artifact-grid'
      )
      .forEach((grid) => {
        grid.querySelectorAll('.reveal').forEach((el, i) => {
          el.style.transitionDelay = `${i * 0.08}s`
        })
      })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeFlow !== null) setActiveFlow(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeFlow])

  useEffect(() => {
    document.body.style.overflow = activeFlow !== null ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeFlow])

  const flow = activeFlow ? FLOW_DATA[activeFlow] : null

  return (
    <div className="cs-page cs-pfsone">
      {/* ARTIFACT MODAL */}
      <div
        className={`artifact-modal${activeFlow ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!activeFlow}
        onClick={(e) => { if (e.target === e.currentTarget) setActiveFlow(null) }}
      >
        <div className="artifact-modal-inner">
          <div className="artifact-modal-image">
            <span className="artifact-modal-image-label">{flow?.label}</span>
            <div className="artifact-modal-image-placeholder">
              <span>{flow?.title}</span>
              <p>Wireframe image ,  add PDF export here</p>
            </div>
          </div>
          <div className="artifact-modal-annotations">
            <button
              className="artifact-modal-close"
              aria-label="Close"
              onClick={() => setActiveFlow(null)}
            >
              ×
            </button>
            <h3 className="artifact-modal-title">{flow?.title}</h3>
            <p className="artifact-modal-decision">{flow?.decision}</p>
            <div>
              {flow?.annotations?.map((a) => (
                <div className="annotation-item" key={a.num}>
                  <div className="annotation-item-header">
                    <span className="annotation-badge">{a.num}</span>
                    <span className="annotation-label">{a.label}</span>
                  </div>
                  <p className="annotation-text">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BREADCRUMB + TOGGLE */}
      <section className="cs-breadcrumb">
        <div className="breadcrumb-nav">
          <Link to="/work">Work</Link>
          <span className="separator">/</span>
          <span className="current">PFS ONE</span>
        </div>
        <CaseStudyToggle />
      </section>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content bp-frame">
          <span className="tick tl" aria-hidden="true" />
          <span className="tick tr" aria-hidden="true" />
          <span className="tick bl" aria-hidden="true" />
          <span className="tick br" aria-hidden="true" />
          <h1 className="hero-headline reveal">
            {isSimple ? 'Redesigning visibility fabric for zero-margin-for-error infrastructure.' : 'Network administrators don\'t get second chances.'}
          </h1>
          <p className="hero-subheadline reveal">{isSimple ? 'One misconfigured topology stops everything. A decade-old system needed complete rethinking.' : 'One misconfigured topology. One unpublished change. One blind spot in the visibility fabric ,  and an entire security stack stops seeing the network it\'s supposed to protect.'}</p>
          {!isSimple && <p className="hero-tagline reveal">We had one year to redesign the system they trusted not to fail them.</p>}
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
              <span className="hero-meta-value">2016</span>
            </div>
            <div className="hero-meta-item">
              <span className="hero-meta-label">Studio</span>
              <span className="hero-meta-value">Ogee Studio</span>
            </div>
          </div>
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
              <h2 className="reveal">The infrastructure existed.<br />The clarity didn't.</h2>
              <div className="stats-row reveal">
                <div className="stat-card">
                  <span className="stat-number">4</span>
                  <span className="stat-label">lifecycle stages to navigate</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">3</span>
                  <span className="stat-label">distinct user roles</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">1</span>
                  <span className="stat-label">year to replace a decade-old interface</span>
                </div>
              </div>
              {isSimple ? (
                <>
                  <p className="reveal">NETSCOUT's visibility fabric system was deployed across enterprise data centres worldwide. Network administrators used it to route traffic to security tools. Misconfiguration meant tools went blind. The existing interface was legacy, built for an older era of complexity. They needed a complete redesign.</p>
                </>
              ) : (
                <>
                  <p className="reveal">NETSCOUT's nGenius Packet Flow Switch system was already deployed across enterprise data centres and central offices worldwide. Network administrators used it to manage visibility fabric ,  the infrastructure that routes traffic to monitoring and security tools. If the visibility fabric was misconfigured, security tools went blind. If security tools went blind, threats went undetected.</p>
                  <p className="reveal"><strong>The stakes were not abstract.</strong> They were operational.</p>
                  <p className="reveal">The existing interface was legacy ,  built for a different era of networking, a different scale of complexity, and a different expectation of what software should feel like. NETSCOUT needed a complete redesign. Not a reskin. A rethinking.</p>
                </>
              )}
              <div className="mandate-block reveal">
                <h4>My Mandate</h4>
                {isSimple ? (
                  <p>UX Designer · Ogee Studio<br /><br />
                  Redesign the system to serve expert users without making complexity overwhelming.</p>
                ) : (
                  <p>UX Designer · Ogee Studio · NETSCOUT's design partner<br /><br />
                  Navigation Architecture · Topology Flow Design · Interaction Design for the Deploy Lifecycle.<br /><br />
                  <em>How do you design a system complex enough for expert users ,  without making complexity the experience?</em></p>
                )}
              </div>
            </div>
            <div className="reveal">
              <div className="pull-quote">
                <div className="section-label">
                  <span>The Stakes</span>
                </div>
                <blockquote>{isSimple ? '"A confused administrator changes visibility across an entire data centre."' : '"This isn\'t a consumer app where a confused user abandons their cart. This is enterprise infrastructure where a confused administrator makes a change that takes down visibility across an entire data centre."'}</blockquote>
                <cite>{isSimple ? 'The design constraint' : 'The framing that shaped every design decision'}</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE ECOSYSTEM */}
      <section className="complexity-map">
        <div className="container">
          <div className="section-label reveal">
            <span>The Ecosystem</span>
          </div>
          <h2 className="cs-h2 reveal">One product. Three roles.<br />Zero margin for error.</h2>
          <p className="reveal" style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.8, marginBottom: 0 }}>PFS ONE wasn't a single-user tool. It was a role-based system where different users had different access, different responsibilities, and fundamentally different mental models of what the product was for.</p>

          <div className="stakeholder-grid reveal">
            <div className="stakeholder-card">
              <p className="stakeholder-title">Network Operators</p>
              <p className="stakeholder-sub">Monitoring Users</p>
              <div className="stakeholder-list">
                <h5>Want</h5>
                <ul>
                  <li>Live status visibility instantly</li>
                  <li>Port health at a glance</li>
                  <li>Minimal configuration access</li>
                </ul>
                <h5>Pain</h5>
                <ul>
                  <li>Buried inside a system designed for admins</li>
                  <li>Monitoring mixed with configuration ,  dangerous proximity</li>
                </ul>
              </div>
            </div>
            <div className="stakeholder-card">
              <p className="stakeholder-title">Switch Configuration Managers</p>
              <p className="stakeholder-sub">Power Users</p>
              <div className="stakeholder-list">
                <h5>Want</h5>
                <ul>
                  <li>Full configuration control</li>
                  <li>Topology versioning and rollback</li>
                  <li>Precise publish/unpublish control</li>
                </ul>
                <h5>Pain</h5>
                <ul>
                  <li>Legacy UI forced hop-by-hop configuration</li>
                  <li>No visual representation of traffic flows</li>
                  <li>Changes had to be made live ,  no staging</li>
                </ul>
              </div>
            </div>
            <div className="stakeholder-card">
              <p className="stakeholder-title">Service Administrators</p>
              <p className="stakeholder-sub">System Owners</p>
              <div className="stakeholder-list">
                <h5>Want</h5>
                <ul>
                  <li>Full lifecycle access</li>
                  <li>User and role management</li>
                  <li>System health at scale</li>
                </ul>
                <h5>Pain</h5>
                <ul>
                  <li>No centralised view across switches</li>
                  <li>Software management scattered across interfaces</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="tension-block reveal">
            <h3>Expert users don't need hand-holding. But even experts make mistakes when interfaces obscure system state.<br /><em>The question wasn't how to simplify ,  it was how to make complexity navigable without making it invisible.</em></h3>
            <p>Every navigation decision had to serve a user who knew exactly what they were doing ,  and had no tolerance for a system that got in their way.</p>
          </div>
        </div>
      </section>

      {/* RESEARCH APPROACH */}
      <section className="research">
        <div className="container">
          <div className="section-label reveal">
            <span>Research Approach</span>
          </div>
          <h2 className="cs-h2 reveal">One stakeholder. One year.<br />A domain we had to learn fast.</h2>
          <p className="reveal" style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '640px', lineHeight: 1.8 }}>This project had no traditional user research phase. What it had instead was something equally demanding ,  deep domain immersion through a single, highly informed stakeholder channel.</p>

          <div className="research-stats reveal">
            <div className="research-stat">
              <span className="research-stat-number">01</span>
              <span className="research-stat-label">Primary stakeholder channel</span>
            </div>
            <div className="research-stat">
              <span className="research-stat-number">04</span>
              <span className="research-stat-label">Designers on the team</span>
            </div>
            <div className="research-stat">
              <span className="research-stat-number">03</span>
              <span className="research-stat-label">User roles designed for simultaneously</span>
            </div>
            <div className="research-stat">
              <span className="research-stat-number">01</span>
              <span className="research-stat-label">Year engagement</span>
            </div>
          </div>

          <p className="reveal" style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '48px', maxWidth: '760px' }}>Our primary research input came through Ogee Studio's CEO, who held direct working sessions with NETSCOUT's product team. Every requirement, every domain insight, every constraint came through that channel. As designers on the team, our job was to translate those inputs into an interaction architecture that served users we never directly met. We couldn't validate assumptions with users in the field. We had to build the strongest possible mental model of expert behaviour from second-hand domain knowledge ,  and pressure-test it through the work itself.</p>

          <div className="method-cards reveal">
            <div className="method-card">
              <span className="method-card-label">Method 01</span>
              <h4>Stakeholder Translation</h4>
              <p>Requirements and domain knowledge flowed from NETSCOUT through our CEO. Our design process began with making that knowledge structural ,  turning domain expertise into interaction models, not just feature lists.</p>
            </div>
            <div className="method-card">
              <span className="method-card-label">Method 02</span>
              <h4>Legacy UI Audit</h4>
              <p>The existing interface was our most honest artefact. We had no documented flows ,  so we reverse-engineered the mental models baked into the old system, then challenged every assumption we found there.</p>
            </div>
            <div className="method-card">
              <span className="method-card-label">Method 03</span>
              <h4>Cognitive Walkthrough</h4>
              <p>We stress-tested critical flows against real administrative tasks ,  configuring a topology, publishing changes, rolling back to a previous version ,  asking at every step: where could an expert make a mistake they wouldn't immediately notice?</p>
            </div>
          </div>

          <div className="surprise-callout reveal">
            <h4>The Insight That Shaped Everything</h4>
            <blockquote>"The existing system treated configuration and deployment as one action. Administrators had to make changes live ,  there was no staging, no versioning, no safety net."</blockquote>
            <p>This wasn't a UI problem. It was a workflow problem baked into the architecture of the old interface. Fixing the navigation meant first understanding why the old navigation had failed ,  and that answer lived in the gap between how administrators wanted to work and how the system forced them to work.</p>
          </div>
        </div>
      </section>

      {/* KEY INSIGHTS */}
      <section className="insights">
        <div className="container">
          <div className="section-label reveal">
            <span>Key Insights</span>
          </div>
          <h2 className="cs-h2 reveal">Four insights that defined<br />the design problem.</h2>

          <div className="insights-grid">
            <div className="insight-card reveal">
              <div className="insight-number">01</div>
              <h3 className="insight-title">"Experts aren't confused by complexity. They're frustrated by obscured state."</h3>
              {isSimple ? (
                <p className="insight-body">Administrators knew the domain deeply. The problem was invisible system state: was this topology published or staged? The system didn't surface clarity about state, and for expert users, invisible state is dangerous.</p>
              ) : (
                <>
                  <p className="insight-body">Network administrators understood packet flows, port types, topology routing ,  deeply. What the legacy interface failed them on wasn't the complexity of the domain. It was the inability to see what state the system was in at any given moment. Was this topology published or not? Was this port configured or just staged? The system didn't make state visible ,  and invisible state, for an expert user, is dangerous.</p>
                  <div className="insight-implication">
                    <h5>Strategic Implication</h5>
                    <p>The design problem wasn't simplification. It was state visibility. Every navigation and topology decision had to make system state legible at a glance ,  without requiring the administrator to go looking for it.</p>
                  </div>
                </>
              )}
            </div>

            <div className="insight-card reveal">
              <div className="insight-number">02</div>
              <h3 className="insight-title">"The left navigation tree was the entire mental model."</h3>
              {isSimple ? (
                <p className="insight-body">The left panel wasn't just navigation; it was the administrator's mental model of the network. How it was organized shaped how administrators thought about their infrastructure.</p>
              ) : (
                <>
                  <p className="insight-body">In a lifecycle-based system managing hundreds of ports across multiple switches and geographic locations, the left panel wasn't just navigation ,  it was the administrator's cognitive map of the entire network. How resources were organised, grouped, and labelled in that panel directly shaped how administrators thought about and managed their infrastructure.</p>
                  <div className="insight-implication">
                    <h5>Strategic Implication</h5>
                    <p>Getting the navigation tree wrong didn't just create a usability problem. It created a mental model problem ,  one that would propagate through every interaction in the system.</p>
                  </div>
                </>
              )}
            </div>

            <div className="insight-card reveal">
              <div className="insight-number">03</div>
              <h3 className="insight-title">"Live changes and staged changes needed to be fundamentally separated."</h3>
              {isSimple ? (
                <p className="insight-body">The legacy system merged configuration and deployment into one action. Administrators needed to stage changes, validate them, and push on their schedule. Separating these was critical for safety.</p>
              ) : (
                <>
                  <p className="insight-body">The legacy system conflated two things that expert users needed to keep distinct: what was configured and what was deployed. Administrators needed the ability to stage changes, validate them, and push them to infrastructure on their own schedule ,  especially ahead of maintenance windows. Collapsing this distinction into a single action was the root cause of the most critical usability failures in the old interface.</p>
                  <div className="insight-implication">
                    <h5>Strategic Implication</h5>
                    <p>The publish/unpublish workflow wasn't a feature. It was the central safety mechanism of the entire product. Designing it required understanding not just the interaction ,  but the operational context in which administrators would use it.</p>
                  </div>
                </>
              )}
            </div>

            <div className="insight-card reveal">
              <div className="insight-number">04</div>
              <h3 className="insight-title">"Role-based access wasn't just a permissions problem ,  it was a navigation problem."</h3>
              {isSimple ? (
                <p className="insight-body">Different roles had different workflows and entry points. A Network Operator needed Monitor. A Configuration Manager needed Deploy. Navigation had to be role-aware from the start, not just a permissions gate.</p>
              ) : (
                <>
                  <p className="insight-body">Different user roles didn't just have different permissions. They had fundamentally different workflows, different entry points, and different definitions of what "the product" was. A Network Operator's product was the Monitor lifecycle. A Switch Configuration Manager's product was the Deploy lifecycle. Designing one navigation system that served all three roles without exposing irrelevant complexity to any of them was one of the hardest structural problems on the project.</p>
                  <div className="insight-implication">
                    <h5>Strategic Implication</h5>
                    <p>Navigation had to be role-aware from the first screen ,  not as a permissions gate, but as a genuine personalisation of the product experience based on what each role actually needed to accomplish.</p>
                  </div>
                </>
              )}
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
              <h3 className="decision-title">Flat Navigation<br />vs. Lifecycle-Based Navigation</h3>
            </div>
            <div className="decision-options reveal">
              <div className="option-card rejected">
                <p className="option-label">Option A ,  Rejected</p>
                <h4>Flat Feature Navigation</h4>
                <p>Organise the product around features ,  configuration tools, monitoring tools, deployment tools ,  accessible from a single navigation layer. Familiar. Predictable. Already the model in most enterprise tools.</p>
              </div>
              <div className="option-card chosen">
                <p className="option-label">Option B ,  Chosen</p>
                <h4>Lifecycle-Based Navigation</h4>
                <p>Organise the product around the three stages of an administrator's workflow ,  Configure, Deploy, Monitor ,  each with its own dedicated context, tools, and left panel state.</p>
              </div>
            </div>
            <div className="decision-reasoning reveal">
              <div className="reasoning-block">
                <h5>Who Pushed Back</h5>
                <p>The temptation internally was toward familiarity. Lifecycle navigation was a less common pattern ,  it required users to understand the model before they could navigate it fluently.</p>
              </div>
              <div className="reasoning-block">
                <h5>How We Resolved It</h5>
                <p>We mapped the actual workflow of a network administrator managing a visibility fabric change. The workflow was inherently sequential ,  configure entities, deploy topologies, monitor outcomes. The navigation should reflect that sequence, not obscure it.</p>
              </div>
              <div className="reasoning-block">
                <h5>What We Sacrificed</h5>
                <p>Immediate discoverability for new users. Lifecycle navigation rewards understanding ,  it's faster once learned, but has a steeper initial mental model. For expert users, that was an acceptable trade.</p>
              </div>
            </div>
          </div>

          {/* Decision 2 */}
          <div className="decision-block">
            <div className="decision-header reveal">
              <span className="decision-num">02</span>
              <h3 className="decision-title">Flat Tree<br />vs. Perspective-Based Left Panel</h3>
            </div>
            <div className="decision-options reveal">
              <div className="option-card rejected">
                <p className="option-label">Option A ,  Rejected</p>
                <h4>Single Flat Hierarchy</h4>
                <p>Show all resources in a single hierarchical tree ,  switches, ports, port groups ,  in a fixed structure. Simple to implement. Easy to reason about in isolation.</p>
              </div>
              <div className="option-card chosen">
                <p className="option-label">Option B ,  Chosen</p>
                <h4>Perspective-Based Navigation</h4>
                <p>Allow administrators to reorganise the same resources through multiple lenses ,  by Location, by Logical type, by Filter, by Template ,  switching perspectives without losing context.</p>
              </div>
            </div>
            <div className="decision-reasoning reveal">
              <div className="reasoning-block">
                <h5>Who Pushed Back</h5>
                <p>Engineering flagged implementation complexity. Multiple perspectives on the same data required a more sophisticated underlying model.</p>
              </div>
              <div className="reasoning-block">
                <h5>How We Resolved It</h5>
                <p>We demonstrated that a flat tree would break at scale. A network with hundreds of ports across multiple geographic locations, organised alphabetically by port ID, was not navigable in any meaningful sense. Perspectives weren't an enhancement ,  they were a prerequisite for the tool to work in real deployments.</p>
              </div>
              <div className="reasoning-block">
                <h5>What We Sacrificed</h5>
                <p>Simplicity of the initial mental model. Perspective switching required administrators to understand that the same resources could be viewed differently ,  a concept that needed to be introduced carefully in the UI.</p>
              </div>
            </div>
          </div>

          {/* Decision 3 */}
          <div className="decision-block">
            <div className="decision-header reveal">
              <span className="decision-num">03</span>
              <h3 className="decision-title">Live Publish<br />vs. Staged Topology Publishing</h3>
            </div>
            <div className="decision-options reveal">
              <div className="option-card rejected">
                <p className="option-label">Option A ,  Rejected</p>
                <h4>Live Configuration</h4>
                <p>Changes push to infrastructure immediately on save. Simpler state model. No versioning overhead. Mirrors how the legacy system worked.</p>
              </div>
              <div className="option-card chosen">
                <p className="option-label">Option B ,  Chosen</p>
                <h4>Staged Publishing with Versioning</h4>
                <p>Separate configuration from deployment. Allow administrators to stage changes, create versioned snapshots, validate before pushing, and schedule publication ahead of maintenance windows.</p>
              </div>
            </div>
            <div className="decision-reasoning reveal">
              <div className="reasoning-block">
                <h5>Who Pushed Back</h5>
                <p>This was the most technically complex decision on the project. Engineering flagged significant implementation effort. Product stakeholders questioned whether administrators would understand the two-state model.</p>
              </div>
              <div className="reasoning-block">
                <h5>How We Resolved It</h5>
                <p>We walked through a single real scenario: an administrator needs to reconfigure a topology before a Saturday maintenance window, but it's currently Tuesday. In the staged model, they configure on Tuesday, validate on Thursday, and push on Saturday ,  with rollback available if anything goes wrong. The scenario made the decision self-evident.</p>
              </div>
              <div className="reasoning-block">
                <h5>What We Sacrificed</h5>
                <p>Simplicity of state. The two-state model introduced visual complexity that required careful design to remain legible. Every entity in the topology needed to communicate its publication state clearly ,  at a glance, without ambiguity.</p>
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
          <h2 className="cs-h2 reveal">Six flows. Each chosen because<br />it shows a decision, not just a screen.</h2>

          <div className="artifact-grid">
            {[
              { id: 'flow_01', label: 'D1 ,  Page Structure & Lifecycle Access', flow: 'Flow 01 ,  Lifecycle Navigation & Role-Based Access', hint: 'Page structure diagram showing primary nav bar, lifecycle tabs, and role-based access matrix', problem: 'The legacy interface gave all users access to all functionality ,  creating noise for operators who only needed monitoring, and risk for junior administrators who could accidentally touch configuration tools they shouldn\'t.' },
              { id: 'flow_02', label: 'D2 ,  Perspectives (Deployment LC)', flow: 'Flow 02 ,  Perspective-Based Left Panel', hint: 'Side-by-side view of Location, Logical, Filter, and Template perspective panels', problem: 'A network with hundreds of ports across New York, Seattle, and San Francisco ,  organised in a flat list by port ID ,  was not a navigable artefact. It was a data dump.' },
              { id: 'flow_03', label: 'D3 ,  Landing Page (Deployment LC)', flow: 'Flow 03 ,  Topology Landing Page', hint: 'Card-based landing page showing deployment environments, topology versions, and recently modified feed', problem: 'Administrators managing multiple deployment environments had no coherent overview of what was live, what was staged, and who had touched what ,  before they opened a single topology.' },
              { id: 'flow_04', label: 'D4.2 ,  Editing an Existing Topology', flow: 'Flow 04 ,  Primary Topology Editing Flow', hint: 'Multi-step topology editing flow showing version creation, port state indicators, and configuration panel slide-out', problem: 'The legacy system had no version control. Every edit was made directly on the live topology ,  meaning administrators had to choose between making changes under pressure during maintenance windows, or risking live network impact by editing outside them.' },
              { id: 'flow_05', label: 'D6 ,  Publish Now', flow: 'Flow 05 ,  Publish & Validate', hint: 'Publish flow showing multi-stage validation progress, publish all panel, and connection state colour system', problem: 'Without a structured publish flow, administrators had no reliable way to validate configurations before they reached live infrastructure ,  and no visibility into what was deployed versus what was merely staged.' },
              { id: 'flow_06', label: 'D7 ,  Left Panel Interactions', flow: 'Flow 06 ,  Left Panel Interactions', hint: 'Left panel showing hover menus, multi-select behaviour, and switch hierarchy drill-down', problem: 'In the legacy system, acting on a resource required navigating to a separate configuration screen ,  breaking the administrator\'s spatial awareness of the topology they were working in.' },
            ].map((card) => (
              <div
                key={card.id}
                className="artifact-card reveal"
                role="button"
                tabIndex={0}
                aria-label={`Expand ${card.flow}`}
                onClick={() => setActiveFlow(card.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveFlow(card.id)
                  }
                }}
              >
                <div className="artifact-card-top">
                  <span className="artifact-card-label">{card.label}</span>
                  <span className="artifact-card-expand">Expand <span className="arrow-right" aria-hidden="true">→</span></span>
                </div>
                <p className="artifact-card-flow">{card.flow}</p>
                <p className="artifact-card-hint">{card.hint}</p>
                <div className="artifact-card-problem">
                  <strong>The Problem</strong>
                  {card.problem}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI OPPORTUNITY LAYER */}
      <section className="ai-layer">
        <div className="container">
          <div className="section-label reveal">
            <span>AI Opportunity Layer</span>
          </div>
          <h2 className="cs-h2 reveal">This project was completed in 2016.<br />Here's how I'd approach it differently today.</h2>

          <div className="ai-opportunities">
            <div className="ai-card reveal">
              <div className="ai-card-num">01</div>
              <h3>Intelligent Topology Validation</h3>
              <p>The current validation system checks configurations against known rules before publishing. Today I'd layer an AI model trained on historical topology configurations and deployment outcomes ,  one that could flag not just rule violations, but risk patterns. Configurations that technically pass validation but resemble past deployments that caused issues.<br /><br />From: "This configuration is valid."<br />To: "This configuration is valid ,  but similar topologies caused visibility gaps in 3 previous deployments."</p>
            </div>
            <div className="ai-card reveal">
              <div className="ai-card-num">02</div>
              <h3>Natural Language Topology Querying</h3>
              <p>Administrators managing hundreds of ports across multiple locations currently navigate through a hierarchical tree to find what they need. Today I'd add a natural language query layer ,  "show me all unpublished monitor ports in New York" ,  that translates intent into filtered topology views without requiring manual navigation.<br /><br />The perspective system we designed was the right answer in 2016. In 2026, the right answer is letting administrators describe what they need and having the system surface it.</p>
            </div>
            <div className="ai-card reveal">
              <div className="ai-card-num">03</div>
              <h3>Anomaly Detection in the Monitor Lifecycle</h3>
              <p>The Monitor lifecycle currently shows port statistics and alarm states ,  a reactive view of what's happening. Today I'd design an AI layer that learns baseline traffic patterns per port and surfaces anomalies before they become alarms.<br /><br />Not: "Your port utilisation is at 98%."<br />But: "This port's traffic pattern has deviated from its 30-day baseline in a way that preceded a failure event twice before."</p>
            </div>
          </div>

          <div className="ai-big-picture reveal">
            <p>These three opportunities share a common thread ,  they all move PFS ONE from a <em>configuration and monitoring tool</em> to an <em>intelligence layer for network visibility.</em> From a product that shows administrators what the network is doing, to one that helps them understand what the network is about to do.</p>
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="outcomes">
        <div className="container">
          <div className="section-label reveal">
            <span>Outcomes + Impact</span>
          </div>
          <h2 className="cs-h2 reveal">{isSimple ? 'Three strategic wins.' : 'Impact lives at three levels.'}</h2>

          <div className="outcomes-grid">
            <div className="outcome-column reveal">
              <div className="outcome-column-header">
                <h3>{isSimple ? 'Navigation Wins' : 'Research Impact'}</h3>
              </div>
              {isSimple ? (
                <>
                  <div className="outcome-item">
                    <strong>Lifecycle navigation shipped</strong>
                    Configure · Deploy · Monitor, with dedicated context for each stage.
                  </div>
                  <div className="outcome-item">
                    <strong>Perspective-based left panel shipped</strong>
                    Location, Logical, Filter, Template, giving administrators multiple cognitive lenses.
                  </div>
                  <div className="outcome-item">
                    <strong>Staged publishing system shipped</strong>
                    Two-state model with validation and versioning for controlled deployments.
                  </div>
                </>
              ) : (
                <>
                  <div className="outcome-item">
                    <strong>Domain model established</strong>
                    Extended stakeholder immersion through a single senior channel produced the first structured understanding of how network administrators thought about and managed visibility infrastructure ,  creating the design foundation for the entire product.
                  </div>
                  <div className="outcome-item">
                    <strong>Legacy failure modes identified</strong>
                    Reverse-engineering the old interface surfaced three critical workflow gaps: no staged publishing, no perspective-based navigation, no role-differentiated access ,  each of which became a core design workstream.
                  </div>
                  <div className="outcome-item">
                    <strong>Mental model documented</strong>
                    The left panel perspective system emerged directly from mapping how administrators organised their thinking about network resources ,  producing a navigation architecture grounded in cognitive reality rather than data structure.
                  </div>
                </>
              )}
            </div>

            <div className="outcome-column reveal">
              <div className="outcome-column-header">
                <h3>{isSimple ? 'Design Foundations' : 'Design Impact'}</h3>
              </div>
              {isSimple ? (
                <>
                  <div className="outcome-item">
                    <strong>State visibility across topology</strong>
                    Every port and connection communicates publication state at a glance.
                  </div>
                  <div className="outcome-item">
                    <strong>Validation as safety mechanism</strong>
                    Multi-stage publish flow prevents configuration errors from reaching infrastructure.
                  </div>
                  <div className="outcome-item">
                    <strong>Role-aware navigation</strong>
                    Each user role sees only their needed product surface, not irrelevant complexity.
                  </div>
                </>
              ) : (
                <>
                  <div className="outcome-item">
                    <strong>Lifecycle navigation shipped</strong>
                    Configure · Deploy · Monitor · Inline ,  four lifecycle stages, each with dedicated context and tooling, delivered as the primary navigation architecture of the shipped product.
                  </div>
                  <div className="outcome-item">
                    <strong>Perspective-based left panel shipped</strong>
                    Location · Logical · Filter · Template perspectives ,  giving administrators four cognitive lenses on the same resource hierarchy, confirmed in the shipped product datasheet.
                  </div>
                  <div className="outcome-item">
                    <strong>Staged topology publishing shipped</strong>
                    Two-state publish model with versioning, scheduling, and validation ,  moving administrators from live-only changes to a controlled, stageable deployment workflow.
                  </div>
                  <div className="outcome-item">
                    <strong>Role-based lifecycle access shipped</strong>
                    Navigation personalised by user role ,  confirmed in the shipped product, with Service Administrator, Switch Configuration Manager, and Network Operator roles each accessing a tailored product surface.
                  </div>
                </>
              )}
            </div>

            <div className="outcome-column reveal">
              <div className="outcome-column-header">
                <h3>{isSimple ? 'Strategic Outcome' : 'Strategic Impact'}</h3>
              </div>
              {isSimple ? (
                <div className="outcome-item">
                  <strong>A legacy system made future-ready</strong>
                  The redesign established architectural foundations for evolution: centralised management, predictive monitoring, and intelligent visibility.
                </div>
              ) : (
                <>
                  <div className="outcome-item">
                    <strong>A legacy product made future-ready</strong>
                    The redesign didn't just improve usability ,  it established an architectural foundation capable of supporting the product's evolution toward centralised management, inline toolchain configuration, and predictive monitoring.
                  </div>
                  <div className="outcome-item">
                    <strong>Design as infrastructure</strong>
                    The navigation and topology systems we designed weren't screens ,  they were structural decisions that determined how the entire product could grow. The fact that they shipped without significant architectural change is the outcome that matters most.
                  </div>
                </>
              )}
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
          <h2 className="cs-h2 reveal">{isSimple ? 'What I\'d refine today.' : 'The best designers aren\'t the ones who get everything right.\nThey\'re the ones who know exactly what they\'d do differently.'}</h2>

          <div className="reflection-items">
            <div className="reflection-item">
              <span className="reflection-num reveal">01</span>
              <div className="reflection-content reveal">
                {isSimple ? (
                  <h3>Push harder for direct user access, even with expert users</h3>
                ) : (
                  <h3>Push harder for direct user access, even with expert users</h3>
                )}
                {isSimple ? (
                  <p>We learned the domain through one stakeholder channel. I'd push harder for at least one or two observational sessions with working administrators in their actual environment. Watching experts work reveals friction that requirement documents can't.</p>
                ) : (
                  <p>We learned the domain through a single stakeholder channel ,  which was the reality of this engagement. But I'd now push harder for even one or two observational sessions with working network administrators in their actual environment. Watching an expert work in a high-stakes operational context reveals things no requirement document can ,  the workarounds, the muscle memory, the moments of hesitation that signal where real friction lives.</p>
                )}
              </div>
            </div>
            <div className="reflection-item">
              <span className="reflection-num reveal">02</span>
              <div className="reflection-content reveal">
                {isSimple ? (
                  <h3>Design onboarding to the mental model, not just the UI</h3>
                ) : (
                  <h3>Design the onboarding to the mental model, not just the UI</h3>
                )}
                {isSimple ? (
                  <p>The perspective-based navigation required administrators to learn a new mental model. I'd invest more in the first-use experience: not a tutorial, but a designed onboarding moment that introduces the model in context. The architecture was sound. The entry point needed more care.</p>
                ) : (
                  <p>The perspective-based navigation and lifecycle model were the right architectural decisions. But they required administrators to learn a new mental model before they could use the product fluently. In hindsight, I'd invest significantly more in the first-use experience ,  not a tutorial, but a designed onboarding moment that introduces the lifecycle model in the context of a real task. The architecture was sound. The entry point needed more care.</p>
                )}
              </div>
            </div>
            {!isSimple && (
              <div className="reflection-item">
                <span className="reflection-num reveal">03</span>
                <div className="reflection-content reveal">
                  <h3>Make the two-state model more forgiving</h3>
                  <p>The publish/unpublish system was the right answer to a real problem. But two-state models introduce cognitive load ,  administrators had to track not just what was configured, but what was deployed. Looking back, I'd explore whether the visual language could do more of that tracking work for the user ,  reducing the mental overhead of maintaining awareness of system state across a complex topology with dozens of entities in different publication states.</p>
                </div>
              </div>
            )}
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
