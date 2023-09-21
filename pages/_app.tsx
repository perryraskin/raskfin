import "@/styles/globals.css"
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs"

import Head from "next/head"

import Script from "next/script"
import Layout from "@/components/Layout"
import type { AppProps } from "next/app"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>raskFin</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/prismjs@1/themes/prism.css"
          rel="stylesheet"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  )
}
