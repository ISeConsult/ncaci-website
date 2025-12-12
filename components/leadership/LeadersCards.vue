<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-6">
            <Tabs
            :tabs="[$t('leadership.tabs.executiveCouncil'), $t('leadership.tabs.districtAreaHeads'), $t('leadership.tabs.nationalMenFellowshipExecutive'), $t('leadership.tabs.nationalYouthExecutive')]"
            v-model="activeTab"
            @update:modelValue="onTabChange"
        />
        </div>
        <div v-if="leaders && leaders.length > 0">
            <!-- Two-column layout when leader is selected -->
            <div v-if="selectedLeader" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <!-- Left Side: Selected Leader Details -->
                <div class="flex flex-col items-center lg:items-start col-span-2 w-full">
                    <div class="border bg-white w-full relative">
                        <button @click="closeDetails" class="absolute top-4 right-4 text-gray-500 hover:text-blue-700 text-4xl">&times;</button>
                        <img :src="selectedLeader.image" :alt="selectedLeader.name" class="w-full h-64 object-contain mb-4" />
                    </div>
                    <div class="items-center justify-center bg-[#0110FA] p-6 w-full">
                        <h2 class="text-xl font-bold text-center text-white uppercase">{{ selectedLeader.name }}</h2>
                        <p class="text-base text-gray-300 text-center uppercase mt-1">{{ selectedLeader.position }}</p>
                    </div>
                    <div class="p-6 w-full bg-[#cfd2fe]">
                        <p class="text-sm text-gray-800" v-html="selectedLeader.biography"></p>
                    </div>
                </div>
                <!-- Right Side: Grid of Leaders -->
                <div class="lg:flex hidden flex-col col-span-1">
                    <div class="grid grid-cols-1 gap-4 w-full">
                        <div v-for="(item, index) in paginatedLeaders" :key="index">
                            <div class="border p-4 h-80 bg-white cursor-pointer hover:shadow-lg transition-shadow" @click="selectLeader(item)">
                                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 flex justify-center relative">
                        <Pagination
                        :current-page="currentPage"
                        :total-pages="totalPages"
                        :total-items="currentList.length"
                        :items-per-page="itemsPerPage"
                        @update:currentPage="currentPage = $event"
                    />
                    </div>
                </div>
            </div>
            <!-- Full-width grid when no leader is selected -->
            <div v-else class="flex flex-col justify-center items-center">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-8">
                    <div v-for="(item, index) in paginatedLeaders" :key="index">
                        <div class="border p-4 rounded-3xl h-80 bg-white cursor-pointer hover:shadow-lg transition-shadow" @click="selectLeader(item)">
                            <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
                <div class="mt-8 flex justify-center relative">
                    <Pagination
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    :total-items="currentList.length"
                    :items-per-page="itemsPerPage"
                    @update:currentPage="currentPage = $event"
                />
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col justify-center items-center mt-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 col-span-5">
            <svg class="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-gray-500 text-lg font-medium">No Leader found</p>
            <p class="text-gray-400 text-sm mt-1">
                There are no leaders to display at the moment.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Pagination from '~/components/UI/Pagination.vue'
import Tabs from '~/components/UI/Tabs.vue'
import { useLeadersStore } from '~/stores/useLeadersStore'
import { storeToRefs } from 'pinia'

const LeadersStore = useLeadersStore()
const { leaders } = storeToRefs(LeadersStore)

const currentPage = ref(1)
const activeTab = ref(0)
const selectedLeader = ref(null)

const itemsPerPage = computed(() => selectedLeader.value ? 4 : 8)

const executiveCouncil = computed(() => leaders.value.filter(leader => leader.category === 'executive_council'))
const districtAreaHeads = computed(() => leaders.value.filter(leader => leader.category === 'district_area_heads'))
const menFellowship = computed(() => leaders.value.filter(leader => leader.category === 'men_fellowship'))
const womenAndYouth = computed(() => leaders.value.filter(leader => leader.category === 'women_and_youth'))

const currentList = computed(() => {
  switch (activeTab.value) {
    case 0: return executiveCouncil.value
    case 1: return districtAreaHeads.value
    case 2: return menFellowship.value
    case 3: return womenAndYouth.value
    default: return leaders.value
  }
})

const totalPages = computed(() => Math.ceil(currentList.value.length / itemsPerPage.value))

const paginatedLeaders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return currentList.value.slice(start, end)
})

const selectLeader = (leader) => {
    selectedLeader.value = leader
}

const closeDetails = () => {
    selectedLeader.value = null
}

const onTabChange = (index) => {
  activeTab.value = index
  selectedLeader.value = null
  currentPage.value = 1
}

onMounted(() => {
    LeadersStore.fetchLeaders()
    console.log('Leaders loaded:', leaders)
})
</script>

<style scoped>

</style>
