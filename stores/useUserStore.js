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

export const useUserStore = defineStore('UserStore', () => {
  const users = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchUsers() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/auth/users/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        users.value = response.data.data
        console.log('users display:', users.value);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      loading.value = false
    }
  };

  async function addUser(userData) {
    loading.value = true
    try {
      const response = await axios.post(`${baseUrl}/auth/users/`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        await fetchUsers();
        console.log('User added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateUser(userId, userData) {
    loading.value = true
    try {
      const response = await axios.patch(`${baseUrl}/auth/users/${userId}/`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        await fetchUsers();
        console.log('User updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteUser(userId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/auth/users/${userId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchUsers();
        console.log('User deleted');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('encryptedField');
    localStorage.removeItem('encryptedPassword');
  }

  return { users, loading, fetchUsers, addUser, updateUser, deleteUser, logout }
})