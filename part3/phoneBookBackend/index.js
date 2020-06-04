require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()

morgan.token('body', req => req.method === "POST" ? JSON.stringify(req.body) : "")

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
		.then(persons => {
    	res.json(persons)
  	})
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	Person
		.findOne({id: id})
		.then(person => { person ? res.json(person) : res.status(404).end()})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	Person
		.deleteOne({id: id})
		.then(_ => res.status(204).end())
})

app.post('/api/persons', (req, res) => {
	const body = req.body
	if (!body.name || !body.number)
		return res
			.status(400)
			.json({
				error: "missing content"
			})
	
	personNameValidation(body.name)
		.then(isValidName => {			
			if (isValidName){
				getValidPersonId()
					.then(validId => {
						console.log("valid id: ", validId)
						const newPerson = new Person({
							name: body.name,
							number: body.number,
							id: validId
						})
					
						newPerson
							.save()
							.then(savedPerson => { res.json(savedPerson) })
					})
			}
			else 
				return res
					.status(400)
					.json({
						error: "name must be unique"
					})		
		})
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const getValidPersonId = () =>
	Person
	.find({})
	.then(persons => {
		let newId = undefined
		do {
			newId = Math.floor(Math.random()*1000)
		} while (persons.find(p => p.id === newId))

		return newId
	})

const personNameValidation = name =>
	Person.find({}).then(persons => !persons.find(p => p.name === name))