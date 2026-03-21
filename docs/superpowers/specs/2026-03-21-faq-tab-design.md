# Spec: Aba FAQ para Workshop Claude

**Data:** 2026-03-21
**Objetivo:** Adicionar uma aba "FAQ" ao roadmap, com ~20 perguntas e respostas em formato accordion, organizada em 7 grupos temáticos — servindo como referência permanente para a equipe de desenvolvimento.

---

## Contexto

O roadmap (`roadmap-ai-engineer.html`) segue arquitetura data-driven com 4 arquivos:
- `roadmap-ai-engineer.html` — shell estático
- `roadmap.css` — todo o CSS
- `roadmap-data.js` — `const ROADMAP_DATA = {...}` com todos os dados
- `roadmap.js` — funções de renderização e interatividade

A aba FAQ se encaixa nessa arquitetura sem exceções.

---

## Arquitetura de Arquivos

Apenas 3 dos 4 arquivos precisam de modificação:

```
roadmap-ai-engineer.html   — adiciona tab button + container vazio #faq
roadmap-data.js            — adiciona campo `faq` em ROADMAP_DATA
roadmap.js                 — adiciona buildFaq() + chama no DOMContentLoaded
roadmap.css                — SEM ALTERAÇÕES
```

---

## Schema de Dados (`roadmap-data.js`)

Novo campo `faq` em `ROADMAP_DATA`:

```js
faq: [
  {
    group: String,   // título do grupo: "O que é o Claude", "Skills e Plugins", etc.
    items: [
      {
        q: String,   // pergunta
        a: String,   // resposta (texto puro, sem HTML)
        link: {
          text: String,             // label do link (ex: "Ver Doc 10", "Documentação oficial")
          type: "ext" | "doc",      // externo ou link para doc block existente
          url: String | null,       // preenchido quando type === "ext"
          docId: String | null      // preenchido quando type === "doc"
        } | null                    // null se não houver link de referência
      }
    ]
  }
]
```

**Nota:** O schema de `link` acima é específico para `buildFaq()` e independente do schema de `link` usado nos itens das fases (que usa `badge` em vez de `text`). `buildFaq()` não reutiliza `renderItem()` — é uma função de renderização própria.

### Grupos e perguntas

**Grupo 1 — O que é o Claude**
1. O que é o Claude e o que o diferencia do ChatGPT/Copilot?
2. Quais são os modelos disponíveis (Opus, Sonnet, Haiku) e quando usar cada um?
3. O Claude tem acesso à internet?

**Grupo 2 — Como usamos aqui**
4. Qual a diferença entre a extensão do VS Code, o Claude Code CLI e o Claude.ai?
5. O que consigo fazer com a extensão do VS Code no dia a dia?
6. Casos de uso práticos: o que devs fazem com Claude no trabalho?

**Grupo 3 — Contexto e memória**
7. O que é "contexto" no Claude? Por que ele "esquece" coisas?
8. O que é a janela de contexto e por que ela importa?
9. Como o Claude sabe sobre o meu projeto/codebase?

**Grupo 4 — Arquivos .md e configuração**
10. O que são arquivos `.md` (Markdown)?
11. O que é o `CLAUDE.md` e para que serve?
12. O que posso configurar no Claude Code?
13. O que são as `memories` e como funcionam?

**Grupo 5 — Como usar bem**
14. Como escrever prompts eficientes?
15. Quais os erros mais comuns ao usar o Claude?
16. Como obter respostas mais consistentes e precisas?

**Grupo 6 — Skills e Plugins**
17. O que são Skills?
18. O que são Plugins?
19. Qual a diferença entre Skills e Plugins?
20. Como instalo ou uso uma skill/plugin?

**Grupo 7 — Limites e segurança**
21. Posso integrar o Claude nos sistemas da empresa?
22. O Claude é seguro para dados sensíveis do projeto?
23. Quais são os limites do Claude? O que ele não faz bem?

---

## Estrutura do `roadmap-ai-engineer.html`

Adicionar tab button (após a tab "Discord"):
```html
<button class="tab-btn" onclick="showPhase('faq',this)">FAQ</button>
```

Adicionar container (após `<div class="phase" id="discord"></div>`):
```html
<div class="phase" id="faq"></div>
```

---

## Estrutura do `roadmap.js`

### `buildFaq()`

Função de renderização independente — não reutiliza `renderItem()`. Template HTML gerado por item:

```html
<!-- Por grupo -->
<div class="section">
  <h3>O que é o Claude</h3>

  <!-- Por item dentro do grupo -->
  <div class="doc-block">
    <div class="doc-header" onclick="toggleDoc(this)">
      <h3>O que é o Claude e o que o diferencia do ChatGPT/Copilot?</h3>
      <span class="arrow">&#9660;</span>
    </div>
    <div class="doc-body">
      <p>Texto da resposta...</p>
      <!-- Condicional: só renderiza se item.link !== null -->
      <!-- Para type "ext": -->
      <a class="link-out" href="URL" target="_blank">Texto do link &rarr;</a>
      <!-- Para type "doc": -->
      <a class="link-out" href="#" onclick="goToDoc('doc-modelos');return false;">Ver Doc 10 &rarr;</a>
    </div>
  </div>
</div>
```

**Nota:** O estado colapsado do `.doc-body` é controlado por CSS via ausência da classe `open` — **não usar `style="display:none"`**. O `toggleDoc()` opera com `classList.toggle('open')`, consistente com `buildDocs()` existente (roadmap.js linha 107-119). A classe usada na seta é `arrow` (não `doc-toggle`), alinhada com o padrão existente.

**Regra crítica — `buildDocChecklists()` não escaneia FAQ:** `buildDocChecklists()` usa `querySelectorAll('#phase1 .checklist li, #phase2 .checklist li, #phase3 .checklist li, #phase4 .checklist li')` — ela só escaneia as 4 fases. Links `type: "doc"` no FAQ navegam via `goToDoc()` mas **não** criam entradas nos doc-checklists. Isso é o comportamento correto e esperado.

**Regra — posição no init:** `buildFaq()` deve ser chamada antes de `loadProgress()` por convenção arquitetural (todos os builders antes das funções de estado). Como FAQ não tem checkboxes, a ordem relativa a `loadProgress()` não tem impacto funcional no índice do localStorage.

### Init atualizado

```js
document.addEventListener('DOMContentLoaded', () => {
  buildPhases();
  buildDocs();
  buildResources();
  buildGlossary();
  buildDiscord();
  buildFaq();         // nova linha
  loadProgress();
  loadNotes();
  buildDocChecklists();
});
```

---

## Visual

- Cada **grupo** é um `<div class="section">` com `<h3>` como título
- Cada **pergunta** é um `<div class="doc-block">` com header clicável (`toggleDoc`)
- A **resposta** fica no corpo do doc-block, colapsada por padrão
- Links de referência aparecem no rodapé do item, estilo `link-out`
- Itens do grupo "Como usar bem" podem linkar para os doc blocks existentes via `goToDoc()`

---

## O que NÃO muda

- CSS: zero alterações
- localStorage: sem novas chaves, sem impacto no progresso existente
- Checkboxes: FAQ não tem checkboxes — não afeta o índice posicional do `loadProgress()`
- Todas as funções existentes: sem alterações de lógica

---

## Critérios de Sucesso

1. Nova aba "FAQ" aparece na nav e exibe conteúdo ao clicar
2. Cada pergunta expande/colapsa ao clicar (accordion)
3. Links para doc blocks fazem scroll/tab corretamente via `goToDoc()`
4. Links externos abrem em nova aba
5. Nenhuma regressão nas outras abas (progresso, notas, checkboxes)
6. `document.querySelectorAll('.checklist input').length` retorna o mesmo valor de antes da implementação — verificar no console antes de iniciar (valor de referência atual: 76 checkboxes)
