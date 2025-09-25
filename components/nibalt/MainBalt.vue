<template>
  <div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Tabs v-model="selectedTab" :tabs="tabs" />
    </div>
    <div>
      <History v-if="selectedTab === 0" />
      <Faculty v-if="selectedTab === 1" />
      <Academic v-if="selectedTab === 2" />
      <Admission v-if="selectedTab === 3" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Tabs from '../UI/Tabs.vue'
import History from './History.vue'
import Faculty from './Faculty.vue'
import Academic from './Academic.vue'
import Admission from './Admission.vue'

const tabs = ['History', 'Faculty & Management', 'Academic Programs', 'Admission Requirements']
const selectedTab = ref(0)
</script>

<style lang="scss" scoped>

</style>
