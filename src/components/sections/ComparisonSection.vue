<script setup>
import SectionHeading from '../SectionHeading.vue'

defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section :id="content.id" class="section section-comparison">
    <div v-reveal="{ name: 'fade-up' }">
      <SectionHeading v-bind="content.heading" />
    </div>

    <div class="comparison-grid">
      <article
        v-for="(item, index) in content.items"
        :key="item.title"
        class="comparison-card"
        v-reveal="{
          name: index % 2 === 0 ? 'slide-left' : 'slide-right',
          delay: 90 + index * 75,
        }"
      >
        <div class="comparison-title">{{ item.title }}</div>
        <p class="comparison-loss">{{ item.limitation }}</p>
        <p class="comparison-win">{{ item.benefit }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.section-comparison {
  position: relative;
  isolation: isolate;
}

.section-comparison::before {
  content: '';
  position: absolute;
  top: 4px;
  bottom: 10px;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  border-radius: 50px;
  background:
    radial-gradient(circle at 16% 72%, rgba(214, 173, 107, 0.12), transparent 24%),
    radial-gradient(circle at 86% 22%, rgba(50, 86, 126, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(244, 241, 236, 0.92), rgba(232, 236, 240, 0.78));
  z-index: -1;
}
</style>
