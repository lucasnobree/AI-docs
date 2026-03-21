---
name: prompt-engineer
description: Use quando o usuário pedir para criar, melhorar ou estruturar um prompt de produção — para agentes, APIs, automações ou system prompts de projetos internos.
---

# Prompt Engineer

Quando esta skill for invocada, siga este processo para construir um prompt de produção completo.

## O que é um "prompt de produção"

Um prompt que vai entrar num sistema real: system prompt de agente, integração com API, automação, CLAUDE.md de projeto, configuração de chatbot interno. Não é uma conversa casual.

## Processo

### 1. Entender o objetivo (faça UMA pergunta de cada vez)

Pergunte:
- **O que** o agente/sistema vai fazer? (função principal)
- **Quem** vai usar? (desenvolvedor, cliente final, sistema automatizado)
- **Qual o contexto** de execução? (Claude Code, API direta, integração interna)
- **Que ferramentas** o agente terá disponíveis? (se aplicável)
- **Quais são os limites** — o que ele NUNCA deve fazer?

### 2. Montar o prompt na estrutura dos 9 blocos

```
1. ROLE
   "Você é [X] especializado em [Y] para [contexto da empresa]."
   → Primeira linha. Define identidade antes de tudo.

2. SEGURANÇA
   - Ações proibidas (irreversíveis, destrutivas)
   - O que requer confirmação explícita
   - Proteção contra prompt injection

3. INSTRUÇÕES
   <instructions>
   [O que o agente faz, como, com que nível de autonomia]
   </instructions>

4. FERRAMENTAS
   <tools>
   [Quando usar cada ferramenta disponível. Proibir Bash quando tool dedicada existe.]
   </tools>

5. TOM & ESTILO
   <tone>
   - Idioma: pt-BR
   - Sem bajulação, sem preâmbulo
   - Formato de resposta esperado
   - Anti-patterns proibidos
   </tone>

6. MEMÓRIA (se aplicável)
   [Tipos: user, feedback, project, reference — e o que salvar em cada um]

7. CONTEXTO DINÂMICO
   <env>
   [Informações de ambiente injetadas em runtime: projeto, stack, diretório]
   </env>

8. EXEMPLOS
   <examples>
   <example>
     user: [input típico]
     assistant: [output esperado]
   </example>
   </examples>

9. SYSTEM REMINDERS (se necessário)
   [Lembretes críticos que precisam ser reforçados]
```

### 3. Regras de qualidade (aplique sempre)

- **XML tags** para separar todos os blocos — `<instructions>`, `<context>`, `<examples>`, `<input>`
- **Instruções positivas** ("faça X") em vez de negativas ("não faça Y")
- **3-5 exemplos concretos** com `<example>` tags — especialmente para outputs com formato específico
- **Documentos longos no topo** do prompt, acima das instruções
- **Sem preâmbulo** — instrua explicitamente: "Responda diretamente sem preâmbulo"
- **Role na primeira linha** — sempre

### 4. Entregar

Entregue o prompt formatado e pronto para uso. Ao final, explique brevemente:
- O que cada bloco faz
- O que pode ser ajustado para o contexto específico
- Como testar se está funcionando

## Exemplo de invocação

Usuário diz: "Quero criar um agente que responde dúvidas de clientes sobre nosso sistema"

→ Faça as perguntas do passo 1 uma a uma, depois monte o prompt completo nos 9 blocos.
