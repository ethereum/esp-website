import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';

import { PageMetadata } from '../../components/UI';
import { GrantsExplorer } from '../../components/grants';
import { getPublicGrants } from '../../lib/sf/grants';
import { GrantRecord } from '../../types/grants';

interface GrantsPageProps {
  grants: GrantRecord[];
}

const Grants: NextPage<GrantsPageProps> = ({ grants }) => {
  return (
    <>
      <PageMetadata
        title='Funded Projects'
        description='Explore projects supported by the Ethereum Foundation Ecosystem Support Program — spanning research, tooling, infrastructure, and community across the Ethereum ecosystem.'
      />

      <Box
        bg='white'
        position='relative'
        py={{ base: 8, md: 12 }}
        minH='100vh'
      >
        <Container maxW='container.xl' px={{ base: 4, md: 8 }}>
          <Stack spacing={8}>
            <Box>
              <Heading
                as='h1'
                size='xl'
                color='brand.heading'
                mb={4}
              >
                Funded Projects
              </Heading>
              <Text color='brand.paragraph' maxW='3xl'>
                The Ecosystem Support Program funds teams and individuals building the next
                generation of Ethereum infrastructure, research, developer tooling, and community
                resources. Browse the projects we&apos;ve supported below.
              </Text>
            </Box>

            <GrantsExplorer grants={grants} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<GrantsPageProps> = async () => {
  // Let errors propagate — ISR serves the previously cached page on
  // revalidation failure, which is better than showing an empty page.
  const grants = await getPublicGrants();

  return {
    props: { grants },
    revalidate: 3600
  };
};

export default Grants;
