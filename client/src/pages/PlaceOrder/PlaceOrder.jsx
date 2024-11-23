import React, { useContext,useEffect,useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

const PlaceOrder = () => {
  const [address,setAddress] = useState({})
  const {getTotalAmount,orderIt} = useContext(StoreContext)
  const navigate = useNavigate()
  const onAddressChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setAddress({...address,[name]:value})
  }

  const order = async(event) =>{
    event.preventDefault()
    await orderIt(address)
    setTimeout(()=>{
      navigate('/myorders')
    },1000)
    toast.success('Order confirmed')
  }

  return (
    <form onSubmit = {order} className="place-order">
      <div className="place-order-left">
        <h3>Delivery Information</h3 >
        <div className="multi-fields">
          <input type="text" placeholder='First name' required />
          <input type="text" placeholder='Last name' required />
        </div>
        <input type="email" placeholder='Email address' required />
        <input type="text" onChange={onAddressChange} placeholder='Street' name='Street' required />
        <div className="multi-fields">
          <input onChange={onAddressChange} type="text" name='city' placeholder='City' required />
          <input onChange={onAddressChange} type="text" name='State' placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input type="text" onChange={onAddressChange} name='Zip-code' placeholder='Zip code' required />
          <input type="text" onChange={onAddressChange} name='country' placeholder='Country' required />
        </div>
        <input type="text" onChange={onAddressChange} name='phoneNumber' placeholder='Phone' required />
      </div>
      <div className="place-order-right">
      <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className="cart-total-detail">
            <p>Subtotal</p>
            <p>₹{getTotalAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-detail">
            <p>Delivery Fee</p>
            <p>₹{getTotalAmount() == 0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-detail main">
            <p>Total</p>
            <p>₹{getTotalAmount()+(getTotalAmount() == 0?0:2)}</p>
          </div>
          <hr />
          <button type='submit'className='cart-btn'>ORDER</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
