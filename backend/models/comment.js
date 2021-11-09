const Sequelize = require ('sequelize')
const sequelize = require ('../util/database')

const Comment = sequelize.define('comment', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNul: false,
    primaryKey: true,

  },

  text: {
    type: Sequelize.TEXT,
    allowNul: false,

  },
  image: {
    type:Sequelize.STRING,
    allowNul:true
  },

  userId: {
    type: Sequelize.INTEGER,
    allowNul:false,
    references: {
      model:'users',
      key:'id'
    }

  },
  subjectId: {
    type: Sequelize.INTEGER,
    allowNul:false,
    references: {
      model:'subjects',
      key:'id'
    }
  },
 

})

module.exports = Comment;