const axios = require('axios')


class NewsController{
    static async findAll(req, res, next) {
        
        try {
          let data = await axios({
            method: 'get',
            url: `https://newsapi.org/v2/everything?q=GAME&from=2020-09-30&to=2020-09-30&sortBy=popularity&apiKey=${process.env.NEWSAPI_KEY}`,
          });
          console.log(data.data);
          let news = data.data.articles.map(record => {
            return {
              title : record.title,
              urlToImage : record.urlToImage,
              description : record.description,
              author : record.author
            }
          })
          res.status(200).json({ 
            news : { 
                news
            } 
          })
        } catch (err) {
          console.log(err);
          next(err)
        }
      }


}


module.exports = NewsController

