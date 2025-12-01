import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import CryptoJS from 'crypto-js';

// Secret key for encryption (consider moving to environment variables for better security)
const SECRET_KEY = 'your-secret-key-here'; // Replace with a secure key

// Function to decrypt data
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const loading = ref(false)

export const useCategoryStore = defineStore('CategoryStore', () => {
  const categories = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchCategories() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/auth/categories/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        categories.value = response.data.data
        console.log('categories display:', categories.value);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      loading.value = false
    }
  };

  async function addCategory(categoryData) {
    loading.value = true
    try {
      const response = await axios.post(`${baseUrl}/auth/categories/`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        await fetchCategories();
        console.log('Category added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateCategory(categoryId, categoryData) {
    loading.value = true
    try {
      const response = await axios.patch(`${baseUrl}/auth/categories/${categoryId}/`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        await fetchCategories();
        console.log('Category updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteCategory(categoryId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/auth/categories/${categoryId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchCategories();
        console.log('Category deleted');
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  return { categories, loading, fetchCategories }
})