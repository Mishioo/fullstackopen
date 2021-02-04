import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => props.voteFor(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  const filter = state.filter.toLowerCase()
  const anecdotes = state.anecdotes
    .filter((a) => a.content.toLowerCase().includes(filter))
    .sort((a, b) => b.votes - a.votes)
  return { anecdotes }
}

const mapDispatchToProps = (dispatch) => {
  return {
    voteFor: anecdote => {
      console.log('vote', anecdote.id)
      dispatch(voteFor(anecdote.id))
      dispatch(setNotification(`Voted for anecdote: ${anecdote.content}`, 5))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)