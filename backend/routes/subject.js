const express = require('express')
const router = express.Router()
const subjectCtrl = require('../controllers/subject')
const multer = require('../middlewares/multer-config')
const verifyToken = require('../middlewares/authJwt')



router.post('/subject', verifyToken, multer, subjectCtrl.create)

router.get('/subject', verifyToken,  subjectCtrl.getSubjectInfos)
router.get('/subject/:id', verifyToken,  subjectCtrl.getTextSubject)
router.get ('/subject/author/:id', verifyToken, subjectCtrl.getAuthor)


router.put('/subject/:id', verifyToken, multer, subjectCtrl.modifyTextSubject)

router.delete('/subject/:id', verifyToken, subjectCtrl.deleteTextSubject)


module.exports = router