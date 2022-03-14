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
      <meta name='title' content={title} />
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://esp.ethereum.foundation/' />
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
      <meta
        property='og:image'
        content='https://esp.ethereum.foundation/images/homepage-hero-mobile.png'
      />
    </Head>
  );
};
