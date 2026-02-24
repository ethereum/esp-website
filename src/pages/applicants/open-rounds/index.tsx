import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import type { GetStaticProps, NextPage } from 'next';

import {
  ApplicantsSidebar,
  PageSection,
  PageSubheading,
  PageText,
  PageMetadata
} from '../../../components/UI';

import { ButtonLink } from '../../../components';
import { SIDEBAR_OPEN_ROUNDS_LINKS, ROUNDS_URL } from '../../../constants';
import { getActiveRounds } from '../../../lib/rounds';
import { RoundFrontmatter } from '../../../types';

interface OpenRoundsProps {
  activeRounds: RoundFrontmatter[];
}

const RoundCard = ({ round }: { round: RoundFrontmatter }) => {
  const { slug, name, description, endDate } = round;
  const roundUrl = `${ROUNDS_URL}/${slug}`;

  // Format the end date
  const formattedEndDate = new Date(endDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Stack
      borderRadius='10px'
      bgGradient='linear(to-br, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
      w='100%'
      justifyContent='center'
    >
      <Flex
        alignItems='center'
        justifyContent='space-between'
        direction={{ base: 'column', md: 'row' }}
        px={{ base: 6, lg: 12 }}
        py={10}
      >
        <Stack mb={{ base: 6, md: 0 }} mr={{ base: 0, md: 12 }} flex={1}>
          <Text
            as='h3'
            fontSize='xl'
            fontWeight='bold'
            color='brand.heading'
            textAlign={{ base: 'center', md: 'left' }}
            mb={2}
          >
            {name}
          </Text>

          <PageText mb={2}>{description}</PageText>

          <Text fontSize='sm' color='gray.600'>
            Applications close: {formattedEndDate}
          </Text>
        </Stack>

        <Stack>
          <ButtonLink label='View &amp; Apply' link={roundUrl} width='200px' />
        </Stack>
      </Flex>
    </Stack>
  );
};

const OpenRounds: NextPage<OpenRoundsProps> = ({ activeRounds }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0, initialInView: false });

  return (
    <>
      <PageMetadata
        title='Open Rounds'
        description='Browse active grant rounds and special funding opportunities from the Ethereum Ecosystem Support Program.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }}>
        <Flex>
          <ApplicantsSidebar
            sidebarLinks={SIDEBAR_OPEN_ROUNDS_LINKS}
            sectionsInView={[inView, inView2]}
          />

          <Box w={{ lg: '70%' }} px={{ md: 20 }} pr={{ lg: 12 }}>
            <Stack mb={8}>
              <section id='description' ref={ref}>
                <PageSubheading mb={8}>Open Rounds</PageSubheading>

                <PageText>
                  Grant rounds are time-limited funding opportunities focused on specific themes or
                  areas of interest. Each round has its own application deadline and selection
                  criteria. Browse active rounds below to find opportunities that match your
                  expertise.
                </PageText>
              </section>
            </Stack>

            <Stack spacing={10}>
              <section id='active-rounds' ref={ref2}>
                <PageSection mb={6}>Active Rounds</PageSection>

                {activeRounds.length > 0 ? (
                  <Stack spacing={6}>
                    {activeRounds.map(round => (
                      <RoundCard key={round.slug} round={round} />
                    ))}
                  </Stack>
                ) : (
                  <PageText color='gray.600'>
                    There are no active grant rounds at this time. Please check back later or
                    explore our Wishlist and RFP opportunities.
                  </PageText>
                )}
              </section>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps<OpenRoundsProps> = async () => {
  const activeRounds = getActiveRounds();

  return {
    props: {
      activeRounds
    },
    revalidate: 3600 // Revalidate every hour (3600 seconds)
  };
};

export default OpenRounds;
