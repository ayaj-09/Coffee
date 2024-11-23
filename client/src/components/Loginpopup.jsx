import React, { useContext, useState } from 'react'
import './Loginpopup.css'
import { StoreContext } from '../context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Loginpopup = ({setShowPopup}) => {

  const {url,token,setToken,setCartItem} = useContext(StoreContext)
  const [currState,setCurrState] = useState('Login')
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""  
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setData({...data,[name]:value})
  }

  const onLogin = async(event) =>{
    event.preventDefault()
    let newUrl = url
    if(currState==='Login'){
      newUrl += '/api/users/login'
    }
    else{
      newUrl += '/api/users/register'
    }
    try{
      const response = await axios.post(newUrl,data)
      setToken(response.data.token)
      setCartItem(response.data.cartData)
      localStorage.setItem('token',response.data.token)
      setShowPopup(false)
    }
    catch(error){
      toast.error(error.response.data.error)
    }
  }
  
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <i onClick={() => setShowPopup(false)} className="fi fi-br-cross"></i>
        </div>
        <div className="login-popup-inputs">
          {
            currState==='Login'?<></>:<input onChange = {onChangeHandler} value={data.name} type="text" name='name' placeholder='your name'required />
          }
          <input onChange = {onChangeHandler} value={data.email} type="email" name='email' placeholder='email' required />
          <input onChange = {onChangeHandler} value={data.password} type="password" name='password' placeholder='password' required />
        </div>
        <button type='submit'>{currState === 'Sign up'? "Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use $ privacy policy.</p>
        </div>
        {
          currState==='Sign up'?
          <p>Already have an account?<span onClick={() => setCurrState('Login')}>Login here</span></p>:
          <p>Create a new account?<span onClick={()=>setCurrState('Sign up')}>Click here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default Loginpopup
