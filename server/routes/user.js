const router = require('express').Router()
const UserControl = require('../controllers/user')

router.post('/register', UserControl.register)

router.post('/login', UserControl.login)

router.post('/googleSign', UserControl.googleSign)

module.exports = router