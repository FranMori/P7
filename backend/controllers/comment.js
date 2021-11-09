const Comment = require('../models/comment')

const create = async (req,res) => {
  const commentObject = req.file ? {
    text: req.body.text,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: req.body.userId,
    subjectId: req.body.subjectId
  } : {
    text: req.body.text,
    userId: req.body.userId,
    subjectId: req.body.subjectId

  }
  Comment.create({ 
    ...commentObject
  }).then(comment => res.status(201).json({comment}))
      .catch(error => res.status(401).json({error}))
  
}

const getAllTextComment = async (req, res) => {
  Comment.findAll({
    where: {subjectId: req.params.id}
  })
  .then(comments => res.status(200).json({comments}))
  .catch(error => res.status(400).json({error}))
}

const getTextComment = async (req,res) => {
  Comment.findOne({
    where: {id: req.params.id}
  })
  .then(comment => res.status(200).json(comment))
  .catch(error => res.status(400).json({error}))
}

const modifyTextComment = async (req,res) => {
  const commentObject = req.file ? {
   text: req.body.text,
   image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
 } : {
   text: req.body.text,
 }
 Comment.findOne({ 
   where: {id: req.params.id}

  })
.then(function (comment) {
  if (comment) {
    comment.update({
      ...commentObject       
    })
    .then(newComment => res.status(200).json(newComment))
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
  create, modifyTextComment, deleteTextComment, getAllTextComment, getTextComment
}