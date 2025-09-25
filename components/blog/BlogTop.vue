<template>
    <div class="bg-[#e5e6f8]">
        <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid md:grid-cols-2 gap-8 section1-bg p-6">
                <div class="w-full h-[400px]">
                    <img src="/images/blog2.jpg" alt="blog" class="w-full h-full object-cover"></img>
                </div>
                <div>
                    <div class="flex items-center justify-between mb-6">
                        <p class="text-xs font-light text-left uppercase text1 mb-1">Tuesday 13 May, 2022</p>
                        <p class="text-sm font-light text-left uppercase text1 mb-1">By John DOE MENSAH</p>
                    </div>
                    <div>
                        <h1 class="text-4xl font-bold text-left uppercase text1 mb-4">Church was doing what he often did when dropped An oracle </h1>
                        <p class="text1 font-thin text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.</p>
                    </div>
                    <div class="mt-8">
                        <nuxt-link to="/" class="hover:text-blue-600 transition-colors duration-200">
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
                <div v-for="(item, index) in blogs" :key="index" class="section1-bg p-6 hover:border-b-8 hover:border-[#0110FA] transition-all duration-700">
                    <div class="mb-2">
                        <p class="text-xs font-bold text-left uppercase text-[#0110FA] mb-1">{{ item.category }}</p>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold text-left uppercase mb-4">
                            <nuxt-link :to="`/blog-detailed?id=${item.id}`" class="hover:text-blue-600 transition-colors duration-200">
                                {{ item.title }}
                            </nuxt-link>
                        </h1>
                    </div>
                    <div class="mb-10">
                        <p class="font-thin text-sm">{{ item.description }}</p>
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

</script>

<style lang="scss" scoped>

</style>