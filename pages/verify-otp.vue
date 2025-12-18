<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Verify your email
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Enter the 6-digit code sent to your email.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleVerifyOtp">
        <div>
          <TextField
            v-model="field"
            type="text"
            label="Verification code"
            placeholder="Enter 6-digit code"
            required
            maxlength="6"
          />
        </div>

        <div>
          <Button type="submit" variant="primary" fullWidth :loading="loading">
            Verify code
          </Button>
        </div>

        <div class="text-center">
          <button type="button" @click="resendOtp" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Didn't receive code? Resend
          </button>
        </div>

        <div class="text-center">
          <NuxtLink to="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Back to forgot password
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
const field = ref('')
const loading = ref(false)
const resendLoading = ref(false)

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl

const decryptData = (encryptedData: string | null) => {
  if (!encryptedData) return '';
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const handleVerifyOtp = async () => {
  if (field.value.length !== 6) {
    addToast('OTP must be 6 digits', 'error')
    return
  }

  loading.value = true
  try {
    const response = await axios.post(`${baseUrl}/auth/users/verify-otp/`, {
      otp: field.value,
      field: decryptData(localStorage.getItem('resetEmail'))
    })
    console.log('Verify OTP response:', response.data)
    if (response.data.success) {
      addToast(response.data.message, 'success')
      // Redirect to reset password
      await navigateTo('/reset-password')
    } else {
      addToast(response.data.message, 'error')
    }
  } catch (error: any) {
    console.error('OTP verification error:', error)
    if (error.response) {
      addToast(error.response.data.message, 'error')
    } else {
      addToast('An error occurred. Please try again.', 'error')
    }
  } finally {
    loading.value = false
  }
}

const resendOtp = async () => {
  resendLoading.value = true
  try {
    const response = await axios.post(`${baseUrl}/auth/users/forgot-password/`, {
      field: decryptData(localStorage.getItem('resetEmail'))
    })
    console.log('Resend OTP response:', response.data)
    if (response.data.success) {
      addToast('OTP sent successfully', 'success')
    } else {
      addToast(response.data.message, 'error')
    }
  } catch (error: any) {
    console.error('Resend OTP error:', error)
    if (error.response) {
      addToast(error.response.data.message, 'error')
    } else {
      addToast('An error occurred. Please try again.', 'error')
    }
  } finally {
    resendLoading.value = false
  }
}
</script>
