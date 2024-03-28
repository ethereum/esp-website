import { Center, Flex, Stack } from '@chakra-ui/react';
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
      />

      <Flex
        direction='column'
        py={{ md: 12 }}
        px={{ sm: 5, md: 24, lg: 32, xl: 72 }}
        pb={5}
        mt={{ base: 0, md: 6 }}
        gap={8}
      >
        <Center>
          <Image src={epfHero} alt='' placeholder='blur' height={400} />
        </Center>

        <Stack>
          <section id='description'>
            <PageSubheading mb={8} textAlign='center'>
              Ethereum Protocol Fellowship Application
            </PageSubheading>
          </section>
        </Stack>
      </Flex>
    </>
  );
};

export default EPFApply;
