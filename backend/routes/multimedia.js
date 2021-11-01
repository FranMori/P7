const express = require('express')
const router = express.Router()
const multimediaCtrl = require('../controllers/multimedia')
const multer = require('../middlewares/multer-config')
const { authJwt } = require ('../middlewares');

const auth = require ('../middlewares/auth')

router.post('/multimedia', authJwt.verifyToken, multer, multimediaCtrl.create)

router.get('/multimedia', authJwt.verifyToken, multimediaCtrl.getMultimediaInfos)
router.get('/multimedia/:id', authJwt.verifyToken, multimediaCtrl.getMultimedia)

router.put('/multimedia/:id', authJwt.verifyToken, multer, multimediaCtrl.modifyMultimedia)

router.delete('/multimedia/:id', authJwt.verifyToken, multimediaCtrl.deleteMultimedia)


module.exports = router