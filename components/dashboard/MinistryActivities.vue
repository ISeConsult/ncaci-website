<!-- components/sections/MinistryActivities.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Ministry Activities</h1>
        <p class="text-gray-600 dark:text-gray-400">Discover ways to serve, grow, and connect in our community</p>
      </div>
      <div class="flex gap-3">
        <button @click="openModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-medium shadow-md">
          <PlusIcon class="h-5 w-5 mr-2" />
          New Activity
        </button>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div v-for="stat in activityStats" :key="stat.title" 
           class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center">
          <div :class="['p-2 rounded-lg', stat.bgColor]">
            <component :is="stat.icon" :class="['h-5 w-5', stat.color]" />
          </div>
          <div class="ml-3">
            <p class="text-lg font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
            <p class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ stat.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Categories -->
    <div class="flex flex-wrap gap-3 mb-8">
      <button v-for="category in activityCategories" :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-4 py-2 rounded-full text-sm font-medium border-2',
                selectedCategory === category 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
              ]">
        {{ category }}
      </button>
    </div>

    <!-- Activities Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="activity in paginatedActivities" :key="activity.id"
           class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden group">

        <!-- Activity Image Header -->
        <div class="relative h-48 overflow-hidden">
          <img :src="activity.image" :alt="activity.title" class="w-full h-full object-cover group-hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <!-- Activity Content -->
        <div class="p-6">
          <!-- Title and Description -->
          <div class="mb-4">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ activity.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{{ activity.description }}</p>
          </div>

          <!-- Activity Details -->
          <div class="space-y-3 mb-6">
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <CalendarIcon class="h-4 w-4 mr-2 text-red-500" />
              <span class="font-medium">{{ activity.schedule }}</span>
            </div>
            <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <MapPinIcon class="h-4 w-4 mr-2 text-red-500" />
              <span class="font-medium">{{ activity.location }}</span>
            </div>
            <div v-if="activity.coordinator" class="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <UserIcon class="h-4 w-4 mr-2 text-red-500" />
              <span class="font-medium">{{ activity.coordinator }}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end mt-4 pt-3 border-t border-gray-100 dark:border-gray-600 space-x-2">
            <button class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200">
              Edit
            </button>
            <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium transition-colors duration-200">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-8">
      <Pagination :current-page="currentPage" :total-pages="totalPages" :total-items="filteredActivities.length" :items-per-page="itemsPerPage" @update:currentPage="handlePageChange"  />
    </div>

    <!-- New Activity Modal -->
    <Modal v-model:is-open="isModalOpen" size="3xl" title="Create New Activity" @close="closeModal">
      <form @submit.prevent="submitForm">
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Image URL -->
            <FileInput
              v-model="newActivity.image"
              accept="image/*"
              accept-text="Image files only, up to 10MB each"
              label="Image URL"
              class="md:col-span-2"
            />

            <!-- Title -->
            <TextField
              v-model="newActivity.title"
              label="Activity Title"
              placeholder="Enter activity title"
              required
              class="md:col-span-2"
            />

            <!-- Description -->
            <Textarea
              v-model="newActivity.description"
              label="Description"
              placeholder="Enter activity description"
              required
              rows="4"
              class="md:col-span-2"
            />

            <!-- Schedule -->
            <TextField
              v-model="newActivity.schedule"
              label="Schedule"
              placeholder="e.g., Every Sunday 9:30 AM"
            />

            <!-- Category -->
            <Select
              v-model="newActivity.category"
              :options="activityCategories"
              label="Category"
              placeholder="Select a category"
              required
            />

            <!-- Location -->
            <TextField
              v-model="newActivity.location"
              label="Location"
              placeholder="Enter location"
            />

            <!-- Coordinator -->
            <TextField
              v-model="newActivity.coordinator"
              label="Coordinator"
              placeholder="Enter coordinator name"
            />
          </div>
        </div>
      </form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeModal"
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            @click="submitForm"
            type="button"
            :disabled="!newActivity.title || !newActivity.description || !newActivity.category"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Activity
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Pagination from '../UI/Pagination.vue'
import Modal from '../UI/Modal.vue'
import TextField from '../UI/TextField.vue'
import Textarea from '../UI/Textarea.vue'
import Select from '../UI/Select.vue'
import {
  UsersIcon,
  CalendarIcon,
  PlusIcon,
  MapPinIcon,
  UserIcon,
  ClockIcon,
  HandRaisedIcon,
} from '@heroicons/vue/24/outline'
import FileInput from '../UI/FileInput.vue'

const currentPage = ref(1)
const itemsPerPage = 6
const isModalOpen = ref(false)
const selectedCategory = ref('All Activities')
const newActivity = ref({
  title: '',
  description: '',
  schedule: '',
  category: '',
  location: '',
  coordinator: '',
  image: ''
})
const totalPages = computed(() => Math.ceil(filteredActivities.value.length / itemsPerPage))

const handlePageChange = (page) => {
  currentPage.value = page
}

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  resetForm()
}

const resetForm = () => {
  newActivity.value = {
    title: '',
    description: '',
    schedule: '',
    category: '',
    location: '',
    coordinator: '',
    image: ''
  }
}

const submitForm = () => {
  if (newActivity.value.title && newActivity.value.description && newActivity.value.category) {
    const newId = Math.max(...activities.map(a => a.id)) + 1
    activities.push({
      id: newId,
      ...newActivity.value
    })
    closeModal()
  }
}




// Activity statistics
const activityStats = [
  {
    title: 'Active Programs',
    value: '18',
    icon: CalendarIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'Total Participants',
    value: '847',
    icon: UsersIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Weekly Events',
    value: '12',
    icon: ClockIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'Volunteers',
    value: '156',
    icon: HandRaisedIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
]

// Activity categories
const activityCategories = [
  'All Activities', 'Worship', 'Education', 'Fellowship', 'Outreach', 'Youth', 'Seniors'
]

// Activities data
const activities = [
  {
    id: 1,
    title: 'Sunday School',
    description: 'Comprehensive Bible study and spiritual education program designed for all ages, from children to adults, fostering spiritual growth and biblical understanding.',
    schedule: 'Every Sunday 9:30 AM',
    category: 'Education',
    location: 'Fellowship Hall',
    coordinator: 'Sister Rebecca Martinez',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Prayer Chain Ministry',
    description: 'Powerful intercessory prayer network connecting members to pray for community needs, personal requests, and global concerns with dedicated prayer warriors.',
    schedule: 'Daily Prayer Times',
    category: 'Worship',
    location: 'Prayer Room & Online',
    coordinator: 'Elder Michael Davis',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Community Food Pantry',
    description: 'Vital community food assistance program serving local families in need, providing nutritious meals and groceries with dignity and compassion.',
    schedule: 'Saturdays 10:00 AM',
    category: 'Outreach',
    location: 'Community Center',
    coordinator: 'Brother James Wilson',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Worship Music Ministry',
    description: 'Dynamic worship team and choir training program developing musical talents for Sunday services, special events, and community performances.',
    schedule: 'Wednesdays 7:00 PM',
    category: 'Worship',
    location: 'Sanctuary',
    coordinator: 'Minister of Music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=300&fit=crop',
  },
  {
    id: 5,
    title: 'Marriage & Family Counseling',
    description: 'Professional pre-marital counseling and ongoing relationship support helping couples build strong, faith-centered marriages and families.',
    schedule: 'By Appointment',
    category: 'Fellowship',
    location: 'Counseling Office',
    coordinator: 'Rev. Mary Johnson',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=300&fit=crop',
  },
  {
    id: 6,
    title: 'Golden Years Ministry',
    description: 'Enriching activities and support programs specifically designed for our senior members, including social gatherings, health seminars, and spiritual fellowship.',
    schedule: 'Second Saturday Monthly',
    category: 'Seniors',
    location: 'Senior Center',
    coordinator: 'Deacon Mark Thompson',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=600&h=300&fit=crop'
  },
  {
    id: 7,
    title: 'Youth Leadership Academy',
    description: 'Comprehensive leadership development program for teenagers, equipping them with skills, confidence, and biblical wisdom for future ministry and community leadership.',
    schedule: 'Fridays 6:30 PM',
    category: 'Youth',
    location: 'Youth Center',
    coordinator: 'Youth Pastor Lisa White',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop',
  },
  {
    id: 8,
    title: 'Community Garden Project',
    description: 'Sustainable gardening initiative teaching agricultural skills while providing fresh produce for our food pantry and local community members.',
    schedule: 'Saturdays 8:00 AM',
    category: 'Outreach',
    location: 'Church Grounds',
    coordinator: 'Brother Paul Anderson',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=300&fit=crop',
  },
  {
    id: 9,
    title: 'Bible Study Fellowship',
    description: 'In-depth weekly Bible study sessions exploring Scripture through verse-by-verse teaching, group discussions, and practical application for daily life.',
    schedule: 'Thursdays 7:00 PM',
    category: 'Education',
    location: 'Main Hall',
    coordinator: 'Pastor John Smith',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=300&fit=crop',
  }
]

// Computed property for filtered activities
const filteredActivities = computed(() => {
  let filtered = activities

  // Filter by category
  if (selectedCategory.value !== 'All Activities') {
    filtered = filtered.filter(activity => activity.category === selectedCategory.value)
  }

  return filtered
})

// Computed property for paginated activities
const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredActivities.value.slice(start, end)
})

</script>

<style scoped>
/* Remove default transitions to avoid animations */
* {
  transition: none !important;
}

/* Hover effects without transitions */
.group:hover img {
  transform: scale(1.05);
}
</style>