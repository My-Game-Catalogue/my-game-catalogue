const env = require('dotenv').config()
const express = require('express')
const cors = require("cors")
const mainRouter = require('./routes/index')
const errorHanlder = require('./middlewares/errorHandler')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(mainRouter)
app.use(errorHanlder)

app.listen(port, () => {
  console.log(`My Game Catalogue App listening at ${port}`)
})