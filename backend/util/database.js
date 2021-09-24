const Sequelize = require ('sequelize')


const sequelize = new Sequelize('groupomania', 'root', 'bouftou80', {
  host: 'localhost',
  dialect: 'mysql'
})


module.exports = sequelize