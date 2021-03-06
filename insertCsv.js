const pool = require('./dataBaseConnection.js')
const fs = require('fs')
const fastcsv = require('fast-csv')

let stream = fs.createReadStream('202110_CPGF.csv')
let csvData = []

function csvStream() {
   let streamCSV = fastcsv
        .parse({
            delimiter: ';',
            quote: '"'
        })
        .on('data', data => {
            csvData.push(data)
        })
        .on("end", () => {
            csvData.shift()
            csvData.forEach(i => {
                if (i[8] == "") {
                    i[8] = null
                }
                if (i[13] == "") {
                    i[13] = null
                }
                i[14] = i[14].replace(",", ".")
            })
            const query = 'INSERT INTO cpgf (cod_org_sup, nome_org_sup, cog_org, nome_org, cod_uni_ges, nome_uni_ges, ano_extrato, mes_extrato, cpf_portador, nome_portador, doc_favorecido, nome_favorecido, transacao, data_transacao, valor_transacao) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15);'


            csvData.forEach(row => {
                pool.query(query, row, (err, res) => {
                    if (err) {
                        console.error(err)
                    } else {
                        console.log("inserted " + res.rowCount + " row:", row)
                    }

                })
            })

        })

    stream.pipe(streamCSV)
    return fastcsv
} 

module.exports.csvStream = csvStream