import axios from 'axios';

const API_BASE_URL = 'https://aran-makina-8fce3ead0cbf.herokuapp.com/api';

export const fetchProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data.data;
};

export const fetchProductById = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
  return response.data.data;
};
