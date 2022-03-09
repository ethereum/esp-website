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
      <meta name='description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://esp.ethereum.foundation/' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:creator' content='@EF_ESP' />
      <meta name='twitter:site' content='@EF_ESP' />
      <meta name='twitter:title' content='EF Ecosystem Support Program' />
      <meta name='twitter:description' content={description} />
      {/* TODO get absolute URL image */}
      <meta name='twitter:image' content='GET_IMAGE_URL' />
      <meta property='og:image' content='GET_IMAGE_URL' />
    </Head>
  );
};
