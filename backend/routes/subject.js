const express = require('express')
const router = express.Router()
const subjectCtrl = require('../controllers/subject')


router.post('/subject', subjectCtrl.create)

router.get('/subject',  subjectCtrl.getSubjectInfos)
router.get('/subject/:id',  subjectCtrl.getTextSubject)
router.get ('/subject/author/:id', subjectCtrl.getAuthor)


router.put('/subject/:id', subjectCtrl.modifyTextSubject)

router.delete('/subject/:id', subjectCtrl.deleteTextSubject)


module.exports = router