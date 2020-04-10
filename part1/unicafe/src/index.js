import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({title}) => <h2>{title}</h2>
const Button = ({onClickFunc, text}) => <button onClick={onClickFunc}>{text}</button>
const Result = ({text, count}) => <p>{text} {count}</p>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodText = 'good'
  const neutralText = 'neutral'
  const badText = 'bad'

  const printFunction = (text) => () => console.log(text)

  const handleButtonClick = (text) => {
    switch (text) {
      case goodText : return () => setGood(good + 1);
      case neutralText : return () => setNeutral(neutral + 1);
      case badText : return () => setBad(bad + 1);
      default : return () => console.log('bad option', text);
    }
  }

  return (
    <>
      <Title title='Give feedback' />
      
      <Button onClickFunc={handleButtonClick(goodText)} text={goodText} />
      <Button onClickFunc={handleButtonClick(neutralText)} text={neutralText} />
      <Button onClickFunc={handleButtonClick(badText)} text={badText} />

      <Result text={goodText} count={good} />
      <Result text={neutralText} count={neutral} />
      <Result text={badText} count={bad} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)