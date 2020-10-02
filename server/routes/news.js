const NewsController = require('../controllers/news')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()
// router.use(authentication)
router.get('/',NewsController.findAll)

module.exports = router





