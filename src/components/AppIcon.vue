<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const icons = {
  play: {
    viewBox: '0 0 24 24',
    body: `
      <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="currentColor" />
    `,
  },
  message: {
    viewBox: '0 0 24 24',
    body: `
      <path d="M5 6.75C5 5.78 5.78 5 6.75 5H17.25C18.22 5 19 5.78 19 6.75V14.25C19 15.22 18.22 16 17.25 16H10.75L7.25 19V16H6.75C5.78 16 5 15.22 5 14.25V6.75Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M8 9H16M8 12H13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    `,
  },
  phone: {
    viewBox: '0 0 24 24',
    body: `
      <path d="M8.8 4.75L10.48 7.98C10.82 8.63 10.69 9.42 10.17 9.93L8.98 11.09C9.78 12.65 11.03 13.9 12.6 14.71L13.76 13.52C14.27 13 15.06 12.87 15.71 13.21L18.94 14.89C19.84 15.36 20.21 16.45 19.79 17.37L19.28 18.47C18.89 19.33 17.98 19.82 17.05 19.68C10.85 18.77 5.03 12.95 4.12 6.75C3.98 5.82 4.47 4.91 5.33 4.52L6.43 4.01C7.35 3.59 8.44 3.96 8.8 4.75Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    `,
  },
  mail: {
    viewBox: '0 0 24 24',
    body: `
      <rect x="4.75" y="6" width="14.5" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <path d="M5.5 7L12 12.25L18.5 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  },
  feather: {
    viewBox: '0 0 24 24',
    body: `
      <path d="M18.5 4.5C14.3 4.4 10.58 6.5 8.47 10.13C7.12 12.44 6.58 15.16 6.9 17.83L4.5 20.25" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.2 15.8L15.4 8.6M10.72 18.1C13.64 17.84 16.36 16.68 18.41 14.63C20.72 12.31 21.72 9.1 21.25 5.86C21.17 5.28 20.72 4.83 20.14 4.75C19.6 4.67 19.05 4.62 18.5 4.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  },
  gallery: {
    viewBox: '0 0 24 24',
    body: `
      <rect x="4.75" y="5.25" width="14.5" height="13.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="9" cy="10" r="1.4" fill="currentColor"/>
      <path d="M6.5 16L10.4 12.1C10.87 11.63 11.63 11.63 12.1 12.1L13.55 13.55C14.02 14.02 14.78 14.02 15.25 13.55L17.5 11.3L19 12.8V16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  },
  tree: {
    viewBox: '0 0 24 24',
    body: `
      <path d="M12 18.5V8.25M7 7V5.25M17 7V5.25M12 8.25H7M12 8.25H17" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="7" cy="4.5" r="2.25" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="17" cy="4.5" r="2.25" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <circle cx="12" cy="19" r="2.25" fill="none" stroke="currentColor" stroke-width="1.6"/>
    `,
  },
  medal: {
    viewBox: '0 0 24 24',
    body: `
      <path d="M8 4.75H16L14.35 9.1C13.93 10.22 12.86 10.96 11.66 10.96H12.34C11.14 10.96 10.07 10.22 9.65 9.1L8 4.75Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <circle cx="12" cy="15.25" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <path d="M12 12.9L12.72 14.36L14.33 14.59L13.16 15.73L13.43 17.34L12 16.58L10.57 17.34L10.84 15.73L9.67 14.59L11.28 14.36L12 12.9Z" fill="currentColor"/>
    `,
  },
  voice: {
    viewBox: '0 0 24 24',
    body: `
      <rect x="9.2" y="4.5" width="5.6" height="9.8" rx="2.8" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <path d="M6.5 10.8C6.5 13.84 8.96 16.3 12 16.3C15.04 16.3 17.5 13.84 17.5 10.8M12 16.3V19.5M9.1 19.5H14.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    `,
  },
  seal: {
    viewBox: '0 0 24 24',
    body: `
      <path d="M12 3.75L14.08 5.04L16.5 4.83L17.46 7.06L19.67 8.02L19.46 10.44L20.75 12.52L19.46 14.6L19.67 17.02L17.46 17.98L16.5 20.21L14.08 20L12 21.29L9.92 20L7.5 20.21L6.54 17.98L4.33 17.02L4.54 14.6L3.25 12.52L4.54 10.44L4.33 8.02L6.54 7.06L7.5 4.83L9.92 5.04L12 3.75Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M9.6 12.52L11.14 14.06L14.68 10.52" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  },
}

const icon = computed(() => icons[props.name] || icons.seal)
</script>

<template>
  <svg
    :viewBox="icon.viewBox"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    v-html="icon.body"
  />
</template>
