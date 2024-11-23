import axios from "axios"


const URL = 'http://localhost:3001'
const addItem = async(data) => {
  return await axios.post(URL+'/api/coffee',data)
}

const getList = async()=>{
  return await axios.get(`${URL}/api/coffee`)
}

const removeItem = async(id) => {
  return await axios.delete(`${URL}/api/coffee/${id}`)
}

const getAllorders = () => {
  return axios.get(`${URL}/api/orders/all`)
}
export default {
  addItem,
  getList,
  removeItem,
  getAllorders,
  URL
}