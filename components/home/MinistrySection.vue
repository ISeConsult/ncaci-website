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
              MEETING DAYS {{ ministry.meetingDays }}
            </p>
            <p
              class="text-gray-100 font-bold text-base md:text-4xl mb-8 absolute top-4 left-4 transition-all duration-700"
              :class="{ 'pl-4': activeCard === index }"
            >
              {{ ministry.caption }}
            </p>

            <h3 class="text-lg text-gray-100 uppercase font-semibold mb-2 absolute top-24 md:top-4 right-10">
              Upcoming Event
            </h3>
            <p class="text-gray-200 text-xs md:text-lg uppercase absolute bottom-28 md:top-20 right-10">
              {{ ministry.upcomingEvent.title }}
            </p>
            <p class="text-gray-200 uppercase absolute bottom-52 md:top-28 right-10 text-xs md:text-lg">
              AT {{ ministry.upcomingEvent.venue }}
            </p>
            <p class="text-gray-200 uppercase absolute bottom-48 md:top-44 right-10 text-xs md:text-lg">
              {{ ministry.upcomingEvent.date }}
            </p>
            <p class="text-gray-200 uppercase absolute bottom-44 md:top-52 right-10 text-xs md:text-lg">
              Time: {{ ministry.upcomingEvent.time }}
            </p>
            <p class="text-gray-200 uppercase absolute bottom-36 md:top-60 right-10 text-xs md:text-lg">
              Details: {{ ministry.upcomingEvent.details }}
            </p>

            <div class="absolute bottom-10 md:top-40 left-28 md:left-8">
              <UIButton size="xl" @click="openModel">
                Register
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


    <Modal v-model:is-open="isModalOpen" size="3xl" @close="closeModal" title="Register As A Member">
      <form @submit.prevent="submitForm">
        <div class="space-y-4 md:space-y-0 grid md:grid-cols-2 gap-4">
          <TextField v-model="formData.name" label="Name" placeholder="Enter your name" required />
          <TextField v-model="formData.email" label="Email" placeholder="Enter your email" required />
          <TextField v-model="formData.phone" label="Phone" placeholder="Enter your phone" required />
          <TextField v-model="formData.skills" label="Skills" placeholder="Enter your skills (comma-separated)" required />
          <div>
            <label class="block text-gray-900 dark:text-gray-200 mb-1">Birth Date</label>
            <DatePicker v-model="formData.birthDate" label="Birth Date" placeholder="Select your birth date" required />
          </div>
          <Select v-model="formData.ministry" clearable label="Ministry" placeholder="Select your ministry" :options="ministries.map(ministry => ministry.name)" required />
          
          <Select v-model="formData.genda" clearable label="Genda" placeholder="Select your genda" :options="gendas" required />
        </div>
        <div class="mt-4">
          <Textarea v-model="formData.description" placeholder="Enter your description" label="Description" required />
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2 pt-4">
          <Button type="button" @click="closeModal" variant="secondary">Cancel</Button>
          <Button type="submit" variant="primary">Register</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UIButton from "../UI/Button.vue";
import TextField from "../UI/TextField.vue";
import Textarea from "../UI/Textarea.vue";
import Modal from "../UI/Modal.vue";
import DatePicker from "../UI/DatePicker.vue";
import Select from "../UI/Select.vue";
import Button from "../UI/Button.vue";

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
  'Male',
  'Female'
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
    name: 'Music Ministry',
    image: '/images/music-min.jpg',
    meetingDays: 'Fridays & Saturdays',
    caption: 'JOIN OUR MINISTRY',
    upcomingEvent: {
      title: 'Music at Conference',
      venue: 'Main Hall',
      date: '9th Sept, 2025',
      time: '9:00 AM - 3:00 PM',
      details: 'Breakfast & Lunch will be provided'
    },
    link: '/ministries'
  },
  {
    name: 'Youth Ministry',
    image: '/images/youth-min.jpg',
    meetingDays: 'Saturdays',
    caption: 'EMPOWERING THE NEXT GENERATION',
    upcomingEvent: {
      title: 'Youth Retreat',
      venue: 'Main Hall',
      date: '9th Sept, 2025',
      time: '9:00 AM - 3:00 PM',
      details: 'Breakfast & Lunch will be provided',
    },
    link: '/ministries'
  },
  {
    name: "Men's Ministry",
    image: '/images/mens-min.jpg',
    meetingDays: 'Saturdays',
    caption: 'BUILDING A BRIGHTER FUTURE',
    upcomingEvent: {
      title: 'Men\'s Conference',
      venue: 'Main Hall',
      date: '9th Sept, 2025',
      time: '9:00 AM - 3:00 PM',
      details: 'Breakfast & Lunch will be provided',
    },
    link: '/ministries'
  },
  {
    name: "Women's Ministry",
    image: '/images/women-min.jpg',
    meetingDays: 'Saturdays',
    caption: 'EMPOWERING WOMEN',
    upcomingEvent: {
      title: 'Women\'s Conference',
      venue: 'Main Hall',
      date: '9th Sept, 2025',
      time: '9:00 AM - 3:00 PM',
      details: 'Breakfast & Lunch will be provided'
    },
    link: '/ministries'
  },
  {
    name: "Children Ministry",
    image: '/images/children-min.jpg',
    meetingDays: 'Saturdays',
    caption: 'NURTURING YOUNG MINDS',
    upcomingEvent: {
      title: 'Children\'s Day',
      venue: 'Main Hall',
      date: '9th Sept, 2025',
      time: '9:00 AM - 3:00 PM',
      details: 'Breakfast & Lunch will be provided'
    },
    link: '/ministries'
  },
  {
    name: "Evangelism Ministry",
    image: '/images/evangelis-min.jpg',
    meetingDays: 'Saturdays',
    caption: 'SPREADING THE WORD',
    upcomingEvent: {
      title: 'Community Outreach',
      venue: 'Main Hall',
      date: '9th Sept, 2025',
      time: '9:00 AM - 3:00 PM',
      details: 'Breakfast & Lunch will be provided'
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
