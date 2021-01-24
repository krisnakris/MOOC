import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
return (
    <div>
      filter shown with <input value={props.value} onChange={props.onChange}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
    <div>
      name: <input value={props.valuePerson} onChange={props.onChangePerson}/>
    </div>
    <div>
      number: <input value={props.valueNumber} onChange={props.onChangeNumber}/>
    </div>
    <div>
      <button type={props.type}>add</button>
    </div>
  </form>
  )
}

const Persons = (props) => {
  return (
    <div>
    {props.name.map(name =>
      <div key={name.id}> {name.name} {name.number}</div>
    )}
  </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])

  useEffect(() => {
  console.log('effect');
  axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promised fulfilled');
      setPersons(response.data);
    })
  },[])

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ showAll, setShowAll] = useState('');

  const checkDuplicate = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLocaleLowerCase() === newName.toLocaleLowerCase()) {
        return true;
      }
    }
    return false;
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (checkDuplicate()) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
        const personObject = {
        name : newName,
        number : newNumber
      }
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    } 
  }

  const handleFilterChange = (event) => {
    setShowAll(event.target.value);
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePersonNumber = (event) => {
    setNewNumber(event.target.value);
  }

  const namesToShow = showAll === ''
  ? persons
  : persons.filter(person => person.name.toLocaleLowerCase().includes(showAll.toLocaleLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {showAll} onChange= {handleFilterChange}/>

      <h2>add a new</h2>

      <PersonForm onSubmit = {addPerson} valuePerson = {newName} onChangePerson 
       = {handlePersonChange} valueNumber = {newNumber} onChangeNumber = {handlePersonNumber}
      type= 'submit'
      />

      <h2>Numbers</h2>

      <Persons name = {namesToShow}/>

    </div>
  )
}

export default App