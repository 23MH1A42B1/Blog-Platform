import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { generateDefaultSeo } from "next-seo/pages";
import Layout from "@/components/Layout";

const DEFAULT_SEO = {
  title: "Next.js Blog Platform",
  description: "A high-performance blog platform built with Next.js, MDX, and Tailwind CSS.",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://example.com/",
    siteName: "Next.js Blog Platform",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        {generateDefaultSeo(DEFAULT_SEO)}
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
