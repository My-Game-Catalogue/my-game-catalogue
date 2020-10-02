const { verify } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication (req,res,next) {
  try {
    let { token } = req.headers;
    let decoded = verify(token)
    let user = await User.findOne({
        where: {
            email: decoded.email
        }
    })
    if(!user) throw { name: 'AuthenticationFailed' }
    req.userData = decoded
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication