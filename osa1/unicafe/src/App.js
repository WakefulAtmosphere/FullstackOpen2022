import { useState } from 'react'

const Statistics = ({good, bad, neutral}) => (
  <table>
    <tbody>
      <StatisticLine text = "good" value = {() => good}/>
      <StatisticLine text = "neutral" value = {() => neutral}/>
      <StatisticLine text = "bad" value = {() => bad}/>
      <StatisticLine text = "all" value = {() => good + neutral + bad}/>
      <StatisticLine text = "average" value = {() => (good - bad)/(good + neutral + bad)}/>
      <StatisticLine text = "positive" value = {() => (good)/(good + neutral + bad)}/>
    </tbody>
  </table>
)
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}:</td>
    <td>{value()}</td>
  </tr>
)
const Button = ({text, handleClick}) => (
  <button onClick = {handleClick}>{text}</button>
)
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  let count = good + bad + neutral

  return (
    <div>
      <h1>give feedback</h1>
      <div style={{display: "flex"}}>
        <Button handleClick = {handleGood} text="good"/>
        <Button handleClick = {handleNeutral} text="neutral"/>
        <Button handleClick = {handleBad} text="bad"/>
      </div>
      <h3>statistics:</h3>
      {count > 0 ? <Statistics good = {good} neutral = {neutral} bad = {bad}/> : <p>No statistics given</p>}
    </div>
  )
}

export default App