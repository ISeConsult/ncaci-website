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
            v-model="email"
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
            class="mt-4"
          />
        </div>

        <div class="flex items-center justify-between">
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

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    // TODO: Implement login logic
    console.log('Login attempt:', { email: email.value, password: password.value })
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Redirect to dashboard or home
    await navigateTo('/admin/dashboard')
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>
