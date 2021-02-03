const initialState = "Hey! I'm here for you!"

export const setNotification = (message, timeout) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
    dispatch({
      type: 'SET_MESSAGE',
      data: { message }  
   })
}
}

export const clearNotification = () => {
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