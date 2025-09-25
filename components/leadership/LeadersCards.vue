<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="mb-6">
            <Tabs
            :tabs="['EXECUTIVE COUNCIL', 'DISTRICT & AREA HEADS', 'NATIONAL MEN FELLOWSHIP EXECUTIVE', 'NATIONAL MEN FELLOWSHIP EXECUTIVE', 'NATIONAL YOUTH EXECUTIVE']"
            v-model="activeTab"
            @update:modelValue="onTabChange"
        />
        </div>
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
                    <p class="text-base text-gray-300 text-center uppercase mt-1">{{ selectedLeader.title }}</p>
                </div>
                <div class="p-6 w-full bg-[#cfd2fe]">
                    <p class="text-sm text-gray-800">{{ selectedLeader.desc }}</p>
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
</template>

<script setup>
import { ref, computed } from 'vue'
import Pagination from '~/components/UI/Pagination.vue'
import Tabs from '~/components/UI/Tabs.vue'

const leaders = [
    {
        name: 'APOSTLE EMMANUEL ELI AMEMAXA',
        title: 'CHAIRMAN & GENERAL SUPRETENDENT',
        image: '/images/leader1.png',
        desc: 'Apostle Emmanuel Eli Amemaxa is a distinguished leader and the Chairman of The New Covenant Apostolic Church International. His journey in ministry and education reflects a profound commitment to theological scholarship and effective church leadership.\n\nEducational Background:\n\n1979 – 1983: Apostle Amemaxa earned his Master of Theology & Divinity from Columbia University, CL. This advanced degree laid a strong foundation for his theological insights and spiritual guidance.\n\n1984 – 1987: He pursued an undergraduate degree in Theology at the University of Chicago School, further deepening his understanding of religious studies and pastoral care.\n\n1992 – 2004: Apostle Amemaxa expanded his expertise with a Diploma in Business Management from the University of Business, NY. This education equipped him with the skills necessary for managing church operations and leading various initiatives effectively.\n\n2004 – 2008: He completed his higher education at the School of Losangle, rounding out his academic journey and preparing him for the multifaceted responsibilities of church leadership.\n\nApostle Emmanuel Eli Amemaxa\'s comprehensive education, combined with his dedication to faith, has made him a pillar of strength and wisdom within The New Covenant Apostolic Church International. His leadership continues to inspire and guide the congregation towards spiritual growth and community service.'
    },
    {
        name: 'BISHOP SARAH NKEM',
        title: 'VICE CHAIRMAN & SENIOR PASTOR',
        image: '/images/leader1.png',
        desc: 'Bishop Sarah Nkem serves as the Vice Chairman and Senior Pastor of The New Covenant Apostolic Church International, bringing over three decades of dedicated service to spiritual leadership and community development. Her extensive background in religious studies and pastoral counseling has positioned her as a key figure in guiding the church\'s spiritual direction and outreach programs.\n\nEducational Journey:\n\n1980 – 1984: Bishop Nkem obtained her Bachelor of Religious Studies from Harvard Divinity School, establishing a solid foundation in biblical theology and pastoral ministry.\n\n1985 – 1988: She pursued advanced studies in Pastoral Counseling at Yale University, enhancing her skills in spiritual guidance and emotional support for congregants.\n\n1990 – 1998: Bishop Nkem completed her Master of Divinity from Princeton Theological Seminary, focusing on church administration and leadership principles.\n\n2000 – 2005: She earned a Doctor of Ministry degree from Duke Divinity School, focusing on contemporary ministry challenges and innovative church leadership strategies.\n\nBishop Sarah Nkem\'s scholarly achievements and compassionate leadership have been instrumental in fostering a nurturing environment for spiritual growth and community engagement within the church.'
    },
    {
        name: 'PROPHET DAVID OKON',
        title: 'GENERAL SECRETARY & PROPHETIC MINISTER',
        image: '/images/leader1.png',
        desc: 'Prophet David Okon holds the position of General Secretary and Prophetic Minister at The New Covenant Apostolic Church International, combining administrative excellence with profound prophetic insights. His multifaceted role involves overseeing church operations while providing spiritual guidance through prophetic ministry and counseling.\n\nAcademic Foundation:\n\n1982 – 1986: Prophet Okon earned his Bachelor of Theology from Oxford University, gaining comprehensive knowledge in biblical studies and church history.\n\n1987 – 1990: He pursued a Master of Prophetic Ministry at Cambridge University, specializing in prophetic interpretation and spiritual discernment.\n\n1992 – 2000: Prophet Okon completed his Doctor of Ministry from the University of Edinburgh, focusing on church administration and prophetic leadership.\n\n2002 – 2007: He obtained a Certificate in Conflict Resolution from the London School of Theology, enhancing his ability to handle complex interpersonal and organizational challenges.\n\nProphet David Okon\'s blend of academic rigor and spiritual sensitivity has made him an invaluable asset in both administrative and prophetic capacities within the church community.'
    },
    {
        name: 'APOSTLE GRACE ADEYEMI',
        title: 'TREASURER & FINANCIAL DIRECTOR',
        image: '/images/leader1.png',
        desc: 'Apostle Grace Adeyemi serves as the Treasurer and Financial Director of The New Covenant Apostolic Church International, bringing financial expertise and spiritual wisdom to church stewardship and resource management. Her role encompasses financial planning, budget oversight, and ensuring the church\'s resources are used effectively for ministry and community outreach.\n\nProfessional and Educational Background:\n\n1981 – 1985: Apostle Adeyemi earned her Bachelor of Business Administration from Stanford University, establishing a strong foundation in financial management and organizational leadership.\n\n1986 – 1989: She pursued a Master of Finance from the University of Pennsylvania Wharton School, specializing in nonprofit financial management and strategic planning.\n\n1991 – 1998: Apostle Adeyemi completed her Master of Divinity from Fuller Theological Seminary, integrating financial acumen with spiritual leadership principles.\n\n2000 – 2005: She obtained a Doctor of Ministry from Gordon-Conwell Theological Seminary, focusing on stewardship theology and ethical financial practices in ministry.\n\nApostle Grace Adeyemi\'s unique combination of financial expertise and spiritual insight ensures responsible stewardship of church resources while advancing the church\'s mission and vision.'
    },
    {
        name: 'BISHOP MICHAEL CHUKWU',
        title: 'HEAD OF MISSIONS & EVANGELISM',
        image: '/images/leader1.png',
        desc: 'Bishop Michael Chukwu leads the Missions and Evangelism department at The New Covenant Apostolic Church International, directing global outreach efforts and community engagement initiatives. His passion for spreading the gospel and building bridges between faith communities has expanded the church\'s impact both locally and internationally.\n\nEducational and Ministry Development:\n\n1983 – 1987: Bishop Chukwu obtained his Bachelor of Missions from Wheaton College, gaining foundational knowledge in cross-cultural ministry and evangelism strategies.\n\n1988 – 1991: He pursued a Master of Cross-Cultural Studies at Fuller Theological Seminary, specializing in global mission contexts and cultural adaptation.\n\n1993 – 2000: Bishop Chukwu completed his Doctor of Missiology from the University of South Africa, focusing on contemporary mission challenges and church planting methodologies.\n\n2002 – 2007: He earned a Certificate in Community Development from the London School of Economics, enhancing his skills in sustainable community transformation.\n\nBishop Michael Chukwu\'s extensive experience and scholarly approach to missions have significantly expanded the church\'s outreach and impact in diverse communities worldwide.'
    },
    {
        name: 'APOSTLE RUTH OGBONNA',
        title: 'HEAD OF WOMEN\'S MINISTRY',
        image: '/images/leader1.png',
        desc: 'Apostle Ruth Ogbonna directs the Women\'s Ministry at The New Covenant Apostolic Church International, providing spiritual leadership and support for women in their faith journey and community involvement. Her ministry focuses on empowerment, discipleship, and creating opportunities for women to serve and grow in their spiritual gifts.\n\nEducational and Spiritual Formation:\n\n1984 – 1988: Apostle Ogbonna earned her Bachelor of Christian Education from Azusa Pacific University, establishing a foundation in educational ministry and spiritual formation.\n\n1989 – 1992: She pursued a Master of Women\'s Ministry from Dallas Theological Seminary, specializing in gender-specific ministry approaches and leadership development.\n\n1994 – 2001: Apostle Ogbonna completed her Doctor of Ministry from Asbury Theological Seminary, focusing on spiritual formation and women\'s empowerment in ministry contexts.\n\n2003 – 2008: She obtained a Certificate in Counseling from the American Association of Christian Counselors, equipping her to provide emotional and spiritual support.\n\nApostle Ruth Ogbonna\'s compassionate leadership and scholarly approach have created a nurturing environment for women to discover their calling and contribute meaningfully to the church and community.'
    },
    {
        name: 'PROPHET ESTHER NWANKWO',
        title: 'HEAD OF PRAYER & INTERCESSION',
        image: '/images/leader1.png',
        desc: 'Prophet Esther Nwankwo oversees the Prayer and Intercession Ministry at The New Covenant Apostolic Church International, leading prayer initiatives and fostering a culture of spiritual warfare and intercessory prayer. Her ministry emphasizes the power of prayer in spiritual growth, healing, and community transformation.\n\nEducational Background and Spiritual Development:\n\n1985 – 1989: Prophet Nwankwo obtained her Bachelor of Theology from Moody Bible Institute, gaining a solid foundation in biblical studies and spiritual disciplines.\n\n1990 – 1993: She pursued a Master of Spiritual Formation at Regent University, specializing in prayer ministry and contemplative spirituality.\n\n1995 – 2002: Prophet Nwankwo completed her Doctor of Ministry from Oral Roberts University, focusing on healing prayer and spiritual warfare strategies.\n\n2004 – 2009: She earned a Certificate in Biblical Counseling from the Association of Certified Biblical Counselors, enhancing her ability to provide prayer-based counseling.\n\nProphet Esther Nwankwo\'s dedication to prayer ministry and scholarly approach to spiritual disciplines have strengthened the church\'s prayer culture and spiritual vitality.'
    },
    {
        name: 'BISHOP PETER ADAMS',
        title: 'HEAD OF YOUTH MINISTRY',
        image: '/images/leader1.png',
        desc: 'Bishop Peter Adams leads the Youth Ministry at The New Covenant Apostolic Church International, guiding young people in their spiritual development and preparing them for leadership roles in the church and society. His ministry focuses on discipleship, mentorship, and creating engaging opportunities for youth to grow in faith and character.\n\nEducational and Youth Ministry Training:\n\n1986 – 1990: Bishop Adams earned his Bachelor of Youth Ministry from Liberty University, establishing expertise in adolescent spiritual development and youth leadership.\n\n1991 – 1994: He pursued a Master of Christian Education from Talbot School of Theology, specializing in educational methodologies for youth ministry.\n\n1996 – 2003: Bishop Adams completed his Doctor of Ministry from Southwestern Baptist Theological Seminary, focusing on contemporary youth culture and effective ministry strategies.\n\n2005 – 2010: He obtained a Certificate in Leadership Development from the Center for Creative Leadership, enhancing his skills in mentoring and team building.\n\nBishop Peter Adams\'s innovative approach and scholarly foundation have created dynamic youth programs that inspire and equip the next generation of church leaders.'
    },
    {
        name: 'APOSTLE MARY JOHNSON',
        title: 'HEAD OF CHILDREN\'S MINISTRY',
        image: '/images/leader1.png',
        desc: 'Apostle Mary Johnson directs the Children\'s Ministry at The New Covenant Apostolic Church International, nurturing young hearts and minds in faith formation and biblical understanding. Her ministry creates safe, engaging environments where children can develop a lifelong relationship with God and discover their unique spiritual gifts.\n\nEducational Foundation and Child Development Expertise:\n\n1987 – 1991: Apostle Johnson obtained her Bachelor of Christian Education from Biola University, gaining knowledge in childhood spiritual development and educational ministry.\n\n1992 – 1995: She pursued a Master of Children\'s Ministry from Dallas Theological Seminary, specializing in age-appropriate biblical teaching and child psychology.\n\n1997 – 2004: Apostle Johnson completed her Doctor of Education from Vanderbilt University, focusing on child development and learning theories in faith-based contexts.\n\n2006 – 2011: She earned a Certificate in Early Childhood Education from the National Association for the Education of Young Children, ensuring best practices in children\'s ministry.\n\nApostle Mary Johnson\'s loving approach and professional expertise have created a nurturing environment where children thrive spiritually and emotionally.'
    },
    {
        name: 'BISHOP JAMES OKORO',
        title: 'HEAD OF MEN\'S MINISTRY',
        image: '/images/leader1.png',
        desc: 'Bishop James Okoro leads the Men\'s Ministry at The New Covenant Apostolic Church International, providing spiritual guidance and fellowship opportunities for men to grow in faith, character, and leadership. His ministry focuses on biblical manhood, mentorship, and equipping men for their roles in family, church, and community.\n\nAcademic and Leadership Development:\n\n1988 – 1992: Bishop Okoro earned his Bachelor of Biblical Studies from Moody Bible Institute, establishing a foundation in scripture and theology.\n\n1993 – 1996: He pursued a Master of Leadership from Fuller Theological Seminary, specializing in organizational leadership and team development.\n\n1998 – 2005: Bishop Okoro completed his Doctor of Ministry from Gordon-Conwell Theological Seminary, focusing on men\'s spiritual formation and leadership development.\n\n2007 – 2012: He obtained a Certificate in Executive Coaching from the International Coaching Federation, enhancing his mentoring and leadership coaching skills.\n\nBishop James Okoro\'s scholarly approach and practical wisdom have created a supportive community where men can grow spiritually and fulfill their God-given potential.'
    }
]

const districtLeaders = [
    {
        name: 'BISHOP JAMES OKORO',
        title: 'HEAD OF MEN\'S MINISTRY',
        image: '/images/leader1.png',
        desc: 'Bishop James Okoro leads the Men\'s Ministry at The New Covenant Apostolic Church International, providing spiritual guidance and fellowship opportunities for men to grow in faith, character, and leadership. His ministry focuses on biblical manhood, mentorship, and equipping men for their roles in family, church, and community.'
    },
    {
        name: 'BISHOP MICHAEL CHUKWU',
        title: 'HEAD OF MISSIONS & EVANGELISM',
        image: '/images/leader1.png',
        desc: 'Bishop Michael Chukwu leads the Missions and Evangelism department at The New Covenant Apostolic Church International, directing global outreach efforts and community engagement initiatives. His passion for spreading the gospel and building bridges between faith communities has expanded the church\'s impact both locally and internationally.'
    },
    {
        name: 'BISHOP PETER ADAMS',
        title: 'HEAD OF YOUTH MINISTRY',
        image: '/images/leader1.png',
        desc: 'Bishop Peter Adams leads the Youth Ministry at The New Covenant Apostolic Church International, guiding young people in their spiritual development and preparing them for leadership roles in the church and society. His ministry focuses on discipleship, mentorship, and creating engaging opportunities for youth to grow in faith and character.'
    },
    {
        name: 'BISHOP JAMES OKORO',
        title: 'HEAD OF MEN\'S MINISTRY',
        image: '/images/leader1.png',
        desc: 'Bishop James Okoro leads the Men\'s Ministry at The New Covenant Apostolic Church International, providing spiritual guidance and fellowship opportunities for men to grow in faith, character, and leadership. His ministry focuses on biblical manhood, mentorship, and equipping men for their roles in family, church, and community.'
    },
]

const currentPage = ref(1)
const activeTab = ref(0) // 0: leaders, 1: apostles, 2: bishops, 3: prophets, 4: districtLeaders
const selectedLeader = ref(null)

const itemsPerPage = computed(() => selectedLeader.value ? 4 : 8)

const apostles = computed(() => leaders.filter(leader => leader.title.startsWith('APOSTLE')))
const bishops = computed(() => leaders.filter(leader => leader.title.startsWith('BISHOP')))
const prophets = computed(() => leaders.filter(leader => leader.title.startsWith('PROPHET')))

const currentList = computed(() => {
  switch (activeTab.value) {
    case 0: return leaders
    case 1: return apostles.value
    case 2: return bishops.value
    case 3: return prophets.value
    case 4: return districtLeaders
    default: return leaders
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
</script>

<style scoped>

</style>
