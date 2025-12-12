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

export const useCoursesStore = defineStore('CoursesStore', () => {
  const courses = ref([])
  
  const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

  async function fetchCourses() {
    loading.value = true
    try {
      const response = await axios.get(`${baseUrl}/website/course-registries/`,{
         headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        courses.value = response.data.message
        console.log('courses display:', courses.value);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      loading.value = false
    }
  };

  async function addCourse(courseData) {
    loading.value = true
    try {
      const response = await axios.post(`${baseUrl}/website/course-registries/`, courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        console.log('Course added:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function updateCourse(courseId, courseData) {
    loading.value = true
    try {
      const response = await axios.patch(`${baseUrl}/website/course-registries/${courseId}/`, courseData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.data) {
        await fetchCourses();
        console.log('Course updated:', response.data);
        return response;
      }
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };

  async function deleteCourse(courseId) {
    loading.value = true
    try {
      const response = await axios.delete(`${baseUrl}/website/course-registries/${courseId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': decryptData(localStorage.getItem('authToken')),
          'Accept': 'application/json'
        }
      });
      if (response.status === 200 || response.status === 204) {
        await fetchCourses();
        console.log('Course deleted');
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    } finally {
      loading.value = false
    }
  };
  
  return { courses, fetchCourses, loading, addCourse, updateCourse, deleteCourse };
})