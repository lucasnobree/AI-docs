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
