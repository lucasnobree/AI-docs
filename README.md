# AI Engineer Roadmap — Claude Code Workshop

Roadmap interativo para aprender a usar Claude como ferramenta de engenharia de software. Desenvolvido para workshops internos, cobre desde o básico até uso avançado com agentes, MCP e automações.

**Acesse:** [lucasnobree.github.io/AI-docs](https://lucasnobree.github.io/AI-docs/)

---

## O que tem aqui

**Roadmap interativo** com 4 fases de aprendizado, 23 documentos, glossário, recursos e FAQ — tudo navegável pelo browser, sem dependências externas.

**Materiais de configuração** prontos para uso nos projetos da empresa:
- `CLAUDE-template.md` — template de `CLAUDE.md` para novos projetos, com padrões de comunicação, git safety protocol, estrutura de agentes e prompt engineering
- `prompt-engineer-skill.md` — skill para construção guiada de prompts de produção (9 blocos)

---

## Fases do Roadmap

| Fase | Conteúdo |
|------|----------|
| **Fase 1** — Fundamentos | Clareza, few-shot, role prompting, XML tags, contexto longo |
| **Fase 2** — Avançado | Tool use, output estruturado, encadeamento, modelos e custos |
| **Fase 3** — Claude Code | Memória, agentes, segurança, plan mode, batch processing |
| **Fase 4** — Produção | Skills, recusas, tasks, Claude.ai, configuração avançada |

---

## Como usar localmente

Sem servidor necessário — abra direto no browser:

```bash
git clone https://github.com/lucasnobree/AI-docs.git
cd AI-docs
# Abra index.html no browser
```

---

## Configurando o Claude no seu projeto

Copie o `CLAUDE-template.md` para a raiz do seu repositório como `CLAUDE.md` e preencha os campos marcados com `[PREENCHER]`:

```bash
cp CLAUDE-template.md /seu-projeto/CLAUDE.md
```

O Claude lê esse arquivo automaticamente no início de cada sessão, carregando as convenções do projeto.

---

## Arquitetura

O site é data-driven: dados em `roadmap-data.js`, renderização em `roadmap.js`, estilos em `roadmap.css`, shell estático em `index.html`. Nenhum framework, nenhum servidor — funciona em `file://` e no GitHub Pages.
