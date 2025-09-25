<!-- components/layout/SidebarNavigation.vue -->
<template>
  <aside class="w-64 bg-white dark:bg-gray-800 shadow-lg h-[calc(100vh-4rem)] sticky top-16">
    <nav class="mt-8 px-4">
      <div class="space-y-2">
        <button 
          v-for="item in navigationItems" 
          :key="item.name"
          @click="$emit('section-change', item.key)"
          :class="[
            'w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
            activeSection === item.key 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          ]"
        >
          <component :is="item.icon" class="mr-3 h-5 w-5" />
          {{ item.name }}
        </button>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  NewspaperIcon,
  SparklesIcon,
  FolderIcon,
  PhoneIcon,
  ClipboardDocumentListIcon
} from '@heroicons/vue/24/outline'

defineProps({
  activeSection: {
    type: String,
    default: 'overview'
  }
})

defineEmits(['section-change'])

const navigationItems = [
  { name: 'Dashboard', key: 'overview', icon: HomeIcon },
  { name: 'Events', key: 'events', icon: CalendarIcon },
  { name: 'Leaders', key: 'leaders', icon: UsersIcon },
  { name: 'News & Blogs', key: 'news', icon: NewspaperIcon },
  { name: 'Activities', key: 'activities', icon: SparklesIcon },
  { name: 'Directories', key: 'directories', icon: FolderIcon },
  { name: 'Contacts', key: 'contacts', icon: PhoneIcon },
  { name: 'Registrations', key: 'registrations', icon: ClipboardDocumentListIcon }
]
</script>