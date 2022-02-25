import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { init } from '@socialgouv/matomo-next';

import { Layout } from '../components/layout';

import { getBg, getBgGradient, getLayoutHeight } from '../utils';

import theme from '../theme';

import '../global.css';
import 'focus-visible/dist/focus-visible';
import '@fontsource/libre-franklin/200.css';
import '@fontsource/libre-franklin/300.css';
import '@fontsource/libre-franklin/400.css';
import '@fontsource/libre-franklin/700.css';

import favicon from '../../public/images/favicon.ico';
import favicon16 from '../../public/images/favicon-16x16.png';
import favicon32 from '../../public/images/favicon-32x32.png';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    init({
      url: process.env.NEXT_PUBLIC_MATOMO_URL!,
      siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID!
    });
  }, []);

  return (
    <>
      <Head>
        <link rel='icon' type='image/x-icon' href={favicon.src} />
        <link rel='icon' type='image/png' sizes='32x32' href={favicon32.src} />
        <link rel='icon' type='image/png' sizes='16x16' href={favicon16.src} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <ChakraProvider theme={theme}>
        <Layout
          bg={getBg(router.pathname)}
          bgGradient={getBgGradient(router.pathname)}
          h={{ base: '600px', lg: getLayoutHeight(router.pathname) }}
        >
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
