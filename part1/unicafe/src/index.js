import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const goodText = 'good'
const neutralText = 'neutral'
const badText = 'bad'
const allText = 'all'
const averageText = 'average'
const positivePercText = 'positive'
const noFeedbackGiven = 'No feedback given'

const Title = ({title}) => <h2>{title}</h2>
const Button = ({onClickFunc, text}) => <button onClick={onClickFunc}>{text}</button>
const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({good, neutral, bad}) => {
  const getAll = () => good+neutral+bad
  const getAverage = () => (good + (bad*-1))/getAll()
  const getPositivePercentage = () => (good/getAll()) * 100 

  return(
    getAll() > 0 ? 
    <table>
      <tbody>
        <Statistic text={goodText} value={good} />
        <Statistic text={neutralText} value={neutral} />
        <Statistic text={badText} value={bad} />
        <Statistic text={allText} value={getAll()} />
        <Statistic text={averageText} value={getAverage()} />
        <Statistic text={positivePercText} value={getPositivePercentage()+' %'} />
      </tbody>
    </table> :
    <p>{noFeedbackGiven}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleButtonClick = (text) => {
    switch (text) {
      case goodText: return () => setGood(good + 1);
      case neutralText: return () => setNeutral(neutral + 1);
      case badText: return () => setBad(bad + 1);
      default: return () => console.log('bad option', text);
    }
  }

  return (
    <>
      <Title title='Give feedback' />
      <Button onClickFunc={handleButtonClick(goodText)} text={goodText} />
      <Button onClickFunc={handleButtonClick(neutralText)} text={neutralText} />
      <Button onClickFunc={handleButtonClick(badText)} text={badText} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)