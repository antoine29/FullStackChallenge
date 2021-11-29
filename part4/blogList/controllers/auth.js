const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/signin', async (request, response) => {
	const body = request.body
	const user = await User.findOne({ username: body.username })
	const passwordCorrect = user === null ?
		false : await bcrypt.compare(body.password, user.passwordHash)
	if (!(user && passwordCorrect))
		return response.status(401).json({
			error: 'invalid username or password'
		})

	const userForToken = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '2h' })

	response
		.status(200)
		.send({
			username: user.username,
			name: user.name, token,
			id: user.id })
})

loginRouter.post('/signup', async (request, response) => {
	const body = request.body
	if (body.password === undefined || body.password.length < 3)
		return response.status(400).json({ error: '`password` field must be defined and must be greather than 3 chars. length.' })

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.json(savedUser)
})

module.exports = loginRouter