<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Forgot your password?
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleForgotPassword">
        <div>
          <TextField
            v-model="field"
            label="Email address"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <Button type="submit" variant="primary" fullWidth :loading="loading">
            Send reset link
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

const { addToast } = useToast()
const field = ref('')
const loading = ref(false)

// Secret key for encryption
const SECRET_KEY = 'your-secret-key-here';

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

const handleForgotPassword = async () => {
  loading.value = true
  try {
    const response = await axios.post(`${baseUrl}/auth/users/forgot-password/`, {
      field: field.value
    })
    console.log('Forgot password response:', response.data)
    if (response.data.success) {
      // Store email for resend OTP
      localStorage.setItem('resetEmail', encryptData(field.value))
      addToast(response.data.message, 'success')
      // Redirect to verify-otp
      await navigateTo('/verify-otp')
    } else {
      addToast(response.data.message, 'error')
    }
  } catch (error: any) {
    console.error('Forgot password error:', error)
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
