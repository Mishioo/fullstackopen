import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({ text, counter, setCounter }) => (
  <button onClick={()=>setCounter(counter + 1)}>{text}</button>
  )

const Statistic = ({ text, counter, unit }) => {
  if (Number.isNaN(counter)) counter = 0
  counter = Math.round((counter + Number.EPSILON) * 100) / 100
  return <tr><td>{text}:</td><td>{counter} {unit || ''}</td></tr>
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <Statistic text='good' counter={good} />
        <Statistic text='neutral' counter={neutral} />
        <Statistic text='bad' counter={bad} />
        <Statistic text='all' counter={all} />
        <Statistic text='average' counter={ (good - bad) / all } />
        <Statistic text='positive' counter={ good * 100 / all } unit='%' />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' counter={good} setCounter={setGood} />
      <Button text='neutral' counter={neutral} setCounter={setNeutral} />
      <Button text='bad' counter={bad} setCounter={setBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
