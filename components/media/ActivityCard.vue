<template>
  <div
    class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
  >
    <div class="flex flex-col justify-center items-center py-12 w-full">
      <!-- Events header -->
      <div class="grid grid-cols-1 lg:grid-cols-7 gap-8 w-full">
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
      v-if="paginatedActivities && paginatedActivities.length > 0"
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

    <div v-else class="flex flex-col justify-center items-center mt-12 mb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 w-full">
      <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-gray-500 text-lg font-medium">No Event found</p>
      <p class="text-gray-400 text-sm mt-1">
        There are no events to display at the moment.
      </p>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center pb-6">
      <!-- <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :totalItems="activities.length"
        :itemsPerPage="itemsPerPage"
        @update:currentPage="(page) => (currentPage = page)"
      /> -->

      <Pagination :current-page="currentPage" :total-pages="totalPages" :total-items="activities.length" :items-per-page="itemsPerPage" @update:currentPage="onPageChange"/>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue'
import Pagination from '~/components/UI/Pagination.vue'
import { useEventStore } from '~/stores/useEventStore'
import { storeToRefs } from 'pinia'

const EventStore = useEventStore()
const { events } = storeToRefs(EventStore)

const activities = computed(() => {
  if (!Array.isArray(events.value)) return []
  return events.value.map(event => {
    const startDate = new Date(event.start_date)
    const endDate = new Date(event.end_date)
    const dateStr = startDate.toDateString() === endDate.toDateString()
      ? startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    const startTime = event.start_time.slice(0, 5) // HH:MM
    const endTime = event.end_time.slice(0, 5)
    const timeStr = `${startTime} - ${endTime}`
    const speakers = event.speakers.split(',').map(s => ({ name: s.trim() }))
    return {
      ...event,
      date: dateStr,
      time: timeStr,
      desc: event.description,
      speakers
    }
  })
})

const currentPage = ref(1)
const itemsPerPage = ref(3)

const onPageChange = (page) => {
  currentPage.value = page
}

const totalPages = computed(() => Math.ceil(activities.value.length / itemsPerPage.value))


const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return activities.value.slice(start, end)
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




onMounted(() => {
    EventStore.fetchEvents()
})
</script>

<style scoped>

</style>
