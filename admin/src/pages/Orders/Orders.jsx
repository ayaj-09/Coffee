import { useEffect, useState } from 'react'
import service from '../../service/apiService'
import box from '../../assets/box.png'
import './Orders.css'

const Orders = () => {
  const [allOrders,setAllOrders] = useState([])

  useEffect(()=>{
    service.getAllorders()
    .then(response=>setAllOrders(response.data))
  },[])

  return (
    <div className="all-orders">
      <h2>My orders</h2>
      <div className="my-orders-details">
        {
          allOrders.map(order => (
            <div key = {order._id} className="one-order">
              <img src={box} alt="" />
              <div className="items">
                {order.items.map((item,index)=>(
                    <span key={index}>{item.name}x{item.quantity}</span>
                ))}
              </div>
              <div>₹{order.amount}</div>
              <div>items:{order.items.length}</div>
              <div>{order.status}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
