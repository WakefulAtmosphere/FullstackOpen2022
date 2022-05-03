import axios from 'axios'
const URL = 'http://localhost:3001/persons'

const get = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}
const add = newPerson => {
    const request = axios.post(URL, newPerson)
    return request.then(response => response.data)
}
const remove = person => {
    const request = axios.delete(`${URL}/${person.id}`)
    return request.then(response => response.data)
}
const change = person => {
    const request = axios.put(`${URL}/${person.id}`, person)
    return request.then(response => response.data)
}
export default { get, add, remove, change }