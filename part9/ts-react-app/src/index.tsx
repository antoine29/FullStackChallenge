import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = (props) => <h1>{ props.name }</h1>

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWithDescrition extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CourseWithDescrition {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseWithDescrition {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseWithDescrition {
  name: "New type";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

interface ContentProps<P> {
  content: Array<P>;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content: React.FC<ContentProps<CoursePart>> = (props) => {
  return (
    <>
      {
        props.content.map((course, index) => {
          switch(course.name){
            case "Fundamentals": return <p key={index}> {course.name} {course.exerciseCount} {course.description}</p>;
            case "Using props to pass data": return <p key={index}> {course.name} {course.exerciseCount} {course.groupProjectCount}</p>;
            case "Deeper type usage": return <p key={index}> {course.name} {course.exerciseCount} {course.description} {course.exerciseSubmissionLink}</p>;
            case "New type": return <p key={index}> {course.name} {course.exerciseCount} {course.description}</p>;
            default: return assertNever(course);
          }
        })
      }
    </>
  );
};

interface TotalProps<P> {
  courseParts: Array<P>;
}

const Total: React.FC<TotalProps<CoursePart>> = ({courseParts}) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p> 
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "New type",
      exerciseCount: 100,
      description: "New description"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />      
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));