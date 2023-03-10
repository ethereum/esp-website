import { AspectRatio, Box, Center, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageSection, PageText, PageMetadata, PriorityProjectsChart } from '../../components/UI';
import { ESP_WISHLIST_URL, OFFICE_HOURS_URL } from '../../constants';

const About: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='What We Support'
        description="We provide grants and other support for open source projects that strengthen Ethereum's foundations, with a particular focus on builder tools, infrastructure, research and public goods."
      />

      <Box bg='white' position='relative' px={{ md: 20, lg: 60 }} py={{ md: 12 }}>
        <Stack mb={12}>
          <section id='our-scope'>
            <PageSection mb={6} textAlign='center'>
              Our scope
            </PageSection>

            <PageText mb={6}>
              ESP focuses on strengthening Ethereum&apos;s foundations and enabling future builders:
              improving infrastructure, expanding the range of tools available to those building on
              Ethereum, deepening our understanding of cryptographic primitives, and growing the
              builder ecosystem through education and community development. The work we support is
              open source, non-commercial and built for positive sum outcomes.
            </PageText>

            <PageText mb={6}>
              ESP support is generally directed toward enabling builders rather than end-users:
              strengthening Ethereum&apos;s infrastructure, expanding the range of tools available
              to those building on Ethereum, gaining a deeper understanding of cryptographic
              primitives, and growing the builder ecosystem through education and community
              development.
            </PageText>

            <PriorityProjectsChart mb={6} color='brand.paragraph' />

            <PageText mb={6}>
              If you&apos;re looking for inspiration for your next project, check out the
              suggestions on our{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={ESP_WISHLIST_URL}
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                Wishlist
              </Link>{' '}
              for areas crucial to the Ethereum ecosystem&apos;s development. If you are unsure if
              your project is within scope, feel free to submit an{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={OFFICE_HOURS_URL}
                _hover={{ textDecoration: 'none' }}
              >
                Office Hour request
              </Link>{' '}
              with the Project Feedback fields filled out.
            </PageText>

            <PageText mb={6}>
              To learn more about ESP support and what we&apos;re looking out for, watch our talk at
              Devcon VI below:
            </PageText>

            <Center mb={6}>
              <AspectRatio flex='1' ratio={16 / 9}>
                <iframe
                  src='https://www.youtube.com/embed/EVrQy03WekI'
                  title='Ecosystem Support Program'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </AspectRatio>
            </Center>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default About;
