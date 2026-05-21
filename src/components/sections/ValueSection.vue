<script setup>
defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="section section-value">
    <div class="value-card" v-reveal="{ name: 'fade-up' }">
      <div class="value-copy" v-reveal="{ name: 'slide-left', delay: 60 }">
        <span class="section-kicker">{{ content.kicker }}</span>
        <h2>{{ content.title }}</h2>

        <ul class="gold-list">
          <li v-for="item in content.items" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="value-quote" v-reveal="{ name: 'slide-right', delay: 180 }">
        <div class="quote-shell">
          <span class="quote-top">{{ content.quote.top }}</span>
          <p>{{ content.quote.text }}</p>
          <span class="quote-bottom">
            {{ content.text }}
            <p>{{ content.quote.bottom }}</p>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-value {
  position: relative;
  isolation: isolate;
}

.section-value::before {
  content: '';
  position: absolute;
  top: -4px;
  bottom: 14px;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  border-radius: 52px;
  background:
    radial-gradient(circle at 22% 20%, rgba(255, 238, 196, 0.34), transparent 24%),
    radial-gradient(circle at 78% 78%, rgba(195, 159, 95, 0.14), transparent 26%),
    linear-gradient(180deg, rgba(255, 249, 240, 0.9), rgba(242, 232, 217, 0.82));
  z-index: -1;
}
</style>
