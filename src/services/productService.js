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

export const addProduct = async (product) => {
    const response = await axios.post(`${API_BASE_URL}/products/add`, product, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await axios.delete(`${API_BASE_URL}/products/delete/${productId}?productId=${productId}`);
    return response.data;
};

export const addProductFeature = async (featureData) => {
    const response = await axios.post(`${API_BASE_URL}/productfeatures/add`, featureData, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};

export const fetchFeatureNames = async () => {
    const response = await axios.get(`${API_BASE_URL}/featurenames`);
    return response.data.data;
};

export const updateProduct = async (productId, updatedProduct) => {
    const response = await axios.put(`${API_BASE_URL}/products/update/${productId}`, updatedProduct, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};
