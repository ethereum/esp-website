import { Heading, Link, Stack } from '@chakra-ui/react';
import { FC } from 'react';

import { PageSubheading } from '../headings';
import { PageText } from '../text';

import { ESP_EMAIL_ADDRESS } from '../../../constants';

interface Props {
  grantType: string;
}

export const ThankYouBody: FC<Props> = ({ grantType }) => {
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
          for applying to {grantType}
        </PageSubheading>

        <PageText mb={6}>
          You should receive a confirmation email from us within 2 business days. If you have any
          questions in the meantime, you can reach us at{' '}
          <Link
            fontWeight={700}
            color='brand.orange.100'
            href={`mailto:${ESP_EMAIL_ADDRESS}`}
            isExternal
            _hover={{ textDecoration: 'none' }}
          >
            {ESP_EMAIL_ADDRESS}
          </Link>
          .
        </PageText>
      </section>
    </Stack>
  );
};
