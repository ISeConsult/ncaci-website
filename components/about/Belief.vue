<template>
  <div class="bg-[#ffeded] py-12">
    <div class="flex flex-col justify-center items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="item in beliefs" :key="item.title" class="p-4 bg-white">
                <p class="text-sm font-bold text-left uppercase text-[#A54E2B] mb-1">our beliefs</p>
                <h3 class="text-xl font-bold mb-6 text-black">{{ item.title }}</h3>
                <p v-html="item.description" class="text-black font-thin text-base"></p>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
const beliefs = [
  { title: 'BAPTISIM BY WATER (IMMERSION)', description: 'We believe that God has a place of punishment for the vices (Rev.20:11-15); we believe in life everlasting. (John3:15, Titus 1:20)' },
  { title: 'SALVATION', description: 'We believe in a three-fold Salvation of the Spirit, soul and body. (1 Thess. 5:23); man is a tripartite being' },
  { title: 'THE SECOND COMING OF CHRIST', description: 'We believe in the second coming of Jesus Christ.' },
  { title: 'Divine Punishment for Vices', description: 'We believe that God has a place of punishment for the vices (Rev.20:11-15); we believe in life everlasting. (John3:15, Titus 1:20)' },
  { title: 'TITHES & OFFERING', description: 'As a non profit making organization, we believe in supporting the Ministry with tithes, freewill offerings and donations. (Gen. 14:20, 28:22, Amos 4:4, Mat. 23:23, Luke 18:12, 1 Cor. 16:2).' },
  { title: 'MARRIAGE', description: 'We believe what the Scriptures say concerning Marriage and Divorce (Mat, 5:31-32, Mat, 19:4-12, Mark 10:2 - 12, 1 Cor. 7:10-15,)' },
  { title: 'PRAYER & FASTING', description: 'We believe in the power of prayer and fasting. (Mat 9:15, Mark 9:29)' },
  { title: 'ASCENDED GIFT MINISTRY', description: 'we believe in ascended gift ministry - Apostles, Prophets, Evangelists, Pastors and Teachers (Eph, 4:11-12)' },
  { title: 'THE BIBLE', description: 'We believe all that have been revealed in the Holy Scriptures that the Bible is the Supreme Authority in all matters. (II Tim. 3:16)' },
  { title: 'THE ONE TRUE GOD', description: 'We believe and teach that God Is one. (Gen.1:1. Deut 6:4 Isaiah 43:10 John 1:1, I Tim. 3:16)' },
  { title: 'THE HOLY TRINITY', description: 'We believe that Father, Son and Holy Ghost are three manifestations of the one God. (I John 5:7-8)' },
  { title: 'SPIRITUAL REBIRTH', description: 'We believe that all persons are sinners by nature and therefore need to be born of water and the Spirit. (Ps. 51:5, John 3:3-6, Rom 3:23)' },
  { title: 'ASCENDED GIFT MINISTRY', description: 'we believe in ascended gift ministry - Apostles, Prophets, Evangelists, Pastors and Teachers (Eph, 4:11-12)' },
  { title: 'DIVINE HEALING', description: 'We believe in Divine Healing as provided in the atonement, the word of God, prayer and laying on of hands. However, members of the Church are free to seek medical help from qualified practitioners necessary. (Mark 16:18, James 5:13-16, Isaiah 53:4-5, 1 Pet 2:24, Matthew 9:12, 11 Kings 20:7, Luke 10:34)' },
  { title: 'SPIRITUAL GIFTS', description: "We believe in all the nine spiritual gifts and that they should be operating in the church, and we believe that one person can have all the nine gifts in his ministry (I Cor. 12:8-10.) We believe in the Holy Communion also known as the Lord's Supper and that it should be partaken by all members who are in true fellowship with the Lord. (1 Cor. 11:23-33) We believe in Women's Ministry, that women can be Apostles, Preachers, Teachers, Evangelists, Deaconesses, and Helpers, (Acts 2:8- 9, 10:24, Gal, 3:26-28, Rom. 16-1-6)" }
];
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>