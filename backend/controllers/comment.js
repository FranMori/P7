const Comment = require('../models/comment')

const create = async (req,res) => {
  Comment.create({
    text: req.body.textComment,
    userId: req.body.userId,
    subjectId: req.body.subjectId,

  }) .then(comment => res.status(201).json({comment}))
    .catch(error => res.status(401).json({error}))
}

const getAllTextComment = async (req, res) => {
  Comment.findAll({
    where: {subjectId: req.params.id}
  })
  .then(comments => res.status(200).json({comments}))
  .catch(error => res.status(400).json({error}))
}

const modifyTextComment = async (req,res) => {
  Comment.findOne({ 
    where: {id: req.body.id}

   })
 .then(function (comment) {
   if (comment) {
     comment.update({
       text: req.body.text,
       
     })
     .then(comment => res.status(200).json(comment))
   }
 })
.catch(error => res.status(400).json({error})
)}

const deleteTextComment = async (req,res) => {
    Comment.destroy ({
      where : {id: req.params.id}
    })
  .then(() => res.status(200).json({message: 'Sujet supprimé'}))
  .catch(error => res.status(400).json({error}))
  }


module.exports = {
  create, modifyTextComment, deleteTextComment, getAllTextComment
}