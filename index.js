const express = require('express')
const { connDB } = require('./createTable')
const pool = require('./dataBaseConnection')
const { csvStream } = require('./insertCsv')

const app = express()
const port = 3000

app.get('/create-db', (req, res) => {
    res.end(() => {
        connDB().then(res => {
            if (res) {
                console.log(`Table created`)
            }
        })
    })
})

app.get('/insert-data', (req, res) =>{
    res.end(() =>{
        csvStream()
    })
})

app.get("/all-transactions-sum", async (req, res) =>{
    const query = `SELECT SUM(valor_transacao) AS soma FROM cpgf;`
    const sum = await pool.query(query)
    res.send({"Resposta questão K": sum.rows})
})

app.get("/classified-transactions-sum", async (req, res) =>{
    const query = `SELECT SUM(valor_transacao) FROM cpgf WHERE transacao = 'Informações protegidas por sigilo';`
    const sum = await pool.query(query)
    res.send({"Resposta questão L": sum.rows})
})

app.get("/org-classified-transaction-sum", async (req, res) =>{
    const query = `SELECT nome_org, SUM(valor_transacao) AS soma FROM cpgf GROUP BY nome_org ORDER BY soma DESC;`
    const sum = await pool.query(query)
    res.send({"Resposta questão M": sum.rows[0]})
})

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

app.get("/most-favored", async (req, res) =>{
    const query = `SELECT nome_favorecido,
    COUNT(nome_favorecido) AS quantidade
    FROM cpgf 
    GROUP BY nome_favorecido 
    ORDER BY quantidade DESC;`
    const sum = await pool.query(query)
    res.send({"Resposta questão O": sum.rows[3]})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})