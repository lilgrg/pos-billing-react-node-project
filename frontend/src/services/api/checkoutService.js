import axios from 'axios';

const API_URL = 'http://localhost:5000/api/checkout/';

const createOrder = async (orderData) => {
  const response = await axios.post(`${API_URL}create`, orderData);
  return response.data;
};

const getOrderDetails = async (orderId) => {
  const response = await axios.get(`${API_URL}${orderId}`);
  return response.data;
};

export default {
  createOrder,
  getOrderDetails,
};