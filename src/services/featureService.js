// featureService.js
import axios from 'axios';

const API_BASE_URL = 'https://aran-makina-8fce3ead0cbf.herokuapp.com/api'; // Base URL'inizi güncelleyin

// Özellik isimlerini getirme fonksiyonu
export const fetchFeatureNames = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/featurenames`);
    return response.data.data;
  } catch (error) {
    console.error('Özellik isimleri alınırken hata oluştu:', error);
    throw error;
  }
};

// Yeni özellik ismi ekleme fonksiyonu
export const addFeatureName = async (featureName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/featurenames/add`, {
      name: featureName,
    });
    return response.data;
  } catch (error) {
    console.error('Özellik ismi eklenirken hata oluştu:', error);
    throw error;
  }
};

// Özellik ismini silme fonksiyonu
export const deleteFeatureName = async (featureNameId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/featurenames/delete/${featureNameId}`);
    return response.data;
  } catch (error) {
    console.error('Özellik ismi silinirken hata oluştu:', error);
    throw error;
  }
};

// Özellik ismini güncelleme fonksiyonu
export const updateFeatureName = async (featureNameId, updatedName) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/featurenames/update/${featureNameId}`, {
      name: updatedName,
    });
    return response.data;
  } catch (error) {
    console.error('Özellik ismi güncellenirken hata oluştu:', error);
    throw error;
  }
};
