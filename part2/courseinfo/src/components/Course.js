import React from 'react'

const Header = ({courseName}) => <h2>{ courseName }</h2>

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
  const total = parts.reduce((total, part) => part.exercises + total, 0)
    return (
    <p>
      <b> total of {total} exercises </b>
    </p>
  ) 
}

const Course = ({courses}) => {
    return(
        <>
        {
            courses.map(course => 
                <div key={course.id}>
                    <Header courseName={ course.name } />
                    <Content parts={ course.parts }/>
                    <Total parts={ course.parts }/>
                </div>)
        }
        </>
    )
}

export default Course
