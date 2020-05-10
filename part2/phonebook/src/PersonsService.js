import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
	const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createPerson = newPerson => {
	const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = person => {
	const request = axios.delete(`${baseUrl}/${person.id}`)
  return request.then(_ => person)
}

export default { getPersons, createPerson, deletePerson }