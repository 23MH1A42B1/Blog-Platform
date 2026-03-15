import fs from 'fs';
import path from 'path';
import { Feed } from 'feed';
import { getAllPosts } from './api';

export const generateFeeds = async () => {
  const posts = getAllPosts();
  const siteURL = process.env.BASE_URL || 'http://localhost:3000';
  const date = new Date();

  // 1. Generate Sitemap XML
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteURL}</loc>
    <lastmod>${date.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteURL}/blog</loc>
    <lastmod>${date.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${posts
    .map((post) => {
      return `
  <url>
    <loc>${siteURL}/posts/${post.meta.slug}</loc>
    <lastmod>${new Date(post.meta.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(sitemapPath, sitemapXML);

  // 2. Generate RSS Feed
  const feed = new Feed({
    title: 'Next.js Blog Platform',
    description: 'A high-performance statically generated blog using MDX.',
    id: siteURL,
    link: siteURL,
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    image: `${siteURL}/logo.png`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss.xml`,
    },
    author: {
      name: 'Author Name',
      email: 'author@example.com',
      link: siteURL,
    },
  });

  posts.forEach((post) => {
    const postUrl = `${siteURL}/posts/${post.meta.slug}`;
    feed.addItem({
      title: post.meta.title,
      id: postUrl,
      link: postUrl,
      description: post.meta.description,
      content: post.meta.description,
      author: [
        {
          name: 'Author Name',
          email: 'author@example.com',
          link: siteURL,
        },
      ],
      date: new Date(post.meta.date),
    });
  });

  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), feed.rss2());
};
