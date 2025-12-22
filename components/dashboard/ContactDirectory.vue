<!-- components/sections/ContactDirectory.vue -->
<template>
  <div>
    <div class="md:flex space-y-4 md:space-y-0 justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Contact Responses</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Manage inquiries and messages from church website visitors</p>
      </div>
    </div>

    <!-- Contact Messages Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(contact.submitted_at) }}</p>
            <p class="text-xs text-gray-400 dark:text-gray-500">{{ formatTime(contact.submitted_at) }}</p>
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
      <Pagination  :current-page="currentPage" :total-pages="totalPages" :total-items="(paginatedContacts.value || []).length" :items-per-page="itemsPerPage" @update:currentPage="onPageChange"/>
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
                <span>{{ formatDate(selectedContact.submitted_at) }}</span>
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
  XMarkIcon
} from '@heroicons/vue/24/outline'
import Pagination from '../UI/Pagination.vue'
import { useContactStore } from '@/stores/useContactStore'
import { storeToRefs } from 'pinia'

const ContactStore = useContactStore()
const { contacts, loading } = storeToRefs(ContactStore)

const selectedContact = ref(null)

const currentPage = ref(1)
const itemsPerPage = 6

const totalPages = computed(() => Math.ceil((contacts.value || []).length / itemsPerPage))

const onPageChange = (page) => {
  currentPage.value = page
}

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return contacts.value.slice(start, end) 
})


const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(d);
}

const formatTime = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Time';
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
}


onMounted(() => {
  ContactStore.fetchContacts()
  console.log('Contacts loaded:', contacts)
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>