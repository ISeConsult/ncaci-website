<template>
    <div class="relative py-10" style="background-image: url('/images/cta-bg.jpg'); background-size: cover; background-position: center">
        <div class="absolute inset-0 bg-[#e8a663]  opacity-30"></div>
        <div class="relative z-10 grid md:grid-cols-2 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 backdrop-blur-md bg-white/10 border border-white/20 border-b-8 border-b-[#F80000]">
            <div class="flex flex-col md:justify-start md:items-start space-y-6">
                <h1 class="text-4xl font-bold text-center md:text-left uppercase text-black mb-2 leading-relaxed">new covenant<br/> institution of bible &<br/> advanced leadership<br/> training - nibalt</h1>
                <p class="text-sm font-thin md:text-left capitalize text-white">Admission ongoing for the 2025/2026 academic year.<br/> For more information call 0246411587 / 0247543762/ 0541399801</p>
                <Button size="xl" @click="openModal">
                    START HERE
                </Button>
            </div>
            <div class="hidden md:grid lg:grid-cols-2 gap-4">
                <div class="relative">
                    <img src="/images/cta1.jpg" class="w-full h-96 bg-contain relative" alt="cta"></img>
                    <div class="absolute bottom-0 right-0 py-4 w-full">
                        <p class="text-sm font-bold text-center uppercase text-white relative z-50">two years diploma</p>
                        <div class="absolute inset-0 bg-black  opacity-80"></div>
                    </div>
                </div>
                <div class="relative">
                    <img src="/images/cta2.jpg" class="w-full h-full bg-contain" alt="cta"></img>
                    <div class="absolute bottom-0 right-0 py-4 w-full">
                        <p class="text-sm font-bold text-center uppercase text-white relative z-50">one year certificate</p>
                        <div class="absolute inset-0 bg-black  opacity-80"></div>
                    </div>
                </div>
            </div>
        </div>

        <Modal v-model:is-open="isModalOpen" title="Register A Course" size="2xl" @close="closeModal">
        <form @submit.prevent="submitForm">
            <div class="space-y-4">
                <div class="md:space-y-0 grid md:grid-cols-2 gap-4">
                    <TextField v-model="formData.name" label="Name" placeholder="Enter your name" required />
                    <TextField v-model="formData.email" label="Email" placeholder="Enter your email" required />
                </div>
                <div class="md:space-y-0 grid md:grid-cols-2 gap-4">
                    <TextField v-model="formData.phone" label="Phone" placeholder="Enter your phone" required />
                    <div>
                        <label class="block text-gray-900 dark:text-gray-200 mb-1">Birth Date</label>
                        <DatePicker v-model="formData.birthDate" label="Birth Date" placeholder="Select your birth date" required />
                    </div>
                </div>
                <div class="md:space-y-0 grid md:grid-cols-2 gap-4">
                    <Select v-model="formData.course" searchable clearable label="Course" placeholder="Select your course" :options="courses" required />
                    <Select v-model="formData.duration" clearable label="Duration" placeholder="Select your duration" :options="['1 year', '2 years']" required />
                </div>
                <Textarea v-model="formData.description" placeholder="Enter your description" label="Description" required />
            </div>
        </form>
        <template #footer>
            <Button variant="secondary" @click="closeModal">
                Cancel
            </Button>
            <Button @click="submitForm">
                Submit
            </Button>
        </template>
    </Modal>
    </div>
</template>

<script setup>
import Button from '../UI/Button.vue'
import Modal from '../UI/Modal.vue';
import TextField from '../UI/TextField.vue';
import Textarea from '../UI/Textarea.vue';
import Select from '../UI/Select.vue';
import DatePicker from '../UI/DatePicker.vue';


const isModalOpen = ref(false)

const formData = ref({
    name: '',
    email: '',
    phone: '',
    skills: '',
    birthDate: '',
    duration: '',
    course: '',
    description: '',
})

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const courses = ['Theology', 'Christology', 'Biobliology', 'Evangelism', 'Church History', 'Communication']

const submitForm = () => {
    console.log(formData.value)
}
</script>

<style scoped>

</style>