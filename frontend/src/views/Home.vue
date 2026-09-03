<template>
  <div class="home-page">
    <!-- Hero -->
    <section class="home-hero">
      <div class="home-hero-content">
        <p class="home-eyebrow">{{ site.owner.title }}</p>
        <h1 class="home-title">
          Hi, I'm {{ site.owner.name.split(' ')[0] }}.
          <span class="home-title-accent">I build web products.</span>
        </h1>
        <p class="home-lead">
          {{ site.description }}
        </p>
        <div class="home-actions">
          <Button label="View my work" icon="pi pi-arrow-right" iconPos="right" @click="$router.push('/work')" />
          <Button label="About" severity="secondary" outlined @click="$router.push('/about')" />
        </div>
      </div>

      <div class="home-hero-visual">
        <div class="home-hero-image-frame">
          <ProfileImage size="hero" />
        </div>
      </div>
    </section>

    <!-- Platform preview -->
    <section class="home-section home-section--muted">
      <div class="section-inner">
        <div class="section-header">
          <h2 class="section-title">Chapter platform</h2>
          <p class="section-subtitle">
            Kansas Beta runs rush, members, documents, email, and AI search on one backbone —
            with access control throughout.
          </p>
        </div>
        <div class="platform-chips">
          <div v-for="cap in platformPreview" :key="cap.title" class="platform-chip">
            <span :class="['platform-chip-icon', cap.icon]" />
            <span class="platform-chip-label">{{ cap.title }}</span>
          </div>
        </div>
        <Button
          label="Read the full case study"
          link
          class="platform-cta"
          icon="pi pi-arrow-right"
          iconPos="right"
          @click="$router.push('/work/kansas-beta')"
        />
      </div>
    </section>

    <!-- Featured work -->
    <section class="home-section">
      <div class="section-inner">
        <div class="section-header">
          <h2 class="section-title">Selected work</h2>
          <p class="section-subtitle">
            Kansas Beta — a live chapter platform and the reference deployment for Verusware
          </p>
        </div>

        <div class="project-grid">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.slug"
            :project="project"
          />
        </div>

        <div v-if="featuredProjects.length === 0" class="empty-state">
          <p>Projects coming soon.</p>
        </div>
      </div>
    </section>

    <!-- Brief about -->
    <section class="home-section home-section--muted">
      <div class="section-inner about-snippet">
        <div>
          <h2 class="section-title">A little about me</h2>
          <p class="about-snippet-text">
            I'm a senior engineer by day. Kansas Beta is the platform I built outside of that —
            rush CRM, member tools, CMS, campaigns, and AI search with real access control.
            Same engineering standards, fully mine to share.
          </p>
          <Button
            label="Read more"
            link
            class="about-snippet-link"
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="$router.push('/about')"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { site } from '@/content/site'
import { kansasBeta } from '@/content/projects/kansas-beta'
import { getFeaturedProjects } from '@/content/projects'
import { usePageMeta } from '@/composables/usePageMeta'
import ProfileImage from '@/components/ProfileImage.vue'
import ProjectCard from '@/components/ProjectCard.vue'

const featuredProjects = getFeaturedProjects()

const platformPreview = (kansasBeta.capabilities ?? []).slice(0, 6).map((c) => ({
  title: c.title,
  icon: c.icon,
}))

usePageMeta(() => ({
  title: site.owner.name,
  description: site.description,
}))
</script>

<style scoped>
.home-page {
  flex: 1;
}

.home-hero {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 72rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

@media (min-width: 1024px) {
  .home-hero {
    flex-direction: row;
    align-items: center;
    gap: 3rem;
    padding: 4rem 1.5rem 5rem;
  }
}

.home-hero-content {
  flex: 1;
}

.home-eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--brand-indigo);
  margin: 0 0 0.75rem;
}

.home-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 600;
  line-height: 1.15;
  color: var(--brand-charcoal);
  margin: 0 0 1.25rem;
}

.home-title-accent {
  display: block;
  color: var(--brand-indigo);
}

.home-lead {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-muted);
  max-width: 36rem;
  margin: 0 0 1.75rem;
}

.home-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.home-hero-visual {
  flex: 0 0 auto;
  width: 100%;
  max-width: 22rem;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .home-hero-visual {
    flex: 0.75;
    max-width: none;
    margin: 0;
  }
}

.home-hero-image-frame {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 1rem;
  overflow: hidden;
  background: var(--surface-page);
  border: 1px solid var(--border-subtle);
}

.home-section {
  padding: 4rem 1.5rem;
}

.platform-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 1.25rem;
}

.platform-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.85rem;
  background: #ffffff;
  border: 1px solid var(--border-subtle);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--brand-charcoal);
}

.platform-chip-icon {
  font-size: 0.9rem;
  color: var(--brand-indigo);
}

.platform-cta {
  padding-left: 0;
}

.home-section--muted {
  background: var(--surface-muted);
}

.section-inner {
  max-width: 72rem;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 2rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 600;
  color: var(--brand-charcoal);
  margin: 0 0 0.5rem;
}

.section-subtitle {
  margin: 0;
  color: var(--text-muted);
  font-size: 1rem;
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

@media (min-width: 1024px) and (max-width: 1199px) {
  .project-grid {
    grid-template-columns: 1fr;
  }
}

.about-snippet {
  max-width: 40rem;
}

.about-snippet-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-muted);
  max-width: 36rem;
  margin: 0 0 1rem;
}

.about-snippet-link {
  padding-left: 0;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-muted);
}
</style>
