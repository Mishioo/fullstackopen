export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }  
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(a => a.id === id)
      const voted = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(a => a.id !== id ? a : voted)
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default reducer