import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const randomInt = (range) => Math.floor(Math.random() * range)

const Button = ({ text, clickHook}) => (
  <button onClick={clickHook} >{text}</button>
)

const Anectode = ({ anecdotes, selected, votes }) => (
  <>
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

  const newAnecdote = () => setSelected(randomInt(props.anecdotes.length))
  const newVote = () => {
    let newVotes = [...votes]
    newVotes[selected] = votes[selected] + 1
    setVotes(newVotes)
  }

  const mostVoted = votes.reduce(
    (idxMax, val, idx, arr) => val > arr[idxMax] ? idx : idxMax, 0
  )

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anectode anecdotes={anecdotes} selected={selected} votes={votes} />
      <Button text='vote' clickHook={newVote} />
      <Button text='next anecdote' clickHook={newAnecdote} />
      <h1>Anecdote with most votes</h1>
      <Anectode anecdotes={anecdotes} selected={mostVoted} votes={votes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
