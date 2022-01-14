import { Box, Center, Divider, Flex, Link, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { ImportantText } from '../headings';
import { PageText } from '../text';

import efLogoSVG from '../../../public/images/ef-logo.svg';
import githubLogoSVG from '../../../public/images/github-logo.svg';
import twitterLogoSVG from '../../../public/images/twitter-logo.svg';

import {
  ABOUT_URL,
  APPLICANTS_URL,
  ESP_BLOG_URL,
  ESP_TWITTER_URL,
  ETHEREUM_GITHUB_URL,
  ETHEREUM_ORG_URL,
  ETHEREUM_PRIVACY_POLICY_URL,
  ETHEREUM_TERMS_OF_USE_URL
} from '../../../constants';

export const Footer: FC = () => {
  return (
    <Flex
      id='footer'
      bgGradient='linear(to-b, brand.footer.bgGradient.start 10%, brand.footer.bgGradient.end 100%)'
      d='column'
    >
      <Center px={5} py={8}>
        <Image src={efLogoSVG} alt='Ethereum Foundation logo' height={64} width={200} />
      </Center>

      <Center px={5}>
        <Divider borderColor='brand.divider' opacity={1} />
      </Center>

      <Flex px={5} py={6} justifyContent='center'>
        <Stack mr={{ base: 6, md: 32 }}>
          <Link href='/' _hover={{ textDecoration: 'none' }}>
            <ImportantText color='white' textAlign='left'>
              Home
            </ImportantText>
          </Link>
          <Link href={APPLICANTS_URL} _hover={{ textDecoration: 'none' }}>
            <ImportantText color='white' textAlign='left'>
              For Applicants
            </ImportantText>
          </Link>
          <Link href={ABOUT_URL} _hover={{ textDecoration: 'none' }}>
            <ImportantText color='white' textAlign='left'>
              About ESP
            </ImportantText>
          </Link>
          <Link href={ESP_BLOG_URL} isExternal _hover={{ textDecoration: 'none' }}>
            <ImportantText color='white' textAlign='left'>
              Blog
            </ImportantText>
          </Link>
        </Stack>

        <Stack>
          <Link href={ETHEREUM_PRIVACY_POLICY_URL} isExternal _hover={{ textDecoration: 'none' }}>
            <ImportantText color='white' textAlign='left'>
              Privacy Policy
            </ImportantText>
          </Link>
          <Link href={ETHEREUM_TERMS_OF_USE_URL} isExternal _hover={{ textDecoration: 'none' }}>
            <ImportantText color='white' textAlign='left'>
              Terms of Use
            </ImportantText>
          </Link>
          <Link href='#' _hover={{ textDecoration: 'none' }}>
            <ImportantText color='white' textAlign='left'>
              Cookie Policy
            </ImportantText>
          </Link>
          <Link href={ETHEREUM_ORG_URL} isExternal _hover={{ textDecoration: 'none' }}>
            <ImportantText color='white' textAlign='left'>
              Ethereum.org
            </ImportantText>
          </Link>
        </Stack>
      </Flex>

      <Flex justifyContent='center' alignItems='center' pt={3} pb={6}>
        <Box mr={8}>
          <Link href={ESP_TWITTER_URL} isExternal>
            <Image src={twitterLogoSVG} alt='Twitter logo' height={42} width={52} />
          </Link>
        </Box>

        <Box>
          <Link href={ETHEREUM_GITHUB_URL} isExternal>
            <Image src={githubLogoSVG} alt='GitHub logo' height={51} width={50} />
          </Link>
        </Box>
      </Flex>

      <Center px={5}>
        <Divider borderColor='brand.divider' opacity={1} />
      </Center>

      <Stack px={5} pt={3} pb={5}>
        <PageText color='white' textAlign='center'>
          {`© ${new Date().getFullYear()} Ethereum Foundation. All rights reserved.`}
        </PageText>
      </Stack>
    </Flex>
  );
};
