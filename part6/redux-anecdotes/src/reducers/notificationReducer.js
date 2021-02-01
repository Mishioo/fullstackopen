const initialState = "Hey! I'm here for you!"

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: { message }  
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data.message
    case 'CLEAR_MESSAGE':
      return ''
    default: return state
  }
}

export default reducer