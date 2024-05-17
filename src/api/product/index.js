import axios from 'axios'
import getBaseURL from '../baseURL'

const baseAPIURL = getBaseURL()
const getListProduct = async () => {

  const response = await axios.get(
    baseAPIURL +'product/list-all?page=1&limit=100',
    // {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`
    //   },
    // }
  )

  // Return the data from the response
  return response.data
}
const getDetailProduct = async (id) => {

  const response = await axios.get(
    baseAPIURL +`product/detail?ProductId=${id}`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`
    //   },
    // }
  )

  // Return the data from the response
  return response.data
}
const searchProduct = async (data) => {

  const response = await axios.get(
    baseAPIURL +`product/list-all?page=1&limit=100&search=${data}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    }
  )

  // Return the data from the response
  return response.data
}

const filterProduct = async (data) => {

  const response = await axios.get(
    baseAPIURL+ `product/filter?page=1&limit=100&category=${data.category}&type=${data.type}&brand=${data.brand}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    }
  )

  // Return the data from the response
  return response.data
}

const addProduct = async (productData, file) => {
  try {
    // const navigate = useNavigate()
    console.log(productData)
    console.log(file)
    // Prepare the form data for the product creation
    const formData = new FormData();
    formData.append('discount', productData.discount);
    formData.append('brandId', productData.brand);
    formData.append('price', productData.price);
    formData.append('quantity', productData.quantity);
    formData.append('name', productData.name);
    formData.append('typeId', productData.type);
    formData.append('categoryId', productData.category);
    formData.append('file', file);
    formData.append('description', productData.descript);
    // const baseAPIURL = getBaseURL()
    // console.log(baseAPIURL)
    const response = await axios.post(
      baseAPIURL +'product/create',
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
const deleteProduct = async (data) => {
  const response = await axios.post(
    baseAPIURL +`product/delete?ProductId=${data}`, {},
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    }
  )

  // Return the data from the response
}

export {
  getListProduct,
  addProduct,
  searchProduct,
  deleteProduct,
  filterProduct,
  getDetailProduct
}