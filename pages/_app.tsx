import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import Layout from "../components/Layout";
import { createEmotionCache } from "../lib/emotion";
import theme from "../lib/theme";
import { CosAppProps } from "../lib/types";
import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: CosAppProps) {
  const emotionCache = clientSideEmotionCache;

  return (
    <Layout>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Cosmos</title>
          <meta name="description" content="Curated search engine for developers." />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Layout>
  );
}

export default MyApp;
