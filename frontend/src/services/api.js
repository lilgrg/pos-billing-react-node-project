import axios from 'axios';  

const api = axios.create({  
  baseURL: process.env.REACT_APP_API_URL,  
});  

// Example of a GET request  
export const getData = async (endpoint) => {  
  try {  
    const response = await api.get(endpoint);  
    return response.data;  
  } catch (error) {  
    console.error('Error fetching data:', error);  
    throw error;  
  }  
};  

// Example of a POST request  
export const postData = async (endpoint, data) => {  
  try {  
    const response = await api.post(endpoint, data);  
    return response.data;  
  } catch (error) {  
    console.error('Error posting data:', error);  
    throw error;  
  }  
};  

export default api;  