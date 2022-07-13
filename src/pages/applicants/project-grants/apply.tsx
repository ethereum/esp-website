import { Box, Link } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { PROJECT_GRANTS_URL } from "../../../constants"

import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';

const ProjectGrantsApply: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Project Grants Application'
        description='Submit an application for a Project Grant from the Ecosystem Support Program.'
      />

      <Box bg='white' position='relative' py={{ md: 12 }} px={{ md: 24, lg: 32, xl: 72 }}>
        <section id='description'>
          <PageSubheading mb={8} textAlign='center'>
            Apply to Project grants
          </PageSubheading>

          <PageText>
            This webform collects information about you and your project. Please use the spaces
            below to answer the following questions thoughtfully and thoroughly. The information
            you provide now is what we&apos;ll use to determine whether to award a grant. If you have
            any questions, please visit the{' '}
            <Link
              fontWeight={700}
              color='brand.orange.100'
              href={`${PROJECT_GRANTS_URL}/#faq`}
            >
              Project Grants FAQ
            </Link>{' '}
            page.
          </PageText>
        </section>
      </Box>
    </>
  );
};

export default ProjectGrantsApply;
