<template>
  <div class="stat-row">
    <div v-for="stat in stats" :key="stat.label" class="stat-item">
      <span class="stat-value">{{ stat.value }}</span>
      <span class="stat-label">{{ stat.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectStat } from '@/content/types'

defineProps<{
  stats: ProjectStat[]
}>()
</script>

<style scoped>
.stat-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 640px) {
  .stat-row {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-item {
  padding: 1.25rem 1rem;
  text-align: center;
  background: var(--surface-muted);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
}

.stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--brand-indigo);
  line-height: 1.2;
}

.stat-label {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
</style>
