<script setup>
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import AudienceSection from './components/sections/AudienceSection.vue'
import ComparisonSection from './components/sections/ComparisonSection.vue'
import FeaturesSection from './components/sections/FeaturesSection.vue'
import HeroSection from './components/sections/HeroSection.vue'
import LaunchSection from './components/sections/LaunchSection.vue'
import LeadSection from './components/sections/LeadSection.vue'
import ProcessSection from './components/sections/ProcessSection.vue'
import ReasonsSection from './components/sections/ReasonsSection.vue'
import StorySection from './components/sections/StorySection.vue'
import TestimonialsSection from './components/sections/TestimonialsSection.vue'
import ValueSection from './components/sections/ValueSection.vue'
import { siteData } from './data'
</script>

<template>
  <div class="page-shell">
    <div class="ambient ambient-left"></div>
    <div class="ambient ambient-right"></div>
    <div class="ambient ambient-bottom"></div>

    <AppHeader :brand="siteData.brand" :navigation="siteData.navigation" />

    <main>
      <HeroSection :content="siteData.hero" :dates="siteData.dates" />
      <StorySection :content="siteData.story" />
      <FeaturesSection :content="siteData.features" />
      <ValueSection :content="siteData.value" />
      <LaunchSection :content="siteData.launch" :dates="siteData.dates" />
      <ReasonsSection :content="siteData.reasons" />
      <AudienceSection :content="siteData.audience" />
      <ComparisonSection :content="siteData.comparison" />
      <ProcessSection :content="siteData.process" />
      <TestimonialsSection :content="siteData.testimonials" />
      <LeadSection :content="siteData.lead" />
    </main>

    <AppFooter
      :brand="siteData.brand"
      :navigation="siteData.navigation"
      :contacts="siteData.contacts"
      :content="siteData.footer"
    />
  </div>
</template>
