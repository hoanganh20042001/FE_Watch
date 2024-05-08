import axios from 'axios'
import getBaseURL from '../baseURL'

const baseAPIURL = getBaseURL()

const getListNews= async () => {
   
    const response = await axios.get(
        baseAPIURL + 'news/list-all?page=1&limit=100',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }
    )

    // Return the data from the response
    return response.data
}

const addNew = async (data, file) => {
    try {
      // const navigate = useNavigate()
      console.log(data)
      console.log(file)
      // Prepare the form data for the product creation
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('file', file);
      formData.append('content', data.content);
      // const baseAPIURL = getBaseURL()
      // console.log(baseAPIURL)
      const response = await axios.post(
        'http://localhost:8080/api/v1/news/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the content type for multipart form data
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the Authorization token
          },
        }
      );
      console.log(response.data)
      // if (navigate) {
      //   navigate('/admin');
      // }
      // Return the data from the response
      return response.data;
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error adding product:', error);
      throw error; // Rethrow the error to be handled by the caller if needed
    }
  };

export {
    getListNews,
    addNew,
}