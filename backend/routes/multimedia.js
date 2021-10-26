const express = require('express')
const router = express.Router()
const multimediaCtrl = require('../controllers/multimedia')
const multer = require('../middlewares/multer-config')

const auth = require ('../middlewares/auth')

router.post('/multimedia', multer, multimediaCtrl.create)

router.get('/multimedia', multimediaCtrl.getMultimediaInfos)
router.get('/multimedia/:id', multimediaCtrl.getMultimedia)

router.put('/multimedia/:id', multer, multimediaCtrl.modifyMultimedia)

router.delete('/multimedia/:id', multimediaCtrl.deleteMultimedia)


module.exports = router