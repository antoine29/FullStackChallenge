const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')
const logger = require('../utils/logger')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer '))
		return authorization.substring(7)
	return null
}

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { blogs: 0 })
	return res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(id)
	return blog ? res.json(blog) : res.status(404).end()
})

blogsRouter.delete('/:id', async (req, res) => {
	const id = req.params.id
	await Blog.findByIdAndDelete(id)
	return res.status(204).end()
})

blogsRouter.post('/', async (req, res) => {
	const token = getTokenFrom(req)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if (!token || !decodedToken.id)
		return res.status(401).json({ error: 'token missing or invalid' })

	const user = await User.findById(decodedToken.id)
	if(req.body.likes === undefined)
		req.body.likes = 0
	req.body.user = user._id
	const newBlog = new Blog(req.body)
	const savedBlog = await newBlog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	return res.status(201).json(savedBlog)
})

blogsRouter.patch('/:id', async (req, res) => {
	const id = req.params.id
	const blog = req.body
	await Blog.updateOne({ _id: id }, blog, { runValidators: true, context: 'query' } )
	const updatedBlog = await Blog.findById(id)
	return res.json(updatedBlog)
})

blogsRouter.put('/:id', async (req, res) => {
	const id = req.params.id
	const foundBlog = await Blog.findById(id)
	if (foundBlog){
		logger.info('Replacing resource')
		let blog = req.body
		await Blog.replaceOne({ _id: id }, blog, { runValidators: true, context: 'query' })
		blog = await Blog.findById(id)
		res.json(blog)
	}
	else {
		logger.info('adding new resource')
		req.body._id = id
		if(req.body.likes === undefined)
			req.body.likes = 0
		const newBlog = await new Blog(req.body).save()
		res.json(newBlog)
	}
})

module.exports = blogsRouter