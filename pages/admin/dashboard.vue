<!-- pages/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <NavigationHeader :activeSection="activeSection" @section-change="activeSection = $event" />
    
    <main class="max-w-7xl mx-auto px-4 py-24">
      <component 
        :is="currentSectionComponent" 
        @navigate-to-leaders="activeSection = 'leaders'"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavigationHeader from '@/components/layouts/NavigationHeader.vue'
import DashboardOverview from '@/components/dashboard/DashboardOverview.vue'
import EventsManagement from '@/components/dashboard/EventsManagement.vue'
import LeadershipDirectory from '@/components/dashboard/LeadershipDirectory.vue'
import NewsArticles from '@/components/dashboard/NewsArticles.vue'
import MinistryActivities from '@/components/dashboard/MinistryActivities.vue'
import DocumentDirectory from '@/components/dashboard/DocumentDirectory.vue'
import ContactDirectory from '@/components/dashboard/ContactDirectory.vue'
import MinistryRegistrations from '@/components/dashboard/MinistryRegistrations.vue'
import executive from '@/pages/executive/index.vue'
import courses from '@/components/dashboard/Courses.vue'

const activeSection = ref('overview')

const sectionComponents = {
  overview: DashboardOverview,
  events: EventsManagement,
  leaders: LeadershipDirectory,
  news: NewsArticles,
  activities: MinistryActivities,
  directories: DocumentDirectory,
  contacts: ContactDirectory,
  registrations: MinistryRegistrations,
  executive:executive,
  courses: courses
}

const currentSectionComponent = computed(() => {
  return sectionComponents[activeSection.value] || DashboardOverview
})
</script>