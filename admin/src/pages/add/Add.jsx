import './Add.css'
import { useState } from 'react'
import service from '../../service/apiService'
import { toast } from 'react-toastify'

const Add = () => {
  const [image,setImage] = useState('')
  const [data,setData] = useState({
    name:"",
    description:"",
    price:""
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setData({...data,[name]:value})
  }

  //why use formdata??
  const onSubmitHandler = async(event) => {
    event.preventDefault()
    const formdata = new FormData();
    formdata.append('name',data.name)
    formdata.append('description',data.description)
    formdata.append('price',Number(data.price))
    formdata.append('image',image)
    const response = await service.addItem(formdata)
    if(response.data.name){
      setData({
        name:"",
        description:"",
        price:""
      })
      setImage(false)
      toast.success('Food Added')
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <div className='upload'>
              {
                image?
                <img className='upload' src={URL.createObjectURL(image)} alt="uploaded image" />:
                <i className="fi fi-rr-cloud-upload-alt "></i>
              } 
            </div>
          </label>
          <input onChange = {(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange = {onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required/>
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='write content here' required></textarea>
        </div>
        <div className="add-price flex-col">
          <p>Product price</p>
          <input onChange = {onChangeHandler} value = {data.price} type="number" name='price' placeholder='₹100' required/>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add
