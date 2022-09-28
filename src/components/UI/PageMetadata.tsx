import { FC } from 'react';
import Head from 'next/head';

import { HEAD_TITLE, HOMEPAGE_HERO_MOBILE_URL } from '../../constants';

interface Props {
  title: string;
  description: string;
  image?: string;
}

export const PageMetadata: FC<Props> = ({
  title,
  description,
  image = HOMEPAGE_HERO_MOBILE_URL
}) => {
  const fullTitle = `${title} | ${HEAD_TITLE}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name='title' content={fullTitle} />
      <meta name='description' content={description} />
      <meta name='application-name' content='Ethereum Foundation ESP' />
      <meta name='image' content={image} />
      {/* OpenGraph */}
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Ethereum Foundation ESP'></meta>
      <meta property='og:url' content='https://esp.ethereum.foundation/' />
      <meta property='og:image' content={image} />
      <meta property='og:image:url' content={image} />
      <meta property='og:image:secure_url' content={image} />
      <meta property='og:image:alt' content='EF Ecosystem Support Program' />
      <meta property='og:image:type' content='image/png' />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content='https://esp.ethereum.foundation/' />
      <meta name='twitter:creator' content='@EF_ESP' />
      <meta name='twitter:site' content='@EF_ESP' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
    </Head>
  );
};
