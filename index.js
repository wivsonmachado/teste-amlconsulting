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




app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})