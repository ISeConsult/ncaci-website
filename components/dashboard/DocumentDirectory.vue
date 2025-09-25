<!-- components/sections/DocumentDirectory.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Document Directory</h1>
        <p class="text-gray-600 dark:text-gray-400">Access important church documents, forms, and resources</p>
      </div>
      <div class="md:flex space-y-4 md:space-y-0 gap-3">
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="Search documents..." 
                 class="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2.5 pl-10 rounded-lg focus:outline-none w-64">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        <button @click="openModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center font-medium shadow-md">
          <PlusIcon class="h-5 w-5 mr-2" />
          Upload Document
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <div v-for="stat in documentStats" :key="stat.title" 
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

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <!-- Sidebar -->
      <div class="xl:col-span-1 space-y-6">
        <!-- Categories/Folders -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FolderIcon class="h-5 w-5 mr-2 text-blue-600" />
            Categories
          </h3>
          <div class="space-y-2">
            <button v-for="folder in documentFolders" :key="folder.name" 
                    @click="selectedCategory = folder.name"
                    :class="[
                      'w-full text-left px-3 py-3 rounded-lg group',
                      selectedCategory === folder.name 
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    ]">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <component :is="folder.icon" :class="[
                    'h-5 w-5 mr-3',
                    selectedCategory === folder.name ? 'text-blue-600' : 'text-gray-500'
                  ]" />
                  <div>
                    <p :class="[
                      'text-sm font-medium',
                      selectedCategory === folder.name 
                        ? 'text-blue-900 dark:text-blue-100' 
                        : 'text-gray-900 dark:text-white'
                    ]">{{ folder.name }}</p>
                    <p class="text-xs text-gray-600 dark:text-gray-400">{{ folder.count }} files</p>
                  </div>
                </div>
                <span :class="[
                  'px-2 py-1 rounded-full text-xs font-medium',
                  selectedCategory === folder.name 
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                ]">
                  {{ folder.count }}
                </span>
              </div>
            </button>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <ClockIcon class="h-5 w-5 mr-2 text-purple-600" />
            Recent Activity
          </h3>
          <div class="space-y-3">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-3">
              <div :class="['w-2 h-2 rounded-full mt-2 flex-shrink-0', activity.color]"></div>
              <div>
                <p class="text-sm text-gray-900 dark:text-white font-medium">{{ activity.action }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Document Area -->
      <div class="xl:col-span-3">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <!-- Document Header -->
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ selectedCategory || 'All Documents' }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ filteredDocuments.length }} documents found
                </p>
              </div>
              <div class="flex items-center gap-2">
                <!-- View Toggle -->
                <div class="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <button @click="viewMode = 'list'" 
                          :class="[
                            'p-2 rounded-lg',
                            viewMode === 'list' 
                              ? 'bg-white dark:bg-gray-800 shadow-sm' 
                              : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                          ]">
                    <Bars3Icon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button @click="viewMode = 'grid'" 
                          :class="[
                            'p-2 rounded-lg',
                            viewMode === 'grid' 
                              ? 'bg-white dark:bg-gray-800 shadow-sm' 
                              : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                          ]">
                    <Squares2X2Icon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <!-- Sort Dropdown -->
                <div class="relative">
                  <select v-model="sortBy" 
                          class="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2.5 pr-8 rounded-lg text-sm appearance-none focus:outline-none">
                    <option value="name">Sort by Name</option>
                    <option value="date">Sort by Date</option>
                    <option value="size">Sort by Size</option>
                    <option value="type">Sort by Type</option>
                  </select>
                  <ChevronDownIcon class="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <!-- Document List/Grid -->
          <div class="p-6">
            <!-- List View -->
            <div v-if="viewMode === 'list'" class="space-y-3">
  <div
    v-for="doc in paginatedDocuments"
    :key="doc.id"
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 group"
  >
    <!-- Left side -->
    <div class="flex items-start sm:items-center flex-1 w-full">
      <div :class="['p-3 rounded-lg mr-4 mb-2 sm:mb-0', getDocumentTypeColor(doc.type).bgColor]">
        <component
          :is="getDocumentIcon(doc.type)"
          :class="['h-6 w-6', getDocumentTypeColor(doc.type).textColor]"
        />
      </div>

      <div class="flex-1 min-w-0">
        <!-- Document name -->
        <p class="font-medium text-gray-900 dark:text-white truncate">
          {{ doc.name }}
        </p>

        <!-- Meta info -->
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
          <span>{{ doc.size }}</span>
          <span>{{ doc.modified }}</span>
          <span>{{ doc.author }}</span>
        </div>

        <!-- Tags -->
        <div class="flex items-center gap-2 text-xs mt-2 sm:mt-0">
          <span
            :class="['px-2 py-1 rounded-full font-medium', getDocumentTypeColor(doc.type).badge]"
          >
            {{ doc.type.toUpperCase() }}
          </span>
          <span
            v-if="doc.isNew"
            class="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full font-medium"
          >
            NEW
          </span>
        </div>
      </div>
    </div>

    <!-- Right side -->
    <div class="flex items-center gap-2 mt-3 sm:mt-0 sm:ml-4">
      <button
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-blue-600 dark:text-blue-400"
      >
        <ArrowDownTrayIcon class="h-4 w-4" />
      </button>
    </div>
  </div>
</div>


            <!-- Grid View -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="doc in paginatedDocuments" :key="doc.id"
                   class="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-600 group border border-gray-200 dark:border-gray-600">
                <div class="flex flex-col h-full">
                  <div class="flex items-start justify-between mb-3">
                    <div :class="['p-3 rounded-lg', getDocumentTypeColor(doc.type).bgColor]">
                      <component :is="getDocumentIcon(doc.type)" :class="['h-8 w-8', getDocumentTypeColor(doc.type).textColor]" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900 dark:text-white text-sm mb-2 line-clamp-2">{{ doc.name }}</h4>
                    <div class="text-xs text-gray-600 dark:text-gray-400 space-y-1 mb-3">
                      <div>{{ doc.size }}</div>
                      <div>{{ doc.modified }}</div>
                      <div>{{ doc.author }}</div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between">
                    <span :class="['px-2 py-1 rounded-full text-xs font-medium', getDocumentTypeColor(doc.type).badge]">
                      {{ doc.type.toUpperCase() }}
                    </span>
                    <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700">
                      <ArrowDownTrayIcon class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-center mt-8">
              <Pagination :current-page="currentPage" :total-pages="totalPages" :total-items="filteredDocuments.length" :items-per-page="itemsPerPage" @update:currentPage="onPageChange"/>
            </div>

            <!-- Empty State -->
            <div v-if="filteredDocuments.length === 0" class="text-center py-12">
              <DocumentIcon class="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents found</h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Upload First Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model:is-open="isModalOpen" size="3xl" @close="closeModal" title="Upload New Document">
      <form @submit.prevent="submitForm">
        <div class="space-y-4 grid grid-cols-1 gap-4">
          <TextField label="Document Name" v-model="formData.name" />
          <FileInput v-model="formData.file" accept=".pdf, .doc, .docx, .xls, .xlsx" label="File" />
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button type="button" @click="closeModal" variant="secondary">Cancel</Button>
          <Button type="submit" variant="primary">Upload</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Modal from '../UI/Modal.vue'
import TextField from '../UI/TextField.vue'
import FileInput from '../UI/FileInput.vue'
import Button from '../UI/Button.vue'
import { 
  FolderIcon, 
  PlusIcon, 
  Bars3Icon, 
  Squares2X2Icon, 
  ArrowDownTrayIcon,
  DocumentTextIcon,
  DocumentIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  ShareIcon,
  ClockIcon,
  ChevronDownIcon,
  CommandLineIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
  BookOpenIcon,
  CalendarIcon,
  ScaleIcon,
  AcademicCapIcon,
  ArchiveBoxIcon
} from '@heroicons/vue/24/outline'

import Pagination from '../UI/Pagination.vue'

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref('')
const viewMode = ref('list')
const sortBy = ref('name')

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = computed(() => Math.ceil(filteredDocuments.value.length / itemsPerPage))


const formData = ref({
  name: '',
  file: null
})

// Document statistics
const documentStats = [
  {
    title: 'Total Documents',
    value: '284',
    icon: DocumentIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Categories',
    value: '8',
    icon: FolderIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'This Month',
    value: '23',
    icon: CalendarIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'Storage Used',
    value: '2.4GB',
    icon: ArchiveBoxIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
]

// Document folders with enhanced data
const documentFolders = [
  { name: 'Bylaws & Constitution', count: 1, icon: ScaleIcon, category: 'legal' },
  { name: 'Financial Reports', count: 3, icon: PresentationChartLineIcon, category: 'financial' },
  { name: 'Ministry Guidelines', count: 2, icon: BookOpenIcon, category: 'ministry' },
  { name: 'Event Documents', count: 6, icon: CalendarIcon, category: 'events' },
  { name: 'Training Materials', count: 4, icon: AcademicCapIcon, category: 'training' },
  { name: 'Forms & Applications', count: 3, icon: DocumentTextIcon, category: 'forms' },
  { name: 'Meeting Minutes', count: 8, icon: TableCellsIcon, category: 'meetings' },
  { name: 'Archived Documents', count: 1, icon: ArchiveBoxIcon, category: 'archive' }
]


// Recent activity
const recentActivity = [
  {
    id: 1,
    action: 'Annual Budget 2025.pdf uploaded',
    time: '2 hours ago',
    color: 'bg-green-500'
  },
  {
    id: 2,
    action: 'Board meeting minutes updated',
    time: '5 hours ago',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    action: 'Youth ministry form shared',
    time: '1 day ago',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    action: '12 documents archived',
    time: '2 days ago',
    color: 'bg-orange-500'
  }
]

// Enhanced documents data
const documents = [
  { 
    id: 1, 
    name: 'Annual Financial Report 2024.pdf', 
    type: 'pdf', 
    size: '2.4 MB', 
    modified: '2 days ago',
    author: 'Elder David Brown',
    category: 'Financial Reports',
    isNew: true
  },
  { 
    id: 2, 
    name: 'Church Constitution & Bylaws.docx', 
    type: 'word', 
    size: '1.8 MB', 
    modified: '1 week ago',
    author: 'Legal Committee',
    category: 'Bylaws & Constitution',
    isNew: false
  },
  { 
    id: 3, 
    name: 'Event Planning Master Checklist.xlsx', 
    type: 'excel', 
    size: '456 KB', 
    modified: '3 days ago',
    author: 'Event Committee',
    category: 'Event Documents',
    isNew: false
  },
  { 
    id: 4, 
    name: 'Leadership Training Presentation.pptx', 
    type: 'powerpoint', 
    size: '5.2 MB', 
    modified: '5 days ago',
    author: 'Pastor John Smith',
    category: 'Training Materials',
    isNew: false
  },
  { 
    id: 5, 
    name: 'Community Outreach Photos 2024.zip', 
    type: 'archive', 
    size: '15.8 MB', 
    modified: '1 day ago',
    author: 'Media Team',
    category: 'Event Documents',
    isNew: true
  },
  { 
    id: 6, 
    name: 'New Member Application Form.pdf', 
    type: 'pdf', 
    size: '234 KB', 
    modified: '4 days ago',
    author: 'Membership Committee',
    category: 'Forms & Applications',
    isNew: false
  },
  { 
    id: 7, 
    name: 'Board Meeting Minutes - February.docx', 
    type: 'word', 
    size: '1.2 MB', 
    modified: '6 days ago',
    author: 'Board Secretary',
    category: 'Meeting Minutes',
    isNew: false
  },
  { 
    id: 8, 
    name: 'Youth Ministry Budget Proposal.xlsx', 
    type: 'excel', 
    size: '678 KB', 
    modified: '1 week ago',
    author: 'Youth Pastor Lisa White',
    category: 'Financial Reports',
    isNew: false
  },
  { 
    id: 9, 
    name: 'Volunteer Training Manual.pdf', 
    type: 'pdf', 
    size: '3.1 MB', 
    modified: '2 weeks ago',
    author: 'Training Department',
    category: 'Training Materials',
    isNew: false
  },
  { 
    id: 10, 
    name: 'Mission Trip Registration Form.docx', 
    type: 'word', 
    size: '445 KB', 
    modified: '3 days ago',
    author: 'Mission Committee',
    category: 'Forms & Applications',
    isNew: true
  }
]

// Computed property for filtered documents
const filteredDocuments = computed(() => {
  let filtered = documents

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(doc => doc.category === selectedCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(doc => 
      doc.name.toLowerCase().includes(query) ||
      doc.author.toLowerCase().includes(query) ||
      doc.category.toLowerCase().includes(query)
    )
  }

  // Sort documents
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'size':
        return parseFloat(a.size) - parseFloat(b.size)
      case 'type':
        return a.type.localeCompare(b.type)
      default:
        return new Date(b.modified) - new Date(a.modified)
    }
  })

  return filtered
})

// Watch for changes in filteredDocuments to reset currentPage if out of bounds
watch(filteredDocuments, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1
  }
})

// Computed property for paginated documents
const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredDocuments.value.slice(start, end)
})

// Page change handler
const onPageChange = (page) => {
  currentPage.value = page
}

// Helper function for document icons
const getDocumentIcon = (type) => {
  const icons = {
    pdf: DocumentTextIcon,
    word: DocumentTextIcon,
    excel: TableCellsIcon,
    powerpoint: PresentationChartLineIcon,
    archive: ArchiveBoxIcon,
    image: PhotoIcon
  }
  return icons[type] || DocumentTextIcon
}

// Helper function for document type colors
const getDocumentTypeColor = (type) => {
  const colors = {
    pdf: {
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      textColor: 'text-red-600 dark:text-red-400',
      badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
    },
    word: {
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
    },
    excel: {
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400',
      badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
    },
    powerpoint: {
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      textColor: 'text-orange-600 dark:text-orange-400',
      badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
    },
    archive: {
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      textColor: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
    },
    image: {
      bgColor: 'bg-pink-100 dark:bg-pink-900/30',
      textColor: 'text-pink-600 dark:text-pink-400',
      badge: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400'
    }
  }
  return colors[type] || colors.pdf
}
</script>

<style scoped>
/* Custom utility classes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Remove default transitions */
* {
  transition: none !important;
}
</style>