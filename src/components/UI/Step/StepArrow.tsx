import { Box } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import stepPolygonSVG from '../../../public/images/step-polygon.svg';

export const StepArrow: FC = () => {
  return (
    <Box mt={{ base: 4, md: 5 }}>
      <Image src={stepPolygonSVG} alt='next step arrow' height='22px' width='30px' />
    </Box>
  );
};
