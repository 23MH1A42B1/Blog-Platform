import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import MDXComponents from '@/components/MDXComponents';
import { getPostBySlug, getPostSlugs } from '@/lib/api';

interface PostPageProps {
  post: {
    meta: {
      slug: string;
      title: string;
      date: string;
      description: string;
      readingTime: string;
    };
    source: MDXRemoteSerializeResult;
  };
}

export default function PostPage({ post }: PostPageProps) {
  const siteURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const postUrl = `${siteURL}/posts/${post.meta.slug}`;

  return (
    <>
      <Head>
        {generateNextSeo({
          title: post.meta.title,
          description: post.meta.description,
          canonical: postUrl,
          openGraph: {
            url: postUrl,
            title: post.meta.title,
            description: post.meta.description,
            type: 'article',
            article: {
              publishedTime: post.meta.date,
              authors: ['Author Name'],
            },
          },
          twitter: {
            cardType: 'summary_large_image',
          },
        })}
      </Head>
      <article data-testid="blog-post" className="max-w-3xl mx-auto py-8">
        <header className="mb-10 text-center">
          <h1 data-testid="post-title" className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {post.meta.title}
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-500 dark:text-gray-400 font-medium">
            <time dateTime={post.meta.date}>
              {new Date(post.meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>&bull;</span>
            <span data-testid="reading-time">{post.meta.readingTime}</span>
          </div>
        </header>

        <div data-testid="post-content" className="prose prose-lg dark:prose-invert prose-blue max-w-none">
          <MDXRemote {...post.source} components={MDXComponents} />
        </div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getPostSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug: slug.replace(/\.mdx$/, '') },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string);
  const mdxSource = await serialize(post.content);

  return {
    props: {
      post: {
        meta: post.meta,
        source: mdxSource,
      },
    },
  };
};
