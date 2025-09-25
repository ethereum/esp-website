import { Flex, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';

import { PageMetadata, PageSubheading, PageText } from '../../../components/UI';
import { ESP_EMAIL_ADDRESS } from '../../../constants';

const RFPThankYou: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Thank you for your RFP application'
        description='Your RFP application has been successfully submitted to the Ethereum Foundation ESP team.'
      />

      <Flex
        bg='white'
        position='relative'
        px={{ md: 24, lg: 32, xl: 72 }}
        py={{ base: 16, md: 24 }}
        direction='column'
        minHeight='50vh'
        justifyContent='center'
      >
        <Stack textAlign='center' spacing={8}>
          <PageSubheading mb={8} textAlign='center'>
            Thank you for your RFP application!
          </PageSubheading>

          <PageText fontSize='xl' mb={8}>
            Your Request for Proposal application has been successfully submitted to our team.
          </PageText>

          <PageText mb={6}>
            We have received your proposal and supporting materials. Our team will carefully review
            your submission against the RFP requirements and evaluation criteria.
          </PageText>

          <PageText mb={6}>
            Due to the volume of applications we receive, we are unable to provide individual
            feedback on applications. However, if your proposal is selected for further
            consideration, we will contact you directly using the information provided in your
            application.
          </PageText>

          <PageText mb={6}>
            The review process typically takes several weeks to complete. We appreciate your
            patience during this time and thank you for your interest in contributing to the
            Ethereum ecosystem.
          </PageText>

          <PageText>
            For any urgent questions, please contact us at{' '}
            <PageText as='span' fontWeight='bold'>
              {ESP_EMAIL_ADDRESS}
            </PageText>
            .
          </PageText>
        </Stack>
      </Flex>
    </>
  );
};

export default RFPThankYou;
