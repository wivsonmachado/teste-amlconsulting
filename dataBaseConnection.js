require('dotenv/config')
const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: 20,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0
})

module.exports = pool