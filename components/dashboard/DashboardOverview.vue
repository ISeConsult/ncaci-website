<!-- components/sections/DashboardOverview.vue -->
<template>
  <div cclass="relative z-10 flex flex-col justify-center items-center">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      <p class="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening in your ministry.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatsCard 
        v-for="stat in stats" 
        :key="stat.title" 
        :title="stat.title" 
        :value="stat.value" 
        :icon="stat.icon" 
        :color="stat.color" 
      />
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <RecentEvents :events="recentEvents" />
      <LeadershipQuickAccess :leaders="quickAccessLeaders" @navigate-to-leaders="$emit('navigate-to-leaders')" />
    </div>

    <!-- Courses Table -->
    <div class="grid grid-cols-1 mt-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Courses & Programs</h2>
      <Table
        :data="courses"
        :columns="courseColumns"
        title="Courses & Programs"
        :searchable="true"
        :search-placeholder="'Search courses...'"
        :items-per-page="10"
        empty-state-title="No courses found"
        empty-state-description="Start by adding your first course to get started."
        :loading="loading"
        class="text-nowrap"
      >
      </Table>
    </div>
  </div>
</template>

<script setup>
import StatsCard from '@/components/shared/StatsCard.vue'
import RecentEvents from '@/components/shared/RecentEvents.vue'
import LeadershipQuickAccess from '@/components/shared/LeadershipQuickAccess.vue'
import { ref, computed } from 'vue'
import Table from '../UI/Table.vue'
import { useDashboardStore } from '@/stores/useDashboardStore'
import { storeToRefs } from 'pinia'

const DashboardStore = useDashboardStore()
const { loading, dashboard } = storeToRefs(DashboardStore)

defineEmits(['navigate-to-leaders'])

// Stats data
const stats = computed(() => {
  if (!dashboard.value) return []
  return [
    { title: 'Total Members', value: dashboard.value.total_members, icon: 'UsersIcon', color: 'bg-blue-500' },
    { title: 'Active Events', value: dashboard.value.active_events, icon: 'CalendarIcon', color: 'bg-green-500' },
    { title: 'Ministries', value: dashboard.value.ministries, icon: 'SparklesIcon', color: 'bg-purple-500' }
  ]
})

// Recent events data
const recentEvents = computed(() => {
  if (!dashboard.value?.event_chart) return []
  return dashboard.value.event_chart.map(event => ({
    title: event.title,
    date: event.start_date
  }))
})

// Quick access leaders data
const quickAccessLeaders = computed(() => {
  if (!dashboard.value?.church_leader_stats) return []
  return Object.entries(dashboard.value.church_leader_stats).map(([key, value]) => ({
    title: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    count: value,
    icon: 'UsersIcon'
  }))
})

// Courses data
const courses = computed(() => {
  if (!dashboard.value?.course_list) return []
  return dashboard.value.course_list.map(course => ({
    ...course,
    startDate: course.start_date,
    endDate: course.end_date,
    schedule: `${course.start_date} - ${course.end_date}`
  }))
})

// Course table columns
const courseColumns = [
  {
    key: 'title',
    label: 'Course Title',
    sortable: true,
    cellClass: () => 'font-medium text-gray-900 dark:text-white'
  },
  {
    key: 'category',
    label: 'Category',
    sortable: true
  },
  {
    key: 'instructor',
    label: 'Instructor',
    sortable: true,
  },
  {
    key: 'schedule',
    label: 'Schedule',
    sortable: true,
  },
  {
    key: 'startDate',
    label: 'Start Date',
    sortable: true,
  },
  {
    key: 'endDate',
    label: 'End Date',
    sortable: true,
  },
  {
    key: 'duration',
    label: 'Duration',
    sortable: true,
  }
]

onMounted(() => {
  DashboardStore.fetchDashboard()
  console.log('Dashboard data on mount:', dashboard);
})
</script>