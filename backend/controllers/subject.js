const Subject = require('../models/subject')
const User = require ('../models/user')

const create = async (req,res) => {
  const subjectObject = req.file ? {
    title: req.body.title,
    text: req.body.text,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    userId: req.body.userId
  } : {
    title: req.body.title,
    text: req.body.text,
    userId: req.body.userId
  }
  Subject.create({ 
    ...subjectObject
  }).then(subject => res.status(201).json({subject}))
      .catch(error => res.status(401).json({error}))
  
}

const getSubjectInfos = async (req,res) => {
  Subject.findAll()
  .then(subjects => res.status(200).json({subjects}))
  .then(error => res.status(400).json({error}))
}

const getTextSubject = async (req, res) => {
  Subject.findOne ({
    where : {id: req.params.id}
  })
  .then(subject => res.status(200).json(subject))
  .catch(error => res.status(400).json({error}))
}

const modifyTextSubject = async (req,res) => {
   const subjectObject = req.file ? {
    title: req.body.title,
    text: req.body.text,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  } : {
    title: req.body.title,
    text: req.body.text,
  }
  Subject.findOne({ 
    where: {id: req.params.id}

   })
 .then(function (subject) {
   if (subject) {
     subject.update({
       ...subjectObject       
     })
     .then(newSubject => res.status(200).json(newSubject))
   }
 })
.catch(error => res.status(400).json({error})
)}

const deleteTextSubject = async (req,res) => {
    Subject.destroy ({
      where : {id: req.params.id}
    })
  .then(() => res.status(200).json({message: 'Sujet supprimé'}))
  .catch(error => res.status(400).json({error}))
  }

  const getAuthor = async (req, res) => {
    Subject.findOne ({
      where : {id: req.params.id}
    })
    .then(subject => {
      let userId = subject.userId
      User.findOne({
          where : {id: userId}
        }).then((auteur) => res.status(200).json(auteur))
      }) 
    .catch(error => res.status(400).json({error}))
  }


module.exports = {
  create, getSubjectInfos, getTextSubject, modifyTextSubject, deleteTextSubject, getAuthor
}