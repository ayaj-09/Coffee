import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import Food_Item from './Food_Item'
import './Food_display.css'
const Food_display = () => {

  const {coffee_list} = useContext(StoreContext)
  return (
    <div className='coffee_list' id = 'coffee_list'>
      <hr/>
      <h2>Best Coffee Near You</h2>
      <div className='coffee_list_display'>
      {
        coffee_list.map(item => (
        <Food_Item key = {item.id} price = {item.price} name = {item.name} image = {item.image} description={item.description} id = {item.id}/>))
      }
      </div>
      
    </div>
  )
}

export default Food_display
