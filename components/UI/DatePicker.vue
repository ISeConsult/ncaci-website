<template>
  <div class="relative">
    <!-- Date Input with Calendar Toggle -->
    <div class="relative">
      <input
        :id="id"
        :value="formattedDate"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full pl-4 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300',
          { 'bg-gray-100 dark:bg-gray-600 cursor-not-allowed opacity-75': disabled },
          { 'border-red-300 focus:ring-red-500 focus:border-red-500': error }
        ]"
        readonly
        @click="toggleCalendar"
      />
      <button
        type="button"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
        @click="toggleCalendar"
        :disabled="disabled"
      >
        <CalendarIcon class="h-5 w-5 text-gray-400" />
      </button>
    </div>

    <!-- Calendar Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="showCalendar"
        class="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4"
      >
        <!-- Calendar Header -->
        <div class="flex items-center justify-between mb-4">
          <button
            type="button"
            class="p-1 rounded-md hover:bg-gray-100"
            @click="previousMonth"
          >
            <ChevronLeftIcon class="h-5 w-5" />
          </button>
          <div class="text-sm font-semibold">
            {{ currentMonth }} {{ currentYear }}
          </div>
          <button
            type="button"
            class="p-1 rounded-md hover:bg-gray-100"
            @click="nextMonth"
          >
            <ChevronRightIcon class="h-5 w-5" />
          </button>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']"
            :key="day"
            class="text-center text-xs text-gray-500 font-medium py-1"
          >
            {{ day }}
          </div>
        </div>

        <div class="grid grid-cols-7 gap-1">
          <div
            v-for="day in calendarDays"
            :key="day.date.toString()"
            :class="[
              'text-center text-sm py-2 rounded-md cursor-pointer transition-colors duration-150',
              {
                'text-gray-400': !day.isCurrentMonth,
                'bg-blue-100 text-blue-700': day.isToday && !day.isSelected,
                'bg-blue-600 text-white': day.isSelected,
                'hover:bg-gray-100': day.isCurrentMonth && !day.isSelected
              }
            ]"
            @click="selectDate(day.date)"
          >
            {{ day.date.getDate() }}
          </div>
        </div>
      </div>
    </transition>

    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

interface Props {
  modelValue?: Date | string | null
  placeholder?: string
  disabled?: boolean
  error?: string
  minDate?: Date
  maxDate?: Date
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select date',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void
}>()

const id = computed(() => `datepicker-${Math.random().toString(36).substr(2, 9)}`)
const showCalendar = ref(false)
const currentDate = ref(new Date())
const selectedDate = ref<Date | null>(null)

// Format date for display
const formattedDate = computed(() => {
  if (!selectedDate.value) return ''
  return selectedDate.value.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
})

// Calendar navigation
const currentMonth = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long' })
})

const currentYear = computed(() => {
  return currentDate.value.getFullYear()
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // First day of the month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Start from Sunday of the week containing the first day
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  
  // End on Saturday of the week containing the last day
  const endDate = new Date(lastDay)
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))
  
  const days = []
  const today = new Date()
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    days.push({
      date: new Date(date),
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: selectedDate.value ? date.toDateString() === selectedDate.value.toDateString() : false
    })
  }
  
  return days
})

// Methods
const toggleCalendar = () => {
  if (props.disabled) return
  showCalendar.value = !showCalendar.value
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  emit('update:modelValue', date)
  showCalendar.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showCalendar.value = false
  }
}

// Initialize from modelValue
onMounted(() => {
  if (props.modelValue) {
    selectedDate.value = new Date(props.modelValue)
    currentDate.value = new Date(props.modelValue)
  }
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>