const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const helper = require('./test_helper')

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

let createdBlogs = []

beforeAll(async () => {
	const blogs = initialBlogs.map(blog => new Blog(blog))
	await Blog.deleteMany({})
	const promiseArray = blogs.map(blog => blog.save())
	await Promise.all(promiseArray)

	const response = await api.get('/api/blogs')
	createdBlogs = response.body
})

afterEach(async () => {
	const response = await api.get('/api/blogs')
	createdBlogs = response.body
})

test('an info request has ok response', async () => {
	await api
		.get('/info')
		.expect(200)
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('all the initial blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(createdBlogs.length)
})

test('a created blog is retourned by its Id', async () => {
	const response = await api
		.get(`/api/blogs/${createdBlogs[0].Id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response).toBeDefined()
	expect(response.body).toEqual(createdBlogs[0])
})

test('trying to get a non existent blog returns a not found response', async () => {
	await api
		.get('/api/blogs/000000000000000000000000')
		.expect(404)
})

test('trying to get by an invalid Id returns an error response', async () => {
	await api
		.get('/api/blogs/123')
		.expect(400)
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
	expect(response.body.length).toBe(createdBlogs.length + 1)
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
	expect(response.body).toHaveLength(createdBlogs.length)
})

test('Id property is defined in a post response', async () => {
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
		title: 'validating Id prop',
		author: 'author0',
		url: 'http://www.new.com'
	}

	const response  = await api.post('/api/blogs').send(newBlog)
	expect(response.body.likes).toBe(0)
})

test('a created blog can be deleted by its Id', async () => {
	await api
		.delete(`/api/blogs/${createdBlogs[0].Id}`)
		.expect(204)

	const blogs = await api.get('/api/blogs')
	expect(blogs.body).toHaveLength(createdBlogs.length - 1)
	expect(blogs.body.map(blog => blog.title)).not.toContain('title0')
})

test('a PATCH req. will update some fields', async () => {
	const patch = {
		title: 'patched title',
		author: 'patched author'
	}

	let patchedBlog = await api
		.patch(`/api/blogs/${createdBlogs[0].Id}`)
		.send(patch)
		.expect(200)
	Object.assign(createdBlogs[0], patch)
	expect(patchedBlog.body).toEqual(createdBlogs[0])

	patchedBlog = await api.get(`/api/blogs/${createdBlogs[0].Id}`)
	expect(patchedBlog.body).toEqual(createdBlogs[0])
})

test('a PUT req. to an existent Id will replace the document', async () => {
	const replace = {
		title: 'replaced title',
		author: 'replaced author',
		url: 'http://www.replaced.com',
		likes: 100
	}

	const replacedBlog = await api
		.put(`/api/blogs/${createdBlogs[0].Id}`)
		.send(replace)
		.expect(200)

	replace.Id = createdBlogs[0].Id
	expect(replacedBlog.body).toEqual(replace)
})

test('invalid body, with an existent Id, in a PUT req. will return an error', async () => {
	const replace = {
		url: 'http://www.replaced.com',
		likes: 100
	}

	await api
		.put(`/api/blogs/${createdBlogs[0].Id}`)
		.send(replace)
		.expect(400)
})

test('a non existent Id with a PUT req. will create a new document', async () => {
	const nonExistentId = '000000000000000000000000'
	const replace = {
		title: 'created title',
		author: 'created author',
		url: 'http://www.created.com',
		likes: 100
	}

	const response = await api
		.put(`/api/blogs/${nonExistentId}`)
		.send(replace)
		.expect(200)

	replace.Id = nonExistentId
	expect(response.body).toEqual(replace)

	const createdBlog = await api.get(`/api/blogs/${nonExistentId}`)
	expect(createdBlog.body).toEqual(replace)
})

test('an invalid body, a non existent Id in a PUT req. will return an error', async () => {
	const replace = {
		url: 'http://www.created.com',
		likes: 100
	}

	await api
		.put('/api/blogs/000000000000000000000000')
		.send(replace)
		.expect(400)
})

test('a POST req. without a token will return an error', async () => {
	const blogsAtStart = await helper.blogsInDb()
	const newBlog = {
		title: 'newTitle',
		author: 'author0',
		url: 'http://www.new.com',
	}

	const result = await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401)
		.expect('Content-Type', /application\/json/)
	expect(result.body.error).toContain('token missing or invalid')
	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

// test to assign the created blog to the token user

afterAll(() => {
	mongoose.connection.close()
})