import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data.data;
};

export const fetchProductById = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
  return response.data;
};
