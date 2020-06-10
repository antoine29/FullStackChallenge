const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useCreateIndex', true)

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
		unique: true
	},
	number: {
		type: String,
		minlength: 8,
		required: true
	},
	id: {
		type: Number,
		required: true,
		unique: true
	}
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)