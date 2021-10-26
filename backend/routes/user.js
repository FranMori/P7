const express = require('express')
const router = express.Router()

const userCtrl = require('../controllers/user')

const auth = require ('../middlewares/auth')
const multer = require('../middlewares/multer-config')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)

router.get ('/profile', userCtrl.getAllUsers)
router.get('/profile/:id', userCtrl.getUser)

router.put('/profile/:id', multer, userCtrl.modifyUser)

module.exports = router