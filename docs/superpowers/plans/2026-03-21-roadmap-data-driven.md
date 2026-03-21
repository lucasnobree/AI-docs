# Roadmap Data-Driven Refactor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refatorar `roadmap-ai-engineer.html` (47k tokens monolítico) em 4 arquivos separados por responsabilidade, tornando edições futuras de conteúdo até 60% mais baratas em tokens.

**Architecture:** O conteúdo (checklists, docs, recursos, glossário) vai para `roadmap-data.js` como `const ROADMAP_DATA`. O HTML vira um shell estático com containers vazios. `roadmap.js` renderiza os containers e contém toda a interatividade. `roadmap.css` contém todos os estilos.

**Tech Stack:** HTML5, CSS3, JavaScript puro (ES6+), localStorage — sem framework, sem bundler, sem servidor.

**Spec:** `docs/superpowers/specs/2026-03-21-roadmap-data-driven-design.md`

---

## Mapeamento de Arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `roadmap-ai-engineer.html` | Modificar | Shell: head, header estático, containers vazios, imports |
| `roadmap.css` | Criar | Todo o CSS extraído do HTML (linhas 7-300 do original) |
| `roadmap-data.js` | Criar | `const ROADMAP_DATA` com fases, docs, resources, glossary, discord |
| `roadmap.js` | Criar | Funções de render + toda a interatividade migrada do HTML original |

---

## Task 1: Extrair CSS

**Files:**
- Criar: `roadmap.css`
- Modificar: `roadmap-ai-engineer.html`

- [ ] **Step 1: Criar `roadmap.css`**

  Copiar todo o conteúdo entre as tags `<style>` do HTML original (linhas 7-300) para um novo arquivo `roadmap.css`. O conteúdo começa em:
  ```css
  @import url('https://fonts.googleapis.com/css2?...');
  :root { --bg: #0f0f13; ... }
  ```
  e termina antes de `</style>`.

- [ ] **Step 2: Substituir `<style>` por `<link>` no HTML**

  No `roadmap-ai-engineer.html`, substituir:
  ```html
  <style>
    @import url(...);
    ...todo o CSS...
  </style>
  ```
  por:
  ```html
  <link rel="stylesheet" href="roadmap.css">
  ```

- [ ] **Step 3: Verificar no browser**

  Abrir `roadmap-ai-engineer.html` via `file://`. O visual deve ser idêntico ao original (dark theme, fontes, cores).

- [ ] **Step 4: Commit**

  ```bash
  git init   # se não tiver git no repo ainda
  git add roadmap.css roadmap-ai-engineer.html
  git commit -m "extract CSS into roadmap.css"
  ```

---

## Task 2: Criar Shell HTML

**Files:**
- Modificar: `roadmap-ai-engineer.html`

O objetivo é substituir todo o conteúdo dinâmico do `<body>` por containers vazios, mantendo apenas o que é genuinamente estático.

- [ ] **Step 1: Substituir o conteúdo do `<body>` pelo shell**

  Substituir tudo entre `<div class="container">` e o fechamento `</div>` (antes de `<script>`) pelo seguinte:

  ```html
  <div class="container">

    <div class="header">
      <h1>Roadmap: AI Prompt Engineer &amp; Tech Lead</h1>
      <p>Dev Jr Fullstack &rarr; Engenheiro de Prompt &amp; Lider Tecnico de IA</p>
      <div class="subtitle">Inicio: Marco 2026 &bull; Objetivo: Dominio completo em ~12 semanas</div>
    </div>

    <div class="backup-bar">
      <button class="backup-btn" onclick="exportProgress()">Exportar Progresso (JSON)</button>
      <button class="backup-btn" onclick="document.getElementById('importFile').click()">Importar Progresso</button>
      <input type="file" id="importFile" accept=".json" onchange="importProgress(event)">
      <button class="backup-btn primary" onclick="exportProgressTxt()">Exportar Resumo (.txt)</button>
    </div>

    <div class="global-progress">
      <div class="label"><span>Progresso Geral</span><span id="globalPercent">0%</span></div>
      <div class="progress-bar"><div class="fill" id="globalFill" style="width:0%"></div></div>
    </div>

    <div class="stats">
      <div class="stat-card"><div class="number" style="color:var(--accent)" id="statTotal">0</div><div class="desc">Total de Itens</div></div>
      <div class="stat-card"><div class="number" style="color:var(--green)" id="statDone">0</div><div class="desc">Concluidos</div></div>
      <div class="stat-card"><div class="number" style="color:var(--yellow)" id="statPending">0</div><div class="desc">Pendentes</div></div>
      <div class="stat-card"><div class="number" style="color:var(--blue)">23</div><div class="desc">Documentacoes</div></div>
    </div>

    <div class="tabs">
      <button class="tab-btn active" onclick="showPhase('phase1',this)">Fase 1 - Fundamentos</button>
      <button class="tab-btn" onclick="showPhase('phase2',this)">Fase 2 - Prompts</button>
      <button class="tab-btn" onclick="showPhase('phase3',this)">Fase 3 - Agentes</button>
      <button class="tab-btn" onclick="showPhase('phase4',this)">Fase 4 - Lideranca</button>
      <button class="tab-btn" onclick="showPhase('docs',this)">Documentacao</button>
      <button class="tab-btn" onclick="showPhase('resources',this)">Recursos &amp; Cursos</button>
      <button class="tab-btn" onclick="showPhase('glossary',this)">Glossario</button>
      <button class="tab-btn" onclick="showPhase('notes',this)">Anotacoes</button>
      <button class="tab-btn" onclick="showPhase('discord',this)">Discord</button>
    </div>

    <!-- Containers dinâmicos — preenchidos pelo roadmap.js -->
    <div id="phases-container"></div>
    <div class="phase" id="docs"></div>
    <div class="phase" id="resources"></div>
    <div class="phase" id="glossary"></div>

    <!-- Notas: estáticas, preservadas como estão -->
    <div class="phase" id="notes">
      <div class="phase-header">
        <div class="phase-badge" style="background:var(--accent-glow);color:var(--accent);">N</div>
        <div class="phase-info"><h2>Suas Anotacoes</h2><div class="duration">Tudo salvo automaticamente no navegador</div></div>
      </div>
      <div class="section"><h3>Aprendizados e Insights</h3><textarea class="notes-area" id="notesGeneral" placeholder="Registre aprendizados, descobertas e insights..." oninput="saveNotes()"></textarea></div>
      <div class="section"><h3>Duvidas para Investigar</h3><textarea class="notes-area" id="notesQuestions" placeholder="Anote duvidas para investigar depois..." oninput="saveNotes()"></textarea></div>
      <div class="section"><h3>Ideias para a Empresa</h3><textarea class="notes-area" id="notesIdeas" placeholder="Ideias de como aplicar IA na empresa..." oninput="saveNotes()"></textarea></div>
      <div class="section"><h3>Prompts que Funcionaram</h3><textarea class="notes-area" id="notesPrompts" placeholder="Cole prompts com bons resultados..." oninput="saveNotes()" style="min-height:200px;font-family:'JetBrains Mono',monospace;font-size:0.82rem;"></textarea></div>
    </div>

    <div class="phase" id="discord"></div>

    <div class="footer">
      <p>Roadmap criado com Claude Code &bull; Marco 2026</p>
      <p style="margin-top:0.25rem;">Progresso salvo em localStorage + backup exportavel em JSON</p>
    </div>

  </div>

  <script src="roadmap-data.js"></script>
  <script src="roadmap.js"></script>
  ```

  Remover também a tag `<script>` inline que existia no final (todo o JS vai para `roadmap.js`).

- [ ] **Step 2: Verificar que o HTML é válido e carrega sem erros de JS**

  Abrir no browser. Vai aparecer em branco (sem conteúdo dinâmico ainda) — isso é esperado. O console não deve ter erros de sintaxe HTML.

- [ ] **Step 3: Commit**

  ```bash
  git add roadmap-ai-engineer.html
  git commit -m "reduce HTML to static shell, containers ready for dynamic render"
  ```

---

## Task 3: Criar `roadmap-data.js` — Esqueleto + Fases 1 e 2

**Files:**
- Criar: `roadmap-data.js`

Extrair os dados das Fases 1 e 2 do HTML original (linhas 343-416) para o formato `ROADMAP_DATA`.

- [ ] **Step 1: Criar `roadmap-data.js` com esqueleto e Fase 1**

  ```js
  const ROADMAP_DATA = {
    phases: [
      {
        id: 'phase1',
        num: 1,
        badge: '1',
        color: 'green',
        title: 'Fundamentos de LLMs',
        duration: 'Semanas 1-3 \u2022 Entender o que voce esta manipulando',
        tip: 'Voce nao precisa entender a matematica de transformers. Precisa do modelo mental correto: como tokens funcionam, por que o modelo responde de certa forma, e o que voce pode controlar.',
        sections: [
          {
            title: 'Conceitos Essenciais',
            items: [
              { text: 'Entender o que sao Tokens e Tokenizacao', detail: 'Como texto e convertido em numeros. ~4 chars em ingles, ~2-3 em portugues. Tudo e medido em tokens.', link: { type: 'ext', url: 'https://www.promptingguide.ai/introduction/settings', docId: null, badge: 'DAIR.AI' } },
              { text: 'Context Window (janela de contexto)', detail: 'Limite de "memoria" do modelo numa conversa. Claude: 200k tokens.', link: { type: 'doc', url: null, docId: 'doc-modelos', badge: 'Doc 10' } },
              { text: 'Temperatura e Top-p', detail: 'Temperatura: 0=deterministico, 1=criativo. Top-p: controla diversidade.', link: { type: 'ext', url: 'https://www.promptingguide.ai/introduction/settings', docId: null, badge: 'DAIR.AI' } },
              { text: 'Por que LLMs "alucinam"', detail: 'O modelo gera texto estatisticamente provavel, nao factualmente verificado. Nao e bug.', link: { type: 'ext', url: 'https://www.promptingguide.ai/risks/factuality', docId: null, badge: 'DAIR.AI' } },
              { text: 'System Prompt vs User Prompt vs Assistant', detail: 'System = comportamento base. User = entrada. Assistant = resposta. Doc 3 explica como usar o system prompt.', link: { type: 'doc', url: null, docId: 'doc-role', badge: 'Doc 3' } },
              { text: 'Diferenca entre modelos (Opus, Sonnet, Haiku)', detail: 'Opus: mais capaz. Haiku: mais rapido. Sonnet: equilibrio. Doc 10 compara todos.', link: { type: 'doc', url: null, docId: 'doc-modelos', badge: 'Doc 10' } },
              { text: 'API basics: requests, responses, streaming', detail: 'Curso pratico hands-on. Faca pelo menos 10 chamadas diretas a API.', link: { type: 'ext', url: 'https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals', docId: null, badge: 'Curso 1' } },
              { text: 'Pricing por token (input vs output)', detail: 'Output tokens custam mais que input. Doc 10 detalha custos por modelo.', link: { type: 'doc', url: null, docId: 'doc-modelos', badge: 'Doc 10' } }
            ]
          },
          {
            title: 'Exercicios Praticos',
            items: [
              { text: 'Criar conta na API da Anthropic e fazer primeira chamada', detail: null, link: { type: 'ext', url: 'https://console.anthropic.com/', docId: null, badge: 'Console' } },
              { text: 'Experimentar temperaturas 0.0, 0.5 e 1.0 no mesmo prompt', detail: null, link: { type: 'ext', url: 'https://console.anthropic.com/workbench', docId: null, badge: 'Workbench' } },
              { text: 'Contar tokens de um prompt usando tokenizer', detail: null, link: { type: 'ext', url: 'https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals', docId: null, badge: 'Curso 1' } },
              { text: 'Escrever 3 system prompts diferentes e comparar resultados', detail: null, link: { type: 'doc', url: null, docId: 'doc-role', badge: 'Doc 3' } }
            ]
          }
        ]
      },
      {
        id: 'phase2',
        num: 2,
        badge: '2',
        color: 'yellow',
        title: 'Prompt Engineering Aplicado',
        duration: 'Semanas 3-6 \u2022 Dominar tecnicas que geram resultado real',
        tip: 'Cada tecnica aqui deve ser praticada com um problema real da sua empresa. Nao estude no abstrato. Portfolio de antes/depois e sua credibilidade interna.',
        sections: [
          {
            title: 'Tecnicas Essenciais',
            items: [
              { text: 'Zero-shot Prompting', detail: 'Instrucao direta sem exemplos. Doc 1 ensina a ser claro e direto — base do zero-shot.', link: { type: 'doc', url: null, docId: 'doc-clareza', badge: 'Doc 1' } },
              { text: 'Few-shot Prompting', detail: '2-5 exemplos no prompt. Doc 2 cobre tudo: como estruturar, tags, regras.', link: { type: 'doc', url: null, docId: 'doc-exemplos', badge: 'Doc 2' } },
              { text: 'Chain-of-Thought (CoT)', detail: 'Raciocinio passo a passo. Doc 4 cobre adaptive thinking, effort, e self-check.', link: { type: 'doc', url: null, docId: 'doc-cot', badge: 'Doc 4' } },
              { text: 'Role Prompting (persona)', detail: 'Definir quem o modelo "e". Doc 3 ensina system prompt e responsividade dos modelos.', link: { type: 'doc', url: null, docId: 'doc-role', badge: 'Doc 3' } },
              { text: 'Structured Output (JSON, XML)', detail: 'Forcar formato de saida. Doc 8 cobre schemas, enum, eliminacao de preambulos.', link: { type: 'doc', url: null, docId: 'doc-structured', badge: 'Doc 8' } },
              { text: 'Prompt Chaining', detail: 'Dividir tarefa em etapas. Doc 9 cobre quando usar e o padrao de auto-correcao.', link: { type: 'doc', url: null, docId: 'doc-chaining', badge: 'Doc 9' } },
              { text: 'Self-Reflection / Self-Critique', detail: 'Modelo revisa propria resposta. Doc 4 cobre self-check e verificacao.', link: { type: 'doc', url: null, docId: 'doc-cot', badge: 'Doc 4' } },
              { text: 'XML Tags como delimitadores', detail: 'Separar instrucoes, contexto, exemplos. Doc 5 cobre tags, hierarquia, padroes.', link: { type: 'doc', url: null, docId: 'doc-xml', badge: 'Doc 5' } },
              { text: 'Instrucoes positivas > negativas', detail: 'Dizer O QUE FAZER > o que NAO fazer. Doc 1 ensina isso com exemplos.', link: { type: 'doc', url: null, docId: 'doc-clareza', badge: 'Doc 1' } },
              { text: 'Prompt Templates reutilizaveis', detail: 'Templates parametrizaveis. Curso 3 ensina a aplicar tecnicas em prompts reais.', link: { type: 'ext', url: 'https://github.com/anthropics/courses/tree/master/real_world_prompting', docId: null, badge: 'Curso 3' } }
            ]
          },
          {
            title: 'Tecnicas Avancadas',
            items: [
              { text: 'Meta-prompting', detail: 'Usar o modelo para gerar/melhorar prompts. Notebook pratico.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/metaprompt.ipynb', docId: null, badge: 'Cookbook' } },
              { text: 'Constitutional AI no prompt', detail: 'Regras e principios no prompt. Conceito vem da pesquisa da Anthropic.', link: { type: 'ext', url: 'https://www.anthropic.com/research', docId: null, badge: 'Research' } },
              { text: 'Multi-turn conversation design', detail: 'Fluxos em multiplos turnos. Doc 6 cobre state management e contexto longo.', link: { type: 'doc', url: null, docId: 'doc-longcontext', badge: 'Doc 6' } },
              { text: 'Prompt compression e caching', detail: 'Reduzir tokens mantendo qualidade. Notebook pratico de caching.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/prompt_caching.ipynb', docId: null, badge: 'Cookbook' } },
              { text: 'Anti-patterns de comunicacao em LLMs', detail: 'Nao bajular, nao repetir, ir direto ao ponto — principios reais extraidos dos prompts.', link: { type: 'doc', url: null, docId: 'doc-comunicacao', badge: 'Doc 15' } },
              { text: 'Estrutura de um System Prompt profissional', detail: '9 blocos: Identity, Safety, Instructions, Tools, Tone, Memory, Context, Examples, Reminders.', link: { type: 'doc', url: null, docId: 'doc-estrutura', badge: 'Doc 16' } }
            ]
          },
          {
            title: 'Exercicios Praticos',
            items: [
              { text: 'Resolver 1 problema real da empresa com cada tecnica', detail: null, link: { type: 'ext', url: 'https://console.anthropic.com/workbench', docId: null, badge: 'Workbench' } },
              { text: 'Criar "prompt cookbook" pessoal', detail: null, link: { type: 'ext', url: 'https://www.promptingguide.ai/prompts', docId: null, badge: 'Prompt Hub' } },
              { text: 'Fazer A/B test entre 2 prompts', detail: null, link: { type: 'ext', url: 'https://github.com/anthropics/courses/tree/master/prompt_evaluations', docId: null, badge: 'Curso 4' } },
              { text: 'Otimizar um prompt existente da empresa', detail: null, link: { type: 'ext', url: 'https://github.com/anthropics/courses/tree/master/real_world_prompting', docId: null, badge: 'Curso 3' } }
            ]
          }
        ]
      }
    ],
    docs: [],
    resources: [],
    glossary: [],
    discord: { intro: '', channels: [], communities: [], tip: '' }
  };
  ```

- [ ] **Step 2: Confirmar que o arquivo é JS válido**

  Abrir o browser com o `roadmap-ai-engineer.html` (que já referencia `roadmap-data.js`) e verificar no console que `ROADMAP_DATA.phases.length === 2` e que não há erros de sintaxe.

- [ ] **Step 3: Commit**

  ```bash
  git add roadmap-data.js
  git commit -m "add roadmap-data.js with phases 1 and 2"
  ```

---

## Task 4: Adicionar Fases 3 e 4 ao `roadmap-data.js`

**Files:**
- Modificar: `roadmap-data.js`

Extrair dados das Fases 3 e 4 do HTML original (linhas 418-513) e adicionar ao array `phases`.

- [ ] **Step 1: Adicionar Fase 3 ao array `phases`**

  Após o objeto da Fase 2, adicionar:

  ```js
  {
    id: 'phase3',
    num: 3,
    badge: '3',
    color: 'blue',
    title: 'Agentes & Sistemas de IA',
    duration: 'Semanas 6-12 \u2022 Projetar sistemas, nao apenas prompts',
    tip: 'Aqui seu background de dev brilha. Agentes sao software que usa LLMs como motor de decisao. Sua experiencia fullstack te da vantagem enorme.',
    sections: [
      {
        title: 'Arquitetura de Agentes',
        items: [
          { text: 'Tool Use / Function Calling', detail: 'Dar "ferramentas" ao modelo. Doc 7 cobre tudo: como funciona, parallel calling, seguranca.', link: { type: 'doc', url: null, docId: 'doc-tooluse', badge: 'Doc 7' } },
          { text: 'ReAct Pattern (Reasoning + Acting)', detail: 'Padrao fundamental de agentes. Artigo externo com paper original.', link: { type: 'ext', url: 'https://www.promptingguide.ai/techniques/react', docId: null, badge: 'DAIR.AI' } },
          { text: 'Orquestracao de multiplos agentes', detail: 'Padrao orchestrator-workers. Notebook pratico hands-on.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/orchestrator_workers.ipynb', docId: null, badge: 'Cookbook' } },
          { text: 'Memory e state management', detail: 'Doc 6 cobre state management, JSON, git para estado entre sessoes.', link: { type: 'doc', url: null, docId: 'doc-longcontext', badge: 'Doc 6' } },
          { text: 'Error handling e fallbacks', detail: 'Workflows basicos com tratamento de erros. Notebook pratico.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/patterns/agents/basic_workflows.ipynb', docId: null, badge: 'Cookbook' } },
          { text: 'Claude Agent SDK', detail: 'SDK oficial. Comece pelo Research Agent (notebook pratico).', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/claude_agent_sdk/00_The_one_liner_research_agent.ipynb', docId: null, badge: 'Agent SDK' } },
          { text: 'Arquitetura Fork vs Sub-agente', detail: 'Quando usar fork (herda contexto) vs sub-agente especializado. Extraido dos prompts reais.', link: { type: 'doc', url: null, docId: 'doc-agentes', badge: 'Doc 13' } },
          { text: 'Sistema de Memoria para Agentes (4 tipos)', detail: 'User, feedback, project, reference — taxonomia de memoria do Claude.', link: { type: 'doc', url: null, docId: 'doc-memoria', badge: 'Doc 12' } },
          { text: 'Orquestracao Paralela (Coordinator + Workers)', detail: 'Padrao avancado: decompor trabalho em unidades, lancar workers em worktrees isolados.', link: { type: 'doc', url: null, docId: 'doc-batch', badge: 'Doc 19' } },
          { text: 'Plan Mode: Planejar antes de Implementar', detail: 'Workflow: explorar, perguntar, planejar, so entao executar.', link: { type: 'doc', url: null, docId: 'doc-planmode', badge: 'Doc 18' } },
          { text: 'Criar Skills/Workflows Reutilizaveis', detail: 'Sistema SKILL.md com frontmatter, success criteria, human checkpoints.', link: { type: 'doc', url: null, docId: 'doc-skills', badge: 'Doc 20' } },
          { text: 'Task Management & Background Execution', detail: 'Decompor trabalho em tarefas trackaveis, execucao em background.', link: { type: 'doc', url: null, docId: 'doc-tasks', badge: 'Doc 22' } }
        ]
      },
      {
        title: 'RAG (Retrieval-Augmented Generation)',
        items: [
          { text: 'O que e RAG e por que importa', detail: 'Conceito completo com paper original.', link: { type: 'ext', url: 'https://www.promptingguide.ai/techniques/rag', docId: null, badge: 'DAIR.AI' } },
          { text: 'Embeddings e busca vetorial', detail: 'Criar embeddings com Voyage AI. Hands-on.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/third_party/VoyageAI/how_to_create_embeddings.md', docId: null, badge: 'Cookbook' } },
          { text: 'Chunking strategies', detail: 'Notebooks praticos de RAG completo.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/tree/main/capabilities/retrieval_augmented_generation', docId: null, badge: 'Cookbook' } },
          { text: 'Vector databases (Pinecone, pgvector)', detail: 'RAG com Pinecone. Implementacao completa.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/third_party/Pinecone/rag_using_pinecone.ipynb', docId: null, badge: 'Cookbook' } },
          { text: 'Implementar RAG basico com docs da empresa', detail: 'Projeto pratico: indexar docs e criar chatbot.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/tree/main/capabilities/retrieval_augmented_generation', docId: null, badge: 'Cookbook' } }
        ]
      },
      {
        title: 'Avaliacao e Qualidade (Evals)',
        items: [
          { text: 'Por que evals sao essenciais', detail: 'Curso completo sobre avaliacoes de prompt.', link: { type: 'ext', url: 'https://github.com/anthropics/courses/tree/master/prompt_evaluations', docId: null, badge: 'Curso 4' } },
          { text: 'Tipos de evals: automaticas vs humanas', detail: 'Notebook pratico de building evals.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/building_evals.ipynb', docId: null, badge: 'Cookbook' } },
          { text: 'Criar eval set para caso de uso da empresa', detail: 'Inputs + outputs esperados. Rode contra versoes do prompt.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/building_evals.ipynb', docId: null, badge: 'Cookbook' } },
          { text: 'Monitoramento em producao', detail: 'Rastrear qualidade, latencia, custo. Notebook pratico.', link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/observability/usage_cost_api.ipynb', docId: null, badge: 'Cookbook' } }
        ]
      },
      {
        title: 'Seguranca e Guardrails',
        items: [
          { text: 'Prompt Injection e prevencao', detail: 'Artigo completo sobre ataques e defesas.', link: { type: 'ext', url: 'https://www.promptingguide.ai/risks/adversarial', docId: null, badge: 'DAIR.AI' } },
          { text: 'Output validation e sanitization', detail: null, link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/misc/building_moderation_filter.ipynb', docId: null, badge: 'Cookbook' } },
          { text: 'Rate limiting e abuse prevention', detail: null, link: { type: 'ext', url: 'https://docs.anthropic.com/en/docs/build-with-claude/rate-limits', docId: null, badge: 'Docs' } },
          { text: 'Data privacy e bias com LLMs', detail: 'PII, dados sensiveis, compliance (LGPD), bias em outputs.', link: { type: 'ext', url: 'https://www.promptingguide.ai/risks/biases', docId: null, badge: 'DAIR.AI' } },
          { text: 'Guardrails & Classifiers Automaticos', detail: 'cyber_warning, ethics_reminder, system_warning — como a Anthropic filtra conteudo.', link: { type: 'doc', url: null, docId: 'doc-seguranca', badge: 'Doc 14' } },
          { text: 'Git Safety Protocol para Agentes', detail: 'Regras de seguranca git: nunca force push, nunca amend sem pedir, nunca commitar secrets.', link: { type: 'doc', url: null, docId: 'doc-git', badge: 'Doc 17' } }
        ]
      }
    ]
  },
  ```

- [ ] **Step 2: Adicionar Fase 4 ao array `phases`**

  ```js
  {
    id: 'phase4',
    num: 4,
    badge: '4',
    color: 'orange',
    title: 'Lideranca Tecnica em IA',
    duration: 'Continuo \u2022 Ser quem toma decisoes de IA na empresa',
    tip: 'Tech lead nao e so o melhor tecnico. E quem multiplica a capacidade do time. Traduzir possibilidades de IA em solucoes de negocio.',
    sections: [
      {
        title: 'Habilidades de Lideranca',
        items: [
          { text: 'Avaliar quando IA resolve vs quando e over-engineering', detail: 'Saber dizer "isso nao precisa de IA" e tao valioso quanto implementar.', link: null },
          { text: 'Definir metricas de sucesso para projetos de IA', detail: 'KPIs: acuracia, tempo economizado, custo por request.', link: { type: 'ext', url: 'https://github.com/anthropics/courses/tree/master/prompt_evaluations', docId: null, badge: 'Curso 4' } },
          { text: 'Gerenciar custos de tokens e otimizar budget', detail: 'Doc 10 compara custos entre modelos. Base para decisoes de budget.', link: { type: 'doc', url: null, docId: 'doc-modelos', badge: 'Doc 10' } },
          { text: 'Documentar prompts e sistemas para o time', detail: null, link: null },
          { text: 'Criar guidelines de uso de IA para a empresa', detail: 'Use os anti-patterns e principios de comunicacao como base para guidelines internas.', link: { type: 'doc', url: null, docId: 'doc-comunicacao', badge: 'Doc 15' } },
          { text: 'Apresentar resultados e ROI para stakeholders', detail: '"Economizamos X horas/mes" > "Reduzimos tokens em 30%".', link: null }
        ]
      },
      {
        title: 'Visao Estrategica',
        items: [
          { text: 'Acompanhar lancamentos de novos modelos', detail: null, link: { type: 'ext', url: 'https://www.anthropic.com/research', docId: null, badge: 'Research' } },
          { text: 'Trade-offs: API vs fine-tuning vs modelo proprio', detail: null, link: { type: 'ext', url: 'https://github.com/anthropics/anthropic-cookbook/blob/main/finetuning/finetuning_on_bedrock.ipynb', docId: null, badge: 'Cookbook' } },
          { text: 'MCP (Model Context Protocol)', detail: 'Protocolo aberto para conectar LLMs a dados e ferramentas.', link: { type: 'ext', url: 'https://modelcontextprotocol.io/', docId: null, badge: 'MCP Docs' } },
          { text: 'AI Safety e etica', detail: null, link: { type: 'ext', url: 'https://www.anthropic.com/research', docId: null, badge: 'Research' } },
          { text: 'Construir roadmap de IA para a empresa', detail: null, link: null },
          { text: 'Dominar anatomia de system prompts profissionais', detail: 'Usar template de 9 blocos para criar system prompts de producao.', link: { type: 'doc', url: null, docId: 'doc-estrutura', badge: 'Doc 16' } },
          { text: 'Estudar prompt de produto real (claude.ai)', detail: '23 secoes do prompt do claude.ai — masterclass em design de produto de IA.', link: { type: 'doc', url: null, docId: 'doc-claudeai', badge: 'Doc 23' } },
          { text: 'Implementar handling de recusas no agente da empresa', detail: 'Recusas com tom conversacional, wellbeing do usuario, feedback honesto.', link: { type: 'doc', url: null, docId: 'doc-recusas', badge: 'Doc 21' } }
        ]
      },
      {
        title: 'Exercicios Praticos',
        items: [
          { text: 'Fazer apresentacao interna sobre IA na empresa', detail: null, link: null },
          { text: 'Conduzir workshop de prompt engineering para o time', detail: null, link: null },
          { text: 'Criar documento "AI Decision Framework"', detail: 'Fluxograma: Precisa de IA? -> Qual tipo? -> Qual modelo? -> Custo?', link: null }
        ]
      }
    ]
  }
  ```

- [ ] **Step 3: Verificar no console**

  ```js
  ROADMAP_DATA.phases.length === 4  // true
  ROADMAP_DATA.phases.map(p => p.sections.flatMap(s => s.items).length)
  // deve retornar [12, 20, 27, 17] (total de itens por fase)
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add roadmap-data.js
  git commit -m "add phases 3 and 4 data"
  ```

---

## Task 5: Adicionar Dados de Glossário, Resources e Discord

**Files:**
- Modificar: `roadmap-data.js`

- [ ] **Step 1: Adicionar `glossary`**

  Substituir `glossary: []` por:

  ```js
  glossary: [
    { term: 'LLM', def: 'Large Language Model. Modelo treinado em texto massivo. Claude, GPT, Gemini.' },
    { term: 'Token', def: 'Unidade de texto processada. ~4 chars ingles, ~2-3 portugues. Tudo e medido em tokens.' },
    { term: 'Context Window', def: 'Max tokens por interacao (input+output). Claude: 200k tokens.' },
    { term: 'Temperature', def: 'Controla aleatoriedade. 0=deterministico, 1=criativo.' },
    { term: 'System Prompt', def: 'Instrucao base que define comportamento. Persiste em toda conversa.' },
    { term: 'Hallucination', def: 'Modelo gera info falsa com confianca. Mitigar com RAG e validacao.' },
    { term: 'Few-shot', def: 'Dar exemplos (2-5) no prompt para guiar formato e comportamento.' },
    { term: 'Chain-of-Thought', def: 'Raciocinio passo a passo. Melhora acuracia em logica e matematica.' },
    { term: 'RAG', def: 'Retrieval-Augmented Generation. Buscar info em base de dados antes de gerar resposta.' },
    { term: 'Embedding', def: 'Texto como vetor numerico. Textos similares = vetores proximos. Base para busca semantica.' },
    { term: 'Tool Use', def: 'Modelo chama funcoes externas (APIs, banco, codigo). Base para agentes.' },
    { term: 'Agent', def: 'Sistema com LLM que toma decisoes e executa acoes. Loop: pensar > agir > observar.' },
    { term: 'Eval', def: 'Avaliacao sistematica de qualidade de outputs. Essencial para producao.' },
    { term: 'Prompt Injection', def: 'Ataque onde usuario manipula prompt. Risco de seguranca #1.' },
    { term: 'MCP', def: 'Model Context Protocol. Protocolo aberto para conectar LLMs a dados/ferramentas.' },
    { term: 'Fine-tuning', def: 'Treinar modelo com dados especificos. Ultimo recurso, nao primeiro.' },
    { term: 'Guardrails', def: 'Restricoes que impedem output indesejado ou acoes nao autorizadas.' },
    { term: 'Adaptive Thinking', def: 'Claude 4.6: decide sozinho quando e quanto pensar. Supera extended thinking.' },
    { term: 'Structured Output', def: 'Forcar resposta em schema (JSON). API feature para integracao confiavel.' },
    { term: 'Chunking', def: 'Dividir documentos em pedacos para RAG. Tamanho e overlap afetam qualidade.' }
  ],
  ```

- [ ] **Step 2: Adicionar `resources`**

  Substituir `resources: []` por (extraído das linhas 1680-1912 do HTML original):

  ```js
  resources: [
    // Cursos
    { section: 'Cursos Essenciais (Anthropic)', tag: 'course', title: 'Anthropic API Fundamentals', desc: 'Curso 1. Base obrigatoria: API, tokens, primeiras chamadas. Faca em 1 dia.', url: 'https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals' },
    { section: 'Cursos Essenciais (Anthropic)', tag: 'free', title: 'Anthropic Cookbook', desc: 'Notebooks praticos de referencia. Use como consulta para cada tecnica.', url: 'https://github.com/anthropics/anthropic-cookbook' },
    { section: 'Cursos Essenciais (Anthropic)', tag: 'course', title: 'Real World Prompting', desc: 'Curso 3. Tecnicas aplicadas em casos reais. Para Fase 2.', url: 'https://github.com/anthropics/courses/tree/master/real_world_prompting' },
    { section: 'Cursos Essenciais (Anthropic)', tag: 'course', title: 'Prompt Evaluations', desc: 'Curso 4. Como medir qualidade de prompts. Para Fase 3.', url: 'https://github.com/anthropics/courses/tree/master/prompt_evaluations' },
    { section: 'Cursos Essenciais (Anthropic)', tag: 'course', title: 'Tool Use & Agents', desc: 'Curso 5. Function calling e construcao de agentes. Para Fase 3.', url: 'https://github.com/anthropics/courses/tree/master/tool_use' },
    { section: 'Cursos Essenciais (Anthropic)', tag: 'free', title: 'DAIR.AI Prompt Engineering Guide', desc: 'Referencia externa mais completa. Cobre todas as tecnicas com papers.', url: 'https://www.promptingguide.ai/' },
    { section: 'Cursos Complementares', tag: 'course', title: 'Building Systems with ChatGPT API', desc: 'DeepLearning.AI. Aplicavel ao Claude. Bom para visao geral de sistemas.', url: 'https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/' },
    { section: 'Cursos Complementares', tag: 'course', title: 'LangChain for LLM App Development', desc: 'DeepLearning.AI. Framework popular para agentes e RAG.', url: 'https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/' },
    { section: 'Cursos Complementares', tag: 'course', title: 'Building Agentic RAG', desc: 'DeepLearning.AI. RAG com agentes. Para Fase 3.', url: 'https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/' },
    { section: 'Cursos Complementares', tag: 'free', title: 'Learn Prompting', desc: 'Curso interativo do basico ao avancado. Inclui prompt injection e tecnicas avancadas.', url: 'https://learnprompting.org/' },
    { section: 'Cursos Complementares', tag: 'course', title: 'DAIR.AI Lecture Completa', desc: 'Video de 1h resumindo todas as tecnicas de prompt engineering. Bom para uma visao geral rapida.', url: 'https://youtu.be/dOxUroR57xs' },
    // Documentação
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Prompt Engineering Guide (Oficial)', desc: 'Guia consolidado #1. A aba "Documentacao" deste painel resume todos os pontos-chave.', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Modelos Claude - Comparativo', desc: 'Opus vs Sonnet vs Haiku. Capacidades, limites, precos.', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Tool Use (Function Calling)', desc: 'Base para agentes. Leia antes da Fase 3.', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Claude Code Docs', desc: 'Voce ja usa. Entenda como funciona por dentro.', url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview' },
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Context Caching', desc: 'Reduzir custo e latencia cacheando prompt. Para producao.', url: 'https://docs.anthropic.com/en/docs/build-with-claude/context-caching' },
    // Ferramentas
    { section: 'Ferramentas', tag: 'tool', title: 'Anthropic Workbench', desc: 'Testar prompts com diferentes parametros em tempo real. Use DIARIAMENTE.', url: 'https://console.anthropic.com/workbench' },
    { section: 'Ferramentas', tag: 'tool', title: 'Anthropic Console', desc: 'API keys, uso, custos. Seu painel de controle.', url: 'https://console.anthropic.com/' },
    { section: 'Ferramentas', tag: 'tool', title: 'Claude Code (Fonte)', desc: 'Codigo-fonte aberto. Agente real para estudar.', url: 'https://github.com/anthropics/claude-code' },
    // Blogs e Comunidades
    { section: 'Blogs, Podcasts & Comunidades', tag: 'book', title: 'Anthropic Research Blog', desc: 'Papers e posts sobre safety e como modelos funcionam.', url: 'https://www.anthropic.com/research' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'book', title: "Simon Willison's Blog", desc: 'O melhor blog sobre IA pratica. Posts diarios.', url: 'https://simonwillison.net/' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'book', title: 'Latent Space', desc: 'Podcast tecnico com engenheiros que constroem com LLMs.', url: 'https://www.latent.space/' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'book', title: 'Anthropic YouTube', desc: 'Videos, demos e tutoriais oficiais.', url: 'https://www.youtube.com/@anthropic-ai' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'community', title: 'Anthropic Discord', desc: 'Comunidade oficial. Prompt engineering, showcases.', url: 'https://discord.gg/anthropic' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'community', title: 'r/ClaudeAI', desc: 'Discussoes praticas sobre Claude.', url: 'https://reddit.com/r/ClaudeAI' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'community', title: 'r/PromptEngineering', desc: 'Tecnicas de prompt engineering.', url: 'https://reddit.com/r/PromptEngineering' }
  ],
  ```

  > Nota: o campo `section` é uma adição nova para permitir que `buildResources()` agrupe os cards por seção, replicando a estrutura do HTML original (`<div class="section"><h3>Cursos Essenciais...</h3>`).

- [ ] **Step 3: Adicionar `discord`**

  Substituir `discord: { intro: '', channels: [], communities: [], tip: '' }` por:

  ```js
  discord: {
    intro: 'Crie um servidor pessoal com estes canais:',
    channels: [
      { name: '#daily-log', desc: '2-3 linhas do que estudou/praticou. Consistencia > volume.' },
      { name: '#prompts-lab', desc: 'Prompts testados com resultado. Seu cookbook vivo.' },
      { name: '#recursos', desc: 'Links de artigos, videos, tools. Organize com tags.' },
      { name: '#duvidas', desc: 'Perguntas que surgirem. Responda quando descobrir.' },
      { name: '#wins', desc: 'Vitorias. Prompt que resolveu problema real, agente que funcionou.' },
      { name: '#ideias-empresa', desc: 'Oportunidades de IA no dia a dia.' }
    ],
    communities: [
      { text: 'Anthropic Discord (oficial)', detail: null },
      { text: 'LangChain Discord', detail: 'Muita discussao pratica sobre agentes e RAG.' },
      { text: 'Hugging Face Discord', detail: 'Comunidade de ML. Modelos open-source e fine-tuning.' },
      { text: 'MLOps Community', detail: 'ML/IA em producao. Relevante para fases 3-4.' }
    ],
    tip: 'Use o Claude Code ou chat como tutor particular 24/7 durante seus estudos. Mas valide informacoes criticas com a documentacao oficial.'
  }
  ```

- [ ] **Step 4: Verificar no console**

  ```js
  ROADMAP_DATA.glossary.length === 20     // true
  ROADMAP_DATA.resources.length === 26    // true
  ROADMAP_DATA.discord.communities.length === 4  // true
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add roadmap-data.js
  git commit -m "add glossary, resources and discord data"
  ```

---

## Task 6: Adicionar Dados dos Docs (1–23)

**Files:**
- Modificar: `roadmap-data.js`

Esta é a task mais longa. Os dados vêm das linhas 515-1670 do HTML original (23 doc blocks). Extrair cada doc block para o array `docs`.

- [ ] **Step 1: Substituir `docs: []` pelo array completo dos 23 docs**

  Para cada doc block do HTML, criar um objeto seguindo o schema. Exemplo da estrutura para Doc 1:

  ```js
  {
    id: 'doc-clareza',
    title: '1. Seja Claro e Direto',
    tag: 'Fundamental',
    isLeaked: false,
    keyPoints: [
      { text: 'Regra de ouro:', sub: 'Pense no Claude como um funcionario brilhante mas novo na empresa - ele nao tem contexto sobre suas normas e processos. Quanto mais preciso voce for, melhor o resultado.\nTeste: mostre seu prompt para um colega sem contexto. Se ele ficaria confuso, o Claude tambem vai ficar.', highlight: null },
      { text: 'Seja especifico:', sub: 'Defina formato de saida, restricoes, e o que voce espera. Use listas numeradas quando a ordem importa.', highlight: null },
      { text: 'Explique o POR QUE:', sub: 'Dar contexto/motivacao ajuda o Claude a generalizar melhor.', highlight: null },
      { text: 'Diga O QUE FAZER, nao o que NAO fazer:', sub: null, highlight: null },
      { text: 'Peca "above and beyond" explicitamente:', sub: 'Se quer algo completo, diga. O Claude nao vai adivinhar.', highlight: null },
      { text: '\u2605 Comprovado pelo prompt vazado (Doc 15):', sub: '"Go straight to the point. Lead with the answer or action, not the reasoning. Skip filler words, preamble, and unnecessary transitions." — A propria Anthropic segue essa regra no prompt do Claude.', highlight: 'yellow' }
    ],
    examples: [
      { label: 'bad', caption: 'Menos eficaz:', code: '"NUNCA use reticencias"' },
      { label: 'good', caption: 'Mais eficaz:', code: '"Sua resposta sera lida por um motor text-to-speech, entao nunca use reticencias pois o motor nao sabe pronuncia-las."' },
      { label: 'bad', caption: 'Menos eficaz:', code: '"Nao use markdown na resposta"' },
      { label: 'good', caption: 'Mais eficaz:', code: '"Responda em paragrafos de prosa fluida e natural."' },
      { label: 'bad', caption: 'Menos eficaz:', code: '"Crie um dashboard de analytics"' },
      { label: 'good', caption: 'Mais eficaz:', code: '"Crie um dashboard de analytics. Inclua o maximo de funcionalidades e interacoes relevantes. Va alem do basico para criar uma implementacao completa."' }
    ],
    link: { text: 'Ler documentacao completa', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' }
  }
  ```

  Seguir o mesmo padrão para os outros 22 docs, extraindo do HTML original. Docs 12-23 têm `isLeaked: true`.

  > **Dica de execução:** Ler o HTML em blocos de 200-300 linhas, extraindo os docs em lotes de 3-4 por vez para evitar erros.

- [ ] **Step 2: Verificar no console**

  ```js
  ROADMAP_DATA.docs.length === 23                          // true
  ROADMAP_DATA.docs.filter(d => d.isLeaked).length === 12 // true (docs 12-23)
  ROADMAP_DATA.docs[0].id === 'doc-clareza'               // true
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add roadmap-data.js
  git commit -m "add all 23 documentation blocks data"
  ```

---

## Task 7: Criar `roadmap.js` — Funções de Render

**Files:**
- Criar: `roadmap.js`

- [ ] **Step 1: Criar `roadmap.js` com as funções de render das fases**

  ```js
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

      const keyPointsHtml = doc.keyPoints.map(kp => {
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
        ? `<ul>${doc.listItems.map(li => `<li>${li}</li>`).join('')}</ul>`
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

    // Group by section
    const sections = {};
    ROADMAP_DATA.resources.forEach(r => {
      if (!sections[r.section]) sections[r.section] = [];
      sections[r.section].push(r);
    });

    const sectionsHtml = Object.entries(sections).map(([title, items]) => `
      <div class="section">
        <h3>${title}</h3>
        <div class="resources-grid">
          ${items.map(r => `
            <a href="${r.url}" target="_blank" class="resource-card">
              <span class="tag tag-${r.tag}">${r.tag.charAt(0).toUpperCase() + r.tag.slice(1)}</span>
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
  ```

- [ ] **Step 2: Commit**

  ```bash
  git add roadmap.js
  git commit -m "add roadmap.js with all render functions"
  ```

---

## Task 8: Migrar Interatividade para `roadmap.js`

**Files:**
- Modificar: `roadmap.js`

- [ ] **Step 1: Adicionar todas as funções interativas ao final de `roadmap.js`**

  Copiar as seguintes funções do HTML original (linhas 1999-2265) para o `roadmap.js`, sem alteração:
  - `showPhase(id, btn)`
  - `goToDoc(docId)`
  - `toggleDoc(header)`
  - `saveProgress()`
  - `loadProgress()`
  - `updateStats()`
  - `saveNotes()`
  - `loadNotes()`
  - `exportProgress()`
  - `importProgress(event)`
  - `exportProgressTxt()`
  - `buildDocChecklists()` — copiar sem reescrever (depende de querySelector no DOM)
  - `updateDocChecklistVisuals()`

  Adicionar as constantes do localStorage:
  ```js
  const STORAGE_KEY = 'ai-roadmap-progress-v2';
  const NOTES_KEY = 'ai-roadmap-notes-v2';
  ```

- [ ] **Step 2: Adicionar o init ao final do arquivo**

  ```js
  // ============================================================
  // INIT
  // ============================================================
  // DOMContentLoaded é mais robusto que execução inline no fim do <body>
  document.addEventListener('DOMContentLoaded', () => {
    buildPhases();
    buildDocs();
    buildResources();
    buildGlossary();
    buildDiscord();
    loadProgress();       // APÓS buildPhases/buildDocs — precisa dos checkboxes no DOM
    loadNotes();
    buildDocChecklists(); // APÓS buildPhases/buildDocs — usa querySelector nas fases
  });
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add roadmap.js
  git commit -m "migrate all interactive functions to roadmap.js, add DOMContentLoaded init"
  ```

---

## Task 9: Verificação Final

**Files:** Nenhum arquivo alterado — apenas verificação

- [ ] **Step 1: Abrir `roadmap-ai-engineer.html` no browser**

  Verificar visualmente:
  - [ ] Dark theme correto (background #0f0f13, accent roxo)
  - [ ] Header e subtitle visíveis
  - [ ] 9 tabs funcionando (clicar em cada uma)
  - [ ] Fase 1 abre por padrão

- [ ] **Step 2: Verificar contagem de checkboxes no console**

  ```js
  document.querySelectorAll('.checklist input[type="checkbox"]').length
  // Deve ser o mesmo número que no HTML original
  // Para comparar: abrir o HTML original em outra aba e verificar o mesmo
  ```

- [ ] **Step 3: Verificar doc blocks**

  ```js
  document.querySelectorAll('.doc-block').length === 23  // true
  ```

- [ ] **Step 4: Testar localStorage**

  - Marcar 3 checkboxes quaisquer, fechar a aba, reabrir → checkboxes devem estar marcados
  - Escrever texto em "Aprendizados", reabrir → texto deve persistir

- [ ] **Step 5: Testar links para docs**

  - Na Fase 1, clicar em "Context Window (janela de contexto)" → deve abrir a aba Documentação no Doc 10

- [ ] **Step 6: Testar export/import**

  - Clicar "Exportar Progresso (JSON)" → deve baixar arquivo `.json`
  - Marcar checkboxes diferentes, importar o JSON → deve restaurar estados anteriores

- [ ] **Step 7: Verificar `buildDocChecklists`**

  - Abrir a aba Documentação
  - Expandir Doc 1 (Seja Claro e Direto) → deve aparecer seção "Marque seu progresso aqui" com os itens das fases que linkam para este doc

- [ ] **Step 8: Commit final**

  ```bash
  git add .
  git commit -m "complete data-driven refactor: verified and working"
  ```

---

## Resumo de Tokens por Arquivo (pós-refatoração)

| Arquivo | Tokens estimados | Para que serve editar |
|---|---|---|
| `roadmap-ai-engineer.html` | ~500 | Nunca (só muda com nova feature estrutural) |
| `roadmap.css` | ~10k | Mudar visual, cores, layout |
| `roadmap-data.js` | ~20-28k | Adicionar/editar itens, docs, resources |
| `roadmap.js` | ~8k | Corrigir bugs, adicionar features |
