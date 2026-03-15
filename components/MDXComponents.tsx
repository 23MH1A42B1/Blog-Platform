import Image, { ImageProps } from 'next/image';

const MDXComponents = {
  img: (props: any) => (
    <div className="relative w-full h-64 my-4">
      <Image
        {...props}
        fill
        className="object-cover rounded-lg"
        alt={props.alt || 'Blog post image'}
        data-testid="optimized-image"
      />
    </div>
  ),
  pre: (props: any) => (
    <pre {...props} data-testid="code-block" className="p-4 rounded-lg bg-gray-900 text-gray-100 overflow-x-auto my-4" />
  ),
  code: (props: any) => (
    <code {...props} className="bg-gray-800 rounded px-1 py-0.5 text-sm font-mono text-pink-400" />
  ),
  h1: (props: any) => <h1 {...props} className="text-4xl font-bold mt-8 mb-4" />,
  h2: (props: any) => <h2 {...props} className="text-3xl font-bold mt-8 mb-4 border-b pb-2 border-gray-200 dark:border-gray-700" />,
  h3: (props: any) => <h3 {...props} className="text-2xl font-bold mt-6 mb-3" />,
  p: (props: any) => <p {...props} className="my-4 leading-relaxed text-gray-800 dark:text-gray-200" />,
  ul: (props: any) => <ul {...props} className="list-disc list-inside my-4 pl-4 space-y-2 text-gray-800 dark:text-gray-200" />,
  ol: (props: any) => <ol {...props} className="list-decimal list-inside my-4 pl-4 space-y-2 text-gray-800 dark:text-gray-200" />,
  a: (props: any) => <a {...props} className="text-blue-600 dark:text-blue-400 hover:underline" />,
  blockquote: (props: any) => (
    <blockquote {...props} className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 my-4 italic bg-gray-50 dark:bg-gray-800 rounded-r" />
  ),
};

export default MDXComponents;
