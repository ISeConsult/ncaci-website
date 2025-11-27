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
            v-model="email"
            type="email"
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

const email = ref('')
const loading = ref(false)

const handleForgotPassword = async () => {
  loading.value = true
  try {
    // TODO: Implement forgot password logic
    console.log('Forgot password for:', email.value)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Redirect to verify-otp or show success message
    await navigateTo('/verify-otp')
  } catch (error) {
    console.error('Forgot password error:', error)
  } finally {
    loading.value = false
  }
}
</script>
