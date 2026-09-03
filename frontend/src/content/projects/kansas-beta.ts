import type { Project } from '../types'

export const kansasBeta: Project = {
  slug: 'kansas-beta',
  title: 'Kansas Beta',
  subtitle: 'Chapter platform for Beta Theta Pi at the University of Kansas',
  summary:
    'A production chapter operating system — rush CRM, member tools, CMS, email campaigns, and AI search. Not a brochure site.',
  description:
    'Alpha Nu Chapter at the University of Kansas runs on a platform built to operate the chapter: public marketing, authenticated member tools, rush operations, document access control, and natural-language search over chapter knowledge. Kansas Beta is the first full deployment. The architecture is built so other chapters could run on the same backbone with their own branded frontend.',
  url: 'https://kansasbeta.org',
  year: '2024–2026',
  status: 'live',
  tags: ['Chapter platform', 'Rush CRM', 'RBAC', 'AI / RAG'],
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
  stats: [
    { value: '29', label: 'Database entities' },
    { value: '54', label: 'Migrations' },
    { value: '42', label: 'Automated tests' },
    { value: 'Live', label: 'In production' },
  ],
  platform: {
    headline: 'More than a website',
    paragraphs: [
      'Most chapter sites are static marketing pages with a PDF or two. Kansas Beta is an operating system: applicants flow into a CRM, members search chapter knowledge in plain language, officers manage content without touching code, and every resource has an access policy.',
      'The public site is only the front door. The value is in what happens after login — and in the automation that runs whether anyone is logged in or not.',
    ],
  },
  capabilities: [
    {
      icon: 'pi pi-file-edit',
      title: 'Rush application',
      summary: 'Public apply form that kicks off real workflows the moment someone submits.',
      details: [
        'Applicants receive an immediate acknowledgement email from @kansasbeta.org',
        'The rush pipeline is notified instantly that a new candidate arrived',
        'No manual handoff — submission, email, and CRM record happen in one flow',
      ],
    },
    {
      icon: 'pi pi-sitemap',
      title: 'Rush CRM',
      summary: 'Pipeline view for officers to track, assign, and work prospects through rush.',
      details: [
        'Kanban-style pipeline with stages, assignments, and activity history',
        'Drill into any candidate for full detail, notes, and analysis in one place',
        'Shareable prospect links for officers who need context without hunting through email',
      ],
    },
    {
      icon: 'pi pi-pencil',
      title: 'Admin content management',
      summary: 'Authorized users edit much of the public site without a developer.',
      details: [
        'Hero images, rush widgets, calendar events, exec team, and history galleries',
        'Newsletter archive with cover uploads',
        'Changes go live through the same deploy pipeline — no separate CMS host',
      ],
    },
    {
      icon: 'pi pi-shield',
      title: 'Roles & access control',
      summary: 'User types define what you can see on the site and what data you can touch.',
      details: [
        'Typed permission catalog mirrored on frontend and backend',
        'Folder-based document ACLs — resources inherit access from tags and roles',
        'Route guards and build-time tests so new endpoints cannot ship unclassified',
        'Public, member, officer, and admin surfaces each see only what they should',
      ],
    },
    {
      icon: 'pi pi-upload',
      title: 'Bulk member import',
      summary: 'Onboard a roster without entering people one at a time.',
      details: [
        'CSV import with column normalization and validation',
        'Family relationship linking for legacy and parent lookups',
        'Designed for the messy real-world data chapters actually have',
      ],
    },
    {
      icon: 'pi pi-envelope',
      title: 'Email campaigns',
      summary: 'SendGrid-backed campaigns with audience preview and delivery tracking.',
      details: [
        'Audience builder before anything sends',
        'Webhook integration for opens, clicks, and delivery events',
        'Officers see how a campaign performed — not just that it went out',
        'At my day job I have built a full internal ticketing system on GraphQL; Kansas Beta\'s email layer is campaign-focused but equally production-minded',
      ],
    },
    {
      icon: 'pi pi-search',
      title: 'Woogle',
      summary: 'Natural-language search over chapter knowledge — members, newsletters, documents, rush data.',
      details: [
        'Hybrid retrieval: pgvector embeddings, lexical search, and structured SQL cards',
        'ACL-aware indexing — search results respect the same permissions as the rest of the app',
        'Eval harness and relevance fixtures — built to improve, not demo',
      ],
    },
  ],
  screenshotGroups: [
    {
      title: 'Public site',
      description: 'Marketing and rush pages visitors see before they log in.',
      shots: [
        {
          src: '/work/kansas-beta/home.png',
          alt: 'Kansas Beta homepage with hero and chapter branding',
          caption: 'Homepage with CMS-managed hero imagery',
        },
        {
          src: '/work/kansas-beta/rush.png',
          alt: 'Rush page with chapter recruitment content',
          caption: 'Rush marketing — content editable in admin',
        },
      ],
    },
    {
      title: 'Rush operations',
      description: 'From application to pipeline to candidate detail.',
      shots: [
        {
          placeholder: true,
          alt: 'Rush application form',
          caption: 'Public rush application',
        },
        {
          placeholder: true,
          alt: 'Rush pipeline board',
          caption: 'Pipeline board with stage tracking',
        },
        {
          placeholder: true,
          alt: 'Candidate detail view',
          caption: 'Candidate detail and activity history',
        },
      ],
    },
    {
      title: 'Member tools',
      description: 'What logged-in members and officers use day to day.',
      shots: [
        {
          src: '/work/kansas-beta/members.png',
          alt: 'Member directory search',
          caption: 'Searchable member and alumni directory',
        },
        {
          placeholder: true,
          alt: 'Woogle natural language search',
          caption: 'Woogle — ask questions in plain language',
        },
        {
          placeholder: true,
          alt: 'Document library with folder access',
          caption: 'Resources with folder-based access control',
        },
      ],
    },
    {
      title: 'Admin & campaigns',
      description: 'Back-office tools for officers who run the chapter.',
      shots: [
        {
          placeholder: true,
          alt: 'Admin content management',
          caption: 'Admin panel — site content and configuration',
        },
        {
          placeholder: true,
          alt: 'User roles and permissions',
          caption: 'User management and role assignment',
        },
        {
          placeholder: true,
          alt: 'Email campaign analytics',
          caption: 'Email campaigns with delivery and engagement data',
        },
      ],
    },
  ],
  accessControl: {
    headline: 'Access control as infrastructure',
    paragraphs: [
      'Documents, search results, admin sections, and API routes all enforce the same permission model. A member sees their directory entry; an officer sees rush pipeline data; a prospect\'s parent sees only what policy allows.',
      'This is the backbone that makes the platform trustworthy — not a feature list item. New capabilities get classified before they ship.',
    ],
  },
  vision: {
    headline: 'Built for one chapter. Designed for more.',
    paragraphs: [
      'Kansas Beta is the reference deployment — custom branding, chapter-specific content, and real users in production. The platform underneath is chapter-agnostic: rush workflows, member directory, document ACLs, email, and search are core modules, not one-off code.',
      'Other fraternities and sororities could run on the same backbone with their own public frontend and identity. That is the direction; Kansas Beta proves it works.',
    ],
  },
  contactCta: {
    headline: 'Exploring this for your chapter?',
    body: 'I am not running a sales funnel — but if you are an officer or advisor wondering whether something like this could work for your organization, I am happy to talk.',
  },
  highlights: [
    {
      title: 'End-to-end rush',
      description:
        'Application → acknowledgement email → pipeline notification → CRM → candidate detail. One connected flow, not a form that dumps into someone\'s inbox.',
    },
    {
      title: 'Officer self-service',
      description:
        'Authorized users update site content, manage rosters, run campaigns, and configure rush — without opening a ticket with a developer.',
    },
    {
      title: 'Production discipline',
      description:
        'Migrations before deploy, tests in the Docker build, secrets in GCP Secret Manager, and RBAC parity between frontend and API.',
    },
  ],
}
