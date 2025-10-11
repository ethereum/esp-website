import { Box, Flex, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { ImportantText } from './UI/headings';

import { useShadowAnimation } from '../hooks';

import planeVectorSVG from '../../public/images/plane-vector.svg';

const MotionBox = motion.create(Box);
const MotionFlex = motion.create(Flex);

interface Props {
  label: string;
  link: string;
  width: string;
  display?: string;
  isApplyButton?: boolean;
}

export const ButtonLink = ({ label, link, width, display, isApplyButton }: Props) => {
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  return (
    <Link href={link} _hover={{ textDecoration: 'none' }}>
      <Box position='relative'>
        <MotionBox
          bg='brand.button.shadow'
          h='56px'
          w={width}
          position='absolute'
          display={display || "block"}
          animate={shadowBoxControl}
        />

        <MotionFlex
          bg='brand.accent'
          w={width}
          py={4}
          px={6}
          justifyContent='center'
          alignItems='center'
          position='relative'
          display={display || "block"}
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
              <Image src={planeVectorSVG} alt='paper plane vector' height={29} width={32} />
            </Flex>
          )}
        </MotionFlex>
      </Box>
    </Link>
  );
};
