const Comment = require('../models/comment')

const create = async (req,res) => {
  Comment.create(
    text = req.body.textComment,
    subjectId = req.params.id
  ) .then(comment => res.status(201).json({comment}))
    .catch(error => res.status(401).json({error}))
}


const getTextComment = async (req, res) => {
  Comment.findOne ({
    where : {id: req.params.id}
  })
  .then(commentText => res.status(200).json(commentText))
  .catch(error => res.status(400).json({error}))
}

const modifyTextComment = async (req,res) => {
  Comment.findOne({ 
    where: {id: req.params.id}

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
  create, getTextComment, modifyTextComment, deleteTextComment,
}