<template>
  <ContactDirectory />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import ContactDirectory from '@/components/dashboard/ContactDirectory.vue'
</script>
