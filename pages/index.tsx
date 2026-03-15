import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts, Post } from '@/lib/api';
import { generateFeeds } from '@/lib/generate-feeds';

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  // Show only top 3 recent posts on homepage
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
          Next.js Markdown Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A high-performance statically generated blog using MDX, fully optimized for speed and SEO.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Recent Posts</h2>
          <Link href="/blog" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
            View all posts &rarr;
          </Link>
        </div>
        
        <div data-testid="post-list" className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <article 
              key={post.meta.slug} 
              data-testid={`post-card-${post.meta.slug}`}
              className="group flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 flex flex-col flex-grow">
                <time className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                  {new Date(post.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link href={`/posts/${post.meta.slug}`}>
                    {post.meta.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow line-clamp-3">
                  {post.meta.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {post.meta.readingTime}
                  </span>
                  <Link 
                    href={`/posts/${post.meta.slug}`} 
                    data-testid={`read-more-${post.meta.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();

  // Generate Sitemap and RSS logic during build step
  if (process.env.NODE_ENV !== 'development') {
    await generateFeeds();
  }

  return {
    props: {
      posts,
    },
  };
};
