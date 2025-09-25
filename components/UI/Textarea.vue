<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :class="[
        'w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 transition-colors duration-200 resize-y bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300',
        sizeClasses,
        {
          'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75': disabled,
          'border-red-300 focus:ring-red-500 focus:border-red-500': error
        }
      ]"
      @input="updateValue(($event.target as HTMLTextAreaElement)?.value || '')"
    />

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="helpText && !error" class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ helpText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  helpText?: string
  rows?: number
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
  size: 'md',
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const id = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`)

const sizeClasses = computed(() => {
  const classes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base'
  }
  return classes[props.size]
})

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
</script>