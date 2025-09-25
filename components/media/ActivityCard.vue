<template>
  <div
    class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
  >
    <div class="flex flex-col justify-center items-center py-12 w-full">
      <!-- Events header -->
      <div class="grid grid-cols-1 lg:grid-cols-7 gap-8 w-full">
        <!-- Filters -->
        <div class="lg:col-span-1 section1-bg">
          <ul class="flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-0">
            <li
              v-for="item in filter"
              :key="item.title"
              class="cursor-pointer border-b border-blue-500 py-2 capitalize text1 pl-4 w-full"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
        <!-- Intro text -->
        <div class="lg:col-span-6 flex justify-center items-center">
          <p
            class="text-sm sm:text-base font-thin text-left capitalize text-white"
          >
            We are committed to fostering spiritual growth, fellowship, and a
            deepened connection with God through a variety of church activities.
            These events are thoughtfully designed to enrich our faith
            community, equip leaders, and create opportunities for collective
            worship and celebration. Below is an introduction to our annual
            church activities:
          </p>
        </div>
      </div>
    </div>

    <!-- Activities -->
    <div
      v-for="item in paginatedActivities"
      :key="item.title"
      class="w-full"
    >
      <div
        class="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6"
      >
        <!-- Image -->
        <div class="col-span-1">
          <img
            :src="item.image"
            alt="event"
            class="w-full h-auto lg:h-full aspect-video object-cover rounded-xl"
          />
        </div>

        <!-- Content -->
        <div
          class="col-span-1 lg:col-span-5 rounded-xl section1-bg px-6 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
        >
          <!-- Left section -->
          <div class="flex-1 w-full">
            <!-- Date & Time -->
            <div
              class="flex flex-wrap lg:flex-nowrap rounded-full p-4 mb-4 gap-4"
            >
              <div class="flex gap-1 items-center">
                <span>
                  <!-- calendar icon -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-blue-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 
                         2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 
                         0 0 1 21 7.5v11.25m-18 
                         0A2.25 2.25 0 0 0 5.25 
                         21h13.5A2.25 2.25 0 0 
                         0 21 18.75"
                    />
                  </svg>
                </span>
                <p class="text-sm text1">{{ item.date }}</p>
              </div>

              <div class="hidden lg:block w-[0.5px] h-4 bg-gray-400"></div>

              <div class="flex gap-1 items-center">
                <span>
                  <!-- clock -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-blue-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 
                         0a9 9 0 1 1-18 0 9 9 
                         0 0 1 18 0Z"
                    />
                  </svg>
                </span>
                <p class="text-sm text1">{{ item.time }}</p>
              </div>
            </div>

            <!-- Title & Desc -->
            <div class="mb-4">
              <h1
                class="text-xl sm:text-2xl font-bold text-left uppercase text1 mb-2"
              >
                {{ item.title }}
              </h1>
              <h3
                class="text-sm sm:text-base font-semibold text-left uppercase text1"
              >
                ({{ item.desc }})
              </h3>
            </div>

            <!-- Location -->
            <div class="flex items-center space-x-1">
              <span>
                <!-- location -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 text-blue-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 1 
                       1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 
                       11.25-7.5 11.25S4.5 
                       17.642 4.5 10.5a7.5 
                       7.5 0 1 1 15 0Z"
                  />
                </svg>
              </span>
              <p class="text-sm text1">{{ item.location }}</p>
            </div>
          </div>

          <!-- Divider -->
          <div class="hidden lg:block w-[0.5px] h-32 bg-gray-400"></div>

          <!-- Speakers -->
          <div class="flex-1 w-full">
            <div
              class="mb-4 rounded-full border-2 border-blue-600 p-2 w-full lg:w-auto"
            >
              <h3 class="text-center text-lg sm:text-xl font-bold text-blue-600">
                Speakers
              </h3>
            </div>
            <ul class="flex flex-col space-y-2">
              <li
                v-for="speaker in item.speakers"
                :key="speaker.name"
                class="text-sm text1"
              >
                {{ speaker.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center pb-6">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalItems="activities.length"
        :itemsPerPage="itemsPerPage"
        @update:currentPage="(page) => (currentPage = page)"
      />
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import Pagination from '~/components/UI/Pagination.vue'

const currentPage = ref(1)
const itemsPerPage = ref(3)

const totalPages = computed(() => Math.ceil(activities.length / itemsPerPage.value))

const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return activities.slice(start, end)
})

const filter = [
    {
        title: 'all',
        value: 'all',
    },
    {
        title: 'upcoming',
        value: 'upcoming',
    },
    {
        title: 'past',
        value: 'past',
    },
    {
        title: 'ongoing',
        value: 'ongoing',
    },
    {
        title: 'upcoming',
        value: 'upcoming',
    },
]


const activities = [
    {
        title: 'founders day',
        desc: 'all districts and locals',
        location: 'Williams Street, East Legon, House 115, Accra - Ghana',
        date: '9th - 10th Sept, 2025',
        time: '9:00 AM - 3:00 PM',
        image: '/images/gala1.jpg',
        speakers: [
            {
                name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        }   
    ]
    },
    {
        title: 'founders day',
        desc: 'all districts and locals',
        location: 'Williams Street, East Legon, House 115, Accra - Ghana',
        date: '9th - 10th Sept, 2025',
        time: '9:00 AM - 3:00 PM',
        image: '/images/gala2.jpg',
        speakers: [
            {
                name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        }   
    ]
    },
    {
        title: 'founders day',
        desc: 'all districts and locals',
        location: 'Williams Street, East Legon, House 115, Accra - Ghana',
        date: '9th - 10th Sept, 2025',
        time: '9:00 AM - 3:00 PM',
        image: '/images/gala3.jpg',
        speakers: [
            {
                name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        }   
    ]
    },
    {
        title: 'founders day',
        desc: 'all districts and locals',
        location: 'Williams Street, East Legon, House 115, Accra - Ghana',
        date: '9th - 10th Sept, 2025',
        time: '9:00 AM - 3:00 PM',
        image: '/images/gala4.jpg',
        speakers: [
            {
                name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        },
        {
            name: 'Rev. Dr. Michael Addo',
        }   
    ]
    }
]

</script>

<style scoped>

</style>
