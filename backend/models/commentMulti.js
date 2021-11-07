const Sequelize = require ('sequelize');
const { modifyTextComment } = require('../controllers/comment');
const sequelize = require ('../util/database')

const CommentMulti = sequelize.define('commentmulti', {
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
  multimediaId: {
    type: Sequelize.INTEGER,
    allowNul:false,
    references: {
      model:'multimedia',
      key:'id'
    }
  },



  

 

})

module.exports = CommentMulti;