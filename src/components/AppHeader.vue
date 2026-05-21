<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

defineProps({
  brand: {
    type: Object,
    required: true,
  },
  navigation: {
    type: Array,
    required: true,
  },
})

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 32
}

watch(isMenuOpen, (opened) => {
  document.body.style.overflow = opened ? 'hidden' : ''
})

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
  document.body.style.overflow = ''
})
</script>

<template>
  <header :class="['topbar', { 'topbar-scrolled': isScrolled }]">
    <div class="brand-lockup">
      <div class="brand-mark">
        <img src="@/images/logo.png" alt="logo" class="logo-img">
      </div>

      <div>
        <p class="eyebrow">{{ brand.eyebrow }}</p>
        <p class="brand-name">{{ brand.name }}</p>
      </div>
    </div>

    <!-- DESKTOP -->
    <nav class="topnav desktop-nav">
      <a
          v-for="item in navigation"
          :key="item.href"
          :href="item.href"
          :class="{ 'topnav-cta': item.variant === 'cta' }"
      >
        {{ item.label }}
      </a>
    </nav>

    <!-- BURGER -->
    <button
        class="burger"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
        aria-label="menu"
    >
      <span />
      <span />
      <span />
    </button>

    <!-- OVERLAY -->
    <div
        class="mobile-overlay"
        :class="{ open: isMenuOpen }"
        @click="closeMenu"
    />

    <!-- MOBILE MENU -->
    <aside
        class="mobile-menu"
        :class="{ open: isMenuOpen }"
        v-show="isMenuOpen"
    >
      <nav class="mobile-nav">
        <a
            v-for="item in navigation"
            :key="item.href"
            :href="item.href"
            :class="{
              'mobile-cta': item.variant === 'cta',
              'topnav-cta' : item.variant === 'cta'
            }"
            @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </nav>
    </aside>
  </header>
</template>

<style scoped>

.logo-img {
  max-width: 70px;
}

.desktop-nav {
  display: flex;
}

/* BURGER */
.burger {
  display: none;

  position: relative;
  width: 54px;
  height: 54px;

  border: none;
  background: transparent;

  cursor: pointer;
  z-index: 120;
}

.burger span {
  position: absolute;
  left: 11px;

  width: 30px;
  height: 2px;

  border-radius: 999px;
  background: var(--gold);

  transition: 0.35s ease;
}

.burger span:nth-child(1) {
  top: 18px;
}

.burger span:nth-child(2) {
  top: 26px;
}

.burger span:nth-child(3) {
  top: 34px;
}

/* X */
.burger.active span:nth-child(1) {
  top: 26px;
  transform: rotate(45deg);
}

.burger.active span:nth-child(2) {
  opacity: 0;
}

.burger.active span:nth-child(3) {
  top: 26px;
  transform: rotate(-45deg);
}

/* OVERLAY */
.mobile-overlay {
  position: fixed;
  inset: 0;

  opacity: 0;
  pointer-events: none;

  transition: 0.35s ease;

  z-index: 90;
}

.mobile-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

/* SIDE MENU */
.mobile-menu {
  max-width: 40vw;

  position: fixed;
  top: 0;
  right: -100px;

  width: min(82vw, 360px);
  height: 100vh;

  padding: 120px 24px 30px;

  background:
      linear-gradient(
          180deg,
          rgba(7, 17, 31, 0.96),
          rgba(10, 24, 43, 0.98)
      );

  border-left: 1px solid rgba(243, 209, 143, 0.12);

  backdrop-filter: blur(18px);

  box-shadow:
      -10px 0 40px rgba(0, 0, 0, 0.35);

  transform: translateX(105%);
  transition: transform 0.45s cubic-bezier(.77,0,.18,1);

  z-index: 100;
}

.mobile-menu.open {
  transform: translateX(-80px);
}

/* LINKS */
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-nav a {
  position: relative;

  padding: 10px 12px;

  border-radius: 18px;

  color: rgba(255,255,255,0.92);

  font-size: 1.08rem;
  font-weight: 600;
  letter-spacing: 0.01em;

  background:
      linear-gradient(
          135deg,
          rgba(255,255,255,0.04),
          rgba(255,255,255,0.02)
      );

  border: 1px solid rgba(255,255,255,0.04);

  transition:
      transform 0.35s ease,
      background 0.35s ease,
      border-color 0.35s ease,
      color 0.35s ease;
}

.mobile-nav a:hover {
  transform: translateX(6px);

  background:
      linear-gradient(
          135deg,
          rgba(243,209,143,0.16),
          rgba(255,255,255,0.04)
      );

  border-color: rgba(243,209,143,0.2);

  color: #fff;
}

/* CTA */
.mobile-cta {
  margin-top: 18px;

  text-align: center;

  background: linear-gradient(
      135deg,
      #f8e3b0 0%,
      #b77c3a 35%,
      #fee7b6 100%
  ) !important;

  color: white !important;

  border: none !important;

  box-shadow:
      0 12px 30px rgba(183, 124, 58, 0.28);
}

/* MOBILE */
@media (max-width: 860px) {
  .desktop-nav {
    display: none;
  }

  .burger {
    display: block;
  }

  .topbar {
    padding-right: 14px;
  }
}

@media (max-width: 500px) {
  .mobile-nav a {
    font-size: .8rem;
  }
}

@media (max-width: 370px) {
  .burger.active {
    right: 20px;
  }
}
</style>