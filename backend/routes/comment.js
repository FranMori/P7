const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')
const multer = require('../middlewares/multer-config')

router.post('/comment', multer, commentCtrl.create)

router.get('/allComment/:id', commentCtrl.getAllTextComment)
router.get('/comment/:id', commentCtrl.getTextComment)

router.put('/comment/:id', multer, commentCtrl.modifyTextComment)

router.delete('/comment/:id', commentCtrl.deleteTextComment)


module.exports = router