import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Layout } from '../components/layout';

import theme from '../theme';

import '../global.css';
import 'focus-visible/dist/focus-visible';
import '@fontsource/libre-franklin/200.css';
import '@fontsource/libre-franklin/300.css';
import '@fontsource/libre-franklin/400.css';
import '@fontsource/libre-franklin/700.css';

import favicon from '../public/images/favicon.ico';
import favicon16 from '../public/images/favicon-16x16.png';
import favicon32 from '../public/images/favicon-32x32.png';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel='icon' type='image/x-icon' href={favicon.src} />
        <link rel='icon' type='image/png' sizes='32x32' href={favicon32.src} />
        <link rel='icon' type='image/png' sizes='16x16' href={favicon16.src} />
      </Head>

      <ChakraProvider theme={theme}>
        <Layout
          bg={router.pathname === '/' ? 'brand.homepageHero' : undefined}
          bgGradient={
            router.pathname !== '/'
              ? 'linear(to-br, brand.layout.bgGradient.start 0%, brand.layout.bgGradient.end 81.77%, brand.layout.rgba 100%)'
              : undefined
          }
          h='600px'
        >
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
