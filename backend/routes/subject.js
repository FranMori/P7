const express = require('express')
const router = express.Router()
const subjectCtrl = require('../controllers/subject')
const multer = require('../middlewares/multer-config')


router.post('/subject', multer, subjectCtrl.create)

router.get('/subject',  subjectCtrl.getSubjectInfos)
router.get('/subject/:id',  subjectCtrl.getTextSubject)
router.get ('/subject/author/:id', subjectCtrl.getAuthor)


router.put('/subject/:id', multer, subjectCtrl.modifyTextSubject)

router.delete('/subject/:id', subjectCtrl.deleteTextSubject)


module.exports = router