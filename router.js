/**
 * SPA Router for Portfolio 2026
 * Handles hash-based routing to load case studies dynamically.
 */

(function () {
  const homeView = document.getElementById('home-view');
  const caseView = document.getElementById('case-view');
  const loadingOverlay = document.getElementById('loading-overlay');

  const routes = {
    '': { type: 'home' },
    '#': { type: 'home' },
    '#work': { type: 'case', file: 'work.html' },
    '#ai-workflow': { type: 'home', anchor: 'ai-workflow' },
    '#impact': { type: 'home', anchor: 'impact' },
    '#about': { type: 'home', anchor: 'about' },
    '#contact': { type: 'home', anchor: 'contact' },
    '#digisense': { type: 'case', file: 'digisense.html' },
    '#pfsone': { type: 'case', file: 'pfsone.html' }
  };

  let currentView = 'home';
  const injectedStyles = new Set();

  /**
   * Main Router Function
   */
  async function handleRoute() {
    const hash = window.location.hash || '';
    const route = routes[hash] || (hash.startsWith('#') ? { type: 'home', anchor: hash.substring(1) } : null);

    if (!route) return;

    if (route.type === 'home') {
      showHome(route.anchor);
    } else if (route.type === 'case') {
      await loadCaseStudy(route.file, hash);
    }
  }

  /**
   * Transition to Home View
   */
  function showHome(anchor) {
    if (currentView === 'home') {
      if (anchor) scrollToAnchor(anchor);
      return;
    }

    caseView.classList.add('view-exit');

    setTimeout(() => {
      caseView.classList.add('hidden');
      caseView.classList.remove('view-exit');
      caseView.innerHTML = '';

      homeView.classList.remove('hidden');
      homeView.classList.add('view-enter');

      requestAnimationFrame(() => {
        homeView.classList.add('view-enter-active');
        currentView = 'home';

        setTimeout(() => {
          homeView.classList.remove('view-enter', 'view-enter-active');
          if (anchor) scrollToAnchor(anchor);
          else window.scrollTo(0, 0);
        }, 400);
      });
    }, 400);
  }

  /**
   * Load and Transition to Case Study
   */
  async function loadCaseStudy(fileName, hash) {
    if (loadingOverlay) loadingOverlay.classList.add('active');

    try {
      const response = await fetch(fileName);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // 1. Update Title
      document.title = doc.title || 'Case Study';

      // 2. Isolate styles: Remove previous router styles and add new ones
      document.querySelectorAll('style[data-router-style]').forEach(s => s.remove());
      injectedStyles.clear();

      const styles = doc.querySelectorAll('style');
      styles.forEach(style => {
        const styleId = `style-${fileName.split('.')[0]}`;
        const newStyle = document.createElement('style');
        newStyle.textContent = style.textContent;
        newStyle.setAttribute('data-router-style', styleId);
        document.head.appendChild(newStyle);
        injectedStyles.add(styleId);
      });

      // 3. Clean fetched content: Remove nav, footer, modal (lives in shell), and scripts already in shell
      const redundant = doc.querySelectorAll('nav, footer, .mobile-menu, #artifact-modal, script[src*="components.js"]');
      redundant.forEach(el => el.remove());

      // 4. Prepare case view content
      const bodyContent = doc.body.innerHTML;
      
      // 5. Transition views
      if (currentView === 'home') {
        homeView.classList.add('view-exit');
        setTimeout(() => {
          homeView.classList.add('hidden');
          homeView.classList.remove('view-exit');
          performCaseEntry(bodyContent);
        }, 400);
      } else {
        // Case to Case transition
        caseView.classList.add('view-exit');
        setTimeout(() => {
          caseView.classList.add('hidden'); // Ensure it's hidden before swap
          caseView.classList.remove('view-exit');
          performCaseEntry(bodyContent);
        }, 400);
      }

    } catch (error) {
      console.error('Failed to load case study:', error);
      if (loadingOverlay) loadingOverlay.classList.remove('active');
      // Fallback: stay home or alert
    }
  }

  /**
   * Helper for Case Entry
   */
  function performCaseEntry(content) {
    caseView.innerHTML = content;
    caseView.classList.remove('hidden');
    caseView.classList.add('view-enter');

    // Scroll to top
    window.scrollTo(0, 0);
    
    requestAnimationFrame(() => {
      caseView.classList.add('view-enter-active');
      currentView = 'case';
      
      if (loadingOverlay) loadingOverlay.classList.remove('active');
      
      setTimeout(() => {
        caseView.classList.remove('view-enter', 'view-enter-active');
        reinitScripts();
      }, 400);
    });
  }

  /**
   * Re-initialize scripts for injected content
   */
  function reinitScripts() {
    // 1. Scroll Reveal (Intersection Observer)
    const reveals = caseView.querySelectorAll('.reveal');
    if (reveals.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      
      reveals.forEach(el => observer.observe(el));
      
      // Stagger children reveals if any grids exist
      caseView.querySelectorAll('.insights-grid, .stakeholder-grid, .ai-opportunities, .outcomes-grid, .artifact-grid').forEach(grid => {
        grid.querySelectorAll('.reveal').forEach((el, i) => {
          el.style.transitionDelay = `${i * 0.08}s`;
        });
      });
    }

    // 2. Link hijacking - ensure links to index.html or home sections work via router
    caseView.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === 'index.html' || href === '/') {
        link.setAttribute('href', '#');
      } else if (href && (href.startsWith('index.html#') || href.startsWith('#'))) {
        // Keep as is or normalize to #hash
        if (href.includes('#')) {
          link.setAttribute('href', '#' + href.split('#')[1]);
        }
      }
    });
  }

  /**
   * Artifact modal — event delegation, wired once at init.
   * Reads DOM at call-time so references never go stale across navigations.
   */
  function openArtifactModal(flowId) {
    const modal = document.getElementById('artifact-modal');
    const flowDataEl = document.getElementById('flow-data');
    if (!modal || !flowDataEl) return;

    const data = JSON.parse(flowDataEl.textContent)[flowId];
    if (!data) return;

    document.getElementById('modal-image-label').textContent = data.label;
    document.getElementById('modal-image-title').textContent = data.title;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-decision').textContent = data.decision;
    document.getElementById('modal-annotations').innerHTML = data.annotations.map(a => `
      <div class="annotation-item">
        <div class="annotation-item-header">
          <span class="annotation-badge">${a.num}</span>
          <span class="annotation-label">${a.label}</span>
        </div>
        <p class="annotation-text">${a.text}</p>
      </div>
    `).join('');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeArtifactModal() {
    const modal = document.getElementById('artifact-modal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open — delegate to caseView (cards live inside it)
  caseView.addEventListener('click', (e) => {
    const card = e.target.closest('.artifact-card');
    if (card) openArtifactModal(card.dataset.flow);
  });

  caseView.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.artifact-card');
      if (card) { e.preventDefault(); openArtifactModal(card.dataset.flow); }
    }
  });

  // Close — backdrop, × button, Escape
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('artifact-modal');
    if (!modal) return;
    if (e.target === modal || e.target.closest('.artifact-modal-close')) closeArtifactModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeArtifactModal();
  });

  /**
   * Scroll to Anchor smoothly
   */
  function scrollToAnchor(id) {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 72; // Adjust to your nav height
      window.scrollTo({
        top: el.offsetTop - navHeight,
        behavior: 'smooth'
      });
    }
  }

  // Listen for hash changes
  window.addEventListener('hashchange', handleRoute);
  
  // Handle initial load
  window.addEventListener('DOMContentLoaded', handleRoute);

  // Global click interceptor for SPA navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Intercept clicks to home or anchors while in a case study
    if (href === 'index.html' || href === '/') {
      if (currentView === 'case') {
        e.preventDefault();
        window.location.hash = ''; // This triggers hashchange -> handleRoute -> showHome
      }
    }
  });

})();
