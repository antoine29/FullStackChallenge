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
	const blogObjects = initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
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

test('a valid blog is added', async () => {
	const newBlog = {
		title: 'newTitle',
		author: 'author0',
		url: 'http://www.new.com',
		likes: 1
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const response = await api.get('/api/blogs')
	expect(response.body.length).toBe(initialBlogs.length + 1)
	expect(response.body.map(blog => blog.title)).toContain('newTitle')
})

test('a missing title/url post body req. will have bad req. response', async () => {
	let newBlog = {
		author: 'author0',
		url: 'http://www.new.com',
		likes: 1
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/)

	newBlog = {
		title: 'title',
		author: 'author0',
		likes: 1
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/)

	const response  = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
})

test('Id property is defined in a post responce', async () => {
	const newBlog = {
		title: 'title',
		author: 'author0',
		url: 'http://www.new.com',
		likes: 1
	}

	const response  = await api.post('/api/blogs').send(newBlog)
	expect(response.body.Id).toBeDefined()
})

test('if a post request doesn\'t contains a likes prop. the default value is zero', async () => {
	const newBlog = {
		title: 'title',
		author: 'author0',
		url: 'http://www.new.com'
	}

	const response  = await api.post('/api/blogs').send(newBlog)
	expect(response.body.likes).toBe(0)
})

afterAll(() => {
	mongoose.connection.close()
})