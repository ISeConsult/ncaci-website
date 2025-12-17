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

export const useDashboardStore = defineStore('DashboardStore', () => {
  const dashboard = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchDashboard() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/dashboard/dashboard/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        dashboard.value = response.data.data
        console.log('dashboard display:', dashboard.value);
      }
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    } finally {
      loading.value = false
    }
  };

  return { dashboard, fetchDashboard, loading };
});