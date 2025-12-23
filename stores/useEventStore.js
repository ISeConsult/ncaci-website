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

export const useEventStore = defineStore('EventStore', () => {
  const events = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchEvents() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/dashboard/events/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        events.value = response.data.data
        console.log('events display:', events.value);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      loading.value = false
    }
  };

  async function fetchEventByStatusUpcoming() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/dashboard/events/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        events.value = response.data.data.filter(event => event.status === 'upcoming');
        console.log('Filtered upcoming events:', events.value);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      loading.value = false
    }
  };

  async function addEvent(eventData) {
    loading.value = true
    try {
      let data = eventData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (eventData.image && (eventData.image.file || eventData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(eventData).forEach(key => {
          if (key === 'image' && eventData[key]) {
            // Handle FileInput
            if (eventData[key].file) {
              formData.append(key, eventData[key].file);
            } else if (eventData[key] instanceof File) {
              formData.append(key, eventData[key]);
            }
          } else if (eventData[key] !== null && eventData[key] !== undefined) {
            formData.append(key, eventData[key]);
          }
        });

        data = formData;
      } else {
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios.post(`${baseUrl}/dashboard/events/`, data, { headers });
      if (response.data) {
        await fetchEvents();
        console.log('Event added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding event:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateEvent(eventId, eventData) {
    loading.value = true
    try {
      let data = eventData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (eventData.image && (eventData.image.file || eventData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(eventData).forEach(key => {
          if (key === 'image' && eventData[key]) {
            // Handle FileInput component output
            if (eventData[key].file) {
              formData.append(key, eventData[key].file);
            } else if (eventData[key] instanceof File) {
              formData.append(key, eventData[key]);
            }
          } else if (eventData[key] !== null && eventData[key] !== undefined) {
            formData.append(key, eventData[key]);
          }
        });

        data = formData;
        // Remove Content-Type header to let axios set it for FormData
      } else {
        data = { ...eventData };
        if (data.image && !(data.image.file || data.image instanceof File)) {
          delete data.image;
        }
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios.patch(`${baseUrl}/dashboard/events/${eventId}/`, data, { headers });
      if (response.data) {
        await fetchEvents();
        console.log('Event updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteEvent(eventId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/dashboard/events/${eventId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchEvents();
        console.log('Event deleted');
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  return { events, loading, fetchEvents, addEvent, updateEvent, deleteEvent, fetchEventByStatusUpcoming };
})