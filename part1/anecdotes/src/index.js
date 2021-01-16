import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.header}</h1>
)

const Button = ({onClick,text}) => {
  return (
    <button onClick = {onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));
  console.log(anecdotes.length);

  const generateRandom = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  const voting = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  }

  const popularVotes = () => {
    let max = 0;

    for (let i = 0; i < vote.length; i++) {
      if (vote[i] > vote[max]) {
        max = i;
      }
    }
    return max;
  }

  return (
    <div>
      <Header header = {'Anecdote of the day'} />
      <tr>{props.anecdotes[selected]} </tr>
      <tr>has {vote[selected]} votes</tr>
      <Button onClick = {voting} text = 'vote'/>
      <Button onClick = {generateRandom} text='next anecdote'/>
      <Header header = 'Anecdote with most votes' />
      <tr>{props.anecdotes[popularVotes()]}</tr>
      <tr>has {vote[popularVotes()]} votes</tr>
   </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)