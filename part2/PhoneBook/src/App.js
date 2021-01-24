import React, { useState,useEffect } from 'react'
import personService from './services/persons'

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
      {props.name.name} {props.name.number} 
      <button onClick={props.removePersons}>delete</button>
  </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])

  useEffect(() => {
      personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
    })
  },[])

  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ showAll, setShowAll] = useState('');

  const checkDuplicate = () => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLocaleLowerCase() === newName.toLocaleLowerCase()) {
        return persons[i].id;
      }
    }
    return false;
  }

  const addPerson = (event) => {
    event.preventDefault();
    
    let flag = true;

    if (newName === '') {
      window.alert('Name cannot empty')
      flag = false;
    }

    const personObject = {
      name : newName,
      number : newNumber
    }

    let check = checkDuplicate();

    if (check && flag) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        updatePerson(check,personObject);
      }
    } 
    else if (!check && flag) {
      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })
    } 
  }

  const updatePerson = (id, newPerson) => {
    personService.update(id,newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(persons => persons.id === id ? returnedPerson : persons))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id) => {
    const person = persons.find(n => n.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(id).then(
      setPersons(persons.filter(n => n.id !== id)))
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

      <div>
        {namesToShow.map(name => 
          <Persons name = {name} key = {name.id} removePersons ={() => removePerson(name.id)}/>         
        )}
      </div>

    </div>
  )
}

export default App