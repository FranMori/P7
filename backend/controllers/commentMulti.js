const CommentMulti = require('../models/commentMulti')

const create = async (req,res) => {
  CommentMulti.create({
    text: req.body.text,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: req.body.userId,
    multimediaId: req.body.multimediaId,

  }) .then(comment => res.status(201).json({comment}))
    .catch(error => res.status(401).json({error}))
}

const getAllMultiComment = async (req, res) => {
  CommentMulti.findAll({
    where: {multimediaId: req.params.id}
  })
  .then(commentMultis => res.status(200).json({commentMultis}))
  .catch(error => res.status(400).json({error}))
}

const getMultiComment = async (req,res) => {
  CommentMulti.findOne({
    where: {id: req.params.id}
  })
  .then(comment => res.status(200).json(comment))
  .catch(error => res.status(400).json({error}))
}

const modifyMultiComment = async (req, res) => {
  CommentMulti.findOne({ 
    where: {id: req.params.id}

   })
 .then(function (comment) {
   if (comment) {
     comment.update({
       text: req.body.text,
       image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`       
     })
     .then(newComment => res.status(200).json(newComment))
   }
 })
.catch(error => res.status(400).json({error})
)}

const deleteMultiComment = async (req,res) => {
    CommentMulti.destroy ({
      where : {id: req.params.id}
    })
  .then(() => res.status(200).json({message: 'Sujet supprimé'}))
  .catch(error => res.status(400).json({error}))
  }


module.exports = {
  create, modifyMultiComment, deleteMultiComment, getAllMultiComment, getMultiComment
}