<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Navbar removed from default layout to be imported in individual pages
import Footer from '../components/layouts/Footer.vue'
</script>
