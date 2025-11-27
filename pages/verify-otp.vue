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
            v-model="otp"
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

const otp = ref('')
const loading = ref(false)

const handleVerifyOtp = async () => {
  if (otp.value.length !== 6) {
    // TODO: Show error message
    console.error('OTP must be 6 digits')
    return
  }

  loading.value = true
  try {
    // TODO: Implement OTP verification logic
    console.log('Verifying OTP:', otp.value)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Redirect to reset password
    await navigateTo('/reset-password')
  } catch (error) {
    console.error('OTP verification error:', error)
  } finally {
    loading.value = false
  }
}

const resendOtp = async () => {
  try {
    // TODO: Implement resend OTP logic
    console.log('Resending OTP')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // TODO: Show success message
  } catch (error) {
    console.error('Resend OTP error:', error)
  }
}
</script>
