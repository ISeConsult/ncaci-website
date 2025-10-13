<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
    <div class="grid gap-6">
      <!-- Ministry Card -->
      <div
        v-for="(ministry, index) in ministries"
        :key="index"
        class="relative overflow-hidden transform transition-all duration-700"
      >
        <div
          class="absolute left-0 top-0 overflow-hidden transform transition-transform duration-700 w-2 h-80 bg-blue-600"
          :class="{ 'opacity-100': activeCard === index, 'opacity-0': activeCard !== index }"
        ></div>

        <img
          :src="ministry.image"
          alt="Ministry Image"
          class="w-full h-48 object-cover relative transition-all duration-700"
          :class="{ 'ml-4 h-80': activeCard === index }"
        />

        <div
          class="absolute top-0 left-0 w-full h-48 bg-black transition-all duration-700"
          :class="{ 'ml-4 h-80 opacity-50': activeCard === index, 'opacity-0': activeCard !== index }"
        ></div>

        <h2
          class="text-base md:text-2xl font-bold mb-2 absolute top-10 md:top-20 left-4 text-white transition-all duration-700"
          :class="{ 'pl-4': activeCard === index }"
        >
          {{ ministry.name }}
        </h2>

        <div class="p-4">
          <div
            class="details"
            :class="{ 'opacity-100': activeCard === index, 'opacity-0': activeCard !== index }"
          >
            <p
              class="text-gray-400 mb-2 uppercase text-xs md:text-lg font-light absolute top-16 md:top-28 left-4 transition-all duration-700"
              :class="{ 'pl-4': activeCard === index }"
            >
              {{ $t('ministry.meetingDays') }} {{ ministry.meetingDays }}
            </p>
            <p
              class="text-gray-100 font-bold text-base md:text-4xl mb-8 absolute top-4 left-4 transition-all duration-700"
              :class="{ 'pl-4': activeCard === index }"
            >
              {{ ministry.caption }}
            </p>

            <h3 class="text-lg text-gray-100 uppercase font-semibold mb-2 absolute top-24 md:top-4 right-10">
              {{ $t('ministry.upcomingEvent') }}
            </h3>
            <p class="text-gray-200 text-xs md:text-lg uppercase absolute bottom-28 md:top-20 right-10">
              {{ ministry.upcomingEvent.title }}
            </p>
            <p class="text-gray-200 uppercase absolute bottom-52 md:top-28 right-10 text-xs md:text-lg">
              {{ $t('ministry.at') }} {{ ministry.upcomingEvent.venue }}
            </p>
            <p class="text-gray-200 uppercase absolute bottom-48 md:top-44 right-10 text-xs md:text-lg">
              {{ ministry.upcomingEvent.date }}
            </p>
            <p class="text-gray-200 uppercase absolute bottom-44 md:top-52 right-10 text-xs md:text-lg">
              {{ $t('ministry.time') }} {{ ministry.upcomingEvent.time }}
            </p>
            <p class="text-gray-200 uppercase absolute bottom-36 md:top-60 right-10 text-xs md:text-lg">
              {{ $t('ministry.details') }} {{ ministry.upcomingEvent.details }}
            </p>

            <div class="absolute bottom-10 md:top-40 left-28 md:left-8">
              <UIButton size="xl" @click="openModel">
                {{ $t('ministry.register') }}
              </UIButton>
            </div>
          </div>
        </div>

        <!-- Toggle Button -->
        <button
          @click="toggleCard(index)"
          class="absolute bottom-2 right-2 bg-white/80 text-gray-700 px-2 py-1 rounded text-xs shadow hover:bg-white transition"
        >
          {{ activeCard === index ? 'Hide' : 'Show' }}
        </button>
      </div>
    </div>


    <Modal v-model:is-open="isModalOpen" size="3xl" @close="closeModal" :title="$t('ministry.registerAsMember')">
      <form @submit.prevent="submitForm">
        <div class="space-y-4 md:space-y-0 grid md:grid-cols-2 gap-4">
          <TextField v-model="formData.name" :label="$t('ministry.name')" :placeholder="$t('ministry.namePlaceholder')" required />
          <TextField v-model="formData.email" :label="$t('ministry.email')" :placeholder="$t('ministry.emailPlaceholder')" required />
          <TextField v-model="formData.phone" :label="$t('ministry.phone')" :placeholder="$t('ministry.phonePlaceholder')" required />
          <TextField v-model="formData.skills" :label="$t('ministry.skills')" :placeholder="$t('ministry.skillsPlaceholder')" required />
          <div>
            <label class="block text-gray-900 dark:text-gray-200 mb-1">{{ $t('ministry.birthDate') }}</label>
            <DatePicker v-model="formData.birthDate" :label="$t('ministry.birthDate')" :placeholder="$t('ministry.birthDatePlaceholder')" required />
          </div>
          <Select v-model="formData.ministry" clearable :label="$t('ministry.ministry')" :placeholder="$t('ministry.ministryPlaceholder')" :options="ministries.map(ministry => ministry.name)" required />

          <Select v-model="formData.genda" clearable :label="$t('ministry.genda')" :placeholder="$t('ministry.gendaPlaceholder')" :options="gendas" required />
        </div>
        <div class="mt-4">
          <Textarea v-model="formData.description" :placeholder="$t('ministry.descriptionPlaceholder')" :label="$t('ministry.description')" required />
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2 pt-4">
          <Button type="button" @click="closeModal" variant="secondary">{{ $t('ministry.cancel') }}</Button>
          <Button type="submit" variant="primary">{{ $t('ministry.register') }}</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from 'vue-i18n';
import UIButton from "../UI/Button.vue";
import TextField from "../UI/TextField.vue";
import Textarea from "../UI/Textarea.vue";
import Modal from "../UI/Modal.vue";
import DatePicker from "../UI/DatePicker.vue";
import Select from "../UI/Select.vue";
import Button from "../UI/Button.vue";

const { t } = useI18n();

const isModalOpen = ref(false)

const openModel = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const activeCard = ref<number | null>(null);

const toggleCard = (index: number) => {
  activeCard.value = activeCard.value === index ? null : index;
};

const gendas = [
  t('ministry.male'),
  t('ministry.female')
]

const formData = ref({
  name: '',
  email: '',
  phone: '',
  birthDate: '',
  skills: '',
  ministry: '',
  genda: '',
  description: ''
})

const submitForm = () => {
  console.log(formData.value)
}



const ministries = [
  {
    name: t('ministry.music.name'),
    image: '/images/music-min.jpg',
    meetingDays: t('ministry.music.meetingDays'),
    caption: t('ministry.music.caption'),
    upcomingEvent: {
      title: t('ministry.music.eventTitle'),
      venue: t('ministry.music.venue'),
      date: t('ministry.music.date'),
      time: t('ministry.music.time'),
      details: t('ministry.music.details')
    },
    link: '/ministries'
  },
  {
    name: t('ministry.youth.name'),
    image: '/images/youth-min.jpg',
    meetingDays: t('ministry.youth.meetingDays'),
    caption: t('ministry.youth.caption'),
    upcomingEvent: {
      title: t('ministry.youth.eventTitle'),
      venue: t('ministry.youth.venue'),
      date: t('ministry.youth.date'),
      time: t('ministry.youth.time'),
      details: t('ministry.youth.details'),
    },
    link: '/ministries'
  },
  {
    name: t('ministry.mens.name'),
    image: '/images/mens-min.jpg',
    meetingDays: t('ministry.mens.meetingDays'),
    caption: t('ministry.mens.caption'),
    upcomingEvent: {
      title: t('ministry.mens.eventTitle'),
      venue: t('ministry.mens.venue'),
      date: t('ministry.mens.date'),
      time: t('ministry.mens.time'),
      details: t('ministry.mens.details'),
    },
    link: '/ministries'
  },
  {
    name: t('ministry.womens.name'),
    image: '/images/women-min.jpg',
    meetingDays: t('ministry.womens.meetingDays'),
    caption: t('ministry.womens.caption'),
    upcomingEvent: {
      title: t('ministry.womens.eventTitle'),
      venue: t('ministry.womens.venue'),
      date: t('ministry.womens.date'),
      time: t('ministry.womens.time'),
      details: t('ministry.womens.details')
    },
    link: '/ministries'
  },
  {
    name: t('ministry.children.name'),
    image: '/images/children-min.jpg',
    meetingDays: t('ministry.children.meetingDays'),
    caption: t('ministry.children.caption'),
    upcomingEvent: {
      title: t('ministry.children.eventTitle'),
      venue: t('ministry.children.venue'),
      date: t('ministry.children.date'),
      time: t('ministry.children.time'),
      details: t('ministry.children.details')
    },
    link: '/ministries'
  },
  {
    name: t('ministry.evangelism.name'),
    image: '/images/evangelis-min.jpg',
    meetingDays: t('ministry.evangelism.meetingDays'),
    caption: t('ministry.evangelism.caption'),
    upcomingEvent: {
      title: t('ministry.evangelism.eventTitle'),
      venue: t('ministry.evangelism.venue'),
      date: t('ministry.evangelism.date'),
      time: t('ministry.evangelism.time'),
      details: t('ministry.evangelism.details')
    },
    link: '/ministries'
  }
];
</script>

<style>
.details {
  transition: opacity 1s ease;
}
</style>
