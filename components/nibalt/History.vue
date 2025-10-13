<template>
    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="w-full h-[400px]">
                <img src="/images/history.jpg" alt="nibalt history" class="w-full h-full object-contain" />
            </div>
            <div>
                <div class="flex flex-col justify-center mb-10">
                    <h1 class="text-4xl font-bold text-left uppercase text1 mb-6">{{ $t('nibalt.history.title') }}</h1>
                </div>
                <div class="flex flex-col justify-center space-y-8">
                    <p class="text-sm font-thin text-left capitalize">
                        {{ $t('nibalt.history.paragraph1') }}
                    </p>
                    <p class="text-sm font-thin text-left capitalize">
                        {{ $t('nibalt.history.paragraph2') }}
                    </p>
                </div>
            </div>
        </div>

        <!--Graduation Section-->
        <div class="mt-20 relative">
            <div class="w-full relative h-[600px]">
                <img src="/images/graduation.jpg" alt="graduation" class="w-full h-full object-cover" />
            </div>
            <div class="absolute bottom-0 right-0 py-4 w-full">
                <p class="text-[50px] font-bold text-center uppercase text-white relative z-50">{{ $t('nibalt.history.graduations') }}</p>
            </div>
            <div class="bg-black inset-0 opacity-50 absolute"></div>
        </div>

        <!--Values Section-->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
            <div class="w-full h-[500px]">
                <img src="/images/values.jpg" alt="nibalt history" class="w-full h-full object-contain" />
            </div>
            <div>
                <div class="flex flex-col justify-center mb-6">
                    <h1 class="text-4xl font-bold text-left uppercase text1">{{ $t('nibalt.history.coreValuesTitle') }}</h1>
                </div>
                <div class="flex flex-col justify-center space-y-8">
                    <p class="text-sm font-thin text-left capitalize">
                        {{ $t('nibalt.history.coreValuesPara1') }}
                    </p>
                    <p class="text-sm font-thin text-left capitalize">
                        {{ $t('nibalt.history.coreValuesPara2') }}
                    </p>
                    <p class="text-sm font-thin text-left capitalize">
                        {{ $t('nibalt.history.coreValuesPara3') }}
                    </p>
                </div>
            </div>
        </div>

        <!--Mission Section-->
        <div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
                <div v-for="(item, index) in missions" :key="index">
                    <div class="border p-6 h-60 bg-[#e5e7ff] cursor-pointer">
                        <h1 class="text-2xl font-bold text-left uppercase text-black mb-6">{{ item.title }}</h1>
                        <p class="text-sm font-thin text-left capitalize text-black">
                            {{ item.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const missions = [
    {
        title: $t('nibalt.history.missions.missionStatement.title'),
        desc: $t('nibalt.history.missions.missionStatement.desc')
    },
    {
        title: $t('nibalt.history.missions.visionStatement.title'),
        desc: $t('nibalt.history.missions.visionStatement.desc')
    },
    {
        title: $t('nibalt.history.missions.motto.title'),
        desc: $t('nibalt.history.missions.motto.desc')
    }
]

</script>

<style scoped>

</style>