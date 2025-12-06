<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <Card class="shadow-lg">
        <template #title>
          <div class="flex items-center gap-2">
            <i class="pi pi-check-circle text-green-500 text-2xl"></i>
            <span>Welcome to Verusware</span>
          </div>
        </template>
        <template #content>
          <div class="space-y-4">
            <p class="text-white">
              Your Vue 3 + NestJS application is running successfully!
            </p>
            
            <div class="flex gap-2">
              <Button 
                label="Check Health" 
                icon="pi pi-heart"
                @click="checkHealth"
                :loading="loading"
              />
              <Button 
                label="Reset" 
                icon="pi pi-refresh"
                severity="secondary"
                @click="resetHealth"
              />
            </div>

            <div v-if="healthStatus" class="mt-4">
              <Message severity="success" :closable="false">
                <div class="space-y-2">
                  <p><strong>Status:</strong> {{ healthStatus.status }}</p>
                  <p><strong>Timestamp:</strong> {{ healthStatus.timestamp }}</p>
                  <p><strong>Uptime:</strong> {{ formatUptime(healthStatus.uptime) }}</p>
                </div>
              </Message>
            </div>

            <div v-if="error" class="mt-4">
              <Message severity="error" :closable="false">
                <p>{{ error }}</p>
              </Message>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useHealthStore } from '@/stores/health'
import { useToastStore } from '@/stores/toast'

const healthStore = useHealthStore()
const toastStore = useToastStore()
const loading = ref(false)
const healthStatus = ref<any>(null)
const error = ref<string | null>(null)

const checkHealth = async () => {
  loading.value = true
  error.value = null
  healthStatus.value = null
  
  try {
    const response = await healthStore.checkHealth()
    healthStatus.value = response
    toastStore.showSuccess('Health check successful!')
  } catch (err: any) {
    error.value = err.message || 'Failed to check health status'
    // Toast is already shown by the API interceptor, but we keep local error state for UI
  } finally {
    loading.value = false
  }
}

const resetHealth = () => {
  healthStatus.value = null
  error.value = null
}

const formatUptime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return `${hours}h ${minutes}m ${secs}s`
}
</script>

