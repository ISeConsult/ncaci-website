<template>
  <NewsArticles />
</template>

<script setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

import NewsArticles from '@/components/dashboard/NewsArticles.vue'
</script>
