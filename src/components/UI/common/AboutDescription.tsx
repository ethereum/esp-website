import { Center } from '@chakra-ui/react';
import { FC } from 'react';

import { PageHeading } from '../headings';
import { PlaceholderImage } from '../PlaceholderImage';
import { PageText } from '../text';

export const AboutDescription: FC = () => {
  return (
    <>
      <PageHeading mb={4} ml={-1}>
        About ESP
      </PageHeading>
      <PageText mb={2}>
        We provide grants and other support for open source projects that strengthen Ethereum&apos;s
        foundations, with a particular focus on builder tools, infrastructure, research and public
        goods.
      </PageText>
      <Center>
        <PlaceholderImage height='250px' width='360px' />
      </Center>
    </>
  );
};
