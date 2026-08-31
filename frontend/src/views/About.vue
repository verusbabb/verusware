<template>
  <div class="about-page">
    <PageHero title="About" subtitle="Senior engineer. Builder when it counts." compact />

    <section class="page-content">
      <div class="content-inner">
        <div class="about-intro">
          <ProfileImage size="lg" class="about-photo" />
          <div class="about-copy">
            <h2>{{ site.owner.name }}</h2>
            <p class="about-role">{{ site.owner.title }}</p>
            <p>
              I'm a senior full-stack engineer. Most days I work on a large enterprise platform —
              complex features, strict requirements, and integrations that have to hold up in
              production: identity providers, e-signature flows, credit-data APIs, GraphQL APIs,
              and a full RBAC layer backed by Auth0. That work keeps me busy and pushes me into
              new territory constantly.
            </p>
            <p>
              <a href="https://kansasbeta.org" target="_blank" rel="noopener noreferrer">Kansas Beta</a>
              is the independent project I've poured myself into outside of that — same standards,
              just on my own terms. It includes a SendGrid-backed email campaign system for the
              chapter; at work I've built a full internal ticketing system on our GraphQL stack —
              a different scale of messaging infrastructure. Kansas Beta is the one side build I've
              chosen to show here; not because it's the only thing I've ever done, but because it's
              fully mine to share.
            </p>
            <p>
              Verusware isn't a client roster. It's a place to document the work that lives outside
              my day job — and how I think about building it.
            </p>
          </div>
        </div>

        <section class="about-section">
          <h3>At work</h3>
          <p class="about-section-lead">
            The kind of problems I solve day to day — without turning this into a résumé.
          </p>
          <ul class="about-list">
            <li>Role-based access control with Auth0 as the identity provider</li>
            <li>GraphQL APIs and full-stack features on a large, long-lived enterprise codebase</li>
            <li>A full internal ticketing system — not just outbound email, but queues, routing, and lifecycle</li>
            <li>Third-party integrations across credit reporting, leasing workflows, and e-signature</li>
            <li>Production systems where correctness and reliability aren't optional</li>
          </ul>
        </section>

        <section class="about-section">
          <h3>What I work with</h3>
          <div class="skill-grid">
            <div v-for="group in skillGroups" :key="group.label" class="skill-group">
              <h4>{{ group.label }}</h4>
              <ul>
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="about-section about-contact">
          <h3>Get in touch</h3>
          <p>
            The best way to reach me is email or LinkedIn. I'm always happy to talk about
            building software — no sales pitch required.
          </p>
          <div class="contact-links">
            <a :href="`mailto:${site.owner.email}`" class="contact-link">
              <i class="pi pi-envelope" />
              {{ site.owner.email }}
            </a>
            <a
              :href="site.owner.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="contact-link"
            >
              <i class="pi pi-linkedin" />
              LinkedIn
            </a>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { site } from '@/content/site'
import { usePageMeta } from '@/composables/usePageMeta'
import PageHero from '@/components/PageHero.vue'
import ProfileImage from '@/components/ProfileImage.vue'

const skillGroups = [
  {
    label: 'Frontend',
    items: ['Vue 3', 'TypeScript', 'PrimeVue', 'Tailwind CSS', 'Pinia'],
  },
  {
    label: 'Backend',
    items: ['NestJS', 'Node.js', 'PostgreSQL', 'GraphQL', 'REST APIs'],
  },
  {
    label: 'Infrastructure',
    items: ['GCP Cloud Run', 'Cloud SQL', 'Docker', 'Secret Manager', 'CI/CD'],
  },
  {
    label: 'Other',
    items: ['Auth0 / RBAC', 'Third-party integrations', 'Vertex AI / RAG', 'SendGrid'],
  },
]

usePageMeta(() => ({
  title: 'About',
  description: `About ${site.owner.name} — senior full-stack engineer and builder behind Verusware.`,
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

.about-intro {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (min-width: 640px) {
  .about-intro {
    flex-direction: row;
    align-items: flex-start;
  }
}

.about-photo {
  margin: 0 auto;
}

@media (min-width: 640px) {
  .about-photo {
    margin: 0;
  }
}

.about-copy h2 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  color: var(--brand-charcoal);
}

.about-role {
  font-weight: 600;
  color: var(--brand-indigo);
  margin: 0 0 1rem;
  font-size: 0.95rem;
}

.about-copy p {
  line-height: 1.75;
  color: var(--text-muted);
  margin: 0 0 1rem;
}

.about-copy a {
  color: var(--brand-indigo);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.about-section {
  margin-bottom: 2.5rem;
}

.about-section h3 {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--brand-charcoal);
  margin: 0 0 1rem;
}

.about-section-lead {
  line-height: 1.7;
  color: var(--text-muted);
  margin: -0.5rem 0 1rem;
  font-size: 0.95rem;
}

.about-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-muted);
  line-height: 1.75;
}

.about-list li {
  margin-bottom: 0.35rem;
}

.skill-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .skill-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.skill-group {
  padding: 1.25rem;
  background: var(--surface-muted);
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
}

.skill-group h4 {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--brand-indigo);
  margin: 0 0 0.75rem;
}

.skill-group ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-group li {
  font-size: 0.95rem;
  color: var(--text-muted);
  padding: 0.2rem 0;
}

.about-contact p {
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0 0 1rem;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--brand-indigo);
  text-decoration: none;
  font-weight: 500;
}

.contact-link:hover {
  text-decoration: underline;
}
</style>
