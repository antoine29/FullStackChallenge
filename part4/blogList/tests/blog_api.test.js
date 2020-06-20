const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const User = require('../models/User')
const helper = require('./test_helper')

beforeAll(async () => {
	jest.setTimeout(10000)

	await helper.cleanUsersDB()
	const users = await helper.initialUsers()
	const createdUsers = users.map(user => new User(user))
	let userPromiseArray = createdUsers.map(user => user.save())
	await Promise.all(userPromiseArray)

	await helper.cleanBlogsDB()
	const blogs = helper.initialBlogs(createdUsers[0]._id, createdUsers[1]._id)
	const createdBlogs = blogs.map(blog => new Blog(blog))
	const blogPromiseArray = createdBlogs.map(blog => blog.save())
	await Promise.all(blogPromiseArray)

	createdUsers[0].blogs = createdUsers[0].blogs.concat(createdBlogs[0]._id)
	createdUsers[1].blogs = createdUsers[1].blogs.concat(createdBlogs[1]._id)
	userPromiseArray = createdUsers.map(user => user.save())
	await Promise.all(userPromiseArray)
})

test('an info request has ok response', async () => {
	jest.setTimeout(10000)
	await api
		.get('/info')
		.expect(200)
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
	const blogsInDB = await helper.blogsInDB()
	expect(response.body).toHaveLength(blogsInDB.length)
})

test('a created blog is returned by its Id', async () => {
	const blogsInDB = await helper.blogsInDB()
	const response = await api
		.get(`/api/blogs/${blogsInDB[0].id}`)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response).toBeDefined()
	expect(response.body).toEqual(blogsInDB[0])
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

test('a valid blog POST req. will add the blog and update the users blog', async () => {
	const blogsAtStart = await helper.blogsInDB()
	const loginResponse = await api.post('/api/login').send(helper.plainInitialUsers[0])
	const token = 'bearer ' + loginResponse.body.token
	let newBlog = {
		title: 'newTitle',
		author: 'author0',
		url: 'http://www.new.com',
		likes: 1
	}

	const blogRes = await api
		.post('/api/blogs')
		.send(newBlog)
		.set({ Authorization: token })
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const user = await User.findOne({ username: helper.plainInitialUsers[0].username })
	newBlog.id = blogRes.body.id
	newBlog.user = {
		name: helper.plainInitialUsers[0].name,
		username: helper.plainInitialUsers[0].username,
		id: user.id.toString()
	}

	expect(blogRes.body).toEqual(newBlog)
	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
	const userBlogs = user.blogs.map(blogId => blogId.toString())
	expect(userBlogs).toContain(blogRes.body.id)
})

test('a POST req. with a missing token will return an error', async () => {
	const blogsAtStart = await helper.blogsInDB()
	let newBlog = {
		title: 'missing token blog',
		author: 'author0',
		url: 'http://www.new.com',
		likes: 1
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(401)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

test('a POST req. with an invalid token will return an error', async () => {
	const blogsAtStart = await helper.blogsInDB()
	const token = 'bearer notValidToken'
	let newBlog = {
		title: 'invalid token blog',
		author: 'author0',
		url: 'http://www.new.com',
		likes: 1
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.set({ Authorization: token })
		.expect(401)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

test('a POST req. with a missing title field, will return an error', async () => {
	const blogsAtStart = await helper.blogsInDB()
	const loginResponse = await api.post('/api/login').send(helper.plainInitialUsers[0])
	const token = 'bearer ' + loginResponse.body.token
	const newBlog = {
		author: 'author0',
		url: 'http://www.new.com',
		likes: 1
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.set({ Authorization: token })
		.expect(400)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
})

test('a POST req. with a missing url field, will return an error', async () => {
	const blogsAtStart = await helper.blogsInDB()
	const loginResponse = await api.post('/api/login').send(helper.plainInitialUsers[0])
	const token = 'bearer ' + loginResponse.body.token
	const newBlog = {
		title: 'title',
		author: 'author0',
		likes: 1
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.set({ Authorization: token })
		.expect(400)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtStart).toHaveLength((blogsAtEnd).length)
})

test('Id property is defined in a POST response', async () => {
	const loginResponse = await api.post('/api/login').send(helper.plainInitialUsers[0])
	const token = 'bearer ' + loginResponse.body.token
	const newBlog = {
		title: 'title',
		author: 'author0',
		url: 'http://www.new.com',
		likes: 1
	}

	const response  = await api.post('/api/blogs').send(newBlog).set({ Authorization: token })
	expect(response.body.id).toBeDefined()
})

test('if a post request doesn\'t contains a likes prop. the default value will be zero', async () => {
	const loginResponse = await api.post('/api/login').send(helper.plainInitialUsers[0])
	const token = 'bearer ' + loginResponse.body.token
	const newBlog = {
		title: 'validating Id prop',
		author: 'author0',
		url: 'http://www.new.com'
	}

	const response  = await api.post('/api/blogs').send(newBlog).set({ Authorization: token })
	expect(response.body.likes).toBe(0)
})

test('a created blog can be deleted by its Id and ony by its owner user', async () => {
	const blogsAtFirst = await helper.blogsInDB()
	const loginResponse = await api.post('/api/login').send(helper.plainInitialUsers[0])
	const token = 'bearer ' + loginResponse.body.token
	const newBlog = {
		title: 'to delete blog',
		author: 'to delete blog',
		url: 'http://www.new.com'
	}

	const createdBlogRes = await api.post('/api/blogs').send(newBlog).set({ Authorization: token })
	const blogsInDB = await helper.blogsInDB()
	expect(blogsInDB).toHaveLength(blogsAtFirst.length + 1)

	await api
		.delete(`/api/blogs/${createdBlogRes.body.id}`)
		.set({ Authorization: token })
		.expect(204)

	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtEnd).toHaveLength(blogsAtFirst.length)
	expect(blogsAtEnd.map(blog => blog.title)).not.toContain('to delete blog')
})

test('deleting a blog with an invalid token will return an error', async () => {
	const blogsAtFirst = await helper.blogsInDB()
	const loginResponse = await api.post('/api/login').send(helper.plainInitialUsers[0])
	const token = 'bearer ' + loginResponse.body.token
	const newBlog = {
		title: 'to delete blog',
		author: 'to delete blog',
		url: 'http://www.new.com'
	}

	const createdBlogRes = await api.post('/api/blogs').send(newBlog).set({ Authorization: token })
	const blogsInDB = await helper.blogsInDB()
	expect(blogsInDB).toHaveLength(blogsAtFirst.length + 1)

	await api
		.delete(`/api/blogs/${createdBlogRes.body.id}`)
		.set({ Authorization: 'bearer notValidToken' })
		.expect(401)

	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtEnd).toHaveLength(blogsAtFirst.length + 1)
	expect(blogsAtEnd.map(blog => blog.title)).toContain('to delete blog')
})

test('a PATCH req. will update some fields', async () => {
	const blogsAtFirst = await helper.blogsInDB()
	const patch = {
		title: 'patched title',
		author: 'patched author'
	}

	let patchedBlog = await api
		.patch(`/api/blogs/${blogsAtFirst[0].id}`)
		.send(patch)
		.expect(200)
	Object.assign(blogsAtFirst[0], patch)
	expect(patchedBlog.body).toEqual(blogsAtFirst[0])

	patchedBlog = await api.get(`/api/blogs/${blogsAtFirst[0].id}`)
	expect(patchedBlog.body).toEqual(blogsAtFirst[0])
})

test('a PUT req. to an existent Id will replace the document', async () => {
	const replace = {
		title: 'replaced title',
		author: 'replaced author',
		url: 'http://www.replaced.com',
		likes: 100
	}

	const replacedBlog = await api
		// .put(`/api/blogs/${createdBlogs[0].Id}`)
		.send(replace)
		.expect(200)

	// replace.Id = createdBlogs[0].Id
	expect(replacedBlog.body).toEqual(replace)
})

test('invalid body, with an existent Id, in a PUT req. will return an error', async () => {
	const replace = {
		url: 'http://www.replaced.com',
		likes: 100
	}

	await api
		// .put(`/api/blogs/${createdBlogs[0].Id}`)
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

// test a valid login returns a token
// test an invalid login returns an error
afterAll(() => {
	mongoose.connection.close()
})