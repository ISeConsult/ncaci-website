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

export const useNewsStore = defineStore('NewsStore', () => {
  const news = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetcNews() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/dashboard/articles/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        news.value = response.data.message
        console.log('news display:', news.value);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      loading.value = false
    }
  };

  async function addNews(newsData) {
    loading.value = true
    try {
      let data = newsData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (newsData.article_image && (newsData.article_image.file || newsData.article_image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(newsData).forEach(key => {
          if (key === 'article_image' && newsData[key]) {
            // Handle FileInput
            if (newsData[key].file) {
              formData.append(key, newsData[key].file);
            } else if (newsData[key] instanceof File) {
              formData.append(key, newsData[key]);
            }
          } else if (newsData[key] !== null && newsData[key] !== undefined) {
            formData.append(key, newsData[key]);
          }
        });

        data = formData;
      } else {
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios.post(`${baseUrl}/dashboard/articles/`, data, { headers });
      if (response.data) {
        await fetcNews();
        console.log('News added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding news:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateNews(newsId, newsData) {
    loading.value = true
    try {
      let data = newsData;
      let headers = {
        'Authorization': decryptData(localStorage.getItem('authToken')),
        'Accept': 'application/json'
      };

      // Check if we have files to upload
      if (newsData.article_image && (newsData.article_image.file || newsData.article_image instanceof File)) {
        const formData = new FormData();

        // Append all fields to FormData
        Object.keys(newsData).forEach(key => {
          if (key === 'article_image' && newsData[key]) {
            // Handle FileInput component output
            if (newsData[key].file) {
              formData.append(key, newsData[key].file);
            } else if (newsData[key] instanceof File) {
              formData.append(key, newsData[key]);
            }
          } else if (newsData[key] !== null && newsData[key] !== undefined) {
            formData.append(key, newsData[key]);
          }
        });

        data = formData;
        // Remove Content-Type header to let axios set it for FormData
      } else {
        headers['Content-Type'] = 'application/json';
      }

      const response = await axios.patch(`${baseUrl}/dashboard/articles/${newsId}/`, data, { headers });
      if (response.data) {
        await fetcNews();
        console.log('News updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating news:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteNews(newsId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/dashboard/articles/${newsId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetcNews();
        console.log('News deleted');
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  return { news, loading, fetcNews, addNews, updateNews, deleteNews };
})