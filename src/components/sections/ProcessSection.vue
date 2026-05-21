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
  <section :id="content.id" class="section section-process">
    <div v-reveal="{ name: 'fade-up' }">
      <SectionHeading v-bind="content.heading" />
    </div>

    <div class="process-grid">
      <article
        v-for="(item, index) in content.items"
        :key="item.step"
        class="process-card reveal-card"
        v-reveal="{
          name: ['slide-left', 'fade-up', 'slide-right', 'rotate-soft'][index % 4],
          delay: 120 + index * 95,
        }"
      >
        <span class="process-step">{{ item.step }}</span>
        <h3>{{ item.title }}</h3>
        <div class="reveal-panel">
          <p>{{ item.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.section-process {
  position: relative;
  isolation: isolate;
}

.process-grid {
  align-items: start;
}

.process-card {
  align-self: start;
}

.section-process::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 0;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  border-radius: 52px;
  background:
    radial-gradient(circle at 18% 18%, rgba(201, 164, 92, 0.16), transparent 22%),
    radial-gradient(circle at 84% 76%, rgba(11, 33, 57, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(245, 238, 228, 0.9), rgba(235, 226, 212, 0.86));
  z-index: -1;
}
</style>
