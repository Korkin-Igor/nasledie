<script setup>
import { computed } from 'vue'
import { calculateRemainingDays } from '@/utils/date.js'

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

function resolveFactValue(fact) {
  if (fact.valueType === 'earlyAccessCountdown') {
    return `${daysToEarlyAccess.value} ${fact.suffix}`
  }

  return fact.value
}
</script>

<template>
  <section class="hero">
    <div class="hero-copy" v-reveal="{ name: 'slide-left', duration: 900 }">

      <h1>
        {{ content.title }}
        <span>{{ content.highlight }}</span>
      </h1>

      <p class="hero-lead">{{ content.lead }}</p>

      <div class="hero-actions">
        <a
          v-for="action in content.actions"
          :key="action.href"
          :href="action.href"
          :class="`button button-${action.variant}`"
        >
          {{ action.label }}
        </a>
      </div>

      <p class="hero-note">{{ content.note }}</p>

      <div class="hero-stats">
        <article
          v-for="(item, index) in content.stats"
          :key="item.label"
          class="stat-card"
          v-reveal="{
            name: ['fade-up', 'zoom', 'slide-right'][index % 3],
            delay: 220 + index * 100,
          }"
        >
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
        </article>
      </div>
    </div>

    <div class="hero-stage" v-reveal="{ name: 'slide-right', delay: 120, duration: 940 }">
      <div class="stage-panel">
        <div class="stage-sheen"></div>

        <div class="memory-book">
          <div class="memory-book__meta">
            <span>{{ content.book.metaLabel }}</span>
            <span>{{ daysToLaunch }} {{ content.book.metaCountdownLabel }}</span>
          </div>

          <div class="memory-book__title">{{ content.book.title }}</div>
          <p>{{ content.book.description }}</p>
          <div class="small-blocks">
            <div
                v-for="panel in content.floatingPanels"
                :key="panel.label"
                class="floating-panel"
                :class="panel.positionClass"
            >
              <div class="panel-icon">
                <img :src="panel.icon" alt="qwe" class="panel-element-image">
              </div>
              <div>
                <span class="floating-label">{{ panel.label }}</span>
                <strong>{{ panel.value }}</strong>
              </div>
            </div>
          </div>
          <div class="memory-book__grid">
            <div v-for="fact in content.book.facts" :key="fact.label">
              <strong>{{ resolveFactValue(fact) }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-stage {
  position: relative;
}

.stage-panel {
  position: relative;

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  padding: 20px;

  border-radius: 38px;

  background:
      linear-gradient(
          180deg,
          rgba(255,255,255,0.72),
          rgba(248,239,226,0.82)
      );

  border: 1px solid rgba(212, 188, 153, 0.35);

  box-shadow:
      0 30px 80px rgba(0,0,0,0.08),
      inset 0 1px 0 rgba(255,255,255,0.6);

  backdrop-filter: blur(18px);

  overflow: hidden;
}

.stage-panel::before {
  content: '';

  position: absolute;
  inset: 0;

  background:
      radial-gradient(
          circle at top right,
          rgba(201, 157, 97, 0.12),
          transparent 30%
      );

  pointer-events: none;
}

.stage-sheen {
  position: absolute;

  width: 280px;
  height: 280px;

  top: -100px;
  right: -80px;

  border-radius: 50%;

  background: rgba(191, 146, 77, 0.08);

  filter: blur(40px);

  pointer-events: none;
}

/* BOOK */

.memory-book {
  position: relative;

  grid-column: 1 / -1;

  padding: 56px;

  border-radius: 18px;

  overflow: hidden;

  background:
      linear-gradient(
          160deg,
          rgba(11, 26, 44, 0.98),
          rgba(7, 18, 32, 1)
      );

  border: 1px solid rgba(195, 154, 90, 0.28);

  transition:
      transform .35s ease,
      box-shadow .35s ease;
}

.memory-book:hover {
  transform: translateY(-4px);
}

.memory-book::before {
  content: '';

  position: absolute;
  inset: 4px;

  border-radius: 18px;

  border: 1px solid rgba(201, 157, 97, 0.18);

  pointer-events: none;
}

.memory-book__meta {
  display: flex;
  justify-content: space-between;
  gap: 12px;

  margin-bottom: 18px;

  color: rgba(255,255,255,0.4);

  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.memory-book__title {
  margin-bottom: 18px;

  color: #fff;

  font-family: 'Palatino Linotype', serif;
  font-size: clamp(2rem, 2.8vw, 3rem);
  line-height: 1.02;
}

.memory-book p {
  margin: 0;

  color: rgba(255,255,255,0.72);

  line-height: 1.7;
}

.memory-book__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;

  margin-top: 24px;
  padding-top: 20px;

  border-top: 1px solid rgba(255,255,255,0.08);
}

.memory-book__grid span {
  display: block;

  margin-bottom: 8px;

  color: rgba(255,255,255,0.3);

  font-size: 11px;
  letter-spacing: .12em;
  text-transform: uppercase;
}

.memory-book__grid strong {
  color: #d5a45a;

  font-size: 15px;
  line-height: 1.5;
}

/* FLOATING PANELS */

.floating-panel {
  position: relative;

  display: flex;
  align-items: center;
  gap: 14px;

  min-height: 118px;

  padding: 16px;

  border-radius: 22px;

  background:
      linear-gradient(
          180deg,
          rgba(255,255,255,0.82),
          rgba(245,236,223,0.92)
      );

  border: 1px solid rgba(215, 190, 156, 0.28);

  box-shadow:
      0 10px 30px rgba(0,0,0,0.05);

  transition:
      transform .3s ease,
      box-shadow .3s ease,
      border-color .3s ease;
}

.floating-panel:hover {
  transform: translateY(-5px);

  border-color: rgba(191, 146, 77, 0.4);

  box-shadow:
      0 18px 40px rgba(0,0,0,0.08);
}

.panel-icon {
  flex-shrink: 0;

  width: 58px;
  height: 58px;

  border-radius: 16px;

  overflow: hidden;
}

.panel-element-image {
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.floating-label {
  display: block;

  margin-bottom: 6px;

  color: #9f978d;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: .12em;
  text-transform: uppercase;
}

.floating-panel strong {
  display: block;

  color: #0a1524;

  font-size: 16px;
  line-height: 1.45;
}

/* PREVIEW */

.stage-preview {
  grid-column: 1 / -1;

  position: relative;

  padding: 14px;

  border-radius: 28px;

  background:
      linear-gradient(
          180deg,
          rgba(255,255,255,0.72),
          rgba(243,233,219,0.88)
      );

  border: 1px solid rgba(215, 190, 156, 0.22);

  overflow: hidden;
}

.preview-screen {
  position: relative;

  min-height: 240px;

  border-radius: 22px;

  overflow: hidden;

  background:
      linear-gradient(
          rgba(0,0,0,0.08),
          rgba(0,0,0,0.08)
      ),
      url("../../../public/images/hero/family-preview.jpg")
      center center / cover no-repeat;

  box-shadow:
      inset 0 0 0 1px rgba(255,255,255,0.08);
}

.preview-screen::after {
  content: '';

  position: absolute;
  inset: 0;

  background:
      linear-gradient(
          to top,
          rgba(0,0,0,0.2),
          transparent 40%
      );

  pointer-events: none;
}

/* MOBILE */

@media (max-width: 980px) {
  .stage-panel {
    grid-template-columns: 1fr;
  }

  .memory-book__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .stage-panel {
    padding: 14px;
    border-radius: 28px;
  }

  .memory-book {
    padding: 20px;
  }

  .memory-book__title {
    font-size: 2rem;
  }

  .preview-screen {
    min-height: 200px;
  }

  .floating-panel strong {
    font-size: 14px;
  }
}

.floating-panel {
  align-items: center;
  justify-content: flex-start;

  min-height: 140px;

  padding: 18px;

  display: flex;
  gap: 16px;
}

.floating-panel > div:last-child {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
}

.floating-panel strong {
  margin: 0;

  line-height: 1.35;
}

.floating-label {
  margin-bottom: 8px;

  display: block;
}

.stage-panel {
  align-items: stretch;
}

.small-blocks {
  display: flex;
  justify-content: center;
  gap: 0;
}

.small-blocks > div {
  max-width: 60%;
}

.small-blocks > div:hover {
  opacity: .9;
}

.memory-book__grid > div {
  display: flex;
  flex-direction: column;
  gap: 240px;
}

@media (max-width: 1180px) {
  .memory-book {
    position: inherit;
  }
}
</style>
