<template>
  <div class="w-full">
    <!-- Tab List -->
    <div >
      <nav class="-mb-px flex space-x-6 overflow-x-auto whitespace-nowrap scroll-smooth" ref="navRef">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="[
            'whitespace-nowrap py-2 px-1 sm:py-1 sm:px-0.5 border-b-2 font-medium text-sm sm:text-xs',
            {
              'border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400': modelValue === index,
              'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600': modelValue !== index
            }
          ]"
          @click="selectTab(index)"
        >
          {{ tab }}
        </button>
      </nav>
    </div>

    <!-- Tab Panels -->
    <div class="mt-4 sm:mt-2">
      <slot :name="`tab-${modelValue}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Props {
  tabs: string[]
  modelValue: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const navRef = ref<HTMLElement>()

const selectTab = (index: number) => {
  emit('update:modelValue', index)
  nextTick(() => {
    const buttons = navRef.value?.querySelectorAll('button')
    if (buttons && buttons[index]) {
      buttons[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  })
}
</script>

<style scoped>
nav::-webkit-scrollbar {
  display: none;
}
nav {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
