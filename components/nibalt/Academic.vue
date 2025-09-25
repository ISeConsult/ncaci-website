<template>
    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img src="/images/about2.jpg" alt="nibalt history" class="w-full h-full object-contain" />
            </div>
            <div class="flex flex-col justify-center">
                <h1 class="text-3xl font-bold text-left uppercase text1 mb-8 text-nowrap">academic programs<br/> at nibalt</h1>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    At NIBALT, we are committed to providing a comprehensive and enriching learning experience that equips students to serve as effective leaders in ministry and other fields of endeavor. Our academic programs are designed to combine biblical truth, academic excellence, and practical training, ensuring students are well-prepared for impactful service locally and globally.
                </p>
            </div>
        </div>

        <!--Causes1 Section-->
        <div class="mt-20">
            <div>
                <h1 class="text-lg font-bold text-left uppercase text1 mb-2 text-nowrap">programs</h1>
                <h3 class="text-md font-bold text-left uppercase text-[#535995] mb-2 text-nowrap">one-year certificate program (2 semesters)</h3>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    This foundational program provides a solid introduction to key theological and ministerial disciplines. It is perfect for individuals seeking to deepen their biblical knowledge and develop practical ministry skills.
                </p>
            </div>
            <div class="grid grid-cols-1 mt-8 w-full">
                <h1 class="text-md font-bold text-left uppercase text1 mb-2 text-nowrap">courses</h1>
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
                <h3 class="text-md font-bold text-left uppercase text-[#535995] mb-2 text-nowrap">two-year diploma program (4 semesters)</h3>
                <p class="text-base font-light text-left capitalize leading-relaxed">
                    This foundational program provides a solid introduction to key theological and ministerial disciplines. It is perfect for individuals seeking to deepen their biblical knowledge and develop practical ministry skills.
                </p>
            </div>
            <div class="grid grid-cols-1 mt-8 w-full">
                <h1 class="text-md font-bold text-left uppercase text1 mb-2 text-nowrap">courses</h1>
                <div v-for="(item, index) in course" :key="index" class="">
                    <div class="mb-4 bg-[#eaecfc] w-full p-6 cursor-pointer" @click="selectedCourseIndex = selectedCourseIndex === index ? null : index">
                        <h1 class="text-lg text-wrap md:text-nowrap font-bold text-left uppercase text-[#535995] mb-1">{{ item.title }}</h1>
                        <p v-if="selectedCourseIndex === index" class="text-sm text-gray-700 mt-2">{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 items-start justify-start">
            <h1 class="text-xl font-bold text-left uppercase text1 mb-2 text-nowrap">learning modes</h1>
            <p class="text-base font-light text-left capitalize leading-relaxed">
                We understand the diverse needs of our students and offer flexible learning options:
            </p>
            <p class="text-base font-light text-left capitalize leading-relaxed">
                <span class="font-bold">Hybrid Learning</span>: A blend of in-person and online lectures for a well-rounded academic experience
            </p>
            <p class="text-base font-light text-left capitalize leading-relaxed">
                <span class="font-bold">Sandwich Courses</span>: Tailored short courses during long vacations for tertiary students, including subjects like Evangelism, Church Administration, Counseling, and Christology.
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