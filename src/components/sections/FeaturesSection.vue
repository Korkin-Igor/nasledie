<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppIcon from '../AppIcon.vue'
import SectionHeading from '../SectionHeading.vue'

defineProps({
  content: {
    type: Object,
    required: true,
  },
})

const sectionRef = ref(null)
const leftPanelRef = ref(null)

const stickyStyles = ref({})

const updateSticky = () => {
  if (!sectionRef.value || !leftPanelRef.value) return

  // mobile off
  if (window.innerWidth < 992) {
    stickyStyles.value = {}
    return
  }

  const section = sectionRef.value
  const panel = leftPanelRef.value

  const sectionRect = section.getBoundingClientRect()

  const topOffset = 120

  const panelHeight = panel.offsetHeight

  // ВАЖНО:
  // ширину берём у left-column
  const parentWidth =
      panel.parentElement.getBoundingClientRect().width

  const sectionTop =
      window.scrollY + sectionRect.top

  const sectionBottom =
      sectionTop + section.offsetHeight

  // где fixed должен остановиться
  const stopSticky =
      sectionBottom - panelHeight - topOffset

  // 1. ДО СЕКЦИИ
  if (window.scrollY < sectionTop - topOffset + 90) {
    stickyStyles.value = {}
    return
  }

  // 2. FIXED
  if (window.scrollY < stopSticky - 90) {
    stickyStyles.value = {
      position: 'fixed',
      top: `${topOffset}px`,
      width: `${parentWidth}px`,
    }

    return
  }

  // 3. ФИКС ВНИЗУ СЕКЦИИ
  stickyStyles.value = {
    position: 'absolute',
    bottom: '0',
    top: 'auto',
    width: `${parentWidth}px`,
  }
}

onMounted(() => {
  updateSticky()

  window.addEventListener('scroll', updateSticky, {
    passive: true,
  })

  window.addEventListener('resize', updateSticky)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateSticky)
  window.removeEventListener('resize', updateSticky)
})
</script>

<template>
  <section
      ref="sectionRef"
      class="premium-sticky-section"
  >
    <div class="sticky-container">

      <!-- LEFT -->
      <div class="left-column">
        <div
            ref="leftPanelRef"
            class="left-sticky-panel"
            :style="stickyStyles"
            v-reveal="{ name: 'slide-left' }"
        >
          <SectionHeading v-bind="content.heading" />
        </div>
      </div>

      <!-- RIGHT -->
      <div class="right-scroll-panel">
        <article
            v-for="item in content.items"
            :key="item.title"
            class="premium-card"
            v-reveal="{
              name: ['slide-right', 'fade-up', 'zoom'][content.items.indexOf(item) % 3],
              delay: 110 + content.items.indexOf(item) * 70,
            }"
        >
          <div class="card-icon-wrapper">
            <AppIcon
                :name="item.icon"
                class="card-icon"
            />
          </div>

          <div class="card-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>

    </div>
  </section>
</template>

<style scoped>
.premium-sticky-section {
  width: 100%;
  background-color: #0d1224;
  padding: 100px 0;
}

.sticky-container {
  position: relative;

  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  align-items: flex-start;
  gap: 60px;
}

/* IMPORTANT */
.left-column {
  width: 42%;
  flex-shrink: 0;

  position: relative;

  /* ВАЖНО */
  align-self: stretch;
}

.left-sticky-panel {
  color: var(--cream);
  will-change: transform;
}

/* RIGHT */
.right-scroll-panel {
  width: 53%;

  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 10px 80px 10px 10px;
}

/* CARD */
.premium-card {
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: flex-start;
  gap: 24px;

  padding: 32px;

  background-color: rgba(255, 255, 255, 0.03);

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;

  transition:
      transform 0.35s ease,
      background-color 0.3s ease,
      box-shadow 0.35s ease;
}

.premium-card::before {
  content: '';

  position: absolute;
  inset: 0;

  background-color: #c9c8b5;

  transform: translateX(-101%);

  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);

  z-index: -1;
}

.premium-card:hover {
  margin-right: -100px;
  background-color: #505042;
  box-shadow: 5px 0 40px rgba(26, 27, 90, 0.45);
  transition: .5s;
}

.premium-card:hover::before {
  transform: translateX(0);
}

.card-icon-wrapper {
  width: 48px;
  height: 48px;

  flex-shrink: 0;

  border-radius: 50%;

  background-color: #3b66f5;

  display: flex;
  align-items: center;
  justify-content: center;
}

.card-icon {
  color: white;
  font-size: 20px;
}

.card-content h3 {
  margin: 0 0 12px;

  font-size: 22px;
  color: white;

  transition: color 0.3s ease;
}

.card-content p {
  margin: 0;

  font-size: 15px;
  line-height: 1.6;

  color: rgba(255, 255, 255, 0.7);

  transition: color 0.3s ease;
}


/* MOBILE */
@media (max-width: 991px) {
  .sticky-container {
    flex-direction: column;
    gap: 40px;
  }

  .left-column,
  .right-scroll-panel {
    width: 100%;
  }

  .right-scroll-panel {
    padding: 10px;
  }

  .premium-card:hover {
    transform: none;
  }
}
</style>
