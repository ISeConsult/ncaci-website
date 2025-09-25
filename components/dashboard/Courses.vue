<!-- components/sections/CoursesFaculty.vue -->
<template>
  <div>
    <div class="lg:flex justify-between items-center mb-8 space-y-4 lg:space-y-0">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Courses & Faculty Management</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Manage educational programs, Bible studies, and teaching faculty</p>
      </div>
      <div class="flex space-x-3">
        <button 
          @click="openModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add Course
        </button>
        <button 
          @click="openFacultyModal"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
        >
          <UserPlusIcon class="h-5 w-5 mr-2" />
          Add Faculty&Mng Member
        </button>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-8">
      <nav class="flex space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
        <button 
          @click="activeTab = 'courses'"
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
            activeTab === 'courses' 
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          Courses & Programs ({{ courses.length }})
        </button>
        <button 
          @click="activeTab = 'faculty'"
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200',
            activeTab === 'faculty' 
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          ]"
        >
          Faculty & Management Members ({{ faculty.length }})
        </button>
      </nav>
    </div>

    <!-- Courses Tab -->
    <div v-if="activeTab === 'courses'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Courses Table -->
      <div class="lg:col-span-2">
        <Table
          :data="courses"
          :columns="courseColumns"
          title="Courses & Programs"
          :searchable="true"
          :search-placeholder="'Search courses...'"
          :pagination="true"
          :items-per-page="10"
          empty-state-title="No courses found"
          empty-state-description="Start by adding your first course to get started."
          :loading="loading"
          class="text-nowrap"
        >
          <template #actions="{ item }">
            <button
              class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
              :title="'View classes for ' + item?.title"
            >
              <EyeIcon class="h-4 w-4" />
            </button>
            <button
              @click="viewFacultyCourses(item)"
              class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
              :title="'View courses for ' + item?.title"
            >
              <PencilIcon class="h-4 w-4" />
            </button>
            <button
              class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
              :title="'Delete ' + item?.title"
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </template>
        </Table>
      </div>

      <!-- Courses Stats Sidebar -->
      <div class="space-y-6">
        <!-- Quick Stats -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <ChartBarIcon class="h-5 w-5 mr-2 text-blue-500" />
            Course Statistics
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Total Courses</span>
              <span class="font-bold text-2xl text-blue-600 dark:text-blue-400">{{ courses.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Faculty Members</span>
              <span class="font-bold text-2xl text-orange-600 dark:text-orange-400">{{ faculty.length }}</span>
            </div>
          </div>
        </div>

        <!-- Course Categories -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <TagIcon class="h-5 w-5 mr-2 text-purple-500" />
            Course Categories
          </h3>
          <div class="space-y-3">
            <div v-for="category in getCourseCategories()" :key="category.name" class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ category.name }}</span>
              <span class="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">{{ category.count }}</span>
            </div>
          </div>
        </div>

        <!-- Upcoming Classes -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl shadow-sm p-6 border border-green-200 dark:border-green-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <ClockIcon class="h-5 w-5 mr-2 text-green-500" />
            Today's Classes
          </h3>
          <div class="space-y-3">
            <div v-for="upcoming in getTodaysClasses()" :key="upcoming.id" class="flex items-center p-3 bg-white dark:bg-green-800/20 rounded-lg">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ upcoming?.title }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">{{ upcoming.time }} • {{ upcoming.location }}</p>
              </div>
              <span class="text-xs text-green-600 dark:text-green-400 font-medium">{{ upcoming.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Faculty Tab -->
    <div v-if="activeTab === 'faculty'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Faculty Table -->
      <div class="lg:col-span-2">
        <Table
          :data="faculty"
          :columns="facultyColumns"
          title="Faculty & Management"
          :searchable="true"
          :search-placeholder="'Search faculty members...'"
          :pagination="true"
          :items-per-page="10"
          empty-state-title="No faculty members found"
          empty-state-description="Start by adding your first faculty member to get started."
        >
          <template #actions="{ item }">
            <button
              class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
              :title="'View classes for ' + item?.name"
            >
              <EyeIcon class="h-4 w-4" />
            </button>
            <button
              @click="viewFacultyCourses(item)"
              class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
              :title="'View courses for ' + item?.name"
            >
              <PencilIcon class="h-4 w-4" />
            </button>
            <button
              class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
              :title="'Delete ' + item?.name"
            >
              <TrashIcon class="h-4 w-4" />
            </button>
          </template>
        </Table>
      </div>

      <!-- Faculty Stats Sidebar -->
      <div class="space-y-6">
        <!-- Department Overview -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <BuildingLibraryIcon class="h-5 w-5 mr-2 text-blue-500" />
            Departments
          </h3>
          <div class="space-y-3">
            <div v-for="dept in getDepartments()" :key="dept.name" class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ dept.name }}</span>
              <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">{{ dept.count }}</span>
            </div>
          </div>
        </div>

        <!-- Faculty Experience -->
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl shadow-sm p-6 border border-purple-200 dark:border-purple-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <StarIcon class="h-5 w-5 mr-2 text-purple-500" />
            Experience Levels
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Senior Faculty</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ getSeniorFaculty() }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Mid-Level</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ getMidLevelFaculty() }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">New Faculty</span>
              <span class="font-bold text-purple-600 dark:text-purple-400">{{ getNewFaculty() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create New Course Modal -->
    <Modal v-model:is-open="isModalOpen" size="3xl" title="Create New Course" @close="closeModal">
      <form @submit.prevent="submitCourse">
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField v-model="newCourse.title" label="Title" required />
            <TextField v-model="newCourse.instructor" label="Instructor" required />
          </div>
          <Select v-model="newCourse.category" label="Category" :options="courseCategories" searchable clearable required />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker placeholder="Start Date" v-model="newCourse.startDate" label="Start Date" required />
            <DatePicker placeholder="End Date" v-model="newCourse.endDate" label="End Date" required />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField v-model="newCourse.schedule" label="Schedule" required />
            <TextField v-model="newCourse.duration" label="Duration" required />
          </div>
          <Textarea v-model="newCourse.description" label="Description" required />
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2 pt-4">
          <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
        </div>
      </template>
    </Modal>

    <!--Add faculty&mng member modal -->
    <Modal v-model:is-open="isFacultyModalOpen" size="3xl" title="Add Faculty & Management Member" @close="closeFacultyModal">
      <form @submit.prevent="submitFaculty">
        <FileInput v-model="newFaculty.image" label="Image" accept="image/*" />
        <div class="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField v-model="newFaculty.name" label="Name" required />
          <TextField v-model="newFaculty.position" label="Position" required />
          <TextField v-model="newFaculty.email" label="Email" type="email" required />
          <TextField v-model="newFaculty.phone" label="Phone" required />
        </div>
        <Select class="mb-4" v-model="newFaculty.category" label="Category" clearable :options="['Faculty', 'Management Member']" required />
        <Textarea v-model="newFaculty.biography" label="Biography" required />
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2 pt-4">
          <button type="button" @click="closeFacultyModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '../UI/Modal.vue'
import TextField from '../UI/TextField.vue'
import Select from '../UI/Select.vue'
import DatePicker from '../UI/DatePicker.vue'
import Textarea from '../UI/Textarea.vue'
import FileInput from '../UI/FileInput.vue'
import {
  PlusIcon,
  UserPlusIcon,
  EyeIcon,
  ChartBarIcon,
  TagIcon,
  ClockIcon,
  BuildingLibraryIcon,
  StarIcon,
  BriefcaseIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/vue/24/outline'
import Table from '~/components/UI/Table.vue'

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const isFacultyModalOpen = ref(false)

const openFacultyModal = () => {
  isFacultyModalOpen.value = true
}

const closeFacultyModal = () => {
  isFacultyModalOpen.value = false
}

const newFaculty = ref({
  name: '',
  position: '',
  email: '',
  phone: '',
  biography: '',
  image: '',
  category: ''
})

const newCourse = ref({
  title: '',
  category: '',
  description: '',
  instructor: '',
  startDate: '',
  endDate: '',
  schedule: '',
  duration: ''
})

const courseCategories = ref(['Bible Study', 'Writing', 'Leadership', 'Other'])

const submitCourse = () => {
  // Add course logic here
}

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
  }
])

const faculty = ref([
  {
    id: 1,
    name: 'Dr. John Smith',
    title: 'Pastor',
    department: 'Biblical Studies',
    desc: 'A seasoned pastor with a passion for Biblical Studies.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    position: 'Senior Pastor',
  },
  {
    id: 2,
    name: 'Dr. Jane Doe',
    title: 'Professor',
    department: 'Biblical Studies',
    desc: 'A knowledgeable professor specializing in Biblical Studies.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    position: 'Professor',
  },
  {
    id: 3,
    name: 'Dr. John Smith',
    title: 'Pastor',
    department: 'Biblical Studies',
    desc: 'A seasoned pastor with a passion for Biblical Studies.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    position: 'Senior Pastor',
  },
  {
    id: 4,
    name: 'Dr. Jane Doe',
    title: 'Professor',
    department: 'Biblical Studies',
    desc: 'A knowledgeable professor specializing in Biblical Studies.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    position: 'Professor',
  },
  {
    id: 5,
    name: 'Dr. John Smith',
    title: 'Pastor',
    department: 'Biblical Studies',
    desc: 'A seasoned pastor with a passion for Biblical Studies.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    position: 'Senior Pastor',
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

// Faculty table columns
const facultyColumns = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    cellClass: () => 'font-medium text-gray-900 dark:text-white'
  },
  {
    key: 'title',
    label: 'Title',
    sortable: true
  },
  {
    key: 'department',
    label: 'Department',
    sortable: true
  },
  {
    key: 'position',
    label: 'Position',
    sortable: true
  }
]

// State
const activeTab = ref('courses')
const showAddCourseModal = ref(false)
const showAddFacultyModal = ref(false)

const getFacultyCourseCount = (facultyId) => {
  return courses.value.filter(course => course.instructorId === facultyId).length
}

const getFacultyStudentCount = (facultyId) => {
  return courses.value
    .filter(course => course.instructor === facultyId)
    .reduce((total, course) => total + course.enrolled, 0)
}

const getCourseCategories = () => {
  const categories = {}
  courses.value.forEach(course => {
    categories[course.category] = (categories[course.category] || 0) + 1
  })
  return Object.entries(categories).map(([name, count]) => ({ name, count }))
}

const getTodaysClasses = () => {
  // Placeholder: Implement logic to filter classes for today
  return courses.value.filter(course => course.schedule.includes('Monday')).map(course => ({
    id: course.id,
    title: course.title,
    time: course.schedule,
    location: course.location
  }))
}

const getDepartments = () => {
  const departments = {}
  faculty.value.forEach(member => {
    departments[member.department] = (departments[member.department] || 0) + 1
  })
  return Object.entries(departments).map(([name, count]) => ({ name, count }))
}

const getSeniorFaculty = () => {
  return faculty.value.filter(member => member.experience >= 10).length
}

const getMidLevelFaculty = () => {
  return faculty.value.filter(member => member.experience >= 5 && member.experience < 10).length
}

const getNewFaculty = () => {
  return faculty.value.filter(member => member.experience < 5).length
}










const viewEnrollments = (course) => {
  // Placeholder: Implement enrollment viewing logic
  console.log(`Viewing enrollments for course: ${course.title}`)
}

const viewFacultyCourses = (faculty) => {
  // Placeholder: Implement faculty courses viewing logic
  console.log(`Viewing courses for faculty: ${faculty.name}`)
}

</script>

<style scoped>

</style>