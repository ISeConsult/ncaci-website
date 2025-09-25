<template>
  <nav :class="navbarClasses">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
         <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <NuxtLink to="/" class="flex-shrink-0 flex items-center">
            <img class="block h-12 w-auto" src="/public/images/church-logo.png" alt="NuxtApp" />
          </NuxtLink>
        </div>
        <!--main navigation -->
        <div class="flex items-center">
         

          <!-- Desktop Navigation -->
          <div :class="desktopNavClasses">
            <template v-for="(item, index) in navigation" :key="index">
              <div v-if="item.name === 'Media'" class="relative group">
                <NuxtLink
                  :to="item.to"
                  :class="navLinkClasses(item.to)"
                >
                  {{ item.name }}
                </NuxtLink>
                <div class="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <NuxtLink
                    to="/media"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Gallery
                  </NuxtLink>
                  <NuxtLink
                    to="/activity"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Activities
                  </NuxtLink>
                  <NuxtLink
                    to="/directorate"
                    class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Directorates
                  </NuxtLink>
                </div>
              </div>
              <div v-else>
                <NuxtLink
                  :to="item.to"
                  :class="navLinkClasses(item.to)"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </template>
          </div>
        </div>

        <!-- Right section: Search, buttons, and menu -->
        <div class="flex items-center space-x-4">

          <!--Buttons-->
          <div class="hidden lg:block">
            <UIButton size="lg">
              <NuxtLink to="/contact" class="w-full text-center" :class="buttonLinkClasses">
                Contact Us
              </NuxtLink>
            </UIButton>
          </div>

          <!-- Color mode selector -->
          <div class="hidden lg:ml-4 lg:flex lg:items-center">
            <ColorModeSelector />
          </div>

          <!-- Mobile menu button -->
          <div class="flex items-center lg:hidden">
            <ColorModeSelector />
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              :class="mobileMenuButtonClasses"
            >
              <Bars3Icon v-if="!isMobileMenuOpen" class="block h-6 w-6" />
              <XMarkIcon v-else class="block h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isMobileMenuOpen" :class="mobileMenuClasses">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NuxtLink
            v-for="(item, index) in navigation"
            :key="index"
            :to="item.to"
            :class="mobileNavLinkClasses(item.to)"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4">
            <UIButton class="w-full" size="lg">
              <NuxtLink to="/contact" class="w-full text-center" :class="buttonLinkClasses">
                Contact Us
              </NuxtLink>
            </UIButton>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import {
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import ColorModeSelector from '../ColorModeSelector.vue'
import UIButton from '../UI/Button.vue'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Leadership', to: '/leadership' },
  { name: 'Ministries', to: '/ministries' },
  { name: 'News', to: '/blog' },
  { name: 'NIBALT', to: '/nibalt' },
  { name: 'Media', to: '/media' }
]

const isHomePage = computed(() => route.path === '/')

// 👇 Change navbar bg based on scroll
const navbarClasses = computed(() =>
  isScrolled.value
    ? 'section1-bg shadow-md border-none fixed top-0 left-0 w-full z-50 transition-colors duration-300'
    : 'bg-transparent shadow-none border-none absolute top-0 left-0 w-full z-50 transition-colors duration-300'
)

const desktopNavClasses = computed(() =>
  'hidden lg:ml-8 lg:flex lg:space-x-8 text-white uppercase'
)

const navLinkClasses = (to: string) => {
  const isActive = to === route.path
  return [
    'inline-flex items-center px-2 py-1 border-2 rounded-xl text-sm font-medium transition-colors duration-200',
    isActive
      ? 'border-white text-white'
      : 'border-transparent text-gray-400 dark:text-gray-300 hover:text1 hover:border-white'
  ]
}

const buttonLinkClasses = computed(() => 'text-white')

const mobileMenuButtonClasses = computed(() =>
  'inline-flex ml-2 items-center justify-center p-2 rounded-md text-white bg-red-500 hover:text-gray-300 hover:bg-red-700'
)

const mobileMenuClasses = computed(() =>
  'lg:hidden border-t border-gray-200 bg-black bg-opacity-80'
)

const mobileNavLinkClasses = (to: string) => {
  const isActive = to === route.path
  return [
    'block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200',
    isActive ? 'bg-white/20 text-white' : 'bg-white/20 text-white'
  ]
}

// 👇 Track scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>


<style scoped>
.router-link-active {
  @apply border-red-500 text-red-500;
}
</style>
