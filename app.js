/* ═══════════════════════════════════════════════════════════════
   AXION — AI Business Intelligence Platform
   Application JavaScript
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── DOM READY ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initEngineTooltips();
  initCapabilityLines();
  initDashboardCharts();
  initKPICounters();
  initAIInsightCycle();
  initCopilotChat();
  initHowTimeline();
  initSmoothScrollNav();
});

/* ═══════════════════════════════════════════════════════════════
   1. NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
    });
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   2. SCROLL ANIMATIONS (IntersectionObserver)
   ═══════════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  // Add fade-in-up to all major cards
  const targets = document.querySelectorAll(
    '.problem-card, .cap-card, .solution-card, .how-step, .kpi-card, .chart-card, .impact-card, .arch-layer-card'
  );
  targets.forEach((el, i) => {
    el.classList.add('fade-in-up');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

  // Section header animations
  const headerObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-header').forEach(h => {
    h.style.opacity = '0';
    h.style.transform = 'translateY(20px)';
    h.style.transition = 'all 0.7s ease';
    headerObs.observe(h);
  });
}

/* ═══════════════════════════════════════════════════════════════
   3. ENGINE TOOLTIPS
   ═══════════════════════════════════════════════════════════════ */
function initEngineTooltips() {
  const tooltip = document.getElementById('engineTooltip');
  if (!tooltip) return;

  document.querySelectorAll('.engine-node[data-tooltip]').forEach(node => {
    node.addEventListener('mouseenter', (e) => {
      tooltip.textContent = node.dataset.tooltip;
      tooltip.classList.add('visible');
      positionTooltip(e);
    });
    node.addEventListener('mousemove', positionTooltip);
    node.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
  });

  function positionTooltip(e) {
    const x = e.clientX + 14;
    const y = e.clientY - 10;
    const maxX = window.innerWidth - 280;
    tooltip.style.left = `${Math.min(x, maxX)}px`;
    tooltip.style.top = `${y}px`;
  }
}

/* ═══════════════════════════════════════════════════════════════
   4. CAPABILITY CONNECTING LINES
   ═══════════════════════════════════════════════════════════════ */
function initCapabilityLines() {
  const svg = document.getElementById('capConnections');
  if (!svg) return;

  function drawLines() {
    const cards = [
      document.getElementById('cap-0'),
      document.getElementById('cap-1'),
      document.getElementById('cap-2'),
      document.getElementById('cap-3')
    ];
    if (!cards[0]) return;

    const lines = [
      document.getElementById('capLine1'),
      document.getElementById('capLine2'),
      document.getElementById('capLine3')
    ];

    const svgRect = svg.getBoundingClientRect();
    const pairs = [[0,1],[1,3],[0,2]];

    pairs.forEach(([a, b], i) => {
      const r1 = cards[a].getBoundingClientRect();
      const r2 = cards[b].getBoundingClientRect();
      const x1 = r1.left + r1.width/2 - svgRect.left;
      const y1 = r1.top + r1.height/2 - svgRect.top;
      const x2 = r2.left + r2.width/2 - svgRect.left;
      const y2 = r2.top + r2.height/2 - svgRect.top;
      if (lines[i]) {
        lines[i].setAttribute('x1', x1);
        lines[i].setAttribute('y1', y1);
        lines[i].setAttribute('x2', x2);
        lines[i].setAttribute('y2', y2);
      }
    });
  }

  window.addEventListener('resize', drawLines);
  setTimeout(drawLines, 500);
}

/* ═══════════════════════════════════════════════════════════════
   5. DASHBOARD CHARTS (Chart.js)
   ═══════════════════════════════════════════════════════════════ */
function initDashboardCharts() {
  if (typeof Chart === 'undefined') {
    // Retry after a second
    setTimeout(initDashboardCharts, 1000);
    return;
  }

  Chart.defaults.color = 'rgba(240,244,255,0.45)';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.font.size = 11;

  const gradientBlue = (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 200);
    g.addColorStop(0, 'rgba(0,212,255,0.35)');
    g.addColorStop(1, 'rgba(0,212,255,0.01)');
    return g;
  };

  // Revenue Chart
  const revCtx = document.getElementById('revenueChart');
  if (revCtx) {
    new Chart(revCtx, {
      type: 'line',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Revenue (₹L)',
          data: [18.2, 20.5, 19.8, 22.3, 23.1, 24.8],
          borderColor: '#00d4ff',
          borderWidth: 2.5,
          pointBackgroundColor: '#00d4ff',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          backgroundColor: (ctx) => gradientBlue(ctx.chart.ctx),
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: tooltipStyle() },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `₹${v}L` } }
        }
      }
    });
  }

  // Inventory Chart
  const invCtx = document.getElementById('inventoryChart');
  if (invCtx) {
    new Chart(invCtx, {
      type: 'bar',
      data: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
        datasets: [
          {
            label: 'Current Stock',
            data: [480, 420, 370, 290, 180],
            backgroundColor: 'rgba(0,119,255,0.5)',
            borderColor: 'rgba(0,119,255,0.8)',
            borderWidth: 1,
            borderRadius: 4
          },
          {
            label: 'Reorder Point',
            data: [200, 200, 200, 200, 200],
            type: 'line',
            borderColor: '#ff4466',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false,
            tension: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: tooltipStyle() },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' } }
        }
      }
    });
  }

  // Return Rate Chart
  const retCtx = document.getElementById('returnChart');
  if (retCtx) {
    new Chart(retCtx, {
      type: 'line',
      data: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
        datasets: [{
          label: 'Return Rate %',
          data: [11.2, 10.8, 9.9, 9.2, 8.7, 8.2],
          borderColor: '#22c55e',
          borderWidth: 2.5,
          pointBackgroundColor: '#22c55e',
          pointRadius: 3,
          fill: true,
          backgroundColor: 'rgba(34,197,94,0.08)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: tooltipStyle() },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { callback: v => `${v}%` } }
        }
      }
    });
  }

  // Expense Anomalies Chart
  const expCtx = document.getElementById('expenseChart');
  if (expCtx) {
    new Chart(expCtx, {
      type: 'bar',
      data: {
        labels: ['Travel', 'Hotels', 'Meals', 'Tech', 'Misc', 'Entertainment'],
        datasets: [{
          label: 'Anomalies',
          data: [5, 4, 3, 2, 2, 1],
          backgroundColor: [
            'rgba(255,68,102,0.7)',
            'rgba(255,102,48,0.6)',
            'rgba(245,158,11,0.6)',
            'rgba(0,212,255,0.5)',
            'rgba(0,119,255,0.5)',
            'rgba(102,0,255,0.5)'
          ],
          borderRadius: 5,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: tooltipStyle() },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { stepSize: 1 } }
        }
      }
    });
  }
}

function tooltipStyle() {
  return {
    backgroundColor: 'rgba(10,15,30,0.95)',
    titleColor: '#f0f4ff',
    bodyColor: 'rgba(240,244,255,0.7)',
    borderColor: 'rgba(0,212,255,0.3)',
    borderWidth: 1,
    cornerRadius: 8,
    padding: 10
  };
}

/* ═══════════════════════════════════════════════════════════════
   6. KPI COUNTERS
   ═══════════════════════════════════════════════════════════════ */
function initKPICounters() {
  const revEl = document.querySelector('.kpi-value[data-target="24.8"]');
  if (revEl) {
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(revEl, 0, 24.8, 1800, (v) => `₹${v.toFixed(1)}L`);
          revObs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    revObs.observe(revEl);
  }

  // Generic int counters
  document.querySelectorAll('.kpi-counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.id ? '' : (el.textContent.includes('products') ? ' products' : '');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(el, 0, target, 1500, (v) => {
            const rounded = Math.round(v);
            return el.textContent.includes('products') ? `${rounded} products` : `${rounded}`;
          });
          obs.disconnect();
        }
      });
    }, { threshold: 0.5 });
    obs.observe(el);
  });
}

function animateCounter(el, from, to, duration, formatter) {
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = formatter(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ═══════════════════════════════════════════════════════════════
   7. AI INSIGHT PANEL CYCLING
   ═══════════════════════════════════════════════════════════════ */
function initAIInsightCycle() {
  const items = document.querySelectorAll('.ai-insight-item');
  if (!items.length) return;

  let current = 0;
  setInterval(() => {
    items[current].classList.remove('ai-insight-active');
    current = (current + 1) % items.length;
    items[current].classList.add('ai-insight-active');
  }, 4000);
}

/* ═══════════════════════════════════════════════════════════════
   8. AI COPILOT CHAT
   ═══════════════════════════════════════════════════════════════ */
const COPILOT_RESPONSES = {
  'why did revenue decrease this month?': {
    insight: 'Revenue declined <strong>14.3%</strong> this month compared to last month.',
    evidence: 'Product X was out of stock for <strong>6 days</strong>, causing ₹3.2L in lost sales. Additionally, weekend promotion ended 2 weeks early.',
    recommendation: 'Restore Product X stock immediately. Relaunch the weekend promotion. Cross-sell Product Y to affected customers.',
    action: 'Reorder Product X (350 units) + Schedule Promotion'
  },
  'which products are likely to go out of stock?': {
    insight: '<strong>3 products</strong> are projected to reach critical stock levels within 2 weeks.',
    evidence: 'Product X: 9 days left • Product B: 12 days left • Product C: 14 days left. Based on historical demand velocity and supplier lead times.',
    recommendation: 'Place emergency order for Product X today. Schedule standard reorder for B and C within 3 days. Consider alternative supplier for faster delivery.',
    action: 'Generate Reorder Purchase Orders'
  },
  'which expenses need review?': {
    insight: '<strong>5 expense claims</strong> flagged as policy violations totaling ₹42,600.',
    evidence: 'Employee A: ₹18,400 hotel (limit ₹12,000) • Employee B: ₹8,200 client meal (limit ₹5,000) • 3 more with duplicate receipts detected.',
    recommendation: 'Escalate top 2 to department heads. Request original receipts for duplicate cases. Update expense policy awareness training.',
    action: 'Send Review Requests to Managers'
  },
  'what should we reorder next week?': {
    insight: 'AI recommends <strong>4 reorder actions</strong> for next week totaling ₹8.7L.',
    evidence: 'Product X (350 units, Supplier B), Product B (200 units, Supplier A), Product D (150 units, Supplier C). Demand forecast confidence: 91%.',
    recommendation: 'Proceed with automated purchase orders. Lock Supplier B rate for Product X before price increase on Day 8.',
    action: 'Create Purchase Orders Automatically'
  },
  'which products have the highest return rate?': {
    insight: '<strong>Product Category: Footwear</strong> has the highest return rate at 18.4%.',
    evidence: 'Shoes Size M: 23% returns (sizing issue) • Electronics: 14% (compatibility) • Apparel: 9.2% (quality). Return rate correlates with product images lacking size guides.',
    recommendation: 'Add detailed size guides to footwear listings. Improve product descriptions for electronics. Consider fit guarantee program.',
    action: 'Update Product Listings + Add Size Guides'
  },
  'what price should we set for product x?': {
    insight: 'Recommended price: <strong>₹949</strong> (from current ₹999) to maximize revenue.',
    evidence: 'Price elasticity analysis shows -5% price → +12% demand volume. At ₹949: projected revenue ₹94,900/day vs current ₹89,910/day.',
    recommendation: 'Implement ₹949 for next 14 days. Monitor daily. If demand increase exceeds 15%, consider ₹969 to capture more margin.',
    action: 'Apply Price Change + Monitor Dashboard'
  }
};

function findResponse(query) {
  const lower = query.toLowerCase().trim();
  for (const [key, value] of Object.entries(COPILOT_RESPONSES)) {
    if (lower.includes(key.slice(0, 15)) || key.includes(lower.slice(0, 15))) {
      return value;
    }
  }
  // Default response
  return {
    insight: 'I\'ve analyzed your business data across all connected systems.',
    evidence: 'Found relevant patterns in sales (last 90 days), inventory levels, expense reports, and customer feedback data.',
    recommendation: 'For a more specific analysis, try asking about revenue trends, stock levels, expenses, or pricing optimization.',
    action: 'Explore More Insights'
  };
}

function sendCopilotMessage(msg) {
  const input = document.getElementById('copilotInput');
  if (input) {
    input.value = msg;
    sendCopilotQuery();
  }
}

function sendCopilotQuery() {
  const input = document.getElementById('copilotInput');
  const messages = document.getElementById('copilotMessages');
  if (!input || !messages || !input.value.trim()) return;

  const query = input.value.trim();
  input.value = '';

  // Add user message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-user-msg';
  userMsg.textContent = `"${query}"`;
  messages.appendChild(userMsg);
  messages.scrollTop = messages.scrollHeight;

  // Show typing indicator
  const typing = document.createElement('div');
  typing.className = 'typing-indicator';
  typing.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  // Simulate AI thinking delay
  setTimeout(() => {
    typing.remove();
    const response = findResponse(query);

    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-ai-msg';
    aiMsg.innerHTML = `
      <div class="chat-ai-header">
        <span class="chat-ai-icon">🧠</span>
        <span class="chat-ai-label">AXION AI Analysis</span>
      </div>
      <div class="chat-ai-body">
        <div class="chat-ai-section">
          <div class="chat-ai-section-label">💡 Insight</div>
          <div class="chat-ai-section-content">${response.insight}</div>
        </div>
        <div class="chat-ai-section">
          <div class="chat-ai-section-label">📊 Evidence</div>
          <div class="chat-ai-section-content">${response.evidence}</div>
        </div>
        <div class="chat-ai-section">
          <div class="chat-ai-section-label">✅ Recommendation</div>
          <div class="chat-ai-section-content">${response.recommendation}</div>
        </div>
        <div class="chat-ai-actions">
          <button class="chat-action-btn chat-action-primary" onclick="showActionModal('copilot')">⚡ ${response.action}</button>
          <button class="chat-action-btn chat-action-secondary">📊 Analyze Further</button>
        </div>
      </div>
    `;
    messages.appendChild(aiMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 1800);
}

// Enter key support for copilot
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('copilotInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendCopilotQuery();
      }
    });
  }
});

/* ═══════════════════════════════════════════════════════════════
   9. HOW IT WORKS STEP ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */
function initHowTimeline() {
  const steps = document.querySelectorAll('.how-step');
  let active = 0;

  const cycleSteps = () => {
    steps.forEach((s, i) => {
      s.style.borderColor = i === active ? 'var(--accent)' : '';
      s.style.background = i === active ? 'rgba(0,212,255,0.05)' : '';
    });
    active = (active + 1) % steps.length;
  };

  // Only animate when visible
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const interval = setInterval(cycleSteps, 1800);
      obs.disconnect();
      // Clean up after 30 seconds
      setTimeout(() => clearInterval(interval), 30000);
    }
  }, { threshold: 0.3 });

  const howSection = document.getElementById('howitworks');
  if (howSection) obs.observe(howSection);
}

/* ═══════════════════════════════════════════════════════════════
   10. ACTION MODAL
   ═══════════════════════════════════════════════════════════════ */
const MODAL_CONFIGS = {
  inventory: {
    icon: '📦',
    title: 'Initiating Inventory Reorder',
    body: 'AI is placing a purchase order for 350 units of Product X from Supplier B based on demand forecast analysis.',
    steps: ['Connecting to procurement system...', 'Generating purchase order #PO-2024-0847...', 'Sending to Supplier B portal...', 'Updating inventory forecast...', 'Notifying warehouse team...']
  },
  promo: {
    icon: '🎯',
    title: 'Scheduling Promotion',
    body: 'AI is creating a mid-week promotional campaign targeting customers who purchased in the last 30 days.',
    steps: ['Segmenting customer base...', 'Generating personalized offers...', 'Scheduling email campaign...', 'Setting up discount codes...', 'Activating campaign...']
  },
  expense: {
    icon: '⚠️',
    title: 'Escalating Expense Review',
    body: 'AI is sending review requests to department managers for 5 flagged expense claims.',
    steps: ['Compiling flagged claims...', 'Notifying Department A manager...', 'Notifying Finance team...', 'Creating audit trail...', 'Updating expense dashboard...']
  },
  copilot: {
    icon: '⚡',
    title: 'Executing AI Recommendation',
    body: 'AI is automating the recommended action across connected business systems.',
    steps: ['Analyzing action parameters...', 'Connecting to business systems...', 'Executing automated workflow...', 'Updating relevant records...', 'Action completed successfully!']
  }
};

window.showActionModal = function(type) {
  const config = MODAL_CONFIGS[type] || MODAL_CONFIGS.copilot;
  const modal = document.getElementById('actionModal');
  const icon = modal.querySelector('.modal-icon');
  const title = modal.querySelector('#modalTitle');
  const body = modal.querySelector('#modalBody');
  const progress = modal.querySelector('#modalProgress');
  const stepsEl = modal.querySelector('#modalSteps');

  icon.textContent = config.icon;
  title.textContent = config.title;
  body.textContent = config.body;
  progress.style.width = '0%';
  stepsEl.innerHTML = '';

  config.steps.forEach((step, i) => {
    const stepEl = document.createElement('div');
    stepEl.className = 'modal-step';
    stepEl.innerHTML = `<span class="modal-step-icon">⏳</span> ${step}`;
    stepsEl.appendChild(stepEl);
  });

  modal.classList.add('active');

  // Animate progress and steps
  requestAnimationFrame(() => {
    progress.style.width = '100%';
  });

  const stepEls = stepsEl.querySelectorAll('.modal-step');
  stepEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
      setTimeout(() => {
        el.classList.add('done');
        el.querySelector('.modal-step-icon').textContent = '✅';
      }, 300);
    }, i * 480);
  });
};

window.closeActionModal = function(e) {
  if (e.target === document.getElementById('actionModal')) closeModal();
};

window.closeModal = function() {
  document.getElementById('actionModal')?.classList.remove('active');
};

/* ═══════════════════════════════════════════════════════════════
   11. SMOOTH SCROLL NAV
   ═══════════════════════════════════════════════════════════════ */
function initSmoothScrollNav() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════════
   12. HERO FLOW NODE INTERACTION
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const flowNodes = document.querySelectorAll('.flow-node');
  flowNodes.forEach((node, i) => {
    setTimeout(() => {
      node.classList.add('active');
      setTimeout(() => {
        flowNodes.forEach(n => n.classList.remove('active'));
        node.classList.remove('active');
      }, 1200);
    }, i * 600);
  });

  // Keep first one active by default after init
  setTimeout(() => {
    flowNodes[0].classList.add('active');
  }, flowNodes.length * 600 + 200);
});

/* ═══════════════════════════════════════════════════════════════
   13. SOLUTION CARD ENHANCED HOVER
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.solution-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPct = (x / rect.width - 0.5) * 2;
      const yPct = (y / rect.height - 0.5) * 2;
      card.style.transform = `translateY(-6px) rotateX(${-yPct * 3}deg) rotateY(${xPct * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});

/* ═══════════════════════════════════════════════════════════════
   14. KEYBOARD ACCESSIBILITY
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
