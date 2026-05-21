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
  <section class="section section-audience">
    <div class="audience-panel" v-reveal="{ name: 'fade-up' }">
      <SectionHeading v-bind="content.heading" />

      <div class="audience-list">
        <article
          v-for="(item, index) in content.items"
          :key="item"
          class="audience-card"
          v-reveal="{
            name: ['slide-left', 'fade-up', 'slide-right', 'zoom'][index % 4],
            delay: 120 + index * 80,
          }"
        >
          <span class="audience-pip"></span>
          <p>{{ item }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-audience {
  position: relative;
  isolation: isolate;
}

.section-audience::before {
  content: '';
  position: absolute;
  top: 10px;
  bottom: 6px;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  border-radius: 44px;
  background:
    radial-gradient(circle at 12% 24%, rgba(245, 225, 181, 0.22), transparent 22%),
    radial-gradient(circle at 82% 68%, rgba(113, 130, 103, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(246, 241, 233, 0.86), rgba(232, 228, 215, 0.78));
  z-index: -1;
}
</style>
