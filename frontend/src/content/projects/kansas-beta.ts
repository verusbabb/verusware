import type { Project } from '../types'

export const kansasBeta: Project = {
  slug: 'kansas-beta',
  title: 'Kansas Beta',
  subtitle: 'Chapter operating system for Beta Theta Pi at KU',
  summary:
    'A full-stack platform for rush, members, documents, email campaigns, and a custom AI search tool called Woogle.',
  description:
    'Kansas Beta needed more than a brochure site. Alpha Nu Chapter at the University of Kansas runs on a platform that handles public marketing, member directory, document library, rush CRM, newsletter archive, and natural-language search over chapter knowledge.',
  url: 'https://kansasbeta.org',
  year: '2024–2026',
  status: 'live',
  tags: ['Full-stack', 'GCP', 'AI / RAG', 'CRM'],
  featured: true,
  accent: 'indigo',
  stack: [
    'Vue 3',
    'TypeScript',
    'NestJS',
    'PostgreSQL',
    'pgvector',
    'Auth0',
    'GCP Cloud Run',
    'Vertex AI',
    'SendGrid',
  ],
  highlights: [
    {
      title: 'Woogle',
      description:
        'Custom retrieval system combining pgvector embeddings, lexical search, and structured SQL cards — not a thin ChatGPT wrapper. Includes an eval harness and ACL-aware indexing.',
    },
    {
      title: 'Permission system',
      description:
        'Typed RBAC catalog with matching frontend and backend guards, route classification tests, and permission-scoped admin sections.',
    },
    {
      title: 'Email campaigns',
      description:
        'SendGrid-backed campaigns with audience preview and delivery tracking — a real email system for the chapter. At work I have built something larger: a full internal ticketing system on our GraphQL stack, with queues, routing, and lifecycle beyond one-way sends.',
    },
    {
      title: 'Operational tooling',
      description:
        'Rush pipeline CRM, bulk member import, folder-based document ACLs, and a deploy pipeline that runs migrations and tests before shipping.',
    },
  ],
}
