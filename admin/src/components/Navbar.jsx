import './Navbar.css'
import { logo } from '../assets/exports'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img  className='logo' src={logo} alt="web logo" />
      <i className="fi fi-sr-user profile"></i>    
    </div>
  )
}

export default Navbar
