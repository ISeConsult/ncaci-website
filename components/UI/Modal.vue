<template>
  <transition
    enter-active-class="transition-opacity ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="closeOnBackdrop && close()"
      ></div>

      <!-- Modal container -->
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <transition
          enter-active-class="transition-all ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition-all ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="isOpen"
            :class="[
              'modal-root relative transform overflow-visible rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 w-full',
              sizeClasses,
              className
            ]"
          >
            <!-- Header -->
            <div v-if="$slots.header || title" class="bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="flex items-center justify-between">
                <slot name="header">
                  <h3
                    v-if="title"
                    class="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                    id="modal-title"
                  >
                    {{ title }}
                  </h3>
                </slot>
                <button
                  v-if="showCloseButton"
                  type="button"
                  class="rounded-md bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  @click="close()"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" />
                </button>
              </div>
            </div>

            <!-- Body -->
            <div :class="['px-6 py-4', { 'sm:flex sm:items-start': !fullWidth }]">
              <div class="w-full">
                <slot />
              </div>
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3"
            >
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

interface Props {
  isOpen: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
  closeOnBackdrop?: boolean;
  showCloseButton?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  size: 'md',
  closeOnBackdrop: true,
  showCloseButton: true,
  fullWidth: false
});

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
  (e: 'close'): void;
}>();

const sizeClasses = computed(() => {
  const classes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    full: 'max-w-full mx-4'
  };
  return classes[props.size] || classes.md;
});

const close = () => {
  console.log('Modal close triggered'); // Debug
  emit('update:isOpen', false);
  emit('close');
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    console.log('Modal Escape pressed'); // Debug
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
  if (props.isOpen) {
    document.body.style.overflow = 'hidden';
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = 'unset';
});
</script>