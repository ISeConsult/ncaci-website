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

export const useGallaryStore = defineStore('GallaryStore', () => {
  const gallaries = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchGallaries() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/dashboard/gallery-images/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        gallaries.value = response.data.info
        console.log('gallaries display:', gallaries.value);
      }
    } catch (error) {
      console.error("Error fetching gallaries:", error);
    } finally {
      loading.value = false
    }
  };

  async function addGallary(gallaryData) {
    loading.value = true
    try {
        let data = gallaryData;
        let headers = {
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        };
    
        // Check if we have files to upload
        if (gallaryData.image && (gallaryData.image.file || gallaryData.image instanceof File)) {
          const formData = new FormData();
    
          // Append all fields to FormData
          Object.keys(gallaryData).forEach(key => {
            if (key === 'image' && gallaryData[key]) {
              // Handle FileInput component output
              if (gallaryData[key].file) {
                formData.append(key, gallaryData[key].file);
              } else if (gallaryData[key] instanceof File) {
                formData.append(key, gallaryData[key]);
              }
            } else if (gallaryData[key] !== null && gallaryData[key] !== undefined) {
              formData.append(key, gallaryData[key]);
            }
          });
    
          data = formData;
          // Remove Content-Type header to let axios set it for FormData
        } else {
          delete headers['Content-Type'];
        }
    
        const response = await axios.post(`${baseUrl}/dashboard/gallery-images/`, data, { headers });
        if (response.data) {
          fetchGallaries();
          console.log('Gallary added successfully:', response.data);
            return response;
        }
      } catch (error) {
        console.error("Error adding gallary:", error);
        throw error;
      } finally {
        loading.value = false
      }
    }

    async function deleteGallary(gallaryId) {
      loading.value = true
      try {
        const response = await axios.delete(`${baseUrl}/dashboard/gallery-images/${gallaryId}/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': decryptData(localStorage.getItem('authToken')),
            'Accept': 'application/json'
          }
        });
        if (response.status === 200 || response.status === 204) {
          await fetchGallaries();
          console.log('Gallary deleted');
        }
      } catch (error) {
        console.error("Error deleting gallary:", error);
        throw error;
      } finally {
        loading.value = false
      }
    }

  return { gallaries, fetchGallaries, loading, addGallary, deleteGallary };
});