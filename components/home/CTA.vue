<template>
    <div class="relative py-10" style="background-image: url('/images/cta-bg.jpg'); background-size: cover; background-position: center">
        <div class="absolute inset-0 bg-[#e8a663]  opacity-30"></div>
        <div class="relative z-10 grid md:grid-cols-2 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 backdrop-blur-md bg-white/10 border border-white/20 border-b-8 border-b-[#F80000]">
            <div class="flex flex-col md:justify-start md:items-start space-y-6">
                <h1 class="text-4xl font-bold text-center md:text-left uppercase text-black mb-2 leading-relaxed">{{ $t('cta.title') }}</h1>
                <p class="text-sm font-thin md:text-left capitalize text-white">{{ $t('cta.description') }}</p>
                <Button size="xl" @click="openModal">
                    {{ $t('cta.button') }}
                </Button>
            </div>
            <div class="hidden md:grid lg:grid-cols-2 gap-4">
                <div class="relative">
                    <img src="/images/cta1.jpg" class="w-full h-96 bg-contain relative" alt="cta"></img>
                    <div class="absolute bottom-0 right-0 py-4 w-full">
                        <p class="text-sm font-bold text-center uppercase text-white relative z-50">{{ $t('cta.twoYearsDiploma') }}</p>
                        <div class="absolute inset-0 bg-black  opacity-80"></div>
                    </div>
                </div>
                <div class="relative">
                    <img src="/images/cta2.jpg" class="w-full h-full bg-contain" alt="cta"></img>
                    <div class="absolute bottom-0 right-0 py-4 w-full">
                        <p class="text-sm font-bold text-center uppercase text-white relative z-50">{{ $t('cta.oneYearCertificate') }}</p>
                        <div class="absolute inset-0 bg-black  opacity-80"></div>
                    </div>
                </div>
            </div>
        </div>

        <Modal v-model:is-open="isModalOpen" :title="$t('cta.modalTitle')" size="2xl" @close="closeModal">
        <form @submit.prevent="submitForm">
            <div class="space-y-4">
                <div class="md:space-y-0 grid md:grid-cols-2 gap-4">
                    <TextField v-model="formData.name" :label="$t('cta.name')" :placeholder="$t('cta.namePlaceholder')" required />
                    <TextField v-model="formData.email" :label="$t('cta.email')" :placeholder="$t('cta.emailPlaceholder')" required />
                </div>
                <div class="md:space-y-0 grid md:grid-cols-2 gap-4">
                    <TextField v-model="formData.phone" :label="$t('cta.phone')" :placeholder="$t('cta.phonePlaceholder')" required />
                    <DatePicker v-model="formData.birthDate" :label="$t('cta.birthDate')" :placeholder="$t('cta.birthDatePlaceholder')" required />
                </div>
                <div class="md:space-y-0 grid md:grid-cols-2 gap-4">
                    <Select v-model="formData.course" searchable clearable :label="$t('cta.course')" :placeholder="$t('cta.coursePlaceholder')" :options="courses" required />
                    <Select v-model="formData.duration" clearable :label="$t('cta.duration')" :placeholder="$t('cta.durationPlaceholder')" :options="durations" required />
                </div>
                <Textarea v-model="formData.description" :placeholder="$t('cta.descriptionPlaceholder')" :label="$t('cta.descriptionLabel')" required />
            </div>
        </form>
        <template #footer>
            <Button variant="secondary" @click="closeModal">
                {{ $t('cta.cancel') }}
            </Button>
            <Button @click="submitForm">
                {{ $t('cta.submit') }}
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

const courses = [
    t('cta.Theology'), t('cta.Christology'), t('cta.Biobiology'), t('cta.Evangelization'), t('cta.History'), t('cta.Communication')
]


const durations = [
    t('cta.oneYear'), t('cta.twoYears')
]

const submitForm = () => {
    console.log(formData.value)
}
</script>

<style scoped>

</style>