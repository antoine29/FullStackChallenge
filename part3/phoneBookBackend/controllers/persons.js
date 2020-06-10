const personsRouter = require('express').Router()
const Person = require('../models/Person')

personsRouter.get('/', (req, res) => {
	Person
		.find({})
		.then(persons => res.json(persons))
})

personsRouter.get('/:id', (req, res, next) => {
	const id = Number(req.params.id)
	Person
		.findOne({ id: id })
		.then(person => { person ? res.json(person) : res.status(404).end()})
		.catch(error => next(error))
})

personsRouter.delete('/:id', (req, res, next) => {
	const id = Number(req.params.id)
	Person
		.deleteOne({ id: id })
		.then(() => res.status(204).end())
		.catch(error => next(error))
})

personsRouter.post('/', (req, res, next) => {
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

personsRouter.put('/:id', (req, res, next) => {
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

const getValidPersonId = () =>
	Person
		.find({})
		.then(persons => {
			let newId = undefined
			do {
				newId = Math.floor(Math.random()*1000)
			} while (persons.find(p => p.id === newId))

			return newId})

module.exports = personsRouter