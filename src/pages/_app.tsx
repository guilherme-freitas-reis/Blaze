import "@/styles/globals.css";
import { CssVarsProvider } from "@mui/joy/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/styles/createEmotionCache";
import theme from "@/styles/theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssVarsProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </CssVarsProvider>
    </CacheProvider>
  );
}
