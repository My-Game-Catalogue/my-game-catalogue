const router = require('express').Router()
const { User } = require('../models')
const { checking } = require('../helpers/bcrypt')
const { getToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

router.post('/register', (req, res, next) => {
    let { name, email, password } = req.body
    User.create({ name, email, password })
        .then(data => {
            res.status(201).json({email: data.email, msg:"successfully register!"})
        })
        .catch(err => {
            next(err)
        })
})

router.post('/login', (req, res, next) => {
    let { email, password } = req.body
        User.findOne({
            where: {
                email: email
            }
        })
        .then(data => {
            if(!data) throw { message: 'wrong email or password!' }
            if(!checking(password, data.password)) throw { message: 'wrong email or password!' }
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
})

router.post('/googleSign', (req, res) => {
    let email = null
        const client = new OAuth2Client(process.env.GOOGLE_CID);
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CID,
        })
        .then(ticket => {
            let payload = ticket.getPayload()
            email = payload.email
            return User.findOne({
                where: {
                    email: email
                }
            })

        })
        .then(user => {
            if(user) return user
            else {
                return User.create({
                    email: email,
                    password: 'googlesecret'
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
            console.log(err)
        })
})

module.exports = router