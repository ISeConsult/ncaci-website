<template>
    <div>
        <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="item in ministries" :key="item.id" class="bg-[#ffeded] rounded-tr-2xl rounded-tl-2xl">
                    <div class="mb-6 relative">
                        <img :src="item.image" alt="" class="h-72 w-full bg-contain rounded-tr-2xl rounded-tl-2xl"></img>
                        <div class="absolute bottom-0 py-4 left-0 right-0">
                            <div class="absolute inset-0 bg-black opacity-70"></div>
                            <h3 class="text-xl text-nowrap font-bold uppercase text-white relative z-10 text-center">{{ item.name }}</h3>
                        </div>
                    </div>
                    <div class="mb-6 p-4">
                        <p v-html="item.desc" class="text-black font-thin text-base"></p>
                    </div>

                    <div class="flex items-center justify-center pb-4">
                        <UIButton class="items-center" size="lg">
                            <NuxtLink :to="item.link" class="w-full text-center">
                                Read More
                            </NuxtLink>
                        </UIButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const ministries = [
    {
        id: 1,
        name: 'youth ministry',
        desc: 'At TNCACI, our Youth Ministry is dedicated to empowering young people to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, youth camps, youth conferences, fun events, and offer opportunities for service, all designed to help young adults navigate life with purpose and confidence in Christ. Through Bible studies, worship and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip the next generation to live and preach Christ boldy, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there’s a place for you here.',
        image: '/images/youth-min.jpg',
        link: '/ministry-detailed?id=1'

    },
    {
        id: 2,
        name: 'music ministry',
        desc: 'At TNCACI, our Youth Ministry is dedicated to empowering young people to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, youth camps, youth conferences, fun events, and offer opportunities for service, all designed to help young adults navigate life with purpose and confidence in Christ. Through Bible studies, worship and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip the next generation to live and preach Christ boldy, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there’s a place for you here.',
        image: '/images/music-min.jpg',
        link: '/ministry-detailed?id=2'
    },
    {
        id: 3,
        name: 'women ministry',
        desc: 'At TNCACI, our Youth Ministry is dedicated to empowering young people to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, youth camps, youth conferences, fun events, and offer opportunities for service, all designed to help young adults navigate life with purpose and confidence in Christ. Through Bible studies, worship and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip the next generation to live and preach Christ boldy, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there’s a place for you here.',
        image: '/images/women-min.jpg',
        link: '/ministry-detailed?id=3'
    },
    {
        id: 4,
        name: 'children ministry',
        desc: 'At TNCACI, our Youth Ministry is dedicated to empowering young people to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, youth camps, youth conferences, fun events, and offer opportunities for service, all designed to help young adults navigate life with purpose and confidence in Christ. Through Bible studies, worship and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip the next generation to live and preach Christ boldy, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there’s a place for you here.',
        image: '/images/children-min.jpg',
        link: '/ministry-detailed?id=4'
    },
    {
        id: 5,
        name: 'evangelism ministry',
        desc: 'At TNCACI, our Youth Ministry is dedicated to empowering young people to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, youth camps, youth conferences, fun events, and offer opportunities for service, all designed to help young adults navigate life with purpose and confidence in Christ. Through Bible studies, worship and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip the next generation to live and preach Christ boldy, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there’s a place for you here.',
        image: '/images/evangelism-min.jpg',
        link: '/ministry-detailed?id=5'
    },
    {
        id: 6,
        name: 'men ministry',
        desc: 'At TNCACI, our Youth Ministry is dedicated to empowering young people to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, youth camps, youth conferences, fun events, and offer opportunities for service, all designed to help young adults navigate life with purpose and confidence in Christ. Through Bible studies, worship and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip the next generation to live and preach Christ boldy, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there’s a place for you here.',
        image: '/images/mens-min.jpg',
        link: '/ministry-detailed?id=6'
    }
]

</script>

<style lang="scss" scoped>

</style>