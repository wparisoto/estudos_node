const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodesequelize', 'wagner', '124617wp', {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Conectado com sucesso com o sequelize')
} catch (err) {
  console.log('Nao foi possivel conectar: ' + err)
}

module.exports = sequelize
