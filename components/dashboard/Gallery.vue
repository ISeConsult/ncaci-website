<template>
    <div>
        <div class="mx-auto w-full px-4 py-6 sm:px-6 lg:w-full lg:px-8">
            <form class="mb-6">
                <FileInput v-model="formData.image" accept="image/*" label="Upload Images" class="w-full" />
                <Button
                    type="button"
                    @click="GallaryStore.addGallary(formData)"
                    :loading="loading"
                    class="mt-4"
                    >
                        Upload Image
                </Button>
            </form>
        </div>

        <!-- Display gallery images -->
        <div class="mx-auto w-full px-4 py-6 sm:px-6 lg:w-full lg:px-8">
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="items in gallaries" :key="items.id" class="group relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                    <img :src="items.image" alt="gallery" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer">
                    <button @click="GallaryStore.deleteGallary(items.uid)" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
                        <TrashIcon class="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileInput from '../UI/FileInput.vue';
import { useGallaryStore } from '~/stores/useGallaryStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import Button from '../UI/Button.vue';
import { TrashIcon } from '@heroicons/vue/24/outline';

const GallaryStore = useGallaryStore();
const { gallaries, loading } = storeToRefs(GallaryStore);

const formData = ref({
  image: null,
});



onMounted(() => {
  GallaryStore.fetchGallaries();
  console.log('gallary store data:', gallaries);
});
</script>

<style scoped>

</style>