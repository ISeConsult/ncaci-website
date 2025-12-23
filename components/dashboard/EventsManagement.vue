<!-- components/sections/EventsManagement.vue -->
<template>
  <div>
    <div class="md:flex justify-between items-center mb-8 space-y-4 md:space-y-0">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Events Management</h1>
      <Button @click="openModal(null)">
        <PlusIcon class="h-5 w-5 mr-2" />
        New Event
      </Button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
          </div>
          <div v-if="events && events.length > 0" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="event in paginatedEvents"
                :key="event.id"
                class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-5 hover:shadow-lg transition-all duration-300 hover:bg-gray-50 cursor-pointer group"
              >
                <!-- Event Header -->
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                        <h4 class="font-bold text-wrap text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {{ event.title }}
                        </h4>
                        <div>
                            <img class="w-16 h-16 rounded-full mr-4" :src="event.image" alt="Event Image"></img>
                        </div>
                    </div>
                    <span
                      :class="['inline-block px-3 py-1 rounded-full text-xs font-semibold', getEventStatusColor(event.status)]"
                    >
                      {{ event.status }}
                    </span>
                  </div>
                </div>

                <!-- Event Description -->
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {{ event.description }}
                </p>

                <!-- Event Details -->
                <div class="space-y-3 mb-4">
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <CalendarIcon class="h-4 w-4 mr-2 text-blue-500" />
                    <span>{{ event.start_date }} - {{ event.end_date }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon class="h-4 w-4 mr-2 text-green-500" />
                    <span>{{ event.start_time }} - {{ event.end_time }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPinIcon class="h-4 w-4 mr-2 text-red-500" />
                    <span>{{ event.location }}</span>
                  </div>
                </div>

                <!-- Speakers Section -->
                <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h5 class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                    Speakers
                  </h5>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="speaker in event.speakers ? event.speakers.split(',').map(s => s.trim()) : []"
                      :key="speaker"
                      class="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {{ speaker }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex justify-end mt-4 pt-3 border-t border-gray-100 dark:border-gray-600 space-x-2">
                  <button class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200" @click="openModal(event)">
                    Edit
                  </button>
                  <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm font-medium transition-colors duration-200" @click="openDeleteModal(event)">
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center mt-8">
              <Pagination :current-page="currentPage" :total-pages="totalPages" :total-items="events.length" :items-per-page="itemsPerPage" @update:currentPage="onPageChange" />
            </div>
          </div>

          <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 col-span-5">
              <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-500 text-lg font-medium">No Events found</p>
              <p class="text-gray-400 text-sm mt-1">
                  There are no events to display at the moment.
              </p>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Event Categories Card -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <div class="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
            Event Categories
          </h3>
          <div class="space-y-4">
            <div 
              class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer group gap-4"
            >
              <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                Worship Services
              </span>
              <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                {{ events.filter(e => e.event_type === 'worship_service').length }} 
              </span>
            </div>

            <div 
              class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer group gap-4"
            >
              <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                Social Activities
              </span>
              <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                {{ events.filter(e => e.event_type === 'social_activities').length }} 
              </span>
            </div>

            <div 
              class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer group gap-4"
            >
              <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                Training Programs
              </span>
              <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                {{ events.filter(e => e.event_type === 'training_program').length }} 
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Stats Card -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl shadow-sm p-6 border border-blue-200 dark:border-blue-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <div class="w-2 h-6 bg-indigo-500 rounded-full mr-3"></div>
            Quick Stats
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Total Events</span>
              <span class="font-bold text-xl text-indigo-600 dark:text-indigo-400">{{ events.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Active Events</span>
              <span class="font-bold text-xl text-green-600 dark:text-green-400">
                {{ events.length ? events.filter(e => e.status === 'active').length : 0 }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Upcoming</span>
              <span class="font-bold text-xl text-blue-600 dark:text-blue-400">
                {{ events.filter(e => e.status === 'upcoming').length }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  

  <Modal v-model:is-open="isModalOpen" :title="isEditing ? 'Edit Event' : 'Create New Event'" size="2xl" @close="closeModal">
    <form @submit.prevent="submitNewEvent" enctype="multipart/form-data">
      <div class="space-y-4">
        <FileInput v-model="formData.image" accept="image/*" label="Image" />
        <TextField v-model="formData.title" label="Title" required />
        <Textarea v-model="formData.description" label="Description" required />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker v-model="formData.start_date" label="Start Date" required />
          <DatePicker v-model="formData.end_date" label="End Date" required />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TimePicker v-model="formData.start_time" label="Start Time" required />
          <TimePicker v-model="formData.end_time" label="End Time" required />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField v-model="formData.location" label="Location" required />
          <Select v-model="formData.status" label="Status" :options="statusOptions" searchable clearable />
        </div>
        <Select v-model="formData.event_type" label="Event Type" :options="categories" searchable clearable />
        <TextField v-model="formData.speakers" label="Speakers" placeholder="Enter speaker names (comma-separated)" required />
      </div>
    </form>
    <template #footer>
      <div class="flex justify-end space-x-2 pt-4">
        <Button type="button" @click="closeModal" variant="secondary">Cancel</Button>
        <Button type="submit" :loading="loading" @click="submitNewEvent">{{ isEditing ? 'Update' : 'Create' }}</Button>
      </div>
    </template>
  </Modal>

  <!-- Delete confirmation modal -->
  <Modal v-model:is-open="isDeleteModalOpen" size="md" title="Confirm Delete" @close="cancelDelete">
    <p class="text-gray-700 dark:text-gray-300">
      Are you sure you want to delete the event "{{ eventToDelete?.title }}"? This action cannot be undone.
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
          :loading="loading"
        >
          Delete
        </Button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import Pagination from '../UI/Pagination.vue'

import Modal from '../UI/Modal.vue'
import TextField from '../UI/TextField.vue'
import Textarea from '../UI/Textarea.vue'
import DatePicker from '../UI/DatePicker.vue'
import TimePicker from '../UI/TimePicker.vue'
import Select from '../UI/Select.vue'
import FileInput from '../UI/FileInput.vue'
import { ClockIcon, MapPinIcon, CalendarIcon, PlusIcon } from '@heroicons/vue/24/outline'
import Button from '../UI/Button.vue'
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useToast } from '~/composables/useToast'
import { useEventStore } from '~/stores/useEventStore'

const EventStore = useEventStore();
const { events, loading } = storeToRefs(EventStore);

const { addToast } = useToast()

const isModalOpen = ref(false)
const isEditing = ref(false)
const editingEvent = ref(null)
const isDeleteModalOpen = ref(false)
const eventToDelete = ref(null)

const openModal = (event = null) => {
  isEditing.value = !!event
  editingEvent.value = event
  
  formData.value = isEditing.value ? { ...event } : {
    title: '',
    description: '',
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    location: '',
    speakers: '',
    image: null,
    status: ''
  }
  
  isModalOpen.value = true
}

const currentPage = ref(1)
const itemsPerPage = ref(4)

const totalPages = computed(() => Math.ceil((events.value || []).length / itemsPerPage.value))

const onPageChange = (page) => {
  currentPage.value = page
}

const formData = ref({
  title: '',
  description: '',
  start_date: null,
  end_date: null,
  start_time: null,
  end_time: null,
  location: '',
  speakers: '',
  image: null,
  status: ''
})

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  editingEvent.value = null
  formData.value = {
    title: '',
    description: '',
    start_date: null,
    end_date: null,
    start_time: null,
    end_time: null,
    location: '',
    speakers: '',
    image: null,
    status: ''
  }
}

// Computed property for paginated events
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return events.value.slice(start, end)
})

const categories = [
  { label: 'Worship Services', value: 'worship_service' },
  { label: 'Social Activities', value: 'social_activities' },
  { label: 'Training Programs', value: 'training_program' }
]

// Helper function
const getEventStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case 'upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case 'planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  }
}

const submitNewEvent = async () => {
  try {
    let response;
    if (isEditing.value) {
      response = await EventStore.updateEvent(editingEvent.value.uid, formData.value)
    } else {
      response = await EventStore.addEvent(formData.value)
    }
    addToast(response.data.message || 'Event added successfully', 'success')
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    addToast(error.response.data.message || 'Error adding event', 'error')
  }
}

const openDeleteModal = (event) => {
  eventToDelete.value = event
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  try {
    await EventStore.deleteEvent(eventToDelete.value.uid)
    isDeleteModalOpen.value = false
    eventToDelete.value = null
    addToast('Event deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting user:', error)
    addToast(error.response.data.message, 'error')
  }
}

const cancelDelete = () => {
  isDeleteModalOpen.value = false
  eventToDelete.value = null
}

const statusOptions = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Active', value: 'active' },
  { label: 'Planning', value: 'planning' }
]

onMounted(() => {
  EventStore.fetchEvents();
  console.log('Events fetched:', events);
});
</script>
