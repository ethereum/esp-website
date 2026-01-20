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
        description='Explore the projects and teams that have received support from the Ethereum Foundation through the Ecosystem Support Program.'
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
                Explore grants awarded by the Ethereum Foundation Ecosystem Support Program.
                These projects span research, development, community building, and more across
                the Ethereum ecosystem.
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
  const grants = await getPublicGrants();

  return {
    props: {
      grants
    },
    revalidate: 3600
  };
};

export default Grants;
