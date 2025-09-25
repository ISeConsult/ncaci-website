<template>
  <div class="relative inline-block text-left">
    <!-- Trigger Button -->
    <div>
      <button
        type="button"
        :class="[
          'inline-flex items-center justify-between w-full rounded-lg border shadow-sm px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-blue-500 focus:ring-offset-blue-100': !variant || variant === 'default',
            'border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-500 focus:ring-offset-blue-100': variant === 'primary',
            'border-gray-800 bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500 focus:ring-offset-gray-100': variant === 'dark',
            'w-10 h-10 px-0 justify-center rounded-full': iconOnly,
            'cursor-not-allowed opacity-50': disabled
          },
          triggerClass
        ]"
        :disabled="disabled"
        @click="toggleDropdown"
      >
        <span v-if="!iconOnly" class="truncate">
          {{ selectedOption?.label || selectedOption || placeholder }}
        </span>
        
        <component
          :is="selectedOption?.icon"
          v-if="iconOnly && selectedOption?.icon"
          class="h-5 w-5"
        />
        <span v-else-if="iconOnly && !selectedOption?.icon">
          ⋯
        </span>

        <ChevronDownIcon
          :class="[
            'ml-2 h-4 w-4 flex-shrink-0 transition-transform duration-200',
            {
              'transform rotate-180': isOpen,
              'ml-0': iconOnly
            }
          ]"
        />
      </button>
    </div>

    <!-- Dropdown Panel -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 max-h-60 overflow-y-auto"
        :class="[
          {
            'left-0 right-auto': align === 'left',
            'right-0 left-auto': align === 'right'
          }
        ]"
      >
        <div class="py-1">
          <!-- Search input (optional) -->
          <div v-if="searchable" class="px-3 py-2 border-b border-gray-100 dark:border-gray-600">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300"
              @click.stop
            />
          </div>

          <!-- Options list -->
          <button
            v-for="(option, index) in filteredOptions"
            :key="index"
            :class="[
              'flex items-center w-full px-4 py-2.5 text-sm transition-colors duration-150',
              {
                'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300': isOptionSelected(option),
                'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100': !isOptionSelected(option),
                'cursor-not-allowed opacity-50': option.disabled
              }
            ]"
            :disabled="option.disabled"
            @click="selectOption(option)"
          >
            <!-- Option icon -->
            <component
              :is="option.icon"
              v-if="option.icon"
              class="mr-3 h-4 w-4 text-gray-400 dark:text-gray-500"
            />

            <!-- Option content -->
            <div class="flex-1 text-left">
              <div class="font-medium">{{ option.label || option }}</div>
              <div v-if="option.description" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {{ option.description }}
              </div>
            </div>

            <!-- Checkmark for selected option -->
            <CheckIcon
              v-if="isOptionSelected(option)"
              class="ml-2 h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0"
            />
          </button>

          <!-- No results message -->
          <div
            v-if="searchable && filteredOptions.length === 0"
            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center"
          >
            No results found
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronDownIcon, CheckIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

interface DropdownOption {
  value: any
  label?: string
  icon?: any
  description?: string
  disabled?: boolean
}

interface Props {
  modelValue?: any
  options: (string | DropdownOption)[]
  placeholder?: string
  variant?: 'default' | 'primary' | 'dark'
  align?: 'left' | 'right'
  searchable?: boolean
  disabled?: boolean
  iconOnly?: boolean
  triggerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  variant: 'default',
  align: 'right',
  searchable: false,
  disabled: false,
  iconOnly: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const isOpen = ref(false)
const searchQuery = ref('')

const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'string') {
      return { value: option, label: option }
    }
    return option
  })
})

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value) {
    return normalizedOptions.value
  }

  const query = searchQuery.value.toLowerCase()
  return normalizedOptions.value.filter(option => {
    const label = option.label || option.value?.toString() || ''
    return label.toLowerCase().includes(query)
  })
})

const selectedOption = computed(() => {
  return normalizedOptions.value.find(opt => opt.value === props.modelValue)
})

const isOptionSelected = (option: DropdownOption) => {
  return option.value === props.modelValue
}

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value && props.searchable) {
    // Focus search input when dropdown opens
    setTimeout(() => {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
      searchInput?.focus()
    }, 100)
  } else {
    searchQuery.value = ''
  }
}

const selectOption = (option: DropdownOption) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  isOpen.value = false
  searchQuery.value = ''
}

const closeDropdown = (event: MouseEvent) => {
  if (!(event.target as Element).closest('.relative')) {
    isOpen.value = false
    searchQuery.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
/* Custom scrollbar for dropdown */
.max-h-60::-webkit-scrollbar {
  width: 6px;
}

.max-h-60::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 0 4px 4px 0;
}

.max-h-60::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>