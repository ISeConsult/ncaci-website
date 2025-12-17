<template>
    <div>
        <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div class="flex flex-col justify-center items-center pt-10">
                <span class="text-xs font-thin text-center uppercase text1 mb-4">{{ $t('blog.subtitle') }}</span>
                <h1 class="text-4xl font-bold text-center uppercase text1 mb-2 max-w-lg">{{ $t('blog.title') }}</h1>
            </div>

            <div>
                <div v-if="news && news.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8">
                    <div v-for="blog in news.slice(0, 4)" :key="blog.title" class="blog-card flex items-start space-x-4 bg-[#ffeded] bg-opacity-80 p-6">
                        <div class="p-6">
                            <div class="flex mb-10">
                                <p class="text-sm font-bold text-left uppercase text-[#FF4949]">{{ formatCategory(blog.category) }}</p>
                            </div>
                            <div>
                                <Nuxt-link :to="$localePath(`/blog/${blog.uid}`)" class="text-2xl font-bold text-left uppercase mb-4 hover:text-blue-600 transition-colors duration-200">
                                    <h2 class="text-xl font-bold uppercase text-black mb-2 hover:text-blue-600">{{ blog.title }}</h2>
                                </Nuxt-link>
                            </div>
                            <div>
                                <p class="text-black font-normal text-sm truncate" v-html="blog.content"></p>
                            </div>
                            <div class="mt-6">
                                <p class="text-xs font-semibold text-left capitalize text-black mb-1">by {{ blog.author }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 w-full">
                    <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-gray-500 text-lg font-medium">No Blogs found</p>
                    <p class="text-gray-400 text-sm mt-1">
                        There are no blogs to display at the moment.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useNewsStore } from '@/stores/useNewsStore';
import { storeToRefs } from 'pinia';

const NewsStore = useNewsStore();
const { news } = storeToRefs(NewsStore);

const { locale } = useI18n();

// Function to format category
const formatCategory = (category) => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

onMounted(() => {
  NewsStore.fetchNews();
  console.log('News loaded:', news);
});
</script>

<style scoped>
.blog-card:hover {
  border-bottom: 8px solid #FF4949;
  transition: all 0.3s ease-in-out;
}
</style>
