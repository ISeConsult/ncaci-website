<template>
  <Users />
</template>

<script setup>


definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import Users from '@/components/dashboard/Users.vue'
</script>
