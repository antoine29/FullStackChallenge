const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const logger = require('../utils/logger')

mongoose.set('useCreateIndex', true)

const url = process.env.MONGODB_URI
logger.info('connecting to', url)

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => logger.info('connected to MongoDB'))
	.catch(error => logger.error('error connecting to MongoDB:', error.message))

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