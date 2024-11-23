import React from 'react'
import { logo } from '../assets/export'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-left-content'>
            <img src={logo} className='footer-logo'/>
            <p><b>THE COFFEE</b>,your ultimate destination for everything coffee! We proudly offer an extensive selection of the finest coffee varieties, from classic Espressos and rich Cappuccinos to creamy Lattes and indulgent Mochas. Whether you love bold Americanos or crave unique blends like Cortados and Flat Whites, we’ve got it all</p>
            <div className='footer-social-icons'>
              <i className="fi fi-brands-facebook"></i>
              <i className="fi fi-brands-twitter-alt-circle"></i>
              <i className="fi fi-brands-linkedin"></i>
            </div>
          </div>
          <div className="footer-right-content">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>12456897897</li>
              <li>contact@tomato.com</li>
            </ul>
          </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @ Coffee.com - All Right Reserved.</p> 
    </div>
    
  )
}

export default Footer
