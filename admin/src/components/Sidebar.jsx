import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to = '/' className="sidebar-option">
          <i className="fi fi-rr-add"></i>
          <p>Add Items</p>
        </NavLink>
        <NavLink to = '/list' className="sidebar-option">
        <i className="fi fi-bs-list-check"></i>
          <p>List Items</p>
        </NavLink>
        <NavLink to = '/orders' className="sidebar-option">
          <i className="fi fi-bs-list-check"></i>
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
