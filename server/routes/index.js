const gameRouter = require('./game')
const router = require('express').Router()
const userRouter = require('./user')


router.get('/', (req, res) => {
  res.json({ message: 'test' })
})
router.use('/', userRouter)

router.use('/games', gameRouter)

module.exports = router