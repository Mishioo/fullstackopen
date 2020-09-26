import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => <h1>{props.course.name}</h1>

const Content = (props) => {
  const [one, two, three] = props.course.parts
  return (
    <>
      <p>
        {one.name} {one.exercises}
      </p>
      <p>
        {two.name} {two.exercises}
      </p>
      <p>
        {three.name} {three.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  const [one, two, three] = props.course.parts
  return (
    <p>
      Number of exercises {one.exercises + two.exercises + three.exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))