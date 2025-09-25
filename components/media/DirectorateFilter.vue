<template>
    <div class="bg-[#020ED1]">
        <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!--Events-->
            <div class="grid grid-cols-7 gap-8">
                <div class="col-span-1 bg-white">
                    <ul class="flex flex-col">
                        <li 
                            v-for="item in filter" 
                            :key="item.title" 
                            class="cursor-pointer border-b border-blue-500 py-2 capitalize text-black pl-4"
                        >
                            {{ item.title }}
                        </li>
                    </ul>
                </div>
                <div class="col-span-6 flex justify-center items-center" style="background-image: url('/images/direct.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
                    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full text-white relative z-10">
                        <h1 class="text-2xl font-bold text-center uppercase mb-4">Download Church Resources | Stay Connected</h1>
                        <p class="text-base font-thin text-center uppercase text-white">
                            Find and download our weekly bulletins, event calendars, and important circulars. Everything you need to stay connected to our church family is right here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const filter = [
    {
        title: 'all',
        value: 'all',
    },
    {
        title: 'pdf',
        value: 'pdf',
    },
    {
        title: 'word',
        value: 'word',
    },
    {
        title: 'excel',
        value: 'excel',
    },
    {
        title: 'png',
        value: 'png',
    },
]

</script>

<style scoped>

</style>