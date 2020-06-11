const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')

const initialBlogs = [
	{
		title: 'title0',
		author: 'author0',
		url: 'http://www.google.com',
		likes: 1
	},
	{
		title: 'title1',
		author: 'author0',
		url: 'http://www.google.com',
		likes: 2
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})

	let blogObject = new Blog(initialBlogs[0])
	await blogObject.save()

	blogObject = new Blog(initialBlogs[1])
	await blogObject.save()
})

test('blogs are returned as json', async () => {
	jest.setTimeout(10000)
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all the initial blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
})

test('the first blog is about HTTP methods', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0]).toEqual(initialBlogs[0])
})

afterAll(() => {
	mongoose.connection.close()
})