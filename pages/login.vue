<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <TextField
            v-model="field"
            type="email"
            label="Email address"
            placeholder="Enter your email"
            required
          />
          <TextField
            v-model="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="rememberMe"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <div class="text-sm">
            <NuxtLink to="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Forgot your password?
            </NuxtLink>
          </div>
        </div>

        <div>
          <Button type="submit" variant="primary" fullWidth :loading="loading">
            Sign in
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextField from '~/components/UI/TextField.vue'
import Button from '~/components/UI/Button.vue'
import { useToast } from '~/composables/useToast'

import axios from "axios";
import CryptoJS from 'crypto-js';
import { onMounted } from 'vue';

const router = useRouter();
const { addToast } = useToast()
const field = ref("");
const password = ref("");
const rememberMe = ref(false);
const loading = ref(false);

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

// Secret key for encryption
const SECRET_KEY = 'your-secret-key-here';

// Function to encrypt data
const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

// Function to decrypt data
const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Auto-fill credentials on page load
onMounted(() => {
  const encryptedField = localStorage.getItem('encryptedField');
  const encryptedPassword = localStorage.getItem('encryptedPassword');
  if (encryptedField && encryptedPassword) {
    try {
      field.value = decryptData(encryptedField);
      password.value = decryptData(encryptedPassword);
    } catch (error) {
      console.error('Error decrypting credentials:', error);
      // Clear invalid data
      localStorage.removeItem('encryptedField');
      localStorage.removeItem('encryptedPassword');
    }
  }
});

const handleLogin = async () => {
  loading.value = true;
  try {
    const response = await axios.post(`${baseUrl}/auth/users/login/`, {
      field: field.value,
      password: password.value,
    });
    console.log('Login response:', response.data);
    if (response.data.success) {
      // Encrypt and store credentials in localStorage
      localStorage.setItem('encryptedField', encryptData(field.value));
      localStorage.setItem('encryptedPassword', encryptData(password.value));
      // Ecrypt password_change
      if (response.data.password_changed) {
        localStorage.setItem('encryptedPasswordChange', encryptData(String(response.data.password_changed)));
      }
      if (response.data.token) {
        localStorage.setItem('authToken', encryptData(String(response.data.token)));
      }
      addToast(response.data.message, 'success');

      if (!response.data.password_changed) {
        await router.push('/reset-password');
      } else {
        await router.push('/admin/overview');
      }
    } else {
      addToast(response.data.message, 'error');
    }
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.response) {
      addToast(error.response.data.message, 'error');
    }
  } finally {
    loading.value = false;
  }
};
</script>
