const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require ('../middlewares/auth')
const multer = require('../middlewares/multer-config')
const { authJwt } = require ('../middlewares');

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)

router.get ('/profile', [authJwt.verifyToken], userCtrl.getAllUsers)
router.get('/profile/:id', [authJwt.verifyToken], userCtrl.getUser)

router.put('/profile/:id', [authJwt.verifyToken], multer, userCtrl.modifyUser)

module.exports = router