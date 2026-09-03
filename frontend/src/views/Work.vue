<template>
  <div class="work-page">
    <PageHero
      title="Work"
      subtitle="Independent platforms under Verusware. Kansas Beta is a chapter operating system — not a brochure site."
      compact
    />

    <section class="page-content">
      <div class="content-inner">
        <div class="project-grid">
          <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
        </div>

        <p v-if="projects.length === 0" class="empty-note">
          Nothing here yet — check back soon.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { projects } from '@/content/projects'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/PageHero.vue'
import ProjectCard from '@/components/ProjectCard.vue'

usePageMeta(() => ({
  title: 'Work',
  description:
    'Kansas Beta — a production chapter platform with rush CRM, RBAC, email campaigns, and AI search. Built by Steve Babb under Verusware.',
}))
</script>

<style scoped>
.page-content {
  padding: 3rem 1.5rem 4rem;
}

.content-inner {
  max-width: 72rem;
  margin: 0 auto;
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.empty-note {
  text-align: center;
  color: var(--text-muted);
  padding: 2rem;
}
</style>
