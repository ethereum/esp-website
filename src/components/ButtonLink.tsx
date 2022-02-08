import { Box, BoxProps, Flex, FlexProps, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

import { ImportantText } from './UI/headings';

import { useShadowAnimation } from '../hooks';

import planeVectorSVG from '../public/images/plane-vector.svg';

const MotionBox = motion<BoxProps>(Box);
const MotionFlex = motion<FlexProps>(Flex);

interface Props {
  label: string;
  link: string;
  width: string;
  isApplyButton?: boolean;
}

export const ButtonLink: FC<Props> = ({ label, link, width, isApplyButton }) => {
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  return (
    <Link href={link} _hover={{ textDecoration: 'none' }}>
      <Box position='relative'>
        <MotionBox
          backgroundColor='brand.button.shadow'
          h='56px'
          w={width}
          position='absolute'
          animate={shadowBoxControl}
        />

        <MotionFlex
          backgroundColor='brand.accent'
          w={width}
          py={4}
          justifyContent='center'
          alignItems='center'
          position='relative'
          _hover={{ bg: 'brand.hover' }}
          whileHover={{ x: -1.5, y: -1.5 }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          <ImportantText color='white' as='h2'>
            {label}
          </ImportantText>

          {isApplyButton && (
            <Flex position='absolute' left={36}>
              <Image src={planeVectorSVG} alt='paper plane vector' height='29px' width='32px' />
            </Flex>
          )}
        </MotionFlex>
      </Box>
    </Link>
  );
};
