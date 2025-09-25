<template>
    <Navbar/>
    <ActivityHeader/>
    <div class="bg-[#020ED1]">
        <ActivityCard />
    </div>
</template>

<script setup>
import ActivityCard from '../components/media/ActivityCard.vue'
import Navbar from '../components/layouts/Navbar.vue'
import ActivityHeader from '../components/media/ActivityHeader.vue'


// Head configuration
useHead({
  title: 'Activity - NCACI',
  meta: [
    { name: 'description', content: 'This is the activity page' }
  ]
})
</script>

<style lang="scss" scoped>

</style>