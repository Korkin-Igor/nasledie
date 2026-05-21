<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  brand: {
    type: Object,
    required: true,
  },
  navigation: {
    type: Array,
    required: true,
  },
  contacts: {
    type: Object,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <footer class="site-footer">
    <div class="footer-shell">
      <div class="footer-brand" v-reveal="{ name: 'slide-left' }">
        <span class="footer-kicker">{{ brand.eyebrow }}</span>
        <h2>{{ brand.name }}</h2>
        <p>{{ content.description }}</p>
        <p class="footer-note">{{ content.note }}</p>
      </div>

      <nav class="footer-block footer-nav" v-reveal="{ name: 'fade-up', delay: 90 }" aria-label="Навигация по сайту">
        <span class="footer-title">Навигация</span>
        <a v-for="item in navigation" :key="item.href" :href="item.href">
          {{ item.label }}
        </a>
      </nav>

      <div class="footer-block footer-contacts" v-reveal="{ name: 'slide-right', delay: 160 }">
        <span class="footer-title">Контакты и соцсети</span>

        <a
          v-for="(item, index) in contacts.items"
          :key="item.label"
          :href="item.href"
          class="footer-contact"
          v-reveal="{
            name: ['slide-left', 'zoom', 'slide-right'][index % 3],
            delay: 200 + index * 90,
          }"
        >
          <span class="footer-contact__icon">
            <AppIcon :name="item.icon" />
          </span>

          <span class="footer-contact__copy">
            <span class="footer-contact__label">{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
            <small>{{ item.note }}</small>
          </span>
        </a>
      </div>
    </div>

    <div class="footer-bottom" v-reveal="{ name: 'fade-up', delay: 260 }">
      <p>{{ content.bottomLine }}</p>
      <a href="#app" class="footer-back">Наверх</a>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  margin-top: 48px;
  padding: 56px 0 22px;
  background:
    radial-gradient(circle at 12% 18%, rgba(220, 178, 106, 0.14), transparent 26%),
    radial-gradient(circle at 88% 22%, rgba(46, 88, 138, 0.2), transparent 28%),
    linear-gradient(180deg, #071221 0%, #0b1d34 54%, #081423 100%);
  color: #f4eee3;
  overflow: hidden;
}

.site-footer::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(243, 209, 143, 0.72), transparent);
}

.footer-shell,
.footer-bottom {
  width: min(1360px, calc(100% - 40px));
  margin: 0 auto;
}

.footer-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) repeat(2, minmax(220px, 0.8fr));
  gap: 30px;
  align-items: start;
}

.footer-brand,
.footer-block {
  position: relative;
  padding: 28px;
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03)),
    rgba(5, 15, 28, 0.44);
  border: 1px solid rgba(243, 209, 143, 0.12);
  box-shadow:
    0 18px 42px rgba(3, 7, 14, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
}

.footer-kicker,
.footer-title,
.footer-contact__label {
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.footer-kicker {
  display: inline-block;
  margin-bottom: 14px;
  color: rgba(245, 225, 186, 0.74);
  font-size: 0.72rem;
}

.footer-brand h2 {
  margin: 0 0 14px;
  color: #f6e6c0;
  font-family: 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  font-size: clamp(2rem, 3vw, 3.15rem);
  line-height: 0.96;
}

.footer-brand p,
.footer-contact small {
  margin: 0;
  color: rgba(232, 228, 221, 0.72);
  line-height: 1.75;
}

.footer-note {
  margin-top: 12px !important;
}

.footer-title {
  display: block;
  margin-bottom: 16px;
  color: rgba(245, 225, 186, 0.68);
  font-size: 0.7rem;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav a,
.footer-back {
  color: #f6f0e7;
  transition:
    color 0.35s ease,
    transform 0.35s ease,
    opacity 0.35s ease;
}

.footer-nav a:hover,
.footer-back:hover {
  color: #f0d293;
  transform: translateX(4px);
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer-contact {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px;
  border-radius: 20px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(243, 209, 143, 0.08);
  transition:
    transform 0.35s ease,
    border-color 0.35s ease,
    background 0.35s ease;
}

.footer-contact:hover {
  transform: translateY(-4px);
  border-color: rgba(243, 209, 143, 0.24);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(219, 184, 120, 0.1));
}

.footer-contact__icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 16px;
  color: #f0d293;
  background: rgba(255, 255, 255, 0.06);
}

.footer-contact__icon :deep(svg) {
  width: 22px;
  height: 22px;
}

.footer-contact__copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.footer-contact__label {
  color: rgba(245, 225, 186, 0.58);
  font-size: 0.64rem;
}

.footer-contact strong {
  color: #fff8eb;
  font-weight: 700;
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(243, 209, 143, 0.14);
}

.footer-bottom p {
  margin: 0;
  color: rgba(232, 228, 221, 0.68);
}

@media (max-width: 1120px) {
  .footer-shell {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}

@media (max-width: 720px) {
  .site-footer {
    padding-top: 42px;
  }

  .footer-shell {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
