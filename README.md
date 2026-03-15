# Next.js Blog Platform

A high-performance, statically generated blog platform built with Next.js, MDX, and Tailwind CSS. It features excellent SEO generation, automatic sitemap and RSS feeds, and dark mode support.

## Features

- **Static Site Generation (SSG)**: Fast load times and optimal SEO with pre-rendered HTML.
- **MDX Support**: Write content in Markdown and embed React components. Syntax highlighting provided out of the box.
- **SEO Optimized**: Utilizes `next-seo` to automatically manage meta tags, Open Graph, and Twitter Cards.
- **Sitemap & RSS**: Automatically generates `sitemap.xml` and `rss.xml` during the build process.
- **Dark Mode**: Toggleable dark theme integrated seamlessly using `next-themes` and Tailwind CSS.
- **Pagination**: Built-in Blog listing page supporting multiple pages limit.
- **Dockerized**: Fully containerized environment for consistent deployment.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (Pages Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: [MDX](https://mdxjs.com/) via `next-mdx-remote`
- **SEO**: `next-seo`
- **Deployment**: Docker & Docker Compose

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd blog-platform
   ```

2. **Environment Variables:**
   Copy the example `.env` file and populate it if needed:
   ```bash
   cp .env.example .env.local
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Setup

The project can be run inside a Docker container using `docker-compose`.

1. Ensure the Docker daemon is running!
2. Spin up the application using:
   ```bash
   docker-compose up --build -d
   ```
3. The frontend service will be accessible on `http://localhost:3000` assuming the health check passes successfully.

## Architecture & File Structure

This project uses the Next.js **Pages Router** intentionally instead of the App Router to explicitly follow straightforward implementation paradigms of SSG with `getStaticProps` and `getStaticPaths` on MDX parsing routines.

```text
├── components/          # Reusable React components (Layout, ThemeToggle, etc.)
│   ├── MDXComponents/   # Custom UI components injected into Markdown rendering
├── content/             # Local Markdown data storage
│   └── posts/           # Your .mdx files containing frontmatter and body
├── lib/                 # Utility files and data fetching operations
│   ├── api.ts           # Interfaces with the content directory using `gray-matter`
│   └── generate-feeds.ts# Generates sitemap and RSS files based on post data
├── pages/               # Next.js routing and Page definitions
│   ├── blog/            # Paginated listing implementation
│   ├── posts/           # Dynamic routes for SSG MDX blog posts
│   └── _app.tsx         # Custom Next.js structural initialization and Theme injection
├── public/              # Static assets (images, fonts, auto-generated xml files)
└── styles/              # Global Tailwind configuration (`globals.css`)
```

### Content Management

Blog posts are stored as `.mdx` files in `content/posts/`. Each file requires a specific YAML frontmatter structure:

```yaml
---
title: "Article Title"
date: "2026-03-15T08:00:00Z"
description: "A short excerpt used for card bodies and SEO."
---
```

When building, Next.js calls data-fetching APIs inside `getStaticProps` on Next Router pages, generating HTML representations directly.
