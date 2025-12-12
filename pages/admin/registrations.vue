<template>
  <MinistryRegistrations />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import MinistryRegistrations from '@/components/dashboard/MinistryRegistrations.vue'
</script>
