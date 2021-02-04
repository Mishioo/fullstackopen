import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={props.create}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => ({
  create: (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    console.log('create', anecdote)
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`Created anecdote: ${anecdote}`, 5))
  }
})

export default connect(null, mapDispatchToProps)(AnecdoteForm)