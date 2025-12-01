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

export const useActivityStore = defineStore('ActivityStore', () => {
  const activities = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchActivities() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/auth/activities/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        activities.value = response.data.data
        console.log('activities display:', activities.value);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      loading.value = false
    }
  };

  async function addActivity(activityData) {
    loading.value = true
    try {
      const response = await axios.post(`${baseUrl}/auth/activities/`, activityData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        await fetchActivities();
        console.log('Activity added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding activity:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateActivity(activityId, activityData) {
    loading.value = true
    try {
      const response = await axios.patch(`${baseUrl}/auth/activities/${activityId}/`, activityData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        await fetchActivities();
        console.log('Activity updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteActivity(activityId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/auth/activities/${activityId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchActivities();
        console.log('Activity deleted');
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  return { activities, loading, fetchActivities, addActivity, updateActivity, deleteActivity };
})