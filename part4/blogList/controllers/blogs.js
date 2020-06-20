const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { blogs: 0 })
	return res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(id).populate('user', { blogs: 0 })
	return blog ? res.json(blog) : res.status(404).end()
})

blogsRouter.delete('/:id', async (req, res) => {
	if (!req.token)
		return res.status(401).json({ error: 'token missing or invalid' })
	const decodedUser = jwt.verify(req.token, process.env.SECRET)
	if (!decodedUser.id)
		return res.status(400).json({ error: 'error handling/decoding the token' })

	const id = req.params.id
	const blog = await Blog.findById(id)
	logger.info(blog.user)
	logger.info(decodedUser)

	if (blog.user.toString() === decodedUser.id.toString()) {
		await Blog.findByIdAndDelete(id)
		return res.status(204).end()
	}
	else
		return res.status(401).end()
})

blogsRouter.post('/', async (req, res) => {
	if (!req.token)
		return res.status(401).json({ error: 'missing token' })
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!decodedToken.id)
		return res.status(401).json({ error: 'invalid token' })
	const user = await User.findById(decodedToken.id)
	if(req.body.likes === undefined)
		req.body.likes = 0
	req.body.user = user._id
	const newBlog = new Blog(req.body)
	const savedBlog = await newBlog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()
	const populatedBlog = await savedBlog.populate('user', { blogs: 0 }).execPopulate()
	return res.status(201).json(populatedBlog)
})

blogsRouter.patch('/:id', async (req, res) => {
	const id = req.params.id
	const blog = req.body
	await Blog.updateOne({ _id: id }, blog, { runValidators: true, context: 'query' } )
	const updatedBlog = await Blog.findById(id).populate('user', { blogs: 0 })
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
		logger.info('Adding new resource')
		req.body._id = id
		if(req.body.likes === undefined)
			req.body.likes = 0
		const newBlog = await new Blog(req.body).save()
		res.json(newBlog)
	}
})

module.exports = blogsRouter