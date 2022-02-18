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
    </Head>
  );
};
