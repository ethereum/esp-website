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

import { ABOUT_URL, APPLICANTS_URL, HOME_URL } from '../constants';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const bgGradient =
    router.pathname === APPLICANTS_URL
      ? 'linear(to-b, brand.applicants.bgGradient.start 0%, brand.applicants.bgGradient.end 81.77%, brand.applicants.rgba 100%)'
      : router.pathname === ABOUT_URL
      ? 'linear(to-b, brand.about.bgGradient.start 0%, brand.about.bgGradient.end 77.6%, brand.about.rgba 100%)'
      : undefined;

  return (
    <>
      <Head>
        <link rel='icon' type='image/x-icon' href={favicon.src} />
        <link rel='icon' type='image/png' sizes='32x32' href={favicon32.src} />
        <link rel='icon' type='image/png' sizes='16x16' href={favicon16.src} />
      </Head>

      <ChakraProvider theme={theme}>
        <Layout
          bg={router.pathname === HOME_URL ? 'brand.homepageHero' : undefined}
          bgGradient={bgGradient}
          h={{ base: '600px', lg: router.pathname === HOME_URL ? '877px' : '550px' }}
        >
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
