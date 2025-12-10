<template>
    <Navbar/>
    <DetailedHeader :title="selectedBlog?.title || 'Blog'"/>

    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" v-if="selectedBlog">
        <div class="relative h-[500px] w-full">
            <img :src="selectedBlog.article_image" :alt="selectedBlog.title" class="w-full h-full object-cover"></img>
        </div>

        <!--Author, date and category-->
        <div class="flex justify-between items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
            <div>
                <p class="text-xs font-light text-left uppercase text1 mb-1">Tuesday 13 May, 2022</p>
            </div>
            <div>
                <p class="text-xs font-light text-left uppercase text1 mb-1">Created By: {{ selectedBlog.author }}</p>
            </div>
            <div>
                <p class="text-xs font-bold text-left uppercase text-[#0110FA] mb-1">{{ formatCategory(selectedBlog.category) }}</p>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="mb-4">
                <h1 class="text-4xl font-bold text-center uppercase text1 mb-4">{{ selectedBlog.title }}</h1>
            </div>
            <div class="mb-10">
                <p class="text1 font-thin text-base mb-4" v-html="selectedBlog.content"></p>
            </div>
            <div class="mb-6 space-y-6">
                <h1 class="text-4xl font-bold text-center uppercase text1 mb-4">{{ selectedBlog.title }}</h1>

                <!--Quote-->
                <div class=" mb-10 border-l-2 pl-4 border-[#0110FA]">
                    <h3 class="text1 font-semibold text-base" >
                        {{ selectedBlog.quote }}
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia';
import { useNewsStore } from '~/stores/useNewsStore';
import Navbar from '../components/layouts/Navbar.vue'
import DetailedHeader from '../components/blog/DetailedHeader.vue';

const route = useRoute()
const NewsStore = useNewsStore();
const { news } = storeToRefs(NewsStore);

const blogUid = route.params.uid
const selectedBlog = computed(() => news.value.find(blog => blog.uid === blogUid) || news.value[0])

const formatCategory = (category) => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

onMounted(() => {
    NewsStore.fetchNews();
});
</script>

<style scoped>

</style>
