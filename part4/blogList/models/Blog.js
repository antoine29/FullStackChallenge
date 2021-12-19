const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useCreateIndex', true)

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
		minlength: 3,
		required: true,
	},
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: {
		type: Array,
		default: []
	}
})

blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)