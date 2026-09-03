<template>
  <div class="screenshot-gallery">
    <div v-for="group in groups" :key="group.title" class="screenshot-group">
      <h3 class="screenshot-group-title">{{ group.title }}</h3>
      <p v-if="group.description" class="screenshot-group-desc">{{ group.description }}</p>
      <div class="screenshot-grid">
        <figure v-for="(shot, i) in group.shots" :key="`${group.title}-${i}`" class="screenshot-figure">
          <div class="screenshot-frame">
            <img
              v-if="!shot.placeholder && shot.src && !failed[shotKey(group.title, i)]"
              :src="shot.src"
              :alt="shot.alt"
              class="screenshot-img"
              loading="lazy"
              @error="markFailed(shotKey(group.title, i))"
            />
            <div v-else class="screenshot-placeholder">
              <i class="pi pi-image placeholder-icon" />
              <span class="placeholder-label">Screenshot coming soon</span>
            </div>
          </div>
          <figcaption class="screenshot-caption">{{ shot.caption }}</figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { ProjectScreenshotGroup } from '@/content/types'

defineProps<{
  groups: ProjectScreenshotGroup[]
}>()

const failed = reactive<Record<string, boolean>>({})

function shotKey(group: string, index: number) {
  return `${group}-${index}`
}

function markFailed(key: string) {
  failed[key] = true
}
</script>

<style scoped>
.screenshot-group {
  margin-bottom: 2.5rem;
}

.screenshot-group-title {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--brand-charcoal);
  margin: 0 0 0.35rem;
}

.screenshot-group-desc {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.screenshot-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .screenshot-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .screenshot-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.screenshot-figure {
  margin: 0;
}

.screenshot-frame {
  aspect-ratio: 16 / 10;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid var(--border-subtle);
  background: var(--surface-muted);
}

.screenshot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.screenshot-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--surface-muted) 0%, #eeedeb 100%);
  color: var(--text-muted);
}

.placeholder-icon {
  font-size: 1.75rem;
  opacity: 0.45;
}

.placeholder-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  opacity: 0.7;
}

.screenshot-caption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.4;
}
</style>
