<template>
    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h1 class="text-3xl font-bold text-left uppercase text1 mb-8 text-nowrap">
                    {{ $t('nibalt.faculty.title') }}
                </h1>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    {{ $t('nibalt.faculty.description') }}
                </p>
            </div>
            <div class="w-full h-[500px]">
                <img src="/images/about1.jpg" alt="faculty" class="w-full">
            </div>
        </div>

        <!--Board Section-->
        <div>
            <div>
                <h1 class="text-3xl font-bold text-left uppercase text1 mb-4 text-nowrap">{{ $t('nibalt.faculty.boardTitle') }}</h1>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    {{ $t('nibalt.faculty.boardDescription') }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <div v-if="staffs && staffs.length > 0" v-for="(item, index) in staffs.filter((staff) => staff.role === 'faculty')" :key="index" class="flex flex-col items-center justify-center bg-[#f5f2f0] p-6">
                    <div class="border w-36 h-36 rounded-full outline outline-2 outline-[#e5e7ff] flex items-center justify-center">
                        <img :src="item.image" :alt="item.name" class="w-36 h-36 rounded-full bg-cover" />
                    </div>
                    <div class="flex flex-col mt-4 items-center justify-center">
                        <h1 class="text-lg text-nowrap font-bold text-left uppercase text-black mb-1">{{ item.name }}</h1>
                        <p class="text-base font-thin text-center capitalize mb-2 text-black">
                            {{ item.position }}, NIBALT
                        </p>
                        <p class="text-sm font-thin text-center capitalize text-black">
                            {{ item.biography }}
                        </p>
                    </div>
                </div>

                <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 col-span-5">
                    <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-gray-500 text-lg font-medium">No Board Members found</p>
                    <p class="text-gray-400 text-sm mt-1">
                        There are no board members to display at the moment.
                    </p>
                </div>
            </div>
        </div>

        <!--Members Section-->
        <div class="mt-20">
            <div>
                <h1 class="text-3xl font-bold text-left uppercase text1 mb-4 text-nowrap">{{ $t('nibalt.faculty.membersTitle') }}</h1>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    {{ $t('nibalt.faculty.membersDescription') }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                <div v-if="staffs && staffs.length > 0" v-for="(item, index) in staffs.filter((staff) => staff.role === 'management_member')" :key="index" class="flex flex-col items-center justify-center bg-[#f5f2f0] p-6">
                    <div class="border w-36 h-36 rounded-full outline outline-2 outline-[#e5e7ff] flex items-center justify-center">
                        <img :src="item.image" :alt="item.name" class="w-36 h-36 rounded-full bg-cover" />
                    </div>
                    <div class="flex flex-col mt-4 items-center justify-center">
                        <h1 class="text-lg text-nowrap font-bold text-left uppercase mb-1 text-black">{{ item.name }}</h1>
                        <p class="text-base font-thin text-center capitalize mb-2 text-black">
                            {{ item.position }}, NIBALT
                        </p>
                        <p class="text-sm font-thin text-center capitalize text-black">
                            {{ item.biography }}
                        </p>
                    </div>
                </div>

                <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 col-span-5">
                    <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-gray-500 text-lg font-medium">No Faculty Members found</p>
                    <p class="text-gray-400 text-sm mt-1">
                        There are no faculty members to display at the moment.
                    </p>
                </div>
            </div>
        </div>

        <div>
            <p class="text-base font-light text-left capitalize leading-relaxed mt-8">
                {{ $t('nibalt.faculty.conclusion') }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStaffStore } from '../../stores/useStaffStore'

const StaffStore = useStaffStore()
const { staffs } = storeToRefs(StaffStore)

const board = [
    {
        name: 'Dr. Frank McAvor',
        image: '/images/cta1.jpg',
        position: 'President, NIBALT',
        desc: "A visionary leader with a PhD and extensive experience in ministry and academia"
    },
    {
        name: 'Rev. Emmanuel Amemaxa',
        image: '/images/cta1.jpg',
        position: 'Vice President, NIBALT',
        desc: "A seasoned minister with a strong background in philosophy and leadership"
    },
    {
        name: 'Rev. Akofa McAvor',
        image: '/images/cta1.jpg',
        position: 'Director of Finance, NIBALT:',
        desc: "An accomplished theologian with a keen sense of financial stewardship Church"
    },
    {
        name: 'Rev. Humphrey Gakpetor',
        image: '/images/cta1.jpg',
        position: 'Dean, NIBALT:',
        desc: "An experienced educator dedicated to academic excellence and spiritual growth"
    }
]

const members = [
    {
        name: 'Dr. Frank McAvor',
        image: '/images/cta1.jpg',
        position: 'President, NIBALT',
        desc: "A visionary leader with a PhD and extensive experience in ministry and academia"
    },
    {
        name: 'Rev. Emmanuel Amemaxa',
        image: '/images/cta1.jpg',
        position: 'Vice President, NIBALT',
        desc: "A seasoned minister with a strong background in philosophy and leadership"
    },
    {
        name: 'Rev. Akofa McAvor',
        image: '/images/cta1.jpg',
        position: 'Director of Finance, NIBALT:',
        desc: "An accomplished theologian with a keen sense of financial stewardship Church"
    },
    {
        name: 'Rev. Humphrey Gakpetor',
        image: '/images/cta1.jpg',
        position: 'Dean, NIBALT:',
        desc: "An experienced educator dedicated to academic excellence and spiritual growth"
    },
    {
        name: 'Dr. Frank McAvor',
        image: '/images/cta1.jpg',
        position: 'President, NIBALT',
        desc: "A visionary leader with a PhD and extensive experience in ministry and academia"
    },
    {
        name: 'Rev. Emmanuel Amemaxa',
        image: '/images/cta1.jpg',
        position: 'Vice President, NIBALT',
        desc: "A seasoned minister with a strong background in philosophy and leadership"
    },
    {
        name: 'Rev. Akofa McAvor',
        image: '/images/cta1.jpg',
        position: 'Director of Finance, NIBALT:',
        desc: "An accomplished theologian with a keen sense of financial stewardship Church"
    },
    {
        name: 'Rev. Humphrey Gakpetor',
        image: '/images/cta1.jpg',
        position: 'Dean, NIBALT:',
        desc: "An experienced educator dedicated to academic excellence and spiritual growth"
    }
]

onMounted(() => {
    StaffStore.fetchStaffs()
})
</script>

<style lang="scss" scoped>

</style>