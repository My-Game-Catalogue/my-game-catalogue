const axios = require('axios')
const moment = require("moment")

class NewsController{
  static async findAll(req, res, next) {
    try {
      let data = await axios({
        method: 'get',
        url: `https://newsapi.org/v2/everything?q="video games"&from=${moment(new Date()).format("YYYY-MM-DD")}&to=${moment(new Date()).format("YYYY-MM-DD")}&sortBy=revelancy&apiKey=${process.env.NEWSAPI_KEY}`,
      });
      let news = data.data.articles.map(record => {
        return {
          title : record.title,
          urlToImage : record.urlToImage,
          description : record.description,
          author : record.author,
          url: record.url,
        }
      })
      res.status(200).json({ news })
    } catch (err) {
      next(err)
    }
  }
}


module.exports = NewsController

