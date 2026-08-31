import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Material from '@primevue/themes/material'
import { definePreset } from '@primevue/themes'
import Ripple from 'primevue/ripple'
import ToastService from 'primevue/toastservice'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

import './assets/main.css'

/**
 * Verusware theme — indigo primary on Material base.
 * Distinct from Kansas Beta's steel-blue palette.
 */
const VeruswarePreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
      950: '#1e1b4b',
    },
    colorScheme: {
      light: {
        formField: {
          placeholderColor: '{surface.400}',
        },
      },
    },
  },
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: VeruswarePreset,
    options: {
      darkModeSelector: 'false',
    },
  },
})
app.use(ToastService)
app.directive('ripple', Ripple)

app.mount('#app')
