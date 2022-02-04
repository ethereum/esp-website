import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';

import stepPolygonSVG from '../../../public/images/step-polygon.svg';

export const StepArrow: FC = () => {
  return (
    <Flex justifyContent={{ base: 'center', md: 'flex-start' }} ml={{ md: '85px' }}>
      <Image src={stepPolygonSVG} alt='next step arrow' height='22px' width='30px' />
    </Flex>
  );
};
