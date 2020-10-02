const gameRouter = require('./game')
const router = require('express').Router()
const userRouter = require('./user')
const newsRouter = require('./news')

router.use('/', userRouter)

router.use('/games', gameRouter)

router.use('/news', newsRouter)

module.exports = router