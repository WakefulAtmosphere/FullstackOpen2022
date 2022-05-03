import personsService from './services/persons.js'
import { useState, useEffect } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [nameFilter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({content: '', type: ''})
  const handleFilterChange = event => {
      setFilter(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }
  const handleNumChange = event => {
    setNewNumber(event.target.value)
}
  const handleAdd = () => {
    let change = false
    let personList = persons
    if (persons.some(person => person.name === newName)) {
      if (!window.confirm(`${newName} already exists. Do you want to replace it?`)) return true
      const updatedPerson = {
        name: newName, 
        number: newNumber, 
        id: persons.find(person => person.name === newName).id}
      handleEntryChange(updatedPerson)
      setNewName('')
      setNewNumber('')
      return true
    }
    const newPerson = {name: newName, number: newNumber}
    personsService.add(newPerson).then(data => setPersons(personList.concat(data)))
    setNewName('')
    setNewNumber('')
    setNotification({content: `${newName} was added successfully`, type: 'success'})
    return true
  }
  const handleDelete = (deletedPerson) => {
    setPersons(persons.filter(person => person.name !== deletedPerson.name))
    personsService.remove(deletedPerson)
      .catch(() => setNotification({content: `Information about ${deletedPerson.name} no longer exists on the server`, type: "fail"}))
    setNotification({content: `${deletedPerson.name} was removed successfully`, type: 'success'})
    return persons.filter(person => person.name !== deletedPerson.name)
  }
  const handleEntryChange = (updatedPerson) => {
    personsService.change(updatedPerson)
      .then(() => setNotification({content: `${newName} was updated successfully`, type: 'success'}))
      .catch(() => {
        setPersons(persons.filter(person => person.id !== updatedPerson.id))
        setNotification({content: `Information about ${updatedPerson.name} no longer exists on the server`, type: "fail"})})
    setPersons(persons.filter(person => person.id !== updatedPerson.id).concat(updatedPerson))
    
    return true
  }
  const fetchData = () => {
    personsService.get().then(data => setPersons(data))
  }
  const createNotification = (content, type) => {
    setNotification({content: content, type: type})
    setTimeout(() => {setNotification({...notification, content: ''})}, 5000)
  }
  useEffect(fetchData, [])
  return (
    <div>
      <Notification set = {setNotification} notification = {notification}/>
      <h2>Phonebook</h2>
      <Filter value = {nameFilter} handleChange={handleFilterChange}/>
      <button onClick = {() => createNotification("click", "success")}>test notification</button>
      <h2>add new</h2>
      <PersonForm newName = {newName}  newNumber = {newNumber} handleNameChange = {handleNameChange} handleNumChange = {handleNumChange} handleClick = {handleAdd}/>
      <h2>Numbers</h2>
      <Persons persons = {persons} filter = {nameFilter} handleDelete = {handleDelete}/>
    </div>
  )

}
const Filter = ({value, handleChange}) => (
    <div>
        filter shown with
        <input value = {value} 
               onChange = {handleChange}>
        </input>
    </div>
)
const PersonForm = ({newName, newNumber, handleNameChange, handleNumChange, handleClick}) => (
    <form>
        <div>
          name: <input value = {newName} onChange = {handleNameChange}/><br/>
          number: <input value = {newNumber} onChange = {handleNumChange}/>
        </div>
        <div>
          <button type="submit" onClick = {event => {
            event.preventDefault()
            handleClick()}}>add</button>
        </div>
      </form>
)
const Persons = ({persons, filter, handleDelete}) => (
    persons
      .filter(person => {
        return person.name.toUpperCase().includes(filter.toUpperCase())})
      .map(person => <PersonListing key = {person.name} person = {person} handleDelete = {handleDelete}/>)
)

const PersonListing = ( {person, handleDelete} ) => (
  <div>
    {person.name} {person.number} <button onClick = {() => window.confirm(`Delete ${person.name}?`) ? handleDelete(person) : {}}>delete</button>
  </div>
)

const Notification = ( {set, notification}) => {

  const colourFail = 'red'
  const colourSuccess = 'green'
  const colour = notification.type === "success" ? colourSuccess : colourFail
  const divStyles = {
    background: "lightgrey",
    borderColor: colour,
    borderStyle: "solid",
    borderRadius: 25,
    borderWidth: 7,
    paddingLeft: 15
  }
  const contentStyles = {
    color: colour
  }
  if (notification.content.length > 0) {
    return (
      <div style = {divStyles} onClick = {() => set({...notification, content: ''})}>
        <h1 style = {contentStyles}>{notification.content}</h1>
      </div>
    )
  }
}
export default App