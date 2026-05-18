/**
 * components.js
 * Injects shared <nav>, mobile menu overlay, and <footer> into every page.
 * Auto-detects whether the page is in a subdirectory to resolve asset paths.
 */
(function () {
  const home = 'index.html';

  // ── NAV HTML ─────────────────────────────────────────────────────────────
  const navHTML = `
  <nav id="site-nav">
    <a href="${home}" class="nav-logo">
      <img src="AKlogo.png" alt="Ameya Kulkarni" class="nav-logo-img">
    </a>
    <ul class="nav-links">
      <li><a href="#work">Work</a></li>
      <li><a href="#ai-workflow">AI Workflow</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact" class="cta">Let's Talk →</a></li>
    </ul>
    <div class="nav-actions">
      <button class="theme-toggle" aria-label="Toggle colour theme" id="theme-toggle">
        <svg class="icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </button>
      <button class="nav-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>`;

  // ── MOBILE MENU HTML ──────────────────────────────────────────────────────
  const mobileMenuHTML = `
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation" aria-hidden="true">
    <ul class="mobile-menu-links">
      <li><a href="#work" style="--stagger: 1"><div class="menu-item-label"><span class="menu-num">01</span>Work</div> <span class="menu-arrow">↗</span></a></li>
      <li><a href="#ai-workflow" style="--stagger: 2"><div class="menu-item-label"><span class="menu-num">02</span>AI Workflow</div> <span class="menu-arrow">↗</span></a></li>
      <li><a href="#about" style="--stagger: 3"><div class="menu-item-label"><span class="menu-num">03</span>About</div> <span class="menu-arrow">↗</span></a></li>
      <li><a href="#contact" style="--stagger: 4"><div class="menu-item-label"><span class="menu-num">04</span>Contact</div> <span class="menu-arrow">↗</span></a></li>
    </ul>
    <div class="mobile-menu-footer">
      <div class="availability-status">
        <span class="pulse-dot"></span>
        <span class="mobile-menu-footer-label">Available to join your company</span>
      </div>
      <a href="#contact" class="mobile-menu-footer-cta">Let's Talk →</a>
    </div>
  </div>`;

  // ── FOOTER HTML ───────────────────────────────────────────────────────────
  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-row">
      <div class="footer-legal">
        <p>© 2026 Ameya Kulkarni</p>
      </div>
      <div class="footer-center">
        <span class="footer-exploring-label">Currently Exploring</span>
        <p class="footer-statement">AI-augmented design systems for distributed teams.<br>Obsessed with the intersection of strategy, AI, and human-centered design.</p>
      </div>
      <div class="footer-contact">
        <a href="#contact" class="footer-contact-link">Get in touch</a>
        <a href="mailto:ameya@example.com" class="footer-email">ameya@example.com</a>
      </div>
    </div>
  </footer>`;

  // ── INJECT ────────────────────────────────────────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', mobileMenuHTML);
  document.body.insertAdjacentHTML('afterbegin', navHTML);
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // ── INJECT SHARED NAV/FOOTER STYLES (only if style.css is not already loaded) ──
  if (!document.querySelector('link[href*="style.css"]') && !document.getElementById('shared-component-styles')) {
    const sharedStyles = document.createElement('style');
    sharedStyles.id = 'shared-component-styles';
    sharedStyles.textContent = `
      /* ── SHARED NAV ── */
      #site-nav {
        position: fixed; top: 0; left: 0; right: 0;
        height: 88px; display: flex; align-items: center;
        justify-content: space-between; padding: 0 80px;
        background: var(--nav-bg, rgba(10,10,10,0.92));
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border, #1F1F1F); z-index: 100;
        transition: background 0.3s ease, border-color 0.3s ease;
      }
      #site-nav .nav-logo { display: flex; align-items: center; text-decoration: none; }
      #site-nav .nav-logo-img { height: 52px; width: auto; object-fit: contain; }
      #site-nav .nav-links { display: flex; align-items: center; gap: 0; list-style: none; }
      #site-nav .nav-links a {
        display: inline-block; font-size: 14px; color: var(--muted, #AAAAAA);
        text-decoration: none; letter-spacing: 0.02em; padding: 4px 20px;
        position: relative; transition: color 0.2s;
      }
      #site-nav .nav-links a::after {
        content: ''; position: absolute; bottom: -1px; left: 20px; right: 20px;
        height: 1px; background: var(--accent, #C8A97E); transform: scaleX(0);
        transform-origin: left; transition: transform 0.22s ease;
      }
      #site-nav .nav-links a:hover, #site-nav .nav-links a.active { color: var(--text, #fff); }
      #site-nav .nav-links a:hover::after, #site-nav .nav-links a.active::after { transform: scaleX(1); }
      #site-nav .nav-links .cta { color: var(--accent, #C8A97E); opacity: 1; }
      #site-nav .nav-links .cta::after { display: none; }
      #site-nav .nav-links .cta:hover { opacity: 0.8; }
      #site-nav .nav-actions {
        display: flex; align-items: center; gap: 12px;
      }
      #site-nav .nav-hamburger {
        display: none; flex-direction: column; justify-content: center;
        align-items: center; gap: 5px; width: 44px; height: 44px;
        background: none; border: none; cursor: pointer; padding: 0; flex-shrink: 0;
      }
      #site-nav .nav-hamburger span {
        display: block; height: 1.5px; background: var(--text, #fff); border-radius: 1px;
        transform-origin: center;
        transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease, width 0.4s cubic-bezier(0.16,1,0.3,1);
      }
      #site-nav .nav-hamburger span:nth-child(1) { width: 24px; transform: translateX(0); }
      #site-nav .nav-hamburger span:nth-child(2) { width: 18px; transform: translateX(3px); }
      #site-nav .nav-hamburger span:nth-child(3) { width: 12px; transform: translateX(6px); }
      #site-nav .nav-hamburger.is-open span:nth-child(1) { width: 24px; transform: translateY(6.5px) rotate(45deg); }
      #site-nav .nav-hamburger.is-open span:nth-child(2) { opacity: 0; transform: translateX(10px); }
      #site-nav .nav-hamburger.is-open span:nth-child(3) { width: 24px; transform: translateY(-6.5px) rotate(-45deg); }

      /* ── SHARED MOBILE MENU ── */
      .mobile-menu {
        position: fixed; inset: 0; background: var(--overlay-bg, rgba(10,10,10,0.97));
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        z-index: 200; display: flex; flex-direction: column;
        justify-content: center; padding: 96px 40px 48px;
        opacity: 0; pointer-events: none; transition: opacity 0.3s ease, background 0.3s ease;
      }
      .mobile-menu.is-open { opacity: 1; pointer-events: all; }
      
      /* Nav sits above overlay so hamburger × is always clickable */
      #site-nav { transition: z-index 0s; }
      body.menu-open #site-nav { z-index: 201; }
      .mobile-menu-links { list-style: none; display: flex; flex-direction: column; gap: 0; flex: 1; justify-content: center; }
      .mobile-menu-links li { overflow: hidden; border-bottom: 1px solid var(--border, #1F1F1F); }
      .mobile-menu-links li:last-child { border-bottom: none; }
      .mobile-menu-links a {
        display: flex; align-items: center; justify-content: space-between;
        font-family: var(--font-display, 'Playfair Display', Georgia, serif);
        font-size: clamp(40px,10vw,56px); font-weight: 500; color: var(--text, #fff);
        text-decoration: none; letter-spacing: -0.01em; line-height: 1; padding: 28px 0;
        transform: translateY(48px); opacity: 0;
        transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease, color 0.3s ease;
      }
      .mobile-menu.is-open .mobile-menu-links a { transform: translateY(0); opacity: 1; }
      .mobile-menu.is-open .mobile-menu-links li:nth-child(1) a { transition-delay: 0.07s; }
      .mobile-menu.is-open .mobile-menu-links li:nth-child(2) a { transition-delay: 0.13s; }
      .mobile-menu.is-open .mobile-menu-links li:nth-child(3) a { transition-delay: 0.19s; }
      .mobile-menu.is-open .mobile-menu-links li:nth-child(4) a { transition-delay: 0.25s; }
      .mobile-menu-links a:hover, .mobile-menu-links a:active { color: var(--accent, #C8A97E); }
      .menu-item-label { display: flex; align-items: baseline; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
      .mobile-menu-links a:hover .menu-item-label { transform: translateX(12px); }
      .menu-num { font-family: var(--font-body, 'DM Sans', sans-serif); font-size: 14px; font-weight: 400; color: var(--accent, #C8A97E); margin-right: 28px; opacity: 0.7; transform: translateY(-12px); letter-spacing: 0.1em; }
      .mobile-menu-links a .menu-arrow { font-family: var(--font-body, 'DM Sans', sans-serif); font-size: clamp(20px,5vw,24px); color: var(--accent, #C8A97E); opacity: 0.7; transition: all 0.4s cubic-bezier(0.16,1,0.3,1); flex-shrink: 0; }
      .mobile-menu-links a:hover .menu-arrow { opacity: 1; transform: translate(6px,-6px) scale(1.1); }
      .mobile-menu-footer { padding-top: 32px; display: flex; justify-content: space-between; align-items: center; flex-shrink: 0; }
      .availability-status { display: flex; align-items: center; gap: 12px; }
      .pulse-dot { width: 6px; height: 6px; border-radius: 50%; background-color: #10B981; box-shadow: 0 0 0 0 rgba(16,185,129,0.7); animation: pulseGlow 2s infinite cubic-bezier(0.66,0,0,1); }
      @keyframes pulseGlow { to { box-shadow: 0 0 0 10px rgba(16,185,129,0); } }
      .mobile-menu-footer-label { font-size: 11px; letter-spacing: 0.12em; color: var(--muted, #888); text-transform: uppercase; }
      .mobile-menu-footer-cta { font-size: 12px; font-weight: 500; letter-spacing: 0.1em; color: var(--accent, #C8A97E); text-decoration: none; text-transform: uppercase; transition: opacity 0.2s; }
      .mobile-menu-footer-cta:hover { opacity: 0.75; }

      /* ── SHARED FOOTER ── */
      .site-footer { background: var(--bg, #0A0A0A); border-top: 1px solid var(--border, #1F1F1F); padding: 48px 80px; width: 100%; box-sizing: border-box; transition: background 0.3s ease, border-color 0.3s ease; }
      .footer-row { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; align-items: center; gap: 40px; }
      .footer-legal { flex-shrink: 0; }
      .footer-legal p { font-size: 12px; color: var(--muted, #666666); line-height: 1.6; }
      .footer-center { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
      .footer-exploring-label { font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted, #888888); white-space: nowrap; }
      .footer-statement { font-size: 14px; color: var(--text, #FFFFFF); line-height: 1.65; }
      .footer-contact { display: flex; flex-direction: column; align-items: flex-end; justify-self: end; gap: 10px; }
      .footer-contact-link { font-size: 14px; font-weight: 500; color: var(--accent, #C8A97E); text-decoration: none; text-underline-offset: 3px; text-decoration: underline; text-decoration-color: transparent; transition: color 0.2s ease, text-decoration-color 0.2s ease; }
      .footer-contact-link:hover { text-decoration-color: currentColor; }
      .footer-email { font-size: 12px; color: var(--muted, #888888); text-decoration: none; transition: color 0.2s ease; }
      .footer-email:hover { color: var(--accent, #C8A97E); }

      /* ── SPACING FIX: reduce gap before footer on case study pages ── */
      .next-case { padding-bottom: 64px !important; }
      .site-footer { margin-top: 0; }

      /* ── THEME TOGGLE ── */
      .theme-toggle {
        background: none; border: 1px solid var(--border, #1F1F1F); color: var(--text, #fff);
        cursor: pointer; width: 36px; height: 36px; border-radius: 50%;
        display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        transition: border-color 0.2s, color 0.2s; padding: 0;
      }
      .theme-toggle:hover { border-color: var(--accent, #C8A97E); color: var(--accent, #C8A97E); }
      .theme-toggle svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .theme-toggle .icon-moon { display: block; }
      .theme-toggle .icon-sun { display: none; }
      [data-theme="light"] .theme-toggle .icon-moon { display: none; }
      [data-theme="light"] .theme-toggle .icon-sun { display: block; }

      /* ── RESPONSIVE NAV ── */
      @media (max-width: 1024px) {
        #site-nav { padding: 0 40px; }
        .site-footer { padding: 48px 40px; }
        .footer-row { gap: 24px; }
      }
      @media (max-width: 768px) {
        #site-nav { padding: 0 24px; }
        #site-nav .nav-links { display: none; }
        #site-nav .nav-hamburger { display: flex; }
        #site-nav .nav-actions { gap: 8px; }
        .site-footer { padding: 48px 40px; }
        .footer-row { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 28px; }
        .footer-legal { text-align: center; }
        .footer-contact { align-items: center; justify-self: center; }
      }
      @media (max-width: 480px) {
        #site-nav { padding: 0 20px; }
        .site-footer { padding: 40px 24px; }
        .footer-statement { max-width: 100%; }
      }
    `;
    document.head.appendChild(sharedStyles);
  }

  // ── HAMBURGER INIT ────────────────────────────────────────────────────────
  // Runs after DOM settles (nav was just injected above via insertAdjacentHTML)
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    function openMenu() {
      hamburger.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      document.body.classList.add('menu-open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      document.body.classList.remove('menu-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      hamburger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ── THEME TOGGLE ─────────────────────────────────────────────────────────────
  (function () {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'light') root.setAttribute('data-theme', 'light');

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        if (isLight) {
          root.removeAttribute('data-theme');
          localStorage.setItem('theme', 'dark');
        } else {
          root.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  })();

  // ── NAV ACTIVE STATE ────────────────────────────────────────────────────────
  const WORK_HASHES = new Set(['#work', '#digisense', '#pfsone']);

  function updateNavActive() {
    const workLink = document.querySelector('#site-nav a[href="#work"]');
    if (workLink) workLink.classList.toggle('active', WORK_HASHES.has(window.location.hash));
  }

  window.addEventListener('hashchange', updateNavActive);
  updateNavActive();

})();
