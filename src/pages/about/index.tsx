import { Box, Link, Stack } from '@chakra-ui/react';

import { PageSection, PageText, PageMetadata } from '../../components/UI';

const About = () => {
  return (
    <>
      <PageMetadata
        title='About'
        description="We provide support for open source projects that strengthen Ethereum's foundations, with a particular focus on builder tools, infrastructure, research and public goods."
      />

      <Box bg='white' position='relative' px={{ md: 20, lg: 60 }} py={{ md: 12 }}>
        <Stack mb={12} spacing={10}>
          <section id='our-scope'>
            <PageSection mb={6} textAlign='center'>
              Our scope
            </PageSection>

            <PageText mb={6}>
              ESP focuses on strengthening Ethereum&apos;s foundations and enabling future builders:
              improving infrastructure, expanding the range of tools available to those building on
              Ethereum, deepening our understanding of cryptographic primitives, and growing the
              builder ecosystem through education and community development. The work we support is
              free, open-source, non-commercial, and built for positive sum outcomes.
            </PageText>

            <PageText mb={6}>
              ESP is in the process of refining our priorities and approach, aligning with the
              Ethereum Foundation&apos;s updated{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://blog.ethereum.org/2025/07/10/future-of-ecodev'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                ecosystem development strategy
              </Link>
              . Learn more in our{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href='https://blog.ethereum.org/2025/08/29/esp-next-chapter'
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                blog post
              </Link>{' '}
              and stay tuned for news on ESP&apos;s revised strategy, coming Q4 2025!
            </PageText>
          </section>

          <section id='supporting-builders'>
            <PageSection mb={6} textAlign='center'>
              Supporting Builders
            </PageSection>

            <PageText mb={6}>
              ESP support is generally directed towards builders rather than directly impacting end
              users. We don&apos;t often support dapps or front-end platforms, although this is not
              a hard rule and there are exceptions—for example, where an application serves as a
              research or educational tool, or a reference implementation of a new standard.
            </PageText>

            <PageText mb={6}>
              We have supported individuals and teams from all over the world representing different
              backgrounds, disciplines, and levels of experience. This includes companies, DAOs,
              non-profits, institutions, academics, developers, educators, community organizers, and
              more.
            </PageText>
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default About;
