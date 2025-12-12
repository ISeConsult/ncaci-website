<template>
  <DashboardOverview />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import DashboardOverview from '@/components/dashboard/DashboardOverview.vue'
</script>
