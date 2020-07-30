import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const response = await axios
    .post(baseUrl, newObject, config)
    .catch(error => {throw error.response.data.error})
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

const patch = (id, patch) => {
  const request = axios.patch(`${baseUrl}/${id}`, patch)
  return request.then(response => response.data)
}

const _delete = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, patch, _delete }