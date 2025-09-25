<template>
    <Navbar/>
    <DetailHeader/>

    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div class="relative h-[500px] w-full mb-10">
                <img :src="selectedMinistry.image" alt="" class="w-full h-full object-cover"></img>
            </div>
            <div class="space-y-6">
                <h1 class="text-2xl font-bold text-left uppercase text1 mb-4">Message from {{ selectedMinistry.name }} president</h1>
                <p class="text1 font-thin text-base" v-html="selectedMinistry.desc"></p>
            </div>
        </div>

        <div class="space-y-6">
            <h1 class="text-xl font-bold text-left uppercase text1 mb-4">HISTORY - {{ selectedMinistry.name.toUpperCase() }}</h1>
            <p class="text1 font-thin text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida.
            </p>
            <p class="text1 font-thin text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida.
            </p>
            <p class="text1 font-thin text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. 

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Non tellus orci ac auctor augue mauris augue neque gravida.
            </p>
        </div>

        <div class="mt-12">
            <h1 class="text-2xl font-bold text-left uppercase text1 mb-4">Executives</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div v-for="president in pastPresidents" :key="president.name" class="flex flex-col">
                    <div class="relative h-[400px] w-full mb-2 group cursor-pointer">
                        <img :src="president.image" alt="" class="w-full h-full object-cover"></img>
                        <div class="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <h3 class="text-white font-semibold text-base">{{ president.name }}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../components/layouts/Navbar.vue'
import DetailHeader from '../components/ministries/DetailHeader.vue';

const route = useRoute()
const id = route.query.id

const ministries = [
    {
        id: 1,
        name: 'youth ministry',
        desc: 'At TNCACI, our Youth Ministry is dedicated to empowering young people to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, youth camps, youth conferences, fun events, and offer opportunities for service, all designed to help young adults navigate life with purpose and confidence in Christ. Through Bible studies, worship and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip the next generation to live and preach Christ boldy, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there’s a place for you here.',
        image: '/images/youth-min.jpg',
    },
    {
        id: 2,
        name: 'music ministry',
        desc: 'At TNCACI, our Music Ministry is dedicated to leading worship and praising God through music. We engage in weekly services, special events, and offer opportunities for musical service, all designed to glorify God and inspire the congregation. Through choirs, bands, and instrumental performances, we create an atmosphere of worship. Our goal is to use music to draw people closer to Christ and enhance the spiritual experience.Join us—whether you’re a singer, musician, or lover of worship, there’s a place for you here.',
        image: '/images/music-min.jpg'
    },
    {
        id: 3,
        name: 'women ministry',
        desc: 'At TNCACI, our Women Ministry is dedicated to empowering women to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, retreats, conferences, and offer opportunities for service, all designed to help women navigate life with purpose and confidence in Christ. Through Bible studies, prayer groups, and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip women to live and preach Christ boldly, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there’s a place for you here.',
        image: '/images/women-min.jpg'
    },
    {
        id: 4,
        name: 'children ministry',
        desc: 'At TNCACI, our Children Ministry is dedicated to nurturing young hearts to know and love Jesus. We engage in Sunday school, fun activities, camps, and offer opportunities for learning and service, all designed to help children grow in faith. Through stories, songs, and games, we create a joyful environment for spiritual development. Our goal is to instill biblical values and prepare the next generation to follow Christ.Join us—whether you’re a child or a volunteer, there’s a place for you here.',
        image: '/images/children-min.jpg'
    },
    {
        id: 5,
        name: 'evangelism ministry',
        desc: 'At TNCACI, our Evangelism Ministry is dedicated to spreading the Gospel and sharing the love of Jesus with the world. We engage in outreach programs, community events, missions, and offer opportunities for witnessing, all designed to bring people to Christ. Through door-to-door visits, public preaching, and service projects, we demonstrate God\'s love. Our goal is to fulfill the Great Commission and expand God\'s kingdom.Join us—whether you’re passionate about sharing your faith, there’s a place for you here.',
        image: '/images/evangelism-min.jpg'
    },
    {
        id: 6,
        name: 'men ministry',
        desc: 'At TNCACI, our Men Ministry is dedicated to equipping men to be godly leaders in their families and communities. We engage in weekly gatherings, retreats, sports, and offer opportunities for fellowship and service, all designed to help men grow in Christ. Through Bible studies, accountability groups, and mentoring, we create a supportive environment for spiritual growth. Our goal is to raise men who live boldly for Christ and impact their world.Join us—whether you’re looking for brotherhood, growth, or service, there’s a place for you here.',
        image: '/images/mens-min.jpg'
    }
]

const selectedMinistry = ministries.find(m => m.id == id) || ministries[0]

const pastPresidents = [
    {
        name: "Samuel bryan",
        image: "/images/gala1.jpg"
    },
    {
        name: "Olusegun smith",
        image: "/images/gala1.jpg"
    },
    {
        name: "wale bakare",
        image: "/images/gala1.jpg"
    },
    {
        name: "Andrew Brown",
        image: "/images/gala1.jpg"
    },

]
</script>

<style scoped>

</style>