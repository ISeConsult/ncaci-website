<template>
    <div class="relative z-10 flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-8 mb-20">
            <div class="relative h-[560px]">
                <img src="/images/about-vision.jpg" width="100%" height="100%" alt="vision" class="w-full h-full object-cover"></img>
            </div>
            <div>
                <p class="text-xs font-thin text-left uppercase text1 mb-4">{{ $t('about.vision.subtitle') }}</p>
                <h1 class="text-4xl font-bold text-left uppercase text1 mb-4">{{ $t('about.vision.missionTitle') }}<br/> function as a spiritual</h1>
                <p class="font-thin text-base mb-8">{{ $t('about.vision.missionDesc') }}</p>
                <h1 class="text-4xl font-bold text-left uppercase text1 mb-4">{{ $t('about.vision.visionTitle') }}</h1>
                <p class="font-thin text-base">
                    {{ $t('about.vision.visionDesc') }}
                </p>
            </div>
        </div>

        <!--Second Row-->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-8 mb-20">
            <div class="flex flex-col justify-center">
                <h1 class="text-4xl font-bold text-left uppercase text1 mb-46">{{ $t('about.vision.spiritualDirectionTitle') }}</h1>
                <p class="font-thin text-base mb-8">
                    {{ $t('about.vision.spiritualDirectionDesc') }}
                </p>
            </div>

            <div class="relative h-[500px]">
                <img src="/images/about1.jpg" width="100%" height="100%" alt="vision" class="w-full h-full object-cover"></img>
            </div>
        </div>

        <!--Third Row-->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-8">
            <div class="relative h-[500px]">
                <img src="/images/about2.jpg" width="100%" height="100%" alt="vision" class="w-full h-full object-cover"></img>
            </div>

            <div class="flex flex-col justify-center">
                <h1 class="text-4xl font-bold text-left uppercase text1 mb-6">{{ $t('about.vision.adversaryTitle') }}</h1>
                <p class="font-thin text-base mb-8">
                    {{ $t('about.vision.adversaryDesc') }}
                </p>
            </div>
        </div>

        <!--Fourth Row-->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mt-8">
            <div class="flex flex-col justify-center">
                <h1 class="text-4xl font-bold text-left uppercase text1 mb-8">{{ $t('about.vision.membershipTitle') }}</h1>
                <p class="font-thin text-base mb-4">
                    {{ $t('about.vision.membershipDesc1') }}
                </p>
                <p class="font-thin text-base mb-8">
                    {{ $t('about.vision.membershipDesc2') }}
                </p>
            </div>

            <div class="relative h-[500px]">
                <img src="/images/hero-slider4.jpg" width="100%" height="100%" alt="vision" class="w-full h-full object-cover"></img>
            </div>
        </div>

        <div class="flex flex-col justify-center items-center pt-24">
            <span class="text-xs font-thin text-center uppercase text1 mb-4">{{ $t('about.vision.beliefsSubtitle') }}</span>
            <h1 class="text-4xl font-bold text-center uppercase text1 mb-2 max-w-lg">{{ $t('about.vision.beliefsTitle') }}</h1>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>