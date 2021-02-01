const initialState = "Hey! I'm here for you!"

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: { message }  
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      const message = action.data.message
      return message
    default: return state
  }
}

export default reducer