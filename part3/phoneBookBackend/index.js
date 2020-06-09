require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')
const logger = require('./utils/logger')

const app = express()

morgan.token('body', req => req.method === 'POST' ? JSON.stringify(req.body) : '')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

app.get('/', (req, res) => {
	res.send('<h1>Hello PhoneBook!</h1>')
})

app.get('/info', (req, res) => {
	Person
		.countDocuments({})
		.then(count => res.send(`<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`))
})

app.get('/api/persons', (req, res) => {
	Person
		.find({})
		.then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
	const id = Number(req.params.id)
	Person
		.findOne({ id: id })
		.then(person => { person ? res.json(person) : res.status(404).end()})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	const id = Number(req.params.id)
	Person
		.deleteOne({ id: id })
		.then(() => res.status(204).end())
		.catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
	const body = req.body
	getValidPersonId()
		.then(validId => {
			const newPerson = new Person({
				name: body.name,
				number: body.number,
				id: validId
			})

			newPerson
				.save()
				.then(savedPerson => { res.json(savedPerson) })
				.catch(error => next(error))
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
	const id = Number(req.params.id)
	const body = req.body
	const person = {
		name: body.name,
		number:body.number
	}
	Person
		.updateOne({ id: id }, person, { runValidators: true, context: 'query' } )
		.then(() => {
			Person
				.findOne({ id: id })
				.then(updatedPerson => res.json(updatedPerson))})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	switch (error.name) {
	case 'CastError': return response.status(400).send({ error: 'malformatted input' })
	case 'ValidationError': return response.status(400).json({ error: error.message })
	default: logger.error(error.message)
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`)
})

const getValidPersonId = () =>
	Person
		.find({})
		.then(persons => {
			let newId = undefined
			do {
				newId = Math.floor(Math.random()*1000)
			} while (persons.find(p => p.id === newId))

			return newId})