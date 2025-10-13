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
                <div v-for="(item, index) in board" :key="index" class="flex flex-col items-center justify-center bg-[#f5f2f0] p-6">
                    <div class="border w-36 h-36 rounded-full outline outline-2 outline-[#e5e7ff] flex items-center justify-center">
                        <img :src="item.image" :alt="item.name" class="w-36 h-36 rounded-full bg-cover" />
                    </div>
                    <div class="flex flex-col mt-4 items-center justify-center">
                        <h1 class="text-lg text-nowrap font-bold text-left uppercase text-black mb-1">{{ item.name }}</h1>
                        <p class="text-base font-thin text-center capitalize mb-2 text-black">
                            {{ item.position }}
                        </p>
                        <p class="text-sm font-thin text-center capitalize text-black">
                            {{ item.desc }}
                        </p>
                    </div>
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
                <div v-for="(item, index) in members" :key="index" class="flex flex-col items-center justify-center bg-[#f5f2f0] p-6">
                    <div class="border w-36 h-36 rounded-full outline outline-2 outline-[#e5e7ff] flex items-center justify-center">
                        <img :src="item.image" :alt="item.name" class="w-36 h-36 rounded-full bg-cover" />
                    </div>
                    <div class="flex flex-col mt-4 items-center justify-center">
                        <h1 class="text-lg text-nowrap font-bold text-left uppercase mb-1 text-black">{{ item.name }}</h1>
                        <p class="text-base font-thin text-center capitalize mb-2 text-black">
                            {{ item.position }}
                        </p>
                        <p class="text-sm font-thin text-center capitalize text-black">
                            {{ item.desc }}
                        </p>
                    </div>
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
</script>

<style lang="scss" scoped>

</style>