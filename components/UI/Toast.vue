<template>
  <div
    :class="[
      'max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5',
      typeClasses
    ]"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900 dark:text-white text-nowrap">
            {{ message }}
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button
            @click="$emit('close')"
            class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span class="sr-only">Close</span>
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import {
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

interface Props {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info'
})

defineEmits<{
  close: []
}>()



const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'border-l-4 border-green-400'
    case 'error':
      return 'border-l-4 border-red-400'
    case 'warning':
      return 'border-l-4 border-yellow-400'
    case 'info':
    default:
      return 'border-l-4 border-blue-400'
  }
})
</script>
