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
  <section class="section section-reasons">
    <div class="reasons-shell">
      <div class="reasons-intro">
        <div class="reasons-heading" v-reveal="{ name: 'fade-up' }">
          <SectionHeading v-bind="content.heading" />
        </div>

        <article class="reason-featured" v-reveal="{ name: 'slide-right', delay: 120 }">
          <span class="reason-featured__eyebrow">Семейная реликвия в цифровом виде</span>
          <h3>Мы оформляем память так, чтобы она ощущалась как наследие, а не как набор файлов.</h3>
          <p>
            Важны не только материалы, но и то, как человек прожил жизнь, что оставил после себя и
            почему семья хочет возвращаться к этой истории снова.
          </p>
          <div class="reason-featured__signature">
            <span>Мы помним</span>
            <span>Мы гордимся</span>
            <span>Мы передаём дальше</span>
          </div>
        </article>
      </div>

      <div class="reason-grid">
        <article
          v-for="(item, index) in content.items"
          :key="item.title"
          class="reason-card"
          :class="[`reason-card-${(index % 5) + 1}`]"
          v-reveal="{
            name: ['slide-left', 'fade-up', 'slide-right', 'zoom', 'rotate-soft'][index % 5],
            delay: 140 + index * 80,
          }"
        >
          <div class="reason-card__top">
            <span class="reason-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="reason-chip">Преимущество</span>
          </div>

          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-reasons {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 8% 12%, rgba(215, 176, 101, 0.18), transparent 24%),
    radial-gradient(circle at 88% 18%, rgba(12, 34, 58, 0.2), transparent 30%),
    linear-gradient(180deg, #f8f1e6 0%, #efe0ca 48%, #f7f0e6 100%);
}

.section-reasons::before,
.section-reasons::after {
  content: '';
  position: absolute;
  pointer-events: none;
}

.section-reasons::before {
  inset: 72px auto auto -100px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(217, 181, 115, 0.18), transparent 70%);
  filter: blur(14px);
}

.section-reasons::after {
  right: -80px;
  bottom: -50px;
  width: 280px;
  height: 280px;
  border-radius: 42px;
  background: linear-gradient(135deg, rgba(9, 23, 39, 0.18), rgba(188, 145, 76, 0.06));
  transform: rotate(16deg);
}

.reasons-shell {
  position: relative;
  z-index: 1;
}

.reasons-intro {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(420px, 0.95fr);
  gap: 24px;
  align-items: start;
  margin-bottom: 30px;
}

.reasons-heading :deep(.section-heading) {
  align-items: flex-start;
  text-align: left;
}

.reason-featured,
.reason-card {
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  border: 1px solid rgba(182, 137, 67, 0.18);
  box-shadow:
    0 26px 70px rgba(16, 28, 44, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.reason-featured {
  display: grid;
  align-content: start;
  gap: 0;
  min-height: 100%;
  padding: 28px 28px 24px;
  background:
    linear-gradient(145deg, rgba(9, 21, 36, 0.98), rgba(17, 39, 62, 0.94)),
    radial-gradient(circle at top right, rgba(210, 168, 95, 0.2), transparent 34%);
  color: #f8f4ed;
}

.reason-featured::before,
.reason-card::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.09);
  pointer-events: none;
}

.reason-featured::after {
  content: '';
  position: absolute;
  inset: auto -40px -70px auto;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(214, 172, 104, 0.3), transparent 68%);
  filter: blur(8px);
}

.reason-featured__eyebrow,
.reason-chip {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 0.68rem;
}

.reason-featured__eyebrow {
  margin-bottom: 14px;
  background: rgba(255, 255, 255, 0.07);
  color: rgba(255, 244, 220, 0.72);
}

.reason-featured h3 {
  margin: 0 0 12px;
  max-width: none;
  font-family: 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(2rem, 2.75vw, 2.85rem);
  line-height: 0.94;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.reason-featured p {
  position: relative;
  z-index: 1;
  max-width: none;
  margin: 0;
  color: rgba(241, 231, 216, 0.8);
  line-height: 1.72;
}

.reason-featured__signature {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.reason-featured__signature span {
  padding: 12px 16px;
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(244, 211, 151, 0.12));
  border: 1px solid rgba(255, 232, 194, 0.14);
  color: #fff7ea;
}

.reason-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 22px;
}

.reason-card {
  padding: 28px 28px 26px;
  background:
    linear-gradient(180deg, rgba(255, 253, 248, 0.94), rgba(245, 235, 220, 0.78)),
    rgba(255, 251, 245, 0.94);
  transition:
    transform 0.55s ease,
    border-color 0.55s ease,
    box-shadow 0.55s ease,
    background 0.55s ease;
}

.reason-card::after {
  content: '';
  position: absolute;
  inset: auto -30px -44px auto;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(214, 172, 104, 0.18), transparent 70%);
  transition: transform 0.55s ease, opacity 0.55s ease;
}

.reason-card:hover {
  transform: translateY(-10px);
  border-color: rgba(182, 137, 67, 0.32);
  box-shadow:
    0 30px 80px rgba(16, 28, 44, 0.16),
    0 0 0 1px rgba(182, 137, 67, 0.12);
  background:
    linear-gradient(180deg, rgba(255, 255, 252, 1), rgba(248, 238, 222, 0.96)),
    rgba(255, 251, 245, 0.98);
}

.reason-card:hover::after {
  opacity: 1;
  transform: scale(1.08);
}

.reason-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
}

.reason-index {
  color: #0b1830;
  font-family: 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(2rem, 3vw, 3.4rem);
  line-height: 0.9;
  letter-spacing: -0.05em;
}

.reason-chip {
  color: rgba(12, 27, 45, 0.62);
  background: rgba(255, 255, 255, 0.52);
  border: 1px solid rgba(182, 137, 67, 0.16);
}

.reason-card h3 {
  margin: 0 0 12px;
  max-width: 16ch;
  font-family: 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: 1.7rem;
  line-height: 1.02;
}

.reason-card p {
  margin: 0;
  color: #42597a;
  line-height: 1.75;
}

.reason-card-1 {
  grid-column: span 5;
}

.reason-card-2 {
  grid-column: span 3;
}

.reason-card-3 {
  grid-column: span 4;
}

.reason-card-4 {
  grid-column: span 4;
}

.reason-card-5 {
  grid-column: span 3;
}

.reason-card-1,
.reason-card-6 {
  background:
    linear-gradient(135deg, rgba(255, 251, 245, 0.98), rgba(236, 224, 205, 0.92)),
    rgba(255, 251, 245, 0.96);
}

.reason-card-6 {
  grid-column: span 5;
}

@media (max-width: 1180px) {
  .reasons-intro {
    grid-template-columns: 1fr;
  }

  .reason-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .reason-card-1,
  .reason-card-2,
  .reason-card-3,
  .reason-card-4,
  .reason-card-5,
  .reason-card-6 {
    grid-column: auto;
  }
}

@media (max-width: 720px) {
  .reason-grid {
    grid-template-columns: 1fr;
  }

  .reason-featured,
  .reason-card {
    padding: 24px 22px;
  }

  .reason-featured h3 {
    max-width: none;
  }

  .reason-card h3 {
    max-width: none;
  }
}
</style>
