<template>
  <Gallery />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import Gallery from '@/components/dashboard/Gallery.vue'
</script>
