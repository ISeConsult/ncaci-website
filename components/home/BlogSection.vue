<template>
    <div>
        <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div class="flex flex-col justify-center items-center pt-10">
                <span class="text-xs font-thin text-center uppercase text1 mb-4">read our blog</span>
                <h1 class="text-4xl font-bold text-center uppercase text1 mb-2 max-w-lg">share, inspire, innovate</h1>
            </div>

            <div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8">
                    <div v-for="(blog, index) in blogs" :key="index" class="blog-card flex items-start space-x-4 bg-[#ffeded] bg-opacity-80 p-6">
                        <div class="p-6">
                            <div class="flex mb-10">
                                <p class="text-sm font-bold text-left uppercase text-[#FF4949]">{{ blog.category }}</p>
                            </div>
                            <div>
                                <h2 class="text-2xl font-bold uppercase text-black mb-2">{{ blog.title }}</h2>
                            </div>
                            <div>
                                <p class="text-black font-normal text-sm">{{ blog.description }}</p>
                            </div>
                            <div class="mt-6">
                                <p class="text-xs font-semibold text-left capitalize text-black mb-1">by {{ blog.author }}</p>
                                <p class="text-xs font-semibold text-left capitalize text-black">{{ blog.date }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const blogs = [
    {
        category: 'relationship',
        title: 'How to be a better husband',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    },
    {
        category: 'love',
        title: 'Children of God',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    },
    {
        category: 'Theology',
        title: 'biblic teaching',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    },
    {
        category: 'Sermons',
        title: 'watch and listen to our sermons',
        author: 'michael addo',
        date: 'tuesday july 20, 2025',
        description: 'lorem1 ipsum dolor sit amet consectetur adipisicing elit. Vel, magni?',
    }
]

</script>

<style scoped>
.blog-card:hover {
  border-bottom: 8px solid #FF4949;
  transition: all 0.3s ease-in-out;
}
</style>
