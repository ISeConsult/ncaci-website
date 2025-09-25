<template>
    <Navbar/>
    <DetailedHeader/>

    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" v-if="selectedBlog">
        <div class="relative h-[500px] w-full">
            <img src="/images/blog3.jpg" :alt="selectedBlog.title" class="w-full h-full object-cover"></img>
        </div>
        <div class="flex flex-col justify-center items-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="mb-4">
                <h1 class="text-4xl font-bold text-center uppercase text1 mb-4">{{ selectedBlog.title }}</h1>
            </div>
            <div class="mb-10">
                <p class="text1 font-thin text-base mb-4">
                    {{ selectedBlog.description }}
                </p>
                <p class="text1 font-thin text-base">
                    Aenean vel elit scelerisque mauris. Imperdiet sed euismod nisi porta lorem mollis aliquam. Quis vel eros donec ac odio tempor orci dapibus ultrices. Elementum eu facilisis sed odio morbi. Nam at lectus urna duis convallis convallis tellus id. Feugiat pretium nibh ipsum consequat nisl vel. Elementum pulvinar etiam non quam lacus. Sit amet porttitor eget.
                </p>
            </div>
            <div class="relative h-[500px] w-full mb-10">
                <img src="/images/blog4.jpg" :alt="selectedBlog.title" class="w-full h-full object-cover"></img>
            </div>
            <div class="mb-6 space-y-6"> 
                <h1 class="text-4xl font-bold text-center uppercase text1 mb-4">{{ selectedBlog.title }}</h1>
                <p class="text1 font-thin text-base">
                    Aenean vel elit scelerisque mauris. Imperdiet sed euismod nisi porta lorem mollis aliquam. Quis vel eros donec ac odio tempor orci dapibus ultrices. Elementum eu facilisis sed odio morbi. Nam at lectus urna duis convallis convallis tellus id. Feugiat pretium nibh ipsum consequat nisl vel. Elementum pulvinar etiam non quam lacus. Sit amet porttitor eget.
                </p>

                <!--Quote-->
                <div class=" mb-10 border-l-2 pl-4 border-[#0110FA]">
                    <h3 class="text1 font-semibold text-base" >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui faucibus in ornare quam viverra orci sagittis eu volutpat.
                    </h3>
                </div>
                <p class="text1 font-thin text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida.
                </p>
            </div>
            <div class="mb-10 space-y-6">
                <h1 class="text-4xl font-bold text-left uppercase text1 mb-4">LOREM IPSUM DOLOR SIT AMET CONSECTETUR</h1>
                <p class="text1 font-thin text-base">
                    We both celebrate and challenge the culture around us as we orient our lives around Jesus. We want to serve the world around us. It’s why we support mission work all across the globe Regardless of what your next step in faith is, we want to help you take that next step Our church is10% of our annual income to
                </p>

                <ul class="list-disc list-inside text1 font-thin text-base">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
                    <li>Purus sit amet luctus venenatis lectus magna</li>
                    <li>Aenean vel elit scelerisque mauris. Imperdiet sed euismod</li>
                </ul>

                <p class="text1 font-thin text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida.
                </p>
                <p class="text1 font-thin text-base">
                    Saepe magni aut maxime vel voluptatem. Ab eveniet neque placeat qui porro ab minus voluptas. Dicta praesentium neque vero mollitia aperiam sed enim. Lacinia quis vel eros donec ac odio.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from '../components/layouts/Navbar.vue'
import DetailedHeader from '../components/blog/DetailedHeader.vue';

const blogs = [
    {
        id: 1,
        category: 'relationship',
        title: 'THE BEST WAY TO INSPIRE PEOPLE',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    },
    {
        id: 2,
        category: 'love',
        title: 'HOW TO SHOW COMPASSION',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    },
    {
        id: 3,
        category: 'Theology',
        title: 'THE BIBLICAL PURPOSE OF MONEY',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    },
    {
        id: 4,
        category: 'discipleship',
        title: 'WHAT IT MEANS TO BE A DISCIPLE',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    },
    {
        id: 5,
        category: 'belief',
        title: 'WHAT IT MEANS TO BELIEVE',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    },
    {
        id: 6,
        category: 'Sermons',
        title: 'WATCH AND LISTEN TO OUR SERMONS',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    }
]

const route = useRoute()
const blogId = Number(route.query.id)
const selectedBlog = blogs.find(blog => blog.id === blogId) || blogs[0]

</script>

<style scoped>

</style>