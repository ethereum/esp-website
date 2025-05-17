import { Box, Center, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { PageMetadata, PageSubheading } from '../../components/UI';
import { EPF_APPLICATION_PREVIEW_URL } from '../../constants';

import epfHero from '../../../public/images/epf-hero.jpg';

const EPFApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Ethereum Protocol Fellowship Application'
        description='' // TODO: Add description
        image={EPF_APPLICATION_PREVIEW_URL}
        noindex={true}
      />

      <Flex direction='column' px={{ sm: 5, md: 24, lg: 32, xl: 72 }} pb={5} gap={8}>
        <Image
          src={epfHero}
          alt=''
          placeholder='blur'
          fill
          sizes='100vw'
          style={{ objectFit: 'cover', zIndex: -1 }}
        />

        <Center>
          <Box as='section' id='description' px={{ base: 10, md: 9 }} pb={{ base: 3, md: 12 }}>
            <PageSubheading mb={8} textAlign='center'>
              Ethereum Protocol Fellowship Application
            </PageSubheading>
          </Box>
        </Center>
      </Flex>
    </>
  );
};

export default EPFApply;
