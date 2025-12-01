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

export const useEveventStore = defineStore('EventStore', () => {
  const events = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchEvents() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/auth/events/`,{
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

  async function addEvent(eventData) {
    loading.value = true
    try {
      const response = await axios.post(`${baseUrl}/auth/events/`, eventData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
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
      const response = await axios.patch(`${baseUrl}/auth/events/${eventId}/`, eventData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
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
      const response = await axios.delete(`${baseUrl}/auth/events/${eventId}/`, {
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

  return { events, loading, fetchEvents, addEvent, updateEvent, deleteEvent };
})