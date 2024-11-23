import './Navbar.css'
import {logo} from '../assets/export'
import { useContext, useState } from 'react'
import {useNavigate,Link, useLocation} from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Navbar = ({setShowPopup}) => {

  const [state,setState] = useState('home')
  const {getTotalAmount,token,setToken,setCartItem} = useContext(StoreContext)

  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItem({})
    navigate('/')
  }

  return (
    <div className = 'navbar'>
      <Link to = {'/'}><img src={logo} alt='logo' className='logo'/></Link>
      {
        location.pathname==='/'?
        (
          <div className="navbar-items">
            <ul className="nav-list">
              <Link to={'/'} onClick={() => setState('home')} className={state === 'home' ? 'active' : ''}>home</Link>
              <a href='#coffee_list' onClick={() => setState('menu')} className={state === 'menu' ? 'active' : ''}>menu</a>
              <a href='#footer' onClick={() => setState('contact-us')} className={state === 'contact-us' ? 'active' : ''}>contact us</a>
            </ul>
          </div>
        ):
        (
          ""
        )
      }
      
      <div className='navbar-right'>
        <div className='navbar-icons'>
          <Link to={'/cart'}><i className="fi fi-sr-shopping-cart navbar-right-cart"></i></Link>
          <div className={getTotalAmount()===0?'':'dot'}></div>
        </div> 
        {
          !token? 
          <button className='btn' onClick={() => setShowPopup(true)}>sign in</button>:
          <div className='navbar-profile'>
            <i className="fi fi-sr-user user"></i>
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><i className="fi fi-rr-shopping-bag"></i> orders</li>
              <hr />
              <li onClick={logout}><i className="fi fi-br-exit"></i>Log out  </li>
            </ul>
          </div>

        }
      </div>
    </div>
  )
}

export default Navbar
