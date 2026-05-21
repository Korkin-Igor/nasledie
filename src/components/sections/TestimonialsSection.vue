<script setup>
import { computed } from 'vue'
import SectionHeading from '../SectionHeading.vue'

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
})

const repeatedItems = computed(() => [...props.content.items, ...props.content.items])
</script>

<template>
  <section class="section section-testimonials">
    <div v-reveal="{ name: 'fade-up' }">
      <SectionHeading v-bind="content.heading" />
    </div>

    <!-- Передаем вычисленное время через CSS-переменную -->
    <div
      class="marquee"
      :style="{ '--duration': `${content.items.length * 8}s` }"
      v-reveal="{ name: 'zoom', delay: 140 }"
    >
      <div class="marquee-track">
        <div
            v-for="(item, index) in repeatedItems"
            :key="`${item.author}-${index}`"
            class="quote-card"
        >
          <div class="quote-stars" aria-label="5 из 5 звёзд">
            <span v-for="star in 5" :key="star">★</span>
          </div>

          <p class="quote-text">{{ item.quote }}</p>

          <div class="quote-author">
            <div class="quote-avatar" aria-hidden="true">{{ item.avatar }}</div>
            <div class="quote-author-copy">
              <strong>{{ item.author }}</strong> <br />
              <span>{{ item.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-testimonials {
  position: relative;
  isolation: isolate;
}

.section-testimonials::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  border-radius: 50px;
  background:
    radial-gradient(circle at 14% 24%, rgba(255, 230, 194, 0.22), transparent 20%),
    radial-gradient(circle at 90% 40%, rgba(103, 129, 164, 0.16), transparent 26%),
    linear-gradient(180deg, rgba(248, 243, 236, 0.9), rgba(236, 231, 225, 0.84));
  z-index: -1;
}

/* Контейнер-маска: прячет всё, что выходит за пределы экрана */
.marquee {
  overflow: hidden;
  width: 100%;
  display: flex;
  /* Мягкое размытие по бокам, чтобы отзывы премиально «выплывали» из ниоткуда */
  mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 10%, #000 90%, transparent);
}

/* Лента-трек, которая держит оригиналы и копии в одну линию */
.marquee-track {
  display: flex;
  gap: 24px;
  width: max-content;

  /* Используем переменную из Vue. Если её нет, подстрахуемся дефолтными 60s */
  animation: scroll-marquee var(--duration, 60s) linear infinite;
}

/* Карточка отзыва */
.quote-card {
  width: 380px; /* Фиксированная ширина, чтобы отзывы не сжимались */
  flex-shrink: 0; /* Не дает карточкам деформироваться */

  /* Твои текущие стили карточки (бордеры, паддинги, тени) */
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
}

/* Анимация бесшовного сдвига */
@keyframes scroll-marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Сдвигаем ровно на половину общей длины трека.
       В этот момент копия встает на место оригинала,
       и цикл незаметно перезапускается с 0% */
    transform: translateX(-50%);
  }
}

</style>
