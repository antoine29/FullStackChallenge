const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
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
	const newBlog = new Blog(req.body)
	const savedBlog = await newBlog.save()
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
		const newBlog = await new Blog(req.body).save()
		res.json(newBlog)
	}
})

const getValidId = () =>
	Blog
		.find({})
		.then(blogs => {
			let newId = undefined
			do {
				newId = Math.floor(Math.random()*1000)
			} while (blogs.find(p => p.id === newId))

			return newId})

module.exports = blogsRouter