import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

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
      <div>
        filter shown with <input value={showAll} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePersonNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {namesToShow.map(name =>
          <div> {name.name} {name.number}</div>
        )}
      </div>
    </div>
  )
}

export default App