<template>
  <LeadershipDirectory />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import LeadershipDirectory from '@/components/dashboard/LeadershipDirectory.vue'
</script>
