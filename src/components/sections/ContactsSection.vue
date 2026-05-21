<script setup>
import AppIcon from '../AppIcon.vue'
import SectionHeading from '../SectionHeading.vue'

defineProps({
  content: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="section section-contacts">
    <div v-reveal="{ name: 'fade-up' }">
      <SectionHeading v-bind="content.heading" />
    </div>

    <div class="contact-grid">
      <article
        v-for="(item, index) in content.items"
        :key="item.label"
        class="contact-card"
        v-reveal="{
          name: ['slide-left', 'fade-up', 'slide-right'][index % 3],
          delay: 90 + index * 90,
        }"
      >
        <div class="contact-icon">
          <AppIcon :name="item.icon" />
        </div>
        <span class="contact-label">{{ item.label }}</span>
        <strong>{{ item.value }}</strong>
        <p>{{ item.note }}</p>
      </article>
    </div>
  </section>
</template>
