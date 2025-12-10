<template>
  <!-- Text variant - for multi-line text content -->
  <div v-if="variant === 'text'" class="w-full">
    <div
      v-for="line in lines"
      :key="line"
      :class="[
        'skeleton-base skeleton-animation',
        'rounded-md',
        lineClasses[line - 1] || 'w-full',
        height,
        'mb-3 last:mb-0',
        className
      ]"
    ></div>
  </div>

  <!-- Circle variant - for avatars, icons -->
  <div
    v-else-if="variant === 'circle'"
    :class="[
      'skeleton-base skeleton-animation',
      'rounded-full',
      width || 'w-12',
      height || 'h-12',
      className
    ]"
  ></div>

  <!-- Rectangle variant - for cards, images -->
  <div
    v-else-if="variant === 'rectangle'"
    :class="[
      'skeleton-base skeleton-animation',
      'rounded-lg',
      width || 'w-full',
      height || 'h-32',
      className
    ]"
  ></div>

  <!-- Square variant - for thumbnails -->
  <div
    v-else-if="variant === 'square'"
    :class="[
      'skeleton-base skeleton-animation',
      'rounded-md',
      width || 'w-24',
      height || 'h-24',
      className
    ]"
  ></div>

  <!-- Line variant - for single line elements -->
  <div
    v-else-if="variant === 'line'"
    :class="[
      'skeleton-base skeleton-animation',
      'rounded-md',
      width || 'w-full',
      height || 'h-4',
      className
    ]"
  ></div>

  <!-- Table variant - for table rows -->
  <div
    v-else-if="variant === 'table'"
    :class="[
      'skeleton-base skeleton-animation',
      'rounded-md',
      width || 'w-full',
      height || 'h-12',
      className
    ]"
  ></div>

  <!-- Custom variant - for complex layouts -->
  <div
    v-else-if="variant === 'custom'"
    :class="[
      'skeleton-base skeleton-animation',
      'rounded-md',
      width,
      height,
      className
    ]"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'text' | 'circle' | 'rectangle' | 'square' | 'line' | 'table' | 'custom'
  width?: string
  height?: string
  lines?: number
  className?: string
  randomWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'rectangle',
  width: '',
  height: '',
  lines: 3,
  className: '',
  randomWidth: false
})

// Generate random widths for text lines (last line usually shorter)
const lineClasses = computed(() => {
  if (!props.randomWidth || props.variant !== 'text') return []
  
  const widths = []
  for (let i = 0; i < props.lines; i++) {
    if (i === props.lines - 1) {
      // Last line is usually shorter
      widths.push(`w-${Math.floor(Math.random() * 3 + 3)}/12`)
    } else {
      widths.push(`w-${Math.floor(Math.random() * 4 + 8)}/12`)
    }
  }
  return widths
})

// Add styles to global CSS or your component's style tag
const skeletonStyles = `
.skeleton-base {
  background: linear-gradient(
    90deg,
    rgba(229, 231, 235, 0.8) 25%,
    rgba(209, 213, 219, 0.8) 37%,
    rgba(229, 231, 235, 0.8) 63%
  );
  background-size: 400% 100%;
}

.dark .skeleton-base {
  background: linear-gradient(
    90deg,
    rgba(55, 65, 81, 0.8) 25%,
    rgba(75, 85, 99, 0.8) 37%,
    rgba(55, 65, 81, 0.8) 63%
  );
  background-size: 400% 100%;
}

.skeleton-animation {
  animation: skeleton-wave 1.6s ease-in-out infinite;
}

@keyframes skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`
</script>

<style scoped>
/* Include the styles locally */
.skeleton-base {
  background: linear-gradient(
    90deg,
    rgba(229, 231, 235, 0.8) 25%,
    rgba(209, 213, 219, 0.8) 37%,
    rgba(229, 231, 235, 0.8) 63%
  );
  background-size: 400% 100%;
}

.dark .skeleton-base {
  background: linear-gradient(
    90deg,
    rgba(55, 65, 81, 0.8) 25%,
    rgba(75, 85, 99, 0.8) 37%,
    rgba(55, 65, 81, 0.8) 63%
  );
  background-size: 400% 100%;
}

.skeleton-animation {
  animation: skeleton-wave 1.6s ease-in-out infinite;
}

@keyframes skeleton-wave {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>