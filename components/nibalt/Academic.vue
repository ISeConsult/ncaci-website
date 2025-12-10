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
                <div v-for="(item, index) in courses.filter((course) => course.duration === '1_year')" :key="index" class="">
                    <div class="mb-4 bg-[#eaecfc] w-full p-6 cursor-pointer" @click="selectedCoursesIndex = selectedCoursesIndex === index ? null : index">
                        <h1 class="text-lg text-wrap md:text-nowrap font-bold text-left uppercase text-[#535995] mb-1">{{ item.title }}</h1>
                        <p v-if="selectedCoursesIndex === index" class="text-sm text-gray-700 mt-2">{{ item.description }}</p>
                        <!-- Start date, end date, duration, instructor -->
                        <div v-if="selectedCoursesIndex === index" class="mt-4 text-sm text-gray-600 space-y-3">
                            <!-- Start Date -->
                            <div v-if="item.start_date" class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-700"><span class="font-medium">Starts:</span> {{ item.start_date }}</p>
                            </div>
                            
                            <!-- End Date -->
                            <div v-if="item.end_date" class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-700"><span class="font-medium">Ends:</span> {{ item.end_date }}</p>
                            </div>
                            
                            <!-- Duration -->
                            <div v-if="item.duration" class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-700"><span class="font-medium">Duration:</span> {{formatDuration(item.duration) }}</p>
                            </div>
                            
                            <!-- Instructor -->
                            <div v-if="item.instructor" class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-700"><span class="font-medium">Instructor:</span> {{ item.instructor }}</p>
                            </div>
                        </div>
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
                <div v-for="(item, index) in courses.filter((course) => course.duration === '2_years')" :key="index" class="">
                    <div class="mb-4 bg-[#eaecfc] w-full p-6 cursor-pointer" @click="selectedCourseIndex = selectedCourseIndex === index ? null : index">
                        <h1 class="text-lg text-wrap md:text-nowrap font-bold text-left uppercase text-[#535995] mb-1">{{ item.title }}</h1>
                        <p v-if="selectedCourseIndex === index" class="text-sm text-gray-700 mt-2">{{ item.description }}</p>
                        <!-- Start date, end date, duration, instructor -->
                        <div v-if="selectedCourseIndex === index" class="mt-4 text-sm text-gray-600 space-y-3">
                            <!-- Start Date -->
                            <div v-if="item.start_date" class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-700"><span class="font-medium">Starts:</span> {{ item.start_date }}</p>
                            </div>
                            
                            <!-- End Date -->
                            <div v-if="item.end_date" class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-700"><span class="font-medium">Ends:</span> {{ item.end_date }}</p>
                            </div>
                            
                            <!-- Duration -->
                            <div v-if="item.duration" class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-700"><span class="font-medium">Duration:</span> {{formatDuration(item.duration) }}</p>
                            </div>
                            
                            <!-- Instructor -->
                            <div v-if="item.instructor" class="flex items-center gap-2">
                                <div class="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                                    <svg class="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <p class="text-sm text-gray-700"><span class="font-medium">Instructor:</span> {{ item.instructor }}</p>
                            </div>
                        </div>
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
import { useCourseStore } from '../../stores/useCourseStore'
import { storeToRefs } from 'pinia'

const CourseStore = useCourseStore()
const { courses } = storeToRefs(CourseStore)

const selectedCoursesIndex = ref(null)
const selectedCourseIndex = ref(null)

const formatDuration = (duration) => {
    if (!duration) return ''
    const parts = duration.split('_')
    if (parts.length !== 2) return duration
    return `${parts[0]} ${parts[1]}`
}

onMounted(() => {
    CourseStore.fetchCourses()
})
</script>

<style lang="scss" scoped>

</style>