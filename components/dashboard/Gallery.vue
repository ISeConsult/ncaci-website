<template>
    <div>
        <div class="mx-auto max-w-4xl">
            <FileInput v-model="files" accept="image/*" :multiple="true" />
        </div>

        <!-- Image Gallery -->
        <div v-if="files.length > 0" class="mt-8 px-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Uploaded Images</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div
                    v-for="file in files"
                    :key="file.id"
                    class="relative group"
                >
                    <NuxtImg
                        :src="getPreviewUrl(file)"
                        :alt="file.name"
                        class="w-full h-48 object-cover rounded-lg shadow-md"
                        loading="lazy"
                    />
                    <button
                        @click="removeFile(file.id)"
                        class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        title="Remove image"
                    >
                        <XMarkIcon class="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileInput from '../UI/FileInput.vue';
import { XMarkIcon } from '@heroicons/vue/24/outline'

const files = ref<any[]>([]);

const getPreviewUrl = (file: any) => {
  if (file.url) return file.url;
  if (file.file) return URL.createObjectURL(file.file);
  return '';
};

const removeFile = (id: string) => {
  files.value = files.value.filter(f => f.id !== id);
};
    
</script>

<style scoped>

</style>