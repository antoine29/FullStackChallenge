const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the arguments as: "$ node mongo.js <password> <name> <phone>" in order to add a new contact or "$ node mongo.js <password>" in order to list the contacts.')
	process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://user:${password}@cluster0-y2l8w.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String
})

const Person = mongoose.model('Person', personSchema)

switch (process.argv.length){
case 5: {
	const newPerson = new Person({
		name: process.argv[3],
		number: process.argv[4]
	})

	newPerson.save().then(() => {
		console.log('new contact saved!')
		mongoose.connection.close()
	})

	break
}

case 3: {
	Person.find({}).then(result => {
		console.log('phonebook:')
		result.forEach(person => console.log(person.name, '\t', person.number))
		mongoose.connection.close()
	})

	break
}

default: {
	console.log('Please provide the arguments as: "$ node mongo.js <password> <name> <phone>" in order to add a new contact or "$ node mongo.js <password>" in order to list the contacts.')
	process.exit(1)
}
}