import { Heading, Link, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { PageSubheading } from '../headings';
import { PageText } from '../text';

import { ESP_EMAIL_ADDRESS } from '../../../constants';

export const ThankYouBody: FC = () => {
  return (
    <Stack mb={10}>
      <section id='description'>
        <Heading
          as='h1'
          color='brand.heading'
          fontSize='h1'
          fontWeight={100}
          lineHeight='48px'
          textAlign='center'
          mb={4}
        >
          Thank you!
        </Heading>

        <PageSubheading mb={16} textAlign='center'>
          for your submission
        </PageSubheading>

        <PageText mb={6}>The ESP team will be in touch with details about your grant.</PageText>
      </section>
    </Stack>
  );
};
