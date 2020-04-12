import React from 'react'

const Header = ({courseName}) => <h1>{ courseName }</h1>

const Content = ({parts}) => {
  return (
    <>
    {
      parts.map(part => <Part part={part} key={part.id} />)
    }
    </>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({parts}) => {
  return (
    <p>
      <b> total of { parts.reduce((total, part) => part.exercises + total, 0) } exercises </b>
    </p>
  ) 
}

const Course = ({course}) => {
    return (
        <div>
            <Header courseName={ course.name } />
            <Content parts={ course.parts }/>
            <Total parts={ course.parts }/>
        </div>
    )
}

export default Course
