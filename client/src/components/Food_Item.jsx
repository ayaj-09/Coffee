import React, { useContext } from 'react'
import './Food_Item.css'
import { StoreContext } from '../context/StoreContext'
const Food_Item = ({id,name,price,image,description}) => {

  const {cartItem,addToCart,removeFromCart,url} = useContext(StoreContext)
  return (
    <div className='food_item'>
      <div className='food_item_image_container'>
        <img className='food_item_image' src={url+'/images/'+image}/>
        {
          !cartItem[id] ?  
          (
            <div className='add iconCenter' onClick = {()=> addToCart(id)}>
              <i className="fi fi-br-plus"></i>
            </div>
          ):
          (
            <div>
              <div className='food_item_increment_decrement' >
                <div onClick={() => addToCart(id)} className='increment iconCenter'>
                <i className="fi fi-br-plus"></i>
                </div >  
                <div className='count'>{cartItem[id]}</div>
                <div onClick={() => removeFromCart(id)} className='decrement iconCenter'>
                  <i className="fi fi-br-minus" ></i>
                </div> 
              </div>
              
            </div>
          )
        }
      </div>
      <div className='food_item_info'>
        <div className='food_item_name_price'>
          <p>{name}</p>
          <p className='food_item_price'>₹{price}</p>
        </div>
        <p className='food_item_decription'>{description}</p>
      </div>
    </div>
  )
}

export default Food_Item
