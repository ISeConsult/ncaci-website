<template>
    <Navbar />
    <Header :title="selectedBlog?.title || 'Blog'"/>
    <div class="bg-[#e5e6f8]">
        <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid md:grid-cols-2 gap-8 section1-bg p-6">
                <div class="w-full h-[400px]">
                    <img :src="news[0]?.article_image" alt="blog" class="w-full h-full object-cover"></img>
                </div>
                <div>
                    <div class="flex items-center justify-between mb-6">
                        <p class="text-xs font-light text-left uppercase text1 mb-1">Tuesday 13 May, 2022</p>
                        <p class="text-sm font-light text-left uppercase text1 mb-1">By {{ news[0]?.author }}</p>
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold text-left uppercase text1 mb-4">{{ news[0]?.title }}</h1>
                        <p class="text1 font-thin text-base" v-html="news[0]?.content"></p>
                    </div>
                    <div class="mt-8">
                        <nuxt-link :to="`/blog/${news[0]?.uid}`" class="hover:text-blue-600 transition-colors duration-200">
                            READ MORE
                        </nuxt-link>
                    </div>
                </div>
            </div>

            <!--Blog Cards-->
            <div class="flex flex-col justify-center items-center py-6">
                <h1 class="text-lg md:text-4xl font-bold text-left uppercase text-black">ALL BLOG POSTS</h1>
            </div>

            <!--Cards-->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div v-for="(item, index) in news" :key="index" class="section1-bg p-6 hover:border-b-8 hover:border-[#0110FA] transition-all duration-700">
                    <div class="mb-2">
                        <p class="text-xs font-bold text-left uppercase text-[#0110FA] mb-1">{{ formatCategory(item.category) }}</p>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-left uppercase mb-4">
                            <nuxt-link :to="`/blog/${item.uid}`" class="hover:text-blue-600 transition-colors duration-200">
                                {{ item.title }}
                            </nuxt-link>
                        </h1>
                    </div>
                    <div class="mb-10">
                        <p class="font-thin text-sm truncate" v-html="item.content"></p>
                    </div>

                    <div>
                        <p class="text-xs font-light text-left capitalize mb-1">by {{ item.author }}</p>
                        <p class="text-xs font-light text-left capitalize mb-1">Tuesday 13 May, 2022</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useNewsStore } from '~/stores/useNewsStore';
import Navbar from '../components/layouts/Navbar.vue'
import Header from '../components/blog/Header.vue';

const NewsStore = useNewsStore();
const { news } = storeToRefs(NewsStore);

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

<style lang="scss" scoped>

</style>