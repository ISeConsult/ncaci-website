<template>
  <div class="w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
    <!-- Header with title and actions -->
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <slot name="header">
          <h2 v-if="title" class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h2>
        </slot>
        <div class="flex items-center space-x-3">
          <slot name="header-actions" />
        </div>
      </div>
    </div>

    <!-- Search and filters -->
    <div v-if="searchable || $slots.filters" class="px-6 py-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Search input -->
        <div v-if="searchable" class="flex-1 max-w-md">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 dark:text-gray-300" />
            </div>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
            />
          </div>
        </div>

        <!-- Filters slot -->
        <div v-if="$slots.filters" class="flex-shrink-0">
          <slot name="filters" />
        </div>
      </div>
    </div>

    <!-- Table container -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Table header -->
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              :class="[
                'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
                column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left',
                column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600' : '',
                column.className
              ]"
              @click="column.sortable ? sort(column.key) : null"
            >
              <div class="flex items-center group">
                <span>{{ column.label }}</span>
                <component
                  :is="getSortIcon(column.key)"
                  v-if="column.sortable"
                  class="ml-1 h-4 w-4 text-gray-400 dark:text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-200"
                />
              </div>
            </th>
            <th v-if="$slots.actions" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <!-- Table body -->
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(item, rowIndex) in filteredData"
            :key="rowIndex"
            :class="[
              'transition-colors duration-150',
              {
                'hover:bg-gray-50 dark:hover:bg-gray-700': hoverable,
                'cursor-pointer': selectable,
                'bg-blue-50 dark:bg-blue-900': selectable && selectedItems.includes(getItemKey(item))
              }
            ]"
            @click="selectable ? toggleSelect(item) : null"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm',
                column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left',
                column.cellClass ? column.cellClass(item) : ''
              ]"
            >
              <slot :name="`cell-${column.key}`" :item="item" :value="item[column.key]">
                {{ formatCellValue(item[column.key], column) }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex items-center justify-end space-x-2">
                <slot name="actions" :item="item" :index="rowIndex" />
              </div>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="filteredData.length === 0">
            <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="px-6 py-12 text-center">
              <div class="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <component :is="emptyStateIcon || NoSymbolIcon" class="h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                <p class="text-lg font-medium text-gray-900 dark:text-white mb-2">{{ emptyStateTitle }}</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ emptyStateDescription }}</p>
                <slot name="empty-state" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination and footer -->
    <div v-if="pagination || $slots.footer" class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Pagination info -->
        <div v-if="pagination" class="text-sm text-gray-700 dark:text-gray-300">
          Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
          to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredAndSortedData.length) }}</span>
          of <span class="font-medium">{{ filteredAndSortedData.length }}</span> results
        </div>

        <!-- Pagination controls -->
        <div v-if="pagination" class="flex-shrink-0">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-items="filteredAndSortedData.length"
            :items-per-page="itemsPerPage"
            @update:current-page="currentPage = $event"
          />
        </div>

        <!-- Footer slot -->
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  NoSymbolIcon,
  ArrowsUpDownIcon
} from '@heroicons/vue/24/outline'
import Pagination from '~/components/UI/Pagination.vue'

interface TableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  className?: string
  cellClass?: (item: any) => string
  format?: (value: any) => string
}

interface Props {
  data: any[]
  columns: TableColumn[]
  title?: string
  searchable?: boolean
  searchPlaceholder?: string
  hoverable?: boolean
  selectable?: boolean
  pagination?: boolean
  itemsPerPage?: number
  emptyStateTitle?: string
  emptyStateDescription?: string
  emptyStateIcon?: any
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  searchable: false,
  searchPlaceholder: 'Search...',
  hoverable: true,
  selectable: false,
  pagination: false,
  itemsPerPage: 10,
  emptyStateTitle: 'No results found',
  emptyStateDescription: 'Try adjusting your search or filter to find what you\'re looking for.'
})

const searchQuery = ref('')
const sortKey = ref('')
const sortDirection = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)
const selectedItems = ref<any[]>([])

const filteredAndSortedData = computed(() => {
  let filtered = props.data.filter(item => {
    if (!searchQuery.value) return true
    
    return Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  if (sortKey.value) {
    filtered = filtered.sort((a, b) => {
      const aValue = a[sortKey.value]
      const bValue = b[sortKey.value]
      
      if (sortDirection.value === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  return filtered
})

const filteredData = computed(() => {
  if (props.pagination) {
    const start = (currentPage.value - 1) * props.itemsPerPage
    const end = start + props.itemsPerPage
    return filteredAndSortedData.value.slice(start, end)
  }

  return filteredAndSortedData.value
})

const totalPages = computed(() =>
  Math.ceil(filteredAndSortedData.value.length / props.itemsPerPage)
)

watch(searchQuery, () => {
  currentPage.value = 1
})

watch(sortKey, () => {
  currentPage.value = 1
})

watch(sortDirection, () => {
  currentPage.value = 1
})

const sort = (key: string) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

const getSortIcon = (key: string) => {
  if (sortKey.value !== key) return ArrowsUpDownIcon
  return sortDirection.value === 'asc' ? ChevronUpIcon : ChevronDownIcon
}

const formatCellValue = (value: any, column: TableColumn) => {
  if (column.format) {
    return column.format(value)
  }
  return value
}

const getItemKey = (item: any) => {
  return item.id || JSON.stringify(item)
}

const toggleSelect = (item: any) => {
  const key = getItemKey(item)
  const index = selectedItems.value.indexOf(key)
  
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(key)
  }
}
</script>