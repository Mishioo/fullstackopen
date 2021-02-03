import anecdoteService from '../services/anecdotes'

export const voteFor = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.voteFor(id)
    dispatch({
      type: 'VOTE',
      data: anecdote  
    })
  }
}

export const createAnecdote = (data) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'CREATE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      return state.map(a => a.id !== id ? a : action.data)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default reducer