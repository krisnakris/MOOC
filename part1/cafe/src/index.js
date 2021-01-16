import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.header}</h1>
)

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;

  const total = (good, neutral, bad) => good + neutral + bad;
  const average = (good, neutral, bad) => (good - bad) / total(good, neutral, bad);
  const positive = (good, neutral, bad) => (good * 100) / total(good, neutral, bad);

  if (total(good, neutral, bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={total(good, neutral, bad)} />
      <Statistic text='average' value={average(good, neutral, bad)} />
      <Statistic text='positive' value={positive(good, neutral, bad)} />
    </table>
  )
}

const Statistic = (props) => {
  if (props.text === 'positive') {
    return (
      <tr>     
        <td>{props.text}</td>
        <td>  {props.value} %</td>
      </tr>
    )
  }

  return (
      <tr>     
        <td>{props.text}</td>
        <td>  {props.value}</td>
      </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Header header={'give feedback'} />

      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />

      <Header header={'statistics'} />

      <Statistics good={good} bad={bad} neutral={neutral} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)