<template>
  <div :class="[
    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm',
    {
      'hover:shadow-md transition-shadow duration-200': hover,
      'overflow-hidden': !noOverflow
    },
    className
  ]">
    <!-- Header -->
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <slot name="header">
        <h3 v-if="title" class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
      </slot>
    </div>

    <!-- Body -->
    <div :class="['p-6', { 'py-4': padded }]">
      <slot />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-700">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  hover?: boolean
  padded?: boolean
  noOverflow?: boolean
  className?: string
}

withDefaults(defineProps<Props>(), {
  hover: false,
  padded: true,
  noOverflow: false
})
</script>