<!-- components/sections/DashboardOverview.vue -->
<template>
  <div cclass="relative z-10 flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
      <p class="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening in your ministry.</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
import { ref } from 'vue'
import Table from '../UI/Table.vue'

defineEmits(['navigate-to-leaders'])

// Data
const stats = [
  { title: 'Total Members', value: '1,247', icon: 'UsersIcon', color: 'bg-blue-500' },
  { title: 'Active Events', value: '24', icon: 'CalendarIcon', color: 'bg-green-500' },
  { title: 'Ministries', value: '12', icon: 'SparklesIcon', color: 'bg-purple-500' },
  { title: 'This Month', value: '89', icon: 'ClipboardDocumentListIcon', color: 'bg-orange-500' }
]

const recentEvents = [
  { id: 1, title: 'Sunday Service', date: 'Today, 10:00 AM' },
  { id: 2, title: 'Youth Fellowship', date: 'Tomorrow, 6:00 PM' },
  { id: 3, title: 'Bible Study', date: 'Wednesday, 7:00 PM' },
  { id: 4, title: 'Prayer Meeting', date: 'Friday, 6:00 PM' }
]

const quickAccessLeaders = [
  { title: 'Executive Council', count: 8, icon: 'UsersIcon' },
  { title: 'District Heads', count: 12, icon: 'MapPinIcon' },
  { title: 'Men Fellowship', count: 45, icon: 'UsersIcon' },
  { title: 'Women & Youth', count: 67, icon: 'UsersIcon' }
]

// Sample data
const courses = ref([
  {
    id: 1,
    title: 'Introduction to Biblical Studies',
    category: 'Bible Study',
    instructor: 'Dr. John Smith',
    description: 'A foundational course on understanding the Bible.',
    duration: '1 Year',
    schedule: 'Mondays 6-8 PM',
    startDate: '2025-10-01',
    endDate: '2025-11-26',
  },
  {
    id: 2,
    title: 'Advanced Biblical Studies',
    category: 'Bible Study',
    instructor: 'Dr. Jane Doe',
    description: 'Advanced topics in Biblical Studies.',
    duration: '2 Years',
    schedule: 'Tuesdays 6-8 PM',
    startDate: '2025-10-01',
    endDate: '2025-11-26'
  },
  {
    id: 3,
    title: 'Biblical Literature',
    category: 'Bible Study',
    instructor: 'Dr. John Smith',
    description: 'An in-depth study of biblical literature.',
    duration: '1 Year',
    schedule: 'Wednesdays 6-8 PM',
    startDate: '2025-10-01',
    endDate: '2025-11-26'
  },
  {
    id: 4,
    title: 'Biblical Interpretation',
    category: 'Bible Study',
    instructor: 'Dr. Jane Doe',
    description: 'A critical analysis of biblical texts.',
    duration: '2 Years',
    schedule: 'Thursdays 6-8 PM',
    startDate: '2025-10-01',
    endDate: '2025-11-26'
  },
  {
    id: 5,
    title: 'Biblical Interpretation',
    category: 'Bible Study',
    instructor: 'Dr. Jane Doe',
    description: 'A critical analysis of biblical texts.',
    duration: '2 Years',
    schedule: 'Thursdays 6-8 PM',
    startDate: '2025-10-01',
    endDate: '2025-11-26'
  }
])

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
</script>