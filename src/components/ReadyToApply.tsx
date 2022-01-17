import { Box, BoxProps, Center, Flex, FlexProps, Heading, Link, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FC } from 'react';

import { ImportantText } from '../headings';

import { useShadowAnimation } from '../../../hooks';

import planeVectorSVG from '../../../public/images/plane-vector.svg';

interface Props {
  link: string;
}

const MotionBox = motion<BoxProps>(Box);
const MotionFlex = motion<FlexProps>(Flex);

export const ReadyToApply: FC<Props> = ({ link }) => {
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  return (
    <Stack
      borderRadius='20px'
      bgGradient='linear(to-b, brand.ready.bgGradient.start 10%, brand.ready.bgGradient.end 100%)'
      h='150px'
      w='100%'
      justifyContent='center'
    >
      <Stack mb={2}>
        <Heading
          as='h4'
          color='brand.ready.text'
          fontSize='h4'
          fontWeight={700}
          lineHeight='22px'
          textAlign='center'
        >
          Ready to apply?
        </Heading>
      </Stack>

      <Center>
        <Link href={link} _hover={{ textDecoration: 'none' }}>
          <Box position='relative'>
            <MotionBox
              backgroundColor='brand.button.shadow'
              h='56px'
              w='208px'
              position='absolute'
              animate={shadowBoxControl}
            />

            <MotionFlex
              backgroundColor='brand.accent'
              w='208px'
              py={4}
              justifyContent='center'
              alignItems='center'
              position='relative'
              _hover={{ bg: 'brand.hover' }}
              whileHover={{ x: -1.5, y: -1.5 }}
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
            >
              <ImportantText color='white'>Apply</ImportantText>

              <Flex position='absolute' left={36}>
                <Image src={planeVectorSVG} alt='paper plane vector' height='29px' width='32px' />
              </Flex>
            </MotionFlex>
          </Box>
        </Link>
      </Center>
    </Stack>
  );
};
