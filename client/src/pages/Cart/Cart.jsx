import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Cart = () => {
  const {coffee_list,removeFromCart,cartItem,getTotalAmount,url} = useContext(StoreContext)

  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {
          coffee_list.map((item,index)=>{
            if(cartItem[item.id]>0){
              return (
                <div key = {item.id}>
                  <div  className="cart-item-title cart-items-item main">
                    <img src={url+'/images/'+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <p>{cartItem[item.id]}</p>
                    <p>₹{item.price*cartItem[item.id]}</p>
                    <p onClick={() => removeFromCart(item.id)} className='cross'>x</p>
                  </div>
                  <hr/>
                </div>
              )
            }
          })
        }
      </div>
      <div className='cart-bottom'>
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
          <button onClick={() => {getTotalAmount() !== 0?navigate('/order'):toast.error('Add items to proceed') }}>PROCEED TO CHECKOUT</button>

        </div>
      </div>
    </div>
  )
}

export default Cart
