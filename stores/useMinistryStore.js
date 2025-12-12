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

export const useMinistryStore = defineStore('MinistryStore', () => {
  const ministries = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchMinistries() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/website/ministry-registries/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        ministries.value = response.data.data
        console.log('ministries display:', ministries.value);
      }
    } catch (error) {
      console.error("Error fetching ministries:", error);
    } finally {
      loading.value = false
    }
  };

  async function addMinistry(ministryData) {
    loading.value = true
    try {
      const response = await axios.post(`${baseUrl}/website/ministry-registries/`, ministryData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        console.log('Ministry added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding ministry:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateMinistry(ministryId, ministryData) {
    loading.value = true
    try {
      const response = await axios.patch(`${baseUrl}/website/ministry-registries/${ministryId}/`, ministryData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        console.log('Ministry updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating ministry:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteMinistry(ministryId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/website/ministry-registries/${ministryId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchMinistries();
        console.log('Ministry deleted');
      }
    } catch (error) {
      console.error("Error deleting ministry:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };
  
  return { ministries, fetchMinistries, loading, addMinistry, updateMinistry, deleteMinistry };
})