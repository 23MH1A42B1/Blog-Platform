# 📝 Next.js Blog Platform

A high-performance, SEO-optimized blog platform built with **Next.js**, **MDX**, and **Tailwind CSS**. Features Static Site Generation (SSG), dark/light mode, pagination, sitemap/RSS generation, and Docker containerization.

---

## 🚀 Live Features

| Feature | Details |
|---|---|
| ⚡ Static Site Generation | All pages pre-rendered at build time via `getStaticProps` / `getStaticPaths` |
| 📝 MDX Content | Write rich blog posts with Markdown + embedded React components |
| 🎨 Dark/Light Mode | Seamless toggle with `next-themes`, persisted across sessions |
| 🔍 SEO Optimized | Per-page meta tags, Open Graph, Twitter cards |
| 🗺️ Sitemap & RSS | Auto-generated `sitemap.xml` and `rss.xml` at build time |
| 📄 Pagination | Blog listing page handles 10 posts per page |
| 🐳 Docker Ready | One-command deployment with Docker Compose |
| 🖼️ Image Optimization | Images inside MDX rendered via `next/image` |
| ✅ Test IDs | All key elements carry `data-testid` attributes for automated testing |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) — Pages Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: MDX via [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) + `gray-matter`
- **Theming**: [`next-themes`](https://github.com/pacocoursey/next-themes)
- **Feeds**: [`feed`](https://github.com/jpmonette/feed) for sitemap + RSS
- **Deployment**: Docker & Docker Compose

---

## 📁 Project Structure

```
c:/pdf/GPP/Blog Platform/
├── components/
│   ├── Layout.tsx          # Main layout with header, footer, and nav
│   ├── ThemeToggle.tsx     # Dark/light mode button
│   └── MDXComponents.tsx   # Custom renderers for MDX elements
├── content/
│   └── posts/              # *.mdx blog post files
│       ├── first-post.mdx
│       ├── understanding-ssr.mdx
│       ├── mastering-tailwind.mdx
│       ├── intro-to-mdx.mdx
│       └── deploying-nextjs-docker.mdx
├── lib/
│   ├── api.ts              # Reads and parses MDX files + frontmatter
│   └── generate-feeds.ts   # Generates sitemap.xml and rss.xml
├── pages/
│   ├── _app.tsx            # Global app wrapper (ThemeProvider, Head)
│   ├── 404.tsx             # Custom Not Found page
│   ├── index.tsx           # Homepage - latest posts (SSG)
│   ├── blog/
│   │   ├── index.tsx       # Blog listing with pagination (SSG)
│   │   └── page/[page].tsx # Paginated blog pages (SSG)
│   └── posts/
│       └── [slug].tsx      # Individual post page (SSG)
├── public/
│   ├── sitemap.xml         # Auto-generated at build time
│   └── rss.xml             # Auto-generated at build time
├── styles/
│   └── globals.css         # Global Tailwind CSS configuration
├── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** (or yarn)
- **Docker** (for containerized deployment)

---

### 1. Clone the Repository

```bash
git clone https://github.com/23MH1A42B1/Blog-Platform.git
cd Blog-Platform
```

---

### 2. Environment Variables

Copy the example `.env` file:

```bash
cp .env.example .env.local
```

The `.env.example` contains:

```env
PORT=3000
BASE_URL=http://localhost:3000
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Run in Development Mode

```bash
npm run dev
```

Visit → **http://localhost:3000**

Hot-reloading is enabled. Any changes to MDX files, pages, or components will immediately reflect in the browser.

---

### 5. Build for Production (Local)

```bash
npm run build
npm start
```

- `npm run build` — Pre-renders all static pages and generates `sitemap.xml` + `rss.xml` in `/public`
- `npm start` — Starts the production server

Visit → **http://localhost:3000**

---

## 🐳 Docker Deployment

### One-Command Setup

```bash
docker-compose up --build -d
```

This will:
1. Pull Node.js 18 Alpine image
2. Install all npm dependencies
3. Run `npm run build` inside the container
4. Start the production server via `npm start`
5. expose port **3000** on your machine

Visit → **http://localhost:3000**

### Stop the Container

```bash
docker-compose down
```

### Docker Healthcheck

The `docker-compose.yml` includes a healthcheck that curls the homepage every 30 seconds to ensure the server is running healthy.

---

## ✍️ Writing Blog Posts

Blog posts are stored as `.mdx` files inside the `content/posts/` directory.

### Frontmatter Format

Every `.mdx` file must start with a YAML frontmatter block:

```yaml
---
title: "Your Post Title"
date: "2026-03-15T10:00:00Z"
description: "A short summary used for cards and SEO meta tags."
---
```

### Adding Images

Use standard markdown image syntax — the platform automatically renders them with `next/image`:

```md
![Alt text for image](/images/your-image.png)
```

### Adding Code Blocks

Use fenced code blocks with a language identifier for syntax highlighting:

````md
```javascript
const greet = (name) => `Hello, ${name}!`;
console.log(greet("World"));
```
````

---

## 🌗 Dark Mode

Click the **sun/moon icon** in the top-right navigation bar to toggle between dark and light mode.

- The current theme is automatically saved to `localStorage`
- On first visit, the system's OS preference (`prefers-color-scheme`) is respected
- The `dark` class is applied directly to the `<html>` element

---

## 🔍 SEO

- Every page has a `<title>` and `<meta name="description">`
- Blog post pages include full **Open Graph** and **Twitter card** tags
- A `sitemap.xml` is auto-generated at build time and accessible at `/sitemap.xml`
- An `rss.xml` feed is available at `/rss.xml`

---

## 📋 data-testid Reference

| Element | `data-testid` value |
|---|---|
| Post list container | `post-list` |
| Individual post card | `post-card-<slug>` |
| Read more link | `read-more-<slug>` |
| Pagination container | `pagination` |
| Pagination previous | `pagination-prev` |
| Pagination next | `pagination-next` |
| Blog post article | `blog-post` |
| Post title `<h1>` | `post-title` |
| Post content container | `post-content` |
| Reading time element | `reading-time` |
| Code block `<pre>` | `code-block` |
| Optimized image | `optimized-image` |
| Theme toggle button | `theme-toggle` |
| 404 message element | `not-found-message` |

---

## 🏗️ Architectural Decisions

### Why Pages Router over App Router?

The Pages Router was chosen for its straightforward and well-documented approach to SSG using `getStaticProps` and `getStaticPaths`. This makes the static generation behavior explicit and easy to reason about for a content-driven blog.

### Why local MDX files over a CMS?

Local MDX files give maximum control and zero external dependencies for this evaluation. The data-fetching layer in `lib/api.ts` is intentionally abstracted so it can be swapped for a headless CMS (Contentful, Sanity, Strapi) in the future without changing the page components.

### Why `next-themes`?

`next-themes` handles all the edge cases of dark mode (flash of incorrect theme on load, server-side rendering compatibility, `localStorage` persistence) with zero configuration overhead.

---

## 📜 License

MIT © Nadipena Murali
