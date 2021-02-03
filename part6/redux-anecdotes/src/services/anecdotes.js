import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteFor = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`
  const response = await axios.get(anecdoteUrl)
  const voted = {
    ...response.data,
    votes: response.data.votes + 1
  }
  const updated = await axios.put(anecdoteUrl, voted)
  return updated.data
}

export default { getAll, createNew, voteFor }