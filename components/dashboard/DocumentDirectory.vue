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
        <Button @click="openModal(null)">
          <PlusIcon class="h-5 w-5 mr-2" />
          Upload Document
        </Button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
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
    <div class="gap-8">
      <div class="">
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
              </div>
            </div>
          </div>

          <!-- Document List/Grid -->
          <div v-if="filteredDocuments && filteredDocuments.length > 0" class="p-6">
            <!-- List View -->
            <div v-if="viewMode === 'list'" class="grid md:grid-cols-2 gap-8">
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
                    <p class="font-medium text-gray-900 dark:text-white truncate mb-2">
                      {{ doc.name }}
                    </p>

                    <!-- Tags -->
                    <div class="flex items-center gap-2 text-xs mt-2 sm:mt-0">
                      <span
                        :class="['px-2 py-1 rounded-full font-medium', getDocumentTypeColor(doc.type).badge]"
                      >
                        {{ doc.file_type?.toUpperCase() || 'UNKNOWN' }}
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
                  <button class="text-red-600 dark:text-red-400 hover:text-red-700" @click="openDeleteModal(doc)">
                    <TrashIcon class="h-4 w-4" />
                  </button>
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
                  </div>
                  <div class="flex items-center justify-between">
                    <span :class="['px-2 py-1 rounded-full text-xs font-medium', getDocumentTypeColor(doc.type).badge]">
                      {{ doc.file_type?.toUpperCase() || 'UNKNOWN' }}
                    </span>
                    <!-- Delete Button -->
                    <div class="flex items-center gap-2">
                      <button class="text-red-600 dark:text-red-400 hover:text-red-700" @click="openDeleteModal(doc)">
                        <TrashIcon class="h-4 w-4" />
                      </button>
                      <button class="text-blue-600 dark:text-blue-400 hover:text-blue-700">
                        <ArrowDownTrayIcon class="h-4 w-4" />
                      </button>
                    </div>
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

          <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 col-span-5">
              <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-500 text-lg font-medium">No Documents found</p>
              <p class="text-gray-400 text-sm mt-1">
                  There are no documents to display at the moment.
              </p>
          </div>
        </div>
      </div>
    </div>

    <Modal v-model:is-open="isModalOpen" size="3xl" @close="closeModal" title="Upload New Document">
      <form @submit.prevent="submitForm">
        <div class="space-y-4 grid grid-cols-1 gap-4">
          <TextField label="Document Name" v-model="formData.name" />
          <TextField label="File Type" v-model="formData.file_type" />
          <FileInput v-model="formData.file" accept=".pdf, .doc, .docx, .xls, .xlsx" label="File" />
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button type="button" @click="closeModal" variant="secondary">Cancel</Button>
          <Button type="submit" variant="primary" :loading="loading" @click="submitForm">Upload</Button>
        </div>
      </template>
    </Modal>

    <Modal v-model:is-open="isDeleteModalOpen" size="md" @close="cancelDelete" title="Confirm Deletion">
      <div class="py-4">
        <p class="text-gray-700 dark:text-gray-300">
          Are you sure you want to delete the document "<strong>{{ documentToDelete?.name }}</strong>"? This action cannot be undone.
        </p>
      </div>
      <template #footer>
        <div class="flex justify-end space-x-2">
          <Button type="button" @click="cancelDelete" variant="secondary">Cancel</Button>
          <Button type="button" variant="danger" :loading="loading" @click="confirmDelete">Delete</Button>
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
  PresentationChartLineIcon,
  TableCellsIcon,
  ArchiveBoxIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import Pagination from '../UI/Pagination.vue'
import { useDocumentStore } from '../../stores/useDocumentStore'
import { storeToRefs } from 'pinia'
import { useToast } from '~/composables/useToast'

const DocumentStore = useDocumentStore();
const { documents, loading } = storeToRefs(DocumentStore);

const { addToast } = useToast()

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref('')
const viewMode = ref('list')

const isModalOpen = ref(false)
const isEditing = ref(false)
const editingDocument = ref(null)
const documentToDelete = ref(null)
const isDeleteModalOpen = ref(false)

const openModal = (document = null) => {
  isEditing.value = !!document
  editingDocument.value = document

  formData.value = isEditing.value
    ? { ...document }
    : {
        name: '',
        type: '',
        file: null
      }

  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  editingDocument.value = null

  formData.value = {
    name: '',
    type: '',
    file: null
  }
}

const currentPage = ref(1)
const itemsPerPage = 8
const totalPages = computed(() => Math.ceil(filteredDocuments.value.length / itemsPerPage))


const formData = ref({
  name: '',
  type: '',
  file: null
})

const submitForm = async () => {
  try {
    let response;
    if (isEditing.value) {
      response = await DocumentStore.updateDocument(editingDocument.value.uid, formData.value)
    } else {
      response = await DocumentStore.addDocument(formData.value)
    }
    addToast(response.data.message || 'Document added successfully', 'success')
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    addToast(error.response.data.message || 'Error adding document', 'error')
  }
}

const openDeleteModal = (document) => {
  documentToDelete.value = document
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  try {
    await DocumentStore.deleteDocument(documentToDelete.value.uid)
    isDeleteModalOpen.value = false
    documentToDelete.value = null
    addToast('Document deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting document:', error)
    addToast(error.response.data.message, 'error')
  }
}

const cancelDelete = () => {
  isDeleteModalOpen.value = false
  documentToDelete.value = null
}

// Document statistics
const documentStats = [
  {
    title: 'Total Documents',
    value: documents.value.length,
    icon: DocumentIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Total File Types',
    value: documents.value.reduce((types, doc) => {
      if (!types.includes(doc.file_type)) {
        types.push(doc.file_type)
      }
      return types
    }, []).length.toString(),
    icon: FolderIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  }
]


// Computed property for filtered documents
const filteredDocuments = computed(() => {
  let filtered = documents.value

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

onMounted(() => {
  DocumentStore.fetchDocuments();
  console.log('Documents loaded:', documents);
})
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