const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('toughts', 'postgres', '124617wp', {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
})

try {
  sequelize.authenticate()
  console.log('Conectamos com o Sequelize!')
} catch (error) {
  console.error('Não foi possível conectar:', error)
}

module.exports = sequelize
