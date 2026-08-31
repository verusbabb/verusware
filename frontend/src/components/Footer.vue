<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="site-footer-brand">
        <RouterLink to="/" class="site-footer-logo">
          Verus<span class="text-brand-indigo">ware</span>
        </RouterLink>
        <p class="site-footer-tagline">{{ site.tagline }}</p>
      </div>

      <div class="site-footer-links">
        <a :href="`mailto:${site.owner.email}`" class="site-footer-link">
          <i class="pi pi-envelope" />
          {{ site.owner.email }}
        </a>
        <a
          :href="site.owner.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="site-footer-link"
        >
          <i class="pi pi-linkedin" />
          LinkedIn
        </a>
      </div>
    </div>

    <div class="site-footer-bottom">
      <p>&copy; {{ year }} {{ site.name }}. Built by {{ site.owner.name }}.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { site } from '@/content/site'

const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  background: var(--brand-charcoal);
  color: rgba(255, 255, 255, 0.85);
  margin-top: auto;
}

.site-footer-inner {
  max-width: 72rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .site-footer-inner {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.site-footer-logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
}

.site-footer-logo:hover {
  opacity: 0.9;
}

.text-brand-indigo {
  color: var(--brand-indigo-light);
}

.site-footer-tagline {
  margin: 0.35rem 0 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.site-footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.site-footer-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s;
}

.site-footer-link:hover {
  color: #ffffff;
}

.site-footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 1.5rem;
  text-align: center;
}

.site-footer-bottom p {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}
</style>
