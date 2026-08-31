<template>
  <div v-if="project" class="case-study-page">
    <PageHero :title="project.title" :subtitle="project.subtitle" compact>
      <div class="case-study-meta">
        <span>{{ project.year }}</span>
        <span class="meta-dot">·</span>
        <span class="case-study-status">{{ statusLabel }}</span>
      </div>
    </PageHero>

    <article class="page-content">
      <div class="content-inner">
        <div class="case-study-actions">
          <a
            v-if="project.url"
            :href="project.url"
            target="_blank"
            rel="noopener noreferrer"
            class="external-link"
          >
            <Button
              :label="`Visit ${project.title}`"
              icon="pi pi-external-link"
              iconPos="right"
            />
          </a>
          <Button
            label="All work"
            severity="secondary"
            outlined
            icon="pi pi-arrow-left"
            @click="$router.push('/work')"
          />
        </div>

        <section class="case-study-section">
          <h2>Overview</h2>
          <p class="case-study-lead">{{ project.description }}</p>
        </section>

        <section class="case-study-section">
          <h2>Highlights</h2>
          <div class="highlight-grid">
            <div v-for="highlight in project.highlights" :key="highlight.title" class="highlight-card">
              <h3>{{ highlight.title }}</h3>
              <p>{{ highlight.description }}</p>
            </div>
          </div>
        </section>

        <section class="case-study-section">
          <h2>Stack</h2>
          <div class="stack-tags">
            <Tag v-for="item in project.stack" :key="item" :value="item" severity="secondary" />
          </div>
        </section>
      </div>
    </article>
  </div>

  <div v-else class="not-found">
    <PageHero title="Not found" subtitle="This project doesn't exist." compact />
    <div class="not-found-actions">
      <Button label="Back to work" icon="pi pi-arrow-left" @click="$router.push('/work')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import { getProjectBySlug } from '@/content/projects'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/PageHero.vue'

const route = useRoute()
const project = computed(() => getProjectBySlug(route.params.slug as string))

const statusLabel = computed(() => {
  if (!project.value) return ''
  const labels = { live: 'Live', 'in-progress': 'In progress', archived: 'Archived' }
  return labels[project.value.status]
})

usePageMeta(() => ({
  title: project.value ? project.value.title : 'Not found',
  description: project.value?.summary,
}))
</script>

<style scoped>
.page-content {
  padding: 2.5rem 1.5rem 4rem;
}

.content-inner {
  max-width: 48rem;
  margin: 0 auto;
}

.case-study-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.meta-dot {
  opacity: 0.5;
}

.case-study-status {
  text-transform: capitalize;
}

.case-study-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.external-link {
  text-decoration: none;
}

.case-study-section {
  margin-bottom: 2.5rem;
}

.case-study-section h2 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--brand-charcoal);
  margin: 0 0 1rem;
}

.case-study-lead {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-muted);
  margin: 0;
}

.highlight-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.highlight-card {
  padding: 1.25rem 1.5rem;
  background: var(--surface-muted);
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
}

.highlight-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--brand-charcoal);
  margin: 0 0 0.5rem;
}

.highlight-card p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-muted);
}

.stack-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.not-found-actions {
  text-align: center;
  padding: 2rem 1.5rem 4rem;
}
</style>
