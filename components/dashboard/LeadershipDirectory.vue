<!-- components/sections/LeadershipDirectory.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="md:flex space-y-4 md:space-y-0 justify-between items-center mb-10">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Leadership Directory</h1>
        <p class="text-gray-600 dark:text-gray-400">Meet our dedicated leaders serving our community</p>
      </div>
      <Button @click="openModal(null)">
        <PlusIcon class="h-5 w-5 mr-2" />
        Add Leader
      </Button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div v-for="summary in summaryStats" :key="summary.title" 
           class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div :class="['p-3 rounded-full', summary.bgColor]">
            <component :is="summary.icon" :class="['h-6 w-6', summary.color]" />
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ summary.value }}</p>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ summary.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Leadership Categories Grid -->
    <div v-if="leadershipCategories && leadershipCategories.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div v-for="category in leadershipCategories" :key="category.name" 
           class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        <!-- Category Header -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 border-b border-gray-200 dark:border-gray-600">
          <div class="flex items-center">
            <div :class="['p-3 rounded-full bg-white dark:bg-gray-900 shadow-sm', category.bgColor]">
              <component :is="category.icon" :class="['h-6 w-6', category.color]" />
            </div>
            <div class="ml-4">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.name }}</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ category.members.length }} members</p>
            </div>
          </div>
        </div>

        <!-- Members List -->
        <div class="p-6">
          <div class="space-y-6">
            <div v-for="leader in category.members" :key="leader.id" 
                 class="bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
              
              <!-- Main Leader Card -->
              <div class="flex gap-4 p-4">
                <!-- Avatar -->
                <div class="flex-shrink-0">
                  <img :src="leader.image" :alt="leader.name"
                       class="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm">
                </div>
                
                <!-- Leader Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ leader.name }}</h3>
                      <p class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ leader.position }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <!-- Edit Button -->
                      <button @click="openModal(leader)" 
                              class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        <PencilIcon class="h-4 w-4" />
                      </button>
                      <!-- Delete Button -->
                      <button @click="openDeleteModal(leader)" 
                              class="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-red-500 hover:text-red-700">
                        <TrashIcon class="h-4 w-4" />
                      </button>
                      <!-- Biography Toggle Icon -->
                      <button @click="toggleBiography(leader.id)" 
                              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        <InformationCircleIcon v-if="!expandedBios[leader.id]" class="h-5 w-5" />
                        <XMarkIcon v-else class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <!-- Brief Description -->
                  <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3 truncate" v-html="leader.biography"></p>
                  
                  <!-- Contact Info & Specialties -->
                  <div class="flex flex-wrap gap-3 text-xs mb-3">
                    <div v-if="leader.email" class="flex items-center text-gray-600 dark:text-gray-400">
                      <EnvelopeIcon class="h-3 w-3 mr-1" />
                      {{ leader.email }}
                    </div>
                    <div v-if="leader.phone_number" class="flex items-center text-gray-600 dark:text-gray-400">
                      <PhoneIcon class="h-3 w-3 mr-1" />
                      {{ leader.phone_number }}
                    </div>
                  </div>
                  
                  <!-- Specialties/Focus Areas -->
                  <div v-if="leader.specialties" class="flex flex-wrap gap-1">
                    <span v-for="specialty in leader.specialties" :key="specialty"
                          class="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {{ specialty }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Expandable Biography Section -->
              <div v-if="expandedBios[leader.id]" class="border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4">
                <div class="flex items-start gap-3">
                  <BookOpenIcon class="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Full Biography</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed" v-html="leader.biography"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 col-span-5">
        <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-gray-500 text-lg font-medium">No Leaders found</p>
        <p class="text-gray-400 text-sm mt-1">
            There are no leaders to display at the moment.
        </p>
    </div>

    <!-- Modal for adding new leader -->
    <Modal v-model:is-open="isModalOpen" size="3xl" @close="closeModal" :title="isEditing ? 'Edit Leader' : 'Add New Leader'">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <FileInput v-model="newLeader.image" accept="image/*" label="Image" />
        </div>
        <div>
          <Select v-model="newLeader.category" label="Category" :options="categoryOptions" required />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField v-model="newLeader.name" label="Name" required />
          <TextField v-model="newLeader.position" label="Position" required />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField v-model="newLeader.email" label="Email" type="email" />
          <TextField v-model="newLeader.phone_number" label="Phone Number" />
        </div>
        <div>
          <ClientOnly>
            <component :is="QuillEditor" v-if="QuillEditor" v-model:content="newLeader.biography" content-type="html" label="Full Biography" placeholder="Enter Full Biography" />
            <Textarea v-else v-model="newArticle.biography" label="Full Biography" placeholder="Enter Full Biography" rows="6" required />
          </ClientOnly>
        </div>
        <Textarea v-model="newLeader.specialties" label="Specialties (comma-separated)" rows="2" />
      </form>
      <template #footer>
          <div class="flex justify-end space-x-2">
            <Button type="button" @click="closeModal" variant="secondary">Cancel</Button>
            <Button type="submit" variant="primary" :loading="loading" @click="submitForm">{{ isEditing ? 'Update Leader' : 'Add Leader' }}</Button>
          </div>
        </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-model:is-open="isDeleteModalOpen" size="md" @close="cancelDelete" title="Confirm Delete">
      <p class="text-gray-700 dark:text-gray-300">Are you sure you want to delete this leader? This action cannot be undone.</p>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button type="button" @click="cancelDelete" variant="secondary">Cancel</Button>
          <Button type="button" @click="confirmDelete" variant="danger" :loading="loading">Delete</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  UsersIcon,
  MapPinIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  InformationCircleIcon,
  XMarkIcon,
  BookOpenIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  TrashIcon,
  PencilIcon
} from '@heroicons/vue/24/outline'
import Modal from '~/components/UI/Modal.vue'
import TextField from '~/components/UI/TextField.vue'
import Textarea from '~/components/UI/Textarea.vue'
import Button from '~/components/UI/Button.vue'
import Select from '~/components/UI/Select.vue'
import FileInput from '../UI/FileInput.vue'
import { storeToRefs } from 'pinia';
import { useLeadersStore } from '~/stores/useLeadersStore'
import { useToast } from '~/composables/useToast'
import { onMounted } from 'vue'

const { addToast } = useToast()

// Category definitions
const categoryDefinitions = {
  executive_council: {
    name: 'Executive Council',
    icon: UserGroupIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  district_area_heads: {
    name: 'District Area Heads',
    icon: MapPinIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  men_fellowship: {
    name: 'Men Fellowship',
    icon: UsersIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  women_and_youth: {
    name: 'Women and Youth',
    icon: BuildingOffice2Icon,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100 dark:bg-pink-900/30'
  }
}

// Category options for modal select
const categoryOptions = [
  { value: 'executive_council', label: 'Executive Council' },
  { value: 'district_area_heads', label: 'District Area Heads' },
  { value: 'men_fellowship', label: 'Men Fellowship' },
  { value: 'women_and_youth', label: 'Women and Youth' }
]

const QuillEditor = ref(null)
const quillCssLoaded = ref(false)
const isEditing = ref(false)
const editingLeader = ref(null)
const leaderToDelete = ref(null)
const isDeleteModalOpen = ref(false)

// Computed property for leadership categories
const leadershipCategories = computed(() => {
  const categories = {}
  leaders.value.forEach(leader => {
    const catKey = leader.category
    if (!categories[catKey]) {
      categories[catKey] = {
        ...categoryDefinitions[catKey],
        members: []
      }
    }
    categories[catKey].members.push({
      ...leader,
      avatar: leader.image,
      phone: leader.phone_number,
      fullBiography: leader.biography
    })
  })
  return Object.values(categories)
})

const LeadersStore = useLeadersStore()
const { leaders, loading } = storeToRefs(LeadersStore)

if (process.client) {
  import('@vueup/vue-quill').then((module) => {
    QuillEditor.value = module.QuillEditor
  })
  import('@vueup/vue-quill/dist/vue-quill.snow.css').then(() => {
    quillCssLoaded.value = true
  })
}

// state for expanded biographies
const expandedBios = ref({})

// toggle biography display
const toggleBiography = (leaderId) => {
  expandedBios.value[leaderId] = !expandedBios.value[leaderId]
}

// Reactive state for modal and new leader
const isModalOpen = ref(false)
const newLeader = ref({
  name: '',
  position: '',
  category: null,
  image: null,
  email: '',
  phone_number: '',
  biography: '',
  specialties: ''
})

// Function to open modal
const openModal = (leader = null) => {
  isEditing.value = !!leader
  editingLeader.value = leader

  newLeader.value = leader
    ? { ...leader }
    : {
        name: '',
        position: '',
        category: null,
        image: null,
        email: '',
        phone_number: '',
        biography: '',
        specialties: ''
      }

  isModalOpen.value = true
}

// Function to close modal
const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  editingLeader.value = null

  newLeader.value = {
    name: '',
    position: '',
    category: null,
    image: null,
    email: '',
    phone_number: '',
    biography: '',
    specialties: ''
  }
}

// Function to delete leader
const openDeleteModal = (leader) => {
  leaderToDelete.value = leader
  isDeleteModalOpen.value = true
}

const submitForm = async () => {
  try {
    let response;
    if (isEditing.value) {
      response = await LeadersStore.updateLeader(editingLeader.value.uid, newLeader.value)
    } else {
      response = await LeadersStore.addLeader(newLeader.value)
    }
    addToast(response.data.message || 'Leader added successfully', 'success')
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    addToast(error.response.data.message || 'Error adding leader', 'error')
  }
}

// Function to submit form
const confirmDelete = async () => {
  try {
    await LeadersStore.deleteLeader(leaderToDelete.value.uid)
    isDeleteModalOpen.value = false
    leaderToDelete.value = null
    addToast('Leader deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting leader:', error)
    addToast(error.response.data.message, 'error')
  }
}

const cancelDelete = () => {
  isDeleteModalOpen.value = false
  leaderToDelete.value = null
}

// Summary statistics
const summaryStats = computed(() => [
  {
    title: 'Total Leaders',
    value: leaders.value.length.toString(),
    icon: UserGroupIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Leadership Categories',
    value: leadershipCategories.value.length.toString(),
    icon: BuildingOffice2Icon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-blue-900/30'
  },
])


onMounted(() => {
  LeadersStore.fetchLeaders()
  console.log(leaders)
})
</script>

<style scoped>
.leadership-card {
  transition: none;
}
</style>