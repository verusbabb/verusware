<template>
  <div :class="['page-hero', compact && 'page-hero--compact']">
    <div class="page-hero-inner">
      <h1 class="page-hero-title">{{ title }}</h1>
      <p v-if="subtitle" class="page-hero-sub">{{ subtitle }}</p>
      <div class="page-hero-rule"></div>
      <div v-if="$slots.default" class="page-hero-extra">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  compact?: boolean
}>()
</script>

<style scoped>
.page-hero {
  background: linear-gradient(135deg, var(--brand-charcoal) 0%, var(--brand-indigo-dark) 55%, var(--brand-charcoal) 100%);
  color: #ffffff;
  padding: 3rem 1.5rem 2.75rem;
  position: relative;
  overflow: hidden;
}

.page-hero::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -12%;
  width: 50%;
  height: 200%;
  background: radial-gradient(ellipse at center, rgba(99, 102, 241, 0.14) 0%, transparent 65%);
  pointer-events: none;
}

.page-hero--compact {
  padding: 1.75rem 1.5rem 1.5rem;
}

.page-hero-inner {
  position: relative;
  z-index: 1;
  max-width: 72rem;
  margin: 0 auto;
  text-align: center;
}

.page-hero-title {
  font-family: var(--font-display);
  font-size: clamp(1.85rem, 4vw, 2.75rem);
  font-weight: 600;
  line-height: 1.15;
  margin: 0 0 0.75rem;
  color: #ffffff;
}

.page-hero--compact .page-hero-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: 0.4rem;
}

.page-hero-sub {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.5;
  margin: 0 auto 1.25rem;
  max-width: 40rem;
}

.page-hero--compact .page-hero-sub {
  font-size: 0.95rem;
  margin-bottom: 0.85rem;
}

.page-hero-rule {
  width: 3.5rem;
  height: 3px;
  background: var(--brand-accent-warm);
  border-radius: 9999px;
  margin: 0 auto;
}

.page-hero-extra {
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
