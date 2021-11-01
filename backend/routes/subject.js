const express = require('express')
const router = express.Router()
const subjectCtrl = require('../controllers/subject')
const auth = require ('../middlewares/auth')
const { authJwt } = require ('../middlewares');

router.post('/subject', subjectCtrl.create)

router.get('/subject',  subjectCtrl.getSubjectInfos)
router.get('/subject/:id',  subjectCtrl.getTextSubject)

router.put('/subject/:id', subjectCtrl.modifyTextSubject)

router.delete('/subject/:id', subjectCtrl.deleteTextSubject)


module.exports = router