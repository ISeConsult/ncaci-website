<template>
    <div class="bg-[#ffeded] pb-8">
        <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <div class="flex flex-col justify-center items-center pt-10">
                <span class="text-xs font-thin text-center uppercase text-black mb-4">{{ $t('stream.subtitle') }}</span>
                <h1 class="text-4xl font-bold text-center uppercase text-black mb-2 max-w-md">{{ $t('stream.title') }}</h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                <div v-for="(item, index) in stream" :key="index" class="relative h-64 overflow-hidden group cursor-pointer">
                    <!-- Background Image -->
                    <div
                      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      :style="{ backgroundImage: `url(${item.Image})` }"
                    ></div>

                    <!-- Content -->
                    <div class="relative z-10 flex h-full items-end justify-center px-6 pb-0 transform group-hover:-translate-y-20 transition-transform duration-300">
                      <div class="text-center text-white">
                        <!-- Main Heading -->
                        <h2 class="text-lg md:text-xl font-bold mb-2 text-left leading-none uppercase">
                          {{ item.title }}
                        </h2>
                      </div>
                    </div>

                    <!-- Description Overlay - Shown on hover -->
                    <div class="absolute bottom-0 left-0 right-0 z-20 bg-black bg-opacity-60 flex items-end justify-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div class="text-center text-white max-w-xs">
                        <p class="text-sm text-gray-200 text-left leading-relaxed py-2">
                          {{ item.description }}
                        </p>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const stream = [
    {
        title: t('stream.items[0].title'),
        description: t('stream.items[0].description'),
        Image: '/images/stream1.jpg'
    },
    {
        title: t('stream.items[1].title'),
        description: t('stream.items[1].description'),
        Image: '/images/stream2.jpg'
    },
    {
        title: t('stream.items[2].title'),
        description: t('stream.items[2].description'),
        Image: '/images/stream3.jpg'
    },
    {
        title: t('stream.items[3].title'),
        description: t('stream.items[3].description'),
        Image: '/images/stream4.jpg'
    },
]

</script>

<style scoped>
.bg-col {
    background-color: #ffeded !important;
    opacity: 9 !important;
}


</style>