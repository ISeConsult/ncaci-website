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
      const response = await axios.get(`${baseUrl}/dashboard/activities/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        activities.value = response.data.message
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

      let data = activityData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (activityData.image && (activityData.image.file || activityData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(activityData).forEach(key => {
          if (key === 'image' && activityData[key]) {
            // Handle FileInput component output
            if (activityData[key].file) {
              formData.append(key, activityData[key].file);
            } else if (activityData[key] instanceof File) {
              formData.append(key, activityData[key]);
            }
          } else if (activityData[key] !== null && activityData[key] !== undefined) {
            formData.append(key, activityData[key]);
          }
        });

        data = formData;
      } else {
        headers['Content-Type'] = 'application/json';
      }

      // Make the API request
      const response = await axios.post(`${baseUrl}/dashboard/activities/`, data, {  headers });
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

      let data = activityData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (activityData.image && (activityData.image.file || activityData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(activityData).forEach(key => {
          if (key === 'image' && activityData[key]) {
            // Handle FileInput component output
            if (activityData[key].file) {
              formData.append(key, activityData[key].file);
            } else if (activityData[key] instanceof File) {
              formData.append(key, activityData[key]);
            }
          } else if (activityData[key] !== null && activityData[key] !== undefined) {
            formData.append(key, activityData[key]);
          }
        });

        data = formData;
      } else {
        data = { ...activityData };
        if (data.image && !(data.image.file || data.image instanceof File)) {
          delete data.image;
        }
        headers['Content-Type'] = 'application/json';
      }

      // Make the API request
      const response = await axios.patch(`${baseUrl}/dashboard/activities/${activityId}/`, data, { headers });
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
      const response = await axios.delete(`${baseUrl}/dashboard/activities/${activityId}/`, {
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