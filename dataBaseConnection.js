require('dotenv/config')
const { Client } = require('pg')

const client = new Client({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
})

module.exports = client