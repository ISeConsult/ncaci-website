<template>
  <div class="relative">
    <!-- Time Input -->
    <div class="relative">
      <input
        :id="id"
        :value="formattedTime"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full pl-4 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300',
          { 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75': disabled },
          { 'border-red-300 focus:ring-red-500 focus:border-red-500': error }
        ]"
        readonly
        @click="toggleTimeDropdown"
      />
      <button
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        @click="toggleTimeDropdown"
        :disabled="disabled"
      >
        <ClockIcon class="h-5 w-5 text-gray-400 dark:text-gray-500" />
      </button>
    </div>

    <!-- Time Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showTimeDropdown"
        class="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-2 max-h-60 overflow-y-auto"
      >
        <!-- Time Options -->
        <div
          v-for="time in timeOptions"
          :key="time.value"
          :class="[
            'px-4 py-2 text-sm cursor-pointer transition-colors duration-150',
            {
              'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300': time.value === selectedTimeValue,
              'hover:bg-gray-100 dark:hover:bg-gray-700': time.value !== selectedTimeValue
            }
          ]"
          @click="selectTime(time.value)"
        >
          {{ time.label }}
        </div>
      </div>
    </transition>

    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ClockIcon } from '@heroicons/vue/24/outline'

interface Props {
  modelValue?: string | null
  placeholder?: string
  disabled?: boolean
  error?: string
  interval?: number
  format?: '12h' | '24h'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select time',
  disabled: false,
  interval: 30,
  format: '12h'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const id = computed(() => `timepicker-${Math.random().toString(36).substr(2, 9)}`)
const showTimeDropdown = ref(false)
const selectedTimeValue = ref<string | null>(null)

// Generate time options
const timeOptions = computed(() => {
  const options = []
  const totalMinutes = 24 * 60
  
  for (let minutes = 0; minutes < totalMinutes; minutes += props.interval) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (props.format === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours % 12 || 12
      options.push({
        value: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
        label: `${displayHours}:${String(mins).padStart(2, '0')} ${period}`
      })
    } else {
      options.push({
        value: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
        label: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
      })
    }
  }
  
  return options
})

// Format time for display
const formattedTime = computed(() => {
  if (!selectedTimeValue.value) return ''
  
  const [hours, minutes] = selectedTimeValue.value.split(':')
  const hourNum = parseInt(hours || '0', 10)
  
  if (props.format === '12h') {
    const period = hourNum >= 12 ? 'PM' : 'AM'
    const displayHours = hourNum % 12 || 12
    return `${displayHours}:${minutes} ${period}`
  }
  
  return selectedTimeValue.value
})

// Methods
const toggleTimeDropdown = () => {
  if (props.disabled) return
  showTimeDropdown.value = !showTimeDropdown.value
}

const selectTime = (time: string) => {
  selectedTimeValue.value = time
  emit('update:modelValue', time)
  showTimeDropdown.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showTimeDropdown.value = false
  }
}

// Initialize from modelValue
onMounted(() => {
  if (props.modelValue) {
    selectedTimeValue.value = props.modelValue
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>