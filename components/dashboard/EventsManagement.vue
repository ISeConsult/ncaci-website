<!-- components/sections/EventsManagement.vue -->
<template>
  <div>
    <div class="md:flex justify-between items-center mb-8 space-y-4 md:space-y-0">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Events Management</h1>
      <button @click="openModal" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
        <PlusIcon class="h-5 w-5 mr-2" />
        New Event
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
                    <span class="font-medium">{{ event.date }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <ClockIcon class="h-4 w-4 mr-2 text-green-500" />
                    <span>{{ event.time }}</span>
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
                      v-for="speaker in event.speakers"
                      :key="speaker.name"
                      class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {{ speaker.name }}
                    </span>
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

            <!-- Pagination -->
            <div class="flex justify-center mt-8">
              <Pagination :current-page="currentPage" :total-pages="totalPages" :total-items="events.length" :items-per-page="itemsPerPage" @update:currentPage="onPageChange" />
            </div>
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
              v-for="category in eventCategories" 
              :key="category.name" 
              class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer group"
            >
              <span class="text-gray-700 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {{ category.name }}
              </span>
              <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">
                {{ category.count }}
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
                {{ events.filter(e => e.status === 'Active').length }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Upcoming</span>
              <span class="font-bold text-xl text-blue-600 dark:text-blue-400">
                {{ events.filter(e => e.status === 'Upcoming').length }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <Modal v-model:is-open="isModalOpen" title="Create New Event" size="2xl" @close="closeModal">
    <form @submit.prevent="submitNewEvent">
      <div class="space-y-4">
        <FileInput v-model="newEvent.image" accept="image/*" label="Image" />
        <TextField v-model="newEvent.title" label="Title" required />
        <Textarea v-model="newEvent.description" label="Description" required />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DatePicker v-model="newEvent.date" label="Date" required />
          <TimePicker v-model="newEvent.time" label="Time" required />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField v-model="newEvent.location" label="Location" required />
          <Select v-model="newEvent.days" label="Days" :options="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']" searchable clearable required />
        </div>
        <Select v-model="newEvent.status" label="Status" :options="statusOptions" searchable clearable />
         <TextField v-model="newEvent.speakers" label="Speakers" placeholder="Enter speaker names (comma-separated)" required />
      </div>
    </form>
    <template #footer>
      <div class="flex justify-end space-x-2 pt-4">
        <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
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

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const currentPage = ref(1)
const itemsPerPage = ref(4)

const totalPages = computed(() => Math.ceil(events.length / itemsPerPage.value))

const onPageChange = (page) => {
  currentPage.value = page
}

const newEvent = ref({
  title: '',
  description: '',
  date: null,
  time: null,
  location: '',
  speakers: [],
  image: null,
  status: 'Upcoming'
})

const closeModal = () => {
  isModalOpen.value = false
}


// Data
const events = [
  {
    id: 1,
    title: 'Annual Convention 2025',
    description: 'Three-day spiritual retreat and fellowship gathering with inspiring workshops and community bonding.',
    date: 'March 15-17, 2025',
    time: '10:00 AM',
    location: 'Main Auditorium',
    status: 'Upcoming',
    speakers: [
      { name: 'John Doe', title: 'Pastor' },
      { name: 'Jane Smith', title: 'Pastor' },
      { name: 'Bob Johnson', title: 'Pastor' }
    ],
    image: '/images/gala1.jpg'
  },
  {
    id: 2,
    title: 'Youth Empowerment Summit',
    description: 'Leadership training and skill development for young adults with interactive sessions and mentorship.',
    date: 'February 28, 2025',
    time: '9:00 AM',
    location: 'Conference Hall',
    status: 'Planning',
    speakers: [
      { name: 'John Doe', title: 'Pastor' },
      { name: 'Jane Smith', title: 'Pastor' }
    ],
    image: '/images/gala2.jpg'
  },
  {
    id: 3,
    title: 'Community Outreach',
    description: 'Medical mission and food distribution program serving the local community with love and care.',
    date: 'February 22, 2025',
    time: '11:00 AM',
    location: 'Downtown Community Center',
    status: 'Active',
    speakers: [
      { name: 'Bob Johnson', title: 'Pastor' }
    ],
    image: '/images/gala3.jpg'
  },
  {
    id: 4,
    title: 'Marriage Enrichment Seminar',
    description: 'Strengthening family bonds and relationships through biblical principles and practical guidance.',
    date: 'March 8, 2025',
    time: '2:00 PM',
    location: 'Fellowship Hall',
    status: 'Upcoming',
    speakers: [
      { name: 'John Doe', title: 'Pastor' },
      { name: 'Jane Smith', title: 'Pastor' }
    ],
    image: '/images/gala4.jpg'
  }
]

// Computed property for paginated events
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return events.slice(start, end)
})

const eventCategories = [
  { name: 'Worship Services', count: 52 },
  { name: 'Community Events', count: 18 },
  { name: 'Training Programs', count: 12 },
  { name: 'Social Activities', count: 24 }
]

// Helper function
const getEventStatusColor = (status) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case 'Upcoming': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case 'Planning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  }
}

const submitNewEvent = () => {
  // For now, just log the new event and close the modal
  console.log('New Event Submitted:', newEvent.value)
  // You can add logic here to actually add the event to the events list or send to backend
  showNewEventModal.value = false
  // Reset form
  newEvent.value = {
    title: '',
    description: '',
    date: null,
    time: null,
    location: '',
    speakers: [],
    image: null,
    status: 'Upcoming'
  }
}

const statusOptions = [
  { label: 'Upcoming', value: 'Upcoming' },
  { label: 'Active', value: 'Active' },
  { label: 'Planning', value: 'Planning' }
]
</script>
