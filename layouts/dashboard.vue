<template>
  <div class="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 space-y-10">
    <NavigationHeader />
    <main class="max-w-7xl mx-auto px-4 py-8">
      <slot />
    </main>
     <ToastContainer />
  </div>
</template>

<script setup>
import NavigationHeader from '@/components/layouts/NavigationHeader.vue'
import ToastContainer from '../components/UI/ToastContainer.vue'
</script>
