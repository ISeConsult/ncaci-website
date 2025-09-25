<!-- components/sections/LeadershipDirectory.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="md:flex space-y-4 md:space-y-0 justify-between items-center mb-10">
      <div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">Leadership Directory</h1>
        <p class="text-gray-600 dark:text-gray-400">Meet our dedicated leaders serving our community</p>
      </div>
      <button @click="openModal" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center font-medium shadow-md">
        <PlusIcon class="h-5 w-5 mr-2" />
        Add Leader
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
      <div v-for="summary in summaryStats" :key="summary.title" 
           class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div :class="['p-3 rounded-full', summary.bgColor]">
            <component :is="summary.icon" :class="['h-6 w-6', summary.color]" />
          </div>
          <div class="ml-4">
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ summary.value }}</p>
            <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ summary.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Leadership Categories Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div v-for="category in leadershipCategories" :key="category.name" 
           class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        
        <!-- Category Header -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-6 border-b border-gray-200 dark:border-gray-600">
          <div class="flex items-center">
            <div :class="['p-3 rounded-full bg-white dark:bg-gray-900 shadow-sm', category.bgColor]">
              <component :is="category.icon" :class="['h-6 w-6', category.color]" />
            </div>
            <div class="ml-4">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ category.name }}</h2>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ category.members.length }} members</p>
            </div>
          </div>
        </div>

        <!-- Members List -->
        <div class="p-6">
          <div class="space-y-6">
            <div v-for="leader in category.members" :key="leader.id" 
                 class="bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
              
              <!-- Main Leader Card -->
              <div class="flex gap-4 p-4">
                <!-- Avatar -->
                <div class="flex-shrink-0">
                  <img :src="leader.avatar" :alt="leader.name" 
                       class="h-16 w-16 rounded-full object-cover border-2 border-white dark:border-gray-600 shadow-sm">
                </div>
                
                <!-- Leader Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ leader.name }}</h3>
                      <p class="text-sm font-medium text-blue-600 dark:text-blue-400">{{ leader.position }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <ClockIcon class="h-4 w-4 mr-1" />
                        {{ leader.tenure }}
                      </div>
                      <!-- Biography Toggle Icon -->
                      <button @click="toggleBiography(leader.id)" 
                              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                        <InformationCircleIcon v-if="!expandedBios[leader.id]" class="h-5 w-5" />
                        <XMarkIcon v-else class="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <!-- Brief Description -->
                  <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    {{ leader.briefDescription }}
                  </p>
                  
                  <!-- Contact Info & Specialties -->
                  <div class="flex flex-wrap gap-3 text-xs mb-3">
                    <div v-if="leader.email" class="flex items-center text-gray-600 dark:text-gray-400">
                      <EnvelopeIcon class="h-3 w-3 mr-1" />
                      {{ leader.email }}
                    </div>
                    <div v-if="leader.phone" class="flex items-center text-gray-600 dark:text-gray-400">
                      <PhoneIcon class="h-3 w-3 mr-1" />
                      {{ leader.phone }}
                    </div>
                  </div>
                  
                  <!-- Specialties/Focus Areas -->
                  <div v-if="leader.specialties" class="flex flex-wrap gap-1">
                    <span v-for="specialty in leader.specialties" :key="specialty"
                          class="inline-block px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                      {{ specialty }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Expandable Biography Section -->
              <div v-if="expandedBios[leader.id]" class="border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-4">
                <div class="flex items-start gap-3">
                  <BookOpenIcon class="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Full Biography</h4>
                    <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                      {{ leader.fullBiography }}
                    </p>
                    <div v-if="leader.achievements" class="mt-3">
                      <h5 class="text-xs font-semibold text-gray-900 dark:text-white mb-2">Key Achievements</h5>
                      <ul class="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li v-for="achievement in leader.achievements" :key="achievement" class="flex items-start">
                          <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                          {{ achievement }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for adding new leader -->
    <Modal v-model:is-open="isModalOpen" size="3xl" @close="closeModal" title="Add New Leader">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <FileInput v-model="newLeader.avatar" accept="image/*" label="Image" />
        </div>
        <div>
          <Select v-model="newLeader.category" label="Category" :options="leadershipCategories.map(cat => cat.name)" required />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField v-model="newLeader.name" label="Name" required />
          <TextField v-model="newLeader.position" label="Position" required />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField v-model="newLeader.email" label="Email" type="email" />
          <TextField v-model="newLeader.phone" label="Phone" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField v-model="newLeader.tenure" label="Tenure" />
        </div>
        <div>
          <ClientOnly>
            <component :is="QuillEditor" v-if="QuillEditor" v-model:content="newLeader.fullBiography" content-type="html" label="Full Biography" placeholder="Enter Full Biography" />
            <Textarea v-else v-model="newArticleContent" label="Full Biography" placeholder="Enter Full Biography" rows="6" required />
          </ClientOnly>
        </div>
        <Textarea v-model="newLeader.specialties" label="Specialties (comma-separated)" rows="2" />
      </form>
      <template #footer>
          <div class="flex justify-end space-x-2">
            <Button type="button" @click="closeModal" variant="secondary">Cancel</Button>
            <Button type="submit" variant="primary">Add Leader</Button>
          </div>
        </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  UsersIcon,
  MapPinIcon,
  PlusIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon,
  InformationCircleIcon,
  XMarkIcon,
  BookOpenIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  HeartIcon,
  CalendarDaysIcon
} from '@heroicons/vue/24/outline'
import Modal from '~/components/UI/Modal.vue'
import TextField from '~/components/UI/TextField.vue'
import Textarea from '~/components/UI/Textarea.vue'
import Button from '~/components/UI/Button.vue'
import Select from '~/components/UI/Select.vue'
import FileInput from '../UI/FileInput.vue'
const QuillEditor = ref(null)
const quillCssLoaded = ref(false)

if (process.client) {
  import('@vueup/vue-quill').then((module) => {
    QuillEditor.value = module.QuillEditor
  })
  import('@vueup/vue-quill/dist/vue-quill.snow.css').then(() => {
    quillCssLoaded.value = true
  })
}

// Reactive state for expanded biographies
const expandedBios = ref({})

// Function to toggle biography display
const toggleBiography = (leaderId) => {
  expandedBios.value[leaderId] = !expandedBios.value[leaderId]
}

// Reactive state for modal and new leader
const isModalOpen = ref(false)
const newLeader = ref({
  name: '',
  position: '',
  category: '',
  avatar: '',
  tenure: '',
  email: '',
  phone: '',
  briefDescription: '',
  fullBiography: '',
  achievements: '',
  specialties: ''
})

// Function to open modal
const openModal = () => {
  isModalOpen.value = true
}

// Function to close modal
const closeModal = () => {
  isModalOpen.value = false
  newLeader.value = {
    name: '',
    position: '',
    category: '',
    avatar: '',
    tenure: '',
    email: '',
    phone: '',
    briefDescription: '',
    fullBiography: '',
    achievements: '',
    specialties: ''
  }
}

// Function to submit form
const submitForm = () => {
  if (newLeader.value.name && newLeader.value.position && newLeader.value.category) {
    const category = leadershipCategories.value.find(cat => cat.name === newLeader.value.category)
    if (category) {
      const newId = Math.max(...leadershipCategories.value.flatMap(cat => cat.members.map(m => m.id))) + 1
      const leader = {
        id: newId,
        name: newLeader.value.name,
        position: newLeader.value.position,
        avatar: newLeader.value.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        tenure: newLeader.value.tenure,
        email: newLeader.value.email,
        phone: newLeader.value.phone,
        briefDescription: newLeader.value.briefDescription,
        fullBiography: newLeader.value.fullBiography,
        achievements: newLeader.value.achievements ? newLeader.value.achievements.split('\n').filter(a => a.trim()) : [],
        specialties: newLeader.value.specialties ? newLeader.value.specialties.split(',').map(s => s.trim()) : []
      }
      category.members.push(leader)
      closeModal()
    }
  }
}

// Summary statistics
const summaryStats = [
  {
    title: 'Total Leaders',
    value: '12',
    icon: UserGroupIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Leadership Categories',
    value: '4',
    icon: BuildingOffice2Icon,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'Years Combined Service',
    value: '96',
    icon: CalendarDaysIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'Community Programs',
    value: '25+',
    icon: HeartIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30'
  }
]

// Data with expanded member information including full biographies
const leadershipCategories = [
  {
    name: 'Executive Council',
    icon: UsersIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    members: [
      { 
        id: 1, 
        name: 'Pastor John Smith', 
        position: 'Senior Pastor', 
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        tenure: '12 years',
        email: 'pastor.john@church.org',
        phone: '(555) 123-4567',
        briefDescription: 'Leading our congregation with unwavering dedication and passion for community outreach.',
        fullBiography: 'Pastor John has been serving our congregation for over a decade with unwavering dedication and spiritual leadership. He holds a Master of Divinity from Seminary College and a Bachelor\'s degree in Theology. Before joining our ministry, he served as an associate pastor for 8 years in various congregations. Under his visionary leadership, our church has grown from 200 to over 1,200 members and established numerous community programs including a food bank, homeless shelter partnership, and youth mentorship programs. Pastor John is married to Sarah and has three children. He is known for his powerful sermons, compassionate counseling, and commitment to social justice.',
        achievements: [
          'Grew congregation from 200 to 1,200+ members',
          'Established 15+ community outreach programs',
          'Published author of "Faith in Action" devotional series',
          'Recipient of Community Service Award 2023'
        ],
        specialties: ['Preaching', 'Counseling', 'Leadership', 'Community Outreach']
      },
      { 
        id: 2, 
        name: 'Rev. Mary Johnson', 
        position: 'Associate Pastor', 
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b787?w=150',
        tenure: '7 years',
        email: 'mary.johnson@church.org',
        phone: '(555) 234-5678',
        briefDescription: 'Specializing in worship ministry and discipleship with a heart for pastoral care.',
        fullBiography: 'Rev. Mary brings a heart for worship and discipleship to our ministry team. She graduated from Christian University with a Master\'s in Pastoral Ministry and has over 15 years of experience in church leadership. She specializes in pastoral care and has developed our small groups ministry from the ground up, now encompassing over 40 active groups. Rev. Mary is also our worship coordinator, overseeing our music ministry and special worship events. Her compassionate approach and biblical wisdom have touched countless lives in our community. She has been instrumental in developing our women\'s discipleship program and leads quarterly women\'s retreats.',
        achievements: [
          'Developed small groups ministry (40+ groups)',
          'Established women\'s discipleship program',
          'Coordinated 28+ successful retreats',
          'Mentored 100+ women in leadership roles'
        ],
        specialties: ['Worship', 'Discipleship', 'Small Groups', 'Pastoral Care']
      },
      { 
        id: 3, 
        name: 'Elder David Brown', 
        position: 'Board Chairman', 
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        tenure: '15 years',
        email: 'david.brown@church.org',
        briefDescription: 'Providing strategic oversight and financial stewardship with decades of business experience.',
        fullBiography: 'Elder David has been a cornerstone of our church leadership for over 15 years, serving in various capacities before becoming Board Chairman. With his background in business administration and finance, he provides strategic oversight and ensures sound financial stewardship of church resources. David holds an MBA from State University and spent 30 years in corporate leadership before dedicating his retirement years to full-time ministry service. His wisdom and commitment to biblical principles guide our church\'s major decisions and long-term planning. He has overseen three major building projects and the establishment of our church\'s endowment fund.',
        achievements: [
          'Led 3 major building expansion projects',
          'Established $2M church endowment fund',
          'Implemented financial transparency initiatives',
          'Served on 5+ community nonprofit boards'
        ],
        specialties: ['Administration', 'Finance', 'Strategic Planning', 'Governance']
      }
    ]
  },
  {
    name: 'District Area Heads',
    icon: MapPinIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    members: [
      { 
        id: 4, 
        name: 'Brother James Wilson', 
        position: 'North District', 
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        tenure: '9 years',
        email: 'james.wilson@church.org',
        phone: '(555) 345-6789',
        briefDescription: 'Coordinating northern district outreach with expertise in community relations.',
        fullBiography: 'Brother James oversees our northern district with exceptional dedication and community focus. He coordinates outreach programs and manages our three satellite locations in the northern region. His background in social work and community development helps him connect with diverse communities and address local needs effectively. James has established partnerships with local schools, community centers, and social service organizations. Under his leadership, the northern district has launched successful programs including after-school tutoring, senior citizen support services, and job training workshops. He is particularly passionate about urban ministry and has developed innovative approaches to reaching underserved populations.',
        achievements: [
          'Established 3 satellite church locations',
          'Launched 8 community partnership programs',
          'Coordinated 50+ community service events',
          'Developed urban ministry curriculum'
        ],
        specialties: ['Community Relations', 'Outreach', 'Social Services', 'Coordination']
      },
      { 
        id: 5, 
        name: 'Sister Grace Taylor', 
        position: 'South District', 
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        tenure: '6 years',
        email: 'grace.taylor@church.org',
        phone: '(555) 456-7890',
        briefDescription: 'Leading southern district with strong partnerships in education and community development.',
        fullBiography: 'Sister Grace leads our southern district with grace, wisdom, and an educator\'s heart. She has established strong partnerships with local schools and community centers, creating bridges between our church and the broader community. Her teaching background and passion for education have made her instrumental in developing our tutoring and mentorship programs. Grace holds a Master\'s in Education and spent 20 years as a public school administrator before joining our ministry team. She has developed comprehensive family support programs and coordinates our annual back-to-school supply drive that serves over 500 families. Her district is known for its innovative approach to family ministry and educational support.',
        achievements: [
          'Served 500+ families through education programs',
          'Established 12 school partnerships',
          'Developed comprehensive family ministry program',
          'Coordinated 25+ educational workshops'
        ],
        specialties: ['Education', 'Mentorship', 'Community Partnerships', 'Teaching']
      },
      { 
        id: 6, 
        name: 'Elder Michael Davis', 
        position: 'East District', 
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150',
        tenure: '11 years',
        email: 'michael.davis@church.org',
        briefDescription: 'Pioneering eastern district growth through evangelism and church planting expertise.',
        fullBiography: 'Elder Michael brings decades of ministry experience to our eastern district, with a particular focus on evangelism and church growth. He has pioneered several successful church plants in the eastern region and specializes in cross-cultural ministry and discipleship. Before joining our team, Michael served as a missionary for 15 years in Central America, where he planted 8 churches and trained over 100 pastors and leaders. His passion for reaching the lost and nurturing new believers has resulted in significant growth in our eastern communities. He is fluent in Spanish and leads our Hispanic ministry outreach. Michael is also instrumental in our prison ministry and recovery programs.',
        achievements: [
          'Planted 8 churches internationally',
          'Trained 100+ pastors and leaders',
          'Established Hispanic ministry (200+ members)',
          'Developed prison ministry program'
        ],
        specialties: ['Evangelism', 'Church Planting', 'Discipleship', 'Missions']
      }
    ]
  },
  {
    name: 'Men Fellowship',
    icon: UsersIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    members: [
      { 
        id: 7, 
        name: 'Brother Paul Anderson', 
        position: 'Men Ministry Leader', 
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        tenure: '8 years',
        email: 'paul.anderson@church.org',
        phone: '(555) 567-8901',
        briefDescription: 'Leading men\'s ministry with strength and compassion, organizing retreats and service projects.',
        fullBiography: 'Brother Paul leads our men\'s ministry with strength, compassion, and practical wisdom. He organizes regular men\'s retreats, weekly Bible studies, and community service projects that have strengthened brotherhood within our congregation. His background in construction and project management has been invaluable for our building projects and community service initiatives. Paul coordinates our annual men\'s retreat that draws over 150 participants and has established mentorship programs pairing older and younger men. He also leads our "Men Building Men" program, which combines construction skills training with discipleship. Paul is passionate about helping men find their identity in Christ and develop authentic Christian relationships.',
        achievements: [
          'Organized 8 annual retreats (150+ participants)',
          'Established men\'s mentorship program',
          'Led 20+ community service projects',
          'Developed "Men Building Men" program'
        ],
        specialties: ['Men\'s Ministry', 'Construction', 'Bible Study', 'Retreats']
      },
      { 
        id: 8, 
        name: 'Deacon Mark Thompson', 
        position: 'Men Fellowship Coordinator', 
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150',
        tenure: '5 years',
        email: 'mark.thompson@church.org',
        briefDescription: 'Coordinating men\'s fellowship activities with enthusiasm and attention to detail.',
        fullBiography: 'Deacon Mark coordinates our men\'s fellowship activities with enthusiasm, creativity, and meticulous attention to detail. He has organized numerous successful events that have strengthened brotherhood within our congregation, including monthly breakfast meetings, sports tournaments, and social gatherings. His heart for fellowship and community building is evident in everything he does. Mark has a background in event planning and hospitality management, which he uses to create meaningful experiences for men of all ages. He particularly excels at creating inclusive environments where new members feel welcomed and established members can deepen their relationships. Mark also coordinates our sports ministry and annual golf tournament fundraiser.',
        achievements: [
          'Organized 60+ fellowship events',
          'Established monthly men\'s breakfast (80+ attendees)',
          'Coordinated sports ministry leagues',
          'Raised $50K+ through fundraising events'
        ],
        specialties: ['Event Planning', 'Fellowship', 'Brotherhood', 'Sports Ministry']
      },
      { 
        id: 9, 
        name: 'Brother Robert Lee', 
        position: 'Men Outreach Leader', 
        avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150',
        tenure: '4 years',
        email: 'robert.lee@church.org',
        briefDescription: 'Spearheading men\'s outreach initiatives with passion for transformation and evangelism.',
        fullBiography: 'Brother Robert spearheads our men\'s outreach initiatives with passion, purpose, and a powerful testimony of personal transformation. He coordinates homeless ministry, prison outreach, and community service projects that demonstrate Christ\'s love in practical ways. His own journey from addiction to redemption motivates other men to serve and share their faith boldly. Robert leads weekly outreach teams to local shelters and coordinates quarterly prison ministry visits. He has developed recovery support programs and facilitates addiction recovery groups. His authentic approach and transparent leadership style have helped many men find freedom and purpose. Robert is also instrumental in our street evangelism efforts and community cleanup projects.',
        achievements: [
          'Led 200+ outreach missions',
          'Established recovery support program',
          'Facilitated 15+ prison ministry visits',
          'Mentored 50+ men in recovery'
        ],
        specialties: ['Outreach', 'Prison Ministry', 'Homeless Ministry', 'Evangelism']
      }
    ]
  },
  {
    name: 'Women & Youth',
    icon: UsersIcon,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    members: [
      { 
        id: 10, 
        name: 'Sister Sarah Clark', 
        position: 'Women Ministry Leader', 
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        tenure: '10 years',
        email: 'sarah.clark@church.org',
        phone: '(555) 678-9012',
        briefDescription: 'Developing women\'s ministry programs with counseling expertise and maternal heart.',
        fullBiography: 'Sister Sarah has been instrumental in developing our comprehensive women\'s ministry programs over the past decade. She organizes Bible studies, women\'s conferences, support groups, and retreats that have touched hundreds of lives. Her counseling background and maternal heart make her a trusted mentor to women of all ages in our congregation. Sarah holds a Master\'s in Christian Counseling and is a licensed family therapist. She has developed specialized programs for single mothers, military wives, and women in crisis. Her annual women\'s conference draws over 300 participants from across the region. Sarah is particularly passionate about empowering women for leadership and has mentored dozens of women into ministry positions.',
        achievements: [
          'Developed 12 specialized women\'s programs',
          'Organized annual conference (300+ participants)',
          'Mentored 75+ women into leadership',
          'Established crisis support network'
        ],
        specialties: ['Women\'s Ministry', 'Counseling', 'Bible Study', 'Conferences']
      },
      { 
        id: 11, 
        name: 'Youth Pastor Lisa White', 
        position: 'Youth Ministry', 
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        tenure: '3 years',
        email: 'lisa.white@church.org',
        phone: '(555) 789-0123',
        briefDescription: 'Bringing energy and innovation to youth ministry with strong mentorship structures.',
        fullBiography: 'Youth Pastor Lisa brings energy, innovation, and genuine love for young people to our youth ministry. She has revitalized our teen programs and established strong mentorship structures that connect youth with caring adults. Her background in education and youth development, combined with her relatable personality, helps her connect with young people and guide them in their faith journey. Lisa has developed comprehensive programs including weekly youth services, summer camps, mission trips, and leadership training. She is particularly skilled at using technology and social media to engage youth while maintaining strong biblical foundations. Under her leadership, youth attendance has tripled and many teenagers have made commitments to Christ.',
        achievements: [
          'Tripled youth ministry attendance',
          'Organized 15+ mission trips',
          'Established youth leadership program',
          'Developed innovative digital ministry tools'
        ],
        specialties: ['Youth Ministry', 'Education', 'Mentorship', 'Event Planning']
      },
      { 
        id: 12, 
        name: 'Sister Rebecca Martinez', 
        position: 'Children\'s Ministry', 
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        tenure: '6 years',
        email: 'rebecca.martinez@church.org',
        briefDescription: 'Transforming children\'s ministry with creative programs and expertise in early childhood education.',
        fullBiography: 'Sister Rebecca has transformed our children\'s ministry with creative programs, loving care, and educational excellence. She coordinates Sunday school, vacation Bible school, and family events that create lasting memories and spiritual foundations for children. Her background in early childhood education and her natural gift for working with children create a nurturing environment where kids love to learn about Jesus. Rebecca has developed age-appropriate curricula and established safety protocols that give parents confidence. She organizes special programs including children\'s Christmas pageants, summer day camps, and parent-child events. Her ministry has grown to serve over 200 children weekly, and she has trained a team of 30+ volunteers.',
        achievements: [
          'Grew children\'s ministry to 200+ weekly attendance',
          'Trained 30+ children\'s ministry volunteers',
          'Developed comprehensive safety protocols',
          'Created innovative faith-based curricula'
        ],
        specialties: ['Children\'s Ministry', 'Early Education', 'Family Programs', 'Creative Arts']
      }
    ]
  }
]
</script>

<style scoped>
/* Custom styles - keeping minimal since we're avoiding animations */
.leadership-card {
  transition: none;
}
</style>