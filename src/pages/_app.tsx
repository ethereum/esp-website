import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import { Layout } from '../components/UI';

import theme from '../theme';

import '../global.css';
import '@fontsource/libre-franklin/200.css';
import '@fontsource/libre-franklin/300.css';
import '@fontsource/libre-franklin/400.css';
import '@fontsource/libre-franklin/700.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout
        bgGradient='linear(to-b, brand.layout.bgGradient.start 0%, brand.layout.bgGradient.end 81.77%, brand.layout.rgba 100%)'
        h='600px'
      >
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
