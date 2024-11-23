import { useEffect, useState } from 'react'
import service from '../../service/apiService'
import './List.css'
import { toast } from 'react-toastify'

const List = () => {
  const [list,setList] = useState([])

  const fetchList = async() =>{
    const response = await service.getList()
    if(response.data.length){
      setList(response.data)
    }
    else{
      toast.error('Error')
    }
  }

  const removeCoffee = async (id) =>{
    const response = await service.removeItem(id)
    console.log(response)
    setList(list.filter(l=>l.id!==id))
    if(response.status==204){
      toast.success('Item Deleted')
    }
    else{
      toast.error('Error')
    }

  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          list.map((item)=>{
            return(
              <div key = {item.id} className="list-table-format">
                <img src={`${service.URL}/images/${item.image}`}/>
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p onClick={()=>removeCoffee(item.id)} className='cursor'>x</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default List
