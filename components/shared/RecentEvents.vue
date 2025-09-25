<!-- components/shared/RecentEvents.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Events</h3>
    <div class="space-y-4">
      <div v-for="event in events" :key="event.id" class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <CalendarIcon class="h-5 w-5 text-blue-500 mr-3" />
        <div>
          <p class="font-medium text-gray-900 dark:text-white">{{ event.title }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ event.date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CalendarIcon } from '@heroicons/vue/24/outline'

defineProps({
  events: {
    type: Array,
    required: true
  }
})
</script>