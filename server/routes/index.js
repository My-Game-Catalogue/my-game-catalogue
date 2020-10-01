const gameRouter = require('./game')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({ message: 'test' })
})

router.use('/games', gameRouter)

module.exports = router