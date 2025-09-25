<template>
  <nav class="flex items-center justify-between px-4 sm:px-0">
    <!-- Previous Button -->
    <div class="-mt-px flex-1 flex">
      <button
        :disabled="currentPage === 1"
        :class="[
          'border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 mr-4',
          {
            'hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer': currentPage > 1,
            'cursor-not-allowed opacity-50': currentPage === 1
          }
        ]"
        @click="goToPage(currentPage - 1)"
      >
        <ArrowLeftIcon class="mr-3 h-5 w-5" />
        Previous
      </button>
    </div>

    <!-- Page Numbers -->
    <div class="hidden md:-mt-px md:flex">
      <template v-for="page in pages" :key="page">
        <span
          v-if="page === '...'"
          class="border-transparent text-gray-500 dark:text-gray-400 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
        >
          ...
        </span>
        <button
          v-else
          :class="[
            'border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium',
            {
              'border-blue-500 text-blue-600': page === currentPage,
              'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600': page !== currentPage
            }
          ]"
          @click="goToPage(page as number)"
        >
          {{ page }}
        </button>
      </template>
    </div>

    <!-- Next Button -->
    <div class="-mt-px flex-1 flex justify-end">
      <button
        :disabled="currentPage === totalPages"
        :class="[
          'border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 ml-4',
          {
            'hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer': currentPage < totalPages,
            'cursor-not-allowed opacity-50': currentPage === totalPages
          }
        ]"
        @click="goToPage(currentPage + 1)"
      >
        Next
        <ArrowRightIcon class="ml-3 h-5 w-5" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const pages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisiblePages = 5

  if (props.totalPages <= maxVisiblePages) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)

    if (props.currentPage > 3) {
      pages.push('...')
    }

    const start = Math.max(2, props.currentPage - 1)
    const end = Math.min(props.totalPages - 1, props.currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (props.currentPage < props.totalPages - 2) {
      pages.push('...')
    }

    pages.push(props.totalPages)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}
</script>