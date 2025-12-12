<template>
  <Courses />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import Courses from '@/components/dashboard/Courses.vue'
</script>
