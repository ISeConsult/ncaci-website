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
        <button @click="openModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-medium shadow-md">
          <PlusIcon class="h-5 w-5 mr-2" />
          New Article
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
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
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <!-- Articles Section -->
      <div class="xl:col-span-3">
        <!-- Article Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="article in paginatedArticles" :key="article.id"
               class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden group">
            
            <!-- Article Image -->
            <div class="relative overflow-hidden">
              <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover group-hover:scale-105">
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
              <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">{{ article.excerpt }}</p>
              
              <!-- Footer -->
              <div class="flex items-center justify-between">
                <span :class="['px-3 py-1 rounded-full text-xs font-medium', getCategoryColor(article.category)]">
                  {{ article.category }}
                </span>
                <div class="flex items-center gap-2">
                  <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <EyeIcon class="h-3 w-3 mr-1" />
                    {{ article.views }}
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
        <Pagination :current-page="currentPage" :total-pages="totalPages" :total-items="regularArticles.length" :items-per-page="itemsPerPage" @update:currentPage="handlePageChange" />
        </div>
      </div>

      <!-- Sidebar -->
      <div class="xl:col-span-1 space-y-6">
        <!-- Categories -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <TagIcon class="h-5 w-5 mr-2 text-blue-600" />
            Categories
          </h3>
          <div class="space-y-3">
            <div v-for="cat in newsCategories" :key="cat.name" 
                 class="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ cat.name }}</span>
              <span class="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                {{ cat.count }}
              </span>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <ClockIcon class="h-5 w-5 mr-2 text-green-600" />
            Recent Activity
          </h3>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-3">
              <div :class="['w-2 h-2 rounded-full mt-2 flex-shrink-0', activity.color]"></div>
              <div>
                <p class="text-sm text-gray-900 dark:text-white font-medium">{{ activity.title }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal for creating new article -->
    <Modal :is-open="isModalOpen" size="3xl" title="Create New Article" @close="closeModal">
      <form @submit.prevent="submitForm" class="space-y-4">
        <TextField v-model="newArticleTitle" label="Title" placeholder="Enter article title" required />
        <ClientOnly>
          <component :is="QuillEditor" v-if="QuillEditor" v-model:content="newArticleContent" content-type="html" label="Content" placeholder="Enter article content" />
          <Textarea v-else v-model="newArticleContent" label="Content" placeholder="Enter article content" rows="6" required />
        </ClientOnly>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select v-model="newArticleCategory" :options="categoryOptions" label="Category" placeholder="Select category" required />
          <TextField v-model="newArticleAuthor" label="Author" placeholder="Enter author name" required />
        </div>      
        <FileInput
          v-model="newArticleImage"
          label="Article Images"
          :multiple="true"
          :max-files="5"
          accept=".png, .jpg"
          accept-text="Image files only, up to 10MB each"
        />
        <Textarea v-model="newArticleQuote" label="Quote" placeholder="Enter a quote for the article" rows="3" />
      </form>
      <template #footer>
        <Button variant="outline" @click="closeModal">Cancel</Button>
        <Button type="submit" @click="submitForm">Create Article</Button>
      </template>
    </Modal>

    <!-- Modal for reading article -->
    <Modal :is-open="isReadModalOpen" size="3xl" title="Article Details" @close="closeReadModal">
      <div v-if="selectedArticle" class="space-y-6">
        <!-- Article Image -->
        <div class="relative overflow-hidden rounded-lg">
          <img :src="selectedArticle.image" :alt="selectedArticle.title" class="w-full h-64 object-cover">
        </div>

        <!-- Article Meta -->
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center">
            <UserIcon class="h-4 w-4 mr-1" />
            {{ selectedArticle.author }}
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center">
              <ClockIcon class="h-4 w-4 mr-1" />
              {{ selectedArticle.readTime }}
            </div>
            <span>{{ selectedArticle.date }}</span>
          </div>
        </div>

        <!-- Title and Category -->
        <div class="flex items-start justify-between">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedArticle.title }}</h2>
          <span :class="['px-3 py-1 rounded-full text-xs font-medium', getCategoryColor(selectedArticle.category)]">
            {{ selectedArticle.category }}
          </span>
        </div>

        <!-- Excerpt -->
        <p class="text-gray-600 dark:text-gray-400 text-base leading-relaxed">{{ selectedArticle.excerpt }}</p>

        <!-- Views -->
        <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <EyeIcon class="h-4 w-4 mr-1" />
          {{ selectedArticle.views }} views
        </div>
      </div>
      <template #footer>
        <Button variant="outline" @click="closeReadModal">Close</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  UserIcon,
  PlusIcon,
  ClockIcon,
  EyeIcon,
  TagIcon,
  NewspaperIcon,
  UsersIcon,
  CalendarIcon,
} from '@heroicons/vue/24/outline'
import Pagination from '../UI/Pagination.vue'
import Modal from '../UI/Modal.vue'
import TextField from '../UI/TextField.vue'
import Select from '../UI/Select.vue'
import Button from '../UI/Button.vue'
import Textarea from '../UI/Textarea.vue'
import FileInput from '../UI/FileInput.vue'

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
const totalPages = computed(() => Math.ceil(regularArticles.length / itemsPerPage))

const handlePageChange = (page) => {
  currentPage.value = page
}

// Modal and form state
const isModalOpen = ref(false)
const newArticleTitle = ref('')
const newArticleContent = ref('')
const newArticleCategory = ref('')
const newArticleAuthor = ref('')
const newArticleImage = ref('')
const newArticleQuote = ref('')

// Read modal state
const isReadModalOpen = ref(false)
const selectedArticle = ref(null)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  newArticleTitle.value = ''
  newArticleContent.value = ''
  newArticleCategory.value = ''
  newArticleAuthor.value = ''
  newArticleImage.value = ''
  newArticleQuote.value = ''
}

const openReadModal = (article) => {
  selectedArticle.value = article
  isReadModalOpen.value = true
}

const closeReadModal = () => {
  isReadModalOpen.value = false
  selectedArticle.value = null
}

const submitForm = () => {
  if (newArticleTitle.value && newArticleContent.value && newArticleCategory.value && newArticleAuthor.value) {
    const newArticle = {
      id: regularArticles.length + 1,
      title: newArticleTitle.value,
      excerpt: newArticleContent.value.substring(0, 150) + '...',
      author: newArticleAuthor.value,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      readTime: '3 min read',
      category: newArticleCategory.value,
      image: newArticleImage.value || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop',
      quote: newArticleQuote.value,
      views: '0'
    }
    regularArticles.push(newArticle)
    closeModal()
  }
}

const paginatedArticles = computed(() =>
  regularArticles.slice((currentPage.value - 1) * itemsPerPage, currentPage.value * itemsPerPage)
)

const categoryOptions = computed(() =>
  newsCategories.map(cat => ({ value: cat.name, label: cat.name }))
)

// Statistics data
const newsStats = [
  {
    title: 'Total Articles',
    value: '127',
    icon: NewspaperIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'This Month',
    value: '12',
    icon: CalendarIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'Total Views',
    value: '45.2K',
    icon: EyeIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'Subscribers',
    value: '2.1K',
    icon: UsersIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30'
  }
]


// Regular articles
const regularArticles = [
  {
    id: 1,
    title: 'Building Stronger Communities Through Faith-Based Initiatives',
    excerpt: 'Exploring how our ministry initiatives are making a positive impact in local neighborhoods through dedicated service and community partnerships.',
    author: 'Pastor John Smith',
    date: 'Feb 10, 2025',
    readTime: '5 min read',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=300&fit=crop',
    views: '1.8K'
  },
  {
    id: 2,
    title: 'Youth Leadership Development Program Celebrates Major Milestones',
    excerpt: 'Celebrating the achievements of our young leaders who are making a difference in their communities and developing essential leadership skills.',
    author: 'Youth Pastor Lisa White',
    date: 'Feb 8, 2025',
    readTime: '4 min read',
    category: 'Youth',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=300&fit=crop',
    views: '1.3K'
  },
  {
    id: 3,
    title: 'Annual International Mission Trip: Preparations and Opportunities',
    excerpt: 'Get ready for our upcoming international mission trip and learn how you can get involved in making a global impact through service.',
    author: 'Mission Team Leader',
    date: 'Feb 5, 2025',
    readTime: '6 min read',
    category: 'Mission',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&h=300&fit=crop',
    views: '956'
  },
  {
    id: 4,
    title: 'Women\'s Ministry Conference: Empowering Faith and Fellowship',
    excerpt: 'Join us for our annual women\'s ministry conference featuring inspiring speakers, worship, and opportunities for spiritual growth.',
    author: 'Sister Sarah Clark',
    date: 'Feb 3, 2025',
    readTime: '3 min read',
    category: 'Ministry',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=300&fit=crop',
    views: '742'
  },
  {
    id: 5,
    title: 'Men\'s Fellowship Retreat: Building Brotherhood and Faith',
    excerpt: 'Reflecting on our recent men\'s retreat and the powerful bonds of brotherhood that were strengthened through shared faith experiences.',
    author: 'Brother Paul Anderson',
    date: 'Jan 30, 2025',
    readTime: '4 min read',
    category: 'Fellowship',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=300&fit=crop',
    views: '634'
  },
  {
    id: 6,
    title: 'Sunday School Program Expansion: Reaching More Families',
    excerpt: 'Announcing the expansion of our Sunday school programs to accommodate growing enrollment and serve more families in our community.',
    author: 'Sister Rebecca Martinez',
    date: 'Jan 28, 2025',
    readTime: '5 min read',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop',
    views: '521'
  }
]

// Categories with updated counts
const newsCategories = [
  { name: 'Ministry Updates', count: 24 },
  { name: 'Community News', count: 18 },
  { name: 'Youth Activities', count: 15 },
  { name: 'Mission Reports', count: 12 },
  { name: 'Fellowship Events', count: 9 },
  { name: 'Education Programs', count: 7 }
]

// Recent activity
const recentActivity = [
  {
    id: 1,
    title: 'New article published: "Community Garden Project"',
    time: '2 hours ago',
    color: 'bg-green-500'
  },
  {
    id: 2,
    title: 'Youth ministry article updated',
    time: '5 hours ago',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'Mission trip registration opened',
    time: '1 day ago',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Weekly newsletter sent to 2.1K subscribers',
    time: '2 days ago',
    color: 'bg-orange-500'
  }
]

// Popular tags
const popularTags = [
  'Faith', 'Community', 'Youth', 'Mission', 'Fellowship', 'Outreach', 
  'Ministry', 'Service', 'Leadership', 'Family', 'Prayer', 'Worship'
]

// Helper function for category colors
const getCategoryColor = (category) => {
  switch (category) {
    case 'Community': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    case 'Youth': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    case 'Mission': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
    case 'Ministry': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    case 'Fellowship': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
    case 'Education': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
  }
}
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