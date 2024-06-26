import axios from 'redaxios';
import { Box, Link, Stack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next';
import Papa from 'papaparse';

import { LatestGranteesList } from '../../components/forms';
import { PageSection, PageText, PageMetadata } from '../../components/UI';

import { ESP_BLOG_URL } from '../../constants';

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

const WhoWeSupport: NextPage<Props> = ({ grants }) => {
  return (
    <>
      <PageMetadata
        title='Who We Support'
        description='We support builders from many different backgrounds, all over the world. See a list of our latest grantees!'
      />

      <Box bg='white' position='relative' px={{ md: 20, lg: 60 }} py={{ md: 12 }}>
        <Stack spacing={10}>
          <section id='supporting-builders'>
            <PageSection mb={6} textAlign='center'>
              Supporting Builders
            </PageSection>

            <PageText mb={6}>
              ESP funding is generally directed toward supporting builders rather than directly
              impacting end users. We don&apos;t often fund dapps or front-end platforms, although
              this is not a hard rule and there are exceptions - for example, where an application
              serves as a research or educational tool, or a reference implementation of a new
              standard.
            </PageText>

            <PageText mb={6}>
              Our grantees come from all over the world and represent many different backgrounds,
              disciplines and levels of experience. We have supported individuals and teams of all
              kinds - companies, DAOs, nonprofits, institutions, academics, developers, educators,
              community organizers and more.
            </PageText>

            <PageText>
              Our{' '}
              <Link
                fontWeight={700}
                color='brand.orange.100'
                href={ESP_BLOG_URL}
                _hover={{ textDecoration: 'none' }}
              >
                blog
              </Link>{' '}
              also features monthly roundups which showcase grantees&apos; progress after their
              grants are awarded and go into more detail about their background and work.
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

export default WhoWeSupport;
