<!-- components/sections/NewsArticles.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">News & Articles</h1>
        <p class="text-gray-600 dark:text-gray-400">Stay updated with our latest ministry news and community stories</p>
      </div>
      <div class="flex gap-3">
        <Button @click="openModal(null)">
          <PlusIcon class="h-5 w-5 mr-2" />
          New Article
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
      <div v-for="stat in newsStats" :key="stat.title" 
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
    <div class="grid grid-cols-1 gap-8">
      <!-- Articles Section -->
      <div class="">
        <!-- Article Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="article in paginatedArticles" :key="article.id"
               class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group">
            
            <!-- Article Image -->
            <div class="relative overflow-hidden">
              <img :src="article.article_image" :alt="article.title" class="w-full h-48 object-cover group-hover:scale-105">
            </div>
            
            <!-- Article Content -->
            <div class="p-6">
              <!-- Meta Information -->
              <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                <div class="flex items-center">
                  <UserIcon class="h-3 w-3 mr-1" />
                  {{ article.author }}
                </div>
                <div class="flex items-center gap-3">
                  <div class="flex items-center">
                    <ClockIcon class="h-3 w-3 mr-1" />
                    {{ article.readTime }}
                  </div>
                  <span>{{ article.date }}</span>
                </div>
              </div>
              
              <!-- Title and Excerpt -->
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">{{ article.title }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">{{ article.quote }}</p>
              
              <!-- Footer -->
              <div class="flex items-center justify-between">
                <span>
                  {{ article.category }}
                </span>
                <div class="flex items-center gap-2">
                  <div>
                    <button @click="openModal(article)" class="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium mr-2">
                      <PencilIcon class="h-4 w-4 inline-block mr-1" />
                    </button>
                    <button @click="openDeleteModal(article)" class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium">
                      <TrashIcon class="h-4 w-4 inline-block mr-1" />
                    </button>
                  </div>
                  <button @click="openReadModal(article)" class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center mt-8">
        <Pagination :current-page="currentPage" :total-pages="totalPages" :total-items="(news.value || []).length" :items-per-page="itemsPerPage" @update:currentPage="handlePageChange" />
        </div>
      </div>
    </div>

    <!-- Modal for creating new article -->
    <Modal :is-open="isModalOpen" size="3xl" :title="isEditing ? 'Edit Article' : 'Create New Article'" @close="closeModal">
      <form @submit.prevent="submitArticle" class="space-y-4" enctype="multipart/form-data">
        <TextField v-model="formData.title" label="Title" placeholder="Enter article title" required />
        <ClientOnly>
          <QuillEditor v-model:content="formData.content" content-type="html" label="Content" placeholder="Enter article content" />
        </ClientOnly>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select v-model="formData.category" :options="categoryOptions" label="Category" placeholder="Select category" required />
          <TextField v-model="formData.author" label="Author" placeholder="Enter author name" required />
        </div>      
        <FileInput
          v-model="formData.article_image"
          label="Article Images"
          accept="image/*"
        />
        <Textarea v-model="formData.quote" label="Quote" placeholder="Enter a quote for the article" rows="3" />
      </form>
      <template #footer>
        <Button variant="outline" @click="closeModal">Cancel</Button>
        <Button type="submit" :loading="loading" @click="submitArticle">{{ isEditing ? 'Update' : 'Create' }}</Button>
      </template>
    </Modal>

    <!-- Modal for reading article -->
    <Modal :is-open="isReadModalOpen" size="3xl" title="Article Details" @close="closeReadModal">
      <div v-if="selectedArticle" class="space-y-6">
        <!-- Article Image -->
        <div class="relative overflow-hidden rounded-lg">
          <img :src="selectedArticle.article_image" :alt="selectedArticle.title" class="w-full h-64 object-cover">
        </div>

        <!-- Article Meta -->
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center">
            <UserIcon class="h-4 w-4 mr-1" />
            {{ selectedArticle.author }}
          </div>
          <div class="flex items-center gap-4">
            <span>{{ selectedArticle.date }}</span>
          </div>
        </div>

        <!-- Title and Category -->
        <div class="flex items-start justify-between">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedArticle.title }}</h2>
          <span :class="['px-3 py-1 rounded-full text-xs font-medium']">
            {{ selectedArticle.category }}
          </span>
        </div>

        <!-- Excerpt -->
        <p class="text-gray-600 dark:text-gray-400 text-base leading-relaxed">{{ selectedArticle.quote }}</p>
        <!-- Full Content -->
        <div class="prose dark:prose-dark max-w-none">
          <div v-html="selectedArticle.content"></div>
        </div>
      </div>
      <template #footer>
        <Button variant="outline" @click="closeReadModal">Close</Button>
      </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal :is-open="isDeleteModalOpen" size="md" title="Confirm Delete" @close="cancelDelete">
      <p class="text-gray-700 dark:text-gray-300">Are you sure you want to delete this article? This action cannot be undone.</p>
      <template #footer>
        <Button variant="outline" @click="cancelDelete">Cancel</Button>
        <Button type="button" variant="danger" :loading="loading" @click="confirmDelete">Delete</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  UserIcon,
  PlusIcon,
  ClockIcon,
  NewspaperIcon,
  UsersIcon,
  CalendarIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline'
import Pagination from '../UI/Pagination.vue'
import Modal from '../UI/Modal.vue'
import TextField from '../UI/TextField.vue'
import Select from '../UI/Select.vue'
import Button from '../UI/Button.vue'
import Textarea from '../UI/Textarea.vue'
import FileInput from '../UI/FileInput.vue'
import { useNewsStore } from '../../stores/useNewsStore'
import { storeToRefs } from 'pinia'
import { useToast } from '~/composables/useToast'

const NewsStore = useNewsStore()
const { news, loading } = storeToRefs(NewsStore)

const QuillEditor = ref(null)
const quillCssLoaded = ref(false)

if (process.client) {
  import('@vueup/vue-quill').then((module) => {
    QuillEditor.value = module.QuillEditor
  })
  import('@vueup/vue-quill/dist/vue-quill.snow.css').then(() => {
    quillCssLoaded.value = true
  })
}

const currentPage = ref(1)
const itemsPerPage = 6
const totalPages = computed(() => Math.ceil((news.value || []).length / itemsPerPage))

const handlePageChange = (page) => {
  currentPage.value = page
}

const { addToast } = useToast()

const categoryOptions = ref([
  { label: 'Youth Activities', value: 'youth_activities' },
  { label: 'Fellowship Events', value: 'fellowship_events' },
  { label: 'Education Programs', value: 'education_programs' },
  { label: 'Ministry Updates', value: 'ministry_updates' },
  { label: 'Mission Reports', value: 'mission_reports' }
])

// Modal and form state
const isModalOpen = ref(false)

const formData = ref({
  title: '',
  content: '',
  category: null,
  author: '',
  article_image: null,
  quote: '',
})

const isEditing = ref(false)
const editingArticle = ref(null)
const isDeleteModalOpen = ref(false)
const newsToDelete = ref(null)

// Read modal state
const isReadModalOpen = ref(false)
const selectedArticle = ref(null)

const openModal = (news = null) => {
  isEditing.value = !!news
  editingArticle.value = news

  formData.value = isEditing.value ? { ...news } : {
    title: '',
    content: '',
    category: null,
    author: '',
    article_image: null,
    quote: '',
  }

  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  editingArticle.value = null

  formData.value = {
    title: '',
    content: '',
    category: null,
    author: '',
    article_image: null,
    quote: '',
  }
}

const openReadModal = (article) => {
  selectedArticle.value = article
  isReadModalOpen.value = true
}

const closeReadModal = () => {
  isReadModalOpen.value = false
  selectedArticle.value = null
}

const submitArticle = async () => {
  try {
    let response;
    if (isEditing.value) {
      response = await NewsStore.updateNews(editingArticle.value.uid, formData.value)
    } else {
      response = await NewsStore.addNews(formData.value)
    }
    addToast(response.data.message || 'Article added successfully', 'success')
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    addToast(error.response.data.message || 'Error adding article', 'error')
  }
}

const openDeleteModal = (event) => {
  newsToDelete.value = event
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  try {
    await NewsStore.deleteNews(newsToDelete.value.uid)
    isDeleteModalOpen.value = false
    newsToDelete.value = null
    addToast('Article deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting article:', error)
    addToast(error.response.data.message, 'error')
  }
}

const cancelDelete = () => {
  isDeleteModalOpen.value = false
  newsToDelete.value = null
}

const paginatedArticles = computed(() =>
  (news.value || []).slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage + itemsPerPage)
)

// Statistics data
const newsStats = computed(() => [
  {
    title: 'Total Articles',
    value: (news.value || []).length.toString(),
    icon: NewspaperIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'This Month',
    value: (news.value || []).filter(article => {
      const articleDate = new Date(article.date)
      const now = new Date()
      return articleDate.getMonth() === now.getMonth() && articleDate.getFullYear() === now.getFullYear()
    }).length.toString(),
    icon: CalendarIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'Active Authors',
    value: [...new Set((news.value || []).map(article => article.author))].length.toString(),
    icon: UsersIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  }
])

onMounted(() => {
  NewsStore.fetchNews()
  console.log('News loaded:', news.value)
})
</script>

<style scoped>
/* Custom utility classes for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Remove default transitions to avoid animations */
* {
  transition: none !important;
}

/* Hover effects without transitions */
.group:hover img {
  transform: scale(1.05);
}
</style>