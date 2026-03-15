import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts, Post } from '@/lib/api';

const POSTS_PER_PAGE = 10;

interface BlogIndexProps {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

export default function BlogIndex({ posts, totalPages, currentPage }: BlogIndexProps) {
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold mb-8">All Blog Posts</h1>
      
      <div data-testid="post-list" className="space-y-8">
        {posts.map((post) => (
          <article 
            key={post.meta.slug} 
            data-testid={`post-card-${post.meta.slug}`}
            className="group block p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <time className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 block">
              {new Date(post.meta.date).toLocaleDateString()}
            </time>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <Link href={`/posts/${post.meta.slug}`}>
                {post.meta.title}
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {post.meta.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">{post.meta.readingTime}</span>
              <Link 
                href={`/posts/${post.meta.slug}`} 
                data-testid={`read-more-${post.meta.slug}`}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Read More &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div data-testid="pagination" className="flex items-center justify-center space-x-4 pt-8">
          <span data-testid="pagination-prev" className="px-4 py-2 border rounded text-gray-400 bg-gray-50 dark:bg-gray-800 cursor-not-allowed">
            Previous
          </span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link 
              href={`/blog/page/${currentPage + 1}`} 
              data-testid="pagination-next"
              className="px-4 py-2 border rounded text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            >
              Next
            </Link>
          ) : (
             <span data-testid="pagination-next" className="px-4 py-2 border rounded text-gray-400 bg-gray-50 dark:bg-gray-800 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice(0, POSTS_PER_PAGE);

  return {
    props: {
      posts,
      totalPages,
      currentPage: 1,
    },
  };
};
