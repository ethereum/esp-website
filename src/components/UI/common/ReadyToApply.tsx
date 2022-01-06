import { Center, Flex, Heading, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { ImportantText } from '../headings';

import planeVectorSVG from '../../../public/images/plane-vector.svg';

interface Props {
  link: string;
}

export const ReadyToApply: FC<Props> = ({ link }) => {
  const router = useRouter();

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
        <Flex
          as='button'
          _hover={{ bg: 'brand.hover' }}
          backgroundColor='brand.accent'
          w='208px'
          py={4}
          justifyContent='center'
          alignItems='center'
          position='relative'
          onClick={() => router.push(link)}
        >
          <ImportantText color='white'>Apply</ImportantText>

          <Flex position='absolute' left={36}>
            <Image src={planeVectorSVG} alt='paper plane vector' height='29px' width='32px' />
          </Flex>
        </Flex>
      </Center>
    </Stack>
  );
};
