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
        <Button @click="openModal(null)">
          <PlusIcon class="h-5 w-5 mr-2" />
          New Activity
        </Button>
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
            <button @click="openModal(activity)" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200">
              Edit
            </button>
            <button @click="openDeleteModal(activity)" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium transition-colors duration-200">
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
    <Modal v-model:is-open="isModalOpen" size="3xl" :title="isEditing ? 'Edit Activity' : 'Create New Activity'" @close="closeModal">
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Image URL -->
            <FileInput
              v-model="formData.image"
              accept="image/*"
              accept-text="Image files only, up to 10MB each"
              label="Image URL"
              class="md:col-span-2"
            />

            <!-- Title -->
            <TextField
              v-model="formData.title"
              label="Activity Title"
              placeholder="Enter activity title"
              required
              class="md:col-span-2"
            />

            <!-- Description -->
            <Textarea
              v-model="formData.description"
              label="Description"
              placeholder="Enter activity description"
              required
              rows="4"
              class="md:col-span-2"
            />

            <!-- Category -->
            <Select
              v-model="formData.category"
              :options="activitYList"
              label="Category"
              placeholder="Select a category"
              required
            />

            <!-- Location -->
            <TextField
              v-model="formData.location"
              label="Location"
              placeholder="Enter location"
            />

            <!-- Coordinator -->
            <TextField
              v-model="formData.co_ordinator"
              label="Coordinator"
              placeholder="Enter coordinator name"
            />
          </div>
        </div>
      </form>

      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button
            @click="closeModal"
            type="button"
            variant="secondary"
          >
            Cancel
          </button>
          <Button
            @click="submitForm"
            :loading="loading"
            type="button"
            :disabled="!formData.title || !formData.description || !formData.category"
          >
            Create Activity
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Delete confirmation modal -->
    <Modal v-model:is-open="isDeleteModalOpen" size="md" title="Confirm Delete" @close="cancelDelete">
      <p class="text-gray-700 dark:text-gray-300">
        Are you sure you want to delete the activity "{{ activityToDelete?.title }}"? This action cannot be undone.
      </p>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button
            @click="cancelDelete"
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            @click="confirmDelete"
            type="button"
            variant="danger"
          >
            Delete
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Pagination from '../UI/Pagination.vue'
import Modal from '../UI/Modal.vue'
import TextField from '../UI/TextField.vue'
import Textarea from '../UI/Textarea.vue'
import Select from '../UI/Select.vue'
import {
  CalendarIcon,
  PlusIcon,
  MapPinIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import FileInput from '../UI/FileInput.vue'
import { useActivityStore } from '@/stores/useActivityStore';
import { storeToRefs } from 'pinia';
import { useToast } from '~/composables/useToast'
import Button from '../UI/Button.vue';

const ActivityStore = useActivityStore();
const { activities, loading } = storeToRefs(ActivityStore);

const { addToast } = useToast()

const isEditing = ref(false)
const editingActivity = ref(null)
const activityToDelete = ref(null)
const currentPage = ref(1)
const itemsPerPage = 6
const isModalOpen = ref(false)
const selectedCategory = ref('All Activities')
const isDeleteModalOpen = ref(false)


const formData = ref({
  title: '',
  description: '',
  category: null,
  location: '',
  co_ordinator: '',
  image: ''
})

// Activity categories
const activityCategories = [
  'All Activities', 'Worship', 'Education', 'Fellowship', 'Outreach', 'Youth', 'Seniors'
]

const activitYList = [
  { label: 'Worship', value: 'worship' },
  { label: 'Education', value: 'education' },
  { label: 'Fellowship', value: 'fellowship' },
  { label: 'Outreach', value: 'outreach' },
  { label: 'Youth', value: 'youth' },
  { label: 'Seniors', value: 'seniors' },
]

// Computed property for filtered activities
const filteredActivities = computed(() => {
  let filtered = activities.value

  // Filter by category
  if (selectedCategory.value !== 'All Activities') {
    filtered = filtered.filter(activity => activity.category.toLowerCase() === selectedCategory.value.toLowerCase())
  }

  return filtered
})

// Computed property for total pages
const totalPages = computed(() => Math.ceil(filteredActivities.value.length / itemsPerPage))

// Computed property for paginated activities
const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredActivities.value.slice(start, end)
})

const handlePageChange = (page) => {
  currentPage.value = page
}

const openModal = (activity = null) => {
  isEditing.value = !!activity
  editingActivity.value = activity

  formData.value = isEditing.value ? { ...activity } : {
    title: '',
    description: '',
    category: null,
    location: '',
    co_ordinator: '',
    image: ''
  }

  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  editingActivity.value = null

  resetForm()
}

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    category: null,
    location: '',
    co_ordinator: '',
    image: ''
  }
}

const submitForm = async () => {
  try {
    let response;
    if (isEditing.value) {
      response = await ActivityStore.updateActivity(editingActivity.value.uid, formData.value)
    } else {
      response = await ActivityStore.addActivity(formData.value)
    }
    addToast(response.data.message || 'Activity added successfully', 'success')
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    addToast(error.response.data.message || 'Error adding activity', 'error')
  }
}

const openDeleteModal = (activity) => {
  activityToDelete.value = activity
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  try {
    await ActivityStore.deleteActivity(activityToDelete.value.uid)
    isDeleteModalOpen.value = false
    activityToDelete.value = null
    addToast('Activity deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting user:', error)
    addToast(error.response.data.message, 'error')
  }
}

const cancelDelete = () => {
  isDeleteModalOpen.value = false
  activityToDelete.value = null
}
onMounted(() => {
  ActivityStore.fetchActivities();
  console.log('Activities fetched:', activities);
});

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