import { ReactNode } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="sticky top-0 z-10 w-full backdrop-blur supports-backdrop-blur:bg-white/60 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Blog Platform
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="hover:text-blue-500 transition-colors">
                Home
              </Link>
              <Link href="/blog" className="hover:text-blue-500 transition-colors">
                Blog
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-6 mt-12 bg-white dark:bg-gray-950 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Next.js Blog Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
