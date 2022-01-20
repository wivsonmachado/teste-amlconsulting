const express = require('express')
const { connDB } = require('./createTable')
const { csvStream } = require('./insertCsv')

const app = express()
const port = 3000

app.get('/createDb', (req, res) => {
    res.end(() => {
        connDB().then(res => {
            if (res) {
                console.log(`Table created`)
            }
        })
    })
})

app.get('/insertData', (req, res) =>{
    res.end(() =>{
        csvStream()
    })
})





app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})