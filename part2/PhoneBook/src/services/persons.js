import axios from 'axios';
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data)
    .catch(error => {
      console.log(error.response.data);
    })
}

const getSinglePerson = (id) => {
  const request = axios.get(`${baseUrl}/{id}`);
  return request.then(response => response.data);
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`,newObject);
  return request.then(response => response.data);
}

const serviceList = {getAll, create, remove, update, getSinglePerson}

export default serviceList

