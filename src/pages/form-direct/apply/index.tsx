import { NextPage } from 'next';
import { Box, VStack } from '@chakra-ui/react';

import { DirectGrantForm } from '../../../components/forms/DirectGrantForm';
import {
  PageMetadata,
  PageSubheading,
  PageText,
  PrivacyPolicyAgreement
} from '../../../components/UI';

const DirectGrantPage: NextPage = () => {
  return (
    <>
      <PageMetadata
        title='Direct Grant Application - ESP'
        description='Apply for a direct grant from the Ethereum Foundation Ecosystem Support Program'
        noindex
      />

      <Box maxW='container.xl' mx='auto' px={6} py={8}>
        <VStack spacing={8} align='stretch'>
          <Box textAlign='center'>
            <PageSubheading mb={8} textAlign='center'>
              Direct Grant Application
            </PageSubheading>
            <PageText mb={6}>
              Submit your application for a direct grant from the Ethereum Foundation Ecosystem
              Support Program.
            </PageText>

            <PrivacyPolicyAgreement />
          </Box>

          <DirectGrantForm />
        </VStack>
      </Box>
    </>
  );
};

export default DirectGrantPage;
