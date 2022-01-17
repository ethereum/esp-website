import { Center, Heading, Link, Stack } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { PageSubheading, PageText, PlaceholderImage } from '../../../components/UI';
import { ESP_EMAIL_ADDRESS } from '../../../constants';

const ProjectGrants: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ethereum Ecosystem Program | Thank you for applying to Project Grants</title>
        <meta name='description' content='Thank you for applying to Project Grants' />
        <meta name='robots' content='noindex' />
      </Head>

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

          <PageSubheading mb={16}>for applying to Project Grants</PageSubheading>

          <PageText mb={6}>
            You should receive a confirmation email from us within 2 business days. If you have any
            questions in the meantime, you can reach us at{' '}
            <Link
              fontWeight={700}
              color='brand.orange.100'
              href={ESP_EMAIL_ADDRESS}
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              esp@ethereum.org
            </Link>
            .
          </PageText>
        </section>
      </Stack>

      <Center>
        <PlaceholderImage height='250px' width='360px' />
      </Center>
    </>
  );
};

export default ProjectGrants;
