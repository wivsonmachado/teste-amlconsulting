const pool = require('./dataBaseConnection.js')


const connDB = async () => {
  try {
    
    const query = `CREATE TABLE IF NOT EXISTS cpgf (
      cod_org_sup INT,
      nome_org_sup VARCHAR (200),
      cog_org INT,
      nome_org VARCHAR (200),
      cod_uni_ges INT,
      nome_uni_ges VARCHAR (200),
      ano_extrato INT,
      mes_extrato INT,
      cpf_portador VARCHAR (14) NULL,
      nome_portador VARCHAR (200),
      doc_favorecido VARCHAR(14),
      nome_favorecido VARCHAR (200),
      transacao VARCHAR (50),
      data_transacao DATE NULL,
      valor_transacao DECIMAL(15, 2)
    );`

    await pool.query(query)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports.connDB = connDB

