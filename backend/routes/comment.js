const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')
const multer = require('../middlewares/multer-config')
const verifyToken = require('../middlewares/authJwt')


router.post('/comment', verifyToken, multer, commentCtrl.create)

router.get('/allComment/:id', verifyToken, commentCtrl.getAllTextComment)
router.get('/comment/:id', verifyToken, commentCtrl.getTextComment)

router.put('/comment/:id', verifyToken, multer, commentCtrl.modifyTextComment)

router.delete('/comment/:id', verifyToken, commentCtrl.deleteTextComment)


module.exports = router