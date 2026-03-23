// ============================================================
// RENDER FUNCTIONS
// ============================================================

function renderItem(item) {
  const hasLink = item.link !== null;
  const isDoc = hasLink && item.link.type === 'doc';
  const isExt = hasLink && item.link.type === 'ext';

  let linkHtml = '';
  if (isDoc) {
    linkHtml = `<a class="item-link" href="#" onclick="goToDoc('${item.link.docId}');return false;">${item.text}</a><span class="link-badge">${item.link.badge}</span>`;
  } else if (isExt) {
    linkHtml = `<a class="item-link ext" href="${item.link.url}" target="_blank">${item.text}</a><span class="link-badge ext-badge">${item.link.badge}</span>`;
  } else {
    linkHtml = item.text;
  }

  const detailHtml = item.detail ? `<span class="detail">${item.detail}</span>` : '';

  return `
    <li>
      <input type="checkbox" onchange="saveProgress()">
      <span class="item-text">${linkHtml}${detailHtml}</span>
    </li>`;
}

function buildPhases() {
  const colorMap = {
    green: { bg: 'var(--green-bg)', text: 'var(--green)' },
    yellow: { bg: 'var(--yellow-bg)', text: 'var(--yellow)' },
    blue: { bg: 'var(--blue-bg)', text: 'var(--blue)' },
    orange: { bg: 'var(--orange-bg)', text: 'var(--orange)' }
  };

  const container = document.getElementById('phases-container');
  container.innerHTML = ROADMAP_DATA.phases.map((phase, i) => {
    const color = colorMap[phase.color];
    const isFirst = i === 0;
    const sectionsHtml = phase.sections.map(section => `
      <div class="section">
        <h3>${section.title}</h3>
        <ul class="checklist">
          ${section.items.map(renderItem).join('')}
        </ul>
      </div>`).join('');

    return `
      <div class="phase${isFirst ? ' active' : ''}" id="${phase.id}">
        <div class="phase-header">
          <div class="phase-badge" style="background:${color.bg};color:${color.text};">${phase.badge}</div>
          <div class="phase-info">
            <h2>${phase.title}</h2>
            <div class="duration">${phase.duration}</div>
          </div>
        </div>
        <div class="tip"><div class="tip-title">Dica do Mentor</div>${phase.tip}</div>
        ${sectionsHtml}
      </div>`;
  }).join('');
}

function buildDocs() {
  const docsEl = document.getElementById('docs');

  const headerHtml = `
    <div class="phase-header">
      <div class="phase-badge" style="background:var(--purple-bg);color:var(--purple);">D</div>
      <div class="phase-info">
        <h2>Documentacao Resumida</h2>
        <div class="duration">Docs 1-11: Documentacao oficial Anthropic &bull; Docs 12-23: System prompts vazados (&#9733; Leaked)</div>
      </div>
    </div>
    <div class="tip"><div class="tip-title">Como usar esta secao</div>Docs 1-11: resumos da documentacao oficial Anthropic. Docs 12-23 (&#9733; Leaked): conteudo extraido dos system prompts reais do Claude, validados e com 34.7k stars no GitHub. Clique para expandir. Estude um bloco por dia e pratique.</div>`;

  const docsHtml = ROADMAP_DATA.docs.map(doc => {
    const tagClass = doc.isLeaked ? 'tag-leaked' : 'tag-key';
    const tagLabel = doc.isLeaked ? '&#9733; Leaked' : doc.tag;

    const leakedBanner = doc.isLeaked ? `
      <div class="leaked-banner">
        <span class="lb-icon">&#9733;</span>
        <span class="lb-text">Conteudo <strong>extraido de system prompts reais</strong> do Claude — validado pela comunidade.</span>
      </div>` : '';

    const keyPointsHtml = (doc.keyPoints || []).map(kp => {
      const style = kp.highlight === 'yellow' ? ' style="border-left-color:var(--yellow);"' : '';
      const subHtml = kp.sub ? `<span class="sub">${kp.sub}</span>` : '';
      return `<div class="key-point"${style}><strong>${kp.text}</strong>${subHtml}</div>`;
    }).join('');

    const examplesHtml = (doc.examples || []).map(ex => {
      const labelClass = ex.label === 'bad' ? 'bad-label' : ex.label === 'good' ? 'good-label' : 'example-label';
      const captionHtml = ex.caption ? `<span class="${labelClass}">${ex.caption}</span>` : '';
      return `${captionHtml}<div class="example-box">${ex.code}</div>`;
    }).join('');

    const listHtml = (doc.listItems || []).length > 0
      ? `<ul>${(doc.listItems || []).map(li => `<li>${li}</li>`).join('')}</ul>`
      : '';

    const linkHtml = doc.link
      ? `<a href="${doc.link.url}" target="_blank" class="link-out">${doc.link.text} &rarr;</a>`
      : '';

    return `
      <div class="doc-block" id="${doc.id}">
        <div class="doc-header" onclick="toggleDoc(this)">
          <h3>${doc.title} <span class="tag ${tagClass} doc-tag">${tagLabel}</span></h3>
          <span class="arrow">&#9660;</span>
        </div>
        <div class="doc-body">
          ${leakedBanner}
          ${keyPointsHtml}
          ${examplesHtml}
          ${listHtml}
          ${linkHtml}
        </div>
      </div>`;
  }).join('');

  docsEl.innerHTML = headerHtml + docsHtml;
}

function buildResources() {
  const el = document.getElementById('resources');

  const headerHtml = `
    <div class="phase-header">
      <div class="phase-badge" style="background:var(--blue-bg);color:var(--blue);">R</div>
      <div class="phase-info"><h2>Recursos &amp; Cursos</h2><div class="duration">Material curado para cada fase</div></div>
    </div>`;

  const sections = {};
  ROADMAP_DATA.resources.forEach(r => {
    if (!sections[r.section]) sections[r.section] = [];
    sections[r.section].push(r);
  });

  const tagLabels = {
    free: 'Interativo', docs: 'Docs', course: 'Curso', tool: 'Tool',
    book: 'Blog', community: 'Comunidade'
  };

  const sectionsHtml = Object.entries(sections).map(([title, items]) => `
    <div class="section">
      <h3>${title}</h3>
      <div class="resources-grid">
        ${items.map(r => `
          <a href="${r.url}" target="_blank" class="resource-card">
            <span class="tag tag-${r.tag}">${tagLabels[r.tag] || r.tag}</span>
            <div class="title">${r.title}</div>
            <div class="desc">${r.desc}</div>
          </a>`).join('')}
      </div>
    </div>`).join('');

  el.innerHTML = headerHtml + sectionsHtml;
}

function buildGlossary() {
  const el = document.getElementById('glossary');

  const headerHtml = `
    <div class="phase-header">
      <div class="phase-badge" style="background:var(--red-bg);color:var(--red);">G</div>
      <div class="phase-info"><h2>Glossario de Termos</h2><div class="duration">Referencia rapida</div></div>
    </div>`;

  const gridHtml = `
    <div class="section">
      <div class="concept-grid">
        ${ROADMAP_DATA.glossary.map(g => `
          <div class="concept">
            <div class="term">${g.term}</div>
            <div class="def">${g.def}</div>
          </div>`).join('')}
      </div>
    </div>`;

  el.innerHTML = headerHtml + gridHtml;
}


// ============================================================
// MINIGAMES (inline per phase)
// ============================================================
const GAME_STORAGE = 'ai-roadmap-game-scores';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPhaseReviews() {
  const review = ROADMAP_DATA.phaseReview;
  if (!review) return;
  const scores = JSON.parse(localStorage.getItem(GAME_STORAGE) || '{}');

  Object.keys(review).forEach(phaseId => {
    const phase = review[phaseId];
    const el = document.getElementById(phaseId);
    if (!el) return;

    const section = document.createElement('div');
    section.className = 'section review-section';
    section.innerHTML = `
      <h3 style="display:flex;align-items:center;gap:0.5rem;">\uD83C\uDFAE ${phase.title}</h3>
      <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:1rem;">Teste o que aprendeu nesta fase com exercicios interativos.</p>
      <div class="minigame-grid" id="mg-grid-${phaseId}">
        ${phase.games.map(g => {
          const best = scores[g.id] != null ? scores[g.id] + '%' : 'Nao jogado';
          return `<div class="minigame-card" onclick="startPhaseGame('${phaseId}','${g.id}')">
            <div class="mg-icon">${g.icon}</div>
            <div class="mg-title">${g.title}</div>
            <div class="mg-score">Melhor: ${best}</div>
          </div>`;
        }).join('')}
      </div>
      <div id="mg-area-${phaseId}"></div>`;
    el.appendChild(section);
  });
}

function startPhaseGame(phaseId, gameId) {
  const review = ROADMAP_DATA.phaseReview[phaseId];
  const game = review.games.find(g => g.id === gameId);
  if (!game) return;
  const grid = document.getElementById('mg-grid-' + phaseId);
  const area = document.getElementById('mg-area-' + phaseId);
  grid.style.display = 'none';

  if (game.type === 'quiz') runQuiz(game, area, phaseId);
  else if (game.type === 'prompt-fix') runPromptFix(game, area, phaseId);
  else if (game.type === 'token-estimate') runTokenEstimate(game, area, phaseId);
  else if (game.type === 'scenarios') runScenarios(game, area, phaseId);
}

function exitPhaseGame(phaseId) {
  document.getElementById('mg-grid-' + phaseId).style.display = '';
  document.getElementById('mg-area-' + phaseId).innerHTML = '';
  // Refresh scores on cards
  const scores = JSON.parse(localStorage.getItem(GAME_STORAGE) || '{}');
  document.querySelectorAll('#mg-grid-' + phaseId + ' .mg-score').forEach(el => {
    const card = el.closest('.minigame-card');
    const gameId = card.getAttribute('onclick').match(/'([^']+)'\)$/)[1];
    el.textContent = 'Melhor: ' + (scores[gameId] != null ? scores[gameId] + '%' : 'Nao jogado');
  });
}

function saveGameScore(gameId, score, total) {
  const pct = Math.round((score / total) * 100);
  const scores = JSON.parse(localStorage.getItem(GAME_STORAGE) || '{}');
  if (!scores[gameId] || pct > scores[gameId]) {
    scores[gameId] = pct;
    localStorage.setItem(GAME_STORAGE, JSON.stringify(scores));
  }
  return pct;
}

function showGameResult(gameId, score, total, area, phaseId) {
  const pct = saveGameScore(gameId, score, total);
  const emoji = pct === 100 ? '\uD83C\uDF1F' : pct >= 70 ? '\uD83D\uDCAA' : '\uD83D\uDCDA';
  const msg = pct === 100 ? 'Perfeito! Voce dominou esta fase.' : pct >= 70 ? 'Otimo resultado! Revise os pontos que errou.' : 'Continue estudando e tente novamente!';
  area.innerHTML = `
    <div class="mg-result">
      <div style="font-size:2rem;margin-bottom:0.5rem;">${emoji}</div>
      <div class="mg-score-big">${pct}%</div>
      <div class="mg-score-label">${score} de ${total} corretas</div>
      <div style="color:var(--text-muted);font-size:0.85rem;margin-top:0.5rem;">${msg}</div>
      <br>
      <button class="mg-back-btn" onclick="exitPhaseGame('${phaseId}')">Voltar</button>
    </div>`;
}

// Quiz engine
function runQuiz(game, area, phaseId) {
  const items = shuffle(game.questions);
  let current = 0, score = 0;

  function render() {
    if (current >= items.length) { showGameResult(game.id, score, items.length, area, phaseId); return; }
    const item = items[current];
    area.innerHTML = `
      <div class="mg-question-box">
        <div class="mg-progress-text">Pergunta ${current + 1} de ${items.length}</div>
        <div class="progress-bar" style="margin-bottom:1rem;"><div class="fill" style="width:${(current/items.length)*100}%"></div></div>
        <h3>${item.q}</h3>
        ${item.options.map((opt, i) => `<button class="mg-option" data-idx="${i}">${opt}</button>`).join('')}
        <div class="mg-explanation" id="mg-expl-${phaseId}">${item.explanation}</div>
        <button class="mg-next-btn" id="mg-next-${phaseId}">${current < items.length - 1 ? 'Proxima \u2192' : 'Ver resultado'}</button>
      </div>`;
    area.querySelectorAll('.mg-option').forEach(btn => {
      btn.addEventListener('click', function() {
        const chosen = parseInt(this.dataset.idx);
        area.querySelectorAll('.mg-option').forEach(o => o.disabled = true);
        area.querySelectorAll('.mg-option')[item.correct].classList.add('correct');
        if (chosen !== item.correct) this.classList.add('wrong');
        else score++;
        document.getElementById('mg-expl-' + phaseId).classList.add('visible');
        document.getElementById('mg-next-' + phaseId).classList.add('visible');
      });
    });
    document.getElementById('mg-next-' + phaseId).addEventListener('click', function() { current++; render(); });
  }
  render();
}

// Scenarios engine (same as quiz but with scenario text)
function runScenarios(game, area, phaseId) {
  const items = shuffle(game.scenarios);
  let current = 0, score = 0;

  function render() {
    if (current >= items.length) { showGameResult(game.id, score, items.length, area, phaseId); return; }
    const item = items[current];
    area.innerHTML = `
      <div class="mg-question-box">
        <div class="mg-progress-text">Cenario ${current + 1} de ${items.length}</div>
        <div class="progress-bar" style="margin-bottom:1rem;"><div class="fill" style="width:${(current/items.length)*100}%"></div></div>
        <h3>${item.scenario}</h3>
        ${item.options.map((opt, i) => `<button class="mg-option" data-idx="${i}">${opt}</button>`).join('')}
        <div class="mg-explanation" id="mg-expl-${phaseId}">${item.explanation}</div>
        <button class="mg-next-btn" id="mg-next-${phaseId}">${current < items.length - 1 ? 'Proxima \u2192' : 'Ver resultado'}</button>
      </div>`;
    area.querySelectorAll('.mg-option').forEach(btn => {
      btn.addEventListener('click', function() {
        const chosen = parseInt(this.dataset.idx);
        area.querySelectorAll('.mg-option').forEach(o => o.disabled = true);
        area.querySelectorAll('.mg-option')[item.correct].classList.add('correct');
        if (chosen !== item.correct) this.classList.add('wrong');
        else score++;
        document.getElementById('mg-expl-' + phaseId).classList.add('visible');
        document.getElementById('mg-next-' + phaseId).classList.add('visible');
      });
    });
    document.getElementById('mg-next-' + phaseId).addEventListener('click', function() { current++; render(); });
  }
  render();
}

// Prompt Fix engine
function runPromptFix(game, area, phaseId) {
  const items = shuffle(game.challenges);
  let current = 0, score = 0;

  function render() {
    if (current >= items.length) { showGameResult(game.id, score, items.length, area, phaseId); return; }
    const item = items[current];
    const shuffledOpts = shuffle(item.options.map((opt, i) => ({ opt, origIdx: i })));
    area.innerHTML = `
      <div class="mg-question-box">
        <div class="mg-progress-text">Desafio ${current + 1} de ${items.length}</div>
        <div class="progress-bar" style="margin-bottom:1rem;"><div class="fill" style="width:${(current/items.length)*100}%"></div></div>
        <div class="mg-bad-label">Prompt com problema:</div>
        <div class="mg-bad-prompt">${item.bad}</div>
        <h3>Qual e a melhor versao corrigida?</h3>
        ${shuffledOpts.map(o => `<button class="mg-option" data-orig="${o.origIdx}" style="white-space:pre-wrap;font-size:0.82rem;">${o.opt}</button>`).join('')}
        <div class="mg-explanation" id="mg-expl-${phaseId}">${item.principle}</div>
        <button class="mg-next-btn" id="mg-next-${phaseId}">${current < items.length - 1 ? 'Proxima \u2192' : 'Ver resultado'}</button>
      </div>`;
    area.querySelectorAll('.mg-option').forEach(btn => {
      btn.addEventListener('click', function() {
        const chosen = parseInt(this.dataset.orig);
        area.querySelectorAll('.mg-option').forEach(o => {
          o.disabled = true;
          if (parseInt(o.dataset.orig) === item.correct) o.classList.add('correct');
        });
        if (chosen !== item.correct) this.classList.add('wrong');
        else score++;
        document.getElementById('mg-expl-' + phaseId).classList.add('visible');
        document.getElementById('mg-next-' + phaseId).classList.add('visible');
      });
    });
    document.getElementById('mg-next-' + phaseId).addEventListener('click', function() { current++; render(); });
  }
  render();
}

// Token Estimate engine
function runTokenEstimate(game, area, phaseId) {
  const items = shuffle(game.snippets);
  let current = 0, score = 0;

  function render() {
    if (current >= items.length) { showGameResult(game.id, score, items.length, area, phaseId); return; }
    const item = items[current];
    area.innerHTML = `
      <div class="mg-question-box">
        <div class="mg-progress-text">Texto ${current + 1} de ${items.length}</div>
        <div class="progress-bar" style="margin-bottom:1rem;"><div class="fill" style="width:${(current/items.length)*100}%"></div></div>
        <h3>Quantos tokens este texto consome?</h3>
        <div class="mg-token-text">${item.text}</div>
        <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
          <input type="number" class="mg-token-input" id="mg-guess-${phaseId}" min="1" max="999" placeholder="?">
          <button class="mg-submit-btn" id="mg-submit-${phaseId}">Verificar</button>
          <span id="mg-feedback-${phaseId}" style="font-size:0.85rem;font-weight:600;"></span>
        </div>
        <div class="mg-explanation" id="mg-expl-${phaseId}"></div>
        <button class="mg-next-btn" id="mg-next-${phaseId}">${current < items.length - 1 ? 'Proxima \u2192' : 'Ver resultado'}</button>
      </div>`;
    const guessEl = document.getElementById('mg-guess-' + phaseId);
    guessEl.focus();
    guessEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') document.getElementById('mg-submit-' + phaseId).click();
    });
    document.getElementById('mg-submit-' + phaseId).addEventListener('click', function() {
      const guess = parseInt(guessEl.value);
      if (isNaN(guess) || guess < 1) return;
      this.disabled = true;
      guessEl.disabled = true;
      const diff = Math.abs(guess - item.tokens) / item.tokens;
      const fb = document.getElementById('mg-feedback-' + phaseId);
      if (diff <= 0.2) {
        score++;
        fb.textContent = '\u2705 Acertou! Resposta: ' + item.tokens + ' tokens';
        fb.style.color = 'var(--green)';
      } else if (diff <= 0.5) {
        score += 0.5;
        fb.textContent = '\u223C Quase! Resposta: ' + item.tokens + ' tokens';
        fb.style.color = 'var(--yellow)';
      } else {
        fb.textContent = '\u274C Resposta: ' + item.tokens + ' tokens (voce chutou ' + guess + ')';
        fb.style.color = 'var(--red)';
      }
      const tip = guess < item.tokens ? 'Dica: ~4 chars/token em ingles, ~2-3 em portugues. Pontuacao e espacos tambem contam.' : 'Dica: subpalavras comuns (pre, ing, tion) costumam ser 1 token.';
      document.getElementById('mg-expl-' + phaseId).textContent = tip;
      document.getElementById('mg-expl-' + phaseId).classList.add('visible');
      document.getElementById('mg-next-' + phaseId).classList.add('visible');
    });
    document.getElementById('mg-next-' + phaseId).addEventListener('click', function() { current++; render(); });
  }
  render();
}

function buildFaq() {
  const container = document.getElementById('faq');

  const headerHtml = `
    <div class="phase-header">
      <div class="phase-badge" style="background:var(--accent-glow);color:var(--accent);">?</div>
      <div class="phase-info">
        <h2>FAQ — Perguntas Frequentes</h2>
        <div class="duration">Referencia rapida sobre Claude, skills, plugins e boas praticas</div>
      </div>
    </div>
    <div class="section" style="padding-bottom:0;">
      <input type="text" class="faq-search" placeholder="Buscar pergunta ou resposta..." oninput="filterFaq(this.value)">
    </div>`;

  const groupsHtml = ROADMAP_DATA.faq.map(group => {
    const itemsHtml = group.items.map(item => {
      const linkHtml = item.link
        ? item.link.type === 'doc'
          ? `<a class="link-out" href="#" onclick="goToDoc('${item.link.docId}');return false;">${item.link.text} &rarr;</a>`
          : `<a class="link-out" href="${item.link.url}" target="_blank">${item.link.text} &rarr;</a>`
        : '';

      return `
        <div class="doc-block">
          <div class="doc-header" onclick="toggleDoc(this)">
            <h3>${item.q}</h3>
            <span class="arrow">&#9660;</span>
          </div>
          <div class="doc-body">
            <p>${item.a}</p>
            ${linkHtml}
          </div>
        </div>`;
    }).join('');

    return `
      <div class="section">
        <h3>${group.group}</h3>
        ${itemsHtml}
      </div>`;
  }).join('');

  container.innerHTML = headerHtml + groupsHtml;
}

function filterFaq(query) {
  const term = query.trim().toLowerCase();
  const sections = document.querySelectorAll('#faq .section');
  sections.forEach(section => {
    if (!section.querySelector('.doc-block')) return; // skip search bar section
    let anyVisible = false;
    section.querySelectorAll('.doc-block').forEach(block => {
      const text = block.textContent.toLowerCase();
      const visible = !term || text.includes(term);
      block.style.display = visible ? '' : 'none';
      if (visible) anyVisible = true;
    });
    section.style.display = anyVisible ? '' : 'none';
  });
}

// ============================================================
// INTERACTIVE FUNCTIONS (migrated from original HTML)
// ============================================================

const STORAGE_KEY = 'ai-roadmap-progress-v2';

function showPhase(id, btn) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (btn) btn.classList.add('active');
  }

  function goToDoc(docId) {
    // Switch to docs tab
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('docs').classList.add('active');
    // Activate the correct tab button
    document.querySelectorAll('.tab-btn').forEach(b => {
      if (b.textContent.trim() === 'Documentacao') b.classList.add('active');
    });
    // Open the target doc block
    const block = document.getElementById(docId);
    if (block) {
      const header = block.querySelector('.doc-header');
      const body = block.querySelector('.doc-body');
      if (!header.classList.contains('open')) {
        header.classList.add('open');
        body.classList.add('open');
      }
      // Highlight and scroll
      block.style.transition = 'box-shadow 0.3s, border-color 0.3s';
      block.style.borderColor = 'var(--accent)';
      block.style.boxShadow = '0 0 20px rgba(124,92,252,0.3)';
      setTimeout(() => block.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      setTimeout(() => {
        block.style.borderColor = '';
        block.style.boxShadow = '';
      }, 3000);
    }
  }

  function toggleDoc(header) {
    header.classList.toggle('open');
    header.nextElementSibling.classList.toggle('open');
  }

  function saveProgress() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const states = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
    updateStats();
  }

  function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const states = JSON.parse(saved);
      const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
      checkboxes.forEach((cb, i) => { if (states[i] !== undefined) cb.checked = states[i]; });
    }
    updateStats();
  }

  function updateStats() {
    const phase4Hidden = document.getElementById('tab-phase4') && document.getElementById('tab-phase4').style.display === 'none';
    const excludeSelector = phase4Hidden ? ':not(#phase4 .checklist input)' : '';
    const allCheckboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const checkboxes = phase4Hidden
      ? Array.from(allCheckboxes).filter(cb => !cb.closest('#phase4'))
      : Array.from(allCheckboxes);
    const total = checkboxes.length;
    const done = checkboxes.filter(cb => cb.checked).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statDone').textContent = done;
    document.getElementById('statPending').textContent = total - done;
    document.getElementById('globalPercent').textContent = percent + '%';
    document.getElementById('globalFill').style.width = percent + '%';
  }


  function exportProgress() {
    const data = {
      version: 2,
      date: new Date().toISOString(),
      progress: localStorage.getItem(STORAGE_KEY),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'roadmap-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
  }

  function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        if (data.progress) localStorage.setItem(STORAGE_KEY, data.progress);
        loadProgress();
        alert('Progresso importado com sucesso! Data do backup: ' + (data.date || 'desconhecida'));
      } catch (err) {
        alert('Erro ao importar: arquivo invalido.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  function exportProgressTxt() {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const total = checkboxes.length;
    const done = Array.from(checkboxes).filter(cb => cb.checked).length;
    let txt = '=== ROADMAP AI ENGINEER - RESUMO DE PROGRESSO ===\n';
    txt += 'Data: ' + new Date().toLocaleDateString('pt-BR') + '\n';
    txt += 'Progresso: ' + done + '/' + total + ' (' + Math.round(done/total*100) + '%)\n\n';

    document.querySelectorAll('.phase').forEach(phase => {
      const h2 = phase.querySelector('h2');
      if (!h2) return;
      const items = phase.querySelectorAll('.checklist li');
      if (items.length === 0) return;
      txt += '--- ' + h2.textContent + ' ---\n';
      items.forEach(li => {
        const cb = li.querySelector('input[type="checkbox"]');
        const text = li.querySelector('.item-text');
        if (cb && text) {
          const label = text.childNodes[0].textContent.trim();
          txt += (cb.checked ? '[x] ' : '[ ] ') + label + '\n';
        }
      });
      txt += '\n';
    });

    const blob = new Blob([txt], {type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'roadmap-resumo-' + new Date().toISOString().slice(0,10) + '.txt';
    a.click();
  }

  function buildDocChecklists() {
    // Map: docId -> [{index, label, phaseNum}]
    const docMap = {};
    const allCheckboxes = document.querySelectorAll('#phase1 .checklist li, #phase2 .checklist li, #phase3 .checklist li, #phase4 .checklist li');

    allCheckboxes.forEach((li, idx) => {
      const link = li.querySelector('a.item-link');
      if (!link) return;
      const onclick = link.getAttribute('onclick') || '';
      const match = onclick.match(/goToDoc\('([^']+)'\)/);
      if (!match) return;
      const docId = match[1];
      // Detect phase number
      let phaseNum = 0;
      if (li.closest('#phase1')) phaseNum = 1;
      else if (li.closest('#phase2')) phaseNum = 2;
      else if (li.closest('#phase3')) phaseNum = 3;
      else if (li.closest('#phase4')) phaseNum = 4;
      // Get clean label text (first text node of item-text)
      const itemText = li.querySelector('.item-text');
      const label = link.textContent.trim();

      if (!docMap[docId]) docMap[docId] = [];
      docMap[docId].push({ index: idx, label, phaseNum });
    });

    // For each doc block, append related items
    Object.keys(docMap).forEach(docId => {
      const block = document.getElementById(docId);
      if (!block) return;
      const body = block.querySelector('.doc-body');
      if (!body) return;

      // Remove existing (in case of rebuild)
      const existing = body.querySelector('.doc-related');
      if (existing) existing.remove();

      const items = docMap[docId];
      const container = document.createElement('div');
      container.className = 'doc-related';
      container.innerHTML = '<div class="doc-related-title">Marque seu progresso aqui</div>';

      const ul = document.createElement('ul');
      ul.className = 'doc-checklist';

      items.forEach(item => {
        const li = document.createElement('li');
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        // Sync with original
        const originalCb = allCheckboxes[item.index].querySelector('input[type="checkbox"]');
        cb.checked = originalCb.checked;

        cb.addEventListener('change', () => {
          originalCb.checked = cb.checked;
          saveProgress();
          // Update visual in doc
          updateDocChecklistVisuals();
        });

        // Also listen to original changes
        originalCb.addEventListener('change', () => {
          cb.checked = originalCb.checked;
        });

        const phaseTag = document.createElement('span');
        phaseTag.className = 'phase-tag phase-tag-' + item.phaseNum;
        phaseTag.textContent = 'Fase ' + item.phaseNum;

        const labelSpan = document.createElement('span');
        labelSpan.className = 'item-label';
        labelSpan.textContent = item.label;

        li.appendChild(cb);
        li.appendChild(phaseTag);
        li.appendChild(labelSpan);
        ul.appendChild(li);
      });

      container.appendChild(ul);
      body.appendChild(container);
    });
  }

  function updateDocChecklistVisuals() {
    // Just trigger a re-render of stats
    updateStats();
  }

// ============================================================
// EASTER EGG — Fase 4 (hidden by default)
// ============================================================
const LEAD_KEY = 'ai-roadmap-lead-mode';

function unlockPhase4() {
  const tab = document.getElementById('tab-phase4');
  if (tab) tab.style.display = '';
  localStorage.setItem(LEAD_KEY, '1');
}

(function() {
  let buffer = '';
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    buffer += e.key.toLowerCase();
    if (buffer.length > 10) buffer = buffer.slice(-10);
    if (buffer.includes('lead')) {
      buffer = '';
      if (document.getElementById('tab-phase4').style.display === 'none') {
        unlockPhase4();
      }
    }
  });
})();

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  buildPhases();
  buildDocs();
  buildResources();
  buildGlossary();
  buildFaq();           // FAQ: sem checkboxes, nao afeta indice do localStorage
  buildPhaseReviews();  // AFTER buildPhases — appends review sections to phase divs
  loadProgress();       // AFTER buildPhases/buildDocs — needs checkboxes in DOM
  buildDocChecklists(); // AFTER buildPhases/buildDocs — uses querySelector on phases

  // Restore easter egg
  if (localStorage.getItem(LEAD_KEY) === '1') unlockPhase4();
});
