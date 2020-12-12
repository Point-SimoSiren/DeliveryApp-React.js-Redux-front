import axios from 'axios'
const baseUrl = 'http://localhost:3300/api/items'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, item) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, item, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, update, setToken, remove }