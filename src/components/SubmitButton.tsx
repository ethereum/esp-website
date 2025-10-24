import { Box, Button, Flex, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ImportantText } from './UI/headings';

import { useShadowAnimation } from '../hooks';

import planeVectorSVG from '../../public/images/plane-vector.svg';

interface Props {
  id?: string;
  isValid: boolean;
  isSubmitting: boolean;
  isNewsletter?: boolean;
  height: string;
  width: string;
  text: string;
}

const MotionBox = motion.create(Box);
const MotionButton = motion.create(Button);

export const SubmitButton = ({
  id = 'submit-application',
  isValid,
  isSubmitting,
  isNewsletter = false,
  height,
  width,
  text
}: Props) => {
  const { shadowBoxControl, setButtonHovered } = useShadowAnimation();

  return (
    <Box id={id} position='relative'>
      <MotionBox
        bg='brand.button.shadow'
        h={height}
        w={width}
        position='absolute'
        animate={shadowBoxControl}
        opacity={!isValid ? 0 : 1}
      />

      <MotionButton
        bg='brand.accent'
        w={width}
        py={7}
        borderRadius={0}
        type='submit'
        isDisabled={!isValid || isSubmitting}
        _hover={{ bg: 'brand.hover' }}
        whileHover={{ x: -1.5, y: -1.5 }}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        pointerEvents={!isValid ? 'none' : 'auto'}
      >
        <ImportantText as='h3' color='white'>
          {isSubmitting ? 'Submitting' : text}
        </ImportantText>

        <Flex pl={5}>
          {!isSubmitting && !isNewsletter && (
            <Image src={planeVectorSVG} alt='paper plane vector' height={29} width={32} />
          )}
          {isSubmitting && <Spinner color='white' />}
        </Flex>
      </MotionButton>
    </Box>
  );
};
