import { Center } from '@chakra-ui/react';
import { FC } from 'react';

import { PageHeading } from '../headings';
import { PlaceholderImage } from '../PlaceholderImage';
import { PageText } from '../text';

export const ApplicantsDescription: FC = () => {
  return (
    <>
      <PageHeading mb={4} ml={-1}>
        For Applicants
      </PageHeading>
      <PageText mb={2}>
        Whether you&apos;re working on a specific project, or you&apos;re still exploring
        possibilities, you can connect with our team for guidance.
      </PageText>
      <Center>
        <PlaceholderImage height='250px' width='360px' />
      </Center>
    </>
  );
};
