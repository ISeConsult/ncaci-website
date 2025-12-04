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

export const useStaffStore = defineStore('StaffStore', () => {
  const staffs = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchStaffs() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/dashboard/staffs/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        staffs.value = response.data.info
        console.log('staffs display:', staffs.value);
      }
    } catch (error) {
      console.error("Error fetching staffs:", error);
    } finally {
      loading.value = false
    }
  };

  async function addStaff(staffData) {
    loading.value = true
    try {
      let data = staffData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (staffData.image && (staffData.image.file || staffData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(staffData).forEach(key => {
          if (key === 'image' && staffData[key]) {
            // Handle FileInput component output
            if (staffData[key].file) {
              formData.append(key, staffData[key].file);
            } else if (staffData[key] instanceof File) {
              formData.append(key, staffData[key]);
            }
          } else if (staffData[key] !== null && staffData[key] !== undefined) {
            formData.append(key, staffData[key]);
          }
        });

        data = formData;
        // Remove Content-Type header to let axios set it for FormData
        delete headers['Content-Type'];
      }
      
      const response = await axios.post(`${baseUrl}/dashboard/staffs/`, data, { headers});
      if (response.data) {
        await fetchStaffs();
        console.log('Staff added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding staff:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateStaff(staffId, staffData) {
    loading.value = true
    try {
      let data = staffData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (staffData.image && (staffData.image.file || staffData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(staffData).forEach(key => {
          if (key === 'image' && staffData[key]) {
            // Handle FileInput component output
            if (staffData[key].file) {
              formData.append(key, staffData[key].file);
            } else if (staffData[key] instanceof File) {
              formData.append(key, staffData[key]);
            }
          } else if (staffData[key] !== null && staffData[key] !== undefined) {
            formData.append(key, staffData[key]);
          }
        });

        data = formData;
        // Remove Content-Type header to let axios set it for FormData
        delete headers['Content-Type'];
      }
      const response = await axios.patch(`${baseUrl}/dashboard/staffs/${staffId}/`, data, { headers });
      if (response.data) {
        await fetchStaffs();
        console.log('Staff updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteStaff(staffId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/dashboard/staffs/${staffId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchStaffs();
        console.log('Staff deleted');
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  return { staffs, loading, fetchStaffs, addStaff, updateStaff, deleteStaff };
})