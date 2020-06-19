const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/User')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})
		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', name: 'root', passwordHash })
		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			username: 'user1',
			name: 'Matt Murddck',
			password: 'p4ssword',
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(result.body.error).toContain('`username` to be unique')
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with proper statuscode/message if username field is missing', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			name: 'name',
			password: 'password',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with proper statuscode/message if username field is invalid', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			username: 'a',
			name: 'name',
			password: 'password',
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(result.body.error).toContain('User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3).')
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with proper statuscode/message if password field is missing', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			username: 'root',
			name: 'name'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(result.body.error).toContain('`password` field must be defined and must be greather than 3 chars. length.')
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	test('creation fails with proper statuscode/message if password field is invalid', async () => {
		const usersAtStart = await helper.usersInDb()
		const newUser = {
			username: 'root',
			name: 'name',
			password: 'a'
		}

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		expect(result.body.error).toContain('`password` field must be defined and must be greather than 3 chars. length.')
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})

	afterAll(() => {
		mongoose.connection.close()
	})
})