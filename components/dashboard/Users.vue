<template>
    <div>
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
        <button @click="openModal(null)" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-medium shadow-md">
          <PlusIcon class="h-5 w-5 mr-2" />
          Add User
        </button>
      </div>
    </div>

    <!-- Users Table -->
    <Table :columns="columns" :data="users" :rows="users" title="Users" :searchable="true" :search-placeholder="'Search users...'" :items-per-page="10" :pagination="true" class="text-nowrap">
      <template #actions="{ item }">
        <button @click="openModal(item)" class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded">
          <PencilIcon class="h-4 w-4" />
        </button>
        <button @click="openDeleteModal(item)" class="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded">
          <TrashIcon class="h-4 w-4" />
        </button>
      </template>
    </Table>
    
    <!--Add/Edit user modal -->
    <Modal v-model:is-open="isModalOpen" size="3xl" :title="isEditing ? 'Edit User' : 'Add New User'" @close="closeModal">

      <form @submit.prevent="submitForm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField v-model="formData.first_name" label="First Name" placeholder="John" />
          <TextField v-model="formData.last_name" label="Last Name" placeholder="Doe" />
          <TextField v-model="formData.email" label="Email" placeholder="3o9jS@example.com" />
          <TextField v-model="formData.phone_number" label="Phone" placeholder="123-456-7890" />
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <Button
            @click="closeModal"
            type="button"
            variant="secondary"
          >
            Cancel
          </Button>
          <Button
            @click="submitForm"
            type="button"
            variant="primary"
            :loading="loading"
          >
            {{ isEditing ? 'Update User' : 'Add User' }}
          </Button>
        </div>
      </template>
    </Modal>

    <!-- Delete confirmation modal -->
    <Modal v-model:is-open="isDeleteModalOpen" size="md" title="Confirm Delete" @close="cancelDelete">
      <p class="text-gray-700 dark:text-gray-300">
        Are you sure you want to delete the user "{{ userToDelete?.first_name }} {{ userToDelete?.last_name }}"? This action cannot be undone.
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '../UI/Table.vue';
import Modal from '../UI/Modal.vue';
import TextField from '../UI/TextField.vue';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/useUserStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useToast } from '~/composables/useToast'
import Button from '../UI/Button.vue';

const UserStore = useUserStore();
const { users, loading } = storeToRefs(UserStore);

const { addToast } = useToast()


onMounted(() => {
  UserStore.fetchUsers();
  console.log('users:', users);
});

const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: ''
})

const columns = [
    { key: 'first_name', label: 'First Name', sortable: true },
    { key: 'last_name', label: 'Last Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'phone_number', label: 'Phone', sortable: true }
]

const isModalOpen = ref(false)
const isEditing = ref(false)
const editingUser = ref(null)
const isDeleteModalOpen = ref(false)
const userToDelete = ref(null)

const openModal = (user = null) => {
  isEditing.value = !!user
  editingUser.value = user
  
  formData.value = isEditing.value ? { ...user } : {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  }
  
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditing.value = false
  editingUser.value = null
  formData.value = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  }
}

const submitForm = async () => {
  try {
    let response;
    if (isEditing.value) {
      response = await UserStore.updateUser(editingUser.value.uid, formData.value)
    } else {
      response = await UserStore.addUser(formData.value)
    }
    addToast(response.data.message || 'User added successfully', 'success')
    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    addToast(error.response.data.message, 'error')
  }
}

const openDeleteModal = (user) => {
  userToDelete.value = user
  isDeleteModalOpen.value = true
}

const confirmDelete = async () => {
  try {
    await UserStore.deleteUser(userToDelete.value.uid)
    isDeleteModalOpen.value = false
    userToDelete.value = null
    addToast('User deleted successfully', 'success')
  } catch (error) {
    console.error('Error deleting user:', error)
    addToast(error.response.data.message, 'error')
  }
}

const cancelDelete = () => {
  isDeleteModalOpen.value = false
  userToDelete.value = null
}


</script>

<style scoped>

</style>