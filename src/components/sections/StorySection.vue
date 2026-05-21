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
  <section :id="content.id" class="section section-story">
    <div v-reveal="{ name: 'fade-up' }">
      <SectionHeading v-bind="content.heading" />
    </div>

    <div class="story-layout">
      <article class="story-card story-card-text" v-reveal="{ name: 'slide-left', delay: 80 }">
        <p v-for="paragraph in content.paragraphs" :key="paragraph">{{ paragraph }}</p>
        <blockquote>{{ content.quote }}</blockquote>
      </article>

      <article class="story-card story-card-media" v-reveal="{ name: 'slide-right', delay: 180 }">
        <div class="media-placeholder media-placeholder-video">
          <div class="media-placeholder__icon">
            <AppIcon :name="content.media.icon" />
          </div>
          <h3>{{ content.media.title }}</h3>
          <p>{{ content.media.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.section-story {
  position: relative;
  isolation: isolate;
}

.section-story::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  border-radius: 48px;
  background:
    radial-gradient(circle at 14% 22%, rgba(214, 175, 109, 0.16), transparent 24%),
    radial-gradient(circle at 84% 18%, rgba(18, 43, 69, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(249, 242, 232, 0.94), rgba(241, 230, 212, 0.78));
  z-index: -1;
}
</style>
