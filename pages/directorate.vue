<template>
    <Navbar/>
    <DirectorateHeader/>
    <div class="bg-[#020ED1]">
        <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <!--Events-->
            <div class="grid md:grid-cols-7 gap-8">
                <div class="col-span-1 bg-white">
                    <ul class="flex items-center justify-center md:items-start md:justify-start md:flex-col flex-row md:space-y-4 space-x-4 md:space-x-0">
                        <li
                            v-for="item in filter"
                            :key="item.title"
                            :class="['cursor-pointer border-b border-blue-500 py-2 capitalize text-black pl-4 filter-item', { active: selectedFilter === item.value }]"
                            @click="selectedFilter = item.value"
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

    <!--Files-->
    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
            <div v-for="dir in filteredDiretorates" :key="dir.title" class="directorate-card bg-white border rounded-lg p-4 text-center hover:shadow-lg transition-shadow relative overflow-hidden">
                <h3 class="text-lg text-black font-semibold mb-2">{{ dir.title }}</h3>
                <p class="text-sm text-gray-600">{{ dir.type.toUpperCase() }}</p>
                <div class="download-slide bg-blue-500 flex cursor-pointer items-center justify-center p-2 transform translate-y-full hover:translate-y-0 transition-transform duration-300 rounded-b-lg">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                        </svg>
                    </span>
                    <p class="text-white mt-1">download</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../components/layouts/Navbar.vue'
import DirectorateHeader from '../components/media/DirectorateHeader.vue'
import DirectorateFilter from '../components/media/DirectorateFilter.vue'

import { ref, computed } from 'vue'

const diretorates = ref([
    {
        title: 'offering book',
        type: 'pdf',
    },
    {
        title: 'history',
        type: 'word',
    },
    {
        title: 'vision and mission',
        type: 'word',
    },
    {
        title: 'bylaws',
        type: 'pdf',
    },
    {
        title: 'annual report',
        type: 'pdf',
    },
    {
        title: 'constitution',
        type: 'word',
    },
    {
        title: 'policies',
        type: 'pdf',
    },
    {
        title: 'events',
        type: 'word',
    },
    {
        title: 'gallery',
        type: 'png',
    },
    {
        title: 'leadership',
        type: 'word',
    },
    {
        title: 'ministries',
        type: 'pdf',
    },
    {
        title: 'contact',
        type: 'excel',
    },
    {
        title: 'about',
        type: 'pdf',
    },
    {
        title: 'partners',
        type: 'word',
    },
    {
        title: 'nibalt',
        type: 'pdf',
    }
])

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

const selectedFilter = ref('all')

const filteredDiretorates = computed(() => {
    if (selectedFilter.value === 'all') {
        return diretorates.value
    }
    return diretorates.value.filter(dir => dir.type === selectedFilter.value)
})
</script>

<style scoped>
.directorate-card {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.filter-item {
    cursor: pointer;
    border-bottom: 2px solid #dde7f9;
    padding-bottom: 0.5rem;
    transition: border-color 0.3s;
}

.filter-item.active {
    border-color: #3b82f6;
    font-weight: 600;
    color: #3b82f6;
}
</style>
