const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: true,
		minlength: 3,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash
	}
})

module.exports = mongoose.model('User', userSchema)