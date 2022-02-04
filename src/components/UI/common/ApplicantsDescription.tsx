import { Box, Center, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import Image from 'next/image';

import { PageHeading } from '../headings';
import { PageText } from '../text';

import applicantsHero from '../../../public/images/applicants-hero.svg';

export const ApplicantsDescription: FC = () => {
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <Box mr={{ md: 40 }} w='100%'>
        <PageHeading mb={4} ml={-1}>
          For Applicants
        </PageHeading>

        <PageText mb={2}>
          Whether you&apos;re working on a specific project, or you&apos;re still exploring
          possibilities, you can connect with our team for guidance.
        </PageText>
      </Box>

      <Box mt={{ base: 8, md: -20 }} w='100%'>
        <Image
          src={applicantsHero}
          alt='Kid watching plants grow'
          objectFit='cover'
          quality={85}
          priority={true}
        />
      </Box>
    </Flex>
  );
};
