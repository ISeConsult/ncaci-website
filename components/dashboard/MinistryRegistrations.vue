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

    <div v-if="activeFilter !== 'ministry'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Registration Cards -->
      <div class="lg:col-span-2">
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

      <!-- Stats Sidebar -->
      <div class="space-y-6">
        <!-- Recent Activity -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl shadow-sm p-6 border border-green-200 dark:border-green-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <ClockIcon class="h-5 w-5 mr-2 text-green-500" />
            Recent Activity
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Today's Applications</span>
              <span class="font-bold text-xl text-green-600 dark:text-green-400">{{ getTodayApplications() }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400 text-sm">This Week</span>
              <span class="font-bold text-xl text-green-600 dark:text-green-400">{{ getWeekApplications() }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400 text-sm">Total Applications</span>
              <span class="font-bold text-xl text-yellow-600 dark:text-yellow-400">{{ getTotalApplications() }}</span>
            </div>
          </div>
        </div>

        <!-- Registration Stats -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <ChartBarIcon class="h-5 w-5 mr-2 text-blue-500" />
            Registration Statistics
          </h3>
          <div class="space-y-4">
            <div v-for="stat in registrationStats" :key="stat.ministry" class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ stat.ministry }}</span>
              <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2rem] text-center">{{ stat.count }}</span>
            </div>
          </div>
        </div>
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
          :loading="loading"
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
              <p class="text-white/70 text-sm mt-1">Applied {{ formatDate(selectedRegistration.date) }}</p>
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
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Age</p>
                <p class="text-gray-900 dark:text-white">{{ selectedRegistration.age }} years</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
                <p class="text-gray-900 dark:text-white">{{ selectedRegistration.gender }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Membership Duration</p>
                <p class="text-gray-900 dark:text-white">{{ selectedRegistration.membershipDuration }}</p>
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
                  <span 
                    v-for="skill in selectedRegistration.skills" 
                    :key="skill"
                    class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium"
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
import { ref, computed } from 'vue'
import { 
  XMarkIcon,
  ChartBarIcon,
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


// Reactive state
const activeFilter = ref('all')
const selectedRegistration = ref(null)
const selectedCourse = ref(null)

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

// Data
const registrations = ref([
  {
    id: 1,
    name: 'Emmanuel Asante',
    ministry: 'Youth Fellowship',
    email: 'emmanuel.asante@gmail.com',
    phone: '+233 24 123 4567',
    age: 22,
    gender: 'Male',
    membershipDuration: '2 years',
    date: new Date('2025-02-15T14:30:00'),
    reason: 'I am passionate about working with young people and helping them grow in their faith. Having been in the church for 2 years, I feel called to serve the youth and share my experiences of God\'s faithfulness.',
    skills: ['Youth Mentoring', 'Event Planning', 'Public Speaking', 'Sports Coordination'],
  },
  {
    id: 2,
    name: 'Akosua Mensah',
    ministry: 'Women Ministry',
    email: 'akosua.mensah@yahoo.com',
    phone: '+233 24 234 5678',
    age: 35,
    gender: 'Female',
    membershipDuration: '5 years',
    date: new Date('2025-02-14T10:15:00'),
    reason: 'As a mother and businesswoman, I want to support other women in balancing faith, family, and career. I believe God has given me experiences that can encourage other women.',
    skills: ['Leadership', 'Counseling', 'Business Management', 'Public Speaking', 'Event Organization'],
  },
  {
    id: 3,
    name: 'Kwame Osei',
    ministry: 'Men Fellowship',
    email: 'kwame.osei@gmail.com',
    phone: '+233 24 345 6789',
    age: 28,
    gender: 'Male',
    membershipDuration: '3 years',
    date: new Date('2025-02-13T16:45:00'),
    reason: 'I want to be part of a brotherhood that encourages men to be godly husbands, fathers, and leaders. I believe men need strong Christian fellowship.',
    skills: ['Mentoring', 'Sports', 'Construction', 'Financial Planning'],
  },
  {
    id: 4,
    name: 'Gifty Ankrah',
    ministry: 'Choir Ministry',
    email: 'gifty.ankrah@outlook.com',
    phone: '+233 24 456 7890',
    age: 24,
    gender: 'Female',
    membershipDuration: '1.5 years',
    date: new Date('2025-02-12T11:20:00'),
    reason: 'Music has always been my passion and I believe it\'s my spiritual gift. I want to use my voice and musical abilities to worship God and lead others in praise.',
    skills: ['Singing', 'Piano Playing', 'Music Composition', 'Choir Direction'],
  },
  {
    id: 5,
    name: 'Joseph Boateng',
    ministry: 'Ushering Ministry',
    email: 'joseph.boateng@gmail.com',
    phone: '+233 24 567 8901',
    age: 31,
    gender: 'Male',
    membershipDuration: '4 years',
    date: new Date('2025-02-11T09:30:00'),
    reason: 'I have a heart for hospitality and making people feel welcome in God\'s house. I want to serve as the first point of contact for visitors and members.',
    skills: ['Customer Service', 'Organization', 'Communication', 'Problem Solving'],
  },
  {
    id: 6,
    name: 'Mercy Adjei',
    ministry: 'Children Ministry',
    email: 'mercy.adjei@gmail.com',
    phone: '+233 24 678 9012',
    age: 29,
    gender: 'Female',
    membershipDuration: '3 years',
    date: new Date('2025-02-10T15:45:00'),
    reason: 'I love working with children and believe in laying strong foundation in their spiritual lives. Children are precious gifts from God and deserve quality ministry.',
    skills: ['Teaching', 'Child Psychology', 'Crafts', 'Storytelling', 'Music'],
  },
  {
    id: 7,
    name: 'Samuel Kofi',
    ministry: 'Outreach Ministry',
    email: 'samuel.kofi@gmail.com',
    phone: '+233 24 789 0123',
    age: 27,
    gender: 'Male',
    membershipDuration: '2.5 years',
    date: new Date('2025-02-09T13:00:00'),
    reason: 'I feel called to share the gospel with communities beyond our church. Outreach is my passion, and I want to serve in spreading God\'s love.',
    skills: ['Evangelism', 'Community Organizing', 'Public Speaking', 'Logistics'],
  },
  {
    id: 8,
    name: 'Esther Nyarko',
    ministry: 'Prayer Ministry',
    email: 'esther.nyarko@gmail.com',
    phone: '+233 24 890 1234',
    age: 42,
    gender: 'Female',
    membershipDuration: '6 years',
    date: new Date('2025-02-08T08:30:00'),
    reason: 'Prayer is the foundation of our faith, and I want to intercede for the church and its members. I have a heart for spiritual warfare and supporting others through prayer.',
    skills: ['Intercessory Prayer', 'Counseling', 'Event Planning', 'Team Leadership'],
  },
  {
    id: 9,
    name: 'Benedict Mawuli',
    ministry: 'Women Fellowship',
    email: 'benedict.mawuli@gmail.com',
    phone: '+233 24 901 2345',
    age: 34,
    gender: 'Male',
    membershipDuration: '4 years',
    date: new Date('2025-02-07T17:15:00'),
    reason: 'As a husband and father, I want to support my wife and family in their spiritual growth. I believe God has given me experiences that can help others.',
    skills: ['Spiritual Growth', 'Relationship Building', 'Leadership', 'Spiritual Warfare'],
  },
  {
    id: 10,
    name: 'Grace Osei',
    ministry: 'Men Fellowship',
    email: 'grace.osei@gmail.com',
    phone: '+233 24 012 3456',
    age: 31,
    gender: 'Female',
    membershipDuration: '3.5 years',
    date: new Date('2025-02-06T12:45:00'),
    reason: 'I want to be part of a brotherhood that encourages men to be godly husbands, fathers, and leaders. I believe men need strong Christian fellowship.',
    skills: ['Spiritual Growth', 'Relationship Building', 'Leadership', 'Spiritual Warfare'],
  },
  {
    id: 11,
    name: 'Abena Baffour',
    ministry: 'Youth Ministry',
    email: 'abena.baffour@gmail.com',
    phone: '+233 24 123 4567',
    age: 19,
    gender: 'Female',
    membershipDuration: '1.5 years',
    date: new Date('2025-02-05T10:00:00'),
    reason: 'As a young person, I want to be part of a community where I can learn and grow spiritually. I believe God has given me a gift to share his love with others.',
    skills: ['Spiritual Growth', 'Relationship Building', 'Leadership', 'Spiritual Warfare'],
  }
])

const registrationColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'ministry', label: 'Ministry', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'gender', label: 'Gender', sortable: true },
]

const courseRegistrations = ref([
  {
    id: 1,
    name: 'John Doe',
    course: 'Leadership Training',
    date: new Date('2025-02-15T14:30:00'),
    duration: '1 Years',
    email: 'john.doe@gmail',
    phone: '+233 24 123 4567',
    dateofbirth: '1990-01-01',
    gender: 'Male',
    description: 'A training program for leaders to develop their leadership skills and become more effective.',
  },
  {
    id: 2,
    name: 'Jane Doe',
    course: 'Leadership Training',
    date: new Date('2025-02-15T14:30:00'),
    duration: '2 Years',
    email: 'jane.doe@gmail',
    phone: '+233 24 123 4567',
    dateofbirth: '1990-01-01',
    gender: 'Female',
    description: 'A training program for leaders to develop their leadership skills and become more effective.',
  },
  {
    id: 3,
    name: 'John Doe',
    course: 'Leadership Training',
    date: new Date('2025-02-15T14:30:00'),
    duration: '1 Years',
    email: 'john.doe@gmail',
    phone: '+233 24 123 4567',
    dateofbirth: '1990-01-01',
    gender: 'Male',
    description: 'A training program for leaders to develop their leadership skills and become more effective.',
  },
  {
    id: 4,
    name: 'Jane Doe',
    course: 'Leadership Training',
    date: new Date('2025-02-15T14:30:00'),
    duration: '2 Years',
    email: 'jane.doe@gmail',
    phone: '+233 24 123 4567',
    dateofbirth: '1990-01-01',
    gender: 'Female',
    description: 'A training program for leaders to develop their leadership skills and become more effective.',
  },
  {
    id: 5,
    name: 'John Doe',
    course: 'Leadership Training',
    date: new Date('2025-02-15T14:30:00'),
    duration: '2 Years',
    email: 'john.doe@gmail',
    phone: '+233 24 123 4567',
    dateofbirth: '1990-01-01',
    gender: 'Male',
    description: 'A training program for leaders to develop their leadership skills and become more effective.',
  }
])

const courseColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'course', label: 'Course', sortable: true },
  { key: 'duration', label: 'Duration', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'dateofbirth', label: 'Date of Birth' },
  { key: 'gender', label: 'Gender', sortable: true },
]

// Computed properties
const filteredRegistrations = computed(() => {
  return registrations.value
})


const registrationStats = computed(() => {
  const stats = {}
  registrations.value.forEach(reg => {
    stats[reg.ministry] = (stats[reg.ministry] || 0) + 1
  })
  return Object.entries(stats).map(([ministry, count]) => ({ ministry, count }))
})

const getTotalApplications = () => {
  return registrations.value.length
}
const getTodayApplications = () => {
  const today = new Date()
  return registrations.value.filter(r => 
    r.date.toDateString() === today.toDateString()
  ).length
}
const getWeekApplications = () => {
  const today = new Date()
  const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  return registrations.value.filter(r => r.date >= oneWeekAgo).length
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

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
</script>