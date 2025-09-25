<template>
    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="w-full h-[400px]">
                <img src="/images/history.jpg" alt="nibalt history" class="w-full h-full object-contain" />
            </div>
            <div>
                <div class="flex flex-col justify-center mb-10">
                    <h1 class="text-4xl font-bold text-left uppercase text1 mb-6">NIBALT HISTORY</h1>
                </div>
                <div class="flex flex-col justify-center space-y-8">
                    <p class="text-sm font-thin text-left capitalize">
                        NIBALT was born out of a great desire and a vision of our founder, Reverend Chris Diaba. His vision was to establish a higher education institution that would train leaders and ministers. He wanted to equip disciples to effectively preach and teach the gospel both domestically and globally. NIBALT started in 1982 started at the Grace Temple(now Chris Diaba Memorial Temple) of the New Covenant Church Int. with 12 students including Rev. Akofa McAvor and Rev. Martin Agbemabiesse
                    </p>
                    <p class="text-sm font-thin text-left capitalize">
                        In February 1982, Bishop Ofoe Wright, of the Methodist Church of Ghana was tasked to convert the Bible School into an institution of international repute; he became the first Director of Studies. Rev Akofa Mcavor took over as the Second Director of Studies took over, with a well of wisdom, vision, and integrity. Rev. Frank McAvor became the Director of NIBALT in 1994. He is currently the President of NIBALT. Within its time of existence, NIBALT has trained over 150 Pastors.
                    </p>
                </div>
            </div>
        </div>

        <!--Graduation Section-->
        <div class="mt-20 relative">
            <div class="w-full relative h-[600px]">
                <img src="/images/graduation.jpg" alt="graduation" class="w-full h-full object-cover" />
            </div>
            <div class="absolute bottom-0 right-0 py-4 w-full">
                <p class="text-[50px] font-bold text-center uppercase text-white relative z-50">Graduations</p>
            </div>
            <div class="bg-black inset-0 opacity-50 absolute"></div>
        </div>

        <!--Values Section-->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
            <div class="w-full h-[500px]">
                <img src="/images/values.jpg" alt="nibalt history" class="w-full h-full object-contain" />
            </div>
            <div>
                <div class="flex flex-col justify-center mb-6">
                    <h1 class="text-4xl font-bold text-left uppercase text1">core values</h1>
                </div>
                <div class="flex flex-col justify-center space-y-8">
                    <p class="text-sm font-thin text-left capitalize">
                        The membership of the church consists of saved individuals who are in the body of Christ. We believe that our members must attend church service regularly as the Scriptures have instructed (Heb, 10:25). True membership depends on one’s acceptance and obedience to the order and office of the church, namely:
                    </p>
                    <p class="text-sm font-thin text-left capitalize">
                        Apostles, Prophets, Pastors, etc. We believe that Jesus Christ is coming again for His church namely the born again people. We believe in baptizing in the name of the Lord Jesus Christ and that every member must be subject to the Pastor and those who have rule over them.
                    </p>
                    <p class="text-sm font-thin text-left capitalize">
                        The Pastor is expected to take further actions against any member not complying with the rules and regulations of the church, in accordance with the Scriptures. We expect our members should endeavor to keep the unity of the Spirit in the bond of peace. (Eph. 4:3)
                    </p>
                </div>
            </div>
        </div>

        <!--Mission Section-->
        <div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
                <div v-for="(item, index) in missions" :key="index">
                    <div class="border p-6 h-60 bg-[#e5e7ff] cursor-pointer">
                        <h1 class="text-2xl font-bold text-left uppercase text-black mb-6">{{ item.title }}</h1>
                        <p class="text-sm font-thin text-left capitalize text-black">
                            {{ item.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const missions = [
    {
        title: 'mission statement',
        desc: "To set men free and prepare them to fulfill the Great Commission and commands given by our Lord and Savior, Jesus Christ."
    },
    {
        title: 'vision statement',
        desc: "To educate, enlighten, equip, enhance, encourage, and empower men and women to achieve excellence in various fields of endeavour internationally."
    },
    {
        title: 'motto',
        desc: "The new covenant apostolic church international"
    }
]

</script>

<style scoped>

</style>