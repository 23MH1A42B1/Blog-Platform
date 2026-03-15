import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p data-testid="not-found-message" className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Oops! The page you're looking for was not found or has been moved.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
        Return to Home
      </Link>
    </div>
  );
}
