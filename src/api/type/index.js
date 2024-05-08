import axios from 'axios'
import getBaseURL from '../baseURL'

const baseAPIURL = getBaseURL()
const getListType= async () => {
   
    const response = await axios.get(
      baseAPIURL+'type/list-all?page=1&limit=10',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
    )

    // Return the data from the response
    return response.data
}
 
const createType = async (data) => {
    const response = await axios.post(
        baseAPIURL+`type/create`,data,
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
    getListType,
    createType,

}