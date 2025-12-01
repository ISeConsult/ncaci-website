<template>
  <div v-if="variant === 'text'">
    <div
      v-for="line in lines"
      :key="line"
      :class="[
        'bg-gray-300 dark:bg-gray-700 animate-pulse rounded',
        width,
        height,
        'mb-2 last:mb-0',
        className
      ]"
    ></div>
  </div>
  <div
    v-else-if="variant === 'circle'"
    :class="[
      'bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full',
      width,
      height,
      className
    ]"
  ></div>
  <div
    v-else-if="variant === 'rectangle'"
    :class="[
      'bg-gray-300 dark:bg-gray-700 animate-pulse rounded',
      width,
      height,
      className
    ]"
  ></div>
  <div
    v-else-if="variant === 'square'"
    :class="[
      'bg-gray-300 dark:bg-gray-700 animate-pulse',
      width,
      height,
      className
    ]"
  ></div>
  <div
    v-else-if="variant === 'line'"
    :class="[
      'bg-gray-300 dark:bg-gray-700 animate-pulse',
      width,
      height,
      className
    ]"
  ></div>
  <div
    v-else-if="variant === 'table'"
    :class="[
      'bg-gray-300 dark:bg-gray-700 animate-pulse',
      width,
      height,
      className
    ]"
  ></div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'text' | 'circle' | 'rectangle' | 'square' | 'line' | 'table' 
  width?: string
  height?: string
  lines?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'rectangle',
  width: 'w-full',
  height: 'h-4',
  lines: 1,
  className: ''
})
</script>
