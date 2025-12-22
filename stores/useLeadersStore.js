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

export const useLeadersStore = defineStore('LeadersStore', () => {
  const leaders = ref([])
  
  const config = useRuntimeConfig()
    const baseUrl = config.public.baseUrl

  async function fetchLeaders() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/dashboard/church-leaders/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        leaders.value = response.data.data
        console.log('events display:', leaders.value);
      }
    } catch (error) {
      console.error("Error fetching leaders:", error);
    } finally {
      loading.value = false
    }
  };

  async function addLeader(leaderData) {
    loading.value = true
    try {
      let data = leaderData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (leaderData.image && (leaderData.image.file || leaderData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(leaderData).forEach(key => {
          if (key === 'image' && leaderData[key]) {
            // Handle FileInput
            if (leaderData[key].file) {
              formData.append(key, leaderData[key].file);
            } else if (leaderData[key] instanceof File) {
              formData.append(key, leaderData[key]);
            }
          } else if (leaderData[key] !== null && leaderData[key] !== undefined) {
            formData.append(key, leaderData[key]);
          }
        });

        data = formData;
      } else {
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios.post(`${baseUrl}/dashboard/church-leaders/`, data, { headers });
      if (response.data) {
        await fetchLeaders();
        console.log('Leader added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding leader:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateLeader(leaderId, leaderData) {
    loading.value = true
    try {
      let data = leaderData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (leaderData.image && (leaderData.image.file || leaderData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(leaderData).forEach(key => {
          if (key === 'image' && leaderData[key]) {
            // Handle FileInput component output
            if (leaderData[key].file) {
              formData.append(key, leaderData[key].file);
            } else if (leaderData[key] instanceof File) {
              formData.append(key, leaderData[key]);
            }
          } else if (leaderData[key] !== null && leaderData[key] !== undefined) {
            formData.append(key, leaderData[key]);
          }
        });

        data = formData;
        // Remove Content-Type header to let axios set it for FormData
      } else {
        data = { ...leaderData };
        if (data.image && !(data.image.file || data.image instanceof File)) {
          delete data.image;
        }
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios.patch(`${baseUrl}/dashboard/church-leaders/${leaderId}/`, data, { headers });
      if (response.data) {
        await fetchLeaders();
        console.log('Leader updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating leader:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteLeader(leaderId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/dashboard/church-leaders/${leaderId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchLeaders();
        console.log('Leader deleted');
      }
    } catch (error) {
      console.error("Error deleting leader:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  return { leaders, loading, fetchLeaders, addLeader, updateLeader, deleteLeader };
})