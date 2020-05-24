const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', req => req.method === "POST" ? JSON.stringify(req.body) : "")

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
	{ 
		name: "Arto Hellas", 
		number: "040-123456",
		id: 1
	},
	{ 
		name: "Ada Lovelace", 
		number: "39-44-5323523",
		id: 2
	},
	{ 
		name: "Dan Abramov", 
		number: "12-43-234345",
		id: 3
	},
	{ 
		name: "Mary Poppendieck", 
		number: "39-23-6423122",
		id: 4
	}
]

app.get('/', (req, res) => {
	res.send('<h1>Hello PhoneBook!</h1>')
})

app.get('/info', (req, res) => {
	res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(p => p.id === id)
	res = person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(p => p.id !== id)
	res.status(204).end()
})

app.post('/api/persons', (req, res) => {
	if (!req.body.name || !req.body.number)
		return res
			.status(400)
			.json({
				error: "missing content"
			})

	if (personNameValidation(req.body.name))
		return res
			.status(400)
			.json({
				error: "name must be unique"
			})			

	const newPerson = {
		name: req.body.name,
		number: req.body.number,
		id: getValidPersonId()
	}
	persons = persons.concat(newPerson)
	res.json(newPerson)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const getValidPersonId = () => {
	let newId = undefined
	do {
		newId = Math.floor(Math.random()*1000)
		console.log("in")
	} while (persons.find(p => p.id === newId));

	return newId
}

const personNameValidation = (name) => persons.find(p => p.name === name)