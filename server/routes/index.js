const gameRouter = require('./game')
const router = require('express').Router()
const userRouter = require('./user')
const axios = require('axios')

router.use('/', userRouter)

router.use('/games', gameRouter)

router.get('/news', ( req , res, next )=> {
    axios({ 
        method : 'GET',
        url : `https://newsapi.org/v2/everything?q=GAME&from=2020-09-30&to=2020-09-30&sortBy=popularity&apiKey=${process.env.NEWSAPI_KEY}`,
    })
    .then( response => {
        let newsGame = response.data.articles
        res.status(200).json({
            newsGame 
        })
    })
    .catch(err => next(err) )
})


module.exports = router