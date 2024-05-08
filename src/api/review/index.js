import axios from 'axios'
import getBaseURL from '../baseURL'

const baseAPIURL = getBaseURL()
const getReview= async (productId) => {
   
    const response = await axios.get(
        baseAPIURL+`Review/list-by-productId?productId=${productId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
    )

    // Return the data from the response
    return response.data
}
 
const createReview = async (data) => {
    const response = await axios.post(
        baseAPIURL+`Review/create`,data,
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
    getReview,
    createReview,

}