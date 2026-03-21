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
    },
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
  ],
  docs: [],
  resources: [
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
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Prompt Engineering Guide (Oficial)', desc: 'Guia consolidado #1. A aba "Documentacao" deste painel resume todos os pontos-chave.', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Modelos Claude - Comparativo', desc: 'Opus vs Sonnet vs Haiku. Capacidades, limites, precos.', url: 'https://docs.anthropic.com/en/docs/about-claude/models' },
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Tool Use (Function Calling)', desc: 'Base para agentes. Leia antes da Fase 3.', url: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use/overview' },
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Claude Code Docs', desc: 'Voce ja usa. Entenda como funciona por dentro.', url: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview' },
    { section: 'Documentacao Essencial', tag: 'docs', title: 'Context Caching', desc: 'Reduzir custo e latencia cacheando prompt. Para producao.', url: 'https://docs.anthropic.com/en/docs/build-with-claude/context-caching' },
    { section: 'Ferramentas', tag: 'tool', title: 'Anthropic Workbench', desc: 'Testar prompts com diferentes parametros em tempo real. Use DIARIAMENTE.', url: 'https://console.anthropic.com/workbench' },
    { section: 'Ferramentas', tag: 'tool', title: 'Anthropic Console', desc: 'API keys, uso, custos. Seu painel de controle.', url: 'https://console.anthropic.com/' },
    { section: 'Ferramentas', tag: 'tool', title: 'Claude Code (Fonte)', desc: 'Codigo-fonte aberto. Agente real para estudar.', url: 'https://github.com/anthropics/claude-code' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'book', title: 'Anthropic Research Blog', desc: 'Papers e posts sobre safety e como modelos funcionam.', url: 'https://www.anthropic.com/research' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'book', title: "Simon Willison's Blog", desc: 'O melhor blog sobre IA pratica. Posts diarios.', url: 'https://simonwillison.net/' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'book', title: 'Latent Space', desc: 'Podcast tecnico com engenheiros que constroem com LLMs.', url: 'https://www.latent.space/' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'book', title: 'Anthropic YouTube', desc: 'Videos, demos e tutoriais oficiais.', url: 'https://www.youtube.com/@anthropic-ai' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'community', title: 'Anthropic Discord', desc: 'Comunidade oficial. Prompt engineering, showcases.', url: 'https://discord.gg/anthropic' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'community', title: 'r/ClaudeAI', desc: 'Discussoes praticas sobre Claude.', url: 'https://reddit.com/r/ClaudeAI' },
    { section: 'Blogs, Podcasts & Comunidades', tag: 'community', title: 'r/PromptEngineering', desc: 'Tecnicas de prompt engineering.', url: 'https://reddit.com/r/PromptEngineering' }
  ],
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
};
