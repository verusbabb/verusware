<template>
  <article class="project-card">
    <RouterLink :to="`/work/${project.slug}`" class="project-card-link">
      <div :class="['project-card-preview', `project-card-preview--${project.accent}`]">
        <div class="project-card-preview-inner">
          <span class="project-card-year">{{ project.year }}</span>
          <h3 class="project-card-title">{{ project.title }}</h3>
          <p class="project-card-subtitle">{{ project.subtitle }}</p>
        </div>
      </div>

      <div class="project-card-body">
        <p class="project-card-summary">{{ project.summary }}</p>
        <div class="project-card-tags">
          <Tag
            v-for="tag in project.tags.slice(0, 4)"
            :key="tag"
            :value="tag"
            severity="secondary"
            class="project-tag"
          />
        </div>
        <span class="project-card-cta">
          Read case study
          <i class="pi pi-arrow-right" />
        </span>
      </div>
    </RouterLink>
  </article>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag'
import type { Project } from '@/content/types'

defineProps<{
  project: Project
}>()
</script>

<style scoped>
.project-card {
  height: 100%;
}

.project-card-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.project-card-link:hover {
  box-shadow: 0 12px 32px rgba(45, 55, 72, 0.1);
  transform: translateY(-2px);
}

.project-card-preview {
  padding: 1.75rem 1.5rem;
  min-height: 10rem;
  color: #ffffff;
}

.project-card-preview--indigo {
  background: linear-gradient(135deg, #4f46e5 0%, #3730a3 50%, #312e81 100%);
}

.project-card-preview--slate {
  background: linear-gradient(135deg, #475569 0%, #334155 50%, #1e293b 100%);
}

.project-card-preview--warm {
  background: linear-gradient(135deg, #78716c 0%, #57534e 50%, #44403c 100%);
}

.project-card-year {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0.8;
}

.project-card-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0 0.25rem;
}

.project-card-subtitle {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.88;
  line-height: 1.4;
}

.project-card-body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-card-summary {
  margin: 0 0 1rem;
  color: var(--text-muted);
  line-height: 1.6;
  font-size: 0.95rem;
}

.project-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.project-card-tags :deep(.project-tag) {
  font-size: 0.75rem;
}

.project-card-cta {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--brand-indigo);
}

.project-card-link:hover .project-card-cta {
  gap: 0.55rem;
}
</style>
