import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

interface ToastState {
  toast: ReturnType<typeof useToast> | null
}

export const useToastStore = defineStore('toast', {
  state: (): ToastState => ({
    toast: null,
  }),

  actions: {
    /**
     * Initialize toast instance
     * Call this in App.vue or main.ts after PrimeVue is mounted
     */
    init(toastInstance: ReturnType<typeof useToast>) {
      this.toast = toastInstance
    },

    /**
     * Show success message
     */
    showSuccess(message: string, summary = 'Success') {
      this.toast?.add({
        severity: 'success',
        summary,
        detail: message,
        life: 3000,
      })
    },

    /**
     * Show error message
     */
    showError(message: string, summary = 'Error') {
      this.toast?.add({
        severity: 'error',
        summary,
        detail: message,
        life: 5000,
      })
    },

    /**
     * Show info message
     */
    showInfo(message: string, summary = 'Info') {
      this.toast?.add({
        severity: 'info',
        summary,
        detail: message,
        life: 3000,
      })
    },

    /**
     * Show warning message
     */
    showWarning(message: string, summary = 'Warning') {
      this.toast?.add({
        severity: 'warn',
        summary,
        detail: message,
        life: 4000,
      })
    },
  },
})

