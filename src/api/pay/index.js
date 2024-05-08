import axios from 'axios'
import getBaseURL from '../baseURL'

const baseAPIURL = getBaseURL()

const getListPay= async () => {
   
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

const getListPayByUserId= async (userId) => {
   
    const response = await axios.get(
        baseAPIURL + `http://localhost:8080/api/v1/pay/list-by-userId?userId=${userId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
    )

    // Return the data from the response
    return response.data
}

const pay = async (data) => {
    const response = await axios.post(
        baseAPIURL+`pay/create`,data,
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

  const tablePay= async () => {
   
    const response = await axios.get(
       'http://localhost:8080/api/v1/pay/pay',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
    )

    // Return the data from the response
    return response.data
}
export {
    getListPay,
    getListPayByUserId,
    pay,
    tablePay
}