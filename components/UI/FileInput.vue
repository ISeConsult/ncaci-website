<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Drop Zone -->
    <div
      :id="id"
      :class="[
        'relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer',
        {
          'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700': !isDragOver && !disabled,
          'border-blue-400 bg-blue-50': isDragOver,
          'border-red-300 bg-red-50': error,
          'border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-60': disabled
        }
      ]"
      @click="!disabled && $refs.fileInput?.click()"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <!-- Input (hidden) -->
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        @change="handleFileSelect"
      />

      <!-- Drop Zone Content -->
      <div class="text-center">
        <!-- Icon -->
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 mb-3">
          <CloudArrowUpIcon v-if="!isDragOver" class="h-6 w-6 text-gray-400 dark:text-gray-500" />
          <DocumentArrowDownIcon v-else class="h-6 w-6 text-blue-500" />
        </div>

        <!-- Text Content -->
        <div class="flex flex-col items-center justify-center text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-center">
            <span class="relative rounded-md bg-white dark:bg-gray-800 font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
              Upload a file
            </span>
            <span class="ml-1">or drag and drop</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ acceptText || `${accept || 'Any file'} up to ${maxSizeMB}MB` }}
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="uploading" class="mt-3">
          <div class="flex items-center justify-center space-x-2">
            <div class="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
            <span class="text-sm text-gray-600">Uploading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>

    <!-- Help Text -->
    <p v-if="helpText && !error" class="mt-1 text-sm text-gray-500">{{ helpText }}</p>

    <!-- File List -->
    <div v-if="files.length > 0" class="mt-4 space-y-3">
      <div
        v-for="(file, index) in files"
        :key="file.id"
        class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"
      >
        <!-- File Info -->
        <div class="flex items-center space-x-3 min-w-0 flex-1">
          <!-- File Icon -->
          <div class="flex-shrink-0">
            <FileIcon :file="file" class="h-8 w-8" />
          </div>

          <!-- File Details -->
          <div class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {{ file.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ formatFileSize(file.size) }}
              <span v-if="file.type">• {{ file.type }}</span>
            </p>
            <!-- Upload Progress -->
            <div v-if="file.uploading" class="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                class="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                :style="{ width: `${file.progress || 0}%` }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-2 ml-3">
          <!-- Preview Button (for images) -->
          <button
            v-if="isImageFile(file)"
            type="button"
            class="p-1 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-200"
            @click.stop="previewFile(file)"
            title="Preview"
          >
            <EyeIcon class="h-4 w-4" />
          </button>

          <!-- Download Button (for existing files) -->
          <button
            v-if="file.url"
            type="button"
            class="p-1 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-200"
            @click.stop="downloadFile(file)"
            title="Download"
          >
            <ArrowDownTrayIcon class="h-4 w-4" />
          </button>

          <!-- Remove Button -->
          <button
            type="button"
            class="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200"
            @click.stop="removeFile(index)"
            :disabled="disabled"
            title="Remove"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Image Preview Modal -->
    <UIModal
      v-model:isOpen="showPreviewModal"
      title="Image Preview"
      size="lg"
    >
      <div class="flex flex-col items-center p-4">
        <NuxtImg
          v-if="previewFileUrl"
          :src="previewFileUrl"
          alt="Preview"
          class="max-w-full max-h-96 object-contain rounded-lg"
        />
        <div class="mt-4 flex space-x-3">
          <UIButton variant="outline" @click="showPreviewModal = false">
            Close
          </UIButton>
          <UIButton variant="primary" @click="downloadPreviewFile">
            Download
          </UIButton>
        </div>
      </div>
    </UIModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  PhotoIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  MusicalNoteIcon
} from '@heroicons/vue/24/outline'

interface FileItem {
  id: string
  file?: File
  name: string
  size: number
  type: string
  url?: string
  uploading?: boolean
  progress?: number
}

interface Props {
  modelValue?: FileItem[] | FileList | File | null
  label?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  required?: boolean
  error?: string
  helpText?: string
  maxSizeMB?: number
  maxFiles?: number
  acceptText?: string
  uploading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  disabled: false,
  required: false,
  maxSizeMB: 10,
  maxFiles: 10,
  uploading: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: FileItem[] | File | null): void
  (e: 'change', files: FileItem[]): void
  (e: 'file-add', file: FileItem): void
  (e: 'file-remove', file: FileItem): void
  (e: 'file-error', error: string): void
}>()

const id = computed(() => `fileinput-${Math.random().toString(36).substr(2, 9)}`)
const isDragOver = ref(false)
const showPreviewModal = ref(false)
const previewFileUrl = ref('')
const previewFileItem = ref<FileItem | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref<FileItem[]>([])

// File type icon component
const FileIcon = {
  props: ['file'],
  setup(props: { file: FileItem }) {
    const getFileIcon = (file: FileItem) => {
      const type = file.type.split('/')[0]
      
      switch (type) {
        case 'image':
          return PhotoIcon
        case 'video':
          return VideoCameraIcon
        case 'audio':
          return MusicalNoteIcon
        default:
          return DocumentTextIcon
      }
    }

    const IconComponent = getFileIcon(props.file)
    
    return () => h(IconComponent, { class: 'text-gray-400' })
  }
}

// Handle file selection
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    processFiles(Array.from(input.files))
  }
  input.value = '' // Reset input to allow selecting same file again
}

// Handle drag over
const handleDragOver = (event: DragEvent) => {
  if (props.disabled) return
  event.preventDefault()
  isDragOver.value = true
}

// Handle drag leave
const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

// Handle drop
const handleDrop = (event: DragEvent) => {
  if (props.disabled) return
  event.preventDefault()
  isDragOver.value = false

  const droppedFiles = event.dataTransfer?.files
  if (droppedFiles && droppedFiles.length > 0) {
    processFiles(Array.from(droppedFiles))
  }
}

// Process selected files
const processFiles = (fileList: File[]) => {
  // Check max files limit
  if (props.maxFiles && files.value.length + fileList.length > props.maxFiles) {
    const errorMsg = `Maximum ${props.maxFiles} files allowed`
    emit('file-error', errorMsg)
    return
  }

  const newFiles: FileItem[] = []

  for (const file of fileList) {
    // Check file size
    if (file.size > props.maxSizeMB * 1024 * 1024) {
      const errorMsg = `File "${file.name}" exceeds maximum size of ${props.maxSizeMB}MB`
      emit('file-error', errorMsg)
      continue
    }

    // Check file type if accept is specified
    if (props.accept && !isFileTypeAccepted(file, props.accept)) {
      const errorMsg = `File type not allowed for "${file.name}"`
      emit('file-error', errorMsg)
      continue
    }

    const fileItem: FileItem = {
      id: generateFileId(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type || 'application/octet-stream',
      uploading: props.uploading,
      progress: 0
    }

    newFiles.push(fileItem)
    files.value.push(fileItem)
    emit('file-add', fileItem)
  }

  if (newFiles.length > 0) {
    updateModelValue()
  }
}

// Check if file type is accepted
const isFileTypeAccepted = (file: File, accept: string): boolean => {
  const acceptTypes = accept.split(',').map(type => type.trim())
  
  return acceptTypes.some(type => {
    if (type.startsWith('.')) {
      // Extension check
      return file.name.toLowerCase().endsWith(type.toLowerCase())
    } else {
      // MIME type check
      return file.type.match(new RegExp(type.replace('*', '.*')))
    }
  })
}

// Remove file
const removeFile = (index: number) => {
  if (props.disabled) return
  
  const removedFile = files.value[index]
  files.value.splice(index, 1)
  emit('file-remove', removedFile)
  updateModelValue()
}

// Update model value
const updateModelValue = () => {
  if (props.multiple) {
    emit('update:modelValue', files.value)
    emit('change', files.value)
  } else {
    const file = files.value.length > 0 ? files.value[0] : null
    emit('update:modelValue', file)
    emit('change', file ? [file] : [])
  }
}

// Preview file (for images)
const previewFile = (file: FileItem) => {
  if (file.url) {
    previewFileUrl.value = file.url
  } else if (file.file) {
    previewFileUrl.value = URL.createObjectURL(file.file)
  }
  previewFileItem.value = file
  showPreviewModal.value = true
}

// Download file
const downloadFile = (file: FileItem) => {
  if (file.url) {
    window.open(file.url, '_blank')
  } else if (file.file) {
    const url = URL.createObjectURL(file.file)
    const a = document.createElement('a')
    a.href = url
    a.download = file.name
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

// Download preview file
const downloadPreviewFile = () => {
  if (previewFileItem.value) {
    downloadFile(previewFileItem.value)
  }
}

// Check if file is an image
const isImageFile = (file: FileItem): boolean => {
  return file.type.startsWith('image/')
}

// Format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Generate unique file ID
const generateFileId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Initialize from modelValue
onMounted(() => {
  if (props.modelValue) {
    if (props.modelValue instanceof FileList) {
      processFiles(Array.from(props.modelValue))
    } else if (props.modelValue instanceof File) {
      processFiles([props.modelValue])
    } else if (Array.isArray(props.modelValue)) {
      files.value = [...props.modelValue]
    }
  }
})
</script>