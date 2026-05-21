<script setup>
import { computed } from 'vue'
import { calculateRemainingDays } from '../../utils/date'

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  dates: {
    type: Object,
    required: true,
  },
})

const daysToLaunch = computed(() => calculateRemainingDays(props.dates.launchDate))
const daysToEarlyAccess = computed(() => calculateRemainingDays(props.dates.earlyAccessDeadline))

function resolveBadgeValue(type) {
  return type === 'earlyAccess' ? daysToEarlyAccess.value : daysToLaunch.value
}
</script>

<template>
  <section class="section section-launch">
    <div class="launch-banner" v-reveal="{ name: 'fade-up' }">
      <div v-reveal="{ name: 'slide-left', delay: 80 }">
        <span class="section-kicker">{{ content.kicker }}</span>
        <h2>{{ content.title.replaceAll(content.dangerTitle, "")}} <br />
          <span class="danger-title">{{content.dangerTitle}}</span>
        </h2>
        <p>{{ content.text }}</p>
      </div>

      <div class="launch-badges">
        <div
          v-for="(badge, index) in content.badges"
          :key="badge.label"
          class="launch-badge"
          :class="{ 'launch-badge-gold': badge.gold }"
          v-reveal="{
            name: index === 0 ? 'slide-right' : 'rotate-soft',
            delay: 180 + index * 120,
          }"
        >
          <strong>{{ resolveBadgeValue(badge.type) }}</strong>
          <span>{{ badge.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-launch {
  position: relative;
  isolation: isolate;
}

.section-launch::before {
  content: '';
  position: absolute;
  top: -10px;
  bottom: 0;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  border-radius: 54px;
  background:
    radial-gradient(circle at 18% 76%, rgba(216, 178, 112, 0.16), transparent 24%),
    radial-gradient(circle at 86% 26%, rgba(14, 38, 64, 0.12), transparent 26%),
    linear-gradient(135deg, rgba(248, 242, 232, 0.92), rgba(236, 223, 202, 0.86));
  z-index: -1;
}
</style>
