<template>
  <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Events (Unfiltered) -->
    <div class="w-full">
        <!-- Events Section (Slider) -->
        <div class="w-full" v-if="activities && activities.length > 0">
          <div
            class="flex space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            <div
              v-for="item in activities"
              :key="item.title"
              class="group relative flex-shrink-0 w-64 h-60 overflow-hidden rounded-lg shadow-lg snap-start"
            >
              <img
                :src="item.image"
                alt="event"
                class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                @click="openModal(item.image)"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5"
              ></div>
              <h3
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-base font-bold uppercase text-white z-10 text-center"
              >
                {{ item.title }}
              </h3>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 w-full">
          <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-500 text-lg font-medium">No Activities found</p>
          <p class="text-gray-400 text-sm mt-1">
            There are no activities to display at the moment.
          </p>
        </div>
    </div>

    <!-- Gallery (Filtered) -->
    <div v-if="gallaries && gallaries.length > 0"
      id="gallery" 
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12"
    >
      <div 
        v-for="(item, index) in gallaries" 
        :key="item.image + index" 
        class="group aspect-square w-full overflow-hidden rounded-lg shadow-md"
      >
        <img 
          :src="item.image" 
          alt="gallery" 
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
          @click="openModal(item.image, index)"
        />
      </div>
    </div>

    <!-- No Galleries Found -->
    <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 w-full">
      <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-500 text-lg font-medium">No images found</p>
      <p class="text-gray-400 text-sm mt-1">
        <span v-if="selectedFilter !== 'all'">
          No {{ selectedFilter }} images available
        </span>
        <span v-else>
          No images in the gallery yet 
        </span>
      </p>
    </div>


    <!-- Modal for Image Viewing -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div class="relative max-w-4xl w-full">
        <img :src="currentImage" alt="modal image" class="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
        <button 
          @click="closeModal" 
          class="absolute top-4 right-4 text-white text-2xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
        >
          &times;
        </button>
        <button 
          v-if="filteredGallery.length > 1" 
          @click="prevImage" 
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
        >
          &larr;
        </button>
        <button 
          v-if="filteredGallery.length > 1" 
          @click="nextImage" 
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center"
        >
          &rarr;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGallaryStore } from '@/stores/useGallaryStore';
import { storeToRefs } from 'pinia';

const GallaryStore = useGallaryStore()
const { gallaries, loading } = storeToRefs(GallaryStore);

const ActivityStore = useActivityStore()
const { activities } = storeToRefs(ActivityStore);

const filter = [
  { title: 'all', value: 'all' },
  { title: 'upcoming', value: 'upcoming' },
  { title: 'past', value: 'past' },
  { title: 'ongoing', value: 'ongoing' },
]

const selectedFilter = ref('all')
const showModal = ref(false)
const currentImage = ref('')
const currentIndex = ref(0)

// Filter applied to gallery instead
const filteredGallery = computed(() => {
  if (selectedFilter.value === 'all') {
    return gallaries
  }
  return gallaries.filter(item => item.category === selectedFilter.value)
})

const openModal = (image, index = -1) => {
  currentImage.value = image
  currentIndex.value = index >= 0 ? index : filteredGallery.value.findIndex(item => item.image === image)
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  currentImage.value = ''
  currentIndex.value = -1
}

const nextImage = () => {
  if (currentIndex.value < filteredGallery.value.length - 1) {
    currentIndex.value++
  } else {
    currentIndex.value = 0
  }
  currentImage.value = filteredGallery.value[currentIndex.value].image
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredGallery.value.length - 1
  }
  currentImage.value = filteredGallery.value[currentIndex.value].image
}

onMounted(() => {
  GallaryStore.fetchGallaries();
  ActivityStore.fetchActivities();
});
</script>


<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;  
}
</style>