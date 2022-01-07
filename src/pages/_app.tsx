import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '../components/layout';

import theme from '../theme';

import '../global.css';
import '@fontsource/libre-franklin/200.css';
import '@fontsource/libre-franklin/300.css';
import '@fontsource/libre-franklin/400.css';
import '@fontsource/libre-franklin/700.css';

import favicon from '../public/images/favicon.ico';
import favicon16 from '../public/images/favicon-16x16.png';
import favicon32 from '../public/images/favicon-32x32.png';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='icon' type='image/x-icon' href={favicon.src} />
        <link rel='icon' type='image/png' sizes='32x32' href={favicon32.src} />
        <link rel='icon' type='image/png' sizes='16x16' href={favicon16.src} />
      </Head>

      <ChakraProvider theme={theme}>
        <Layout
          bgGradient='linear(to-b, brand.layout.bgGradient.start 0%, brand.layout.bgGradient.end 81.77%, brand.layout.rgba 100%)'
          h='600px'
        >
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
