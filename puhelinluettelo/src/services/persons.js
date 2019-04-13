import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const remove = newObject => {
    return axios.delete(`${baseUrl}/${newObject}`)
}

const update = newObject => {
    return axios.put(`${baseUrl}/${newObject.id}`, newObject)
}

export default { 
  getAll: getAll, 
  create: create,
  remove: remove,
  update: update
}