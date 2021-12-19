import axios from 'axios'
const baseUrl = 'http://localhost:3001/auth'

const SignIn = async credentials => {
  const response = await axios.post(`${baseUrl}/signin`, credentials)
  return response.data
}

const SignUp = async user => {
  const response = await axios.post(`${baseUrl}/signup`, user)
  return response.data
}

export { SignIn, SignUp }