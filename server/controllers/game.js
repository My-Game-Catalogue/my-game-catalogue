const { Game, User } = require('../models/index')
const axios = require('axios')

class gameController {

  static async findAll(req, res, next) {
    const { search } = req.query
    try {
      let data = await axios({
        method: 'get',
        url: `https://api.rawg.io/api/games?page=1&page_size=20&search=${search || ""}`,
      });
      let games = data.data.results 
      games = games.map(game => {
        return { id: game.id, name: game.name, image: game.background_image, released: game.released }
      })
      res.status(200).json({ games })
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async findById(req, res, next) {
    const { id } = req.params
    console.log(id)
    try {
      let data = await axios({
        method: 'get',
        url: `https://api.rawg.io/api/games/${id}`,
      });
      let game = data.data
      res.status(200).json({ 
        game : { 
          id: game.id, 
          name: game.name, 
          image: game.background_image || "", 
          description: game.description, 
          released: game.released 
        } 
      })
    } catch (err) {
      next(err)
    }
  }



}

module.exports = gameController