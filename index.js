const express = require('express')
const { connDB } = require('./createTable')
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





app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})