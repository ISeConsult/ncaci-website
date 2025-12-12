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

export const useDocumentStore = defineStore('DocumentStore', () => {
  const documents = ref([])
  
  const config = useRuntimeConfig()
    const baseUrl = config.public.baseUrl

    async function fetchDocuments() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/dashboard/documents/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        documents.value = response.data.info
        console.log('documents display:', documents.value);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      loading.value = false
    }
  };

  async function addDocument(documentData) {
    loading.value = true
    try {
        let data = documentData;
        let headers = {
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        };

        // Check if we have files to upload
        if (documentData.file && (documentData.file.file || documentData.file instanceof File)) {
          const formData = new FormData();

          // Append all fields to FormData
          Object.keys(documentData).forEach(key => {
            if (key === 'file' && documentData[key]) {
              // Handle FileInput component output
              if (documentData[key].file) {
                formData.append(key, documentData[key].file);
              } else if (documentData[key] instanceof File) {
                formData.append(key, documentData[key]);
              }
            } else if (documentData[key] !== null && documentData[key] !== undefined) {
              formData.append(key, documentData[key]);
            }
          });

          data = formData;
          // Remove Content-Type header to let axios set it for FormData
          delete headers['Content-Type'];
        } else {
            headers['Content-Type'] = 'application/json';
        }

        const response = await axios.post(`${baseUrl}/dashboard/documents/`, data, { headers });
        if (response.data) {
          await fetchDocuments();
            console.log('Document added:', response.data);
            return response;
        }
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      loading.value = false
    }
  };

    async function updateDocument(documentId, documentData) {
    loading.value = true
    try {
      let data = documentData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (documentData.image && (documentData.image.file || documentData.image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(documentData).forEach(key => {
          if (key === 'image' && documentData[key]) {
            // Handle FileInput component output
            if (documentData[key].file) {
              formData.append(key, documentData[key].file);
            } else if (documentData[key] instanceof File) {
              formData.append(key, documentData[key]);
            }
          } else if (documentData[key] !== null && documentData[key] !== undefined) {
            formData.append(key, documentData[key]);
          }
        });

        data = formData;
        // Remove Content-Type header to let axios set it for FormData
        delete headers['Content-Type'];
      } else {
          headers['Content-Type'] = 'application/json';
      }

      const response = await axios.put(`${baseUrl}/dashboard/documents/${documentId}/`, data, { headers });
      if (response.data) {
        await fetchDocuments();
      }
    } catch (error) {
      console.error("Error updating document:", error);
    } finally {
      loading.value = false
    }
  };

    async function deleteDocument(documentId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/dashboard/documents/${documentId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchDocuments();
        console.log('Document deleted');
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

    return { documents, fetchDocuments, loading, addDocument, updateDocument, deleteDocument };
  });