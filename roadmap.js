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
