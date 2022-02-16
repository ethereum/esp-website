/* eslint-disable react/no-children-prop */
import { Box, Flex, Link, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { FC } from 'react';

import { PageText, StepHeading } from '../UI';
import { GrantsListTheme } from './GrantsListTheme';

import granteesTwitterLogoSVG from '../../../public/images/grantees-twitter-logo.svg';

import { Grant } from '../../types';

interface Props {
  grantsList: Grant[];
}

export const LatestGranteesList: FC<Props> = ({ grantsList }) => {
  const grantsCategories = [...Array.from(new Set(grantsList.map(grant => grant.Category)))];

  return (
    <Box>
      {grantsCategories.map(grantCategory => {
        return (
          <Box key={grantCategory} mb={8} _last={{ mb: 0 }}>
            <Flex
              justifyContent='center'
              alignItems='center'
              h='50px'
              maxW='100%'
              borderRadius='10px'
              bgGradient='linear(to-br, #F0F6FD 0%, #ECF2FE 100%)'
            >
              <StepHeading>{grantCategory}</StepHeading>
            </Flex>

            {grantsList
              .filter(({ Category }) => Category === grantCategory)
              .map(grant => (
                <Stack
                  key={grant.Project}
                  py={6}
                  borderBottom='1px solid'
                  borderColor='brand.granteesListDivider'
                  _last={{ borderBottom: 'none' }}
                >
                  <Flex justifyContent='space-between'>
                    <Box display='inline' pr={4}>
                      <ReactMarkdown
                        components={ChakraUIRenderer(GrantsListTheme)}
                        children={grant.Project}
                        skipHtml
                      />{' '}
                      {grant.Project && grant.Recipient && <PageText as='span'>by</PageText>}{' '}
                      <ReactMarkdown
                        components={ChakraUIRenderer(GrantsListTheme)}
                        children={grant.Recipient}
                        skipHtml
                      />
                    </Box>

                    {grant.Twitter && (
                      <Box flexShrink={0}>
                        <Link href={`https://twitter.com/${grant.Twitter}`} isExternal>
                          <Image
                            src={granteesTwitterLogoSVG}
                            alt='Twitter logo'
                            height={23}
                            width={30}
                          />
                        </Link>
                      </Box>
                    )}
                  </Flex>

                  <Stack>
                    <PageText>{grant.Description}</PageText>
                  </Stack>
                </Stack>
              ))}
          </Box>
        );
      })}
    </Box>
  );
};
