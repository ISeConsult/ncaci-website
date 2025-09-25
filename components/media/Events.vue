<template>
  <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Events (Unfiltered) -->
    <div class="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-7 gap-4">
        <!-- Filter Section -->
        <div class="lg:col-span-1 md:col-span-2">
            <ul class="flex items-center justify-center md:items-start md:justify-start md:flex-col flex-row md:space-y-4 space-x-4 md:space-x-0">
            <li 
                v-for="item in filter" 
                :key="item.title" 
                class="cursor-pointer border-b md:border-b border-blue-500 py-2 capitalize"
                :class="{'text-[#FF4949] font-bold': selectedFilter === item.value}"
                @click="selectedFilter = item.value"
            >
                {{ item.title }}
            </li>
            </ul>
        </div>

        <!-- Events Section (Slider) -->
        <div class="lg:col-span-6 md:col-span-5">
          <div
            class="flex space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            <div
              v-for="item in events"
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
    </div>

    <!-- Gallery (Filtered) -->
    <div 
      id="gallery" 
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12"
    >
      <div 
        v-for="(item, index) in filteredGallery" 
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

const filter = [
  { title: 'all', value: 'all' },
  { title: 'upcoming', value: 'upcoming' },
  { title: 'past', value: 'past' },
  { title: 'ongoing', value: 'ongoing' },
]

const events = [
  { title: 'worship conference', image: '/images/event1.jpg', category: 'upcoming' },
  { title: 'christian fellowship', image: '/images/event2.jpg', category: 'upcoming' },
  { title: 'women fellowship', image: '/images/event3.jpg', category: 'past' },
  { title: 'Good news fellowship', image: '/images/event4.jpg', category: 'past' },
  { title: 'christian fellowship', image: '/images/event2.jpg', category: 'upcoming' },
  { title: 'women fellowship', image: '/images/event3.jpg', category: 'past' },
]

const gallery = [
  { category: 'upcoming', image: '/images/gala1.jpg' },
  { category: 'upcoming', image: '/images/gala2.jpg' },
  { category: 'past', image: '/images/gala3.jpg' },
  { category: 'past', image: '/images/gala4.jpg' },
  { category: 'ongoing', image: '/images/gala5.jpg' },
  { category: 'ongoing', image: '/images/gala6.jpg' },
  { category: 'upcoming', image: '/images/gala7.jpg' },
  { category: 'past', image: '/images/gala8.jpg' },
  { category: 'ongoing', image: '/images/gala9.jpg' },
  { category: 'past', image: '/images/gala10.jpg' },
]

const selectedFilter = ref('all')
const showModal = ref(false)
const currentImage = ref('')
const currentIndex = ref(0)

// Filter applied to gallery instead
const filteredGallery = computed(() => {
  if (selectedFilter.value === 'all') {
    return gallery
  }
  return gallery.filter(item => item.category === selectedFilter.value)
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
    currentIndex.value = 0 // Loop to start
  }
  currentImage.value = filteredGallery.value[currentIndex.value].image
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  } else {
    currentIndex.value = filteredGallery.value.length - 1 // Loop to end
  }
  currentImage.value = filteredGallery.value[currentIndex.value].image
}
</script>


<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE/Edge */
  scrollbar-width: none;     /* Firefox */
}
</style>