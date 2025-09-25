<template>
  <button
    :class="[
      'inline-flex items-center justify-center transition-all duration-200 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses,
      variantClasses,
      rounded ? 'rounded-full' : 'rounded-md',
      fullWidth ? 'w-full' : '',
      className
    ]"
    :type="type"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- Icon (left) -->
    <component
      :is="icon"
      v-if="icon && !loading && !iconRight"
      :class="['w-4 h-4 mr-2', iconClass]"
    />

    <!-- Slot content -->
    <slot />

    <!-- Icon (right) -->
    <component
      :is="icon"
      v-if="icon && !loading && iconRight"
      :class="['w-4 h-4 ml-2', iconClass]"
    />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'

interface Props {
  // Variants
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  type?: 'button' | 'submit' | 'reset'
  
  // States
  disabled?: boolean
  loading?: boolean
  
  // Appearance
  rounded?: boolean
  fullWidth?: boolean
  icon?: Component
  iconRight?: boolean
  iconClass?: string
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  rounded: false,
  fullWidth: false,
  icon: undefined,
  iconRight: false,
  iconClass: '',
  className: ''
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const sizeClasses = computed(() => {
  const classes = {
    sm: 'px-3 py-1.5 text-xs font-medium',
    md: 'px-4 py-2 text-sm font-medium',
    lg: 'px-6 py-3 text-base font-medium',
    xl: 'px-8 py-4 text-lg font-medium'
  }
  return classes[props.size]
})

const variantClasses = computed(() => {
  const classes = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-800',
    outline: 'border border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-800'
  }
  return classes[props.variant]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>