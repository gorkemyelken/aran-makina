import axios from 'axios';

const API_BASE_URL = 'https://aran-makina-8fce3ead0cbf.herokuapp.com/api';

export const fetchCategories = async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data.data;
};

export const deleteCategory = async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/categories/delete/${id}`);
    return response.data;
};

export const reorderCategories = async (orderedCategoryIds) => {
    const response = await axios.post(`${API_BASE_URL}/categories/reorder`, orderedCategoryIds, {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
};
