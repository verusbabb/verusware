<template>
  <div class="capability-grid">
    <article v-for="cap in capabilities" :key="cap.title" class="capability-card">
      <div class="capability-header">
        <span :class="['capability-icon', cap.icon]" />
        <h3>{{ cap.title }}</h3>
      </div>
      <p class="capability-summary">{{ cap.summary }}</p>
      <ul class="capability-details">
        <li v-for="detail in cap.details" :key="detail">{{ detail }}</li>
      </ul>
    </article>
  </div>
</template>

<script setup lang="ts">
import type { ProjectCapability } from '@/content/types'

defineProps<{
  capabilities: ProjectCapability[]
}>()
</script>

<style scoped>
.capability-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.capability-card {
  padding: 1.35rem 1.5rem;
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
}

.capability-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.5rem;
}

.capability-icon {
  font-size: 1.1rem;
  color: var(--brand-indigo);
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.08);
  border-radius: 0.5rem;
  flex-shrink: 0;
}

.capability-header h3 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--brand-charcoal);
}

.capability-summary {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.capability-details {
  margin: 0;
  padding-left: 1.15rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.capability-details li {
  margin-bottom: 0.3rem;
}

.capability-details li:last-child {
  margin-bottom: 0;
}
</style>
