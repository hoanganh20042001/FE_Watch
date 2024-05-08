import axios from 'axios'
import getBaseURL from '../baseURL'

const baseAPIURL = getBaseURL()
const getListCategory = async () => {
   
    const response = await axios.get(
        baseAPIURL +  'category/list-all?page=1&limit=10',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
    )

    // Return the data from the response
    return response.data
}
// update identification

export {
    getListCategory,

}