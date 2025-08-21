import axios from 'redaxios';
import { Box, Link, Stack } from '@chakra-ui/react';
import type { GetStaticProps } from 'next';
import Papa from 'papaparse';

import { PageSection, PageText, PageMetadata, PriorityProjectsChart } from '../../components/UI';

import { LatestGranteesList } from '../../components/forms';

import { Grant } from '../../types';

// clean up empty grants
const cleanUpGrants = (grants: Grant[]): Grant[] => {
  return grants.filter(grant => grant.Project);
};

// getStaticProps runs server-side only (on build-time)
// https://nextjs.org/docs/basic-features/data-fetching/get-static-props#write-server-side-code-directly
export const getStaticProps: GetStaticProps = async context => {
  const grants = await axios
    .get(process.env.GOOGLE_GRANTS_SHEET_API_URL!)
    .then(res => {
      return new Promise<Grant[]>((resolve, reject) => {
        Papa.parse(res.data, {
          header: true,
          complete: results => {
            const grants = results.data as Grant[];
            return resolve(cleanUpGrants(grants));
          },
          error: err => reject(err.message)
        });
      });
    })
    .catch(err => console.error(err.toJSON()));

  return {
    props: {
      grants
    }
  };
};

interface Props {
  grants: Grant[];
}

const About = ({ grants }: Props) => {
  return (
    <>
      <PageMetadata
        title='What We Support'
        description="We provide grants and other support for open source projects that strengthen Ethereum's foundations, with a particular focus on builder tools, infrastructure, research and public goods."
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
              . Learn more in our blog post and stay tuned for news on ESP&apos;s revised strategy,
              coming Q4 2025!
            </PageText>

            <PriorityProjectsChart my={12} color='brand.paragraph' />
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

          <section id='recent-grantees'>
            <PageSection mb={6} textAlign='center'>
              Recent Grantees
            </PageSection>

            <PageText mb={16}>
              This is only a small sample – we&apos;ll highlight a few at a time and rotate
              periodically, so make sure to check back once in a while for updates!
            </PageText>

            <LatestGranteesList grantsList={grants} />
          </section>
        </Stack>
      </Box>
    </>
  );
};

export default About;
