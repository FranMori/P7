const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')

router.post('/comment', commentCtrl.create)

router.get('/allComment/:id', commentCtrl.getAllTextComment)
router.get('/comment/:id', commentCtrl.getTextComment)

router.put('/comment/:id', commentCtrl.modifyTextComment)

router.delete('/comment/:id', commentCtrl.deleteTextComment)


module.exports = router