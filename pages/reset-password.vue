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
            v-model="confirmPassword"
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
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
import TextField from '~/components/UI/TextField.vue'
import Button from '~/components/UI/Button.vue'

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    // TODO: Show error message
    console.error('Passwords do not match')
    return
  }

  loading.value = true
  try {
    // TODO: Implement reset password logic
    console.log('Resetting password')
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Redirect to login
    await navigateTo('/login')
  } catch (error) {
    console.error('Reset password error:', error)
  } finally {
    loading.value = false
  }
}
</script>
