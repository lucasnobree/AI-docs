# Spec: Roadmap Orientado a Dados

**Data:** 2026-03-21
**Objetivo:** Refatorar `roadmap-ai-engineer.html` de arquivo monolítico (47k tokens) para arquitetura separada orientada a dados, reduzindo drasticamente o custo de tokens em edições futuras.

---

## Problema

O arquivo `roadmap-ai-engineer.html` tem 2.268 linhas e ~47.164 tokens — acima do limite de leitura de uma vez. Qualquer edição (estilo, conteúdo, bug JS) exige carregar o arquivo inteiro.

## Solução

Separar o arquivo em 4 unidades independentes com responsabilidades distintas.

---

## Arquitetura de Arquivos

```
AI-docs/
├── roadmap-ai-engineer.html   (~500 tokens)    Shell HTML: estrutura, imports
├── roadmap.css                (~10k tokens)    Todo o CSS
├── roadmap-data.js            (~20-28k tokens) Conteúdo como const ROADMAP_DATA
└── roadmap.js                 (~8k tokens)     Renderização + interatividade
```

### Por que `.js` e não `.json` para os dados?

O arquivo roda via `file://` no browser (sem servidor local). `fetch()` falha com CORS nesse protocolo. Usar `const ROADMAP_DATA = {...}` em um arquivo `.js` resolve o problema sem dependências externas.

---

## Estrutura do `roadmap-data.js`

### Schema de `phases`

```js
const ROADMAP_DATA = {
  phases: [
    {
      id: String,     // "phase1" | "phase2" | "phase3" | "phase4"
      num: Number,    // 1 | 2 | 3 | 4  — usado para gerar classe CSS phase-tag-N
      badge: String,  // "1" | "2" | "3" | "4"  — texto exibido no badge
      color: String,  // "green" | "yellow" | "blue" | "orange"
      title: String,
      duration: String,
      tip: String,
      sections: [
        {
          title: String,
          items: [
            {
              text: String,
              detail: String | null,  // null se não houver detalhe
              link: {
                type: "ext" | "doc",
                url: String | null,    // preenchido quando type === "ext"
                docId: String | null,  // preenchido quando type === "doc"
                badge: String | null   // ex: "DAIR.AI", "Doc 10", "Cookbook"
              } | null                 // null para itens sem nenhum link
            }
          ]
        }
      ]
    }
  ]
};
```

**Regra crítica — ordem de renderização:** `buildPhases()` deve renderizar fases e seções exatamente na mesma ordem em que aparecem no HTML original. O `loadProgress()` usa índice posicional (array de booleans no localStorage) para restaurar o estado dos checkboxes. Qualquer diferença de ordem entre o HTML original e o DOM gerado corromperia silenciosamente o progresso salvo.

**Regra crítica — atributo onclick dos links doc:** `renderItem()` deve emitir `onclick="goToDoc('docId');return false;"` para itens com `link.type === "doc"`. A função `buildDocChecklists()` depende desse atributo inline para descobrir quais items do checklist apontam para quais doc blocks.

### Schema de `docs`

```js
docs: [
  {
    id: String,       // "doc-clareza", "doc-exemplos", etc.
    title: String,    // inclui o número: "1. Seja Claro e Direto"
    tag: String,      // "Fundamental" | "Avançado"
    isLeaked: Boolean, // true para Docs 12-23 (usa classe CSS tag-leaked em vez de tag-key)
    keyPoints: [
      {
        text: String,          // texto em negrito do ponto
        sub: String | null,    // texto secundário (span.sub), null se não houver
        highlight: "yellow" | null  // null usa cor padrão (accent), "yellow" usa --yellow
      }
    ],
    examples?: [       // opcional — omitir ou array vazio [] se doc não tiver exemplos
      {
        label: "bad" | "good" | "neutral",  // bad=bad-label, good=good-label, neutral=example-label
        caption: String | null,  // texto acima do bloco, null se não houver
        code: String             // conteúdo do example-box (texto puro, sem HTML)
      }
    ],
    listItems?: String[],  // opcional — para docs que usam <ul> em vez de key-points
    link: { text: String, url: String } | null  // link-out no rodapé do doc, null se não houver
  }
]
```

### Schema de `resources`

```js
resources: [
  {
    section: String,  // nome da seção agrupadora: "Cursos Essenciais (Anthropic)", "Ferramentas", etc.
    tag: String,      // "free" | "docs" | "course" | "tool" | "book" | "community"
    title: String,
    desc: String,
    url: String
  }
]
```

`buildResources()` agrupa os cards por `section`, gerando um `<div class="section">` por valor único de `section`.

### Schema de `glossary`

```js
glossary: [
  {
    term: String,
    def: String
  }
]
```

### Schema de `discord`

```js
discord: {
  intro: String,    // texto introdutório antes da lista de canais
  channels: [
    { name: String, desc: String }
  ],
  communities: [
    { text: String, detail: String | null }  // itens do checklist "Comunidades para Participar"
  ],
  tip: String       // texto da dica ao final da seção
}
```

---

## Estrutura do `roadmap.js`

### Funções de renderização (novas)

- `buildPhases()` — gera HTML das 4 fases no `#phases-container`, respeitando ordem original
- `buildDocs()` — gera HTML dos 23 doc blocks no `#docs`
- `buildResources()` — gera HTML dos resource cards no `#resources`
- `buildGlossary()` — gera HTML do concept grid no `#glossary`
- `buildDiscord()` — gera HTML da seção discord no `#discord`
- `renderItem(item, phaseId)` — helper que retorna o `<li>` HTML de um checklist item; emite `onclick="goToDoc('id');return false;"` quando `link.type === "doc"`

### Funções interativas (migradas do arquivo original sem alteração de lógica)

- `saveProgress()`, `loadProgress()`, `updateStats()`
- `saveNotes()`, `loadNotes()`
- `exportProgress()`, `importProgress(event)`, `exportProgressTxt()`
- `toggleDoc(header)`, `showPhase(id, btn)`, `goToDoc(docId)`
- `buildDocChecklists()` — continua usando `querySelector` no DOM gerado (não reescrever para usar ROADMAP_DATA)

### Init

```js
// Mudança intencional: DOMContentLoaded é mais robusto que execução inline no fim do <body>
document.addEventListener('DOMContentLoaded', () => {
  buildPhases();
  buildDocs();
  buildResources();
  buildGlossary();
  buildDiscord();
  loadProgress();   // deve rodar APÓS buildPhases() e buildDocs() para encontrar os checkboxes
  loadNotes();
  buildDocChecklists(); // deve rodar APÓS buildPhases() e buildDocs()
});
```

---

## Estrutura do `roadmap-ai-engineer.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Roadmap - AI Prompt Engineer & Tech Lead</title>
  <link rel="stylesheet" href="roadmap.css">
</head>
<body>
<div class="container">
  <!-- Header estático -->
  <div class="header">...</div>

  <!-- Backup bar estática -->
  <div class="backup-bar">...</div>

  <!-- Progress bar estática -->
  <div class="global-progress">...</div>

  <!-- Stats estáticas (valores preenchidos pelo JS) -->
  <div class="stats">...</div>

  <!-- Tabs estáticas -->
  <div class="tabs">...</div>

  <!-- Containers preenchidos dinamicamente pelo roadmap.js -->
  <div id="phases-container"></div>
  <div class="phase" id="docs"></div>
  <div class="phase" id="resources"></div>
  <div class="phase" id="glossary"></div>

  <!-- Notas permanecem estáticas (sem dados estruturados) -->
  <div class="phase" id="notes">...</div>

  <div class="phase" id="discord"></div>

  <div class="footer">...</div>
</div>

<script src="roadmap-data.js"></script>
<script src="roadmap.js"></script>
</body>
</html>
```

---

## Critérios de Sucesso

1. O browser renderiza identicamente ao arquivo original
2. Progresso salvo em localStorage continua funcionando após a migração
3. Notas salvas em localStorage continuam funcionando
4. Export/import de JSON funciona
5. Todos os 23 doc blocks expandem/colapsam corretamente
6. Links externos abrem em nova aba; links para docs fazem scroll/tab corretamente
7. O número total de checkboxes no DOM é idêntico ao original — verificável via `document.querySelectorAll('.checklist input').length` no console do browser
8. `buildDocChecklists()` injeta os mini-checklists nos doc blocks corretamente

---

## O que NÃO muda

- Visual: nenhuma alteração de CSS, cores, layout ou tipografia
- Funcionalidade: nenhuma feature removida ou adicionada
- localStorage: mesma chave (`ai-roadmap-progress-v2`), mesmo formato de dados (array posicional de booleans)
- URLs e links: todos preservados

---

## Impacto em Edições Futuras

| Tipo de edição | Antes | Depois |
|---|---|---|
| Adicionar item ao checklist | 47k tokens | ~20-28k tokens (só `roadmap-data.js`) |
| Corrigir estilo | 47k tokens | ~10k tokens (só `roadmap.css`) |
| Corrigir bug JS | 47k tokens | ~8k tokens (só `roadmap.js`) |
| Ver estrutura geral | 47k tokens | ~500 tokens (só HTML) |
