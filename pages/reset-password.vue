<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Reset your password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter your new password below.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleResetPassword">
        <div class="space-y-4">
          <TextField
            v-model="password"
            type="password"
            label="New password"
            placeholder="Enter new password"
            required
          />
          <TextField
            v-model="confirm_password"
            type="password"
            label="Confirm new password"
            placeholder="Confirm new password"
            required
          />
        </div>

        <div>
          <Button type="submit" variant="primary" fullWidth :loading="loading">
            Reset password
          </Button>
        </div>

        <div class="text-center">
          <NuxtLink to="/login" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Back to sign in
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextField from '~/components/UI/TextField.vue'
import Button from '~/components/UI/Button.vue'
import { useToast } from '~/composables/useToast'
import axios from 'axios'
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key-here';

const { addToast } = useToast()
const password = ref('')
const confirm_password = ref('')
const loading = ref(false)

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const handleResetPassword = async () => {
  if (password.value !== confirm_password.value) {
    addToast('Passwords do not match', 'error')
    return
  }

  loading.value = true
  try {
    const response = await axios.post(`${baseUrl}/auth/users/update-password/`, {
      password: password.value,
      confirm_password: confirm_password.value,
      field: decryptData(localStorage.getItem('encryptedField'))
    })
    console.log('Reset password response:', response.data)
    if (response.data.success) {
      addToast(response.data.message, 'success')
      // Redirect to login
      await navigateTo('/login')
    } else {
      addToast(response.data.message, 'error')
    }
  } catch (error: any) {
    console.error('Reset password error:', error)
    if (error.response) {
      addToast(error.response.data.message, 'error')
    } else {
      addToast('An error occurred. Please try again.', 'error')
    }
  } finally {
    loading.value = false
  }
}
</script>
