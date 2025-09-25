<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <div v-if="$slots.prefix || prefixIcon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <slot name="prefix">
          <component :is="prefixIcon" v-if="prefixIcon" class="h-5 w-5 text-gray-400" />
        </slot>
      </div>

      <input
        :id="id"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300',
          sizeClasses,
          {
            'pl-10': $slots.prefix || prefixIcon,
            'pr-10': $slots.suffix || suffixIcon,
            'bg-gray-100 dark:bg-gray-600 cursor-not-allowed opacity-75': disabled,
            'border-red-300 focus:ring-red-500 focus:border-red-500': error
          }
        ]"
        @input="updateValue(($event.target as HTMLInputElement).value)"
      />

      <div v-if="$slots.suffix || suffixIcon" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <slot name="suffix">
          <component :is="suffixIcon" v-if="suffixIcon" class="h-5 w-5 text-gray-400" />
        </slot>
      </div>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-if="helpText && !error" class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ helpText }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue?: string | number
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  helpText?: string
  size?: 'sm' | 'md' | 'lg'
  prefixIcon?: any
  suffixIcon?: any
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  modelValue: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const id = computed(() => `textfield-${Math.random().toString(36).substr(2, 9)}`)

const sizeClasses = computed(() => {
  const classes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base'
  }
  return classes[props.size]
})

const updateValue = (value: string | number) => {
  emit('update:modelValue', value)
}
</script>