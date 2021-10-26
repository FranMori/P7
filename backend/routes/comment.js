const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comment')
const auth = require ('../middlewares/auth')

router.post('/comment', commentCtrl.create)

router.get('/comment/:id', commentCtrl.getTextComment)

router.put('/comment/:id', commentCtrl.modifyTextComment)

router.delete('/comment/:id', commentCtrl.deleteTextComment)


module.exports = router