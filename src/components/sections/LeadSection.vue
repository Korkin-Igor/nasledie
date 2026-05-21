<script setup>
import { ref } from 'vue'

defineProps({
  content: {
    type: Object,
    required: true,
  },
})

const submitted = ref(false)
</script>

<template>
  <section :id="content.id" class="section section-cta">
    <div class="cta-layout">
      <article class="cta-card cta-card-copy" v-reveal="{ name: 'slide-left' }">
        <span class="section-kicker">{{ content.kicker }}</span>
        <h2>{{ content.title.replaceAll(content.dangerTitle, "")}} <br />
          <span class="danger-title">{{content.dangerTitle}}</span>
        </h2>
        <p>{{ content.text }}</p>

        <div v-if="content.pills.length" class="cta-pills">
          <span v-for="pill in content.pills" :key="pill">{{ pill }}</span>
        </div>
      </article>

      <article class="cta-card cta-card-form" v-reveal="{ name: 'slide-right', delay: 140 }">
        <form class="lead-form" @submit.prevent="submitted = true">
          <label v-for="field in content.form.fields" :key="field.label">
            <span>{{ field.label }}</span>
            <textarea
              v-if="field.type === 'textarea'"
              :rows="field.rows"
              :placeholder="field.placeholder"
            ></textarea>
            <input v-else :type="field.type" :placeholder="field.placeholder" />
          </label>

          <button type="submit" class="button button-primary button-full">
            {{ content.form.submitLabel }}
          </button>

          <p v-if="content.form.caption" class="form-caption">{{ content.form.caption }}</p>
          <p v-if="submitted" class="form-success">{{ content.form.success }}</p>
        </form>
      </article>
    </div>
  </section>
</template>

<style>
.section-cta {
  position: relative;
  isolation: isolate;
}

.section-cta::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 4px;
  left: 50%;
  width: 100vw;
  transform: translateX(-50%);
  border-radius: 58px 58px 0 0;
  background:
    radial-gradient(circle at 16% 20%, rgba(216, 177, 110, 0.18), transparent 24%),
    radial-gradient(circle at 84% 24%, rgba(17, 42, 69, 0.14), transparent 26%),
    linear-gradient(180deg, rgba(244, 234, 218, 0.94), rgba(230, 221, 205, 0.9));
  z-index: -1;
}

.danger-title {
  color: var(--gold)
}
</style>
