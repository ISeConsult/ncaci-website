<!-- components/sections/CoursesFaculty.vue -->
<template>
  <div>
    <div class="lg:flex justify-between items-center mb-8 space-y-4 lg:space-y-0">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Courses & Faculty Management</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Manage educational programs, Bible studies, and teaching faculty</p>
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
          Courses & Programs ({{ courses?.length }})
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
          Faculty & Management Members ({{ staffs?.length }})
        </button>
      </nav>
    </div>

    <!-- Courses Tab -->
    <div v-if="activeTab === 'courses'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Courses Table -->
      <div class="lg:col-span-2">
        <div class="flex justify-end items-center mb-4">
          <Button 
          @click="openModal(null)"
          variant="primary"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add Course
        </Button>
        </div>
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
              @click="openModal(item)"
              class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
              :title="'View courses for ' + item?.title"
            >
              <PencilIcon class="h-4 w-4" />
            </button>
            <button
              @click="openDeleteModal(item)"
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
      </div>
    </div>

    <!-- Faculty Tab -->
    <div v-if="activeTab === 'faculty'" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Faculty Table -->
      <div class="lg:col-span-2">
        <div class="flex justify-end items-center mb-4">
          <Button 
            @click="openFacultyModal(null)"
            variant="primary"
          >
            <UserPlusIcon class="h-5 w-5 mr-2" />
            Add Faculty & Mng Member
          </Button>
        </div>
        <Table
          :data="staffs"
          :columns="facultyColumns"
          title="Faculty & Management"
          :searchable="true"
          :search-placeholder="'Search faculty members...'"
          :pagination="true"
          :items-per-page="10"
          empty-state-title="No faculty members found"
          empty-state-description="Start by adding your first faculty member to get started."
          :loading="loading"
          class="text-nowrap"
        >
          <template #actions="{ item }">
            <button
              @click="openFacultyModal(item)"
              class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
              :title="'View courses for ' + item?.name"
            >
              <PencilIcon class="h-4 w-4" />
            </button>
            <button
              @click="openDeleteModalStaff(item)"
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
            Roles
          </h3>
          <div class="space-y-3">
            <div v-for="dept in getRoles()" :key="dept.name" class="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
              <span class="text-gray-700 dark:text-gray-300 font-medium">{{ dept.name }}</span>
              <span class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">{{ dept.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create New Course Modal -->
    <Modal v-model:is-open="isModalOpen" size="3xl" :title=" isEditing ? 'Edit Course' : 'Create New Course'" @close="closeModal">
      <form @submit.prevent="submitCourse">
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField v-model="formData.title" label="Title" required />
            <TextField v-model="formData.instructor" label="Instructor" required />
          </div>
          <Select v-model="formData.category" label="Category" :options="courseCategories" searchable clearable required />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker placeholder="Start Date" v-model="formData.start_date" label="Start Date" required />
            <DatePicker placeholder="End Date" v-model="formData.end_date" label="End Date" required />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select v-model="formData.duration" label="Duration" :options="durations" searchable clearable required />
          </div>
          <Textarea v-model="formData.description" label="Description" required />
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2 pt-4">
          <Button type="button" @click="closeModal" variant="secondary">Cancel</Button>
          <Button type="button" @click="submitCourse" :loading="loading" >{{ isEditing ? 'Update' : 'Create' }}</Button>
        </div>
      </template>
    </Modal>

    <!--Add faculty&mng member modal -->
    <Modal v-model:is-open="isFacultyModalOpen" size="3xl" :title="isEditingStaff ? 'Edit Faculty Member' : 'Add New Faculty Member'" @close="closeFacultyModal">
      <form @submit.prevent="submitStaff">
        <FileInput v-model="newFaculty.image" label="Image" accept="image/*" />
        <div class="space-y-4 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TextField v-model="newFaculty.name" label="Name" required />
          <TextField v-model="newFaculty.position" label="Position" required />
        </div>
        <Select class="mb-4" v-model="newFaculty.role" label="Role" clearable :options="[{ label: 'Faculty', value: 'faculty' }, { label: 'Management', value: 'management_member' }]" required />
        <Textarea v-model="newFaculty.biography" label="Biography" required />
      </form>
      <template #footer>
        <div class="flex justify-end space-x-2 pt-4">
          <Button type="button" @click="closeFacultyModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700">Cancel</Button>
          <Button type="submit" :loading="staffLoading" @click="submitStaff">{{ isEditingStaff ? 'Update' : 'Create' }}</Button>
        </div>
      </template>
    </Modal>

    <!-- Delete confirmation modal -->
    <Modal v-model:is-open="isDeleteModalOpen" size="md" title="Confirm Delete" @close="cancelDelete">
      <p class="text-gray-700 dark:text-gray-300">
        Are you sure you want to delete the course "{{ courseToDelete?.title }}"? This action cannot be undone.
      </p>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button
            @click="cancelDelete"
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            @click="confirmDelete"
            type="button"
            variant="danger"
          >
            Delete
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Delete confirmation modal for staff -->
    <Modal v-model:is-open="isDeleteModalOpen" size="md" title="Confirm Delete" @close="cancelDeleteStaff">
      <p class="text-gray-700 dark:text-gray-300">
        Are you sure you want to delete the staff member "{{ staffToDelete?.name }}"? This action cannot be undone.
      </p>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button
            @click="cancelDeleteStaff"
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            @click="confirmStaffDelete"
            type="button"
            variant="danger"
          >
            Delete
          </Button>
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
  ChartBarIcon,
  TagIcon,
  BuildingLibraryIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/vue/24/outline'
import Table from '~/components/UI/Table.vue'
import Button from '../UI/Button.vue'
import { useCourseStore } from '~/stores/useCourseStore'
import { storeToRefs } from 'pinia'
import { useToast } from '~/composables/useToast'
import { useStaffStore } from '~/stores/useStaffStore'

const CourseStore = useCourseStore()
const { courses, loading } = storeToRefs(CourseStore)

const StaffStore = useStaffStore()
const { staffs, loading: staffLoading } = storeToRefs(StaffStore)

const isModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const courseToDelete = ref(null)
const isEditing = ref(false)
const editingCourse = ref(null)

const  isEditingStaff = ref(false)
const editingStaff = ref(null)
const staffToDelete = ref(null)
const isFacultyModalOpen = ref(false)

const { addToast } = useToast()

const openModal = (course = null) => {
  isEditing.value = !!course
  editingCourse.value = course

  formData.value = isEditing.value ? { ...course } : {
    title: '',
    category: null,
    description: '',
    instructor: '',
    start_date: null,
    end_date: null,
    duration: ''
  }

  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  editingCourse.value = null

  formData.value = {
    title: '',
    category: null,
    description: '',
    instructor: '',
    start_date: null,
    end_date: null,
    duration: ''
  }
}

const openFacultyModal = (staff = null) => {
  isEditingStaff.value = !!staff
  editingStaff.value = staff

  newFaculty.value = isEditingStaff.value ? { ...staff } : {
    name: '',
    position: '',
    biography: '',
    image: null,
    role: null
  }
  isFacultyModalOpen.value = true
}

const closeFacultyModal = () => {
  isFacultyModalOpen.value = false
  isEditingStaff.value = false
  editingStaff.value = null

  newFaculty.value = {
    name: '',
    position: '',
    biography: '',
    image: null,
    role: null
  }
}

const newFaculty = ref({
  name: '',
  position: '',
  biography: '',
  image: null,
  role: null
})

const formData = ref({
  title: '',
  category: null,
  description: '',
  instructor: '',
  start_date: null,
  end_date: null,
  duration: ''
})

const courseCategories = [
  { label: 'Bible Studies', value: 'bible_study' },
  { label: 'Leadership Training', value: 'leadership' },
  { label: 'Writing', value: 'writing' },
  { label: 'Other', value: 'other' }
]

const durations = [
  { label: '6 Months', value: '6_months' },
  { label: '1 Year', value: '1_year' },
  { label: '2 Years', value: '2_years' }
]

const submitCourse = async () => {
  try {
    let response;
    if (isEditing.value) {
      response = await CourseStore.updateCourse(editingCourse.value.uid, formData.value)
    } else {
      response = await CourseStore.addCourse(formData.value)
    }
    addToast(response.data.message || isEditing.value ? 'Course updated successfully' : 'Course added successfully', 'success')
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    addToast(error.response.data.message || 'Error adding course', 'error')
  }
}

const submitStaff = async () => {
  try {
    let response;
    if (isEditingStaff.value) {
      response = await StaffStore.updateStaff(editingStaff.value.uid, newFaculty.value)
    } else {
      response = await StaffStore.addStaff(newFaculty.value)
    }
    addToast(response.data.message || isEditingStaff.value ? 'Staff member updated successfully' : 'Staff member added successfully', 'success')
    closeFacultyModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    addToast(error.response.data.message || 'Error adding staff member', 'error')
  }
}

const openDeleteModal = (course) => {
  courseToDelete.value = course
  isDeleteModalOpen.value = true
}

const openDeleteModalStaff = (staff) => {
  staffToDelete.value = staff
  isDeleteModalOpen.value = true
} 

const confirmDelete = async () => {
  try {
    await CourseStore.deleteCourse(courseToDelete.value.uid)
    isDeleteModalOpen.value = false
    courseToDelete.value = null
    addToast('Course deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting course:', error)
    addToast(error.response.data.message, 'error')
  }
}

const confirmStaffDelete = async () => {
  try {
    await StaffStore.deleteStaff(staffToDelete.value.uid)
    isDeleteModalOpen.value = false
    staffToDelete.value = null
    addToast('Staff member deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting staff member:', error)
    addToast(error.response.data.message, 'error')
  }
}

const cancelDelete = () => {
  isDeleteModalOpen.value = false
  courseToDelete.value = null
}

const cancelDeleteStaff = () => {
  isDeleteModalOpen.value = false
  staffToDelete.value = null
}

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
    key: 'start_date',
    label: 'Start Date',
    sortable: true,
  },
  {
    key: 'end_date',
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
    key: 'role',
    label: 'Role',
    sortable: true
  },
  {
    key: 'position',
    label: 'Position',
    sortable: true
  },
  {
    key: 'biography',
    label: 'Biography',
    sortable: false,
    cellClass: () => 'max-w-sm truncate'
  }
]

// State
const activeTab = ref('courses')

const getCourseCategories = () => {
  const categories = {}
  courses.value.forEach(course => {
    categories[course.category] = (categories[course.category] || 0) + 1
  })
  return Object.entries(categories).map(([name, count]) => ({ name, count }))
}

const getRoles = () => {
  const roles = {}
  staffs.value.forEach(staff => {
    roles[staff.role] = (roles[staff.role] || 0) + 1
  })
  return Object.entries(roles).map(([name, count]) => ({ name, count }))
}

onMounted(() => {
  CourseStore.fetchCourses()
  StaffStore.fetchStaffs()
  console.log('Courses loaded:', courses)
  console.log('Staffs loaded:', staffs)
})

</script>

<style scoped>

</style>