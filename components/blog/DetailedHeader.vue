<template>
    <div>
        <div style="background-image: url('/images/blog1.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;" class="relative h-[350px]">
            <div class="absolute inset-0 bg-black bg-opacity-70"></div>
            <div class="flex flex-col justify-end items-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 h-full text-white relative z-10">
                <span class="text-sm font-light text-left uppercase mb-2"><NuxtLink class="hover:text-blue-600 transition-colors duration-200" :to="$localePath('/blog')">blog</NuxtLink> - {{ title }}</span>
                <h1 class="text-base md:text-4xl font-bold text-left uppercase">{{ title }}</h1>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'news and updates'
  }
})
</script>

<style scoped>

</style>