import React from 'react'
import ReactDOM from 'react-dom'

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
      <Header course={ course.name } />
      <Content parts={ course.parts }/>
      <Total parts={ course.parts }/>
    </div>
  )
}

const Header = props => <h1>{ props.course }</h1>

const Content = props => {
  return (
    <>
    {
      props.parts.map(part => <Part part={ part } />)
    }
    </>
  )
}

const Part = props => {
  return (
    <p>
      { props.part.name } { props.part.exercises }
    </p>
  )
}

const Total = props => {
  return (
    <p>
      Number of exercises { props.parts.reduce((total, part) => part.exercises + total, 0) }
    </p>
  ) 
} 

ReactDOM.render(<App />, document.getElementById('root'))