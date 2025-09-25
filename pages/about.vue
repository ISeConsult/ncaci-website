<template>
    <Navbar />
    <Header/>
    <VisionSection/>
    <Belief/>
</template>

<script setup>
import Navbar from '../components/layouts/Navbar.vue'
import Header from '../components/about/Header.vue';
import VisionSection from '../components/about/VisionSection.vue';
import Belief from '../components/about/Belief.vue';

// Head configuration
useHead({
  title: 'About Us - NCACI',
  meta: [
    { name: 'description', content: 'This is the about page' }
  ]
})
</script>


<style lang="scss" scoped>

</style>
