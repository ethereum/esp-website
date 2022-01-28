import { Box, Flex, Link, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import { PageText, StepHeading } from '../UI';

import granteesTwitterLogoSVG from '../../public/images/grantees-twitter-logo.svg';

import { GRANTEES_LIST } from './constants';

// interface Props {
//   label: string;
//   link: string;
//   width: string;
//   isApplyButton?: boolean;
// }

export const LatestGranteesList: FC = () => {
  return (
    <Box>
      {GRANTEES_LIST.map(category => {
        // console.log(category[Object.keys(category)[0]]);

        // console.log(GRANTEES_LIST[0]['Community & education'][0].recipient);

        return (
          <Box key={Object.keys(category)[0]}>
            <Flex
              justifyContent='center'
              alignItems='center'
              h='50px'
              maxW='100%'
              borderRadius='10px'
              bgGradient='linear(to-br, #F0F6FD 0%, #ECF2FE 100%)'
            >
              <StepHeading>{Object.keys(category)}</StepHeading>
            </Flex>

            <Stack
              py={6}
              borderBottom='1px solid'
              borderColor='brand.granteesListDivider'
              _last={{ borderBottom: 'none' }}
            >
              <Flex justifyContent='space-between'>
                {}

                <PageText>
                  <strong>
                    <Link textDecoration='underline'>Ethereum Cat Herders</Link>
                  </strong>
                </PageText>

                <Box>
                  <Link href={''} isExternal>
                    <Image src={granteesTwitterLogoSVG} alt='Twitter logo' height={23} width={30} />
                  </Link>
                </Box>
              </Flex>

              <Stack>
                <PageText>
                  Community group supporting Ethereum core developers with project management,
                  communication and coordination.
                </PageText>
              </Stack>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
};
