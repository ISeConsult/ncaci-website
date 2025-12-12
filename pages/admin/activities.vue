<template>
  <MinistryActivities />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import MinistryActivities from '@/components/dashboard/MinistryActivities.vue'
</script>
