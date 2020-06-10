const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.get('/', (req, res) => {
	Blog
		.find({})
		.then(blogs => res.json(blogs))
})

blogsRouter.get('/:id', (req, res, next) => {
	const id = Number(req.params.id)
	Blog
		.findOne({ id: id })
		.then(blog => { blog ? res.json(blog) : res.status(404).end()})
		.catch(error => next(error))
})

blogsRouter.delete('/:id', (req, res, next) => {
	const id = Number(req.params.id)
	Blog
		.deleteOne({ id: id })
		.then(() => res.status(204).end())
		.catch(error => next(error))
})

blogsRouter.post('/', (req, res, next) => {
	const newBlog = new Blog(req.body)

	newBlog
		.save()
		.then(savedBlog => res.status(201).json(savedBlog))
		.catch(error => next(error))
})

blogsRouter.put('/:id', (req, res, next) => {
	const id = Number(req.params.id)
	const blog = new Blog(req.body)
	Blog
		.updateOne({ id: id }, blog, { runValidators: true, context: 'query' } )
		.then(() => {
			Blog
				.findOne({ id: id })
				.then(updatedBlog => res.json(updatedBlog))})
		.catch(error => next(error))
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