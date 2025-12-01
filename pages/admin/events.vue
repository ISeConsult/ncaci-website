<template>
  <EventsManagement />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import EventsManagement from '@/components/dashboard/EventsManagement.vue'
</script>
