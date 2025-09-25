<template>
  <div class="relative" @click.stop>
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      :class="[
        'block text-sm font-medium mb-1',
        { 'text-red-600': error },
        { 'text-gray-700 dark:text-gray-300': !error }
      ]"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Select Trigger -->
    <div ref="selectRef" class="relative">
      <button
        :id="id"
        :disabled="disabled"
        :class="[
          'w-full px-4 py-2 text-left border rounded-md shadow-sm transition-all duration-200 focus:outline-none',
          'flex items-center justify-between',
          {
            'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500': !error && !disabled,
            'border-red-300 bg-white text-red-900 focus:ring-red-500 focus:border-red-500': error,
            'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed opacity-75': disabled,
            '': isOpen && !error,
            'pr-10': !clearable || !selectedOptionSingle,
            'pr-16': clearable && selectedOptionSingle
          }
        ]"
        @click.stop="toggleDropdown"
        @keydown="handleKeydown"
      >
        <!-- Selected value display -->
        <span class="truncate">
          <span v-if="selectedOptionSingle">
            <slot name="selected" :option="selectedOptionSingle ?? {}" :value="selectedOptionSingle?.value ?? ''">
              {{ selectedOptionSingle?.label ?? selectedOptionSingle?.value ?? '' }}
            </slot>
          </span>
          <span v-else class="text-gray-400">
            {{ placeholder }}
          </span>
        </span>

        <!-- Icons -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3">
          <!-- Clear button -->
          <button
            v-if="clearable && selectedOptionSingle"
            type="button"
            class="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            @click.stop="clearSelection"
            aria-label="Clear selection"
          >
            <XMarkIcon class="h-4 w-4" />
          </button>

          <!-- Chevron icon -->
          <ChevronDownIcon
            :class="[
              'h-5 w-5 text-gray-400 transition-transform duration-200',
              { 'transform rotate-180': isOpen }
            ]"
          />
        </div>
      </button>
    </div>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="dropdownRef"
        class="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1 focus:outline-none"
        @click.stop
      >
        <!-- Search input -->
        <div v-if="searchable" class="px-3 py-2 border-b border-gray-100 dark:border-gray-600">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              ref="searchInputRef"
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 focus:outline-none"
              @input="handleSearchInput"
              @keydown="handleSearchKeydown"
            />
          </div>
        </div>

        <!-- Options list -->
        <div class="py-1">
          <!-- Grouped options -->
          <template v-if="hasGroups">
            <div
              v-for="(group, groupIndex) in filteredGroupedOptions"
              :key="groupIndex"
            >
              <!-- Group header -->
              <div
                v-if="group.label"
                class="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-700"
              >
                {{ group.label }}
              </div>

              <!-- Group options -->
              <button
                v-for="option in group.options"
                :key="option.value"
                :disabled="option.disabled"
                :class="[
                  'w-full px-3 py-2 text-left text-sm transition-colors duration-150',
                  'flex items-center',
                  {
                    'bg-blue-50 dark:bg-blue-900/30 text-blue-700': isOptionSelected(option),
                    'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100': !isOptionSelected(option) && !option.disabled,
                    'text-gray-400 dark:text-gray-500 cursor-not-allowed': option.disabled
                  }
                ]"
                @click.stop="selectOption(option)"
              >
                <CheckIcon
                  v-if="isOptionSelected(option)"
                  class="h-4 w-4 text-blue-600 mr-2 flex-shrink-0"
                />
                <div v-else class="w-4 h-4 mr-2 flex-shrink-0"></div>
                <slot name="option" :option="option">
                  <div class="flex-1 min-w-0">
                    <div class="font-medium truncate">{{ option.label || option.value }}</div>
                    <div v-if="option.description" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {{ option.description }}
                    </div>
                  </div>
                </slot>
              </button>
            </div>
          </template>

          <!-- Ungrouped options -->
          <template v-else>
            <button
              v-for="option in filteredOptions"
              :key="option.value"
              :disabled="option.disabled"
              :class="[
                'w-full px-3 py-2 text-left text-sm transition-colors duration-150',
                'flex items-center',
                {
                  'bg-blue-50 dark:bg-blue-900/30 text-blue-700': isOptionSelected(option),
                  'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100': !isOptionSelected(option) && !option.disabled,
                  'text-gray-400 dark:text-gray-500 cursor-not-allowed': option.disabled
                }
              ]"
              @click.stop="selectOption(option)"
            >
              <CheckIcon
                v-if="isOptionSelected(option)"
                class="h-4 w-4 text-blue-600 mr-2 flex-shrink-0"
              />
              <div v-else class="w-4 h-4 mr-2 flex-shrink-0"></div>
              <slot name="option" :option="option">
                <div class="flex-1 min-w-0">
                  <div class="font-medium truncate">{{ option.label || option.value }}</div>
                  <div v-if="option.description" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {{ option.description }}
                  </div>
                </div>
              </slot>
            </button>
          </template>

          <!-- No results message -->
          <div
            v-if="filteredOptions.length === 0"
            class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center"
          >
            No options found
          </div>
        </div>
      </div>
    </transition>

    <!-- Error Message -->
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>

    <!-- Help Text -->
    <p v-if="helpText && !error" class="mt-1 text-sm text-gray-500">{{ helpText }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import {
  ChevronDownIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CheckIcon
} from '@heroicons/vue/24/outline';

interface SelectOption {
  value: any;
  label?: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

interface SelectOptionGroup {
  label?: string;
  options: SelectOption[];
}

interface Props {
  modelValue?: any;
  options: (SelectOption | string | number)[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  helpText?: string;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  disabled: false,
  required: false,
  searchable: false,
  clearable: false,
  multiple: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
  (e: 'change', value: any): void;
}>();

const id = computed(() => `select-${Math.random().toString(36).substr(2, 9)}`);
const isOpen = ref(false);
const searchQuery = ref('');
const dropdownRef = ref<HTMLElement | null>(null);
const searchInputRef = ref<HTMLInputElement | null>(null);
const selectRef = ref<HTMLElement | null>(null);

// Normalize options
const normalizedOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'string' || typeof option === 'number') {
      return { value: option, label: String(option) };
    }
    return option;
  });
});

// Group options if they have group property
const groupedOptions = computed(() => {
  const groups: Record<string, SelectOptionGroup> = {};
  const ungrouped: SelectOption[] = [];

  normalizedOptions.value.forEach(option => {
    if (option.group) {
      if (!groups[option.group]) {
        groups[option.group] = { label: option.group, options: [] };
      }
      groups[option.group].options.push(option);
    } else {
      ungrouped.push(option);
    }
  });

  const result: SelectOptionGroup[] = Object.values(groups);
  if (ungrouped.length > 0) {
    result.push({ options: ungrouped });
  }

  return result;
});

const hasGroups = computed(() => {
  return normalizedOptions.value.some(option => option.group);
});

// Filter options based on search query
const filteredOptions = computed(() => {
  if (!searchQuery.value) {
    return normalizedOptions.value;
  }

  const query = searchQuery.value.toLowerCase();
  return normalizedOptions.value.filter(option => {
    const label = option.label || String(option.value);
    const description = option.description || '';
    return label.toLowerCase().includes(query) || description.toLowerCase().includes(query);
  });
});

const filteredGroupedOptions = computed(() => {
  if (!searchQuery.value) {
    return groupedOptions.value;
  }

  const query = searchQuery.value.toLowerCase();
  return groupedOptions.value
    .map(group => ({
      ...group,
      options: group.options.filter(option => {
        const label = option.label || String(option.value);
        const description = option.description || '';
        return label.toLowerCase().includes(query) || description.toLowerCase().includes(query);
      })
    }))
    .filter(group => group.options.length > 0);
});

// Selected option(s)
const selectedOption = computed(() => {
  if (props.multiple) {
    if (Array.isArray(props.modelValue)) {
      return normalizedOptions.value.filter(option =>
        props.modelValue.includes(option.value)
      );
    }
    return [];
  }

  return normalizedOptions.value.find(option => option.value === props.modelValue) || null;
});

const selectedOptionSingle = computed(() => {
  if (props.multiple) {
    return null;
  }

  return normalizedOptions.value.find(option => option.value === props.modelValue) || null;
});

const isOptionSelected = (option: SelectOption) => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.includes(option.value);
  }
  return props.modelValue === option.value;
};

// Methods
const toggleDropdown = () => {
  if (props.disabled) return;
  console.log('Toggle dropdown:', isOpen.value ? 'closing' : 'opening'); // Debug
  isOpen.value = !isOpen.value;
  if (isOpen.value && props.searchable) {
    nextTick(() => searchInputRef.value?.focus());
  }
};

const selectOption = (option: SelectOption) => {
  if (option.disabled) return;
  console.log('Option selected:', option.value); // Debug
  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue) ? [...props.modelValue] : [];
    const index = currentValue.indexOf(option.value);
    if (index > -1) {
      currentValue.splice(index, 1);
    } else {
      currentValue.push(option.value);
    }
    emit('update:modelValue', currentValue);
    emit('change', currentValue);
  } else {
    emit('update:modelValue', option.value);
    emit('change', option.value);
    isOpen.value = false;
    searchQuery.value = '';
  }
};

const clearSelection = () => {
  if (props.disabled) return;
  console.log('Clear selection'); // Debug
  if (props.multiple) {
    emit('update:modelValue', []);
    emit('change', []);
  } else {
    emit('update:modelValue', null);
    emit('change', null);
  }
};

const handleSearchInput = () => {
  // Search logic handled by computed properties
};

const handleSearchKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    console.log('Select Escape pressed'); // Debug
    event.preventDefault();
    event.stopPropagation();
    isOpen.value = false;
    searchQuery.value = '';
  } else if (event.key === 'Enter') {
    event.preventDefault();
    const firstOption = filteredOptions.value[0];
    if (firstOption && !firstOption.disabled) {
      selectOption(firstOption);
    }
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled) return;

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      toggleDropdown();
      break;
    case 'Escape':
      console.log('Select Escape keydown'); // Debug
      event.preventDefault();
      event.stopPropagation();
      if (isOpen.value) {
        isOpen.value = false;
        searchQuery.value = '';
      }
      break;
    case 'ArrowDown':
      if (!isOpen.value) {
        event.preventDefault();
        isOpen.value = true;
      }
      break;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    selectRef.value &&
    event.target instanceof Node &&
    !selectRef.value.contains(event.target)
  ) {
    console.log('Select click outside:', event.target); // Debug
    const modalRoot = document.querySelector('.modal-root');
    if (modalRoot && modalRoot.contains(event.target)) {
      console.log('Click inside modal, keeping dropdown open'); // Debug
      return; // Don't close dropdown if clicking inside modal
    }
    isOpen.value = false;
    searchQuery.value = '';
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Custom scrollbar for dropdown */
.max-h-60::-webkit-scrollbar {
  width: 6px;
}

.max-h-60::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.max-h-60::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.max-h-60::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>