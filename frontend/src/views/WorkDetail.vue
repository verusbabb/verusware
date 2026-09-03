<template>
  <div v-if="project" class="case-study-page">
    <PageHero :title="project.title" :subtitle="project.subtitle" compact>
      <div class="case-study-meta">
        <span>{{ project.year }}</span>
        <span class="meta-dot">·</span>
        <span class="case-study-status">{{ statusLabel }}</span>
        <template v-if="project.url">
          <span class="meta-dot">·</span>
          <a :href="project.url" target="_blank" rel="noopener noreferrer" class="meta-link">
            Live site <i class="pi pi-external-link" />
          </a>
        </template>
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

        <section v-if="project.platform" class="case-study-section">
          <h2>{{ project.platform.headline }}</h2>
          <p
            v-for="(para, i) in project.platform.paragraphs"
            :key="i"
            class="case-study-lead"
            :class="{ 'case-study-lead--spaced': i > 0 }"
          >
            {{ para }}
          </p>
        </section>

        <section v-if="project.stats?.length" class="case-study-section">
          <StatRow :stats="project.stats" />
        </section>

        <section v-if="project.screenshotGroups?.length" class="case-study-section">
          <h2>Product in screenshots</h2>
          <p class="section-intro">
            Public pages, member tools, and admin — a chapter platform, not a static site.
            More screens coming as they are captured and redacted.
          </p>
          <ScreenshotGallery :groups="project.screenshotGroups" />
        </section>

        <section v-if="project.capabilities?.length" class="case-study-section">
          <h2>What makes it useful</h2>
          <p class="section-intro">
            The features officers and members actually rely on — connected workflows, not isolated pages.
          </p>
          <CapabilityGrid :capabilities="project.capabilities" />
        </section>

        <section v-if="project.accessControl" class="case-study-section access-section">
          <h2>{{ project.accessControl.headline }}</h2>
          <p
            v-for="(para, i) in project.accessControl.paragraphs"
            :key="i"
            class="case-study-lead"
            :class="{ 'case-study-lead--spaced': i > 0 }"
          >
            {{ para }}
          </p>
        </section>

        <section v-if="project.highlights.length" class="case-study-section">
          <h2>Engineering highlights</h2>
          <div class="highlight-grid">
            <div
              v-for="highlight in project.highlights"
              :key="highlight.title"
              class="highlight-card"
            >
              <h3>{{ highlight.title }}</h3>
              <p>{{ highlight.description }}</p>
            </div>
          </div>
        </section>

        <section v-if="project.vision" class="case-study-section vision-section">
          <h2>{{ project.vision.headline }}</h2>
          <p
            v-for="(para, i) in project.vision.paragraphs"
            :key="i"
            class="case-study-lead"
            :class="{ 'case-study-lead--spaced': i > 0 }"
          >
            {{ para }}
          </p>
        </section>

        <section class="case-study-section">
          <h2>Stack</h2>
          <div class="stack-tags">
            <Tag v-for="item in project.stack" :key="item" :value="item" severity="secondary" />
          </div>
        </section>

        <section v-if="project.contactCta" class="case-study-section contact-cta">
          <h2>{{ project.contactCta.headline }}</h2>
          <p class="case-study-lead">{{ project.contactCta.body }}</p>
          <a :href="`mailto:${site.owner.email}`" class="contact-cta-link">
            <Button label="Get in touch" icon="pi pi-envelope" />
          </a>
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
import { site } from '@/content/site'
import { getProjectBySlug } from '@/content/projects'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/PageHero.vue'
import StatRow from '@/components/StatRow.vue'
import ScreenshotGallery from '@/components/ScreenshotGallery.vue'
import CapabilityGrid from '@/components/CapabilityGrid.vue'

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
  max-width: 56rem;
  margin: 0 auto;
}

.case-study-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.meta-dot {
  opacity: 0.5;
}

.meta-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.meta-link:hover {
  text-decoration: underline;
}

.meta-link .pi {
  font-size: 0.7rem;
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
  margin-bottom: 3rem;
}

.case-study-section h2 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--brand-charcoal);
  margin: 0 0 1rem;
}

.section-intro {
  margin: -0.35rem 0 1.25rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.case-study-lead {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-muted);
  margin: 0;
}

.case-study-lead--spaced {
  margin-top: 1rem;
}

.access-section {
  padding: 1.5rem;
  background: var(--surface-muted);
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
}

.vision-section {
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.06) 0%, rgba(55, 48, 163, 0.04) 100%);
  border-radius: 0.75rem;
  border: 1px solid rgba(99, 102, 241, 0.15);
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

.contact-cta {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--surface-muted);
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
}

.contact-cta h2 {
  margin-bottom: 0.75rem;
}

.contact-cta-link {
  display: inline-block;
  margin-top: 1rem;
  text-decoration: none;
}

.not-found-actions {
  text-align: center;
  padding: 2rem 1.5rem 4rem;
}
</style>
