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

function buildDiscord() {
  const el = document.getElementById('discord');
  const d = ROADMAP_DATA.discord;

  const headerHtml = `
    <div class="phase-header">
      <div class="phase-badge" style="background:rgba(88,101,242,0.15);color:#5865F2;">D</div>
      <div class="phase-info"><h2>Organizacao no Discord</h2><div class="duration">Estrutura recomendada para estudos</div></div>
    </div>`;

  const channelsHtml = `
    <div class="discord-section">
      <h3>Estrutura de Canais Recomendada</h3>
      <p>${d.intro}</p>
      <ul class="channel-list">
        ${d.channels.map(ch => `<li><span class="ch-name">${ch.name}</span> - ${ch.desc}</li>`).join('')}
      </ul>
    </div>`;

  const communitiesHtml = `
    <div class="section" style="margin-top:1.25rem;">
      <h3>Comunidades para Participar</h3>
      <ul class="checklist">
        ${d.communities.map(c => {
          const detailHtml = c.detail ? `<span class="detail">${c.detail}</span>` : '';
          return `<li><input type="checkbox" onchange="saveProgress()"><span class="item-text">${c.text}${detailHtml}</span></li>`;
        }).join('')}
      </ul>
    </div>`;

  const tipHtml = `
    <div class="tip" style="margin-top:1rem;">
      <div class="tip-title">Dica: Claude como tutor</div>
      ${d.tip}
    </div>`;

  el.innerHTML = headerHtml + channelsHtml + communitiesHtml + tipHtml;
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
const NOTES_KEY = 'ai-roadmap-notes-v2';

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
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const total = checkboxes.length;
    const done = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    document.getElementById('statTotal').textContent = total;
    document.getElementById('statDone').textContent = done;
    document.getElementById('statPending').textContent = total - done;
    document.getElementById('globalPercent').textContent = percent + '%';
    document.getElementById('globalFill').style.width = percent + '%';
  }

  function saveNotes() {
    const notes = {
      general: document.getElementById('notesGeneral').value,
      questions: document.getElementById('notesQuestions').value,
      ideas: document.getElementById('notesIdeas').value,
      prompts: document.getElementById('notesPrompts').value
    };
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }

  function loadNotes() {
    const saved = localStorage.getItem(NOTES_KEY);
    if (saved) {
      const n = JSON.parse(saved);
      document.getElementById('notesGeneral').value = n.general || '';
      document.getElementById('notesQuestions').value = n.questions || '';
      document.getElementById('notesIdeas').value = n.ideas || '';
      document.getElementById('notesPrompts').value = n.prompts || '';
    }
  }

  function exportProgress() {
    const data = {
      version: 2,
      date: new Date().toISOString(),
      progress: localStorage.getItem(STORAGE_KEY),
      notes: localStorage.getItem(NOTES_KEY)
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
        if (data.notes) localStorage.setItem(NOTES_KEY, data.notes);
        loadProgress();
        loadNotes();
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

    const notes = localStorage.getItem(NOTES_KEY);
    if (notes) {
      const n = JSON.parse(notes);
      if (n.general) txt += '--- APRENDIZADOS ---\n' + n.general + '\n\n';
      if (n.questions) txt += '--- DUVIDAS ---\n' + n.questions + '\n\n';
      if (n.ideas) txt += '--- IDEIAS ---\n' + n.ideas + '\n\n';
      if (n.prompts) txt += '--- PROMPTS ---\n' + n.prompts + '\n\n';
    }

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
// INIT
// ============================================================
// DOMContentLoaded is more robust than inline execution at end of <body>
document.addEventListener('DOMContentLoaded', () => {
  buildPhases();
  buildDocs();
  buildResources();
  buildGlossary();
  buildDiscord();
  buildFaq();           // FAQ: sem checkboxes, nao afeta indice do localStorage
  loadProgress();       // AFTER buildPhases/buildDocs — needs checkboxes in DOM
  loadNotes();
  buildDocChecklists(); // AFTER buildPhases/buildDocs — uses querySelector on phases
});
