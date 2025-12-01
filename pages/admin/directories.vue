<template>
  <DocumentDirectory />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import DocumentDirectory from '@/components/dashboard/DocumentDirectory.vue'
</script>
