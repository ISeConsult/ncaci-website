<template>
  <footer class="bg-[#0110FA] text-white">
    <!-- Main footer content -->
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 md:gap-8">
        <!-- Brand section -->
        <div class="space-y-8 xl:col-span-1">
          
          <!-- <div class="flex items-center">
            <div class="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">N</span>
            </div>
            <span class="ml-2 text-xl font-bold">NuxtApp</span>
          </div> -->
          <p class="mt-8 text-base text-gray-100 md:mt-0 md:order-1">
            &copy; {{ new Date().getFullYear() }} THENCACINT. All rights reserved.
          </p>

          <p class="text-base text-gray-100">
            Second St. Mamprobi opp Rebecca Akufo Addo GHAPACC Sunshine House
          </p>

          <p class="text-base text-gray-100">Phone: (+233) 302 663 239</p>
          <p class="text-base text-gray-100">Email: info@thencacint.org</p>
        </div>

        <!-- Links sections -->
        <div class="mt-12 xl:mt-0 xl:col-span-2">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="grid grid-cols-2 gap-8">
              <!-- Solutions -->
              <div>
                <h3 class="text-md font-semibold text-white tracking-wider uppercase">
                  {{ $t('footer.quickLinks') }}
                </h3>
                <ul class="mt-4 space-y-4">
                  <li v-for="item in solutions" :key="item.name" class="flex">
                    <div class="dot mr-2">•</div>
                    <a :href="item.href" class="text-base text-gray-200 hover:text-red-600 transition-colors duration-200">
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Contact -->
              <div class="mt-0">
                <h3 class="text-md font-semibold text-white tracking-wider uppercase">
                  {{ $t('footer.contact') }}
                </h3>
                <div class="mt-4 flex">
                  <div v-for="item in contact " :key="item.href" class="flex items-center space-x-4">
                    <component :is="item.icon" class="h-5 w-5 text-gray-100 cursor-pointer hover:text-red-600" />
                    <a :href="item.href" class="text-base text-gray-100 hover:text-white transition-colors duration-200">
                      <!-- You can add specific contact info here if needed -->
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Newsletter section -->
            <div class="">
              <div class="space-y-6">
                <div>
                  <h3 class="text-4xl font-semibold text-gray-300 tracking-wider uppercase">
                    {{ $t('footer.subscribeTitle') }}
                  </h3>
                </div>
                <div class="mt-4 lg:mt-0">
                  <form class="sm:flex sm:max-w-md">
                    <label for="email-address" class="sr-only">Email address</label>
                    <input
                      type="email"
                      name="email-address"
                      id="email-address"
                      autocomplete="email"
                      required
                      class="w-full min-w-0 appearance-none rounded-md border border-gray-600 bg-gray-800 py-2 px-4 text-base text-white placeholder-gray-400 sm:max-w-xs focus:outline-none"
                      :placeholder="$t('footer.emailPlaceholder')"
                    >
                    <div class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                      <button
                        type="submit"
                        class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-base font-medium text-white hover:bg-red-700 focus:outline-none transition-colors duration-200"
                      >
                        {{ $t('footer.subscribe') }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/vue/24/outline'


const solutions = [
  { name: $t('footer.ourMission'), href: '#' },
  { name: $t('footer.ourVision'), href: '#' },
  { name: $t('footer.ourHistory'), href: '#' },
  { name: $t('footer.leadership'), href: '#' },
  { name: $t('footer.mainConvocation'), href: '#' },

]

const contact = [
  { icon: PhoneIcon, href: '#' },
  { icon: EnvelopeIcon, href: '#' },
  { icon: MapPinIcon, href: '#' }
]

const company = [
  { name: 'About', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Press', href: '#' },
  { name: 'Partners', href: '#' }
]

const legal = [
  { name: 'Privacy', href: '#' },
  { name: 'Terms', href: '#' },
  { name: 'Cookie Policy', href: '#' },
  { name: 'GDPR', href: '#' }
]

const bottomLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
  { name: 'Sitemap', href: '#' }
]
</script>