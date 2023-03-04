import { Box, ChakraProps } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import stepPolygonSVG from '../../../../public/images/step-polygon.svg';

interface Props extends ChakraProps {}

export const StepArrow: FC<Props> = props => {
  return (
    <Box mt={{ base: 4, md: 5 }} {...props}>
      <Image src={stepPolygonSVG} alt='next step arrow' height='22px' width='30px' />
    </Box>
  );
};
