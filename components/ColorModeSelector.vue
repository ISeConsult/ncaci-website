<template>
  <button
    @click="toggleColorMode"
    class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-700"
    :title="currentMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <MoonIcon v-if="currentMode === 'dark'" class="h-5 w-5" />
    <SunIcon v-else class="h-5 w-5" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MoonIcon, SunIcon} from '@heroicons/vue/24/outline'

const colorMode = useColorMode()

const currentMode = computed(() => colorMode.value)

const toggleColorMode = () => {
  colorMode.preference = currentMode.value === 'dark' ? 'light' : 'dark'
}
</script>


