const gameController = require('../controllers/game')

const router = require('express').Router()

router.get('/', gameController.findAll)
router.get('/:id', gameController.findById)
module.exports = router