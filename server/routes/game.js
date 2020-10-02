const gameController = require('../controllers/game')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()
router.use(authentication)
router.get('/', gameController.findAll)
router.get('/:id', gameController.findById)
module.exports = router