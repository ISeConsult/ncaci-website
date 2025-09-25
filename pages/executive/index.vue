<!-- components/sections/MinistryExecutives.vue -->
<template>
  <div>
    <div class="md:flex space-y-4 md:space-y-0 justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Ministry Executives</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Manage leadership positions across all church ministries</p>
      </div>
      <div class="flex space-x-3">
        <button 
          @click="openModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          Add Executive
        </button>
      </div>
    </div>

    <!-- All Executives View -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <Table
          :data="executives"
          :columns="executiveColumns"
          title="All Executives"
          :searchable="true"
          :search-placeholder="'Search executives...'"
          :pagination="true"
          :items-per-page="10"
          empty-state-title="No executives found"
          empty-state-description="Start by adding your first executive to get started."
          class="text-nowrap"
          >
          <template #actions="{ item }">
            <button
              @click="selectedExecutive = item"
              class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
              :title="'View classes for ' + item?.name"
            >
              <EyeIcon class="h-4 w-4" />
            </button>
            <button
              class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
              :title="'Edit ' + item?.name"
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

      <!-- Stats Sidebar -->
      <div class="space-y-6">
        <!-- Executive Overview -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <ChartBarIcon class="h-5 w-5 mr-2 text-blue-500" />
            Executive Overview
          </h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Total Executives</span>
              <span class="font-bold text-2xl text-blue-600 dark:text-blue-400">{{ getAllExecutives.length }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Active Ministries</span>
              <span class="font-bold text-2xl text-green-600 dark:text-green-400">{{ ministries.length }}</span>
            </div>
          </div>
        </div>

        <!-- Recent Appointments -->
        <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl shadow-sm p-6 border border-green-200 dark:border-green-800">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <ClockIcon class="h-5 w-5 mr-2 text-green-500" />
            Recent Appointments
          </h3>
          <div class="space-y-3">
            <div v-for="recent in getRecentAppointments" :key="recent.name" class="flex items-center p-3 bg-white dark:bg-green-800/20 rounded-lg">
              <img :src="recent.avatar" :alt="recent.name" class="h-8 w-8 rounded-full object-cover">
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ recent.name }}</p>
                <p class="text-xs text-gray-600 dark:text-gray-400">{{ recent.position }}</p>
              </div>
              <span class="text-xs text-green-600 dark:text-green-400">{{ formatDate(recent.appointedDate) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Executive Modal -->
    <Modal
      v-model:is-open="isModalOpen"
      @close="closeModal"
      size="3xl"
      title="Add Executive"
    >
      <form @submit.prevent="saveExecutive" class="space-y-6">
        <!-- Personal Information -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
          <div class="mb-4">
              <FileInput
                v-model="executiveForm.image"
                accept="image/*"
                label="Image"
              />
            </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TextField
                v-model="executiveForm.name"
                label="Full Name"
                required
              />
            </div>
            <div>
              <TextField
                v-model="executiveForm.email"
                required
                label="Email"
              />
            </div>
            <div>
              <TextField
                v-model="executiveForm.phone"
                required
                label="Phone"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date of Birth</label>
              <DatePicker
                label="Date of Birth"
                v-model="executiveForm.dateOfBirth"
                size="sm"
              />
            </div>
          </div>
        </div>

        <!-- Ministry Position -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ministry & Position</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select v-model="executiveForm.ministry" label="Ministry" clearable searchable :options="ministries.map(ministry => ministry.name)" required />
            </div>
            <div>
              <TextField
                v-model="executiveForm.position"
                required
                label="Position"
              />
            </div>
            <div class="md:col-span-2 mt-6">
              <DatePicker
                v-model="executiveForm.appointedDate"
                required
                label="Appointed Date"
              />
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div>
          <Textarea
            v-model="executiveForm.bio"
            label="Bio"
          ></Textarea>
        </div>
      </form>

      <template #footer>
        <div class="flex space-x-3">
          <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
        </div>
      </template>
    </Modal>

    <!-- Executive Detail Modal -->
    <div v-if="selectedExecutive" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6">
          <div class="flex justify-between items-start">
            <div class="flex items-center">
              <img 
                :src="selectedExecutive.avatar" 
                :alt="selectedExecutive.name"
                class="h-16 w-16 rounded-full object-cover border-4 border-white shadow-lg"
              >
              <div class="ml-4">
                <h2 class="text-2xl font-bold">{{ selectedExecutive.name }}</h2>
                <p class="text-purple-100 text-lg">{{ selectedExecutive.position }}</p>
                <p class="text-purple-200 text-sm">{{ selectedExecutive.ministry }}</p>
              </div>
            </div>
            <button 
              @click="selectedExecutive = null"
              class="text-white hover:text-gray-200 transition-colors"
            >
              <XMarkIcon class="h-6 w-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <!-- Contact Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                <p class="text-gray-900 dark:text-white">{{ selectedExecutive.email }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</p>
                <!-- Continuation of Executive Detail Modal -->
<p class="text-gray-900 dark:text-white">{{ selectedExecutive.phone }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</p>
                <p class="text-gray-900 dark:text-white">{{ selectedExecutive.dateOfBirth ? formatDate(selectedExecutive.dateOfBirth) : 'Not provided' }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Appointed</p>
                <p class="text-gray-900 dark:text-white">{{ formatDate(selectedExecutive.appointedDate) }}</p>
              </div>
            </div>
          </div>

          <!-- Responsibilities -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Responsibilities</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="responsibility in selectedExecutive.responsibilities" 
                :key="responsibility"
                class="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-lg text-sm"
              >
                {{ responsibility }}
              </span>
            </div>
          </div>

          <!-- Biography -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Biography</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ selectedExecutive.bio || 'No biography provided.' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Text } from 'vue';
import {
  PlusIcon,
  UserIcon,
  XMarkIcon,
  ChartBarIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline';
import TextField from '~/components/UI/TextField.vue';
import DatePicker from '~/components/UI/DatePicker.vue';
import Textarea from '~/components/UI/Textarea.vue';
import Modal from '~/components/UI/Modal.vue';
import Table from '~/components/UI/Table.vue';
import Select from '../../components/UI/Select.vue';
import FileInput from '~/components/UI/FileInput.vue';

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

// Define interfaces for type safety
interface Executive {
  name: string;
  position: string;
  ministry: string;
  email: string;
  phone: string;
  image: string;
  appointedDate: string;
  dateOfBirth?: string;
  responsibilities: string[];
  bio?: string;
}

interface Ministry {
  name: string;
  description: string;
  icon: Component;
}

// Sample data (replace with API calls in production)
const executives = ref<Executive[]>([
  {
    name: 'John Doe',
    position: 'President',
    ministry: 'Youth Ministry',
    email: 'john.doe@example.com',
    phone: '+233 20 123 4567',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    appointedDate: '2023-01-15',
    dateOfBirth: '1985-04-20',
    responsibilities: ['Oversee youth programs', 'Coordinate events', 'Mentor youth leaders'],
    bio: 'John has served in the Youth Ministry for over a decade, passionate about empowering young leaders.'
  },
  {
    name: 'Jane Smith',
    position: 'Secretary',
    ministry: 'Women’s Ministry',
    email: 'jane.smith@example.com',
    phone: '+233 24 987 6543',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    appointedDate: '2024-03-10',
    responsibilities: ['Record meeting minutes', 'Organize retreats', 'Support community outreach'],
    bio: 'Jane is dedicated to fostering spiritual growth among women in the church.'
  },
  {
    name: 'Mark Johnson',
    position: 'Treasurer',
    ministry: 'Music Ministry',
    email: 'mark.johnson@example.com',
    phone: '+233 27 456 7890',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    appointedDate: '2023-06-20',
    responsibilities: ['Manage financial transactions', 'Coordinate music events', 'Provide financial support'],
    bio: 'Mark is responsible for handling financial matters in the Music Ministry.'
  },
  {
    name: 'Emily Davis',
    position: 'Vice President',
    ministry: 'Youth Ministry',
    email: 'emily.davis@example.com',
    phone: '+233 28 789 0123',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    appointedDate: '2023-09-05',
    responsibilities: ['Oversee youth programs', 'Coordinate events', 'Mentor youth leaders'],
    bio: 'Emily has served in the Youth Ministry for over a decade, passionate about empowering young leaders.'
  },
  {
    name: 'Michael Wilson',
    position: 'Director of Finance',
    ministry: 'Music Ministry',
    email: 'michael.wilson@example.com',
    phone: '+233 29 012 3456',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    appointedDate: '2023-12-15',
    responsibilities: ['Manage financial transactions', 'Coordinate music events', 'Provide financial support'],
    bio: 'Michael is responsible for handling financial matters in the Music Ministry.'
  }
]);

const executiveColumns = [
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'ministry', label: 'Ministry', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'appointedDate', label: 'Appointed Date', sortable: true },
];

const ministries = ref<Ministry[]>([
  {
    name: 'Youth Ministry',
    description: 'Empowering the next generation of church leaders',
    icon: UserIcon
  },
  {
    name: 'Women’s Ministry',
    description: 'Supporting and uplifting women in faith',
    icon: UserIcon
  },
  {
    name: 'Music Ministry',
    description: 'Leading worship through music and song',
    icon: UserIcon
  }
]);

// Reactive state
const editingExecutive = ref<Executive | null>(null);
const selectedExecutive = ref<Executive | null>(null);
const executiveForm = ref<Executive>({
  name: '',
  position: '',
  ministry: '',
  email: '',
  phone: '',
  image: '',
  appointedDate: '',
  dateOfBirth: '',
  responsibilities: [],
  bio: ''
});

// Computed properties
const getAllExecutives = computed(() => executives.value);


const getRecentAppointments = computed(() => {
  return executives.value
    .sort((a, b) => new Date(b.appointedDate).getTime() - new Date(a.appointedDate).getTime())
    .slice(0, 3);
});

// Methods
const formatDate = (date: string): string => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};


const saveExecutive = () => {
};

const closeModal = () => {
  isModalOpen.value = false;
  executiveForm.value = {
    name: '',
    position: '',
    ministry: '',
    email: '',
    phone: '',
    avatar: '',
    appointedDate: '',
    dateOfBirth: '',
    responsibilities: [],
    bio: ''
  };
}
</script>

<style scoped>
/* Custom styles for enhanced visuals */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

/* Smooth scrolling for modals */

/* Hover effects for cards */
.group:hover .ring-blue-500 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity));
}

/* Dark mode adjustments */
.dark .group:hover .ring-blue-400 {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(96 165 250 / var(--tw-ring-opacity));
}
</style>
