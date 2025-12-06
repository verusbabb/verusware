<template>
  <div id="app">
    <Toast />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useToastStore } from '@/stores/toast'
import { setupGlobalErrorHandling, useErrorHandler } from '@/composables/useErrorHandler'

// Setup global error handling
useErrorHandler()
setupGlobalErrorHandling()

// Initialize toast store
const toast = useToast()
const toastStore = useToastStore()

onMounted(() => {
  toastStore.init(toast)
})
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>

