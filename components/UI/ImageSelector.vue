<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
    </label>

    <!-- Image Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="[
          'relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-200',
          {
            'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-800': isSelected(image),
            'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500': !isSelected(image)
          }
        ]"
        @click="selectImage(image)"
      >
        <!-- Image -->
        <NuxtImg
          :src="image.src"
          :alt="image.alt || `Image ${index + 1}`"
          class="w-full h-24 object-cover"
          loading="lazy"
        />

        <!-- Selection Indicator -->
        <div
          v-if="isSelected(image)"
          class="absolute top-2 right-2 w-5 h-5 bg-blue-500 dark:bg-blue-400 rounded-full flex items-center justify-center"
        >
          <CheckIcon class="w-3 h-3 text-white" />
        </div>

        <!-- Image Label -->
        <div
          v-if="image.label"
          class="absolute bottom-0 left-0 right-0 bg-black dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-70 text-white text-xs p-1 truncate"
        >
          {{ image.label }}
        </div>

        <!-- Hover Overlay -->
        <div
          class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200"
        />
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>

    <!-- No Images Message -->
    <div
      v-if="images.length === 0"
      class="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
    >
      <PhotoIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
      <p class="mt-2 text-sm">No images available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, PhotoIcon } from '@heroicons/vue/24/outline'

interface Image {
  src: string
  alt?: string
  label?: string
  value?: any
}

interface Props {
  modelValue?: any
  images: Image[]
  label?: string
  error?: string
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
  multiple: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const id = computed(() => `imageselect-${Math.random().toString(36).substr(2, 9)}`)
const selectedValues = ref<any[]>([])

// Initialize from modelValue
if (props.modelValue) {
  if (props.multiple && Array.isArray(props.modelValue)) {
    selectedValues.value = [...props.modelValue]
  } else {
    selectedValues.value = [props.modelValue]
  }
}

const isSelected = (image: Image) => {
  const value = image.value || image.src
  return selectedValues.value.includes(value)
}

const selectImage = (image: Image) => {
  const value = image.value || image.src
  
  if (props.multiple) {
    const index = selectedValues.value.indexOf(value)
    if (index > -1) {
      selectedValues.value.splice(index, 1)
    } else {
      selectedValues.value.push(value)
    }
  } else {
    selectedValues.value = [value]
  }
  
  emit('update:modelValue', props.multiple ? [...selectedValues.value] : value)
}
</script>