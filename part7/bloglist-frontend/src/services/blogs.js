import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

export const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const get = id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export const create = async (newObject, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  const response = await axios
    .post(baseUrl, newObject, config)
    .catch(error => {throw error.response.data.error})
  return response.data
}

export const comment = async (id, comment) => {
  const response = await axios
    .post(`${baseUrl}/${id}/comments`, comment)
    .catch(error => {throw error.response.data.error})
  return response.data
}

export const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

export const patch = (id, patch) => {
  const request = axios.patch(`${baseUrl}/${id}`, patch)
  return request.then(response => response.data)
}

export const _delete = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

export const like = async (id, token) => {
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }

  await axios.patch(`${baseUrl}/${id}/likes`, {}, config)
  // ToDo: this should return the req response 2 avoid reloading all the vlogs once the 'like' req is complete
}
