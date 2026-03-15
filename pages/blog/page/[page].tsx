import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { getAllPosts, Post } from '@/lib/api';

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
  posts: Post[];
  totalPages: number;
  currentPage: number;
}

export default function BlogPage({ posts, totalPages, currentPage }: BlogPageProps) {
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold mb-8">All Blog Posts - Page {currentPage}</h1>
      
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

      <div data-testid="pagination" className="flex items-center justify-center space-x-4 pt-8">
        <Link 
          href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`} 
          data-testid="pagination-prev"
          className="px-4 py-2 border rounded text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
        >
          Previous
        </Link>
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
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  // Generate paths for page 2 onwards (page 1 is handled by index.tsx)
  const paths = Array.from({ length: totalPages - 1 }).map((_, i) => ({
    params: { page: (i + 2).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params?.page as string) || 1;
  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return {
    props: {
      posts,
      totalPages,
      currentPage: page,
    },
  };
};
