<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Ministry Registrations</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Manage membership applications for various church ministries</p>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-8">
      <nav class="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
        <button 
          @click="activeFilter = 'all'"
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
            activeFilter === 'all' 
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          Ministry Applications ({{ registrations.length }})
        </button>
        <button 
          @click="activeFilter = 'ministry'"
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
            activeFilter === 'ministry' 
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          Courses Applications
        </button>
      </nav>
    </div>

    <div v-if="activeFilter !== 'ministry'" class="">
      <!-- Registration Cards -->
      <div>
        <Table
          :data="registrations"
          :columns="registrationColumns"
          title="Ministry Applications"
          :searchable="true"
          :search-placeholder="'Search ministry registrations...'"
          :items-per-page="10"
          :pagination="true"
          class="text-nowrap"
        >
          <template #actions="{ item }">
            <button
              @click="selectedRegistration = item"
              class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
              :title="'View ' + item?.ministry"
            >
              <EyeIcon class="h-4 w-4" />
            </button>
            <button
              class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
              :title="'Delete ' + item?.ministry"
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </template>
      </Table>
      </div>
    </div>

    <!-- Ministry View -->
    <div v-if="activeFilter === 'ministry'" class="space-y-8">
      <div>
        <Table
          :data="courseRegistrations"
          :columns="courseColumns"
          title="Courses & Programs Applications"
          :searchable="true"
          :search-placeholder="'Search registrations...'"
          :items-per-page="10"
          :pagination="true"
          empty-state-title="No registrations found"
          empty-state-description="Start by adding your first registration to get started."
          :loading="courseLoading"
          class="text-nowrap"
        >
          <template #actions="{ item }">
            <button
              @click="selectedCourse = item"
              class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
              :title="'View ' + item?.name"
            >
              <EyeIcon class="h-4 w-4" />
            </button>
            <button
              class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
              :title="'Delete ' + item?.name"
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </template>
        </Table>
      </div>
    </div>

    <!-- Registration Detail Modal -->
    <div v-if="selectedRegistration" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div :class="[
          'p-6 text-white',
          getMinistryGradient(selectedRegistration.ministry)
        ]">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-2xl font-bold">{{ selectedRegistration.name }}</h2>
              <p class="text-white/80">{{ selectedRegistration.ministry }} Registration</p>
            </div>
            <button 
              @click="selectedRegistration = null"
              class="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <!-- Personal Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</p>
                <p class="text-gray-900 dark:text-white">{{ selectedRegistration.name }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
                <p class="text-gray-900 dark:text-white">{{ selectedRegistration.gender }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p class="text-gray-900 dark:text-white">{{ selectedRegistration.email }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                <p class="text-gray-900 dark:text-white">{{ selectedRegistration.phone }}</p>
              </div>
            </div>
          </div>

          <!-- Ministry Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ministry & Motivation</h3>
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Why do you want to join {{ selectedRegistration.ministry }}?</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ selectedRegistration.reason }}</p>
            </div>
          </div>

          <!-- Skills & Experience -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills & Experience</h3>
            <div class="space-y-4">
              <div>
                <h5 class="font-medium text-gray-700 dark:text-gray-300 mb-2">Relevant Skills</h5>
                <div class="flex flex-wrap gap-2">
                <!--  its not an array its a string  seperated by comma -->
                  <span
                    v-for="(skill, index) in (Array.isArray(selectedRegistration.skills) ? selectedRegistration.skills : selectedRegistration.skills.split(',').map(s => s.trim()).filter(s => s))"
                    :key="index"
                    class="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Course Applications Details-->
    <div v-if="selectedCourse" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-bold">Course Application Details</h2>
            <button @click="selectedCourse = null" class="text-white hover:text-gray-200">
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
        </div>

        <div class="p-6">
          <!-- Applicant Profile Section -->
          <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
            <div class="flex items-center mb-6">
              <div class="h-20 w-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-6">
                {{ getInitials(selectedCourse.name) }}
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedCourse.name }}</h3>
                <p class="text-blue-600 dark:text-blue-400 text-lg">{{ selectedCourse.course }}</p>
                <p class="text-gray-600 dark:text-gray-400">Applied on {{ selectedCourse.applicationDate || 'Feb 15, 2025' }}</p>
              </div>
            </div>
          </div>

          <!-- Personal Information Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center mb-3">
                <EnvelopeIcon class="h-5 w-5 text-blue-500 mr-2" />
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
              </div>
              <span class="font-bold text-lg text-gray-900 dark:text-white">{{ selectedCourse.email }}</span>
            </div>

            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center mb-3">
                <PhoneIcon class="h-5 w-5 text-green-500 mr-2" />
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</span>
              </div>
              <span class="font-bold text-lg text-gray-900 dark:text-white">{{ selectedCourse.phone }}</span>
            </div>

            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center mb-3">
                <CalendarIcon class="h-5 w-5 text-purple-500 mr-2" />
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</span>
              </div>
              <span class="font-bold text-lg text-gray-900 dark:text-white">{{ selectedCourse.dateofbirth }}</span>
            </div>

            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center mb-3">
                <UserIcon class="h-5 w-5 text-pink-500 mr-2" />
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</span>
              </div>
              <span class="font-bold text-lg text-gray-900 dark:text-white">{{ selectedCourse.gender }}</span>
            </div>

            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center mb-3">
                <ClockIcon class="h-5 w-5 text-orange-500 mr-2" />
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</span>
              </div>
              <span class="font-bold text-lg text-gray-900 dark:text-white">{{ selectedCourse.duration }}</span>
            </div>

            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <div class="flex items-center mb-3">
                <BookOpenIcon class="h-5 w-5 text-indigo-500 mr-2" />
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Course</span>
              </div>
              <span class="font-bold text-lg text-gray-900 dark:text-white">{{ selectedCourse.course }}</span>
            </div>
          </div>

          <!-- Description Section -->
          <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-8">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DocumentTextIcon class="h-5 w-5 text-blue-500 mr-2" />
              Application Description
            </h4>
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{{ selectedCourse.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  XMarkIcon,
  ClockIcon,
  EyeIcon,
  TrashIcon,
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon, 
  UserIcon, 
  BookOpenIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import Table from '../UI/Table.vue'
import { useMinistryStore } from '../../stores/useMinistryStore'
import { useCoursesStore } from '../../stores/useCoursesStore'
import { storeToRefs } from 'pinia'

const MinistryStore = useMinistryStore()
const { ministries: registrations, loading } = storeToRefs(MinistryStore)

const CoursesStore = useCoursesStore()
const { courses:courseRegistrations, loading: courseLoading } = storeToRefs(CoursesStore)


// Reactive state
const activeFilter = ref('all')
const selectedRegistration = ref(null)
const selectedCourse = ref(null)

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const registrationColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'ministry', label: 'Ministry', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'gender', label: 'Gender', sortable: true },
  { key: 'skills', label: 'Skills' },
]

const courseColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'course', label: 'Course', sortable: true },
  { key: 'duration', label: 'Duration', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'dateofbirth', label: 'Date of Birth' }
]


const getMinistryGradient = (ministry) => {
  const gradients = {
    'Youth Fellowship': 'bg-gradient-to-r from-blue-500 to-blue-700',
    'Women Ministry': 'bg-gradient-to-r from-pink-500 to-pink-700',
    'Men Fellowship': 'bg-gradient-to-r from-green-500 to-green-700',
    'Choir Ministry': 'bg-gradient-to-r from-purple-500 to-purple-700',
    'Ushering Ministry': 'bg-gradient-to-r from-indigo-500 to-indigo-700',
    'Children Ministry': 'bg-gradient-to-r from-yellow-500 to-yellow-700',
    'Outreach Ministry': 'bg-gradient-to-r from-teal-500 to-teal-700',
    'Prayer Ministry': 'bg-gradient-to-r from-red-500 to-red-700'
  }
  return gradients[ministry] || 'bg-gradient-to-r from-gray-500 to-gray-700'
}

onMounted(async () => {
  await MinistryStore.fetchMinistries()
  await CoursesStore.fetchCourses()


  // Transform and add the JSON data to registrations only if not already exists
  jsonResponse.forEach(item => {
    const existingIndex = registrations.value.findIndex(reg => reg.id === item.uid || (reg.name === item.name && reg.email === item.email))
    if (existingIndex === -1) {
      const birthDate = new Date(item.birth_date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0)

      const transformedItem = {
        id: item.uid,
        name: item.name,
        email: item.email,
        phone: item.phone,
        ministry: item.ministry.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        age: age,
        gender: item.gender.charAt(0).toUpperCase() + item.gender.slice(1), // Capitalize gender
        date: new Date(), // Current date as application date
        reason: "Interested in joining the ministry", // Default reason
        membershipDuration: "New", // Default duration
        skills: item.skills.split(',').map(s => s.trim()).filter(skill => skill.length > 0) // Split skills string into array
      }

      registrations.value.push(transformedItem)
    } else {
      // Update existing entry with transformed data if needed
      const existing = registrations.value[existingIndex]
      if (existing.ministry === item.ministry) {
        existing.ministry = item.ministry.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
      }
      if (existing.gender === item.gender) {
        existing.gender = item.gender.charAt(0).toUpperCase() + item.gender.slice(1)
      }
      // Calculate age if birth_date is available
      if (item.birth_date && !existing.age) {
        const birthDate = new Date(item.birth_date)
        const today = new Date()
        existing.age = today.getFullYear() - birthDate.getFullYear() - (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0)
      }
      // Add missing fields
      if (!existing.reason) existing.reason = "Interested in joining the ministry"
      if (!existing.membershipDuration) existing.membershipDuration = "New"
      if (!existing.skills && item.skills) existing.skills = item.skills.split(',').map(s => s.trim()).filter(skill => skill.length > 0)
    }
  })
})
</script>