<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="max-w-2xl mx-auto text-center">
      <!-- Main 404 Display -->
      <div class="mb-8">
        <div class="text-8xl md:text-9xl font-bold text-gray-800 mb-4">
          404
        </div>
        <h1 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p class="text-lg text-gray-600 mb-2">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <p class="text-gray-500">
          Here are some helpful links instead:
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        <NuxtLink 
          to="/" 
          class="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Go Home
        </NuxtLink>
        
        <button 
          @click="goBack"
          class="px-8 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page meta
definePageMeta({
  layout: false
})

// Head configuration
useHead({
  title: '404 - Page Not Found',
  meta: [
    { name: 'description', content: 'The page you are looking for could not be found.' }
  ]
})


// Methods
const goBack = () => {
  if (process.client && window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/')
  }
}

</script>

<style scoped>
</style>