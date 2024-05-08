import axios from 'axios'
import getBaseURL from '../baseURL'

const baseAPIURL = getBaseURL()

const getListOrder= async () => {
   
    const response = await axios.get(
        baseAPIURL + 'pay/list-all?page=1&limit=10',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
    )

    // Return the data from the response
    return response.data
}

const getListOrderByUser= async (userId) => {
   
    const response = await axios.get(
        baseAPIURL + `order/list-all?userId=${userId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
    )

    // Return the data from the response
    return response.data
}

const orderProduct = async (data) => {
    const response = await axios.post(
        baseAPIURL+`order/create`,data,
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    )
    
    return response.data
    // Return the data from the response
  }

  const deleteOrder = async (id) => {
    const response = await axios.post(
        baseAPIURL+`order/delete?OrderId=${id}`,{},
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
      }
    )
    
    return response.data
    // Return the data from the response
  }

export {
    getListOrder,
    getListOrderByUser,
    orderProduct,
    deleteOrder

}