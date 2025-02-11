const { User } = require('../models')
const { checking } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const { sendEmail } = require('../helpers/sendEmail')

class UserController {
	static register (req, res, next) {
		let { name, email, password } = req.body
		User.create({ name, email, password }, { individualHooks: true })
			.then(data => {
					sendEmail(email, name)
					res.status(201).json({email: data.email, msg:"successfully register!"})
			})
			.catch(err => {
					next(err)
			})
	}

	static login (req, res, next) {
		let { email, password } = req.body
		User.findOne({
			where: {
					email: email
			}
		})
		.then(data => {
			if(!data) throw { message: 'wrong email or password!', statusCode: 400}
			if(!checking(password, data.password)) throw { message: 'wrong email or password!', statusCode: 400 }
			let payload = {
				id: data.id,
				email: data.email
			}
			let token = getToken(payload)
			res.status(200).json({token, msg:"successfully login!"})
		})
		.catch(err => {
			next(err)
		})
	}

	static googleSign (req, res, next) {
		let email = null
		let name = null
		const client = new OAuth2Client(process.env.GOOGLE_CID);
		client.verifyIdToken({
			idToken: req.body.id_token,
			audience: process.env.GOOGLE_CID,
		})
		.then(ticket => {
			let payload = ticket.getPayload()
			email = payload.email
			name = payload.name
			return User.findOne({
				where: {
						email: email
				}
			})
		})
		.then(user => {
			if(user) return user
			else {
				sendEmail(email, name)
				return User.create({
					name: name,
					email: email,
					password: 'googlesecret' + Math.round(Math.random() * 1000)
				})
			}
		})
		.then(user => {
			let payload = {
				id: user.id,
				email: user.email
			}
			let token = getToken(payload)
			res.status(200).json({token, msg:"successfully login!"})
		})
		.catch(err => {
			next(err)
		})
	}
}

module.exports = UserController