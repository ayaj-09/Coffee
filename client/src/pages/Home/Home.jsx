import React from 'react'
import './Home.css'
import Header from '../../components/Header'
import Food_display from '../../components/Food_display'
const Home = () => {
  return (
    <div className='home'>
      <Header/>
      <Food_display/>
    </div>
  )
}

export default Home
