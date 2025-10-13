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
                                {{ readmore }}
                            </NuxtLink>
                        </UIButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

const { locale } = useI18n();

const readmore = computed(() => {
  if (locale.value === 'en') {
    return 'Read More'
  } else {
    return 'En savoir plus'
  }
})

const ministries = computed(() => {
  if (locale.value === 'en') {
    return [
      {
        id: 1,
        name: 'youth fellowship',
        desc: "At TNCACI, our Youth Ministry is dedicated to empowering young people to grow in their relationship with Jesus, build meaningful friendships, and live out their faith. We engage in weekly gatherings, youth camps, youth conferences, fun events, and offer opportunities for service, all designed to help young adults navigate life with purpose and confidence in Christ. Through Bible studies, worship and mentoring, we create a safe and supportive environment for spiritual growth. Our goal is to equip the next generation to live and preach Christ boldy, thus making a positive impact in their world.Join us—whether you’re looking for a place to belong, to grow in your faith, or to serve, there's a place for you here.",
        image: '/images/youth-min.jpg',
        link: '/ministry-detailed?id=1'
      },
      {
        id: 2,
        name: 'women fellowship',
        desc: "We, the Women’s Fellowship of the NCACI are a vibrant community of women committed to growing in their faith, supporting one another, and making a difference in our families and society at large. We believe that when women come together to share their lives, their struggles, and their victories, they can grow stronger in Christ and live out their purpose with confidence. Through Bible studies, retreats, and Women Fellowship conventions, our Women’s Fellowship offers a space to connect, be refreshed, and to be encouraged. Whether you’re seeking spiritual growth, lasting friendships, or ways to serve others, we invite you to join us as we walk together in faith.",
        image: '/images/women-min.jpg',
        link: '/ministry-detailed?id=3'
      },
      {
        id: 3,
        name: 'children fellowship',
        desc: "At TNCACI, our Children's Ministry is passionate about introducing children to the love of God and the joy of following Jesus. We provide an environment where kids can explore their faith through engaging Bible stories, creative activities, and hands-on learning whilst ensuring solid Christian foundations are laid for them. Our goal is to nurture each child’s spiritual growth in a way that is fun, relatable, and meaningful. From Sunday lessons to Children’s week celebrations, we are committed to building a strong foundation of faith that will last a lifetime. We believe that when we train a child in the way he should go, he/she would not depart from it, and we invite you to bring your children to be part of this exciting journey of faith.",
        image: '/images/children-min.jpg',
        link: '/ministry-detailed?id=4'
      },
      {
        id: 4,
        name: 'men fellowship',
        desc: "The Men’s Fellowship of the TNCACI is a place where men come together to grow in their faith, support each other, and challenge one another to become the men God has called us to be. Our mission is to help men strengthen their relationship with Christ and become leaders in their families, workplaces, and communities. Through regular gatherings, men fellowship conferences, and service opportunities, we create a space for men to build lasting friendships, share life experiences, and grow together in faith. Whether it’s deepening our understanding of Scripture, tackling real-life challenges, or serving those in need, we’re committed to living out our faith with purpose and integrity.",
        image: '/images/mens-min.jpg',
        link: '/ministry-detailed?id=6'
      }
    ];
  } else {
    return [
      {
        id: 1,
        name: 'communauté des jeunes',
        desc: "À TNCACI, notre Ministère des Jeunes est dédié à l'autonomisation des jeunes pour grandir dans leur relation avec Jésus, construire des amitiés significatives et vivre leur foi. Nous nous engageons dans des rassemblements hebdomadaires, des camps de jeunes, des conférences de jeunes, des événements amusants, et offrons des opportunités de service, tous conçus pour aider les jeunes adultes à naviguer dans la vie avec un but et une confiance en Christ. Grâce à des études bibliques, à l'adoration et au mentorat, nous créons un environnement sûr et favorable à la croissance spirituelle. Notre objectif est d'équiper la prochaine génération à vivre et à prêcher Christ avec audace, faisant ainsi un impact positif dans leur monde. Rejoignez-nous—que vous cherchiez un endroit où appartenir, grandir dans votre foi, ou servir, il y a une place pour vous ici.",
        image: '/images/youth-min.jpg',
        link: '/ministry-detailed?id=1'
      },
      {
        id: 2,
        name: 'communauté des femmes',
        desc: "Nous, la Communauté des Femmes de la NCACI, sommes une communauté vibrante de femmes engagées à grandir dans leur foi, à se soutenir mutuellement, et à faire une différence dans nos familles et la société en général. Nous croyons que lorsque les femmes se rassemblent pour partager leurs vies, leurs luttes et leurs victoires, elles peuvent grandir plus fortes en Christ et vivre leur vocation avec confiance. Grâce à des études bibliques, des retraites et des conventions de la Communauté des Femmes, notre Communauté des Femmes offre un espace pour se connecter, se ressourcer et être encouragées. Que vous cherchiez une croissance spirituelle, des amitiés durables ou des moyens de servir les autres, nous vous invitons à nous rejoindre alors que nous marchons ensemble dans la foi.",
        image: '/images/women-min.jpg',
        link: '/ministry-detailed?id=3'
      },
      {
        id: 3,
        name: 'communauté des enfants',
        desc: "À TNCACI, notre Ministère des Enfants est passionné par l'introduction des enfants à l'amour de Dieu et à la joie de suivre Jésus. Nous fournissons un environnement où les enfants peuvent explorer leur foi à travers des histoires bibliques engageantes, des activités créatives et un apprentissage pratique tout en assurant que des fondations chrétiennes solides sont posées pour eux. Notre objectif est de nourrir la croissance spirituelle de chaque enfant d'une manière amusante, relatable et significative. Des leçons du dimanche aux célébrations de la Semaine des Enfants, nous nous engageons à construire une forte fondation de foi qui durera toute une vie. Nous croyons que lorsque nous entraînons un enfant dans la voie qu'il devrait suivre, il n'en dévierait pas, et nous vous invitons à amener vos enfants à faire partie de ce voyage excitant de la foi.",
        image: '/images/children-min.jpg',
        link: '/ministry-detailed?id=4'
      },
      {
        id: 4,
        name: 'communauté des hommes',
        desc: "La Communauté des Hommes de la TNCACI est un endroit où les hommes se rassemblent pour grandir dans leur foi, se soutenir mutuellement et se défier les uns les autres pour devenir les hommes que Dieu nous a appelés à être. Notre mission est d'aider les hommes à renforcer leur relation avec Christ et à devenir des leaders dans leurs familles, leurs lieux de travail et leurs communautés. Grâce à des rassemblements réguliers, des conférences de la communauté des hommes et des opportunités de service, nous créons un espace pour que les hommes construisent des amitiés durables, partagent des expériences de vie et grandissent ensemble dans la foi. Que ce soit en approfondissant notre compréhension des Écritures, en affrontant des défis de la vie réelle ou en servant ceux dans le besoin, nous nous engageons à vivre notre foi avec un but et une intégrité.",
        image: '/images/mens-min.jpg',
        link: '/ministry-detailed?id=6'
      }
    ];
  }
});

</script>

<style lang="scss" scoped>

</style>