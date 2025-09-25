<!-- components/shared/StatsCard.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <div class="flex items-center">
      <div :class="['p-2 rounded-lg', color]">
        <component :is="iconComponent" class="h-6 w-6 text-white" />
      </div>
      <div class="ml-4">
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ title }}</p>
        <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { 
  UsersIcon, 
  CalendarIcon, 
  SparklesIcon, 
  ClipboardDocumentListIcon 
} from '@heroicons/vue/24/outline'

const props = defineProps({
  title: String,
  value: String,
  icon: String,
  color: String
})

const iconComponent = computed(() => {
  const icons = {
    UsersIcon,
    CalendarIcon,
    SparklesIcon,
    ClipboardDocumentListIcon
  }
  return icons[props.icon] || UsersIcon
})
</script>