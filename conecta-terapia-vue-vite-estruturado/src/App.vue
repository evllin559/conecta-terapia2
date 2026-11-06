<script setup>
import { useDemoStore } from './composables/useDemoStore.js'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomeView from './views/HomeView.vue'
import TherapistProfileView from './views/TherapistProfileView.vue'
import DashboardView from './views/DashboardView.vue'
const { page } = useDemoStore()
</script>
<template>
  <SiteHeader />
  <HomeView v-if="page === 'home'" />
  <TherapistProfileView v-else-if="page === 'profile'" />
  <DashboardView v-else />
  <SiteFooter />
</template>
