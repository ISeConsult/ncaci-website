<!-- components/sections/ContactDirectory.vue -->
<template>
  <div>
    <div class="md:flex space-y-4 md:space-y-0 justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Contact Responses</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Manage inquiries and messages from church website visitors</p>
      </div>
      <div class="flex space-x-3">
        <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
          <PlusIcon class="h-5 w-5 mr-2" />
          Export Data
        </button>
      </div>
    </div>

    <!-- Contact Messages Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="contact in paginatedContacts"
        :key="contact.id"
        :class="[
          'bg-white dark:bg-gray-800 rounded-xl shadow-sm border p-6 hover:shadow-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group',
          contact.status === 'unread' 
            ? 'border-blue-300 dark:border-blue-600 bg-blue-50/30 dark:bg-blue-900/10' 
            : 'border-gray-200 dark:border-gray-700',
          contact.priority === 'high' && 'ring-2 ring-red-200 dark:ring-red-800'
        ]"
        @click="selectedContact = contact"
      >
        <!-- Header -->
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center">
            <div class="relative">
              <div class="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {{ getInitials(contact.name) }}
              </div>
              <div 
                v-if="contact.status === 'unread'"
                class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"
              ></div>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {{ contact.name }}
              </h3>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(contact.submittedAt) }}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">{{ formatTime(contact.submittedAt) }}</p>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="space-y-2 mb-4">
          <div class="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <EnvelopeIcon class="h-4 w-4 mr-2 text-blue-500" />
            <span class="truncate">{{ contact.email }}</span>
          </div>
        </div>

        <!-- Message Preview -->
        <div class="mb-4">
          <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{{ contact.subject }}</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
            {{ contact.message }}
          </p>
        </div>
      </div>

      
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <Pagination  :current-page="currentPage" :total-pages="totalPages" :total-items="contacts.length" :items-per-page="itemsPerPage" @update:currentPage="onPageChange"/>
    </div>

    <!-- Empty State -->
    <div v-if="contacts.length === 0" class="text-center py-12">
      <EnvelopeIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No messages found</h3>
      <p class="text-gray-600 dark:text-gray-400">
        No contact messages have been received yet.
      </p>
    </div>

    <!-- Contact Detail Modal -->
    <div v-if="selectedContact" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-2xl font-bold">{{ selectedContact.name }}</h2>
              <p class="text-blue-100">{{ selectedContact.email }}</p>
              <div class="flex items-center space-x-4 mt-2 text-blue-100">
                <span>{{ formatDate(selectedContact.submittedAt) }}</span>
              </div>
            </div>
            <button 
              @click="selectedContact = null"
              class="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <!-- Contact Details -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p class="text-gray-900 dark:text-white">{{ selectedContact.email }}</p>
              </div>
            </div>
          </div>

          <!-- Message Content -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Message</h3>
            <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-3">{{ selectedContact.subject }}</h4>
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{{ selectedContact.message }}</p>
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
  EnvelopeIcon, 
  PlusIcon, 
  XMarkIcon
} from '@heroicons/vue/24/outline'

import Pagination from '../UI/Pagination.vue'

const selectedContact = ref(null)

const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil(contacts.length / itemsPerPage))

const onPageChange = (page) => {
  currentPage.value = page
}

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return contacts.slice(start, end)
})

// Data
const contacts = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    message: 'Dear Pastor,\n\nI hope this message finds you well. I am writing to request prayers for my family during this difficult time. My husband has been battling a serious illness, and we are also facing financial challenges. I believe in the power of prayer and would appreciate if the church could remember us in your prayers.\n\nI visited your church last Sunday and felt so welcomed. The message about God\'s faithfulness really spoke to my heart. I would love to become more involved in the church community.\n\nThank you for your time and prayers.\n\nBlessings,\nSarah',
    submittedAt: new Date('2025-01-15T10:30:00'),
  },
  {
    id: 2,
    name: 'Michael Thompson',
    email: 'mthompson@yahoo.com',
    message: 'Hello,\n\nI recently joined the church and am very passionate about working with young people. I have experience in youth mentoring and would like to know how I can get involved with the youth ministry.\n\nI have a background in education and have been working with teenagers for the past 5 years. I believe God is calling me to serve in this area.\n\nPlease let me know what opportunities are available and what the requirements are for leadership positions.\n\nThank you!',
    submittedAt: new Date('2025-01-12T14:20:00'),
  },
  {
    id: 3,
    name: 'Grace Asante',
    email: 'grace.asante@hotmail.com',
    message: 'Good day,\n\nI would like to register for the upcoming Annual Convention. Could you please send me the registration forms and payment details?\n\nAlso, I need information about accommodation options for out-of-town attendees.\n\nThank you.',
    submittedAt: new Date('2025-01-10T16:45:00'),
  },
  {
    id: 4,
    name: 'David Mensah',
    email: 'david.mensah@gmail.com',
    message: 'Dear Church Leadership,\n\nMy wife and I are going through a difficult time in our marriage and would like to request counseling sessions. We have heard about the church\'s marriage ministry and would appreciate guidance.\n\nWe are not currently members but attended the Marriage Enrichment Seminar last year and found it very helpful.\n\nPlease let us know about availability and scheduling.\n\nThank you and God bless.',
    submittedAt: new Date('2025-01-14T11:20:00'),
  },
  {
    id: 5,
    name: 'Jennifer Osei',
    email: 'jennifer.osei@company.com',
    subject: 'Community Outreach Program Volunteering',
    message: 'Hello,\n\nI am interested in volunteering for the upcoming community outreach programs. I work in healthcare and would love to contribute to the medical mission activities.\n\nI am available on weekends and can help with health screenings, basic medical care, or health education.\n\nPlease let me know how I can get involved.\n\nThank you!',
    submittedAt: new Date('2025-01-11T08:30:00'),
  },
  {
    id: 6,
    name: 'Robert Addai',
    email: 'robert.addai@email.com',
    subject: 'Service Times and Location Update',
    message: 'Hi,\n\nI used to attend the church a few years ago and would like to visit again. Have the service times changed? Also, are you still meeting at the same location?\n\nI have moved back to Accra and looking forward to reconnecting with the church family.\n\nThanks!',
    submittedAt: new Date('2025-01-09T19:15:00'),
  }
]


const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }).format(date)
}

const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }).format(date)
}

</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>