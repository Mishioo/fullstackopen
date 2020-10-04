import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const responseData = resp => resp.then(r => r.data)

const getAll = () => {
  return responseData(axios.get(baseUrl))
}

const create = newObject => {
  return responseData(axios.post(baseUrl, newObject))
}

const update = (id, newObject) => {
  return responseData(axios.put(`${baseUrl}/${id}`, newObject))
}

const deletePerson = (id) => {
  return responseData(axios.delete(`${baseUrl}/${id}`))
}

export default { getAll, create, update, deletePerson }
