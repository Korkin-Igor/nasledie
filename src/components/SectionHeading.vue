<script setup>
import { computed } from 'vue'

const props = defineProps({
  kicker: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  align: {
    type: String,
    default: 'center',
  },
})

const headingClass = computed(() =>
  props.align === 'left' ? 'section-heading section-heading-left' : 'section-heading',
)
</script>

<template>
  <div :class="headingClass">
    <span class="section-kicker">{{ kicker }}</span>
    <h2>{{ title }}</h2>
  </div>
</template>

<style scoped>

</style>