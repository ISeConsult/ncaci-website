<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 w-96">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :type="toast.type"
      :duration="toast.duration"
      @close="removeToast(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
import Toast from '~/components/UI/Toast.vue'
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()
</script>
