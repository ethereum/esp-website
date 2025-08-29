import { Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Description } from '../UI';

import aboutHero from '../../../public/images/about-hero.png';

type Props = {
  children: ReactNode;
};

export const AboutLayout = ({ children }: Props) => {
  return (
    <>
      <Stack mb={5} px={{ base: 5, md: 12 }} py={3}>
        <section id='hero'>
          <Description
            title='About ESP'
            img={{ src: aboutHero, alt: 'People reading about the ESP', width: 498, height: 296 }}
          >
            We provide support to free and open-source projects that strengthen Ethereum&apos;s
            foundations, with a particular focus on builder tools, infrastructure, research, and
            public goods.
          </Description>
        </section>
      </Stack>

      <Stack px={{ base: 5, md: 12 }}>
        <Stack mb={8}>{children}</Stack>
      </Stack>
    </>
  );
};
