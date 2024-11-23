import Navbar from "./components/Navbar"
import { Routes,Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder"
import Footer from "./components/Footer"
import { useState } from "react"
import Loginpopup from "./components/Loginpopup"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Myorders from "./pages/myOrders/Myorders"

const App = () => {
  const [showPopup,setShowPopup] = useState(false)
  document.documentElement.style.overflow=showPopup?'hidden':''
  return (
    <>
    <ToastContainer/>
    {
      showPopup?<Loginpopup setShowPopup={setShowPopup}/>:<></>
    }
      <div className="app">
        <Navbar setShowPopup={setShowPopup}/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/cart' element = {<Cart/>}/>
          <Route path = '/order' element = {<PlaceOrder/>}/>
          <Route path = '/myorders' element = {<Myorders/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
    
  )
}

export default App
