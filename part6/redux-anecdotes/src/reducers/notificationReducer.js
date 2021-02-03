const initialState = { message: '', timeoutID: '' }

export const setNotification = (message, timeout) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
    dispatch({
      type: 'SET_MESSAGE',
      data: { message, timeoutID }  
   })
}
}

export const clearNotification = () => {
  return async dispatch => {
    dispatch( {type: 'CLEAR_MESSAGE'} )
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      if (state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return action.data
    case 'CLEAR_MESSAGE':
      return { message: '', timeoutID: '' }
    default: return state
  }
}

export default reducer