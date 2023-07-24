import { ToastContainer } from "react-toastify";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssVarsProvider } from "@mui/joy/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { GoogleAnalytics } from "nextjs-google-analytics";
import NextNProgress from "nextjs-progressbar";

import LoggedOutModal from "@/components/LoggedOutModal";
import PromotionalBanner from "@/components/PromotionalBanner";
import Layout from "@/layouts/DefaultLayout";
import DepositModal from "@/modules/deposit/views/DepositModal";
import WithdrawModal from "@/modules/withdraw/views/WithdrawModal";
import createEmotionCache from "@/styles/createEmotionCache";
import theme from "@/styles/theme";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

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
        <title>Blaze do Guilherme</title>
      </Head>
      <NextNProgress color="#f12c4c" />
      <GoogleAnalytics trackPageViews />
      <CssVarsProvider theme={theme}>
        <UserProvider>
          <PromotionalBanner />

          <Layout>
            <Component {...pageProps} />
          </Layout>

          <WithdrawModal />
          <DepositModal />
          <LoggedOutModal />

          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </UserProvider>
      </CssVarsProvider>
    </CacheProvider>
  );
}
