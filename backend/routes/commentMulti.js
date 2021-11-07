const express = require('express')
const router = express.Router()
const commentMultiCtrl = require('../controllers/commentMulti')
const multer = require('../middlewares/multer-config')

router.post('/commentMulti', multer, commentMultiCtrl.create)

router.get('/allCommentMulti/:id', commentMultiCtrl.getAllMultiComment)
router.get('/commentMulti/:id', commentMultiCtrl.getMultiComment)

router.put('/commentMulti/:id', multer, commentMultiCtrl.modifyMultiComment)

router.delete('/commentMulti/:id', commentMultiCtrl.deleteMultiComment)


module.exports = router