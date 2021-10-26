const Sequelize = require ('sequelize')
const sequelize = require ('../util/database');
const User = require('./user');

const Subject = sequelize.define('subject', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNul: false,
    primaryKey: true,

  },

  title: {
    type: Sequelize.STRING,
    allowNul: false,
    unique: true,
  },

  text: {
    type: Sequelize.TEXT,
    allowNul: false,

  },
  userId: {
    type: Sequelize.INTEGER,
    allowNul:false,
    references: {
      model:'users',
      key:'id'
    }

  }
  
 

})


module.exports = Subject;