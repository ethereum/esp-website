import { FC } from 'react';
import Head from 'next/head';

import { HEAD_TITLE } from '../../constants';

interface Props {
  title: string;
  description: string;
}

export const PageMetadata: FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>
        {title} | {HEAD_TITLE}
      </title>
      <meta name='title' content={`${title} | ${HEAD_TITLE}`} />
      <meta name='description' content={description} />
      <meta name='application-name' content='Ethereum Foundation ESP' />
      <meta
        name='image'
        content='https://esp.ethereum.foundation/images/homepage-hero-mobile.png'
      />
      {/* OpenGraph */}
      <meta property='og:title' content={`${title} | ${HEAD_TITLE}`} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Ethereum Foundation ESP'></meta>
      <meta property='og:url' content='https://esp.ethereum.foundation/' />
      <meta
        property='og:image'
        content='https://esp.ethereum.foundation/images/homepage-hero-mobile.png'
      />
      <meta
        property='og:image:url'
        content='https://esp.ethereum.foundation/images/homepage-hero-mobile.png'
      />
      <meta
        property='og:image:secure_url'
        content='https://esp.ethereum.foundation/images/homepage-hero-mobile.png'
      />
      <meta property='og:image:alt' content='EF Ecosystem Support Program' />
      <meta property='og:image:type' content='image/png' />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://esp.ethereum.foundation/' />
      <meta name='twitter:creator' content='@EF_ESP' />
      <meta name='twitter:site' content='@EF_ESP' />
      <meta name='twitter:title' content='EF Ecosystem Support Program' />
      <meta name='twitter:description' content={description} />
      <meta
        name='twitter:image'
        content='https://esp.ethereum.foundation/images/homepage-hero-mobile.png'
      />
    </Head>
  );
};
