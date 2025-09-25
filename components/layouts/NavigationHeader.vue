<!-- components/layout/NavigationHeader.vue -->
<template>
  <nav class="fixed w-full top-0 z-50 section1-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">

        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <img class="block h-12 w-auto" src="/images/church-logo.png" alt="Logo"></img>
        </div>
        <div class="flex items-center">

          <!-- Navigation Items -->
          <div class="hidden lg:flex space-x-2">
            <div v-for="item in navigationItems" :key="item.name" class="relative">
              <button
                v-if="!item.children"
                @click="$emit('section-change', item.key)"
                :class="[
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  activeSection === item.key
                    ? ''
                    : 'text1'
                ]"
              >
                <component :is="item.icon" class="mr-2 h-5 w-5" />
                {{ item.name }}
              </button>
              <div v-else>
                <button
                  @click="toggleDropdown(item.key)"
                  :class="[
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    activeSection === item.key || item.children.some(child => activeSection === child.key)
                      ? ''
                      : 'text1'
                  ]"
                >
                  <component :is="item.icon" class="mr-2 h-5 w-5" />
                  {{ item.name }}
                  <ChevronDownIcon class="ml-1 h-4 w-4" />
                </button>
                <div v-if="openDropdown === item.key" class="absolute mt-3 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                  <button
                    v-for="child in item.children"
                    :key="child.name"
                    @click="$emit('section-change', child.key); openDropdown = null"
                    class="block px-4 py-4 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  >
                    <component class="mr-2 h-4 w-4" />
                    {{ child.name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Mobile menu button -->
          <div class="lg:hidden">
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="p-2 rounded-lg transition-colors"
            >
              <Bars3Icon v-if="!mobileMenuOpen" class="h-5 w-5" /><XMarkIcon v-else class="h-5 w-5" />
            </button>
          </div>

          <!-- Dark Mode Toggle -->
          <!-- Color mode selector -->
          <div class="lg:ml-4 lg:flex md:items-center">
            <ColorModeSelector />
          </div>

          <!-- Profile -->
          <div class="flex items-center space-x-3">
            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile">
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state -->
    <div v-if="mobileMenuOpen" class="lg:hidden section1-bg">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <template v-for="item in navigationItems" :key="item.name">
          <button
            v-if="!item.children"
            @click="$emit('section-change', item.key); mobileMenuOpen = false"
            :class="[
              'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
              activeSection === item.key
                ? ''
                : 'text1'
            ]"
          >
            <component :is="item.icon" class="mr-3 h-5 w-5" />
            {{ item.name }}
          </button>
          <div v-else>
            <button
              @click="toggleMobileSubmenu(item.key)"
              :class="[
                'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                activeSection === item.key || item.children.some(child => activeSection === child.key)
                  ? ''
                  : 'text1'
              ]"
            >
              <component :is="item.icon" class="mr-3 h-5 w-5" />
              {{ item.name }}
              <ChevronDownIcon class="ml-auto h-4 w-4" />
            </button>
            <div v-if="openMobileSubmenu === item.key" class="ml-6 space-y-1">
              <button
                v-for="child in item.children"
                :key="child.name"
                @click="$emit('section-change', child.key); mobileMenuOpen = false"
                class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text1"
              >
                <component :is="child.icon" class="mr-3 h-4 w-4" />
                {{ child.name }}
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  NewspaperIcon,
  SparklesIcon,
  FolderIcon,
  PhoneIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'
import ColorModeSelector from '../ColorModeSelector.vue'

defineProps({
  activeSection: {
    type: String,
    default: 'overview'
  }
})

defineEmits(['section-change'])


const mobileMenuOpen = ref(false)
const openDropdown = ref(null)
const openMobileSubmenu = ref(null)

const toggleDropdown = (key) => {
  openDropdown.value = openDropdown.value === key ? null : key
}

const toggleMobileSubmenu = (key) => {
  openMobileSubmenu.value = openMobileSubmenu.value === key ? null : key
}

const navigationItems = [
  { name: 'Dashboard', key: 'overview', icon: HomeIcon },
  { name: 'Events & Activities', key: 'event', icon: CalendarIcon, children: [
    { name: 'Events', key: 'events' },
    { name: 'Activities', key: 'activities' }
  ]},
  { name: 'Courses', key: 'courses', icon: UsersIcon },
  { name: 'News', key: 'news', icon: NewspaperIcon },
  { name: 'Documents', key: 'directories', icon: FolderIcon },
  { name: 'Contacts', key: 'contacts', icon: PhoneIcon },
  { name: 'Registrations', key: 'registrations', icon: ClipboardDocumentListIcon },
  { name: 'Executives', key: 'executives', icon: UsersIcon, children: [
    { name: 'Church Leaders', key: 'leaders' },
    { name: 'Ministry Executive', key: 'executive' }
  ] }
]
</script>
