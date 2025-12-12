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

export const useContactStore = defineStore('ContactStore', () => {
  const contacts = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchContacts() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/website/contact-forms/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        contacts.value = response.data.data
        console.log('contacts display:', contacts.value);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      loading.value = false
    }
  };

  async function addContact(courseData) {
    loading.value = true
    try {
      const response = await axios.post(`${baseUrl}/website/contact-forms/`, courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        console.log('Contact added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateContact(contactId, contactData) {
    loading.value = true
    try {
      const response = await axios.patch(`${baseUrl}/website/contact-forms/${courseId}/`, contactData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        console.log('Contact updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteContact(contactId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/website/contact-forms/${contactId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchContacts();
        console.log('Contact deleted');
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };
  
  return { contacts, fetchContacts, loading, addContact, updateContact, deleteContact };
})