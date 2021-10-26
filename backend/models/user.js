const Sequelize = require ('sequelize')
const sequelize = require ('../util/database')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNul: false,
    primaryKey: true,

  },

  email: {
    type: Sequelize.STRING,
    allowNul: false,
    unique: true,
  },

  prenom: {
    type: Sequelize.STRING,
    allowNul: false,

  },

  nom: {
    type: Sequelize.STRING,
    allowNul: false,

  },
  password: {
    type: Sequelize.STRING,
    allowNul: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNul: true,
  }

})

module.exports = User;