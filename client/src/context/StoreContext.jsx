import { createContext,useEffect,useState } from "react"
export const StoreContext = createContext(null)
import axios from "axios"

const StoreContextProvider = (props) => {

  const [cartItem,setCartItem] = useState({})
  const [token,setToken] = useState('')
  const [coffee_list,setCoffee_list] = useState([])
  const [allOrders,setAllOrders] = useState([])

  const url = 'https://coffee-fnqm.onrender.com'

  const addToCart = async(itemId) => {
    let obj = cartItem 
    if(!obj[itemId]){
      obj = {...obj,[itemId]:1}
    }
    else{
      obj = {...obj,[itemId]:obj[itemId]+1}
    }
    const response = await axios.put(`${url}/api/users`,obj,{headers:{'Authorization':`Bearer ${token}`}})
    setCartItem(response.data.cartData)
  }

  const removeFromCart = async (itemId) => {
    const obj = {...cartItem,[itemId]:cartItem[itemId]-1}
    const response = await axios.put(`${url}/api/users`,obj,{headers:{'Authorization':`Bearer ${token}`}})
    setCartItem(response.data.cartData)
  }

  const getTotalAmount = () => {
    let totalAmount = 0
    for(let item of Object.keys(cartItem)){
      if(cartItem[item]>0){
        let itemInfo = coffee_list.find(product=>product.id==item)
        totalAmount += itemInfo.price*cartItem[item]
      }
    }
    return totalAmount
  }

  const fetchCoffeeList = async() => {
    const response = await axios.get(`${url}/api/coffee`)
    setCoffee_list(response.data)
  }

  const fetchOrders = async() => {
    const response = await axios.get(`${url}/api/orders`,{headers:{'Authorization':`Bearer ${token}`}})
    setAllOrders(response.data)
  }

  const orderIt = async (address) => {
    const items = []
    coffee_list.forEach(element => {
      if(cartItem[element.id]>0){
        items.push({name:element.name,quantity:cartItem[element.id]})
      }
    });
    const orderDetails = {
      items,
      amount:getTotalAmount(),
      address
    }
    const response = await axios.post(`${url}/api/orders`,orderDetails,{headers:{'Authorization':`Bearer ${token}`}})
    setAllOrders([...allOrders,response.data])
  }

  
  useEffect(()=>{
    fetchCoffeeList()
    .then(result=>result)
    let t = localStorage.getItem('token')
    if(t){
      setToken(t)
    }
  },[])

  useEffect(()=>{
    if(token){
      axios
      .get(`${url}/api/users/cartData`,{headers:{'Authorization':`Bearer ${token}`}})
      .then(response=>setCartItem(response.data))
      .catch(error=>console.log(error.response.data.error))  

    axios.get(`${url}/api/orders`,{headers:{'Authorization':`Bearer ${token}`}})
    .then(response=>setAllOrders(response.data))
    .catch(error=>console.log(error))
    }
    
  },[token])


  const contextValue = {
    coffee_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalAmount,
    url,
    token,
    setToken,
    orderIt,
    allOrders,
    setAllOrders,
    fetchOrders
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider