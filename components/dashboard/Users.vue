<template>
    <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Users
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Manage your community's users
        </p>
      </div>
      <div class="flex gap-3">
        <button @click="openModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-medium shadow-md">
          <PlusIcon class="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>
    </div>

    <!-- Users Table -->
    <Table :columns="columns" :data="users" :rows="users" title="Users" :searchable="true" :search-placeholder="'Search users...'" :items-per-page="10" :pagination="true" class="text-nowrap">
      <template #actions="{ item }">
        <button class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded">
          <PencilIcon class="h-4 w-4" />
        </button>
        <button class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded">
          <TrashIcon class="h-4 w-4" />
        </button>
      </template>
    </Table>
    
    <!--Add user modal -->
    <Modal v-model:is-open="isModalOpen" size="3xl" title="Add New User" @close="closeModal">
      
      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField v-model="formData.name" label="Name" placeholder="John Doe" />
          <TextField v-model="formData.email" label="Email" placeholder="3o9jS@example.com" />
          <Select v-model="formData.role" label="Role" clearable placeholder="Select role" :options="['Admin', 'Member']" />
          <Select v-model="formData.status" label="Status" clearable placeholder="Select status" :options="['Active', 'Inactive']" />
          <TextField v-model="formData.position" label="Position" placeholder="Senior Pastor" />
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeModal"
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add User
          </button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '../UI/Table.vue';
import Modal from '../UI/Modal.vue';
import TextField from '../UI/TextField.vue';
import Select from '../UI/Select.vue';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

const formData = ref({
  name: '',
  email: '',
  role: '',
  status: '',
  position: ''
})

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: '3o9jS@example.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2022-01-01',
        position: 'Senior Pastor'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'ZV6m9@example.com',
        role: 'Member',
        status: 'Inactive',
        lastLogin: '2022-02-01',
        position: 'Pastor'
    },
    {
        id: 3,
        name: 'Bob Johnson',
        email: 'ZV6m9@example.com',
        role: 'Member',
        status: 'Active',
        lastLogin: '2022-03-01',
        position: 'Pastor'
    },
    {
        id: 4,
        name: 'Alice Williams',
        email: 'ZV6m9@example.com',
        role: 'Member',
        status: 'Inactive',
        lastLogin: '2022-04-01',
        position: 'Pastor'
    },
    {
        id: 5,
        name: 'Charlie Brown',
        email: 'ZV6m9@example.com',
        role: 'Member',
        status: 'Active',
        lastLogin: '2022-05-01',
        position: 'Pastor'
    }
]

const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true },
    { key: 'position', label: 'Position', sortable: true },
]

const isModalOpen = ref(false)
const openModal = () => {
  isModalOpen.value = true
}
const closeModal = () => {
  isModalOpen.value = false
}

const submitForm = () => {
  console.log('Form submitted')
}


</script>

<style scoped>

</style>