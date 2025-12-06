import { defineStore } from 'pinia'
import apiClient from '@/services/api'

interface HealthStatus {
  status: string
  timestamp: string
  uptime: number
}

export const useHealthStore = defineStore('health', {
  actions: {
    async checkHealth(): Promise<HealthStatus> {
      const response = await apiClient.get<HealthStatus>('/health')
      return response.data
    }
  }
})

