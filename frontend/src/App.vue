<template>
  <SiteLayout>
    <RouterView />
  </SiteLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { RouterView } from 'vue-router'
import SiteLayout from './components/SiteLayout.vue'
import { useToastStore } from '@/stores/toast'

const toast = useToast()
const toastStore = useToastStore()

onMounted(() => {
  toastStore.init(toast)
})
</script>
