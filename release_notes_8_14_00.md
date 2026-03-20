## Novidade: Inclusão do Setor no Relatório de Movimentação de Estoque

Agora o relatório de Movimentação de Estoque inclui a informação do Setor na exportação para Excel (XLS), permitindo identificar a qual setor pertence cada movimentação de entrada e baixa de OS, facilitando análises e filtros por setor diretamente na planilha.

## Novidade: Separação do Código e Descrição do Produto na Exportação Excel

No relatório de Produtos (sintético e analítico), ao exportar para Excel, o código do produto e a descrição agora são exibidos em colunas separadas. Anteriormente, ambos eram concatenados em uma única coluna. Essa separação permite o uso de fórmulas e referências diretas ao código do produto nas planilhas do cliente.

## Novidade: Validação de Empresas Permitidas na Integração API Power BI

Foi implementado um controle de acesso por empresa nas APIs de integração com o Power BI. Agora é possível configurar quais empresas cada token de acesso pode consultar, restringindo o acesso aos dados apenas das empresas autorizadas. Caso uma empresa não autorizada seja solicitada, a API retorna um erro de acesso negado (403 Forbidden). Tokens existentes continuam funcionando normalmente sem necessidade de alteração.
