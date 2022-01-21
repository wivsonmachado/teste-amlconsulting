# Teste AML Consulting

## Questões

- Com suas palavras explique o que é lavagem de dinheiro.
    > Lavagem de dinheiro é qualquer meio que possa transformar dinheiro ilícito em lícito, 
    > a fimde ocultar atos ilícitos das autoridades competentes.

- O que é Cartão de Pagamento do Governo Federal (CPGF), e qual a sua finalidade.
    > É um meio de pagamento utlizado pelo governo federal semelhante ao cartão de crédito,
    > propociona à administração publica mais agilidade, controle e modernidade na gestão
    > de recursos.

- Quem pode utilizar o CPGF?
    > O servidor que detenha autorização para proceder à execução financeira, com destinação
    > estabelecida pelo Ordenador de Despesas.

- Qual a URL onde é possível fazer o download dos arquivos do CPGF?
    > https://www.portaltransparencia.gov.br/download-de-dados

- Qual a URL da paǵina com a descrição dos campos (ou dicionário de dados) da CPGF?
    > https://www.portaldatransparencia.gov.br/pagina-interna/603393-dicionario-de-dados-cpgf

- É possível identificar o nome e o documento do portador do CPGF, em todas as
movimentações ou há movimentações onde não é possível identificar o portador?
    > Baseado no aquivo *Cartão de Pagamento do Governo Federal (CPGF)* existem algumas
    > movimentações onde não é possivel identificar o nome e o documento do portador.

- É possível identificar o Órgão do portador do CPGF?
    > Sim, é possivel.
- Qual o nome do Órgão cujo código é 20402?
    > Agência Espacial Brasileira

- É possível identificar o Nome e Documento (CNPJ) dos favorecidos pela utilização do
CPGF?
    > Sim é possivel, porém em alguns casos de *compra A/V* não consta informação ou documento do favorecido e nos casos de movimentações sigilosas também não é possivel identificar nome ou documento do favorecido.

- É possível identificar a data e o valor das movimentações financeiras do CPGF, em
todas as movimentações? Ou há movimentações onde não é possível identificar as datas e
ou valores?
    > Há movimentações classificadas como sigilosas onde não é possivel identificar as datas das movimentações.

- (código) Qual a soma total das movimentações utilizando o CPGF?
    > A soma total das movimentações é de R$ 5.619.007,00
    ```JavaScript
    app.get("/classified-transactions-sum", async (req, res) =>{
        const query = `SELECT SUM(valor_transacao) FROM cpgf WHERE transacao = 'Informações protegidas por sigilo';`
        const sum = await pool.query(query)
        res.send({"Resposta questão L": sum.rows})
    })
    ```

- (código) Qual a soma das movimentações sigilosas ?
    > A soma total das movimentações sigilosas é de R$ 3.108.731,15
    ```JavaScript
    app.get("/classified-transactions-sum", async (req, res) =>{
        const query = `SELECT SUM(valor_transacao) FROM cpgf WHERE transacao = 'Informações protegidas por sigilo';`
        const sum = await pool.query(query)
        res.send({"Resposta questão L": sum.rows})
    })
    ```

- (código) Qual o Órgão que mais realizou movimentações sigilosas no período e qual o valor (somado)?
    > O órgão que mais realizou movimentações sigilosas foi a Presidência da República e o valor somado é de R$ 1.715.145,14
    ```JavaScript
    app.get("/org-classified-transaction-sum", async (req, res) =>{
        const query = `SELECT nome_org, SUM(valor_transacao) AS soma FROM cpgf GROUP BY nome_org ORDER BY soma DESC;`
        const sum = await pool.query(query)
        res.send({"Resposta questão M": sum.rows[0]})
    })
    ```

- (código) Qual o nome do portador que mais realizou saques no período? Qual a soma
dos saques realizada por ele? Qual o nome do Órgão desse portador?
    > O portador que mais realizou saques foi o **Rafael Ferreira Costa** a soma dos saques foi de R$ 24.520,00 e ele pertence ao **Instituto Chico Mendes de Conservação da Biodiversidade**
    ```JavaScript
    app.get("/most-user-cash-atm", async (req, res) =>{
        const query = `SELECT
        nome_org,
        nome_portador,
        SUM(valor_transacao) AS soma 
        FROM cpgf 
        WHERE transacao = 'SAQUE CASH/ATM BB' OR transacao = 'SAQUE - INT$ - APRES' 
        GROUP BY nome_org, nome_portador
        ORDER BY soma DESC;`
        const sum = await pool.query(query)
        res.send({"Resposta questão N": sum.rows[0]})
    })
    ```

- (código) Qual o nome do favorecido que mais recebeu compras realizadas utilizando o
CPGF?
    > O favorecido que mais recebeu foi o **MERCADOPAGO.COM REPRESENTACOES LTDA.** com **123** compras realizadas.
    ```JavaScript
    app.get("/most-favored", async (req, res) =>{
        const query = `SELECT nome_favorecido,
        COUNT(nome_favorecido) AS quantidade
        FROM cpgf 
        GROUP BY nome_favorecido 
        ORDER BY quantidade DESC;`
        const sum = await pool.query(query)
        res.send({"Resposta questão O": sum.rows[3]})
    })
    ```

- Descreva qual a abordagem utilizada para desenvolver o código para os ítens de K a O.
