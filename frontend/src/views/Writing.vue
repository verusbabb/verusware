<template>
  <div class="writing-page">
    <PageHero
      title="Writing"
      subtitle="Technical notes and build logs — when I have something worth sharing."
      compact
    />

    <section class="page-content">
      <div class="content-inner">
        <div v-if="posts.length > 0" class="post-list">
          <article v-for="post in posts" :key="post.slug" class="post-card">
            <time :datetime="post.publishedAt" class="post-date">
              {{ formatDate(post.publishedAt) }}
            </time>
            <h2 class="post-title">
              <RouterLink :to="`/writing/${post.slug}`">{{ post.title }}</RouterLink>
            </h2>
            <p class="post-summary">{{ post.summary }}</p>
            <div class="post-tags">
              <Tag v-for="tag in post.tags" :key="tag" :value="tag" severity="secondary" />
            </div>
          </article>
        </div>

        <div v-else class="empty-state">
          <i class="pi pi-pen-to-square empty-icon" />
          <h2>Nothing published yet</h2>
          <p>
            This is where technical write-ups and build notes will live — things like how Woogle
            works, lessons from shipping Kansas Beta, or infrastructure patterns I find useful.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Tag from 'primevue/tag'
import { posts } from '@/content/posts'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/PageHero.vue'

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

usePageMeta(() => ({
  title: 'Writing',
  description: 'Technical writing and build notes by Steve Babb.',
}))
</script>

<style scoped>
.page-content {
  padding: 3rem 1.5rem 4rem;
}

.content-inner {
  max-width: 48rem;
  margin: 0 auto;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-card {
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-subtle);
}

.post-date {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--brand-indigo);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.post-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  margin: 0.5rem 0;
}

.post-title a {
  color: var(--brand-charcoal);
  text-decoration: none;
}

.post-title a:hover {
  color: var(--brand-indigo);
}

.post-summary {
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0 0 0.75rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.empty-state {
  text-align: center;
  padding: 2rem 1rem 3rem;
  color: var(--text-muted);
}

.empty-icon {
  font-size: 2rem;
  color: var(--brand-indigo);
  opacity: 0.6;
  margin-bottom: 1rem;
}

.empty-state h2 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--brand-charcoal);
  margin: 0 0 0.75rem;
}

.empty-state p {
  max-width: 28rem;
  margin: 0 auto;
  line-height: 1.65;
}
</style>
