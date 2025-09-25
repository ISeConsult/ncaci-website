<template>
  <Navbar />
  <div class="min-h-screen bg-black relative overflow-hidden">
    <!-- Background Image Slider -->
    <div class="absolute inset-0">
      <div class="relative w-full h-full">
        <div
          v-for="(image, index) in communityImages"
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000"
          :class="{ 'opacity-100': currentBgSlide === index, 'opacity-0': currentBgSlide !== index }"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <!-- Hero Section -->
      <div class="flex-1 flex items-center justify-start px-4 sm:px-6 md:px-8 lg:px-16">
        <div class="max-w-xl sm:max-w-2xl">
          <p class="text-sm sm:text-base font-semibold text-gray-400 uppercase mb-3 sm:mb-4">
            Welcome to our Church
          </p>
          <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-6 sm:mb-10 leading-tight">
            BECOME A PART OF<br>
            OUR COMMUNITY
          </h1>
          
          <UIButton size="lg" class="sm:size-xl">
            <NuxtLink to="/contact" class="w-full text-center">
              LIVE STREAM
            </NuxtLink>
          </UIButton>

          <div class="flex items-start gap-2 mt-6 sm:mt-10">
            <div class="w-8 sm:w-12 h-1 bg-gray-200 mt-3 sm:mt-5"></div>
            <p class="text-xs sm:text-sm text-gray-200 mt-2 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Image Slider -->
    <div
      class="px-2 sm:px-4 flex items-center justify-center sm:justify-end mb-10 sm:mb-20
             absolute w-full sm:w-[22rem] md:w-[27rem] lg:w-[35rem] bottom-4 sm:bottom-0 sm:right-6 md:right-10"
    >
      <div class="relative overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-in-out gap-2 sm:gap-4"
          :style="{ transform: `translateX(-${currentImageSlide * 25}%)` }"
        >
          <div
            v-for="(image, index) in communityImages"
            :key="index"
            class="flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-full object-cover rounded-lg border-2 border-white/20 hover:border-white/50 transition-all duration-200 cursor-pointer"
              @click="selectImage(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Controls & Counter -->
    <div class="relative z-10">
      <div
        class="absolute bottom-2 sm:bottom-8 right-4 sm:right-8 md:right-16
               w-[18rem] sm:w-[22rem] md:w-[27rem] lg:w-[32rem]
               flex justify-between items-center"
      >
        <!-- Navigation Buttons -->
        <div class="flex gap-2">
          <ChevronLeftIcon
            class="w-6 h-6 sm:w-8 sm:h-8 border rounded-full p-1 text-white cursor-pointer hover:bg-blue-600 transition"
            @click="prevSlide"
          />
          <ChevronRightIcon
            class="w-6 h-6 sm:w-8 sm:h-8 border rounded-full p-1 text-white cursor-pointer hover:bg-blue-600 transition"
            @click="nextSlide"
          />
        </div>

        <!-- Loader Bar -->
        <div class="flex-1 mx-2 sm:mx-4 h-1 bg-white/20 rounded overflow-hidden">
          <div
            class="h-full bg-blue-600 transition-all duration-500"
            :style="{ width: `${((currentImageSlide + 1) / communityImages.length) * 100}%` }"
          ></div>
        </div>

        <!-- Slide counter -->
        <div class="text-white text-sm sm:text-lg font-semibold">
          {{ String(currentImageSlide + 1).padStart(2, '0') }}
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import Navbar from '../components/layouts/Navbar.vue'

// Community images for bottom slider
const communityImages = ref([
  { src: '/images/church-hero.jpg', alt: 'Community member' },
  { src: '/images/hero-slider1.jpg', alt: 'Community member' },
  { src: '/images/hero-slider2.jpg', alt: 'Community member' },
  { src: '/images/hero-slider3.jpg', alt: 'Community member' },
  { src: '/images/hero-slider4.jpg', alt: 'Community member' },
  { src: '/images/church-hero.jpg', alt: 'Community member' },
  { src: '/images/hero-slider1.jpg', alt: 'Community member' },
  { src: '/images/hero-slider2.jpg', alt: 'Community member' },
  { src: '/images/hero-slider3.jpg', alt: 'Community member' },
  { src: '/images/hero-slider4.jpg', alt: 'Community member' }
])

const currentBgSlide = ref(0)
const currentImageSlide = ref(0)

const selectImage = (index) => {
  console.log('Selected image:', index)
}

const nextSlide = () => {
  currentImageSlide.value += 1
  if (currentImageSlide.value > 7) {
    currentImageSlide.value = 0
  }
  currentBgSlide.value = currentImageSlide.value
}

const prevSlide = () => {
  currentImageSlide.value -= 1
  if (currentImageSlide.value < 0) {
    currentImageSlide.value = 8
  }
  currentBgSlide.value = currentImageSlide.value
}

onMounted(() => {
  // No auto-sliding
})

onUnmounted(() => {
  // No interval to clear
})
</script>

<style scoped>
.transition-transform {
  transition: transform 0.5s ease-in-out;
}
</style>