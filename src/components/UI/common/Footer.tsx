import { Box, Center, Divider, Flex, Link, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { ImportantText } from '../headings';
import { PageText } from '../text';

import efLogoSVG from '../../../../public/images/ef-logo.svg';
import githubLogoSVG from '../../../../public/images/github-logo.svg';
import twitterLogoSVG from '../../../../public/images/twitter-logo.svg';

import {
  ABOUT_URL,
  APPLICANTS_URL,
  ESP_BLOG_URL,
  ESP_TWITTER_URL,
  ETHEREUM_COOKIE_POLICY_URL,
  ETHEREUM_GITHUB_URL,
  ETHEREUM_ORG_URL,
  ETHEREUM_PRIVACY_POLICY_URL,
  ETHEREUM_TERMS_OF_USE_URL,
  HOME_URL
} from '../../../constants';

export const Footer: FC = () => {
  return (
    <Box
      id='footer'
      bgGradient='linear(to-br, brand.footer.bgGradient.start 10%, brand.footer.bgGradient.end 100%)'
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justifyContent={{ lg: 'space-around' }}
        alignItems={{ lg: 'flex-start' }}
      >
        <Center px={5} py={8}>
          <Image src={efLogoSVG} alt='Ethereum Foundation logo' height={64} width={200} />
        </Center>

        <Center px={{ base: 5, lg: 12 }} display={{ base: 'block', lg: 'none' }}>
          <Divider borderColor='brand.divider.100' opacity={1} />
        </Center>

        <Flex
          px={5}
          py={6}
          direction={{ base: 'column', lg: 'row' }}
          alignItems='center'
          mt={{ lg: 5 }}
        >
          <Stack mb={{ base: 2, lg: 0 }} mr={{ lg: 32 }}>
            <Link href={HOME_URL} _hover={{ textDecoration: 'none' }}>
              <ImportantText color='white' textAlign={{ base: 'center', lg: 'left' }}>
                Home
              </ImportantText>
            </Link>
            <Link href={APPLICANTS_URL} _hover={{ textDecoration: 'none' }}>
              <ImportantText color='white' textAlign={{ base: 'center', lg: 'left' }}>
                How to Apply
              </ImportantText>
            </Link>
            <Link href={ABOUT_URL} _hover={{ textDecoration: 'none' }}>
              <ImportantText color='white' textAlign={{ base: 'center', lg: 'left' }}>
                About ESP
              </ImportantText>
            </Link>
            <Link href={ESP_BLOG_URL} isExternal _hover={{ textDecoration: 'none' }}>
              <ImportantText color='white' textAlign={{ base: 'center', lg: 'left' }}>
                Blog
              </ImportantText>
            </Link>
          </Stack>

          <Stack>
            <Link href={ETHEREUM_PRIVACY_POLICY_URL} isExternal _hover={{ textDecoration: 'none' }}>
              <ImportantText color='white' textAlign={{ base: 'center', lg: 'left' }}>
                Privacy Policy
              </ImportantText>
            </Link>
            <Link href={ETHEREUM_TERMS_OF_USE_URL} isExternal _hover={{ textDecoration: 'none' }}>
              <ImportantText color='white' textAlign={{ base: 'center', lg: 'left' }}>
                Terms of Use
              </ImportantText>
            </Link>
            <Link href={ETHEREUM_COOKIE_POLICY_URL} isExternal _hover={{ textDecoration: 'none' }}>
              <ImportantText color='white' textAlign={{ base: 'center', lg: 'left' }}>
                Cookie Policy
              </ImportantText>
            </Link>
            <Link href={ETHEREUM_ORG_URL} isExternal _hover={{ textDecoration: 'none' }}>
              <ImportantText color='white' textAlign={{ base: 'center', lg: 'left' }}>
                Ethereum.org
              </ImportantText>
            </Link>
          </Stack>
        </Flex>

        <Flex justifyContent='center' alignItems='center' pt={3} pb={6} mt={{ lg: 7 }}>
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
      </Flex>

      <Stack>
        <Center px={{ base: 5, lg: 12 }} mt={{ lg: 10 }}>
          <Divider borderColor='brand.divider.100' opacity={1} />
        </Center>

        <Stack px={5} pt={{ base: 3, lg: 6 }} pb={{ base: 5, lg: 10 }}>
          <PageText color='white' textAlign='center'>
            {`© ${new Date().getFullYear()} Ethereum Foundation. All rights reserved.`}
          </PageText>
        </Stack>
      </Stack>
    </Box>
  );
};
