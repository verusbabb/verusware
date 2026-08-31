<template>
  <header class="site-header">
    <Toast />
    <Menubar :model="menuItems" class="header-menubar">
      <template #start>
        <RouterLink to="/" class="site-logo">
          Verus<span class="site-logo-accent">ware</span>
        </RouterLink>
      </template>

      <template #item="{ item, props, hasSubmenu, root }">
        <template v-if="root && item.to">
          <RouterLink :to="item.to" custom v-slot="{ href, navigate, isActive }">
            <a
              :href="href"
              :class="['nav-link', isActive && 'nav-link--active']"
              @click="navigate"
            >
              <span :class="item.icon" />
              <span class="nav-link-label">{{ item.label }}</span>
            </a>
          </RouterLink>
        </template>
        <template v-else-if="root">
          <a v-ripple class="nav-link" v-bind="props.action">
            <span :class="item.icon" />
            <span class="nav-link-label">{{ item.label }}</span>
            <i v-if="hasSubmenu" class="pi pi-angle-down nav-chevron" />
          </a>
        </template>
        <template v-else>
          <a v-ripple v-bind="props.action" class="nav-sublink">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </template>
      </template>
    </Menubar>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Menubar from 'primevue/menubar'
import Toast from 'primevue/toast'
import { navItems } from '@/nav/items'

const menuItems = computed(() => navItems)
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border-subtle);
}

.header-menubar :deep(.p-menubar) {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0;
  background: transparent;
}

.site-logo {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--brand-charcoal);
  text-decoration: none;
  margin-right: 1.5rem;
  white-space: nowrap;
}

.site-logo-accent {
  color: var(--brand-indigo);
}

.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.15s, background 0.15s;
}

.nav-link:hover {
  color: var(--brand-charcoal);
  background: var(--surface-muted);
}

.nav-link--active {
  color: var(--brand-indigo);
  background: rgba(99, 102, 241, 0.08);
}

.nav-chevron {
  font-size: 0.75rem;
  margin-left: 0.15rem;
}

@media (max-width: 1023px) {
  .header-menubar :deep(.p-menubar-mobile) {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

  .nav-link {
    padding: 0.75rem 0.5rem;
  }
}
</style>
