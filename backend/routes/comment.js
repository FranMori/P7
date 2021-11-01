const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')

router.post('/comment', commentCtrl.create)

router.get('/comment/:id', commentCtrl.getAllTextComment)

router.put('/comment', commentCtrl.modifyTextComment)

router.delete('/comment/:id', commentCtrl.deleteTextComment)


module.exports = router