const Multimedia = require('../models/multimedia')

const create = async (req,res) => {
  Multimedia.create({
    title: req.body.title,
    text: req.body.text,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

  }) .then(multimedia => res.status(201).json(multimedia))
    .catch(error => res.status(401).json({error}))
}

const getMultimediaInfos = async (req,res) => {
  Multimedia.findAll()
  .then(multimedias => res.status(200).json({multimedias}))
  .then(error => res.status(400).json({error}))
}

const getMultimedia = async (req, res) => {
  Multimedia.findOne ({
    where : {id: req.params.id}
  })
  .then(multimedia => res.status(200).json(multimedia))
  .catch(error => res.status(400).json({error}))
}

const modifyMultimedia = async (req,res) => {
  Multimedia.findOne({ 
    where: {id: req.params.id}

   })
 .then(function (multimedia) {
   if (multimedia) {
     multimedia.update({
       title: req.body.title,
       text: req.body.text,
       image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
     })
     .then(newMultimedia => res.status(200).json(newMultimedia))
   }
 })
.catch(error => res.status(400).json({error})
)}

const deleteMultimedia = async (req,res) => {
    Multimedia.destroy ({
      where : {id: req.params.id}
    })
  .then(() => res.status(200).json({message: 'Multimedia supprimé'}))
  .catch(error => res.status(400).json({error}))
  }


module.exports = {
  create, getMultimediaInfos, getMultimedia, modifyMultimedia, deleteMultimedia,
}