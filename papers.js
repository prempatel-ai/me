/**
 * Prem Patel - Papers I Read
 * Interactive research paper tracker, timeline, filter engine, and progress tracker.
 */

(function () {
  'use strict';

  const STAGE_ORDER = [
    'Origins',
    'Deep Learning Takes Off',
    'RL and Game AI',
    'Transformer Era',
    'Modern LLMs'
  ];

  const STAGE_YEARS = {
    'Origins': '1950 - 2001',
    'Deep Learning Takes Off': '2006 - 2015',
    'RL and Game AI': '2013 - 2017',
    'Transformer Era': '2017 - 2021',
    'Modern LLMs': '2020 - 2025'
  };

  let allPapers = [];
  let currentSearch = '';
  let currentStage = 'all';
  let currentStatus = 'all';
  let currentTag = 'all';

  // Elements
  const progressTitleEl = document.getElementById('progress-title');
  const progressStatsEl = document.getElementById('progress-stats');
  const progressBarFillEl = document.getElementById('progress-bar-fill');
  const searchInputEl = document.getElementById('papers-search');
  const stageFilterEl = document.getElementById('stage-filter');
  const statusFilterEl = document.getElementById('status-filter');
  const tagFilterEl = document.getElementById('tag-filter');
  const resetBtnEl = document.getElementById('reset-filters');
  const countIndicatorEl = document.getElementById('papers-count-indicator');
  const timelineContainerEl = document.getElementById('papers-timeline-container');

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Calculate and update top progress bar
  function updateProgress() {
    if (!allPapers.length) return;
    const totalCount = allPapers.length;
    const readCount = allPapers.filter(p => p.status === 'read').length;
    const readingCount = allPapers.filter(p => p.status === 'reading').length;
    const plannedCount = allPapers.filter(p => p.status === 'planned').length;

    const percentage = Math.round((readCount / totalCount) * 100);

    if (progressTitleEl) {
      progressTitleEl.textContent = `${readCount} of ${totalCount} papers read`;
    }

    if (progressStatsEl) {
      progressStatsEl.textContent = `${readCount} read | ${readingCount} reading | ${plannedCount} planned (${percentage}%)`;
    }

    if (progressBarFillEl) {
      progressBarFillEl.style.width = `${percentage}%`;
      progressBarFillEl.setAttribute('aria-valuenow', percentage);
    }
  }

  // Populate dynamic tag dropdown
  function populateTagFilter() {
    if (!tagFilterEl) return;
    const tagSet = new Set();
    allPapers.forEach(p => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach(t => {
          if (t && t.trim()) tagSet.add(t.trim());
        });
      }
    });

    const sortedTags = Array.from(tagSet).sort((a, b) => a.localeCompare(b));
    tagFilterEl.innerHTML = '<option value="all">All Tags</option>';
    sortedTags.forEach(tag => {
      const opt = document.createElement('option');
      opt.value = tag;
      opt.textContent = tag;
      tagFilterEl.appendChild(opt);
    });
  }

  // Filter papers based on search and dropdown selections
  function getFilteredPapers() {
    const q = currentSearch.trim().toLowerCase();

    return allPapers.filter(paper => {
      // Stage filter
      if (currentStage !== 'all' && paper.stage !== currentStage) {
        return false;
      }

      // Status filter
      if (currentStatus !== 'all' && paper.status !== currentStatus) {
        return false;
      }

      // Tag filter
      if (currentTag !== 'all') {
        if (!Array.isArray(paper.tags) || !paper.tags.includes(currentTag)) {
          return false;
        }
      }

      // Search query
      if (q) {
        const titleMatch = (paper.title || '').toLowerCase().includes(q);
        const authorsMatch = (paper.authors || '').toLowerCase().includes(q);
        const yearMatch = String(paper.year || '').includes(q);
        const stageMatch = (paper.stage || '').toLowerCase().includes(q);
        const tagsMatch = Array.isArray(paper.tags) && paper.tags.some(t => t.toLowerCase().includes(q));
        const summaryMatch = (paper.summary || '').toLowerCase().includes(q);
        const keyIdeaMatch = (paper.keyIdea || '').toLowerCase().includes(q);
        const whatItChangedMatch = (paper.whatItChanged || '').toLowerCase().includes(q);
        const limitationsMatch = (paper.limitations || '').toLowerCase().includes(q);
        const takeawayMatch = (paper.myTakeaway || '').toLowerCase().includes(q);
        const termsMatch = Array.isArray(paper.keyTerms) && paper.keyTerms.some(kt =>
          (kt.term || '').toLowerCase().includes(q) || (kt.def || kt.definition || '').toLowerCase().includes(q)
        );
        const takeawaysListMatch = Array.isArray(paper.takeaways) && paper.takeaways.some(t =>
          t.toLowerCase().includes(q)
        );

        if (!titleMatch && !authorsMatch && !yearMatch && !stageMatch && !tagsMatch &&
            !summaryMatch && !keyIdeaMatch && !whatItChangedMatch && !limitationsMatch &&
            !takeawayMatch && !termsMatch && !takeawaysListMatch) {
          return false;
        }
      }

      return true;
    });
  }

  // Render paper card
  function createPaperCardHtml(paper) {
    const statusClass = `status-${paper.status || 'planned'}`;
    const statusLabel = (paper.status === 'read') ? 'Read' : (paper.status === 'reading') ? 'Reading' : 'Planned';
    const isPlanned = paper.status === 'planned';

    // Check if paper has any user-filled content
    const hasSummary = Boolean(paper.summary && paper.summary.trim());
    const hasKeyIdea = Boolean(paper.keyIdea && paper.keyIdea.trim());
    const hasWhatItChanged = Boolean(paper.whatItChanged && paper.whatItChanged.trim());
    const hasLimitations = Boolean(paper.limitations && paper.limitations.trim());
    const hasTakeaway = Boolean(paper.myTakeaway && paper.myTakeaway.trim());
    const hasKeyTerms = Array.isArray(paper.keyTerms) && paper.keyTerms.length > 0;
    const hasTakeawaysList = Array.isArray(paper.takeaways) && paper.takeaways.length > 0;
    const hasPaperUrl = Boolean(paper.paperUrl && paper.paperUrl.trim());
    const hasBlogUrl = Boolean(paper.blogUrl && paper.blogUrl.trim());
    const hasCodeUrl = Boolean(paper.codeUrl && paper.codeUrl.trim());
    const hasDateRead = Boolean(paper.dateRead && paper.dateRead.trim());

    // Build tags markup
    let tagsHtml = '';
    if (Array.isArray(paper.tags) && paper.tags.length > 0) {
      tagsHtml = `
        <div class="paper-tags">
          ${paper.tags.map(t => `<span class="paper-tag">${escapeHtml(t)}</span>`).join('')}
        </div>
      `;
    }

    // Check if paper has rich multi-section content for tabs
    const hasTabs = (hasSummary || hasKeyIdea) && (hasKeyTerms || hasTakeawaysList);

    let detailsContentHtml = '';

    // Reading status banner (compact)
    if (paper.status === 'reading') {
      detailsContentHtml += `
        <div class="paper-reading-banner">
          <span class="paper-reading-dot"></span>
          <span><strong>Reading in progress:</strong> Logging foundational terms, architecture notes, and takeaways.</span>
        </div>
      `;
    }

    if (hasTabs) {
      const termsCount = hasKeyTerms ? paper.keyTerms.length : 0;
      const takeawaysCount = (hasTakeawaysList ? paper.takeaways.length : 0) + (hasTakeaway ? 1 : 0);

      const navTabsHtml = `
        <div class="paper-nav-tabs" role="tablist">
          <button type="button" class="paper-tab-btn active" data-tab="overview">
            Overview
          </button>
          ${hasKeyTerms ? `
            <button type="button" class="paper-tab-btn" data-tab="terms">
              Key Terms <span class="tab-count">${termsCount}</span>
            </button>
          ` : ''}
          ${(hasTakeawaysList || hasTakeaway) ? `
            <button type="button" class="paper-tab-btn" data-tab="takeaways">
              Takeaways <span class="tab-count">${takeawaysCount}</span>
            </button>
          ` : ''}
          <button type="button" class="paper-tab-btn" data-tab="all">
            All
          </button>
        </div>
      `;

      // Panel 1: Overview in a responsive 2-column grid
      const overviewPanelHtml = `
        <div class="paper-tab-panel" data-panel="overview" style="display: block;">
          <div class="paper-overview-grid">
            <div class="paper-overview-col">
              ${hasSummary ? `
                <div class="paper-field">
                  <span class="paper-field-label">Problem Solved</span>
                  <p>${escapeHtml(paper.summary)}</p>
                </div>
              ` : ''}
              ${hasWhatItChanged ? `
                <div class="paper-field">
                  <span class="paper-field-label">What It Changed</span>
                  <p>${escapeHtml(paper.whatItChanged)}</p>
                </div>
              ` : ''}
            </div>
            <div class="paper-overview-col">
              ${hasKeyIdea ? `
                <div class="paper-field">
                  <span class="paper-field-label">Key Idea</span>
                  <p>${escapeHtml(paper.keyIdea)}</p>
                </div>
              ` : ''}
              ${hasLimitations ? `
                <div class="paper-field">
                  <span class="paper-field-label">Limitations</span>
                  <p>${escapeHtml(paper.limitations)}</p>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      // Panel 2: Key Terms in a responsive 2-column grid
      let termsPanelHtml = '';
      if (hasKeyTerms) {
        termsPanelHtml = `
          <div class="paper-tab-panel" data-panel="terms" style="display: none;">
            <div class="paper-terms-grid">
              ${paper.keyTerms.map(t => `
                <div class="paper-term-card">
                  <div class="paper-term-title">${escapeHtml(t.term)}</div>
                  <div class="paper-term-def">${escapeHtml(t.def || t.definition || '')}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      // Panel 3: Key Takeaways as styled cards
      let takeawaysPanelHtml = '';
      if (hasTakeawaysList || hasTakeaway) {
        takeawaysPanelHtml = `
          <div class="paper-tab-panel" data-panel="takeaways" style="display: none;">
            ${hasTakeaway ? `
              <div class="paper-field" style="margin-bottom: 0.75rem;">
                <span class="paper-field-label">My Takeaway</span>
                <p>${escapeHtml(paper.myTakeaway)}</p>
              </div>
            ` : ''}
            ${hasTakeawaysList ? `
              <div class="paper-takeaways-cards">
                ${paper.takeaways.map(t => `
                  <div class="paper-takeaway-item">${escapeHtml(t)}</div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `;
      }

      detailsContentHtml += navTabsHtml + overviewPanelHtml + termsPanelHtml + takeawaysPanelHtml;
    } else {
      if (hasSummary) {
        detailsContentHtml += `
          <div class="paper-field">
            <span class="paper-field-label">Problem Solved</span>
            <p>${escapeHtml(paper.summary)}</p>
          </div>
        `;
      }
      if (hasKeyIdea) {
        detailsContentHtml += `
          <div class="paper-field">
            <span class="paper-field-label">Key Idea</span>
            <p>${escapeHtml(paper.keyIdea)}</p>
          </div>
        `;
      }
      if (hasWhatItChanged) {
        detailsContentHtml += `
          <div class="paper-field">
            <span class="paper-field-label">What It Changed</span>
            <p>${escapeHtml(paper.whatItChanged)}</p>
          </div>
        `;
      }
      if (hasLimitations) {
        detailsContentHtml += `
          <div class="paper-field">
            <span class="paper-field-label">Limitations</span>
            <p>${escapeHtml(paper.limitations)}</p>
          </div>
        `;
      }
      if (hasTakeaway) {
        detailsContentHtml += `
          <div class="paper-field">
            <span class="paper-field-label">My Takeaway</span>
            <p>${escapeHtml(paper.myTakeaway)}</p>
          </div>
        `;
      }
    }

    // Links row & collapse button
    detailsContentHtml += '<div class="paper-links">';
    if (hasBlogUrl) {
      detailsContentHtml += `
        <a href="${escapeHtml(paper.blogUrl)}" class="action-link" onclick="event.stopPropagation()">
          Read My Essay &nearr;
        </a>
      `;
    }
    if (hasPaperUrl) {
      detailsContentHtml += `
        <a href="${escapeHtml(paper.paperUrl)}" target="_blank" rel="noopener noreferrer" class="action-link" onclick="event.stopPropagation()">
          Read Original Paper &nearr;
        </a>
      `;
    }
    if (hasCodeUrl) {
      detailsContentHtml += `
        <a href="${escapeHtml(paper.codeUrl)}" target="_blank" rel="noopener noreferrer" class="action-link" onclick="event.stopPropagation()">
          My Code Implementation &nearr;
        </a>
      `;
    }
    detailsContentHtml += `
      <button type="button" class="paper-collapse-btn" title="Collapse paper details">
        Collapse &uarr;
      </button>
    `;
    detailsContentHtml += '</div>';

    // If completely empty (e.g. planned paper without notes yet)
    if (!detailsContentHtml) {
      detailsContentHtml = '<p class="paper-empty-planned-note">Reading notes will appear here once reviewed.</p>';
    }

    const isExpanded = paper.status === 'reading';
    const expandedClass = isExpanded ? ' is-expanded' : '';
    const ariaExpanded = isExpanded ? 'true' : 'false';
    const expandLabel = isExpanded ? 'Click to collapse' : 'Click to expand';

    return `
      <div class="timeline-entry paper-timeline-entry">
        <div class="timeline-node"></div>
        <article class="paper-card ${statusClass}${expandedClass}"
                 data-id="${escapeHtml(paper.id)}"
                 tabindex="0"
                 role="button"
                 aria-expanded="${ariaExpanded}"
                 aria-label="${escapeHtml(paper.title)}, ${paper.year}">
          <div class="paper-card-top">
            <h4 class="paper-card-title">${escapeHtml(paper.title)}</h4>
            <div class="paper-card-top-actions">
              ${hasPaperUrl ? `
                <a href="${escapeHtml(paper.paperUrl)}" target="_blank" rel="noopener noreferrer" class="action-link paper-quick-link" onclick="event.stopPropagation()" title="Read original paper">
                  Read Paper &nearr;
                </a>
              ` : ''}
              <span class="paper-status-badge ${escapeHtml(paper.status || 'planned')}">${statusLabel}</span>
            </div>
          </div>

          <div class="paper-card-meta">
            ${paper.authors ? `<span>${escapeHtml(paper.authors)}</span>` : ''}
            <span>&middot;</span>
            <span><strong>${escapeHtml(String(paper.year))}</strong></span>
            ${hasDateRead ? `<span>&middot;</span><span>Read on ${escapeHtml(paper.dateRead)}</span>` : ''}
          </div>

          ${tagsHtml}

          <div class="paper-expand-hint">
            <span class="paper-expand-label">${expandLabel}</span>
            <span class="paper-chevron" aria-hidden="true">&#9660;</span>
          </div>

          <div class="paper-details">
            ${detailsContentHtml}
          </div>
        </article>
      </div>
    `;
  }

  // Render grouped timeline
  function renderTimeline() {
    if (!timelineContainerEl) return;

    const filtered = getFilteredPapers();

    // Update count indicator
    if (countIndicatorEl) {
      countIndicatorEl.textContent = `Showing ${filtered.length} of ${allPapers.length} papers`;
    }

    if (filtered.length === 0) {
      timelineContainerEl.innerHTML = `
        <div class="paper-empty-state">
          <p>No papers match your search and filter criteria.</p>
          <button id="empty-reset-btn" class="papers-reset-btn" style="margin-top: 1rem;">Reset Filters</button>
        </div>
      `;
      const emptyResetBtn = document.getElementById('empty-reset-btn');
      if (emptyResetBtn) {
        emptyResetBtn.addEventListener('click', resetFilters);
      }
      return;
    }

    // Group papers by stage
    const grouped = {};
    STAGE_ORDER.forEach(stage => {
      grouped[stage] = [];
    });

    filtered.forEach(paper => {
      const stage = paper.stage || 'Origins';
      if (!grouped[stage]) grouped[stage] = [];
      grouped[stage].push(paper);
    });

    let html = '';

    STAGE_ORDER.forEach(stage => {
      const papersInStage = grouped[stage];
      if (!papersInStage || papersInStage.length === 0) return;

      // Sort papers within stage by year ascending
      papersInStage.sort((a, b) => (Number(a.year) || 0) - (Number(b.year) || 0));

      const yearsRange = STAGE_YEARS[stage] || '';

      html += `
        <section class="stage-group">
          <div class="stage-header">
            <h3 class="stage-title">
              ${escapeHtml(stage)}
              <span class="badge">${papersInStage.length}</span>
            </h3>
            ${yearsRange ? `<span class="stage-years">${escapeHtml(yearsRange)}</span>` : ''}
          </div>

          <div class="timeline papers-timeline">
            ${papersInStage.map(p => createPaperCardHtml(p)).join('')}
          </div>
        </section>
      `;
    });

    timelineContainerEl.innerHTML = html;

    // Attach card expansion listeners and tab switchers
    attachCardListeners();
    attachTabListeners();

    // Check for deep links or URL parameters (e.g. ?paper=turing-1950 or ?tab=terms)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const expandId = urlParams.get('paper');
      if (expandId) {
        const card = timelineContainerEl.querySelector(`.paper-card[data-id="${expandId}"]`);
        if (card && !card.classList.contains('is-expanded')) {
          toggleCard(card);
        }
      }
      const activeTab = urlParams.get('tab');
      if (activeTab) {
        timelineContainerEl.querySelectorAll(`.paper-tab-btn[data-tab="${activeTab}"]`).forEach(btn => {
          btn.click();
        });
      }
    } catch (_) {}
  }

  function toggleCard(card) {
    const isExpanded = card.classList.contains('is-expanded');
    card.classList.toggle('is-expanded');
    card.setAttribute('aria-expanded', !isExpanded);
    const label = card.querySelector('.paper-expand-label');
    if (label) {
      label.textContent = !isExpanded ? 'Click to collapse' : 'Click to expand';
    }
  }

  function attachTabListeners() {
    const tabBtns = timelineContainerEl.querySelectorAll('.paper-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetTab = btn.getAttribute('data-tab');
        const detailsEl = btn.closest('.paper-details');
        if (!detailsEl) return;

        detailsEl.querySelectorAll('.paper-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        detailsEl.querySelectorAll('.paper-tab-panel').forEach(panel => {
          if (targetTab === 'all' || panel.getAttribute('data-panel') === targetTab) {
            panel.style.display = 'block';
          } else {
            panel.style.display = 'none';
          }
        });
      });
    });
  }

  function attachCardListeners() {
    const cards = timelineContainerEl.querySelectorAll('.paper-card');
    cards.forEach(card => {
      // Click toggle
      card.addEventListener('click', (e) => {
        // If clicking on an explicit collapse button, collapse the card
        if (e.target.closest('.paper-collapse-btn')) {
          e.stopPropagation();
          toggleCard(card);
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          return;
        }

        // Prevent toggle if clicking on an interactive link, button, or input
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return;

        // If card is already expanded and user taps or clicks inside .paper-details (terms, definitions, takeaways, selecting text), DO NOT collapse
        if (card.classList.contains('is-expanded') && e.target.closest('.paper-details')) {
          return;
        }

        toggleCard(card);
      });

      // Keyboard accessibility (Enter or Space)
      card.addEventListener('keydown', (e) => {
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('input')) return;
        if (card.classList.contains('is-expanded') && e.target.closest('.paper-details')) {
          return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleCard(card);
        }
      });
    });
  }

  function resetFilters() {
    currentSearch = '';
    currentStage = 'all';
    currentStatus = 'all';
    currentTag = 'all';

    if (searchInputEl) searchInputEl.value = '';
    if (stageFilterEl) stageFilterEl.value = 'all';
    if (statusFilterEl) statusFilterEl.value = 'all';
    if (tagFilterEl) tagFilterEl.value = 'all';

    renderTimeline();
  }

  // Initialize event handlers
  function initEvents() {
    if (searchInputEl) {
      searchInputEl.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderTimeline();
      });
    }

    if (stageFilterEl) {
      stageFilterEl.addEventListener('change', (e) => {
        currentStage = e.target.value;
        renderTimeline();
      });
    }

    if (statusFilterEl) {
      statusFilterEl.addEventListener('change', (e) => {
        currentStatus = e.target.value;
        renderTimeline();
      });
    }

    if (tagFilterEl) {
      tagFilterEl.addEventListener('change', (e) => {
        currentTag = e.target.value;
        renderTimeline();
      });
    }

    if (resetBtnEl) {
      resetBtnEl.addEventListener('click', resetFilters);
    }
  }

  // Load papers from papers.json
  async function init() {
    try {
      const response = await fetch('./papers.json');
      if (!response.ok) {
        throw new Error(`Failed to load papers.json: ${response.status}`);
      }
      allPapers = await response.json();
    } catch (err) {
      console.warn('Could not fetch papers.json via HTTP fetch:', err);
      // Fallback if window.PAPERS_DATA was defined
      if (window.PAPERS_DATA && Array.isArray(window.PAPERS_DATA)) {
        allPapers = window.PAPERS_DATA;
      } else {
        if (timelineContainerEl) {
          timelineContainerEl.innerHTML = `
            <div class="paper-empty-state">
              <p>Unable to load papers data. If viewing locally via file://, run a local web server (for example: npx serve or python -m http.server).</p>
            </div>
          `;
        }
        return;
      }
    }

    updateProgress();
    populateTagFilter();
    initEvents();
    renderTimeline();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
