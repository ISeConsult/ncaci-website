<!-- components/shared/LeadershipQuickAccess.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leadership Quick Access</h3>
    <div class="grid grid-cols-2 gap-4">
      <button v-for="leader in leaders" :key="leader.title" 
              @click="$emit('navigate-to-leaders')"
              class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition-colors">
        <component :is="leader.iconComponent" class="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ leader.title }}</p>
        <p class="text-xs text-gray-600 dark:text-gray-400">{{ leader.count }} members</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { UsersIcon, MapPinIcon } from '@heroicons/vue/24/outline'

defineProps({
  leaders: {
    type: Array,
    required: true
  }
})

defineEmits(['navigate-to-leaders'])

// Convert icon names to components
const leadersWithIcons = computed(() => {
  return props.leaders.map(leader => {
    return {
      ...leader,
      iconComponent: leader.icon === 'MapPinIcon' ? MapPinIcon : UsersIcon
    }
  })
})
</script>