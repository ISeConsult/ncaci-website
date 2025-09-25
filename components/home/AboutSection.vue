<template>
  <div class="bg-center pt-20 pb-10 relative section1-bg">
    <div class="blurred-bg absolute inset-0"></div>
    <div class="relative z-10 flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl font-bold text-center my-10 uppercase text1">
        A Church That's Relevant
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
        <div v-for="(item, index) in aboutData" :key="index" class="flex items-start space-x-4 bg-[#ffeded] bg-opacity-80 p-6 border-b-8 border-[#FF4949]">
          <div class="p-6">
            <div class="flex items-center justify-center w-12 h-12 bg-[#FF4949] rounded-full mb-10">
              <component :is="item.icon" class="w-8 h-8 text-white flex-shrink-0" />
            </div>
            <div>
              <h2 class="text-xl font-bold uppercase text-black mb-2">{{ item.title }}</h2>
              <p class="text-black font-thin text-sm">{{ item.description }}</p>
            </div>
          </div>
          <!-- <div class=" w-full h-2 bg-[#FF4949]"></div> -->
        </div>
      </div>
    </div>

    <!-- Ministry Section -->
     <MinistrySection/>

     <!--Missionary Section-->
     <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
      <span class="text-xs font-thin text-center uppercase text1 mb-4">our missisosn & vision</span>
      <h1 class="text-2xl font-bold text-center uppercase text1 mb-2">celebrate with us</h1>
      <p class="text-1 font-semibold text-sm">Read More <ArrowRightIcon class="w-4 h-4 inline-block"/></p>
     </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, UserIcon, HeartIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'
import MinistrySection from './MinistrySection.vue'

const aboutData = [
  {
    title: 'About Us',
    icon: HomeIcon,
    description:
      'To lead people into a growing relationship with Jesus Christ and to impact the world for His glory.',
  },
  {
    title: 'Get Involved',
    icon: UserIcon,
    description:
      'To be a vibrant community of believers who are passionate about worship, discipleship, and outreach.',
  },
  {
    title: 'Giving Back',
    icon: HeartIcon,
    description:
      'We value authenticity, community, service, and spiritual growth.',
  },
]
</script>

<style scoped>
.section1-bg {
  min-height: 400px;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
}

.blurred-bg {
  position: absolute;
  inset: 0;
  background-image: url('/images/church-bg.png');
  background-size: cover;
  background-position: center;
  filter: blur(6px);
  transform: scale(1.05);
  z-index: 0;
}
</style>
