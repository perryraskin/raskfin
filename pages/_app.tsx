import "@/styles/globals.css"
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs"

import Head from "next/head"

import Script from "next/script"
import Layout from "@/components/Layout"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>raskFin</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bd57b" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#f1f5f9" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism.css"
          rel="stylesheet"
        />
      </Head>
      <ClerkProvider {...pageProps}>
        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ClerkProvider>
    </>
  )
}
