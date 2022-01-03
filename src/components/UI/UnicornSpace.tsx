import { Box, Flex, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { FC } from 'react';
import unicornSVG from '../../public/images/unicorn.svg';

export const UnicornSpace: FC = () => {
  return (
    <Stack>
      <Flex h={72} justifyContent='center' alignItems='flex-end'>
        <Box>
          <Image src={unicornSVG} alt='unicorn emoji' height='60px' width='49px' />
        </Box>
      </Flex>
    </Stack>
  );
};
