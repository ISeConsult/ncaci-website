<template>
    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img src="/images/about2.jpg" alt="nibalt history" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col justify-center">
                <h1 class="text-3xl font-bold text-left uppercase text1 mb-8 text-nowrap" v-html="$t('nibalt.academic.header')"></h1>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    {{ $t('nibalt.academic.description') }}
                </p>
            </div>
        </div>

        <!--Causes1 Section-->
        <div class="mt-20">
            <div>
                <h1 class="text-lg font-bold text-left uppercase text1 mb-2 text-nowrap">{{ $t('nibalt.academic.programs') }}</h1>
                <h3 class="text-md font-bold text-left uppercase text-[#535995] mb-2 text-nowrap">{{ $t('nibalt.academic.certificateTitle') }}</h3>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    {{ $t('nibalt.academic.certificateDesc') }}
                </p>
            </div>
            <div class="grid grid-cols-1 mt-8 w-full">
                <h1 class="text-md font-bold text-left uppercase text1 mb-2 text-nowrap">{{ $t('nibalt.academic.courses') }}</h1>
                <div v-for="(item, index) in courses" :key="index" class="">
                    <div class="mb-4 bg-[#eaecfc] w-full p-6 cursor-pointer" @click="selectedCoursesIndex = selectedCoursesIndex === index ? null : index">
                        <h1 class="text-lg text-wrap md:text-nowrap font-bold text-left uppercase text-[#535995] mb-1">{{ item.title }}</h1>
                        <p v-if="selectedCoursesIndex === index" class="text-sm text-gray-700 mt-2">{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!--Causes1 Section-->
        <div class="mt-20">
            <div>
                <h3 class="text-md font-bold text-left uppercase text-[#535995] mb-2 text-nowrap">{{ $t('nibalt.academic.diplomaTitle') }}</h3>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    {{ $t('nibalt.academic.diplomaDesc') }}
                </p>
            </div>
            <div class="grid grid-cols-1 mt-8 w-full">
                <h1 class="text-md font-bold text-left uppercase text1 mb-2 text-nowrap">{{ $t('nibalt.academic.courses') }}</h1>
                <div v-for="(item, index) in course" :key="index" class="">
                    <div class="mb-4 bg-[#eaecfc] w-full p-6 cursor-pointer" @click="selectedCourseIndex = selectedCourseIndex === index ? null : index">
                        <h1 class="text-lg text-wrap md:text-nowrap font-bold text-left uppercase text-[#535995] mb-1">{{ item.title }}</h1>
                        <p v-if="selectedCourseIndex === index" class="text-sm text-gray-700 mt-2">{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 items-start justify-start">
            <h1 class="text-xl font-bold text-left uppercase text1 mb-2 text-nowrap">{{ $t('nibalt.academic.learningModes') }}</h1>
            <p class="text-base font-light text-left capitalize leading-relaxed">
                {{ $t('nibalt.academic.learningDesc') }}
            </p>
            <p class="text-base font-light text-left capitalize leading-relaxed">
                <span class="font-bold">{{ $t('nibalt.academic.hybridLearning') }}</span>: {{ $t('nibalt.academic.hybridDesc') }}
            </p>
            <p class="text-base font-light text-left capitalize leading-relaxed">
                <span class="font-bold">{{ $t('nibalt.academic.sandwichCourses') }}</span>: {{ $t('nibalt.academic.sandwichDesc') }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedCoursesIndex = ref(null)
const selectedCourseIndex = ref(null)

const courses = [
    {
        title: 'church management and administration',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'old testament survey',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'new testament survey',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'christology',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'hamartiology',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'bibliology',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'soteology',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'evangelism',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    }
]

const course = [
    {
        title: 'all causes from the certificate program',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'pastorial theology',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'church history',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'angelology & demonology',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'communication',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'bibliology',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'soteology',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'major & minor prophets',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    }
]
</script>

<style lang="scss" scoped>

</style>